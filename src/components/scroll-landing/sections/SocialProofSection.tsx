"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"
import { socialProof } from "../data/content"

gsap.registerPlugin(ScrollTrigger)

export function SocialProofSection() {
	const sectionRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card")

			gsap.from(cards, {
				y: 50,
				opacity: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%",
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section ref={sectionRef} className="relative py-24 md:py-40 bg-base-200 overflow-hidden">
			<div className="max-w-6xl mx-auto px-6">
				<h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-16 text-center">
					{socialProof.headline}
				</h2>

				<div className="grid md:grid-cols-3 gap-6 md:gap-8">
					{socialProof.testimonials.map((testimonial, i) => (
						<div
							key={i}
							className="testimonial-card rounded-2xl border border-base-300 bg-base-100 p-8 shadow-lg"
						>
							<FontAwesomeIcon
								icon={faQuoteLeft}
								className="text-2xl text-primary/20 mb-4"
							/>
							<p className="text-base text-base-content/70 leading-relaxed mb-6 italic">
								&ldquo;{testimonial.quote}&rdquo;
							</p>
							<div>
								<p className="font-bold text-sm">{testimonial.name}</p>
								<p className="text-xs text-base-content/50">{testimonial.title}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
