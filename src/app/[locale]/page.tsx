
import { HeroSection } from "@/components/landing/HeroSection"
import { CredibilityBar } from "@/components/landing/CredibilityBar"
import { FrictionDiagnosticSection } from "@/components/landing/FrictionDiagnosticSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { FieldReportsSection } from "@/components/landing/FieldReportsSection"
import { FaqSection } from "@/components/landing/FaqSection"
import { TeamSection } from "@/components/landing/TeamSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"
import { getForm } from "@/lib/forms-server"
import { buildUrl } from "@/lib/sitemap-shared"
import { defaultLocale } from "@/i18n/config"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Recursive Solutions — One System to Run Your Growth",
	description:
		"We make your business simpler, faster, and more valuable — one vertical system for your website, content, SEO, leads, CRM, and analytics, run by a hands-on team. Plus custom automations, bespoke tools, and consulting.",
	alternates: { canonical: buildUrl("", defaultLocale) },
}

export default async function LandingPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const contactForm = await getForm("general-contact-form")

	return (
		<div className="no-scrollbar">
			<HeroSection locale={locale} />
			<CredibilityBar />
			<FrictionDiagnosticSection />
			<ProcessSection />
			<FieldReportsSection />
			<ServicesSection />
			<TeamSection />
			<FaqSection />
			<ContactCTASection form={contactForm} submitLabel="Book a Consult" />
		</div>
	)
}
