import {
	SITE_URL,
	fetchBlogCount,
	getBlogSitemapCount,
	renderSitemapIndex,
} from '@/lib/sitemap-shared'

export const revalidate = 3600

export async function GET(): Promise<Response> {
	const totalCount = await fetchBlogCount()
	const blogSitemapCount = getBlogSitemapCount(totalCount)
	const urls = [`${SITE_URL}/sitemap/0.xml`]
	for (let i = 1; i <= blogSitemapCount; i++) {
		urls.push(`${SITE_URL}/sitemap/${i}.xml`)
	}
	urls.push(`${SITE_URL}/sitemap/${blogSitemapCount + 1}.xml`)

	return new Response(renderSitemapIndex(urls), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
		},
	})
}
