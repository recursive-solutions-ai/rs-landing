import { getBlogPosts } from '@growth-engine/sdk-server'
import { defaultLocale } from '@/i18n/config'
import { getDb, safeQuery } from '@/lib/db'
import { ORG_NAME } from '@/lib/seo-config'
import { MAX_FEED_ITEMS, renderRssFeed } from '@/lib/rss-shared'

export const revalidate = 3600

export async function GET() {
	const posts = await safeQuery([], () =>
		getBlogPosts(getDb(), { locale: defaultLocale, limit: MAX_FEED_ITEMS }),
	)

	const xml = renderRssFeed(
		{ title: ORG_NAME, description: `Latest articles from ${ORG_NAME}` },
		posts,
	)

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'X-Robots-Tag': 'noindex',
			'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
		},
	})
}
