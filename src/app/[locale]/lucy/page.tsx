// src/app/[locale]/lucy/page.tsx
import type { Metadata } from "next"
import { getForm } from "@/lib/forms-server"
import { buildUrl } from "@/lib/sitemap-shared"
import { LucyHero } from "@/components/lucy/LucyHero"
import { LucyIntro } from "@/components/lucy/LucyIntro"
import { FeaturePillarsSection } from "@/components/landing/FeaturePillarsSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const title = "Lucy — the unified growth platform | Recursive Solutions"
	const description =
		"Lucy is the unified platform behind Recursive Solutions — website, content, SEO, lead capture, CRM, and analytics in one system we run for you."
	return {
		title,
		description,
		alternates: { canonical: buildUrl("/lucy", locale) },
		openGraph: { title, description, url: buildUrl("/lucy", locale), type: "website" },
	}
}

export default async function LucyPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const contactForm = await getForm("general-contact-form")

	return (
		<div className="no-scrollbar">
			<LucyHero locale={locale} />
			<LucyIntro />
			<FeaturePillarsSection />
			<ContactCTASection
				form={contactForm}
				heading="Let's make your business simpler, faster, and more valuable."
				subtitle=""
				submitLabel="Get Early Access"
			/>
		</div>
	)
}
