"use client"

import { AnimationBox } from "./AnimationBox"

const SCORES = ["98", "96", "95", "94", "93", "91"]

/* ── AttractVisual ──────────────────────────────────────────────────────
 * Payoff-weighted loop (spec 2026-07-02): ~2s URL-paste beat, then six
 * scored Holt CPA redesigns hold the frame with a border-glow sweep. */
export function AttractVisual({ bare = false }: { bare?: boolean } = {}) {
	const content = (
		<>
			<style>{`
				.lp-stage {
					position: absolute; inset: 0;
					container-type: inline-size;
					color: var(--color-base-content);
					overflow: hidden;
					font-family: system-ui, sans-serif;
				}
				/* beat — URL paste, ≤20% of the 12s loop */
				.lp-beat {
					position: absolute; inset: 0;
					display: flex; flex-direction: column; align-items: center; justify-content: center;
					gap: 2.4cqw;
					animation: lpBeat 12s infinite;
				}
				.lp-title { font-family: var(--font-display, Georgia), Georgia, serif; font-size: 6cqw; }
				.lp-url {
					width: 56cqw; padding: 1.6cqw 2.6cqw; border-radius: 1.8cqw;
					border: 1px solid var(--color-primary);
					background: #fff; color: var(--color-primary);
					font-family: ui-monospace, monospace; font-size: 2.4cqw;
				}
				@keyframes lpBeat { 0%, 14% { opacity: 1; } 18%, 100% { opacity: 0; } }

				/* payoff — six scored redesigns, holds to end of loop */
				.lp-payoff {
					position: absolute; inset: 3cqw 3.4cqw;
					display: flex; flex-direction: column;
					opacity: 0;
					animation: lpPayoff 12s infinite;
				}
				@keyframes lpPayoff {
					0%, 15% { opacity: 0; transform: scale(.985); }
					19%, 98% { opacity: 1; transform: scale(1); }
					100% { opacity: 0; }
				}
				.lp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.8cqw; flex: 1; min-height: 0; }
				.lp-site {
					position: relative; background: #fff; border-radius: 1.8cqw;
					border: 1px solid #e5e0d6; padding: 1.6cqw;
					display: flex; flex-direction: column; gap: 0.9cqw;
				}
				.lp-site .hd { height: 1.1cqw; width: 55%; border-radius: 2px; background: #cfc9bd; }
				.lp-site .hero {
					flex: 1; border-radius: 0.9cqw;
					background: linear-gradient(135deg, rgba(40,75,115,.25), rgba(63,125,140,.12));
				}
				.lp-site .ln { height: 0.7cqw; border-radius: 2px; background: #e5e0d6; }
				.lp-site .ln.s { width: 70%; }
				.lp-site .score {
					position: absolute; top: 1cqw; right: 1cqw;
					font-size: 1.6cqw; font-weight: 700; color: #fff;
					background: var(--color-primary); border-radius: 2cqw; padding: 0.2cqw 1cqw;
				}
				/* micro-motion: soft border-glow sweeping tile to tile */
				.lp-site { animation: lpSweep 6s infinite; }
				.lp-site:nth-child(2) { animation-delay: 1s; }
				.lp-site:nth-child(3) { animation-delay: 2s; }
				.lp-site:nth-child(4) { animation-delay: 3s; }
				.lp-site:nth-child(5) { animation-delay: 4s; }
				.lp-site:nth-child(6) { animation-delay: 5s; }
				@keyframes lpSweep {
					0%, 100% { border-color: #e5e0d6; box-shadow: none; }
					8%, 16% { border-color: var(--color-secondary); box-shadow: 0 2px 10px rgba(63,125,140,.25); }
					26% { border-color: #e5e0d6; box-shadow: none; }
				}
				.lp-strip {
					display: flex; justify-content: space-between; align-items: center;
					margin-top: 1.8cqw; font-size: 2cqw; font-weight: 600;
					color: rgba(35,34,41,.55);
				}
				.lp-strip .r { color: var(--color-secondary); }

				@media (prefers-reduced-motion: reduce) {
					.lp-stage *, .lp-beat, .lp-payoff { animation: none !important; }
					.lp-beat { opacity: 0; }
					.lp-payoff { opacity: 1; transform: none; }
				}
			`}</style>
			<div className="lp-stage" aria-hidden="true">
				<div className="lp-beat">
					<div className="lp-title">Redesign</div>
					<div className="lp-url">https://holtcpa.com▌</div>
				</div>
				<div className="lp-payoff">
					<div className="lp-grid">
						{SCORES.map((s) => (
							<div className="lp-site" key={s}>
								<span className="score">{s}</span>
								<div className="hd" />
								<div className="hero" />
								<div className="ln" />
								<div className="ln s" />
							</div>
						))}
					</div>
					<div className="lp-strip">
						<span>6 redesigns · conversion-first</span>
						<span className="r">rank-ready · cited by AI ✓</span>
					</div>
				</div>
			</div>
		</>
	)

	if (bare) return <div className="relative aspect-video w-full">{content}</div>
	return (
		<AnimationBox num="01" label="Attract">
			{content}
		</AnimationBox>
	)
}
