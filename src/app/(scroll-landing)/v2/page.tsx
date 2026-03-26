import type { Metadata } from "next"
import { HeroSection } from "@/components/scroll-landing/sections/HeroSection"
import { ProblemSection } from "@/components/scroll-landing/sections/ProblemSection"
import { SolutionSection } from "@/components/scroll-landing/sections/SolutionSection"
import { HowItWorksSection } from "@/components/scroll-landing/sections/HowItWorksSection"
import { WhoItsForSection } from "@/components/scroll-landing/sections/WhoItsForSection"
import { FeaturesSection } from "@/components/scroll-landing/sections/FeaturesSection"
import { SocialProofSection } from "@/components/scroll-landing/sections/SocialProofSection"
import { CTAFooterSection } from "@/components/scroll-landing/sections/CTAFooterSection"

export const metadata: Metadata = {
	title: "Websites That Work For You",
	description:
		"Recursive Solutions builds fast, professional websites with built-in content, SEO, and support tools — so you can focus on what you do best.",
}

export default function ScrollLandingPage() {
	return (
		<>
			<HeroSection />
			<ProblemSection />
			<SolutionSection />
			<HowItWorksSection />
			<WhoItsForSection />
			<FeaturesSection />
			<SocialProofSection />
			<CTAFooterSection />
		</>
	)
}
