
import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturePillarsSection } from "@/components/landing/FeaturePillarsSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { ProofOfWorkSection } from "@/components/landing/ProofOfWorkSection"
import { TeamSection } from "@/components/landing/TeamSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"
import { getForm } from "@/lib/forms-server"
import { buildUrl } from "@/lib/sitemap-shared"
import { defaultLocale } from "@/i18n/config"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Every Great Business Will Run on AI | Recursive Solutions",
	description:
		"We exist to help good people and great businesses not just survive the future — but thrive in it. AI consulting, advisory, and custom builds for service businesses.",
	alternates: {
		canonical: buildUrl("", defaultLocale),
	},
}

export default async function LandingPage() {
	const contactForm = await getForm("general-contact-form")

	return (
		<div className="no-scrollbar">
			<HeroSection />
			<FeaturePillarsSection />
			<ProcessSection />
			<ProofOfWorkSection />
			<TeamSection />
			<ContactCTASection form={contactForm} />
		</div>
	)
}
