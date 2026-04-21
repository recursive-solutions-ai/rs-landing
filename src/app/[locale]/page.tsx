
import { HeroSection } from "@/components/landing/HeroSection"
import { TargetMarketSection } from "@/components/landing/TargetMarketSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection"
import { ProofOfWorkSection } from "@/components/landing/ProofOfWorkSection"
import { TeamSection } from "@/components/landing/TeamSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"
import { getForm } from "@/lib/forms-server"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Every Great Business Will Run on AI | Recursive Solutions",
	description:
		"We exist to help good people and great businesses not just survive the future — but thrive in it. AI consulting, advisory, and custom builds for service businesses.",
}

export default async function LandingPage() {
	const contactForm = await getForm("general-contact-form")

	return (
		<div className="no-scrollbar">
			<HeroSection />
			<TargetMarketSection />
			{/* <ServicesSection /> */}
			<CaseStudiesSection />

			<ProcessSection />
			<ProofOfWorkSection />
			<TeamSection />
			<ContactCTASection form={contactForm} />
		</div>
	)
}
