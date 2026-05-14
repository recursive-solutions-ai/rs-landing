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
			className="relative overflow-hidden bg-base-200"
		>
			{/* Gradient overlay for text legibility */}
			<div
				className="absolute inset-0 z-1 pointer-events-none bg-base-100/50 backdrop-blur-2xl"
				aria-hidden="true"
			/>

			{/* Top lamp glow */}
			<div
				className="absolute inset-0 z-2 pointer-events-none overflow-hidden"
				aria-hidden="true"
			>
				<div
					className="absolute inset-x-0 top-0 h-full lamp-fade"
					style={{
						background:
							"radial-gradient(ellipse 70% 80% at 50% 0%, var(--lamp-color), transparent 70%)",
					}}
				/>
				<div
					className="lamp-anim absolute left-1/2 top-0 h-40 w-[36rem] -translate-x-1/2 -translate-y-[40%] rounded-full bg-primary/50 blur-3xl"
					style={{ animationName: "lamp-bloom" }}
				/>
				<div
					className="lamp-anim absolute left-1/2 top-0 h-0.5 -translate-x-1/2 bg-primary/60"
					style={{ animationName: "lamp-line" }}
				/>
			</div>

			{/* Text content */}
			<div
				ref={contentRef}
				className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-40 pb-16"
			>
				{/* Tag */}
				<div ref={tagRef} className={reducedMotion ? "" : "opacity-0"}>
					<span className="inline-block px-4 py-1.5 bg-base-content/10 backdrop-blur-sm text-base-content/80 text-xs font-bold rounded-full mb-8 uppercase tracking-widest border border-base-content/10">
						The AI for growing businesses
					</span>
				</div>

				{/* Heading */}
				<h1
					ref={headingRef}
					className="text-6xl sm:text-7xl md:text-9xl font-extrabold text-base-content mb-6 tracking-tight leading-[1.0] flex flex-wrap justify-center"
				>
					{(reducedMotion ? ["Lucy"] : "Lucy".split(/\s+/).filter(Boolean)).map(
						(word, i, arr) => (
							<span key={i}>
								<span className="inline-block overflow-hidden align-bottom reveal-mask">
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
						)
					)}
				</h1>

				{/* Subtitle */}
				<p
					ref={subtitleRef}
					className={`text-lg md:text-xl text-base-content/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium ${reducedMotion ? "" : "opacity-0"}`}
				>
					Map, automate, and grow - without the guesswork.
				</p>

				{/* CTAs */}
				<div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4">
					<ButtonLink
						href="#contact"
						className={`btn btn-primary px-10 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/30 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.97] transition-all duration-300 border-none h-auto ${reducedMotion ? "" : "opacity-0"}`}
					>
						Get Early Access
					</ButtonLink>
					<ButtonLink
						href="#process"
						className={`btn btn-ghost text-base-content border border-base-content/20 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-base-content/10 hover:-translate-y-1 active:scale-[0.97] transition-all duration-300 h-auto ${reducedMotion ? "" : "opacity-0"}`}
					>
						See How It Works
					</ButtonLink>
				</div>
			</div>

			{/* App screenshot placeholder */}
			{/* <div className="relative z-10 max-w-6xl mx-auto px-6 pb-0">
				<div className="rounded-t-2xl border border-base-content/10 border-b-0 overflow-hidden shadow-2xl shadow-base-content/10">
					<div className="flex items-center gap-2 px-4 py-3 bg-base-300/80 border-b border-base-content/10 backdrop-blur-sm">
						<div className="w-3 h-3 rounded-full bg-base-content/20" />
						<div className="w-3 h-3 rounded-full bg-base-content/20" />
						<div className="w-3 h-3 rounded-full bg-base-content/20" />
						<div className="flex-1 mx-4 bg-base-content/10 rounded-full h-5 max-w-xs" />
					</div>
					<div className="aspect-[16/9] bg-gradient-to-br from-base-300 via-base-200 to-base-300 flex items-center justify-center">
						<div className="text-center space-y-3">
							<div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mx-auto flex items-center justify-center">
								<div className="w-8 h-8 rounded-full bg-primary/40" />
							</div>
							<p className="text-base-content/30 text-sm font-medium tracking-wide uppercase">
								Screenshot coming soon
							</p>
						</div>
					</div>
				</div>
			</div> */}

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
		</section>
	)
}
