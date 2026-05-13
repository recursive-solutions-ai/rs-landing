"use client"

import type { ReactNode } from "react"

interface VisualFrameProps {
	children: ReactNode
	glowFrom?: string
	glowTo?: string
	className?: string
}

/* ── VisualFrame ────────────────────────────────────────────────────────
 * Shared dark rounded card with ambient glow used by every pillar visual.
 * Mirrors the NotebookLM "Your AI-Powered Research Partner" feature cards. */
export function VisualFrame({
	children,
	glowFrom = "var(--color-primary)",
	glowTo = "transparent",
	className = "",
}: VisualFrameProps) {
	return (
		<div className={`relative isolate aspect-video w-full overflow-hidden rounded-3xl bg-[#0a0a0c] ring-1 ring-white/5 ${className}`}>
			{/* Ambient corner glows */}
			<div
				className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
				style={{
					background: `radial-gradient(circle at center, ${glowFrom}, ${glowTo} 70%)`,
				}}
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
				style={{
					background: `radial-gradient(circle at center, ${glowTo === "transparent" ? glowFrom : glowTo}, transparent 70%)`,
				}}
				aria-hidden="true"
			/>

			{/* Subtle grid texture */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.05]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
					backgroundSize: "32px 32px",
				}}
				aria-hidden="true"
			/>

			{/* Content */}
			<div className="relative z-10 flex h-full w-full items-center justify-center p-8">
				{children}
			</div>
		</div>
	)
}
