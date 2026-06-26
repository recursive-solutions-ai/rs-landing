import {
	buildAuthorEntries,
	buildStaticEntries,
	buildBlogEntries,
	fetchBlogCount,
	getBlogSitemapCount,
	renderSitemapXml,
} from '@/lib/sitemap-shared'

export const revalidate = 3600

export async function GET(
	_req: Request,
	context: { params: Promise<{ file: string }> },
): Promise<Response> {
	const { file } = await context.params
	const match = /^(\d+)\.xml$/.exec(file)

	if (!match) {
		return new Response('Not Found', { status: 404 })
	}

	const id = Number(match[1])
	const totalCount = await fetchBlogCount()
	const blogSitemapCount = getBlogSitemapCount(totalCount)
	const authorsId = blogSitemapCount + 1

	if (id < 0 || id > authorsId) {
		return new Response('Not Found', { status: 404 })
	}

	const entries =
		id === 0
			? buildStaticEntries()
			: id === authorsId
				? await buildAuthorEntries()
				: await buildBlogEntries(id)

	return new Response(renderSitemapXml(entries), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
		},
	})
}
