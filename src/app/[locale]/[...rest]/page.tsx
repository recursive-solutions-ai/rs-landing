import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getForm } from "@/lib/forms-server"
import { getPublishedLandingPage, landingJsonLd, landingMetadata } from "@/lib/landing-pages"
import { JsonLd } from "@/components/seo/JsonLd"
import { LandingPageTemplate } from "@/components/landing-page/LandingPageTemplate"

// Lucy-hosted landing pages are published after the build, so render on demand
// and refresh on the same window as the blog.
export const revalidate = 120

type Params = Promise<{ locale: string; rest: string[] }>

// Catch-all for unmatched paths under a valid locale. A single segment that
// matches a published Lucy landing page (/ai-automation-services-san-diego)
// renders the landing template; everything else falls through to the branded
// [locale] 404 instead of Next's unbranded default.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { rest } = await params
	if (rest.length !== 1) return { title: "Page not found" }
	const page = await getPublishedLandingPage(rest[0])
	if (!page) return { title: "Page not found" }
	return landingMetadata(page)
}

export default async function CatchAllPage({ params }: { params: Params }) {
	const { locale, rest } = await params
	if (rest.length !== 1) notFound()
	const page = await getPublishedLandingPage(rest[0])
	if (!page) notFound()

	const form = await getForm("free-growth-audit")
	return (
		<>
			<JsonLd data={landingJsonLd(page)} />
			<LandingPageTemplate page={page} locale={locale} form={form} />
		</>
	)
}
