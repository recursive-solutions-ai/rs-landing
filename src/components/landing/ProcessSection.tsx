"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { processSteps } from "@/data/landing"

export function ProcessSection() {
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="process"
			className={cn(
				"section-dark blueprint-grid relative mx-4 overflow-hidden rounded-[3rem]",
				inView && "reveal-in"
			)}
		>
			<div className="relative mx-auto max-w-7xl px-6 py-16">
				{/* Header: centered */}
				<div className="reveal mb-8 text-center">
					<span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
						The Blueprint
					</span>
					<h2 className="font-display font-heading text-4xl font-extrabold leading-tight tracking-tight text-dark-foreground md:text-5xl">
						From Strategy to Scale in Four Steps.
					</h2>
				</div>

				{/* 4-card grid with hairline dividers (v8 style) */}
				<div className="grid grid-cols-1 gap-px border border-dark-foreground/20 bg-dark-foreground/20 md:grid-cols-2 lg:grid-cols-4">
					{processSteps.map((step, i) => (
						<div
							key={step.step}
							className="reveal group relative bg-dark p-10 transition-colors hover:bg-dark-foreground/[0.02]"
							style={{ "--reveal-delay": `${0.15 + i * 0.12}s` } as CSSProperties}
						>
							{/* Large corner number */}
							<div className="pointer-events-none absolute right-0 top-0 p-4 font-heading text-4xl font-bold text-dark-foreground/5">
								{String(step.step).padStart(2, "0")}
							</div>

							<h3 className="mb-6 font-heading text-xl font-bold text-dark-foreground">
								{step.title}
							</h3>
							<p className="text-sm leading-relaxed text-dark-foreground/50">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
