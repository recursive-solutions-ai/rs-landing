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
import { services } from "@/data/landing"
import { SectionHeading } from "./SectionHeading"
import { ServiceCard } from "./ServiceCard"

export function ServicesSection() {
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
			id="services"
			className="mx-auto max-w-7xl px-6 py-32"
		>
			<SectionHeading
				tag="Our Services"
				title="A Clear Path to AI Adoption"
				subtitle="From your first assessment to fully managed AI agents — a service ladder designed to meet you where you are. Starting at $2,500."
				className="mb-16"
			/>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{services.map((service, index) => (
					<ServiceCard
						key={service.id}
						ref={(el) => {
							if (el) cardsRef.current[index] = el
						}}
						service={service}
						index={index}
					/>
				))}
			</div>
		</section>
	)
}
