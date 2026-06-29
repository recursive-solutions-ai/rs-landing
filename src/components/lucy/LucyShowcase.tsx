"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { LucyAnimation } from "@/components/landing/LucyAnimation"
import { AttractVisual } from "@/components/landing/pillar-visuals/AttractVisual"
import { LUCY_STAGES, clampStageIndex } from "./stages"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

export function LucyShowcase() {
	const [active, setActive] = useState(0)
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
	const reduce = useReducedMotion()
	const { ref, inView } = useInView<HTMLDivElement>()

	function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		let next: number | null = null
		if (e.key === "ArrowRight") next = clampStageIndex(active + 1)
		else if (e.key === "ArrowLeft") next = clampStageIndex(active - 1)
		if (next === null) return
		e.preventDefault()
		setActive(next)
		tabRefs.current[next]?.focus()
	}

	return (
		<section className="bg-neutral text-neutral-content">
			<div
				ref={ref}
				className={cn("mx-auto max-w-5xl px-6 py-24", inView && "reveal-in")}
			>
				<p className="reveal mb-3 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-neutral-content/50">
					A look inside Lucy
				</p>
				<h2 className="reveal font-display mb-10 text-center text-3xl font-semibold md:text-4xl">
					See Lucy work.
				</h2>

				{/* Tabs */}
				<div
					role="tablist"
					aria-label="Lucy stages"
					onKeyDown={onKeyDown}
					className="reveal mb-3 flex flex-wrap justify-center gap-2"
				>
					{LUCY_STAGES.map((stage, i) => (
						<button
							key={stage.marker}
							role="tab"
							id={`lucy-tab-${i}`}
							aria-selected={active === i}
							aria-controls="lucy-tabpanel"
							tabIndex={active === i ? 0 : -1}
							ref={(el) => { tabRefs.current[i] = el }}
							onClick={() => setActive(i)}
							className={cn(
								"rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
								active === i
									? "border-[#00d3bb] bg-[#00d3bb]/15 text-[#7fffe9]"
									: "border-white/15 text-neutral-content/60 hover:text-neutral-content"
							)}
						>
							<span className="font-mono text-xs opacity-60">{stage.marker}</span>{" "}
							{stage.label}
						</button>
					))}
				</div>

				<p
					className="reveal mb-6 text-center text-sm text-neutral-content/70"
					aria-live="polite"
				>
					{LUCY_STAGES[active].caption}
				</p>

				{/* Device frame */}
				<div
					id="lucy-tabpanel"
					role="tabpanel"
					aria-labelledby={`lucy-tab-${active}`}
					className="reveal overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl"
				>
					<div aria-hidden="true" className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
						<span className="h-2.5 w-2.5 rounded-full bg-white/20" />
						<span className="h-2.5 w-2.5 rounded-full bg-white/20" />
						<span className="h-2.5 w-2.5 rounded-full bg-white/20" />
					</div>
					{active === 0 ? (
						<div
							className="relative aspect-[16/10] w-full overflow-hidden"
							style={{ background: "linear-gradient(180deg, #0e0f1c, #08090f)" }}
						>
							<AttractVisual bare />
						</div>
					) : (
						<LucyAnimation mode="tabbed" active={active - 1} reduce={reduce} />
					)}
				</div>
			</div>
		</section>
	)
}
