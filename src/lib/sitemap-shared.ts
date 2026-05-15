export const SITE_URL =
	process.env.SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: 'http://localhost:3000')

export const BLOG_BATCH_SIZE = 1000

export async function fetchBlogCount(): Promise<number> {
	try {
		const res = await fetch(
			`${SITE_URL}/api/rs/content?type=blog&count=true`,
			{ next: { revalidate: 3600 } },
		)
		if (!res.ok) return 0
		const data = (await res.json()) as { count: number }
		return data.count
	} catch {
		return 0
	}
}

export function getBlogSitemapCount(totalCount: number): number {
	return Math.max(1, Math.ceil(totalCount / BLOG_BATCH_SIZE))
}
