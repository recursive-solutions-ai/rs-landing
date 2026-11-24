import { getImageProps } from 'next/image'
import { isOptimizableImage, warnUnoptimizedImage } from '@/lib/remote-images'

/**
 * Rewrites the images inside a blog post body (markdown AND raw HTML) into
 * `<img>` tags served by the next/image optimizer (`/_next/image?...` src +
 * w-descriptor srcset + sizes). The SDK's BlogContent renders the body with
 * marked and has no image hook, so this runs on the string handed to its
 * `html` prop. `post.content` (JSON-LD, FAQ extraction, word count) must keep
 * the untransformed string.
 *
 * Dimensions are unknown, so no width/height attributes are emitted. With a
 * w-descriptor srcset the browser treats an image's intrinsic width as the
 * `sizes` value, so an image narrower than that would be upscaled; every live
 * body image is >= 1024px wide (measured) against the 768px sizes below.
 *
 * Not transformed: images in fenced code, inline code, <pre>/<code>,
 * <script>/<style> and HTML comments; reference-style markdown images
 * (`![alt][ref]`); indented code blocks (4 spaces); `<img>` that already has a
 * srcset. Sources the optimizer would reject are left untouched and logged via
 * `[image] unoptimized_remote_host`.
 */

/** Article is max-w-3xl (768px) inside container px-4. */
export const CONTENT_IMAGE_SIZES = '(max-width: 800px) 100vw, 768px'

// Required by getImageProps but discarded: the real dimensions are unknown.
const PLACEHOLDER_WIDTH = 1600
const PLACEHOLDER_HEIGHT = 900

const NAMED_ENTITIES: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
}

function decodeEntities(value: string): string {
	return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, body: string) => {
		if (body[0] === '#') {
			const code = body[1].toLowerCase() === 'x' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10)
			try {
				return String.fromCodePoint(code)
			} catch {
				return match
			}
		}
		return NAMED_ENTITIES[body.toLowerCase()] ?? match
	})
}

/**
 * Escapes an attribute value. Beyond the HTML basics it also neutralizes
 * `[ ] \ ` and backtick, which could otherwise confuse marked when the tag
 * ends up inside a markdown link label (`[<img alt="a]b">](href)`).
 */
function escapeAttr(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\[/g, '&#91;')
		.replace(/\]/g, '&#93;')
		.replace(/\\/g, '&#92;')
		.replace(/`/g, '&#96;')
}

function unescapeMarkdown(value: string): string {
	return value.replace(/\\([!-/:-@[-`{-~])/g, '$1')
}

type Attr = [name: string, value: string | null]

/**
 * Optimized `src` / `srcset` / `sizes` for one source, or null when the
 * source cannot (or should not) be optimized. Never throws.
 */
function optimizedAttrs(src: string): { src: string; srcset: string; sizes: string } | null {
	if (/^(data|blob|javascript):/i.test(src)) return null
	if (!isOptimizableImage(src)) {
		warnUnoptimizedImage(src)
		return null
	}
	try {
		const { props } = getImageProps({
			src,
			alt: '',
			width: PLACEHOLDER_WIDTH,
			height: PLACEHOLDER_HEIGHT,
			sizes: CONTENT_IMAGE_SIZES,
		})
		const srcSet = props.srcSet
		// No srcSet means next/image chose not to optimize (e.g. an .svg).
		if (!srcSet) return null
		return { src: String(props.src), srcset: srcSet, sizes: CONTENT_IMAGE_SIZES }
	} catch (error) {
		console.error('[image] content_image_optimize_failed', {
			src,
			message: error instanceof Error ? error.message : String(error),
		})
		return null
	}
}

function buildTag(attrs: Attr[]): string {
	const parts = attrs.map(([name, value]) => (value === null ? name : `${name}="${escapeAttr(value)}"`))
	return `<img ${parts.join(' ')}>`
}

// ---------------------------------------------------------------------------
// HTML <img>

const IMG_TAG = /<img\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi
const ATTRIBUTE = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g

function parseAttrs(raw: string): Attr[] {
	const attrs: Attr[] = []
	for (const m of raw.matchAll(ATTRIBUTE)) {
		const value = m[2] ?? m[3] ?? m[4]
		attrs.push([m[1], value === undefined ? null : decodeEntities(value)])
	}
	return attrs
}

function rewriteHtmlImg(original: string, rawAttrs: string): string {
	const attrs = parseAttrs(rawAttrs)
	const has = (name: string) => attrs.some(([n]) => n.toLowerCase() === name)
	const srcAttr = attrs.find(([n]) => n.toLowerCase() === 'src')
	if (!srcAttr || !srcAttr[1] || has('srcset')) return original
	const optimized = optimizedAttrs(srcAttr[1].trim())
	if (!optimized) return original

	const out: Attr[] = []
	for (const attr of attrs) {
		const name = attr[0].toLowerCase()
		if (name === 'src') {
			out.push(['src', optimized.src], ['srcset', optimized.srcset])
			if (!has('sizes')) out.push(['sizes', optimized.sizes])
		} else {
			out.push(attr)
		}
	}
	if (!has('loading')) out.push(['loading', 'lazy'])
	if (!has('decoding')) out.push(['decoding', 'async'])
	return buildTag(out)
}

// ---------------------------------------------------------------------------
// Markdown ![alt](url "title")

// alt: balanced one level of brackets; url: <...> or no-space with balanced
// parens; optional "title" / 'title' / (title).
const MD_IMAGE =
	/!\[((?:[^[\]\\]|\\.|\[[^[\]]*\])*)\]\(\s*(<[^>\n]*>|[^\s()]*(?:\([^\s()]*\)[^\s()]*)*)(?:\s+("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\((?:[^()\\]|\\.)*\)))?\s*\)/g

function rewriteMarkdownImage(
	match: string,
	alt: string,
	rawUrl: string,
	rawTitle: string | undefined,
	offset: number,
	text: string,
): string {
	const url = unescapeMarkdown(rawUrl.startsWith('<') ? rawUrl.slice(1, -1) : rawUrl)
	const optimized = optimizedAttrs(url)
	if (!optimized) return match

	const attrs: Attr[] = [
		['src', optimized.src],
		['srcset', optimized.srcset],
		['sizes', optimized.sizes],
		['alt', decodeEntities(unescapeMarkdown(alt))],
	]
	if (rawTitle) attrs.push(['title', decodeEntities(unescapeMarkdown(rawTitle.slice(1, -1)))])
	attrs.push(['loading', 'lazy'], ['decoding', 'async'])
	const tag = buildTag(attrs)

	// marked would render a lone `![..](..)` paragraph as <p><img></p>. Emitted
	// as a bare <img> on its own line it would instead start a raw HTML block
	// (CommonMark rule 7) and swallow the lines that follow, so keep the shape.
	const lineStart = text.lastIndexOf('\n', offset - 1) + 1
	const nextBreak = text.indexOf('\n', offset + match.length)
	const lineEnd = nextBreak === -1 ? text.length : nextBreak
	const aloneOnLine =
		/^ {0,3}$/.test(text.slice(lineStart, offset)) && /^\s*$/.test(text.slice(offset + match.length, lineEnd))
	if (!aloneOnLine) return tag
	const prevBlank = lineStart === 0 || /^\s*$/.test(text.slice(text.lastIndexOf('\n', lineStart - 2) + 1, lineStart - 1))
	const nextBlank = nextBreak === -1 || /^\s*$/.test(text.slice(nextBreak + 1, text.indexOf('\n', nextBreak + 1) === -1 ? text.length : text.indexOf('\n', nextBreak + 1)))
	return prevBlank && nextBlank ? `<p>${tag}</p>` : `<span></span>${tag}`
}

// ---------------------------------------------------------------------------
// Protected regions

const FENCE_OPEN = /^ {0,3}(`{3,}|~{3,})/

/**
 * Inline code spans, <pre>/<code>/<script>/<style> elements and HTML
 * comments: copied through verbatim.
 */
const PROTECTED =
	/(?<!`)(`+)(?!`)[\s\S]*?[^`]\1(?!`)|<(pre|code|script|style)\b[\s\S]*?<\/\2\s*>|<!--[\s\S]*?-->/gi

function transformText(text: string): string {
	return text.replace(MD_IMAGE, (match: string, alt: string, url: string, title: string | undefined, offset: number) =>
		rewriteMarkdownImage(match, alt, url, title, offset, text),
	).replace(IMG_TAG, (match: string, attrs: string) => rewriteHtmlImg(match, attrs))
}

function transformOutsideInlineCode(text: string): string {
	let out = ''
	let last = 0
	for (const m of text.matchAll(PROTECTED)) {
		out += transformText(text.slice(last, m.index))
		out += m[0]
		last = m.index + m[0].length
	}
	return out + transformText(text.slice(last))
}

/** Returns `content` with its images routed through next/image. */
export function optimizeContentImages(content: string): string {
	if (!content || (!content.includes('![') && !/<img\b/i.test(content))) return content

	const lines = content.split('\n')
	const out: string[] = []
	let prose: string[] = []
	let fence: { char: string; length: number } | null = null

	const flushProse = () => {
		if (prose.length) out.push(transformOutsideInlineCode(prose.join('\n')))
		prose = []
	}

	for (const line of lines) {
		if (fence) {
			out.push(line)
			const close = line.match(/^ {0,3}(`{3,}|~{3,})\s*$/)
			if (close && close[1][0] === fence.char && close[1].length >= fence.length) fence = null
			continue
		}
		const open = line.match(FENCE_OPEN)
		if (open) {
			flushProse()
			out.push(line)
			fence = { char: open[1][0], length: open[1].length }
			continue
		}
		prose.push(line)
	}
	flushProse()
	return out.join('\n')
}
