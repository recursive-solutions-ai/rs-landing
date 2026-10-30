"use client"

import { useEffect, useRef } from "react"

// Fixed arrays (no randomness during render -> no hydration mismatch).
// k = grid column offset from center (64px cells), d = delay (s), t = duration (s), l = streak length scale.
const PACKETS: { k: number; d: number; t: number }[] = [
	{ k: -9, d: 0.5, t: 7.5 },
	{ k: -6, d: 3.2, t: 6.5 },
	{ k: -3, d: 6.8, t: 7 },
	{ k: -1, d: 1.6, t: 6 },
	{ k: 2, d: 5.0, t: 7.2 },
	{ k: 4, d: 8.4, t: 6.4 },
	{ k: 7, d: 2.4, t: 7.8 },
	{ k: 10, d: 9.6, t: 6.8 },
]

/** Decorative hero background: drifting aurora blobs + a perspective "signal grid" with light packets. */
export function LucyV2HeroBackdrop() {
	const root = useRef<HTMLDivElement>(null)
	const aurora = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = root.current
		const layer = aurora.current
		if (!el || !layer) return
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches

		// Pause all CSS animations while the hero is off-screen.
		const io = new IntersectionObserver(([e]) => {
			el.dataset.paused = e.isIntersecting ? "false" : "true"
		})
		io.observe(el)

		let raf = 0
		let tx = 0
		let ty = 0
		let cx = 0
		let cy = 0
		const tick = () => {
			cx += (tx - cx) * 0.06
			cy += (ty - cy) * 0.06
			layer.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
			raf = Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(tick) : 0
		}
		const onMove = (e: PointerEvent) => {
			tx = (e.clientX / window.innerWidth - 0.5) * 18
			ty = (e.clientY / window.innerHeight - 0.5) * 12
			if (!raf) raf = requestAnimationFrame(tick)
		}
		if (!reduce && fine) window.addEventListener("pointermove", onMove, { passive: true })

		return () => {
			io.disconnect()
			window.removeEventListener("pointermove", onMove)
			if (raf) cancelAnimationFrame(raf)
		}
	}, [])

	return (
		<div ref={root} aria-hidden="true" className="lv2-bd pointer-events-none absolute inset-0 -z-10 overflow-hidden">
			<div ref={aurora} className="absolute inset-0 will-change-transform">
				<div className="lv2-blob-pos left-[50%] top-[40%] size-[26rem] sm:size-[44rem]">
					<div className="lv2-blob lv2-blob-1 bg-sky-500/30" />
				</div>
				<div className="lv2-blob-pos left-[22%] top-[58%] size-[22rem] sm:left-[28%] sm:size-[38rem]">
					<div className="lv2-blob lv2-blob-2 bg-indigo-500/25" />
				</div>
				<div className="lv2-blob-pos left-[78%] top-[34%] size-[20rem] sm:left-[72%] sm:size-[34rem]">
					<div className="lv2-blob lv2-blob-3 bg-violet-500/20" />
				</div>
				<div className="lv2-blob-pos left-[62%] top-[72%] size-[16rem] sm:size-[28rem]">
					<div className="lv2-blob lv2-blob-4 bg-cyan-400/15" />
				</div>
			</div>

			<div className="lv2-grid-mask absolute inset-x-0 bottom-0 h-[62%]">
				<div className="lv2-grid-persp absolute inset-0">
					<div className="lv2-grid-plane">
						{PACKETS.map((p) => (
							<div key={p.k} className="lv2-track" style={{ left: `calc(50% + ${p.k * 64}px)` }}>
								<i className="lv2-packet" style={{ animationDelay: `${p.d}s`, animationDuration: `${p.t}s` }} />
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent to-[#050816]" />
		</div>
	)
}
