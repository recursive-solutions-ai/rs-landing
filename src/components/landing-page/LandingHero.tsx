"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"
import { LucyAnimation } from "@/components/landing/LucyAnimation"

interface LandingHeroProps {
	headline: string
	subheadline?: string | null
	service?: string | null
	city?: string | null
	heroImageUrl?: string | null
}

export function LandingHero({ headline, subheadline, service, city, heroImageUrl }: LandingHeroProps) {
	const [revealed, setRevealed] = useState(false)
	useEffect(() => {
		const id = requestAnimationFrame(() => setRevealed(true))
		return () => cancelAnimationFrame(id)
	}, [])

	return (
		<section className="relative overflow-hidden bg-base-100">
			{/* Ambient glow behind the visual */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
			/>
			<div
				className={cn(
					"relative mx-auto grid max-w-6xl gap-12 px-6 pt-28 pb-12 lg:grid-cols-2 lg:items-center",
					revealed && "reveal-in"
				)}
			>
				<div className="text-center lg:text-left">
					<span className="reveal inline-flex flex-wrap items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary lg:justify-start">
						{service && <span>{service}</span>}
						{service && city && <span className="text-primary/40">/</span>}
						{city && (
							<span className="rounded-md bg-neutral px-2.5 py-1 text-xs font-bold tracking-wider text-neutral-content">
								{city}
							</span>
						)}
						{!service && !city && <span>AI &amp; Operations</span>}
					</span>
					<h1
						className="reveal font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-base-content sm:text-5xl md:text-6xl"
						style={{ "--reveal-delay": "0.1s" } as CSSProperties}
					>
						{headline}
					</h1>
					{subheadline && (
						<p
							className="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-base-content/70 lg:mx-0"
							style={{ "--reveal-delay": "0.2s" } as CSSProperties}
						>
							{subheadline}
						</p>
					)}
					<div
						className="reveal mt-8 flex flex-wrap items-center justify-center gap-5 lg:justify-start"
						style={{ "--reveal-delay": "0.3s" } as CSSProperties}
					>
						<ButtonLink href="#contact" className="btn btn-primary px-8 text-base font-bold">
							Book a Consult
						</ButtonLink>
						<ButtonLink href="#process" className="font-bold text-base-content hover:text-primary">
							See how it works →
						</ButtonLink>
					</div>
				</div>

				<div
					className="reveal mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end"
					style={{ "--reveal-delay": "0.4s" } as CSSProperties}
				>
					{heroImageUrl ? (
						<div className="aspect-video overflow-hidden rounded-3xl border border-base-300 shadow-xl shadow-primary/10">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={heroImageUrl} alt={headline} className="h-full w-full object-cover" />
						</div>
					) : (
						<div className="relative aspect-video overflow-hidden rounded-3xl bg-[#0a0b14] shadow-xl shadow-primary/10 ring-1 ring-white/10">
							<LucyAnimation />
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
