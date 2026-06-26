import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

describe('rss-shared', () => {
	const originalEnv = process.env

	beforeEach(() => {
		vi.resetModules()
		process.env = { ...originalEnv, SITE_URL: 'https://example.com' }
	})

	afterEach(() => {
		process.env = originalEnv
	})

	it('renders an RSS feed with canonical bare default-locale item links', async () => {
		const { renderRssFeed } = await import('./rss-shared')
		const xml = renderRssFeed(
			{ title: 'Recursive Solutions', description: 'Latest posts' },
			[
				{
					slug: 'hello-world',
					title: 'Hello World',
					content: '<p>Hello <strong>world</strong>.</p>',
					seoDesc: null,
					publishedAt: '2026-01-02T03:04:05Z',
					createdAt: '2026-01-01T00:00:00Z',
				},
			],
		)

		expect(xml).toContain('<rss version="2.0"')
		expect(xml).toContain('<link>https://example.com</link>')
		expect(xml).toContain('<link>https://example.com/blog/hello-world</link>')
		expect(xml).not.toContain('/en/blog/hello-world')
		expect(xml).toContain('<description>Hello world.</description>')
	})

	it('uses seoDesc before stripping HTML content', async () => {
		const { renderRssFeed } = await import('./rss-shared')
		const xml = renderRssFeed(
			{ title: 'Recursive Solutions', description: 'Latest posts' },
			[
				{
					slug: 'post',
					title: 'Post',
					content: '<p>Body content</p>',
					seoDesc: 'SEO description',
					publishedAt: null,
					createdAt: '2026-01-01T00:00:00Z',
				},
			],
		)

		expect(xml).toContain('<description>SEO description</description>')
		expect(xml).not.toContain('Body content')
	})
})
