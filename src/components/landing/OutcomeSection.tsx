"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"
import { outcomeCards } from "@/data/landing"

export function OutcomeSection() {
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="outcome"
			className={cn("mx-auto max-w-7xl px-6 py-16", inView && "reveal-in")}
		>
			{/* Eyebrow + heading */}
			<div className="reveal max-w-3xl">
				<span className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
					<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
					Outcome
				</span>
				<h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-base-content md:text-5xl">
					One partner. A system built around you.
				</h2>
				<p className="mt-5 text-lg leading-relaxed text-base-content/60">
					We map what&apos;s broken, build a custom solution, and operate it so you
					don&apos;t have to.
				</p>
			</div>

			{/* 2×2 outcome grid */}
			<div className="mt-12 grid gap-6 md:grid-cols-2">
				{outcomeCards.map((card, i) => (
					<div
						key={card.num}
						className={cn(
							"reveal group flex flex-col rounded-2xl border bg-base-100 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
							card.badge
								? "border-primary/40 hover:border-primary/60"
								: "border-base-300 hover:border-primary/50"
						)}
						style={{ "--reveal-delay": `${0.1 + i * 0.1}s` } as CSSProperties}
					>
						{/* Number / label + optional badge */}
						<div className="mb-4 flex items-center justify-between gap-2">
							<div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
								<span className="text-primary">{card.num}</span>
								<span className="text-base-content/30">/</span>
								<span className="text-base-content/50">{card.label}</span>
							</div>
							{card.badge && (
								<span className="rounded-md bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-content">
									{card.badge}
								</span>
							)}
						</div>

						<h3 className="mb-3 text-2xl font-bold tracking-tight text-base-content">
							{card.title}
						</h3>
						<p className="text-base leading-relaxed text-base-content/70">
							{card.description}
						</p>
					</div>
				))}
			</div>

			{/* CTA */}
			<div
				className="reveal mt-10"
				style={{ "--reveal-delay": "0.5s" } as CSSProperties}
			>
				<ButtonLink
					href="#contact"
					className="border border-base-300 bg-base-100 px-6 font-bold text-base-content shadow-none hover:border-primary hover:text-primary"
				>
					Map my system →
				</ButtonLink>
			</div>
		</section>
	)
}
