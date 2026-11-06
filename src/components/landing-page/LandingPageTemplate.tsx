import type { ReactNode } from "react"
import {
	faComments,
	faGears,
	faLayerGroup,
	faRobot,
} from "@fortawesome/free-solid-svg-icons"
import type { ServiceItem } from "@/data/landing"
import { CredibilityBar } from "@/components/landing/CredibilityBar"
import { ProblemSection } from "@/components/landing/ProblemSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { FieldReportsSection } from "@/components/landing/FieldReportsSection"
import { FaqSection } from "@/components/landing/FaqSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"
import type { FormDefinition } from "@/lib/forms-server"
import {
	parseLandingMarkdown,
	plainText,
	type TextBlock,
} from "@/lib/landing-page-content"
import type { LandingPageData } from "@/lib/landing-pages"
import { InlineMarkdown } from "./InlineMarkdown"
import { LandingHero } from "./LandingHero"
import { LandingLocalSection } from "./LandingLocalSection"
import { LandingTextSection } from "./LandingTextSection"

function Blocks({ blocks }: { blocks: TextBlock[] }): ReactNode {
	return (
		<>
			{blocks.map((block, i) => {
				if (block.type === "p") return <p key={i}><InlineMarkdown text={block.text} /></p>
				if (block.type === "h3") {
					return <h3 key={i} className="pt-2 text-xl font-bold text-base-content">{block.text}</h3>
				}
				return (
					<ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
						{block.items.map((item, j) => (
							<li key={j}><InlineMarkdown text={item} /></li>
						))}
					</ul>
				)
			})}
		</>
	)
}

const SERVICE_ICONS = [faLayerGroup, faGears, faRobot, faComments]

/** Map Lucy's four "What we build" bullets onto the homepage service icons. */
export function toServiceItems(items: { title: string; text: string }[]): ServiceItem[] {
	return items.map((item, i) => {
		const t = item.title.toLowerCase()
		let slot = i
		if (t.includes("lucy")) slot = 0
		else if (t.includes("automation")) slot = 1
		else if (t.includes("tool") || t.includes("agent")) slot = 2
		else if (t.includes("advis") || t.includes("consult")) slot = 3
		const isLucy = slot === 0
		return {
			id: `${slot}-${i}`,
			icon: SERVICE_ICONS[slot % SERVICE_ICONS.length],
			title: plainText(item.title),
			description: plainText(item.text),
			href: isLucy ? "/lucy" : "#contact",
			earlyAccess: isLucy,
		}
	})
}

interface LandingPageTemplateProps {
	page: LandingPageData
	locale: string
	form: FormDefinition | null
}

export function LandingPageTemplate({ page, locale, form }: LandingPageTemplateProps) {
	const c = parseLandingMarkdown(page.content)
	const headline = c.headline ?? page.title
	const problemParas = (c.problem?.blocks ?? []).filter((b): b is Extract<TextBlock, { type: "p" }> => b.type === "p")
	const problemRest = (c.problem?.blocks ?? []).filter((b) => b.type !== "p")

	const extrasBefore = c.extras.filter((e) => e.placement === "before")
	const extrasAfter = c.extras.filter((e) => e.placement === "after")
	const renderExtra = (e: (typeof c.extras)[number], i: number) => (
		<LandingTextSection key={`${e.placement}-${i}`} heading={e.heading}>
			<Blocks blocks={e.blocks} />
		</LandingTextSection>
	)

	return (
		<div className="no-scrollbar">
			<LandingHero
				headline={headline}
				subheadline={c.subheadline}
				service={page.service}
				city={page.city}
				heroImageUrl={page.heroImageUrl}
			/>
			<CredibilityBar />

			{c.problem && (
				<>
					<ProblemSection
						heading={c.problem.heading}
						lead={problemParas[0] ? <InlineMarkdown text={problemParas[0].text} /> : undefined}
						points={problemParas.slice(1).map((p, i) => <InlineMarkdown key={i} text={p.text} />)}
					/>
					{problemRest.length > 0 && (
						<div className="mx-auto max-w-3xl space-y-4 px-6 pb-12 text-lg leading-relaxed text-base-content/70">
							<Blocks blocks={problemRest} />
						</div>
					)}
				</>
			)}
			{extrasBefore.map(renderExtra)}

			{c.services && c.services.items.length > 0 && (
				<ServicesSection
					items={toServiceItems(c.services.items)}
					tag="What we build"
					title={c.services.heading}
				/>
			)}

			{c.process && c.process.steps.length > 0 && (
				<ProcessSection
					steps={c.process.steps.map((s) => ({ title: plainText(s.title), description: plainText(s.text) }))}
					heading={c.process.heading}
				/>
			)}

			<FieldReportsSection locale={locale} />

			{c.local && (
				<LandingLocalSection heading={c.local.heading} city={page.city} service={page.service}>
					<Blocks blocks={c.local.blocks} />
				</LandingLocalSection>
			)}
			{extrasAfter.map(renderExtra)}

			{c.faq && c.faq.items.length > 0 && (
				<FaqSection
					items={c.faq.items.map((f) => ({ question: plainText(f.question), answer: plainText(f.answer) }))}
					heading={c.faq.heading}
					emitSchema={false}
				/>
			)}

			<ContactCTASection
				form={form}
				heading={page.city ? `Let's talk about ${page.service ?? "your project"} in ${page.city}.` : undefined}
			/>
		</div>
	)
}
