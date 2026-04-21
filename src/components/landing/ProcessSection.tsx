"use client"

import { useRef } from "react"
import {
	gsap,
	useGSAP,
	EASE_REVEAL,
	DISTANCE_MD,
	DURATION_NORMAL,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { processSteps } from "@/data/landing"

export function ProcessSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const headingRef = useRef<HTMLDivElement>(null)
	const stepsRef = useRef<HTMLDivElement[]>([])
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (prefersReduced || !sectionRef.current) return

			/* -- Dark section clip-path entrance -- */
			gsap.fromTo(
				sectionRef.current,
				{ clipPath: "inset(4% 1% round 3rem)" },
				{
					clipPath: "inset(0% 0% round 3rem)",
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 90%",
						end: "top 60%",
						scrub: true,
					},
				}
			)

			/* -- Heading reveal -- */
			if (headingRef.current) {
				gsap.fromTo(
					headingRef.current,
					{ y: DISTANCE_MD, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: DURATION_NORMAL,
						ease: EASE_REVEAL,
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 75%",
							toggleActions: "play none none none",
						},
					}
				)
			}

			/* -- Steps fade in with stagger -- */
			const steps = stepsRef.current.filter(Boolean)
			if (steps.length === 0) return

			gsap.fromTo(
				steps,
				{ y: DISTANCE_MD, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: DURATION_NORMAL,
					stagger: 0.12,
					ease: EASE_REVEAL,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 65%",
						toggleActions: "play none none none",
					},
				}
			)
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	return (
		<section
			ref={sectionRef}
			id="process"
			className="section-dark blueprint-grid relative mx-4 overflow-hidden rounded-[3rem]"
		>
			<div className="relative mx-auto max-w-7xl px-6 py-32">
				{/* Header: title left, subtitle right (v8 layout) */}
				<div
					ref={headingRef}
					className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
				>
					<div className="max-w-2xl">
						<span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
							The Blueprint
						</span>
						<h2 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-dark-foreground md:text-5xl">
							From Chaos to Clarity <br />
							in Four Steps.
						</h2>
					</div>
					<p className="max-w-sm text-lg text-dark-foreground/40">
						A simple, repeatable process designed to get you from &ldquo;how?&rdquo;
						to &ldquo;done&rdquo; without the friction.
					</p>
				</div>

				{/* 4-card grid with hairline dividers (v8 style) */}
				<div className="grid grid-cols-1 gap-px border border-dark-foreground/20 bg-dark-foreground/20 md:grid-cols-2 lg:grid-cols-4">
					{processSteps.map((step, i) => (
						<div
							key={step.step}
							ref={(el) => {
								if (el) stepsRef.current[i] = el
							}}
							className="group relative bg-dark p-10 transition-colors hover:bg-dark-foreground/[0.02]"
						>
							{/* Large corner number */}
							<div className="pointer-events-none absolute right-0 top-0 p-4 font-heading text-4xl font-bold text-dark-foreground/5 transition-colors group-hover:text-primary/20">
								{String(step.step).padStart(2, "0")}
							</div>

							<h3 className="mb-6 font-heading text-xl font-bold text-dark-foreground">
								{step.title}
							</h3>
							<p className="text-sm leading-relaxed text-dark-foreground/50">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
