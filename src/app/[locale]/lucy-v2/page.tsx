import type { Metadata } from "next"
import { socialImageMetadata } from "@/lib/social-image"
import { buildUrl } from "@/lib/sitemap-shared"
import { LucyV2TopBar, LucyV2Footer } from "@/components/lucy-v2/LucyV2Chrome"
import { LucyV2Hero } from "@/components/lucy-v2/LucyV2Hero"
import { LucyV2Story } from "@/components/lucy-v2/LucyV2Story"
import {
	LucyV2WhatYouGet,
	LucyV2Proof,
	LucyV2FinalCta,
	LucyV2Faq,
} from "@/components/lucy-v2/LucyV2After"
import "@/components/lucy-v2/lucy-v2.css"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const title = "Lucy: drop your URL, wake up to booked calls | Recursive Solutions"
	const description =
		"Lucy reads your site, then runs your SEO, social, email nurture and outreach every day. Drop your URL and the team will come back with what we'd redesign and automate."
	const social = socialImageMetadata(title)
	return {
		...social,
		title,
		description,
		robots: { index: false, follow: false },
		alternates: { canonical: buildUrl("/lucy-v2", locale) },
		openGraph: {
			title,
			description,
			url: buildUrl("/lucy-v2", locale),
			type: "website",
			...social.openGraph,
		},
	}
}

export default async function LucyV2Page({
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
			<LucyV2TopBar locale={locale} />
			<LucyV2Hero />
			<LucyV2Story />
			<LucyV2WhatYouGet />
			<LucyV2Proof locale={locale} />
			<LucyV2FinalCta />
			<LucyV2Faq />
			<LucyV2Footer locale={locale} />
		</div>
	)
}
