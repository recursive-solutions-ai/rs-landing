import "server-only"
import { getClientDb } from "@growth-engine/sdk-server"

export interface BlogPostRecord {
	id: string
	slug: string
	urlPath: string | null
	title: string
	content: string
	language: string
	authorId: string | null
	heroImageUrl: string | null
	seoTitle: string | null
	seoDesc: string | null
	publishedAt: Date | null
	createdAt: Date
	updatedAt: Date
}

function getDb() {
	const tursoUrl = process.env.TURSO_DATABASE_URL
	const tursoAuthToken = process.env.TURSO_AUTH_TOKEN
	if (!tursoUrl || !tursoAuthToken) return null
	return getClientDb(tursoUrl, tursoAuthToken)
}

function toDate(value: unknown): Date {
	if (value instanceof Date) return value
	if (typeof value === "number") return new Date(value * 1000)
	if (typeof value === "string") {
		const parsed = new Date(value)
		if (!isNaN(parsed.getTime())) return parsed
	}
	return new Date(0)
}

function toDateOrNull(value: unknown): Date | null {
	if (value === null || value === undefined) return null
	return toDate(value)
}

type Row = Record<string, unknown>

function mapRow(row: Row): BlogPostRecord {
	return {
		id: row.id as string,
		slug: row.slug as string,
		urlPath: (row.url_path as string | null) ?? null,
		title: row.title as string,
		content: row.content as string,
		language: row.language as string,
		authorId: (row.author_id as string | null) ?? null,
		heroImageUrl: (row.hero_image_url as string | null) ?? null,
		seoTitle: (row.seo_title as string | null) ?? null,
		seoDesc: (row.seo_desc as string | null) ?? null,
		publishedAt: toDateOrNull(row.published_at),
		createdAt: toDate(row.created_at),
		updatedAt: toDate(row.updated_at),
	}
}

export async function getBlogPosts(locale = "en"): Promise<BlogPostRecord[]> {
	const db = getDb()
	if (!db) return []
	try {
		const result = await db.$client.execute({
			sql: `SELECT id, slug, url_path, title, content, language, author_id, hero_image_url,
			             seo_title, seo_desc, published_at, created_at, updated_at
			      FROM blog_posts
			      WHERE status = 'published' AND language = ?
			      ORDER BY created_at DESC`,
			args: [locale],
		})
		return result.rows.map((r) => mapRow(r as Row))
	} catch (err) {
		console.warn("[getBlogPosts] failed", err)
		return []
	}
}

export async function getBlogPost(
	slugOrPath: string,
	locale = "en",
): Promise<BlogPostRecord | null> {
	const db = getDb()
	if (!db) return null
	try {
		const result = await db.$client.execute({
			sql: `SELECT id, slug, url_path, title, content, language, author_id, hero_image_url,
			             seo_title, seo_desc, published_at, created_at, updated_at
			      FROM blog_posts
			      WHERE (slug = ? OR url_path = ?) AND language = ?
			      LIMIT 1`,
			args: [slugOrPath, slugOrPath, locale],
		})
		const row = result.rows[0]
		if (!row) return null
		return mapRow(row as Row)
	} catch (err) {
		console.warn("[getBlogPost] failed", err)
		return null
	}
}
