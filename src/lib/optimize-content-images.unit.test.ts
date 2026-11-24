import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BlogContent } from '@growth-engine/sdk-client/components'
import { CONTENT_IMAGE_SIZES, optimizeContentImages } from './optimize-content-images'

const BASE = 'https://storage.googleapis.com/rs-bucket-prod/tenants/recursive-solutions/public/blog-assets/id1'
const URL1 = `${BASE}/graphic-abc_DEF.png`
const OPT1 = `/_next/image?url=${encodeURIComponent(URL1)}&amp;w=`

const render = (md: string) => renderToStaticMarkup(createElement(BlogContent, { html: md }))

let warn: MockInstance<typeof console.warn>
beforeEach(() => {
	warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
})
afterEach(() => vi.restoreAllMocks())

describe('optimizeContentImages: markdown', () => {
	it('rewrites ![alt](url "title") to an optimized img with srcset + sizes', () => {
		const out = optimizeContentImages(`Intro\n\n![A chart](${URL1} "Chart title")\n\nOutro`)
		expect(out).toContain('<p><img ')
		expect(out).toContain(`src="${OPT1}`.replace(/&amp;/g, '&amp;'))
		expect(out).toMatch(/srcset="[^"]*\/_next\/image\?url=[^"]* 640w, /)
		expect(out).toContain(`sizes="${CONTENT_IMAGE_SIZES}"`)
		expect(out).toContain('alt="A chart"')
		expect(out).toContain('title="Chart title"')
		expect(out).toContain('loading="lazy"')
		expect(out).toContain('decoding="async"')
		expect(out).not.toMatch(/\swidth=|\sheight=/)
		expect(out).not.toContain(URL1 + ' ')
		expect(out).toMatch(/\n\nOutro$/)
	})

	it('keeps the <p><img></p> shape marked produced before, and does not swallow following lines', () => {
		const html = render(optimizeContentImages(`![Alt](${URL1})\nfollowing **bold** text`))
		expect(html).toMatch(/<img [^>]*alt="Alt"/)
		expect(html).toContain('<strong>bold</strong>')
		const alone = render(optimizeContentImages(`para\n\n![Alt](${URL1})\n\npara 2`))
		expect(alone).toMatch(/<p><img [^>]*><\/p>/)
		expect(alone).toContain('<p>para 2</p>')
	})

	it('keeps linked images working: [![alt](u)](href)', () => {
		const html = render(optimizeContentImages(`[![Linked](${URL1})](https://example.com/page)`))
		expect(html).toMatch(/<a href="https:\/\/example\.com\/page"><img [^>]*alt="Linked"[^>]*><\/a>/)
		expect(html).toContain('/_next/image?url=')
	})

	it('leaves images inside fenced code (backtick and tilde) alone', () => {
		const md = '```md\n![x](' + URL1 + ')\n```\n\n~~~\n<img src="' + URL1 + '">\n~~~'
		expect(optimizeContentImages(md)).toBe(md)
	})

	it('leaves images inside inline code and <pre>/<code> alone', () => {
		const md = `Use \`![x](${URL1})\` or <code><img src="${URL1}"></code>\n\n<pre>\n<img src="${URL1}">\n</pre>`
		expect(optimizeContentImages(md)).toBe(md)
	})

	it('still transforms a real image that follows an inline code span on the same line', () => {
		const out = optimizeContentImages(`\`code\` then ![a](${URL1})`)
		expect(out.startsWith('`code` then <img ')).toBe(true)
	})

	it('leaves unlisted hosts untouched and warns with a named event', () => {
		const md = '![x](https://cdn.unlisted.test/a.png)\n\n<img src="https://cdn.unlisted.test/b.png" alt="b">'
		expect(optimizeContentImages(md)).toBe(md)
		const hosts = warn.mock.calls.map((c: unknown[]) => (c[1] as { host: string }).host)
		expect(warn.mock.calls[0][0]).toBe('[image] unoptimized_remote_host')
		expect(hosts).toEqual(['cdn.unlisted.test', 'cdn.unlisted.test'])
	})

	it('escapes attribute values (quotes, angle brackets, ampersands, brackets)', () => {
		const out = optimizeContentImages(`![5 > 3 & "quoted" <b> [x]](${URL1} "It's \\"hi\\"")`)
		expect(out).toContain('alt="5 &gt; 3 &amp; &quot;quoted&quot; &lt;b&gt; &#91;x&#93;"')
		expect(out).not.toMatch(/alt="[^"]*<b>/)
		expect(out).toContain("title=\"It's &quot;hi&quot;")
	})

	it('decodes markdown backslash escapes in alt', () => {
		expect(optimizeContentImages(`![snake\\_case](${URL1})`)).toContain('alt="snake_case"')
	})
})

describe('optimizeContentImages: raw HTML', () => {
	it('rewrites src, keeps class/alt/other attributes and their order', () => {
		const out = optimizeContentImages(
			`<img class="rounded shadow" src='${URL1}' alt="Hero &amp; more" width="640" data-x=1>`,
		)
		expect(out).toMatch(/^<img class="rounded shadow" src="\/_next\/image\?url=/)
		expect(out).toContain('alt="Hero &amp; more"')
		expect(out).toContain('width="640"')
		expect(out).toContain('data-x="1"')
		expect(out).toContain('srcset="')
		expect(out).toContain(`sizes="${CONTENT_IMAGE_SIZES}"`)
		expect(out).toContain('loading="lazy" decoding="async">')
	})

	it('respects an existing loading attribute and an existing srcset', () => {
		expect(optimizeContentImages(`<img src="${URL1}" loading="eager">`)).toContain('loading="eager"')
		expect(optimizeContentImages(`<img src="${URL1}" loading="eager">`)).not.toContain('loading="lazy"')
		const withSrcset = `<img src="${URL1}" srcset="${URL1} 1x">`
		expect(optimizeContentImages(withSrcset)).toBe(withSrcset)
	})

	it('decodes &amp; in src before optimizing', () => {
		const src = `${BASE}/graphic-q.png?v=1&amp;x=2`
		const out = optimizeContentImages(`<img src="${src}">`)
		expect(out).toContain(encodeURIComponent(`${BASE}/graphic-q.png?v=1&x=2`))
	})

	it('transforms local absolute paths too', () => {
		expect(optimizeContentImages('<img src="/logo.png" alt="l">')).toContain('/_next/image?url=%2Flogo.png')
	})

	it('does not touch data: URIs and does not warn for them', () => {
		const md = '<img src="data:image/gif;base64,R0lGOD">'
		expect(optimizeContentImages(md)).toBe(md)
		expect(warn).not.toHaveBeenCalled()
	})

	it('returns text without images unchanged', () => {
		const md = '# Title\n\nJust text with [a link](https://example.com).'
		expect(optimizeContentImages(md)).toBe(md)
	})
})
