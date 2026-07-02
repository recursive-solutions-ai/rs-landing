"use client"

import { AnimationBox } from "./AnimationBox"

const LEFT = [
	{ nm: "Nancy · Marketing", task: "drafted 3 posts · updated 2 pages" },
	{ nm: "Sam · Support", task: "answered 14 client questions" },
]
const RIGHT = [
	{ nm: "Fran · Finance", task: "monthly close: done · 2 flags" },
	{ nm: "Otto · Onboarding", task: "3 new clients set up" },
]

/* ── OptimizeVisual ─────────────────────────────────────────────────────
 * Beat: Lucy's orb pulses work outward. Payoff: each expert card shows
 * work done for Holt CPA plus the hours-saved counter. The orb says
 * Lucy — never "System" (spec 2026-07-02). */
export function OptimizeVisual() {
	return (
		<AnimationBox num="05" label="Optimize">
			<style>{`
				.op-stage {
					position: absolute; inset: 0;
					container-type: inline-size;
					color: var(--color-base-content);
					overflow: hidden; font-family: system-ui, sans-serif;
					display: grid; grid-template-columns: 1fr 26cqw 1fr;
					gap: 2.2cqw; align-items: center; padding: 3cqw 3.4cqw;
				}
				.op-lucy {
					width: 19cqw; height: 19cqw; border-radius: 50%; margin: 0 auto;
					display: flex; flex-direction: column; align-items: center; justify-content: center;
					background: radial-gradient(circle, rgba(40,75,115,.18), rgba(63,125,140,.07) 75%);
					border: 1px solid rgba(40,75,115,.3);
					animation: opPulse 3.4s ease-in-out infinite;
				}
				@keyframes opPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
				.op-lucy .n { font-family: var(--font-display, Georgia), Georgia, serif; font-size: 3.4cqw; }
				.op-lucy .r {
					font-size: 1.5cqw; letter-spacing: .18em; text-transform: uppercase;
					color: var(--color-secondary); font-weight: 700;
				}
				.op-saved {
					text-align: center; margin-top: 1.2cqw;
					font-size: 2cqw; font-weight: 700; color: var(--color-primary);
				}
				.op-exps { display: flex; flex-direction: column; gap: 1.6cqw; }
				.op-exp {
					background: #fff; border: 1px solid #e5e0d6; border-radius: 2cqw;
					padding: 1.5cqw 2cqw;
					animation: opTick 8s infinite;
				}
				.op-exp:nth-child(2) { animation-delay: 2.6s; }
				.op-exps.r .op-exp { animation-delay: 1.3s; }
				.op-exps.r .op-exp:nth-child(2) { animation-delay: 3.9s; }
				@keyframes opTick {
					0%, 100% { border-color: #e5e0d6; box-shadow: none; }
					6%, 16% { border-color: var(--color-secondary); box-shadow: 0 2px 10px rgba(63,125,140,.2); }
					24% { border-color: #e5e0d6; box-shadow: none; }
				}
				.op-exp .nm { font-size: 2.1cqw; font-weight: 700; }
				.op-exp .task { font-size: 1.8cqw; color: rgba(35,34,41,.55); }
				@media (prefers-reduced-motion: reduce) {
					.op-stage * { animation: none !important; }
				}
			`}</style>
			<div className="op-stage" aria-hidden="true">
				<div className="op-exps">
					{LEFT.map((e) => (
						<div className="op-exp" key={e.nm}>
							<div className="nm">{e.nm}</div>
							<div className="task">{e.task}</div>
						</div>
					))}
				</div>
				<div>
					<div className="op-lucy">
						<span className="n">Lucy</span>
						<span className="r">orchestrator</span>
					</div>
					<div className="op-saved">11h saved this week ▲</div>
				</div>
				<div className="op-exps r">
					{RIGHT.map((e) => (
						<div className="op-exp" key={e.nm}>
							<div className="nm">{e.nm}</div>
							<div className="task">{e.task}</div>
						</div>
					))}
				</div>
			</div>
		</AnimationBox>
	)
}
