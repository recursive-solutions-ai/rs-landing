"use client"

import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

export function CredibilityBar() {
	const { ref, inView } = useInView<HTMLDivElement>()

	return (
		<section className="border-y border-base-300 bg-base-200">
			<div
				ref={ref}
				className={cn(
					"mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between",
					inView && "reveal-in"
				)}
			>
				<p className="reveal max-w-2xl text-sm font-medium text-base-content/80 md:text-base">
					<span className="font-bold text-primary">Operators, not theorists.</span>{" "}
					Built by a team with special-operations, operations, and engineering
					backgrounds — we run businesses, then build the systems that fix them.
				</p>
				<div className="reveal flex items-center gap-4 opacity-60">
					<span className="text-[10px] font-bold uppercase tracking-widest text-base-content/50">
						Trusted by
					</span>
					{/* Replace with real client logos when available */}
					<div className="h-4 w-16 rounded bg-base-300" />
					<div className="h-4 w-16 rounded bg-base-300" />
					<div className="h-4 w-16 rounded bg-base-300" />
				</div>
			</div>
		</section>
	)
}
