"use client"

import { useRef } from "react"
import {
	gsap,
	useGSAP,
	EASE_REVEAL,
	DISTANCE_LG,
	DURATION_NORMAL,
	START_CONTENT,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { outcomes } from "@/data/landing"
import { SectionHeading } from "./SectionHeading"

const ACCENT_COLORS = [
	"from-purple-500/20 to-purple-500/5 border-purple-500/20",
	"from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
	"from-sky-500/20 to-sky-500/5 border-sky-500/20",
	"from-amber-500/20 to-amber-500/5 border-amber-500/20",
]

export function CaseStudiesSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const cardsRef = useRef<HTMLDivElement[]>([])
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (prefersReduced || cardsRef.current.length === 0) return

			const cards = cardsRef.current.filter(Boolean)

			gsap.set(cards, { y: DISTANCE_LG, opacity: 0 })

			gsap.to(cards, {
				y: 0,
				opacity: 1,
				duration: DURATION_NORMAL,
				delay: 0.3,
				stagger: 0.15,
				ease: EASE_REVEAL,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: START_CONTENT,
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	return (
		<section
			ref={sectionRef}
			id="work"
			className="mx-auto max-w-7xl px-6 py-32"
		>
			<SectionHeading
				tag="What We Deliver"
				title="Real Outcomes, Not Demos"
				subtitle="These are the results our service tiers produce — practical AI that changes how your team works every day."
				className="mb-16"
			/>

			<div className="grid gap-6 md:grid-cols-2">
				{outcomes.map((outcome, index) => (
					<div
						key={outcome.id}
						ref={(el) => {
							if (el) cardsRef.current[index] = el
						}}
						className={`group relative flex flex-col rounded-2xl border bg-gradient-to-br p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${ACCENT_COLORS[index % ACCENT_COLORS.length]}`}
					>
						<span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-base-content/50">
							{outcome.category}
						</span>
						<h3 className="mb-3 text-xl font-bold text-base-content">
							{outcome.title}
						</h3>
						<p className="text-base leading-relaxed text-base-content/70">
							{outcome.description}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
