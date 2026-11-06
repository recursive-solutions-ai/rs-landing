"use client"

import type { CSSProperties, ReactNode } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

/** Generic fallback section so any unexpected H2 from Lucy still renders, styled like the rest of the page. */
export function LandingTextSection({ heading, children }: { heading: string; children: ReactNode }) {
	const { ref, inView } = useInView<HTMLElement>()
	return (
		<section ref={ref} className={cn("mx-auto max-w-3xl px-6 py-16", inView && "reveal-in")}>
			<div className="reveal">
				<h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-base-content md:text-4xl">
					{heading}
				</h2>
			</div>
			<div
				className="reveal mt-6 space-y-4 text-lg leading-relaxed text-base-content/70"
				style={{ "--reveal-delay": "0.1s" } as CSSProperties}
			>
				{children}
			</div>
		</section>
	)
}
