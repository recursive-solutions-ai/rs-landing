"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { faqItems } from "@/data/landing"

const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqItems.map((item) => ({
		"@type": "Question",
		name: item.question,
		acceptedAnswer: { "@type": "Answer", text: item.answer },
	})),
}

export function FaqSection() {
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="faq"
			className={cn("mx-auto max-w-4xl px-6 py-16", inView && "reveal-in")}
		>
			{/* Static site-authored data only; escape "<" so no text can close the script tag. */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
				}}
			/>

			{/* Eyebrow + heading */}
			<div className="reveal max-w-3xl">
				<span className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
					<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
					Common Questions
				</span>
				<h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-base-content md:text-5xl">
					Answers before you ask.
				</h2>
			</div>

			<div className="mt-10 space-y-4">
				{faqItems.map((item, i) => (
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
