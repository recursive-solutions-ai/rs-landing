"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { howItWorks } from "../data/content"

gsap.registerPlugin(ScrollTrigger)

export function HowItWorksSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const mm = gsap.matchMedia()

			mm.add("(min-width: 768px)", () => {
				const track = trackRef.current
				if (!track) return

				const cards = gsap.utils.toArray<HTMLElement>(".step-card")
				const totalScroll = track.scrollWidth - window.innerWidth

				// Horizontal scroll
				gsap.to(track, {
					x: -totalScroll,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top",
						end: () => `+=${totalScroll}`,
						pin: true,
						scrub: 1,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					},
				})

				// Scale up active card
				cards.forEach((card) => {
					gsap.fromTo(
						card,
						{ scale: 0.9, opacity: 0.5 },
						{
							scale: 1,
							opacity: 1,
							ease: "none",
							scrollTrigger: {
								trigger: card,
								containerAnimation: gsap.getById?.("horizontal") || undefined,
								start: "left 80%",
								end: "left 20%",
								scrub: true,
								toggleActions: "play reverse play reverse",
							},
						},
					)
				})
			})

			mm.add("(max-width: 767px)", () => {
				gsap.utils.toArray<HTMLElement>(".step-card").forEach((card) => {
					gsap.from(card, {
						y: 40,
						opacity: 0,
						duration: 0.8,
						ease: "power2.out",
						scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
					})
				})
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section ref={sectionRef} className="relative min-h-screen bg-neutral text-neutral-content overflow-hidden">
			<div className="relative z-10 h-screen flex flex-col justify-center md:py-0 py-24">
				{/* Fixed title */}
				<div className="px-6 md:px-12 mb-10 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter">
						{howItWorks.headline}
					</h2>
				</div>

				{/* Horizontal track — desktop */}
				<div className="hidden md:block overflow-visible">
					<div ref={trackRef} className="flex gap-8 px-12 will-change-transform">
						{howItWorks.steps.map((step, i) => (
							<div
								key={i}
								className="step-card shrink-0 w-[70vw] lg:w-[50vw] rounded-3xl border border-neutral-content/10 bg-neutral-content/5 backdrop-blur-sm p-10 lg:p-14"
							>
								<div className="text-7xl lg:text-9xl font-black text-neutral-content/10 mb-6 leading-none">
									{step.number}
								</div>
								<h3 className="text-2xl lg:text-3xl font-bold mb-4">{step.title}</h3>
								<p className="text-base lg:text-lg text-neutral-content/60 leading-relaxed max-w-xl">
									{step.text}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Vertical stack — mobile */}
				<div className="md:hidden px-6 space-y-6">
					{howItWorks.steps.map((step, i) => (
						<div key={i} className="step-card relative pl-12">
							{/* Timeline line */}
							{i < howItWorks.steps.length - 1 && (
								<div className="absolute left-4 top-10 bottom-0 w-px bg-neutral-content/20" />
							)}
							{/* Timeline dot */}
							<div className="absolute left-2 top-1 w-5 h-5 rounded-full border-2 border-primary bg-neutral flex items-center justify-center">
								<div className="w-2 h-2 rounded-full bg-primary" />
							</div>
							<div className="rounded-2xl border border-neutral-content/10 bg-neutral-content/5 p-6">
								<div className="text-xs font-bold tracking-widest uppercase text-primary mb-2 opacity-80">
									Step {step.number}
								</div>
								<h3 className="text-lg font-bold mb-2">{step.title}</h3>
								<p className="text-sm text-neutral-content/60 leading-relaxed">{step.text}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
