"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { caseStudies } from "@/data/landing"
import { SectionHeading } from "./SectionHeading"
import { CaseStudyCard } from "./CaseStudyCard"

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

export function CaseStudiesSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const cardsRef = useRef<HTMLDivElement[]>([])
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (prefersReduced || cardsRef.current.length === 0) return

			const cards = cardsRef.current.filter(Boolean)

			gsap.set(cards, { y: 80, opacity: 0, scale: 0.95 })

			ScrollTrigger.batch(cards, {
				onEnter: (batch) => {
					gsap.to(batch, {
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 0.8,
						stagger: 0.1,
						ease: "power3.out",
					})
				},
				start: "top 85%",
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
				tag="What We Build"
				title="AI That Works For You"
				subtitle="From automating repetitive tasks to unlocking insights in your data — here's what's possible when AI meets your business."
				className="mb-16"
			/>

			<div className="grid auto-rows-[minmax(280px,1fr)] gap-6 md:grid-cols-2 lg:grid-cols-3">
				{caseStudies.map((study, index) => (
					<CaseStudyCard
						key={study.id}
						ref={(el) => {
							if (el) cardsRef.current[index] = el
						}}
						study={study}
					/>
				))}
			</div>
		</section>
	)
}
