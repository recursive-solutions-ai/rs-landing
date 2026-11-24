/**
 * Single source of truth for which remote images next/image may optimize.
 *
 * Imported by next.config.ts (`images.remotePatterns`) AND by runtime code, so
 * the allow-list the optimizer enforces and the one the components check can
 * never drift apart. Keep this file free of `@/` aliases: next.config.ts
 * imports it with a relative path.
 *
 * Why it matters: the optimizer answers 400 for any host not in
 * remotePatterns, which shows up as a broken image. Anything that is not
 * optimizable must be rendered `unoptimized` instead — and loudly, see
 * `warnUnoptimizedImage`.
 */

export interface RemoteImagePattern {
	protocol: 'https'
	hostname: string
	/** Exact path, or a prefix ending in `/**`. */
	pathname: string
}

/** Blog assets from the CMS bucket (hashed, immutable file names). */
export const REMOTE_IMAGE_PATTERNS: RemoteImagePattern[] = [
	{
		protocol: 'https',
		hostname: 'storage.googleapis.com',
		pathname: '/rs-bucket-prod/tenants/recursive-solutions/public/**',
	},
]

function matchesPathname(pattern: string, pathname: string): boolean {
	if (pattern.endsWith('/**')) return pathname.startsWith(pattern.slice(0, -2))
	return pattern === pathname
}

/**
 * True when next/image can optimize `src`: a local absolute path ("/x.png",
 * not protocol-relative "//host/x.png") or a URL matching a remote pattern.
 * Malformed input is never optimizable.
 */
export function isOptimizableImage(src: string | null | undefined): boolean {
	if (typeof src !== 'string' || src === '') return false
	if (src.startsWith('/')) return !src.startsWith('//') && !src.startsWith('/\\')
	let url: URL
	try {
		url = new URL(src)
	} catch {
		return false
	}
	return REMOTE_IMAGE_PATTERNS.some(
		(p) =>
			url.protocol === `${p.protocol}:` &&
			url.hostname === p.hostname &&
			matchesPathname(p.pathname, url.pathname),
	)
}

const warned = new Set<string>()

/**
 * Structured, named event for an image we cannot optimize. Logged once per
 * src per process so a list of cards does not flood the log.
 */
export function warnUnoptimizedImage(src: string | null | undefined): void {
	const key = String(src)
	if (warned.has(key)) return
	warned.add(key)
	let host: string | null = null
	let reason = 'not_in_remote_patterns'
	try {
		host = new URL(String(src)).host
	} catch {
		reason = 'malformed_or_relative_url'
	}
	console.warn('[image] unoptimized_remote_host', { host, reason, src })
}
