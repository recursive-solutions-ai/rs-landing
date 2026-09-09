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
		openGraph: {
			title,
			description,
			url: buildUrl("/lucy", locale),
			type: "website",
			// Next merges openGraph shallowly — without this, the root layout's
			// card image is dropped and shares render imageless.
			images: [{ url: "/social-card.jpg", width: 1200, height: 630 }],
		},
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
			<section aria-label="Lucy video" className="bg-base-100 px-6 pb-12">
				<div className="mx-auto max-w-5xl overflow-hidden rounded-box border border-base-300 bg-black shadow-sm">
					<iframe
						className="block aspect-video h-auto w-full border-0"
						src="https://www.youtube-nocookie.com/embed/htLKHvrdAAo"
						title="Lucy video"
						width="1280"
						height="720"
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					/>
				</div>
			</section>
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
