import { SITE_URL, fetchBlogCount, getBlogSitemapCount } from '@/lib/sitemap-shared'

export const revalidate = 3600

export async function GET(): Promise<Response> {
	const totalCount = await fetchBlogCount()
	const blogSitemapCount = getBlogSitemapCount(totalCount)
	const lastMod = new Date().toISOString()

	const ids = [0]
	for (let i = 1; i <= blogSitemapCount; i++) ids.push(i)

	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		ids
			.map(
				(id) =>
					`  <sitemap>\n    <loc>${SITE_URL}/sitemap/${id}.xml</loc>\n    <lastmod>${lastMod}</lastmod>\n  </sitemap>`,
			)
			.join('\n') +
		`\n</sitemapindex>\n`

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
		},
	})
}
