"use client"

import { useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { ctaFooter } from "../data/content"

gsap.registerPlugin(ScrollTrigger)

export function CTAFooterSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			// Background color fill
			gsap.from(bgRef.current, {
				scaleY: 0,
				transformOrigin: "bottom center",
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					end: "top 30%",
					scrub: true,
				},
			})

			// CTA card scale up
			gsap.from(".cta-card", {
				scale: 0.9,
				opacity: 0,
				y: 40,
				duration: 0.8,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".cta-card",
					start: "top 80%",
					toggleActions: "play none none none",
				},
			})

			// Footer fade in
			gsap.from(".scroll-footer", {
				opacity: 0,
				y: 20,
				duration: 0.6,
				delay: 0.3,
				scrollTrigger: {
					trigger: ".scroll-footer",
					start: "top 95%",
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: sectionRef },
	)

	const appName = "Recursive Solutions"

	return (
		<section ref={sectionRef} id="cta" className="relative overflow-hidden">
			{/* Animated primary background */}
			<div
				ref={bgRef}
				className="absolute inset-0 bg-primary"
			/>

			<div className="relative z-10">
				{/* CTA area */}
				<div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
					<div className="cta-card text-center max-w-3xl">
						<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-primary-content mb-6 leading-tight">
							{ctaFooter.headline}
						</h2>
						<p className="text-lg md:text-xl text-primary-content/70 mb-10 leading-relaxed">
							{ctaFooter.subheadline}
						</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							<Link
								href="/contact"
								className="btn btn-lg bg-primary-content text-primary rounded-xl font-bold shadow-xl border-none px-10 hover:scale-105 transition-transform"
							>
								{ctaFooter.primaryCta}
							</Link>
						</div>
						<p className="mt-6 text-sm text-primary-content/50">
							{ctaFooter.secondaryCta}
						</p>
					</div>
				</div>

				{/* Footer */}
				<footer className="scroll-footer border-t border-primary-content/10 px-6 py-12">
					<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
						<div className="flex items-center gap-3">
							<svg width="24" height="24" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M25 25C25 38.8 36.2 50 50 50C63.8 50 75 38.8 75 25C75 11.2 63.8 0 50 0C36.2 0 25 11.2 25 25ZM0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0C11.2 0 0 11.2 0 25Z"
									stroke="currentColor"
									strokeWidth="12"
									className="text-primary-content/60"
								/>
							</svg>
							<span className="text-sm text-primary-content/50">{ctaFooter.tagline}</span>
						</div>
						<div className="flex items-center gap-6 text-sm text-primary-content/50">
							<Link href="/privacy" className="hover:text-primary-content/80 transition">Privacy</Link>
							<Link href="/terms" className="hover:text-primary-content/80 transition">Terms</Link>
							<Link href="/contact" className="hover:text-primary-content/80 transition">Contact</Link>
							<ThemeToggle />
						</div>
					</div>
					<div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-primary-content/10 text-center">
						<p className="text-xs text-primary-content/30">
							&copy; {new Date().getFullYear()} {appName}. All rights reserved.
						</p>
					</div>
				</footer>
			</div>
		</section>
	)
}
