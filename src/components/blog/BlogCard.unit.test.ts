import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BlogCard } from './BlogCard'
import { RelatedArticles } from './RelatedArticles'

const HERO =
	'https://storage.googleapis.com/rs-bucket-prod/tenants/recursive-solutions/public/blog-assets/id1/hero-abc.png'

const post = {
	slug: 'my-post',
	title: 'My Post',
	content: '<p>Body text</p>',
	heroImageUrl: HERO,
	seoDesc: null,
	createdAt: '2026-03-05T12:00:00.000Z',
}

describe('BlogCard (local)', () => {
	it('serves the hero through /_next/image and keeps the SDK markup', () => {
		const html = renderToStaticMarkup(
			createElement(BlogCard, { ...post, locale: 'en', localePrefix: '', imageSizes: '100vw' }),
		)
		expect(html).toContain('<article itemScope="" itemType="https://schema.org/BlogPosting">')
		expect(html).toContain('href="/blog/my-post"')
		expect(html).toContain('class="relative aspect-video overflow-hidden"')
		expect(html).toMatch(/<img [^>]*src="\/_next\/image\?url=https%3A%2F%2Fstorage\.googleapis\.com/)
		expect(html).toContain('srcSet="/_next/image?url=')
		expect(html).toContain('sizes="100vw"')
		expect(html).toContain('class="object-cover group-hover:scale-105 transition-transform duration-300"')
		expect(html).toContain('<time class="text-xs text-base-content/50" dateTime="2026-03-05T12:00:00.000Z">')
		// no seoDesc: preview falls back to tag-stripped content + "..."
		expect(html).toContain('Body text...')
		// no raw bucket URL used as an <img src>
		expect(html).not.toMatch(/<img [^>]*src="https:/)
	})

	it('eager cards load eagerly with high priority; others are lazy', () => {
		const eager = renderToStaticMarkup(createElement(BlogCard, { ...post, locale: 'en', localePrefix: '', imageSizes: '100vw', eager: true }))
		expect(eager).toContain('loading="eager"')
		expect(eager).toContain('fetchPriority="high"')
		const lazy = renderToStaticMarkup(createElement(BlogCard, { ...post, locale: 'en', localePrefix: '', imageSizes: '100vw' }))
		expect(lazy).toContain('loading="lazy"')
		expect(lazy).not.toContain('fetchPriority="high"')
	})

	it('falls back to /${locale} prefix and omits the figure without a hero', () => {
		const html = renderToStaticMarkup(
			createElement(BlogCard, { ...post, heroImageUrl: null, seoDesc: 'Desc', locale: 'fr', localePrefix: '/fr', imageSizes: '100vw' }),
		)
		expect(html).toContain('href="/fr/blog/my-post"')
		expect(html).not.toContain('<figure')
		expect(html).toContain('Desc')
	})

	it('RelatedArticles renders cards through /_next/image and nothing when empty', () => {
		const html = renderToStaticMarkup(
			createElement(RelatedArticles, { posts: [post], locale: 'en', localePrefix: '', heading: 'Related' }),
		)
		expect(html).toContain('<aside aria-label="Related" class="mt-16">')
		expect(html).toContain('/_next/image?url=')
		expect(renderToStaticMarkup(createElement(RelatedArticles, { posts: [], locale: 'en', localePrefix: '', heading: 'x' }))).toBe('')
	})
})
