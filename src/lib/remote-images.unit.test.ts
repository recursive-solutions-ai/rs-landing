import { afterEach, describe, expect, it, vi } from 'vitest'
import { REMOTE_IMAGE_PATTERNS, isOptimizableImage, warnUnoptimizedImage } from './remote-images'

const BUCKET =
	'https://storage.googleapis.com/rs-bucket-prod/tenants/recursive-solutions/public/blog-assets/abc/hero-x.png'

describe('isOptimizableImage', () => {
	it.each([
		[BUCKET, true],
		['/logo.png', true],
		['/images/a/b.webp?v=2', true],
		// other buckets / tenants / hosts / protocols
		['https://storage.googleapis.com/rs-bucket-prod/tenants/other/public/x.png', false],
		['https://storage.googleapis.com/other-bucket/x.png', false],
		['https://storage.googleapis.com/rs-bucket-prod/tenants/recursive-solutions/private/x.png', false],
		['https://evil.example.com/rs-bucket-prod/tenants/recursive-solutions/public/x.png', false],
		['http://storage.googleapis.com/rs-bucket-prod/tenants/recursive-solutions/public/x.png', false],
		['https://storage.googleapis.com.evil.com/rs-bucket-prod/tenants/recursive-solutions/public/x.png', false],
		// protocol-relative, relative, data, malformed, empty
		['//storage.googleapis.com/rs-bucket-prod/tenants/recursive-solutions/public/x.png', false],
		['images/x.png', false],
		['data:image/png;base64,AAAA', false],
		['not a url', false],
		['https://', false],
		['', false],
		[null, false],
		[undefined, false],
	])('%s -> %s', (src, expected) => {
		expect(isOptimizableImage(src as string)).toBe(expected)
	})

	it('allow-list is the single pattern next.config.ts consumes', () => {
		expect(REMOTE_IMAGE_PATTERNS).toEqual([
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				pathname: '/rs-bucket-prod/tenants/recursive-solutions/public/**',
			},
		])
	})
})

describe('warnUnoptimizedImage', () => {
	afterEach(() => vi.restoreAllMocks())

	it('logs a named structured event with the host, once per src', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		warnUnoptimizedImage('https://cdn.unlisted.test/a.png')
		warnUnoptimizedImage('https://cdn.unlisted.test/a.png')
		expect(warn).toHaveBeenCalledTimes(1)
		expect(warn).toHaveBeenCalledWith('[image] unoptimized_remote_host', {
			host: 'cdn.unlisted.test',
			reason: 'not_in_remote_patterns',
			src: 'https://cdn.unlisted.test/a.png',
		})
	})
})
