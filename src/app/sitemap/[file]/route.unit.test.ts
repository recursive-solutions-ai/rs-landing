import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('GET /sitemap/[file]', () => {
	beforeEach(() => {
		vi.resetModules()
	})

	afterEach(() => {
		vi.unstubAllGlobals()
	})

	async function loadRoute(count = 0) {
		const buildBlogEntries = vi.fn().mockResolvedValue([{ url: 'https://example.com/blog/post' }])
		const buildAuthorEntries = vi.fn().mockResolvedValue([{ url: 'https://example.com/blog/authors/jane' }])
		const buildStaticEntries = vi.fn().mockReturnValue([{ url: 'https://example.com' }])
		vi.doMock('@/lib/sitemap-shared', () => ({
			buildBlogEntries,
			buildAuthorEntries,
			buildStaticEntries,
			fetchBlogCount: vi.fn().mockResolvedValue(count),
			getBlogSitemapCount: (total: number) => Math.max(1, Math.ceil(total / 1000)),
			renderSitemapXml: (entries: Array<{ url: string }>) =>
				entries.map((entry) => `<loc>${entry.url}</loc>`).join('\n'),
		}))
		const mod = await import('./route')
		return { ...mod, buildBlogEntries, buildAuthorEntries, buildStaticEntries }
	}

	function req(): Request {
		return new Request('https://example.com/sitemap/0.xml')
	}

	it('returns 404 for invalid files', async () => {
		const { GET } = await loadRoute()
		expect((await GET(req(), { params: Promise.resolve({ file: 'bogus' }) })).status).toBe(404)
		expect((await GET(req(), { params: Promise.resolve({ file: '999.xml' }) })).status).toBe(404)
	})

	it('serves static entries for id 0', async () => {
		const { GET, buildStaticEntries, buildBlogEntries } = await loadRoute()
		const res = await GET(req(), { params: Promise.resolve({ file: '0.xml' }) })
		expect(res.status).toBe(200)
		expect(buildStaticEntries).toHaveBeenCalledTimes(1)
		expect(buildBlogEntries).not.toHaveBeenCalled()
	})

	it('serves blog batch index 0 for id 1', async () => {
		const { GET, buildBlogEntries } = await loadRoute(2)
		await GET(req(), { params: Promise.resolve({ file: '1.xml' }) })
		expect(buildBlogEntries).toHaveBeenCalledWith(0)
	})

	it('serves authors for the final id', async () => {
		const { GET, buildAuthorEntries } = await loadRoute(0)
		await GET(req(), { params: Promise.resolve({ file: '2.xml' }) })
		expect(buildAuthorEntries).toHaveBeenCalledTimes(1)
	})
})
