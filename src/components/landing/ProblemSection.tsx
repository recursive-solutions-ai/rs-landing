"use client"

import { type CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

export function ProblemSection() {
	const { ref, inView } = useInView<HTMLDivElement>()

	return (
		<section className="bg-base-100">
			<div
				ref={ref}
				className={cn("mx-auto max-w-4xl px-6 py-24 text-center", inView && "reveal-in")}
			>
				<h2 className="reveal font-display text-3xl font-semibold leading-tight text-base-content md:text-4xl">
					Most businesses are stitched together from a dozen disconnected tools.
				</h2>
				<p
					className="reveal mx-auto mt-5 max-w-2xl text-base text-base-content/60 md:text-lg"
					style={{ "--reveal-delay": "0.1s" } as CSSProperties}
				>
					Generic software, scattered logins, nothing that talks to each other —
					slower decisions, wasted hours, lost leads.
				</p>
			</div>
		</section>
	)
}
