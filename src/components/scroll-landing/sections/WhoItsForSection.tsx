"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { whoItsFor } from "../data/content"

gsap.registerPlugin(ScrollTrigger)

export function WhoItsForSection() {
	const sectionRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			const mm = gsap.matchMedia()

			mm.add("(min-width: 768px)", () => {
				// Left column slides from left
				gsap.from(".audience-left", {
					x: -80,
					opacity: 0,
					duration: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 75%",
						end: "top 30%",
						scrub: true,
					},
				})

				// Right column slides from right with offset
				gsap.from(".audience-right", {
					x: 80,
					opacity: 0,
					duration: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 65%",
						end: "top 20%",
						scrub: true,
					},
				})
			})

			mm.add("(max-width: 767px)", () => {
				gsap.utils.toArray<HTMLElement>(".audience-card").forEach((card) => {
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
		<section ref={sectionRef} className="relative py-24 md:py-40 bg-base-200 overflow-hidden">
			<div className="max-w-6xl mx-auto px-6">
				<h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-16 md:mb-24 text-center">
					{whoItsFor.headline}
				</h2>

				<div className="grid md:grid-cols-2 gap-8 md:gap-12">
					{whoItsFor.audiences.map((audience, i) => (
						<div
							key={i}
							className={`audience-card ${i === 0 ? "audience-left" : "audience-right"} ${i === 1 ? "md:mt-16" : ""}`}
						>
							<div className="rounded-3xl border border-base-300 bg-base-100 p-8 md:p-12 shadow-xl">
								<div className="text-xs font-bold tracking-widest uppercase text-primary mb-4 opacity-80">
									{String(i + 1).padStart(2, "0")}
								</div>
								<h3 className="text-2xl md:text-3xl font-bold mb-4">{audience.title}</h3>
								<p className="text-base md:text-lg text-base-content/60 leading-relaxed">
									{audience.text}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
