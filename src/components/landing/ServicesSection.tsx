"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { services } from "@/data/landing"
import { SectionHeading } from "./SectionHeading"
import { ServiceCard } from "./ServiceCard"

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

export function ServicesSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const cardsRef = useRef<HTMLDivElement[]>([])
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (prefersReduced || cardsRef.current.length === 0) return

			const cards = cardsRef.current.filter(Boolean)

			gsap.set(cards, { y: 60, opacity: 0 })

			gsap.to(cards, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.15,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
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
				tag="What We Do"
				title="Built for the AI Era"
				subtitle="We deploy intelligent systems across your business — from marketing and sales to internal operations — so your team can focus on what matters."
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
