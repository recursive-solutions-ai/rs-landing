"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt, faPenNib, faHeadset, faSliders } from "@fortawesome/free-solid-svg-icons"
import { solution } from "../data/content"

gsap.registerPlugin(ScrollTrigger)

const iconMap = {
	bolt: faBolt,
	"pen-nib": faPenNib,
	headset: faHeadset,
	sliders: faSliders,
} as const

export function SolutionSection() {
	const sectionRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			const mm = gsap.matchMedia()

			mm.add("(min-width: 768px)", () => {
				const cards = gsap.utils.toArray<HTMLElement>(".solution-card")

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

				// Intro text fades in
				tl.from(".solution-intro", { y: 30, opacity: 0, duration: 0.8 }, 0)

				// Cards unstack — each slides up from behind the previous
				cards.forEach((card, i) => {
					const yStart = 80 + i * 20
					tl.from(
						card,
						{
							y: yStart,
							scale: 0.92,
							opacity: 0,
							duration: 1.2,
						},
						0.5 + i * 1.0,
					)
					// Slightly push previous cards up and scale down
					if (i > 0) {
						tl.to(
							cards[i - 1],
							{
								y: -(i * 15),
								scale: 1 - i * 0.03,
								opacity: 0.6,
								duration: 1.2,
							},
							0.5 + i * 1.0,
						)
					}
				})
			})

			mm.add("(max-width: 767px)", () => {
				gsap.from(".solution-intro", {
					y: 30,
					opacity: 0,
					duration: 0.8,
					scrollTrigger: { trigger: ".solution-intro", start: "top 85%", toggleActions: "play none none none" },
				})
				gsap.utils.toArray<HTMLElement>(".solution-card").forEach((card, i) => {
					gsap.from(card, {
						y: 40,
						opacity: 0,
						duration: 0.8,
						delay: i * 0.1,
						ease: "power2.out",
						scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
					})
				})
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section ref={sectionRef} className="relative min-h-screen bg-base-100 overflow-hidden">
			{/* Cool tint overlay — shifts from problem warm to solution cool */}
			<div
				className="absolute inset-0 opacity-30 pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse at 60% 40%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 70%)",
				}}
			/>

			<div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-0 md:h-screen md:flex md:flex-col md:justify-center">
				<h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-6">
					{solution.headline}
				</h2>

				<p className="solution-intro text-base md:text-lg text-base-content/60 max-w-3xl leading-relaxed mb-12 md:mb-16">
					{solution.intro}
				</p>

				{/* Stacked cards area */}
				<div className="relative">
					<div className="grid gap-4 md:gap-0 md:relative md:h-52">
						{solution.benefits.map((benefit, i) => (
							<div
								key={i}
								className={`solution-card rounded-2xl border border-base-300 bg-base-100 shadow-lg p-6 md:p-8 md:absolute md:inset-x-0 md:top-0 ${i > 0 ? "md:opacity-0" : ""}`}
								style={{ zIndex: solution.benefits.length - i }}
							>
								<div className="flex items-start gap-4">
									<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
										<FontAwesomeIcon
											icon={iconMap[benefit.icon as keyof typeof iconMap]}
											className="text-lg"
										/>
									</div>
									<div>
										<h3 className="text-lg md:text-xl font-bold mb-2">{benefit.title}</h3>
										<p className="text-sm md:text-base text-base-content/60 leading-relaxed">
											{benefit.text}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
