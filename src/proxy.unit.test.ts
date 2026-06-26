import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from './proxy'

function request(path: string) {
	return new NextRequest(`https://example.com${path}`)
}

describe('proxy locale routing', () => {
	it('redirects default-locale root to the bare root', () => {
		const response = proxy(request('/en'))
		expect(response.status).toBe(301)
		expect(response.headers.get('location')).toBe('https://example.com/')
	})

	it('redirects default-locale nested paths to bare paths', () => {
		const response = proxy(request('/en/blog'))
		expect(response.status).toBe(301)
		expect(response.headers.get('location')).toBe('https://example.com/blog')
	})

	it('does not redirect secondary locale paths', () => {
		const response = proxy(request('/fr/blog'))
		expect(response.status).not.toBe(301)
	})
})
