import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('GET /sitemap.xml', () => {
	beforeEach(() => {
		vi.resetModules()
	})

	afterEach(() => {
		vi.unstubAllGlobals()
	})

	async function loadRoute(count: number) {
		vi.doMock('@/lib/sitemap-shared', () => ({
			SITE_URL: 'https://example.com',
			fetchBlogCount: vi.fn().mockResolvedValue(count),
			getBlogSitemapCount: (total: number) => Math.max(1, Math.ceil(total / 1000)),
			renderSitemapIndex: (urls: string[]) => urls.map((url) => `<loc>${url}</loc>`).join('\n'),
		}))
		return import('./route')
	}

	it('emits static, blog batch, and author sitemap URLs', async () => {
		const { GET } = await loadRoute(0)
		const res = await GET()
		const text = await res.text()
		expect(res.headers.get('content-type')).toContain('application/xml')
		expect(text).toContain('https://example.com/sitemap/0.xml')
		expect(text).toContain('https://example.com/sitemap/1.xml')
		expect(text).toContain('https://example.com/sitemap/2.xml')
	})

	it('emits multiple blog batches plus authors', async () => {
		const { GET } = await loadRoute(2500)
		const text = await (await GET()).text()
		expect(text).toContain('https://example.com/sitemap/4.xml')
	})
})
