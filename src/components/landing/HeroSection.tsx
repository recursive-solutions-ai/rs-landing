"use client"

import { useRef } from "react"
import {
	gsap,
	ScrollTrigger,
	useGSAP,
	EASE_TEXT,
	DISTANCE_SM,
	DURATION_NORMAL,
	DURATION_FAST,
	DURATION_SLOW,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { ButtonLink } from "@/components/ui/button-link"
import { HeroBackground } from "./HeroBackground"

/* ── HeroSection ────────────────────────────────────────────────────── */

export function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const tagRef = useRef<HTMLDivElement>(null)
	const headingRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)
	const ctaRef = useRef<HTMLDivElement>(null)
	const scrollIndicatorRef = useRef<HTMLDivElement>(null)
	const reducedMotion = useReducedMotion()

	useGSAP(
		() => {
			if (reducedMotion || !sectionRef.current) return

			const tl = gsap.timeline({ defaults: { ease: EASE_TEXT } })

			/* ── Tag line fade up ──────────────────────────────────── */
			tl.fromTo(
				tagRef.current,
				{ opacity: 0, y: DISTANCE_SM },
				{ opacity: 1, y: 0, duration: DURATION_NORMAL }
			)

			/* ── Heading word reveal ───────────────────────────────── */
			if (headingRef.current) {
				const wordEls =
					headingRef.current.querySelectorAll<HTMLSpanElement>("[data-hero-word]")

				if (wordEls.length > 0) {
					tl.to(
						wordEls,
						{
							clipPath: "inset(0 0 0% 0)",
							duration: DURATION_SLOW,
							stagger: 0.06,
							ease: EASE_TEXT,
						},
						"-=0.3"
					)
				}
			}

			/* ── Subtitle fade up ──────────────────────────────────── */
			tl.fromTo(
				subtitleRef.current,
				{ opacity: 0, y: DISTANCE_SM },
				{ opacity: 1, y: 0, duration: DURATION_NORMAL },
				"-=0.4"
			)

			/* ── CTA buttons stagger fade up ───────────────────────── */
			if (ctaRef.current) {
				const buttons = ctaRef.current.children
				tl.fromTo(
					buttons,
					{ opacity: 0, y: DISTANCE_SM },
					{ opacity: 1, y: 0, duration: DURATION_FAST, stagger: 0.12 },
					"-=0.3"
				)
			}

			/* ── Scroll indicator bounce + fade ────────────────────── */
			if (scrollIndicatorRef.current) {
				gsap.fromTo(
					scrollIndicatorRef.current,
					{ opacity: 0, y: 10 },
					{ opacity: 1, y: 0, duration: DURATION_FAST, delay: 2.5, ease: EASE_TEXT }
				)

				gsap.to(scrollIndicatorRef.current, {
					y: 8,
					duration: 1.2,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					delay: 3,
				})

				gsap.to(scrollIndicatorRef.current, {
					opacity: 0,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top",
						end: "15% top",
						scrub: true,
					},
				})
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
			className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base-200"
		>
			{/* Three.js WebGL background */}
			<HeroBackground />

			{/* Gradient overlay for text legibility */}
			<div
				className="absolute inset-0 z-1 pointer-events-none"
				style={{
					background: "var(--hero-overlay)",
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
					<span className="inline-block px-4 py-1.5 bg-base-content/10 backdrop-blur-sm text-base-content/80 text-xs font-bold rounded-full mb-8 uppercase tracking-widest border border-base-content/10">
						For Service Businesses Ready to Lead
					</span>
				</div>

				{/* Heading */}
				<h1
					ref={headingRef}
					className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-base-content mb-8 tracking-tight leading-[1.08] flex flex-wrap justify-center"
				>
					{(reducedMotion
						? ["Every Great Business Will Run on AI. We Get You There First."]
						: "Every Great Business Will Run on AI. We Get You There First.".split(/\s+/).filter(Boolean)
					).map((word, i, arr) => (
						<span key={i}>
							<span className="inline-block overflow-hidden align-bottom">
								<span
									data-hero-word=""
									className="inline-block"
									style={reducedMotion ? undefined : { clipPath: "inset(0 0 100% 0)" }}
								>
									{word}
								</span>
							</span>
							{i < arr.length - 1 && (
								<span className="inline-block w-[0.3em]">&nbsp;</span>
							)}
						</span>
					))}
				</h1>

				{/* Subtitle */}
				<p
					ref={subtitleRef}
					className={`text-lg md:text-xl text-base-content/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium ${
						reducedMotion ? "" : "opacity-0"
					}`}
				>
					We exist to help good people and great businesses not just survive the future — but thrive in it.
				</p>

				{/* CTAs */}
				<div
					ref={ctaRef}
					className="flex flex-col sm:flex-row justify-center gap-4"
				>
					<ButtonLink
						href="#contact"
						className={`btn btn-primary px-10 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/30 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.97] transition-all duration-300 border-none h-auto ${
							reducedMotion ? "" : "opacity-0"
						}`}
					>
						Book a Discovery Meeting
					</ButtonLink>
					<ButtonLink
						href="#process"
						className={`btn btn-ghost text-base-content border border-base-content/20 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-base-content/10 hover:-translate-y-1 active:scale-[0.97] transition-all duration-300 h-auto ${
							reducedMotion ? "" : "opacity-0"
						}`}
					>
						See How We Work
					</ButtonLink>
				</div>
			</div>

			{/* Scroll-down indicator */}
			{!reducedMotion && (
				<div
					ref={scrollIndicatorRef}
					className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 opacity-0"
					aria-hidden="true"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-base-content/40"
					>
						<path d="M12 5v14M19 12l-7 7-7-7" />
					</svg>
				</div>
			)}

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
