/**
 * Landing page — the public home page at `/`.
 *
 * Studio Lumio-inspired redesign with GSAP animations and Three.js hero.
 */

import { HeroSection } from "@/components/landing/HeroSection"
import { TargetMarketSection } from "@/components/landing/TargetMarketSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection"
import { TeamSection } from "@/components/landing/TeamSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Modern Systems for Growing Businesses | Recursive Solutions",
	description:
		"We bridge the gap between knowing AI matters and knowing how to use it. AI consulting, advisory, and custom builds for service businesses.",
}

export default async function LandingPage() {
	return (
		<div className="no-scrollbar">
			<HeroSection />
			<TargetMarketSection />
			<ServicesSection />
			<ProcessSection />
			<CaseStudiesSection />
			<TeamSection />
			<ContactCTASection />
		</div>
	)
}
