"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { faqItems } from "@/data/landing"

function buildFaqSchema(items: { question: string; answer: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: { "@type": "Answer", text: item.answer },
		})),
	}
}

interface FaqSectionProps {
	items?: { question: string; answer: string }[]
	tag?: string
	heading?: string
	/** Set false when the host page already emits its own FAQPage JSON-LD. */
	emitSchema?: boolean
}

export function FaqSection({
	items = faqItems,
	tag = "Common Questions",
	heading = "Answers before you ask.",
	emitSchema = true,
}: FaqSectionProps = {}) {
	const faqSchema = emitSchema ? buildFaqSchema(items) : null
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="faq"
			className={cn("mx-auto max-w-4xl px-6 py-16", inView && "reveal-in")}
		>
			{/* Static site-authored data only; escape "<" so no text can close the script tag. */}
			{faqSchema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
					}}
				/>
			)}

			{/* Eyebrow + heading */}
			<div className="reveal max-w-3xl mx-auto text-center">
				<span className="mb-4 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
					<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
					{tag}
				</span>
				<h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-base-content md:text-5xl">
					{heading}
				</h2>
			</div>

			<div className="mt-10 space-y-4">
				{items.map((item, i) => (
					<div
						key={item.question}
						className="reveal collapse collapse-arrow rounded-xl border border-base-300 bg-base-100"
						style={{ "--reveal-delay": `${0.1 + i * 0.06}s` } as CSSProperties}
					>
						<input
							type="radio"
							name="faq-accordion"
							defaultChecked={i === 0}
							aria-label={item.question}
						/>
						<div className="collapse-title text-lg font-bold text-base-content">
							{item.question}
						</div>
						<div className="collapse-content">
							<p className="text-base leading-relaxed text-base-content/70">
								{item.answer}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
