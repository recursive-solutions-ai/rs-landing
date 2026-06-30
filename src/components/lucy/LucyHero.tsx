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

export function LucyHero({ locale }: { locale: string }) {
	const [revealed, setRevealed] = useState(false)
	useEffect(() => {
		const id = requestAnimationFrame(() => setRevealed(true))
		return () => cancelAnimationFrame(id)
	}, [])

	return (
		<section className="bg-base-100">
			<div
				className={cn(
					"mx-auto grid max-w-7xl items-center gap-12 px-6 pt-28 pb-12 md:grid-cols-2",
					revealed && "reveal-in"
				)}
			>
				{/* Left: copy */}
				<div className="text-center">
					<h1
						className="reveal font-display text-5xl font-semibold leading-[1.08] tracking-tight text-base-content md:text-6xl"
						style={{ "--reveal-delay": "0.1s" } as CSSProperties}
					>
						Meet Lucy
					</h1>
					<p
						className="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-base-content/60"
						style={{ "--reveal-delay": "0.2s" } as CSSProperties}
					>
						The one vertical system that runs your growth.
					</p>
					<div
						className="reveal mt-8 flex flex-wrap items-center justify-center gap-5"
						style={{ "--reveal-delay": "0.3s" } as CSSProperties}
					>
						<ButtonLink href="#contact" className="btn-primary px-8 text-base font-bold">
							Get Early Access
						</ButtonLink>
						<ButtonLink
							href={`/${locale}`}
							className="font-bold text-base-content hover:text-primary"
						>
							← Back to overview
						</ButtonLink>
					</div>
				</div>

				{/* Right: capability panel (the "one system, one place" table) */}
				<div
					className="reveal rounded-box border border-base-300 bg-base-200 p-6 shadow-sm"
					style={{ "--reveal-delay": "0.25s" } as CSSProperties}
				>
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
