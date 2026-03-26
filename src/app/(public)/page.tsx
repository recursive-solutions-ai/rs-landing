/**
 * Landing page — the public home page at `/`.
 *
 * Studio Lumio-inspired redesign with GSAP animations and Three.js hero.
 */

import { HeroSection } from "@/components/landing/HeroSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Modern Systems for Growing Businesses | Recursive",
	description:
		"We find the repetitive 'busy work' slowing you down and replace it with smart, integrated AI systems that give your team their time back.",
}

export default async function LandingPage() {
	return (
		<div className="no-scrollbar">
			<HeroSection />
			<ServicesSection />
			<ProcessSection />
			<CaseStudiesSection />
			<TestimonialsSection />
			<ContactCTASection />
		</div>
	)
}
