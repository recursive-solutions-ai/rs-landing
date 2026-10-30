import type { Metadata } from "next"
import { socialImageMetadata } from "@/lib/social-image"
import { buildUrl } from "@/lib/sitemap-shared"
import { LucyV2Hero } from "@/components/lucy-v2/LucyV2Hero"
import { LucyV2Story } from "@/components/lucy-v2/LucyV2Story"
import { LucyV2Video } from "@/components/lucy-v2/LucyV2Video"
import {
	LucyV2WhatYouGet,
	LucyV2Custom,
	LucyV2Proof,
	LucyV2FinalCta,
	LucyV2Faq,
} from "@/components/lucy-v2/LucyV2After"
import { LucyV2Team } from "@/components/lucy-v2/LucyV2Team"
import "@/components/lucy-v2/lucy-v2.css"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const title = "Recursive Solutions | Drop Your URL, Get Booked Calls"
	const description =
		"Lucy reads your site, then runs your SEO, social, email nurture and outreach every day. Drop your URL and we'll show what we'd redesign and automate."
	const social = socialImageMetadata(title)
	return {
		...social,
		title,
		description,
		// Self-referencing: `/` for the default language, `/fr` for secondary ones.
		alternates: { canonical: buildUrl("", locale) },
		openGraph: {
			title,
			description,
			url: buildUrl("", locale),
			type: "website",
			...social.openGraph,
		},
	}
}

export default async function LandingPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	return (
		<div className="lv2-root">
			<noscript>
				<style>{`.lv2-pre{visibility:visible!important}`}</style>
			</noscript>
			<LucyV2Hero />
			<LucyV2Story />
			<LucyV2Video />
			<LucyV2WhatYouGet />
			<LucyV2Custom locale={locale} />
			<LucyV2Proof locale={locale} />
			<LucyV2Team />
			<LucyV2FinalCta />
			<LucyV2Faq />
		</div>
	)
}
