"use client"

import { useRef } from "react"
import {
	gsap,
	useGSAP,
	EASE_TEXT,
	EASE_REVEAL,
	DISTANCE_SM,
	DURATION_FAST,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
// Testimonials section — temporarily disabled until real testimonials are available.
// Re-enable by adding back to page.tsx and providing testimonial data.

const PLACEHOLDER_TESTIMONIAL = {
	quote: "Testimonial coming soon.",
	author: "Coming Soon",
	role: "",
	company: "",
}

export function TestimonialsSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const quoteMarkRef = useRef<HTMLDivElement>(null)
	const wordsContainerRef = useRef<HTMLDivElement>(null)
	const authorRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	const testimonial = PLACEHOLDER_TESTIMONIAL
	const words = testimonial.quote.split(/\s+/).filter(Boolean)

	useGSAP(
		() => {
			if (!wordsContainerRef.current || prefersReduced) return

			/* -- Dark section clip-path entrance -- */
			if (sectionRef.current) {
				gsap.fromTo(
					sectionRef.current,
					{ clipPath: "inset(4% 1% round 3rem)" },
					{
						clipPath: "inset(0% 0% round 3rem)",
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 90%",
							end: "top 60%",
							scrub: true,
						},
					}
				)
			}

			const wordSpans = wordsContainerRef.current.querySelectorAll<HTMLSpanElement>(
				"[data-word]"
			)

			if (wordSpans.length === 0) return

			gsap.set(wordSpans, { clipPath: "inset(0 0 100% 0)" })
			if (authorRef.current) {
				gsap.set(authorRef.current, { opacity: 0, y: DISTANCE_SM })
			}
			if (quoteMarkRef.current) {
				gsap.set(quoteMarkRef.current, { opacity: 0, scale: 0.8 })
			}

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%",
					toggleActions: "play none none none",
				},
			})

			// Quote mark scales in first
			if (quoteMarkRef.current) {
				tl.to(quoteMarkRef.current, {
					opacity: 1,
					scale: 1,
					duration: 0.4,
					ease: EASE_REVEAL,
				})
			}

			tl.to(wordSpans, {
				clipPath: "inset(0 0 0% 0)",
				duration: DURATION_FAST,
				stagger: 0.02,
				ease: EASE_TEXT,
			})

			if (authorRef.current) {
				tl.to(
					authorRef.current,
					{ opacity: 1, y: 0, duration: DURATION_FAST, ease: EASE_REVEAL },
					"-=0.3"
				)
			}
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	return (
		<section
			ref={sectionRef}
			className="section-dark mx-4 overflow-hidden rounded-[3rem] py-24"
		>
			<div className="mx-auto max-w-5xl px-8 text-center">
				{/* Decorative quote mark */}
				<div
					ref={!prefersReduced ? quoteMarkRef : undefined}
					className="pointer-events-none mb-8 select-none text-[8rem] leading-none text-dark-foreground/5"
					aria-hidden="true"
				>
					&ldquo;
				</div>

				{/* Quote with word-by-word reveal */}
				{prefersReduced ? (
					<p className="mb-12 text-3xl font-light italic leading-relaxed text-dark-foreground md:text-5xl">
						&ldquo;{testimonial.quote}&rdquo;
					</p>
				) : (
					<div
						ref={wordsContainerRef}
						className="mb-12 flex flex-wrap justify-center text-3xl font-light italic leading-relaxed text-dark-foreground md:text-5xl"
					>
						<span className="inline-block overflow-hidden">
							<span
								data-word=""
								className="inline-block will-change-[clip-path]"
								style={{ clipPath: "inset(0 0 100% 0)" }}
							>
								&ldquo;
							</span>
						</span>
						{words.map((word, i) => (
							<span
								key={`${word}-${i}`}
								className="inline-block overflow-hidden"
							>
								<span
									data-word=""
									className="inline-block will-change-[clip-path]"
									style={{ clipPath: "inset(0 0 100% 0)" }}
								>
									{word}
								</span>
								{i < words.length - 1 && (
									<span className="inline-block w-[0.3em]">&nbsp;</span>
								)}
							</span>
						))}
						<span className="inline-block overflow-hidden">
							<span
								data-word=""
								className="inline-block will-change-[clip-path]"
								style={{ clipPath: "inset(0 0 100% 0)" }}
							>
								&rdquo;
							</span>
						</span>
					</div>
				)}

				{/* Author info */}
				<div
					ref={!prefersReduced ? authorRef : undefined}
					className="flex items-center justify-center gap-4"
				>
					<div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary to-accent" />
					<div className="text-left">
						<p className="font-bold text-dark-foreground">{testimonial.author}</p>
						<p className="text-sm text-dark-foreground/50">
							{testimonial.role}, {testimonial.company}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
