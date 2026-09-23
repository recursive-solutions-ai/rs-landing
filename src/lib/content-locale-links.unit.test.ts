import { describe, expect, it, vi } from 'vitest'

vi.mock('@/i18n/config', () => ({
	defaultLocale: 'en', supportedLocales: ['en'], isMultiLang: false,
	isSupportedLocale: (l: string) => l === 'en',
}))
vi.mock('@/lib/sitemap-shared', () => ({
	SITE_URL: 'https://www.recursive-solutions.com',
}))

const { normalizeContentLocaleLinks } = await import('./content-locale-links')

describe('normalizeContentLocaleLinks', () => {
	it.each([
		['<a href="/en/blog/x">x</a>', '<a href="/blog/x">x</a>'],
		['<a href="/en">home</a>', '<a href="/">home</a>'],
		['<a href="/en/">home</a>', '<a href="/">home</a>'],
		['<a href="/en/contact">c</a>', '<a href="/contact">c</a>'],
		['<a href="/en?utm=1">h</a>', '<a href="/?utm=1">h</a>'],
		['<a href="/en#faq">h</a>', '<a href="/#faq">h</a>'],
	])('rewrites relative %s', (input, expected) => {
		expect(normalizeContentLocaleLinks(input)).toBe(expected)
	})

	it.each([
		'https://www.recursive-solutions.com/en/blog/x',
		'https://recursive-solutions.com/en/blog/x',
		'http://www.recursive-solutions.com/en/blog/x',
	])('rewrites the absolute self-link %s', (href) => {
		expect(normalizeContentLocaleLinks(`<a href="${href}">x</a>`))
			.toContain('/blog/x"')
		expect(normalizeContentLocaleLinks(`<a href="${href}">x</a>`))
			.not.toContain('/en/')
	})

	it.each([
		'<a href="/energy-audit">nope</a>',
		'<a href="/blog/x">already bare</a>',
		'<a href="/fr/blog/x">secondary locale</a>',
		'<a href="https://example.com/en/blog/x">external</a>',
		'<a href="mailto:hi@example.com">mail</a>',
	])('leaves %s untouched', (html) => {
		expect(normalizeContentLocaleLinks(html)).toBe(html)
	})

	it('does not touch text that merely mentions /en/', () => {
		const html = '<p>We used to serve /en/blog paths.</p>'
		expect(normalizeContentLocaleLinks(html)).toBe(html)
	})

	it('rewrites every link in a realistic body', () => {
		const html =
			'<p>See <a href="/en/blog/a">a</a> and <a href="/en/blog/b">b</a>, ' +
			'or <a href="https://www.recursive-solutions.com/en/contact">talk</a>.</p>'
		const out = normalizeContentLocaleLinks(html)
		expect(out).not.toMatch(/href="[^"]*\/en\//)
		expect(out).toContain('href="/blog/a"')
		expect(out).toContain('href="/blog/b"')
	})

	it('handles empty input', () => {
		expect(normalizeContentLocaleLinks('')).toBe('')
	})

	// Bodies are stored as MARKDOWN, so this is the syntax that actually matters.
	it.each([
		['[start here](/en/blog/x)', '[start here](/blog/x)'],
		['[home](/en)', '[home](/)'],
		['[c](/en/contact)', '[c](/contact)'],
		['[t](/en/blog/x "Title")', '[t](/blog/x "Title")'],
		['![img](/en/img/a.png)', '![img](/img/a.png)'],
		['[abs](https://www.recursive-solutions.com/en/blog/x)',
		 '[abs](https://www.recursive-solutions.com/blog/x)'],
	])('rewrites the markdown link %s', (input, expected) => {
		expect(normalizeContentLocaleLinks(input)).toBe(expected)
	})

	it.each([
		'[energy](/energy-audit)',
		'[bare](/blog/x)',
		'[fr](/fr/blog/x)',
		'[ext](https://example.com/en/blog/x)',
	])('leaves the markdown link %s untouched', (md) => {
		expect(normalizeContentLocaleLinks(md)).toBe(md)
	})

	it('rewrites a markdown reference definition', () => {
		expect(normalizeContentLocaleLinks('[ref]: /en/blog/x "T"'))
			.toBe('[ref]: /blog/x "T"')
	})

	it('rewrites a realistic markdown body end to end', () => {
		const md = [
			"If you're still wondering [where to start](/en/blog/ai-for-service-business-where-to-start), read on.",
			'Then [talk to us](/en/contact) or see [the map](/en/blog/map-workflow-before-buying-tools).',
		].join('\n\n')
		const out = normalizeContentLocaleLinks(md)
		expect(out).not.toContain('/en/')
		expect(out).toContain('](/blog/ai-for-service-business-where-to-start)')
		expect(out).toContain('](/contact)')
	})
})
