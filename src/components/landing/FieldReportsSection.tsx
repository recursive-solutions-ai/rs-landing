"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { fieldReports } from "@/data/landing"

export function FieldReportsSection() {
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="field-reports"
			className={cn("mx-auto max-w-7xl px-6 py-16", inView && "reveal-in")}
		>
			{/* Eyebrow + heading + stat strip */}
			<div className="flex flex-col items-center text-center">
				<div className="reveal max-w-3xl">
					<span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
						Field Reports
					</span>
					<h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-base-content md:text-5xl">
						What clients are saying.
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-base-content/60">
					</p>
				</div>
			</div>

			{/* Reports */}
			<div className="mt-12 grid gap-6 md:grid-cols-3">
				{fieldReports.map((report, i) => (
					<figure
						key={report.label}
						className={cn(
							"reveal flex flex-col rounded-2xl border bg-base-100 p-8",
							report.accent
								? "border-primary/40"
								: "border-base-300"
						)}
						style={{ "--reveal-delay": `${0.1 + i * 0.1}s` } as CSSProperties}
					>
						<figcaption className="text-xs font-bold uppercase tracking-widest text-primary">
							{report.label}
						</figcaption>
						<blockquote className="mt-5 text-lg leading-relaxed text-base-content">
							&ldquo;{report.quote}&rdquo;
						</blockquote>
						<div className="my-6 border-t border-base-300" />
						<p className="text-xs font-semibold uppercase tracking-widest text-base-content/70">
							{report.attribution}
						</p>
					</figure>
				))}
			</div>
		</section>
	)
}
