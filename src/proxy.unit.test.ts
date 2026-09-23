import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from './proxy'

vi.mock('./i18n/config', () => ({
	defaultLocale: 'en', supportedLocales: ['en'], isMultiLang: false,
	isSupportedLocale: (l: string) => l === 'en',
}))

describe('default language lives at the site root', () => {
	it.each([
		['/en', '/'],
		['/en/blog', '/blog'],
		['/en/blog/some-post', '/blog/some-post'],
	])('301s %s to %s', (from, to) => {
		const response = proxy(new NextRequest(`https://www.recursive-solutions.com${from}`))
		expect(response.status).toBe(301)
		expect(response.headers.get('location'))
			.toBe(`https://www.recursive-solutions.com${to}`)
	})

	it('preserves query parameters when stripping the default locale', () => {
		expect(proxy(new NextRequest('https://www.recursive-solutions.com/en?utm_source=test'))
			.headers.get('location'))
			.toBe('https://www.recursive-solutions.com/?utm_source=test')
	})

	it.each(['/', '/blog', '/lucy', '/api/health', '/robots.txt'])(
		'does not redirect %s', (path) => {
			expect(proxy(new NextRequest(`https://www.recursive-solutions.com${path}`))
				.headers.get('location')).toBeNull()
		},
	)

	it('serves the bare path by internal rewrite, tagged with the locale', () => {
		const response = proxy(new NextRequest('https://www.recursive-solutions.com/blog'))
		expect(response.headers.get('x-locale')).toBe('en')
		expect(response.headers.get('x-middleware-rewrite'))
			.toBe('https://www.recursive-solutions.com/en/blog')
	})

	it('rewrites the homepage without a trailing slash', () => {
		expect(proxy(new NextRequest('https://www.recursive-solutions.com/'))
			.headers.get('x-middleware-rewrite'))
			.toBe('https://www.recursive-solutions.com/en')
	})

	it('keeps local development on its own origin', () => {
		expect(proxy(new NextRequest('http://localhost:3000/en/blog')).headers.get('location'))
			.toBe('http://localhost:3000/blog')
	})
})

describe('host canonicalization', () => {
	it('redirects the apex to www in one hop, keeping the path', () => {
		const response = proxy(new NextRequest('https://recursive-solutions.com/blog?utm_source=test'))
		expect(response.status).toBe(301)
		expect(response.headers.get('location'))
			.toBe('https://www.recursive-solutions.com/blog?utm_source=test')
		// The destination must answer without another redirect — no chain.
		expect(proxy(new NextRequest(response.headers.get('location')!)).headers.get('location'))
			.toBeNull()
	})

	it('sends the apex homepage straight to the www root, never to /en', () => {
		expect(proxy(new NextRequest('https://recursive-solutions.com/')).headers.get('location'))
			.toBe('https://www.recursive-solutions.com/')
	})
})
