"use client"

import { useRef } from "react"
import {
	gsap,
	useGSAP,
	EASE_REVEAL,
	DISTANCE_SM,
	DURATION_NORMAL,
	START_HEADING,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function TargetMarketSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (!contentRef.current || prefersReduced) return

			const children = contentRef.current.children

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

	return (
		<section
			ref={sectionRef}
			className="mx-auto max-w-4xl px-6 py-24 text-center"
		>
			<div ref={contentRef}>
				<span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
					Who We Serve
				</span>
				<p className="text-2xl font-medium leading-relaxed text-base-content sm:text-3xl md:text-4xl">
					We work with small and medium service businesses that know AI
					matters — but haven&apos;t figured out how to use it yet.
				</p>
			</div>
		</section>
	)
}
