"use client"

import { useRef } from "react"
import {
	gsap,
	useGSAP,
	EASE_REVEAL,
	DISTANCE_MD,
	DURATION_NORMAL,
	START_CONTENT,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { proofStats, testimonials, type Testimonial } from "@/data/landing"
import { SectionHeading } from "./SectionHeading"

const ACCENT_TEXT = {
	primary: "text-primary",
	accent: "text-secondary",
	neutral: "text-base-content",
} as const

const AVATAR_BG = {
	primary: "bg-primary/20 text-primary",
	accent: "bg-secondary/20 text-secondary",
	neutral: "bg-base-content/20 text-base-content",
} as const

function TestimonialCard({ t }: { t: Testimonial }) {
	return (
		<div className="w-72 flex-shrink-0 rounded-xl border border-base-content/10 bg-base-100 p-8 shadow-xl">
			<p className="mb-6 text-sm leading-relaxed text-base-content/70">
				&ldquo;{t.quote}&rdquo;
			</p>
			<div className="flex items-center gap-3">
				<div
					className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${AVATAR_BG[t.accent]}`}
				>
					{t.initials}
				</div>
				<div>
					<div className="text-xs font-bold text-base-content">{t.name}</div>
					<div className="text-[10px] font-medium text-base-content/50">
						{t.role}
					</div>
				</div>
			</div>
		</div>
	)
}

export function ProofOfWorkSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const statsRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (prefersReduced || !statsRef.current) return

			const stats = statsRef.current.querySelectorAll("[data-stat]")

			gsap.set(stats, { y: DISTANCE_MD, opacity: 0 })

			gsap.to(stats, {
				y: 0,
				opacity: 1,
				duration: DURATION_NORMAL,
				stagger: 0.12,
				ease: EASE_REVEAL,
				scrollTrigger: {
					trigger: statsRef.current,
					start: START_CONTENT,
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	// Split testimonials into two columns for opposing scroll directions
	const colA = testimonials.filter((_, i) => i % 2 === 0)
	const colB = testimonials.filter((_, i) => i % 2 === 1)

	return (
		<section
			ref={sectionRef}
			id="proof"
			className="overflow-hidden bg-base-200/30 py-32"
		>
			<div className="mx-auto max-w-7xl px-6">
				<div className="grid items-center gap-20 lg:grid-cols-2">
					<div>
						<SectionHeading
							tag="Proof of Work"
							title="Results that speak the language of business"
							subtitle="See how service leaders are using practical AI to grow smarter, not just bigger."
							align="left"
							className="mb-12"
						/>

						<div
							ref={statsRef}
							className="flex gap-12 border-t border-base-content/10 pt-12"
						>
							{proofStats.map((stat) => (
								<div key={stat.label} data-stat>
									<div
										className={`mb-2 text-4xl font-extrabold ${ACCENT_TEXT[stat.accent]}`}
									>
										{stat.value}
									</div>
									<p className="text-xs font-bold uppercase tracking-widest text-base-content/50">
										{stat.label}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Testimonial scrolling columns */}
					<div className="relative flex h-[500px] gap-6 overflow-hidden">
						<div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-base-200/80 to-transparent" />
						<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-base-200/80 to-transparent" />

						<div className="flex animate-scroll-up flex-col gap-6 [animation-duration:25s]">
							{[...colA, ...colA].map((t, i) => (
								<TestimonialCard key={`a-${i}`} t={t} />
							))}
						</div>
						<div className="flex animate-scroll-up flex-col gap-6 [animation-direction:reverse] [animation-duration:30s]">
							{[...colB, ...colB].map((t, i) => (
								<TestimonialCard key={`b-${i}`} t={t} />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
