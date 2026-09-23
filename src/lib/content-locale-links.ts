import { defaultLocale } from '@/i18n/config'
import { SITE_URL } from '@/lib/sitemap-shared'

/**
 * Strip the DEFAULT locale segment out of links inside CMS-authored post bodies.
 *
 * Posts were written while the site served its default language under
 * `/en/...`, so their in-text cross-links still point there. Those URLs now 301
 * to the bare path, which still *works* for a reader — but it leaves every
 * canonical (`/blog/x`) with zero direct internal links, and that is precisely
 * what parks pages in "Discovered – currently not indexed".
 *
 * Bodies are stored as MARKDOWN (`[label](/en/blog/x)`) and rendered to HTML
 * downstream, so both link syntaxes are handled: markdown inline links,
 * markdown reference definitions, and raw `href="..."` in embedded HTML.
 *
 * Normalizing at render time keeps the invariant ("the default language never
 * carries a locale segment anywhere") true no matter what the CMS holds, and
 * covers posts published later by an editor still pasting `/en/...`.
 */

/** Hosts we consider our own, so absolute self-links get rewritten too. */
function internalHosts(): Set<string> {
	const hosts = new Set<string>()
	try {
		const host = new URL(SITE_URL).host
		hosts.add(host)
		// Accept the apex/www twin of whatever SITE_URL names, since content is
		// authored against the public domain and SITE_URL differs per environment.
		hosts.add(host.startsWith('www.') ? host.slice(4) : `www.${host}`)
	} catch {
		/* SITE_URL malformed — relative links are still handled below. */
	}
	// Content is authored against the public site whatever the environment.
	hosts.add('recursive-solutions.com')
	hosts.add('www.recursive-solutions.com')
	return hosts
}

/** `/en/blog` -> `/blog`, `/en` -> `/`, `/en?a=1` -> `/?a=1`. Null if no match. */
function stripPrefix(path: string, prefix: string): string | null {
	if (!path.startsWith(prefix)) return null
	const rest = path.slice(prefix.length)
	if (rest === '') return '/'
	if (rest.startsWith('/')) return rest === '/' ? '/' : rest
	if (rest.startsWith('?') || rest.startsWith('#')) return `/${rest}`
	// `/energy` must not be mistaken for the `/en` prefix.
	return null
}

function rewriteUrl(value: string, prefix: string, hosts: Set<string>): string {
	if (value.startsWith('/') && !value.startsWith('//')) {
		return stripPrefix(value, prefix) ?? value
	}
	if (!/^https?:\/\//i.test(value)) return value
	let url: URL
	try {
		url = new URL(value)
	} catch {
		return value
	}
	if (!hosts.has(url.host)) return value
	const stripped = stripPrefix(url.pathname, prefix)
	if (stripped === null) return value
	url.pathname = stripped
	return url.toString()
}

/** `href="/en/x"` / `href='/en/x'` in embedded HTML. */
const HTML_HREF = /href=(["'])([^"']*)\1/g
/** Markdown inline link/image: `](/en/x)` or `](/en/x "Title")`. */
const MD_INLINE = /\]\(\s*([^\s)]+)((?:\s+(?:"[^"]*"|'[^']*'))?\s*)\)/g
/** Markdown reference definition: `[id]: /en/x "Title"`. */
const MD_REFDEF = /^([ \t]{0,3}\[[^\]]+\]:[ \t]*)(\S+)/gm

export function normalizeContentLocaleLinks(
	content: string,
	locale: string = defaultLocale,
): string {
	if (!content) return content
	const prefix = `/${locale}`
	if (!content.includes(prefix)) return content
	const hosts = internalHosts()
	const rewrite = (v: string) => rewriteUrl(v, prefix, hosts)

	return content
		.replace(HTML_HREF, (m, q: string, v: string) => {
			const next = rewrite(v)
			return next === v ? m : `href=${q}${next}${q}`
		})
		.replace(MD_INLINE, (m, v: string, tail: string) => {
			const next = rewrite(v)
			return next === v ? m : `](${next}${tail})`
		})
		.replace(MD_REFDEF, (m, head: string, v: string) => {
			const next = rewrite(v)
			return next === v ? m : `${head}${next}`
		})
}
