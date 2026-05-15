import { defaultLocale, supportedLocales, isMultiLang } from '@/i18n/config'

export const SITE_URL =
	process.env.SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: 'http://localhost:3000')

export const BLOG_BATCH_SIZE = 1000

export const STATIC_PAGES = [
	'',
	'/blog',
	'/contact',
	'/privacy',
	'/legal',
	'/cookies',
]

export interface SitemapEntry {
	url: string
	lastModified?: string
	changeFrequency?:
		| 'always'
		| 'hourly'
		| 'daily'
		| 'weekly'
		| 'monthly'
		| 'yearly'
		| 'never'
	priority?: number
	alternates?: Record<string, string>
}

interface BlogSitemapEntry {
	slug: string
	language: string
	updatedAt: string | null
	parentPostId: string | null
}

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

export function buildUrl(path: string, locale?: string): string {
	if (!locale || locale === defaultLocale) {
		return `${SITE_URL}${path}`
	}
	return `${SITE_URL}/${locale}${path}`
}

function buildAlternates(path: string): Record<string, string> | undefined {
	if (!isMultiLang) return undefined
	const languages: Record<string, string> = {}
	for (const locale of supportedLocales) {
		languages[locale] = buildUrl(path, locale)
	}
	return languages
}

async function fetchBlogBatch(
	locale: string,
	limit: number,
	offset: number,
): Promise<BlogSitemapEntry[]> {
	try {
		const res = await fetch(
			`${SITE_URL}/api/rs/content?type=blog&locale=${locale}&limit=${limit}&offset=${offset}&fields=slug,updatedAt,language,parentPostId`,
			{ next: { revalidate: 3600 } },
		)
		if (!res.ok) return []
		return (await res.json()) as BlogSitemapEntry[]
	} catch {
		return []
	}
}

export function buildStaticEntries(): SitemapEntry[] {
	const entries: SitemapEntry[] = []
	for (const page of STATIC_PAGES) {
		const alternates = buildAlternates(page)
		entries.push({
			url: buildUrl(page, defaultLocale),
			changeFrequency: 'monthly',
			priority: page === '' ? 1.0 : 0.7,
			...(alternates ? { alternates } : {}),
		})
	}
	return entries
}

export async function buildBlogEntries(batchId: number): Promise<SitemapEntry[]> {
	const offset = (batchId - 1) * BLOG_BATCH_SIZE
	const allPosts: BlogSitemapEntry[] = []

	const fetches = supportedLocales.map((locale) =>
		fetchBlogBatch(locale, BLOG_BATCH_SIZE, offset),
	)
	const results = await Promise.all(fetches)
	for (const batch of results) {
		allPosts.push(...batch)
	}

	const translationGroups = new Map<string, BlogSitemapEntry[]>()
	const standalone: BlogSitemapEntry[] = []

	for (const post of allPosts) {
		if (post.parentPostId) {
			const group = translationGroups.get(post.parentPostId) ?? []
			group.push(post)
			translationGroups.set(post.parentPostId, group)
		} else {
			standalone.push(post)
		}
	}

	const entries: SitemapEntry[] = []
	const processed = new Set<string>()

	for (const [, group] of translationGroups) {
		const alternates: Record<string, string> = {}
		for (const post of group) {
			alternates[post.language] = buildUrl(`/blog/${post.slug}`, post.language)
		}
		for (const post of group) {
			if (processed.has(post.slug)) continue
			processed.add(post.slug)
			entries.push({
				url: buildUrl(`/blog/${post.slug}`, post.language),
				lastModified: post.updatedAt ?? undefined,
				changeFrequency: 'weekly',
				priority: 0.8,
				...(Object.keys(alternates).length > 1 ? { alternates } : {}),
			})
		}
	}

	for (const post of standalone) {
		if (processed.has(post.slug)) continue
		processed.add(post.slug)
		const alternates = isMultiLang
			? { [post.language]: buildUrl(`/blog/${post.slug}`, post.language) }
			: undefined
		entries.push({
			url: buildUrl(`/blog/${post.slug}`, post.language),
			lastModified: post.updatedAt ?? undefined,
			changeFrequency: 'weekly',
			priority: 0.8,
			...(alternates && Object.keys(alternates).length > 1 ? { alternates } : {}),
		})
	}

	return entries
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
	const lines: string[] = []
	lines.push('<?xml version="1.0" encoding="UTF-8"?>')
	lines.push(
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
	)
	for (const entry of entries) {
		lines.push('  <url>')
		lines.push(`    <loc>${escapeXml(entry.url)}</loc>`)
		if (entry.lastModified) {
			lines.push(`    <lastmod>${escapeXml(entry.lastModified)}</lastmod>`)
		}
		if (entry.changeFrequency) {
			lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`)
		}
		if (typeof entry.priority === 'number') {
			lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`)
		}
		if (entry.alternates) {
			for (const [lang, href] of Object.entries(entry.alternates)) {
				lines.push(
					`    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}"/>`,
				)
			}
		}
		lines.push('  </url>')
	}
	lines.push('</urlset>')
	return lines.join('\n') + '\n'
}
