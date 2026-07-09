"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"
import { FrictionEstimator } from "./FrictionEstimator"

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
					"mx-auto grid max-w-6xl gap-12 px-6 pt-28 pb-12 lg:grid-cols-2 lg:items-center",
					revealed && "reveal-in"
				)}
			>
				<div className="text-center lg:text-left">
					<span className="reveal inline-block text-sm font-semibold uppercase tracking-widest text-primary">
						Growth Systems &amp; AI Consulting
					</span>
					<h1
						className="reveal font-display mt-4 text-5xl font-semibold leading-[1.08] tracking-tight text-base-content md:text-6xl"
						style={{ "--reveal-delay": "0.1s" } as CSSProperties}
					>
						We make your business simpler, faster, and more valuable.
					</h1>
					<p
						className="reveal mt-6 max-w-xl text-lg leading-relaxed text-base-content/70 mx-auto lg:mx-0"
						style={{ "--reveal-delay": "0.2s" } as CSSProperties}
					>
						One vertical system for your website, content, SEO, leads, CRM, and
						analytics, run by a hands-on team. Plus custom automations, bespoke
						tools, and consulting.
					</p>
					<div
						className="reveal mt-8 flex flex-wrap items-center justify-center gap-5 lg:justify-start"
						style={{ "--reveal-delay": "0.3s" } as CSSProperties}
					>
						<ButtonLink href="#contact" className="btn btn-primary px-8 text-base font-bold">
							Book a Consult
						</ButtonLink>
						<ButtonLink href={`/${locale}/lucy`} className="font-bold text-base-content hover:text-primary">
							Explore Lucy →
						</ButtonLink>
					</div>
				</div>

				<div
					className="reveal w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end"
					style={{ "--reveal-delay": "0.4s" } as CSSProperties}
				>
					<FrictionEstimator />
				</div>
			</div>
		</section>
	)
}
