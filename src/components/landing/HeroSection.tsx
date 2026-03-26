"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { ButtonLink } from "@/components/ui/ButtonLink"
import { HeroBackground } from "./HeroBackground"

// Register GSAP plugins once at module level
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

/* ── HeroSection ────────────────────────────────────────────────────── */

export function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const tagRef = useRef<HTMLDivElement>(null)
	const headingRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)
	const ctaRef = useRef<HTMLDivElement>(null)
	const reducedMotion = useReducedMotion()

	useGSAP(
		() => {
			if (reducedMotion || !sectionRef.current) return

			const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

			/* ── Tag line fade up ──────────────────────────────────── */
			tl.fromTo(
				tagRef.current,
				{ opacity: 0, y: 24 },
				{ opacity: 1, y: 0, duration: 0.8 }
			)

			/* ── Heading word reveal ───────────────────────────────── */
			if (headingRef.current) {
				const text = headingRef.current.textContent ?? ""
				const words = text.split(/\s+/).filter(Boolean)

				headingRef.current.innerHTML = words
					.map(
						(word) =>
							`<span class="inline-block overflow-hidden align-bottom"><span class="hero-word inline-block" style="clip-path: inset(0 0 100% 0)">${word}</span></span>`
					)
					.join(
						'<span class="inline-block w-[0.3em]">\u00A0</span>'
					)

				const wordEls =
					headingRef.current.querySelectorAll(".hero-word")

				tl.to(
					wordEls,
					{
						clipPath: "inset(0 0 0% 0)",
						duration: 1.0,
						stagger: 0.06,
						ease: "expo.out",
					},
					"-=0.3"
				)
			}

			/* ── Subtitle fade up ──────────────────────────────────── */
			tl.fromTo(
				subtitleRef.current,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.8 },
				"-=0.4"
			)

			/* ── CTA buttons stagger fade up ───────────────────────── */
			if (ctaRef.current) {
				const buttons = ctaRef.current.children
				tl.fromTo(
					buttons,
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
					"-=0.3"
				)
			}

			/* ── Scroll parallax on text content ───────────────────── */
			if (contentRef.current) {
				gsap.to(contentRef.current, {
					y: -80,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top",
						end: "bottom top",
						scrub: 0.5,
					},
				})
			}
		},
		{ scope: sectionRef, dependencies: [reducedMotion] }
	)

	return (
		<section
			ref={sectionRef}
			className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark"
		>
			{/* Three.js WebGL background */}
			<HeroBackground />

			{/* Gradient overlay for text legibility */}
			<div
				className="absolute inset-0 z-1 pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse at center, oklch(var(--dark-raw) / 0.3) 0%, oklch(var(--dark-raw) / 0.7) 70%, oklch(var(--dark-raw) / 0.9) 100%)",
				}}
				aria-hidden="true"
			/>

			{/* Text content */}
			<div
				ref={contentRef}
				className="relative z-10 max-w-4xl mx-auto px-6 text-center"
			>
				{/* Tag */}
				<div
					ref={tagRef}
					className={reducedMotion ? "" : "opacity-0"}
				>
					<span className="inline-block px-4 py-1.5 bg-dark-foreground/10 backdrop-blur-sm text-dark-foreground/80 text-xs font-bold rounded-full mb-8 uppercase tracking-widest border border-dark-foreground/10">
						AI-Powered Solutions
					</span>
				</div>

				{/* Heading */}
				<h1
					ref={headingRef}
					className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-dark-foreground mb-8 tracking-tight leading-[1.08]"
				>
					Modern Systems for Growing Businesses.
				</h1>

				{/* Subtitle */}
				<p
					ref={subtitleRef}
					className={`text-lg md:text-xl text-dark-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium ${
						reducedMotion ? "" : "opacity-0"
					}`}
				>
					We find the repetitive &lsquo;busy work&rsquo; slowing you
					down and replace it with smart, integrated systems that give
					your team their time back.
				</p>

				{/* CTAs */}
				<div
					ref={ctaRef}
					className="flex flex-col sm:flex-row justify-center gap-4"
				>
					<ButtonLink
						href="#contact"
						className={`btn btn-primary px-10 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all duration-300 border-none h-auto ${
							reducedMotion ? "" : "opacity-0"
						}`}
					>
						Book Your Free Audit
					</ButtonLink>
					<ButtonLink
						href="#solutions"
						className={`btn btn-ghost text-dark-foreground border border-dark-foreground/20 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-dark-foreground/10 hover:-translate-y-1 transition-all duration-300 h-auto ${
							reducedMotion ? "" : "opacity-0"
						}`}
					>
						Explore Solutions
					</ButtonLink>
				</div>
			</div>

			{/* Bottom gradient fade into next section */}
			<div
				className="absolute bottom-0 left-0 right-0 h-32 z-2 pointer-events-none"
				style={{
					background:
						"linear-gradient(to top, oklch(var(--b1)) 0%, transparent 100%)",
				}}
				aria-hidden="true"
			/>
		</section>
	)
}
