"use client"

import { useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { hero } from "../data/content"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const headlineRef = useRef<HTMLHeadingElement>(null)
	const subRef = useRef<HTMLParagraphElement>(null)
	const ctaRef = useRef<HTMLDivElement>(null)
	const supportRef = useRef<HTMLParagraphElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			// Entrance animation — staggered word reveal
			const words = headlineRef.current?.querySelectorAll(".word")
			if (words) {
				gsap.from(words, {
					y: 60,
					opacity: 0,
					duration: 0.8,
					stagger: 0.08,
					ease: "power3.out",
					delay: 0.2,
				})
			}
			gsap.from(subRef.current, { y: 30, opacity: 0, duration: 0.8, delay: 0.8, ease: "power2.out" })
			gsap.from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6, delay: 1.0, ease: "power2.out" })
			gsap.from(supportRef.current, { y: 20, opacity: 0, duration: 0.6, delay: 1.2, ease: "power2.out" })

			// Scroll-linked parallax fade-out
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top top",
					end: "bottom top",
					scrub: 1,
				},
			})

			tl.to(headlineRef.current, { y: -120, opacity: 0 }, 0)
			tl.to(subRef.current, { y: -80, opacity: 0 }, 0.05)
			tl.to(ctaRef.current, { y: -50, opacity: 0 }, 0.1)
			tl.to(supportRef.current, { y: -40, opacity: 0 }, 0.12)
			tl.to(bgRef.current, { scale: 1, opacity: 0.3 }, 0)
		},
		{ scope: sectionRef },
	)

	// Split headline into words for staggered animation
	const words = hero.headline.split(" ")

	return (
		<section
			ref={sectionRef}
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
		>
			{/* Animated background */}
			<div
				ref={bgRef}
				className="absolute inset-0 scale-110"
				style={{
					background:
						"radial-gradient(ellipse at 30% 20%, color-mix(in oklch, var(--color-primary) 15%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, color-mix(in oklch, var(--color-accent, #0d9488) 10%, transparent) 0%, transparent 60%)",
				}}
			/>

			{/* Content */}
			<div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
				<h1
					ref={headlineRef}
					className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-8"
				>
					{words.map((word, i) => (
						<span key={i} className="word inline-block mr-[0.25em]">
							{i === words.length - 3 || i === words.length - 2 || i === words.length - 1 ? (
								<span className="gradient-text">{word}</span>
							) : (
								word
							)}
						</span>
					))}
				</h1>

				<p
					ref={subRef}
					className="text-lg md:text-xl lg:text-2xl text-base-content/60 max-w-3xl mx-auto leading-relaxed mb-10"
				>
					{hero.subheadline}
				</p>

				<div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
					<Link
						href="#how-it-works"
						className="btn btn-primary btn-lg rounded-xl text-base font-bold shadow-xl shadow-primary/25 border-none px-10"
					>
						{hero.cta}
					</Link>
				</div>

				<p ref={supportRef} className="text-sm md:text-base text-base-content/40">
					{hero.supporting}
				</p>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-base-content/30">
				<span className="text-xs tracking-widest uppercase">Scroll</span>
				<div className="w-px h-8 bg-base-content/20 animate-pulse" />
			</div>
		</section>
	)
}
