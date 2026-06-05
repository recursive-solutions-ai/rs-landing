"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"

/* ── HeroSection ────────────────────────────────────────────────────── */

export function HeroSection() {
	// Entrance plays once on mount (CSS reveal, no GSAP). Toggling `reveal-in`
	// on the content wrapper kicks off all child `.reveal` / `.reveal-clip`.
	const [revealed, setRevealed] = useState(false)

	useEffect(() => {
		const id = requestAnimationFrame(() => setRevealed(true))
		return () => cancelAnimationFrame(id)
	}, [])

	return (
		<section className="relative overflow-hidden bg-base-200">
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
				className={cn(
					"relative z-10 max-w-4xl mx-auto px-6 text-center pt-40 pb-16",
					revealed && "reveal-in"
				)}
			>
				{/* Tag */}
				<div className="reveal">
					<span className="inline-block px-4 py-1.5 bg-base-content/10 backdrop-blur-sm text-base-content/80 text-xs font-bold rounded-full mb-8 uppercase tracking-widest border border-base-content/10">
						The AI for growing businesses
					</span>
				</div>

				{/* Heading */}
				<h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold text-base-content mb-6 tracking-tight leading-[1.0] flex flex-wrap justify-center">
					<span className="inline-block overflow-hidden align-bottom reveal-mask">
						<span
							className="reveal-clip inline-block"
							style={{ "--reveal-delay": "0.15s" } as CSSProperties}
						>
							Lucy
						</span>
					</span>
				</h1>

				{/* Subtitle */}
				<p
					className="reveal text-lg md:text-xl text-base-content/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
					style={{ "--reveal-delay": "0.3s" } as CSSProperties}
				>
					Map, automate, and grow - without the guesswork.
				</p>

				{/* CTAs */}
				<div
					className="reveal flex flex-col sm:flex-row justify-center gap-4"
					style={{ "--reveal-delay": "0.45s" } as CSSProperties}
				>
					<ButtonLink
						href="#contact"
						className="btn btn-primary px-10 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/30 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.97] transition-all duration-300 border-none h-auto"
					>
						Get Early Access
					</ButtonLink>
					<ButtonLink
						href="#process"
						className="btn btn-ghost text-base-content border border-base-content/20 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-base-content/10 hover:-translate-y-1 active:scale-[0.97] transition-all duration-300 h-auto"
					>
						See How It Works
					</ButtonLink>
				</div>
			</div>

			{/* Scroll-down indicator */}
			<div
				className="hero-scroll-indicator absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
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
		</section>
	)
}
