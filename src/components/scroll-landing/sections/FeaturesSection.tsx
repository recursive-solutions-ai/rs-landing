"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faGlobe,
	faFeather,
	faLifeRing,
	faChartLine,
	faServer,
	faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons"
import { features } from "../data/content"

gsap.registerPlugin(ScrollTrigger)

const icons = [faGlobe, faFeather, faLifeRing, faChartLine, faServer, faArrowsRotate]

export function FeaturesSection() {
	const sectionRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			const items = gsap.utils.toArray<HTMLElement>(".feature-item")

			gsap.from(items, {
				scale: 0.8,
				opacity: 0,
				y: 30,
				duration: 0.6,
				stagger: 0.1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 75%",
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section ref={sectionRef} className="relative py-24 md:py-40 bg-base-100 overflow-hidden">
			<div className="max-w-6xl mx-auto px-6">
				<h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-16 text-center">
					{features.headline}
				</h2>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
					{features.items.map((item, i) => (
						<div
							key={i}
							className="feature-item group rounded-2xl border border-base-300 bg-base-100 p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30"
						>
							<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
								<FontAwesomeIcon icon={icons[i]} className="text-lg" />
							</div>
							<p className="text-sm md:text-base font-medium leading-relaxed text-base-content/80">
								{item}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
