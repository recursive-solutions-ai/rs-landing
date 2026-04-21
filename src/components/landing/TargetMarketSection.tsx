"use client"

import { useRef } from "react"
import {
	gsap,
	useGSAP,
	EASE_REVEAL,
	EASE_TEXT,
	DISTANCE_SM,
	DISTANCE_MD,
	DURATION_NORMAL,
	DURATION_FAST,
	START_HEADING,
	START_CONTENT,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const PAIN_POINTS = [
	{
		num: "01",
		text: "Wasting billable hours on repetitive data entry and manual follow-ups.",
	},
	{
		num: "02",
		text: "Worried about breaking the workflows that actually make you money.",
	},
	{
		num: "03",
		text: "Buried under \u201Canother software subscription\u201D that doesn\u2019t bring value.",
	},
]

export function TargetMarketSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const headingRef = useRef<HTMLDivElement>(null)
	const cardsRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	// Heading entrance
	useGSAP(
		() => {
			if (!headingRef.current || prefersReduced) return
			const children = headingRef.current.children
			gsap.set(children, { y: DISTANCE_SM, opacity: 0 })
			gsap.to(children, {
				y: 0,
				opacity: 1,
				duration: DURATION_NORMAL,
				stagger: 0.15,
				ease: EASE_REVEAL,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: START_HEADING,
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	// Pain-point cards: staggered entrance with number counter + line draw
	useGSAP(
		() => {
			if (!cardsRef.current || prefersReduced) return

			const cards = cardsRef.current.querySelectorAll("[data-pain-card]")

			cards.forEach((card, i) => {
				const num = card.querySelector("[data-pain-num]")
				const line = card.querySelector("[data-pain-line]")
				const text = card.querySelector("[data-pain-text]")

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: card,
						start: START_CONTENT,
						toggleActions: "play none none none",
					},
					delay: i * 0.2,
				})

				// Line draws in from top
				tl.fromTo(
					line,
					{ scaleY: 0 },
					{ scaleY: 1, duration: DURATION_FAST, ease: EASE_TEXT }
				)

				// Number fades up
				tl.fromTo(
					num,
					{ y: DISTANCE_MD, opacity: 0 },
					{ y: 0, opacity: 1, duration: DURATION_FAST, ease: EASE_REVEAL },
					"-=0.3"
				)

				// Text fades up
				tl.fromTo(
					text,
					{ y: DISTANCE_SM, opacity: 0 },
					{ y: 0, opacity: 1, duration: DURATION_NORMAL, ease: EASE_REVEAL },
					"-=0.4"
				)
			})
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	return (
		<section
			ref={sectionRef}
			className="mx-auto max-w-5xl px-6 py-24 text-center"
		>
			<div ref={headingRef}>
				<span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
					Who We Serve
				</span>
				<p className="text-2xl font-medium leading-relaxed text-base-content sm:text-3xl md:text-4xl">
					We work with service businesses ready to stop leaving growth on the table.
				</p>
			</div>

			<div
				ref={cardsRef}
				className="mt-14 grid gap-8 text-left sm:grid-cols-3"
			>
				{PAIN_POINTS.map((point) => (
					<div
						key={point.num}
						data-pain-card
						className="group relative flex flex-col items-start gap-4 rounded-xl border border-base-content/5 bg-base-200/40 p-6 transition-colors duration-300 hover:border-primary/20 hover:bg-base-200/70"
					>
						{/* Accent line */}
						<div
							data-pain-line
							className="absolute left-6 top-0 h-8 w-px origin-top bg-primary/60"
						/>

						{/* Number */}
						<span
							data-pain-num
							className="mt-4 text-4xl font-extralight tabular-nums text-primary/30 transition-colors duration-300 group-hover:text-primary/60"
						>
							{point.num}
						</span>

						{/* Text */}
						<p
							data-pain-text
							className="text-base leading-relaxed text-base-content/90"
						>
							{point.text}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
