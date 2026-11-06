import { readFile } from "node:fs/promises"
import path from "node:path"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getForm } from "@/lib/forms-server"
import { isLandingSlug, landingJsonLd, type LandingPageData } from "@/lib/landing-pages"
import { LandingPageTemplate } from "@/components/landing-page/LandingPageTemplate"

// Dev-only: renders a DRAFT landing page from a local JSON fixture
// (LANDING_FIXTURES_DIR/<slug>.json) so copy can be reviewed before publishing.
// 404s in production builds.
export const dynamic = "force-dynamic"

type Params = Promise<{ locale: string; slug: string }>

async function loadFixture(slug: string): Promise<LandingPageData | null> {
	if (process.env.NODE_ENV === "production") return null
	const dir = process.env.LANDING_FIXTURES_DIR
	if (!dir || !isLandingSlug(slug)) return null
	try {
		const raw = JSON.parse(await readFile(path.join(dir, `${slug}.json`), "utf8")) as Record<string, unknown>
		const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : null)
		return {
			slug,
			title: str(raw.title) ?? slug,
			language: str(raw.language) ?? "en",
			service: str(raw.service),
			city: str(raw.city),
			seoTitle: str(raw.seoTitle),
			seoDesc: str(raw.seoDesc),
			keywords: Array.isArray(raw.keywords) ? raw.keywords.filter((k): k is string => typeof k === "string") : null,
			heroImageUrl: str(raw.heroImageUrl),
			content: str(raw.content) ?? "",
		}
	} catch {
		return null
	}
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { slug } = await params
	const page = await loadFixture(slug)
	return {
		title: page ? `[Preview] ${page.seoTitle ?? page.title}` : "Preview not found",
		robots: { index: false, follow: false },
	}
}

export default async function DevPreviewLandingPage({ params }: { params: Params }) {
	if (process.env.NODE_ENV === "production") notFound()
	const { locale, slug } = await params
	const page = await loadFixture(slug)
	if (!page) notFound()
	const form = await getForm("free-growth-audit")
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(page)).replace(/</g, "\\u003c") }}
			/>
			<LandingPageTemplate page={page} locale={locale} form={form} />
		</>
	)
}
