"use client"

import { useRef } from "react"
import {
	gsap,
	useGSAP,
	EASE_REVEAL,
	DURATION_NORMAL,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { VisualFrame } from "./VisualFrame"

/* ── AttractVisual ──────────────────────────────────────────────────────
 * A faux SERP. Your business sits at rank #4, then climbs to #1 while
 * competing results slide down. Trigger fires once on scroll-in. */
export function AttractVisual() {
	const rootRef = useRef<HTMLDivElement>(null)
	const reducedMotion = useReducedMotion()

	useGSAP(
		() => {
			if (reducedMotion || !rootRef.current) return

			const ownRow = rootRef.current.querySelector<HTMLElement>("[data-own]")
			const otherRows = rootRef.current.querySelectorAll<HTMLElement>("[data-other]")
			const chart = rootRef.current.querySelector<HTMLElement>("[data-chart-path]")
			const badge = rootRef.current.querySelector<HTMLElement>("[data-badge]")

			gsap.set(ownRow, { y: 168 })
			gsap.set(otherRows, { y: 0 })

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: rootRef.current,
					start: "top 75%",
					toggleActions: "play none none none",
				},
			})

			tl.to(ownRow, {
				y: 0,
				duration: 1.2,
				ease: EASE_REVEAL,
			})
				.to(
					otherRows,
					{
						y: 56,
						duration: 1.2,
						ease: EASE_REVEAL,
						stagger: 0.05,
					},
					"<"
				)
				.fromTo(
					badge,
					{ scale: 0, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
					"-=0.4"
				)

			if (chart) {
				const length = (chart as unknown as SVGPathElement).getTotalLength()
				gsap.set(chart, { strokeDasharray: length, strokeDashoffset: length })
				tl.to(
					chart,
					{
						strokeDashoffset: 0,
						duration: DURATION_NORMAL,
						ease: "power2.inOut",
					},
					"-=0.6"
				)
			}
		},
		{ scope: rootRef, dependencies: [reducedMotion] }
	)

	return (
		<VisualFrame>
			<div ref={rootRef} className="w-full">
				{/* Search bar */}
				<div className="mb-4 flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 ring-1 ring-white/10">
					<div className="h-3 w-3 rounded-full border-2 border-white/40" />
					<div className="text-xs text-white/50">ai for growing businesses</div>
				</div>

				{/* Result list */}
				<div className="relative h-[14rem] overflow-hidden rounded-xl bg-white/[0.03] ring-1 ring-white/10">
					{/* Other results */}
					<div className="absolute inset-x-0 top-0 divide-y divide-white/5">
						{["competitor-1.com", "competitor-2.com", "another-tool.io"].map(
							(d, i) => (
								<div
									key={d}
									data-other
									className="flex items-center gap-3 px-4 py-3"
								>
									<span className="w-6 text-[10px] font-mono text-white/30">
										#{i + 1}
									</span>
									<div className="flex-1">
										<div className="text-[11px] text-white/40">{d}</div>
										<div className="mt-1 h-1.5 w-3/4 rounded-full bg-white/10" />
									</div>
								</div>
							)
						)}
					</div>

					{/* Your business row */}
					<div
						data-own
						className="absolute inset-x-0 top-0 flex items-center gap-3 border-l-2 border-primary bg-primary/10 px-4 py-3 backdrop-blur-sm"
					>
						<span className="relative w-6">
							<span
								data-badge
								className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-content"
							>
								#1
							</span>
						</span>
						<div className="flex-1 pl-2">
							<div className="text-[11px] font-semibold text-white">
								your-business.com
							</div>
							<div className="mt-1 h-1.5 w-4/5 rounded-full bg-primary/40" />
						</div>
					</div>
				</div>

				{/* Mini chart */}
				<div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/10">
					<svg viewBox="0 0 120 32" className="h-8 flex-1">
						<path
							data-chart-path
							d="M2 28 L18 24 L34 26 L52 18 L72 14 L92 8 L118 4"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<div className="text-right">
						<div className="text-[10px] uppercase tracking-wider text-white/40">
							Traffic
						</div>
						<div className="text-sm font-bold text-white">+412%</div>
					</div>
				</div>
			</div>
		</VisualFrame>
	)
}
