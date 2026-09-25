import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildTopicEntries, SITE_URL } from './sitemap-shared'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubFetch(response: () => Promise<Response>) {
	const fetchMock = vi.fn(response)
	vi.stubGlobal('fetch', fetchMock)
	return fetchMock
}

describe('buildTopicEntries', () => {
	it('lists one bare-URL entry per topic hub', async () => {
		const fetchMock = stubFetch(async () =>
			Response.json([
				{ slug: 'cpa-firm-automation', label: 'CPA firm automation', postCount: 6 },
				{ slug: 'workflow-automation', label: 'Workflow automation', postCount: 24 },
			]),
		)

		const entries = await buildTopicEntries()

		expect(fetchMock).toHaveBeenCalledWith(
			`${SITE_URL}/api/rs/content?type=blog-topics&locale=en`,
			expect.anything(),
		)
		expect(entries.map((e) => e.url)).toEqual([
			`${SITE_URL}/blog/topic/cpa-firm-automation`,
			`${SITE_URL}/blog/topic/workflow-automation`,
		])
		expect(entries.every((e) => !e.url.includes('/en/'))).toBe(true)
	})

	it('skips entries without a usable slug', async () => {
		stubFetch(async () => Response.json([{ slug: '' }, { label: 'no slug' }, { slug: 'ok' }]))
		const entries = await buildTopicEntries()
		expect(entries.map((e) => e.url)).toEqual([`${SITE_URL}/blog/topic/ok`])
	})

	it('degrades to no entries when the content API fails', async () => {
		stubFetch(async () => new Response('nope', { status: 500 }))
		expect(await buildTopicEntries()).toEqual([])

		stubFetch(async () => {
			throw new Error('network down')
		})
		expect(await buildTopicEntries()).toEqual([])
	})
})
