"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"

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
					"mx-auto max-w-4xl px-6 pt-36 pb-20 text-center",
					revealed && "reveal-in"
				)}
			>
				<span className="reveal inline-block text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
					The platform · Lucy
				</span>
				<h1
					className="reveal font-display mt-4 text-5xl font-semibold leading-[1.08] tracking-tight text-base-content md:text-6xl"
					style={{ "--reveal-delay": "0.1s" } as CSSProperties}
				>
					Meet Lucy — the system that runs your growth.
				</h1>
				<p
					className="reveal mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-base-content/60"
					style={{ "--reveal-delay": "0.2s" } as CSSProperties}
				>
					Your website, content, SEO, lead capture, CRM, and analytics — one vertical
					system, run for you by a hands-on team.
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
		</section>
	)
}
