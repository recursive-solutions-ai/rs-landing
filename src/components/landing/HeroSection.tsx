"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"

export function HeroSection({ locale }: { locale: string }) {
	const [revealed, setRevealed] = useState(false)
	useEffect(() => {
		const id = requestAnimationFrame(() => setRevealed(true))
		return () => cancelAnimationFrame(id)
	}, [])

	return (
		<section className="bg-base-100">
			<div
				className={cn(
					"mx-auto max-w-4xl px-6 pt-28 pb-12 text-center",
					revealed && "reveal-in"
				)}
			>
				<span className="reveal inline-block text-sm font-semibold uppercase tracking-widest text-primary">
					Growth Systems &amp; AI Consulting
				</span>
				<h1
					className="reveal font-display mt-4 text-5xl font-semibold leading-[1.08] tracking-tight text-base-content md:text-6xl"
					style={{ "--reveal-delay": "0.1s" } as CSSProperties}
				>
					We make your business simpler, faster, and more valuable.
				</h1>
				<div
					className="reveal mt-8 flex flex-wrap items-center justify-center gap-5"
					style={{ "--reveal-delay": "0.3s" } as CSSProperties}
				>
					<ButtonLink href="#contact" className="btn btn-primary px-8 text-base font-bold">
						Book a Consult
					</ButtonLink>
					<ButtonLink href={`/${locale}/lucy`} className="font-bold text-base-content hover:text-primary">
						Explore the system →
					</ButtonLink>
				</div>
			</div>
		</section>
	)
}
