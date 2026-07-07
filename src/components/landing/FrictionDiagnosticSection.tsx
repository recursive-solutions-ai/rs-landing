"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { frictionSignals } from "@/data/landing"

export function FrictionDiagnosticSection() {
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="diagnostic"
			className={cn("mx-auto max-w-7xl px-6 py-16", inView && "reveal-in")}
		>
			{/* Eyebrow + heading */}
			<div className="reveal max-w-3xl">
				<span className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
					<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
					Friction Diagnostic
				</span>
				<h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-base-content md:text-5xl">
					Friction is the silent tax on your business.
				</h2>
			</div>

			<div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
				{/* Narrative */}
				<div
					className="reveal space-y-5 text-lg leading-relaxed text-base-content/70"
					style={{ "--reveal-delay": "0.1s" } as CSSProperties}
				>
					<p>
						Most growing businesses don&apos;t have a strategy problem — they have a{" "}
						<strong className="font-semibold text-base-content">systems problem</strong>.
					</p>
					<p>
						Every disconnected tool, manual process, and workaround is costing your
						team hours every week.
					</p>
					<p>
						By the time the damage is obvious, you&apos;ve already lost margin and
						fallen further behind than you realize.
					</p>
					<p className="border-l-4 border-primary pl-5 text-base-content">
						<strong className="font-semibold">
							The hardest part: you can&apos;t diagnose it clearly from inside the
							business you&apos;re running.
						</strong>
					</p>
					<a
						href="#process"
						className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-base-content"
					>
						That&apos;s why every engagement starts with a Map — see the Blueprint ↓
					</a>
				</div>

				{/* Signal cards */}
				<div className="space-y-4">
					{frictionSignals.map((signal, i) => (
						<div
							key={signal.label}
							className={cn(
								"reveal flex gap-5 rounded-xl border border-l-4 bg-base-100 p-6",
								signal.accent
									? "border-primary/40 border-l-primary"
									: "border-base-300 border-l-base-300"
							)}
							style={{ "--reveal-delay": `${0.15 + i * 0.1}s` } as CSSProperties}
						>
							<span
								className={cn(
									"h-fit shrink-0 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider",
									signal.accent
										? "bg-primary text-primary-content"
										: "bg-neutral text-neutral-content"
								)}
							>
								{signal.label}
							</span>
							<p className="text-base leading-relaxed text-base-content/70">
								{signal.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
