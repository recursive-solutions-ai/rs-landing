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
import { team } from "@/data/landing"
import { SectionHeading } from "./SectionHeading"

export function TeamSection() {
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
			id="team"
			className="mx-auto max-w-5xl px-6 py-32"
		>
			<SectionHeading
				tag="Who We Are"
				title="Built by Operators, Not Just Developers"
				subtitle="We've spent our careers inside the businesses we now serve. We know what works because we've lived it."
				className="mb-16"
			/>

			<div className="grid gap-8 md:grid-cols-3">
				{team.map((member, index) => (
					<div
						key={member.name}
						ref={(el) => {
							if (el) cardsRef.current[index] = el
						}}
						className="flex flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30"
					>
						{member.image ? (
							<div className="mb-6 h-36 aspect-square overflow-hidden rounded-full ring-2 ring-primary/20">
								<img
									src={member.image}
									alt={member.name}
									className="h-full w-full object-cover"
								/>
							</div>
						) : (
							<div className="mb-6 flex h-36 aspect-square items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent text-3xl font-bold text-primary-content">
								{member.initials}
							</div>
						)}
						<h3 className="mb-1 text-xl font-bold text-base-content">
							{member.name}
						</h3>
						<p className="mb-4 text-sm font-semibold text-primary">
							{member.role}
						</p>
						<p className="text-sm leading-relaxed text-base-content/60">
							{member.bio}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
