"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { problem } from "../data/content"

gsap.registerPlugin(ScrollTrigger)

export function ProblemSection() {
	const sectionRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			const mm = gsap.matchMedia()

			mm.add("(min-width: 768px)", () => {
				const cards = gsap.utils.toArray<HTMLElement>(".problem-card")
				const dots = gsap.utils.toArray<HTMLElement>(".problem-dot")

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top",
						end: `+=${window.innerHeight * 4}`,
						pin: true,
						scrub: 1,
						anticipatePin: 1,
					},
				})

				cards.forEach((card, i) => {
					if (i === 0) {
						// First card starts visible
						tl.from(card, { xPercent: 100, opacity: 0, duration: 1 }, 0)
						tl.to(dots[i], { scale: 1.5, opacity: 1, duration: 0.5 }, 0)
					} else {
						// Fade out previous card
						tl.to(cards[i - 1], { xPercent: -50, opacity: 0, duration: 1 }, i)
						tl.to(dots[i - 1], { scale: 1, opacity: 0.3, duration: 0.5 }, i)
						// Slide in current card
						tl.from(card, { xPercent: 100, opacity: 0, duration: 1 }, i)
						tl.to(dots[i], { scale: 1.5, opacity: 1, duration: 0.5 }, i)
					}
					// Keep last card visible
					if (i === cards.length - 1) {
						tl.to(card, { duration: 0.5 }, i + 1)
					}
				})
			})

			mm.add("(max-width: 767px)", () => {
				gsap.utils.toArray<HTMLElement>(".problem-card").forEach((card) => {
					gsap.from(card, {
						y: 40,
						opacity: 0,
						duration: 0.8,
						ease: "power2.out",
						scrollTrigger: {
							trigger: card,
							start: "top 85%",
							toggleActions: "play none none none",
						},
					})
				})
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section ref={sectionRef} className="relative min-h-screen bg-neutral text-neutral-content overflow-hidden">
			{/* Warm tint overlay */}
			<div
				className="absolute inset-0 opacity-20 pointer-events-none"
				style={{ background: "radial-gradient(ellipse at center, rgba(220, 38, 38, 0.15), transparent 70%)" }}
			/>

			<div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-0 md:h-screen md:flex md:flex-col md:justify-center">
				<h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-12 md:mb-16">
					{problem.headline}
				</h2>

				{/* Progress dots — desktop only */}
				<div className="hidden md:flex gap-3 mb-10">
					{problem.painPoints.map((_, i) => (
						<div
							key={i}
							className="problem-dot w-2.5 h-2.5 rounded-full bg-neutral-content/50 opacity-30"
						/>
					))}
				</div>

				{/* Cards container */}
				<div className="relative md:h-48">
					{problem.painPoints.map((point, i) => (
						<div
							key={i}
							className={`problem-card md:absolute md:inset-0 mb-6 md:mb-0 rounded-2xl border border-neutral-content/10 bg-neutral-content/5 backdrop-blur-sm p-8 md:p-10 ${i > 0 ? "md:opacity-0" : ""}`}
						>
							<div className="text-xs font-bold tracking-widest uppercase text-primary mb-3 opacity-80">
								{String(i + 1).padStart(2, "0")}
							</div>
							<h3 className="text-xl md:text-2xl font-bold mb-3">{point.title}</h3>
							<p className="text-base md:text-lg text-neutral-content/70 leading-relaxed max-w-2xl">
								{point.text}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
