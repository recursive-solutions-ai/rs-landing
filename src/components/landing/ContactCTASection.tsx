"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { ButtonLink } from "@/components/ui"

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

export function ContactCTASection() {
	const sectionRef = useRef<HTMLElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (!contentRef.current || prefersReduced) return

			const children = contentRef.current.children

			gsap.set(children, { y: 30, opacity: 0 })

			gsap.to(children, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	return (
		<section
			ref={sectionRef}
			id="contact"
			className="mx-auto max-w-4xl px-6 py-24"
		>
			<div className="overflow-hidden rounded-[3rem] bg-primary p-12 text-center text-primary-content shadow-2xl md:p-20">
				<div ref={contentRef}>
					<h2 className="mb-6 text-3xl font-bold md:text-5xl">
						Ready to find your efficiency gaps?
					</h2>
					<p className="mx-auto mb-10 max-w-xl text-lg text-primary-content/80 md:text-xl">
						Book a 15-minute consultation to see exactly which manual tasks we
						can automate for you this week.
					</p>
					<ButtonLink
						href="#contact"
						className="btn btn-neutral h-auto border-none px-10 py-5 text-xl font-bold text-neutral-content shadow-xl transition hover:bg-neutral/80"
					>
						Schedule Your Audit
					</ButtonLink>
				</div>
			</div>
		</section>
	)
}
