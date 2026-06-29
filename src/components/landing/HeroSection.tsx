"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"

const CAPABILITIES = [
	"Website & conversion",
	"Content & SEO",
	"Lead capture",
	"CRM & pipeline",
	"Analytics & growth ops",
]

export function HeroSection() {
	const [revealed, setRevealed] = useState(false)
	useEffect(() => {
		const id = requestAnimationFrame(() => setRevealed(true))
		return () => cancelAnimationFrame(id)
	}, [])

	return (
		<section className="bg-base-100">
			<div
				className={cn(
					"mx-auto grid max-w-7xl items-center gap-12 px-6 pt-36 pb-24 md:grid-cols-[1.15fr_0.85fr]",
					revealed && "reveal-in"
				)}
			>
				{/* Left: copy */}
				<div>
					<span className="reveal inline-block text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
						Growth Systems &amp; AI Consulting
					</span>
					<h1
						className="reveal font-display mt-4 text-5xl font-semibold leading-[1.08] tracking-tight text-base-content md:text-6xl"
						style={{ "--reveal-delay": "0.1s" } as CSSProperties}
					>
						We make your business simpler, faster, and more valuable.
					</h1>
					<p
						className="reveal mt-6 max-w-xl text-lg leading-relaxed text-base-content/60"
						style={{ "--reveal-delay": "0.2s" } as CSSProperties}
					>
						Instead of scattered tools and generic software, one vertical system —
						website, content, SEO, leads, CRM, analytics — run by a hands-on team.
						When you need more, we build it.
					</p>
					<div
						className="reveal mt-8 flex flex-wrap items-center gap-5"
						style={{ "--reveal-delay": "0.3s" } as CSSProperties}
					>
						<ButtonLink href="#contact" className="btn btn-primary px-8 text-base font-bold">
							Book a Consult
						</ButtonLink>
						<ButtonLink href="#system" className="font-bold text-base-content hover:text-primary">
							Explore the system →
						</ButtonLink>
					</div>
				</div>

				{/* Right: capability panel */}
				<div
					className="reveal rounded-box border border-base-300 bg-base-200 p-6 shadow-sm"
					style={{ "--reveal-delay": "0.25s" } as CSSProperties}
				>
					<p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-base-content/50">
						One system, one place
					</p>
					<ul className="divide-y divide-base-300">
						{CAPABILITIES.map((cap, i) => (
							<li key={cap} className="flex items-center gap-3 py-3 text-sm font-semibold text-base-content">
								<span className="w-5 text-xs font-extrabold text-primary">
									{String(i + 1).padStart(2, "0")}
								</span>
								{cap}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
