
import { HeroSection } from "@/components/landing/HeroSection"
import { CredibilityBar } from "@/components/landing/CredibilityBar"
import { FrictionDiagnosticSection } from "@/components/landing/FrictionDiagnosticSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { FieldReportsSection } from "@/components/landing/FieldReportsSection"
import { FaqSection } from "@/components/landing/FaqSection"
import { TeamSection } from "@/components/landing/TeamSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"
import { LatestBlogSection } from "@/components/landing/LatestBlogSection"
import type { BlogTeaser } from "@/components/landing/BlogTeaserCard"
import { getForm } from "@/lib/forms-server"
import { getBlogPosts } from "@growth-engine/sdk-server"
import { getDbOrNull } from "@/lib/db"
import { buildUrl } from "@/lib/sitemap-shared"
import { defaultLocale } from "@/i18n/config"
import type { Metadata } from "next"

// Landing page pulls the 3 newest blog posts. Without ISR it would freeze at
// build time, so match the blog index's revalidate window.
export const revalidate = 60

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

	const db = getDbOrNull()
	// getDbOrNull only guards missing env — a Turso outage (env present but DB
	// unreachable) would otherwise throw and take down the whole landing page.
	// Degrade the blog strip to empty instead; the rest of the page still renders.
	let rawPosts: Awaited<ReturnType<typeof getBlogPosts>> = []
	if (db) {
		try {
			rawPosts = await getBlogPosts(db, { locale, limit: 3 })
		} catch (err) {
			console.error("[landing] failed to load latest blog posts:", err)
		}
	}
	// Serialize only the fields the teaser cards use before crossing to the
	// client component.
	const latestPosts: BlogTeaser[] = rawPosts.map((post) => ({
		slug: post.slug,
		title: post.title,
		heroImageUrl: post.heroImageUrl ?? null,
		seoDesc: post.seoDesc ?? null,
		createdAt: post.createdAt,
	}))

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
			<ContactCTASection form={contactForm} />
			<LatestBlogSection posts={latestPosts} locale={locale} />
		</div>
	)
}
