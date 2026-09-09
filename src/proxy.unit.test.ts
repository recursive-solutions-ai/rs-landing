import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from './proxy'

vi.mock('./i18n/config', () => ({
	defaultLocale: 'en', supportedLocales: ['en'], isMultiLang: false,
}))

describe('canonical homepage redirects', () => {
	it.each(['recursive-solutions.com', 'www.recursive-solutions.com'])(
		'redirects %s directly to the canonical and preserves query parameters', (host) => {
			const response = proxy(new NextRequest(`https://${host}/?utm_source=test`))
			expect(response.status).toBe(301)
			expect(response.headers.get('location')).toBe('https://www.recursive-solutions.com/en?utm_source=test')
			const destination = proxy(new NextRequest(response.headers.get('location')!))
			expect(destination.headers.get('location')).toBeNull()
		},
	)
	it('keeps local development on its own origin', () => {
		expect(proxy(new NextRequest('http://localhost:3000/')).headers.get('location'))
			.toBe('http://localhost:3000/en')
	})
	it('preserves existing non-root locale redirects', () => {
		expect(proxy(new NextRequest('https://www.recursive-solutions.com/blog')).headers.get('location'))
			.toBe('https://www.recursive-solutions.com/en/blog')
	})
	it.each(['/en', '/api/health', '/robots.txt'])( 'does not redirect %s', (path) => {
		expect(proxy(new NextRequest(`https://www.recursive-solutions.com${path}`)).headers.get('location')).toBeNull()
	})
})
