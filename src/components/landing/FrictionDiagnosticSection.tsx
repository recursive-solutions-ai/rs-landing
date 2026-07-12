"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { frictionSignals, outcomeCards } from "@/data/landing"

export function FrictionDiagnosticSection() {
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="diagnostic"
			className={cn("mx-auto max-w-7xl px-6 py-16", inView && "reveal-in")}
		>
			{/* Eyebrow + heading — the problem */}
			<div className="reveal max-w-3xl mx-auto text-center">
				<span className="mb-4 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
					<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
					Friction Diagnostic
				</span>
				<h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-base-content md:text-5xl">
					Friction is the silent tax on your business.
				</h2>
			</div>

			{/* Signal cards — one matching row */}
			<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{frictionSignals.map((signal, i) => (
					<div
						key={signal.label}
						className="reveal flex flex-col gap-4 rounded-xl border border-base-300 bg-base-100 p-6"
						style={{ "--reveal-delay": `${0.1 + i * 0.1}s` } as CSSProperties}
					>
						<span className="w-fit rounded-md bg-neutral px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-neutral-content">
							{signal.label}
						</span>
						<p className="text-base leading-relaxed text-base-content/70">
							{signal.description}
						</p>
					</div>
				))}
			</div>

			{/* Pivot to the outcome — same section, problem → what changes */}
			<div
				className="reveal mt-20 max-w-3xl mx-auto text-center"
				style={{ "--reveal-delay": "0.1s" } as CSSProperties}
			>
				<span className="mb-4 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
					<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
					The Fix
				</span>
				<h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-base-content md:text-5xl">
					One partner. A system built around you.
				</h2>
				<p className="mt-5 text-lg leading-relaxed text-base-content/60">

				</p>
			</div>

			{/* Outcome grid */}
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
						<div className="mb-4 flex items-center justify-between gap-2">
							<div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
								<span className="text-primary">{card.num}</span>
								<span className="text-base-content/40">/</span>
								<span className="text-base-content/70">{card.label}</span>
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
		</section>
	)
}
