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
			data-theme="rs-dark"
			className={cn(
				"blueprint-grid relative mx-4 overflow-hidden rounded-[3rem] bg-base-100",
				inView && "reveal-in"
			)}
		>
			<div className="relative mx-auto max-w-7xl px-6 py-16">
				{/* Header: centered */}
				<div className="reveal mb-8 text-center">
					<span className="mb-4 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
						<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
						The Blueprint
					</span>
					<h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-base-content md:text-5xl">
						From Strategy to Scale in Four Steps.
					</h2>
				</div>

				{/* 4-card grid with hairline dividers (v8 style) */}
				<div className="grid grid-cols-1 gap-px border border-base-content/20 bg-base-content/20 md:grid-cols-2 lg:grid-cols-4">
					{processSteps.map((step, i) => (
						<div
							key={step.step}
							className="reveal group relative bg-base-100 p-10 transition-colors hover:bg-base-content/5"
							style={{ "--reveal-delay": `${0.15 + i * 0.12}s` } as CSSProperties}
						>
							{/* Large corner number */}
							<div className="pointer-events-none absolute right-0 top-0 p-4 text-4xl font-bold text-base-content/10">
								{String(step.step).padStart(2, "0")}
							</div>

							<h3 className="mb-6 text-xl font-bold text-base-content">
								{step.title}
							</h3>
							<p className="text-sm leading-relaxed text-base-content/50">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
