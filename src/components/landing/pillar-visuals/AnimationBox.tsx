// src/components/landing/pillar-visuals/AnimationBox.tsx
"use client"

import type { ReactNode } from "react"

interface AnimationBoxProps {
	/** Two-digit pillar number for the chrome label, e.g. "01". */
	num: string
	/** Pillar name for the chrome label, e.g. "Attract". */
	label: string
	children: ReactNode
}

/* ── AnimationBox ───────────────────────────────────────────────────────
 * Light "product window" shell for the five pillar visuals: navy→teal
 * gradient picture-frame border, cream chrome bar with LUCY · 0n branding,
 * paper body. Replaces the dark VisualFrame treatment for these visuals
 * (spec 2026-07-02). */
export function AnimationBox({ num, label, children }: AnimationBoxProps) {
	return (
		<div
			className="relative isolate flex aspect-video w-full flex-col overflow-hidden rounded-2xl border-2 border-transparent shadow-[0_12px_34px_rgba(35,34,41,0.14)]"
			style={{
				background:
					"linear-gradient(#fdfcfa,#fdfcfa) padding-box, linear-gradient(135deg, var(--color-primary), var(--color-secondary)) border-box",
			}}
		>
			<div className="flex shrink-0 items-center gap-1.5 border-b border-base-300 bg-base-200 px-3 py-2">
				<span className="h-2 w-2 rounded-full bg-base-300" aria-hidden="true" />
				<span className="h-2 w-2 rounded-full bg-base-300" aria-hidden="true" />
				<span className="h-2 w-2 rounded-full bg-base-300" aria-hidden="true" />
				<span className="ml-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-base-content/50">
					Lucy <b className="font-bold text-primary">· {num} {label}</b> — holtcpa.com
				</span>
			</div>
			<div className="relative min-h-0 flex-1 @container">{children}</div>
		</div>
	)
}
