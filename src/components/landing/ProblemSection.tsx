"use client"

import { type CSSProperties, type ReactNode } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

interface ProblemSectionProps {
	heading?: ReactNode
	lead?: ReactNode
	/** Extra problem statements, rendered as accent cards under the lead. */
	points?: ReactNode[]
}

export function ProblemSection({
	heading = "Most businesses are stitched together from a dozen disconnected tools.",
	lead = "Generic software, scattered logins, nothing that talks to each other: slower decisions, wasted hours, lost leads.",
	points = [],
}: ProblemSectionProps = {}) {
	const { ref, inView } = useInView<HTMLDivElement>()

	return (
		<section className="bg-base-100">
			<div
				ref={ref}
				className={cn("mx-auto max-w-4xl px-6 py-24 text-center", inView && "reveal-in")}
			>
				<h2 className="reveal font-display text-3xl font-semibold leading-tight text-base-content md:text-4xl">
					{heading}
				</h2>
				<p
					className="reveal mx-auto mt-5 max-w-2xl text-base text-base-content/60 md:text-lg"
					style={{ "--reveal-delay": "0.1s" } as CSSProperties}
				>
					{lead}
				</p>
				{points.length > 0 && (
					<div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
						{points.map((point, i) => (
							<div
								key={i}
								className="reveal flex flex-col gap-4 rounded-xl border border-base-300 border-l-4 border-l-primary bg-base-100 p-6"
								style={{ "--reveal-delay": `${0.15 + i * 0.1}s` } as CSSProperties}
							>
								<span className="w-fit rounded-md bg-neutral px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-neutral-content">
									{String(i + 1).padStart(2, "0")}
								</span>
								<div className="text-base leading-relaxed text-base-content/70">{point}</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	)
}
