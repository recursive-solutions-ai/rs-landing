import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BlogContent } from '@growth-engine/sdk-client/components'
import { normalizeBlogKeywords } from './blog-keywords'

describe('blog keyword compatibility', () => {
	const render = (keywords: unknown) => renderToStaticMarkup(createElement(BlogContent, {
		html: '<p>Article content stays visible.</p>',
		post: { title: 'Creative agencies', content: '<p>Article content stays visible.</p>', keywords },
	}))

	it('reproduces the SDK failure with raw database text', () => {
		expect(() => render('["AI","creative agencies"]')).toThrow(/join is not a function/)
	})

	it.each([
		['["AI","creative agencies"]', ['AI', 'creative agencies']],
		['AI, creative agencies', ['AI', 'creative agencies']],
		[['AI', ' creative agencies ', null, 3], ['AI', 'creative agencies']],
		['"AI"', ['AI']],
		[null, []], [undefined, []], ['', []], ['null', []], ['{}', []],
	])('normalizes %j and renders article structured data', (input, expected) => {
		const keywords = normalizeBlogKeywords(input)
		expect(keywords).toEqual(expected)
		const html = render(keywords)
		expect(html).toContain('Article content stays visible.')
		expect(html).toContain('application/ld+json')
		if (keywords.length) expect(html).toContain(`"keywords":"${keywords.join(', ')}"`)
	})
})
