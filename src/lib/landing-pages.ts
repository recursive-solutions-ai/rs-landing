import "server-only"
import type { Metadata } from "next"
import { getLandingPage } from "@growth-engine/sdk-server"
import { getDbOrNull } from "@/lib/db"
import { buildUrl } from "@/lib/sitemap-shared"
import { socialImageMetadata } from "@/lib/social-image"
import { ORG_NAME, orgId } from "@/lib/seo-config"
import { parseLandingMarkdown, plainText } from "@/lib/landing-page-content"

/** Plain, serializable landing page shape (no Date fields) used by the template. */
export interface LandingPageData {
	slug: string
	title: string
	language: string
	service: string | null
	city: string | null
	seoTitle: string | null
	seoDesc: string | null
	keywords: string[] | null
	heroImageUrl: string | null
	content: string
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function isLandingSlug(slug: string): boolean {
	return SLUG_RE.test(slug)
}

/** Published page by slug (the SDK already filters out drafts/archived). Null on missing DB or page. */
export async function getPublishedLandingPage(slug: string): Promise<LandingPageData | null> {
	if (!isLandingSlug(slug)) return null
	const db = getDbOrNull()
	if (!db) return null
	const row = await getLandingPage(db, slug)
	if (!row) return null
	return {
		slug: row.slug,
		title: row.title,
		language: row.language ?? "en",
		service: row.service ?? null,
		city: row.city ?? null,
		seoTitle: row.seoTitle ?? null,
		seoDesc: row.seoDesc ?? null,
		keywords: Array.isArray(row.keywords) ? row.keywords : null,
		heroImageUrl: row.heroImageUrl ?? null,
		content: row.content,
	}
}

export function landingPath(slug: string): string {
	return `/${slug}`
}

export function landingMetadata(page: LandingPageData, opts: { noindex?: boolean } = {}): Metadata {
	const title = page.seoTitle ?? page.title
	const url = buildUrl(landingPath(page.slug), page.language)
	const social = socialImageMetadata(title)
	return {
		...social,
		title,
		description: page.seoDesc ?? undefined,
		keywords: page.keywords ?? undefined,
		alternates: { canonical: url },
		openGraph: {
			title,
			description: page.seoDesc ?? undefined,
			url,
			type: "website",
			...social.openGraph,
		},
		...(opts.noindex ? { robots: { index: false, follow: false } } : {}),
	}
}

/** LocalBusiness-style Service + FAQPage JSON-LD (areaServed = city). */
export function landingJsonLd(page: LandingPageData): Record<string, unknown>[] {
	const url = buildUrl(landingPath(page.slug), page.language)
	const parsed = parseLandingMarkdown(page.content)
	const name = page.seoTitle ?? parsed.headline ?? page.title
	const areaServed = page.city ? { "@type": "City", name: page.city } : undefined
	const description = page.seoDesc ?? parsed.subheadline ?? undefined

	const nodes: Record<string, unknown>[] = [
		{
			"@context": "https://schema.org",
			"@type": "ProfessionalService",
			"@id": `${url}#business`,
			name: ORG_NAME,
			url,
			...(description ? { description } : {}),
			parentOrganization: { "@id": orgId() },
			...(areaServed ? { areaServed } : {}),
		},
		{
			"@context": "https://schema.org",
			"@type": "Service",
			"@id": `${url}#service`,
			name,
			serviceType: page.service ?? parsed.headline ?? page.title,
			url,
			...(description ? { description } : {}),
			provider: { "@id": `${url}#business` },
			...(areaServed ? { areaServed } : {}),
		},
	]
	const faq = parsed.faq?.items ?? []
	if (faq.length > 0) {
		nodes.push({
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: faq.map((f) => ({
				"@type": "Question",
				name: plainText(f.question),
				acceptedAnswer: { "@type": "Answer", text: plainText(f.answer) },
			})),
		})
	}
	return nodes
}
