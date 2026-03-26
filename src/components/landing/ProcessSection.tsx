"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { processSteps } from "@/data/landing"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./SectionHeading"

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

export function ProcessSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const lineRef = useRef<HTMLDivElement>(null)
	const mobileLineRef = useRef<HTMLDivElement>(null)
	const stepsRef = useRef<HTMLDivElement[]>([])
	const numberRefs = useRef<HTMLSpanElement[]>([])
	const prefersReduced = useReducedMotion()

	/* ------------------------------------------------------------------ */
	/*  Desktop horizontal timeline + mobile vertical stepper animations   */
	/* ------------------------------------------------------------------ */
	useGSAP(
		() => {
			if (prefersReduced || !sectionRef.current) return

			const steps = stepsRef.current.filter(Boolean)
			const numbers = numberRefs.current.filter(Boolean)

			if (steps.length === 0) return

			/* -- Desktop connecting line scales from left to right -- */
			if (lineRef.current) {
				gsap.set(lineRef.current, {
					scaleX: 0,
					transformOrigin: "left center",
				})

				gsap.to(lineRef.current, {
					scaleX: 1,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 60%",
						end: "bottom 60%",
						scrub: 1,
					},
				})
			}

			/* -- Mobile vertical line -- */
			if (mobileLineRef.current) {
				gsap.set(mobileLineRef.current, {
					scaleY: 0,
					transformOrigin: "top center",
				})

				gsap.to(mobileLineRef.current, {
					scaleY: 1,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 60%",
						end: "bottom 60%",
						scrub: 1,
					},
				})
			}

			/* -- Steps fade in with stagger -- */
			gsap.set(steps, { y: 40, opacity: 0 })

			gsap.to(steps, {
				y: 0,
				opacity: 1,
				duration: 0.7,
				stagger: 0.2,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%",
					toggleActions: "play none none none",
				},
			})

			/* -- Number counter animation -- */
			numbers.forEach((numEl, i) => {
				const target = { val: 0 }

				gsap.to(target, {
					val: i + 1,
					duration: 1,
					delay: i * 0.2,
					ease: "power2.out",
					snap: { val: 1 },
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%",
						toggleActions: "play none none none",
					},
					onUpdate() {
						numEl.textContent = String(Math.round(target.val))
					},
				})
			})
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	return (
		<section
			ref={sectionRef}
			id="process"
			className="section-dark mx-4 overflow-hidden rounded-[3rem] bg-[#111111] text-white"
		>
			<div className="mx-auto max-w-7xl px-6 py-32">
				<SectionHeading
					tag="How We Work"
					title="From Audit to Optimization"
					subtitle="A proven process that takes you from identifying opportunities to deploying production-ready AI systems."
					align="center"
					className="mb-20 [&_h2]:text-white [&_p]:text-white/60 [&_span]:text-white/80"
				/>

				{/* ===== Desktop horizontal timeline (md+) ===== */}
				<div className="relative hidden md:block">
					{/* Connecting line */}
					<div className="absolute left-0 right-0 top-8 z-0 mx-auto flex items-center px-[calc(12.5%-16px)]">
						<div
							ref={lineRef}
							className="h-px w-full bg-white/20"
						/>
					</div>

					{/* Steps */}
					<div className="relative z-10 grid grid-cols-4 gap-8">
						{processSteps.map((step, i) => (
							<div
								key={step.step}
								ref={(el) => {
									if (el) stepsRef.current[i] = el
								}}
								className="flex flex-col items-center text-center"
							>
								{/* Numbered circle */}
								<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[#111111]">
									<span
										ref={(el) => {
											if (el) numberRefs.current[i] = el
										}}
										className="text-xl font-bold text-white"
									>
										{prefersReduced ? step.step : 0}
									</span>
								</div>

								{/* Icon */}
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
									<FontAwesomeIcon
										icon={step.icon}
										className="h-5 w-5 text-primary"
									/>
								</div>

								{/* Title */}
								<h3 className="mb-2 text-lg font-bold text-white">
									{step.title}
								</h3>

								{/* Description */}
								<p className="text-sm leading-relaxed text-white/50">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* ===== Mobile vertical stepper ===== */}
				<div className="relative md:hidden">
					{/* Vertical line */}
					<div className="absolute bottom-0 left-8 top-0 z-0 flex justify-center">
						<div
							ref={mobileLineRef}
							className="h-full w-px bg-white/20"
						/>
					</div>

					{/* Steps */}
					<div className="relative z-10 flex flex-col gap-12">
						{processSteps.map((step, i) => (
							<div
								key={step.step}
								ref={(el) => {
									/*
									 * Mobile and desktop use the same ref array.
									 * Desktop elements are hidden (display:none) so
									 * they won't be in the DOM at mobile breakpoints.
									 * We offset mobile refs to avoid overwriting desktop ones.
									 */
									if (el) stepsRef.current[i + processSteps.length] = el
								}}
								className="flex items-start gap-6"
							>
								{/* Numbered circle */}
								<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#111111]">
									<span className="text-xl font-bold text-white">
										{step.step}
									</span>
								</div>

								{/* Content */}
								<div className="pt-2">
									<div className="mb-2 flex items-center gap-3">
										<FontAwesomeIcon
											icon={step.icon}
											className="h-4 w-4 text-primary"
										/>
										<h3 className="text-lg font-bold text-white">
											{step.title}
										</h3>
									</div>
									<p className="text-sm leading-relaxed text-white/50">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
