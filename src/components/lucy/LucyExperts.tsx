"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { lucyExperts } from "@/data/landing"
import { SectionHeading } from "@/components/landing/SectionHeading"

export function LucyExperts() {
	const { ref, inView } = useInView<HTMLDivElement>()
	return (
		<section className="bg-base-200">
			<div className="mx-auto max-w-6xl px-6 py-24">
				<SectionHeading
					tag="The experts"
					title="Lucy doesn't work alone."
					subtitle="She directs a team of experts, each trained on your business."
					className="mb-16"
				/>
				<div
					ref={ref}
					className={cn(
						"grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
						inView && "reveal-in"
					)}
				>
					{lucyExperts.map((e, i) => (
						<div
							key={e.name}
							className="reveal rounded-2xl border border-base-300 bg-base-100 p-6"
							style={{ "--reveal-delay": `${i * 0.08}s` } as CSSProperties}
						>
							<span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 font-display text-lg text-primary ring-1 ring-primary/20">
								{e.initial}
							</span>
							<div className="font-display text-lg text-base-content">{e.name}</div>
							<div className="text-xs font-bold uppercase tracking-widest text-primary/70">
								{e.role}
							</div>
							<p className="mt-2 text-sm text-base-content/60">{e.blurb}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
