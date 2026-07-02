// src/components/landing/pillar-visuals/CloseVisual.tsx
"use client"

import { AnimationBox } from "./AnimationBox"

const STAGES = [
	{ nm: "New", ct: "8 leads" },
	{ nm: "Contacted", ct: "5 leads" },
	{ nm: "Qualified", ct: "3 leads" },
	{ nm: "Won", ct: "2 closed" },
]

/* ── CloseVisual (pillar 04 · Convert) ─────────────────────────────────
 * Beat: Dana's chip glides in to the Won column.
 * Payoff: the staffed pipeline holds — stage labels and deal chips share
 * one 4-column grid so every deal sits directly under its stage. */
export function CloseVisual() {
	return (
		<AnimationBox num="04" label="Convert">
			<style>{`
				.cv-stage {
					position: absolute; inset: 0;
					container-type: inline-size;
					color: var(--color-base-content);
					overflow: hidden; font-family: system-ui, sans-serif;
					display: flex; flex-direction: column; justify-content: center;
					padding: 3cqw 3.4cqw; gap: 2.2cqw;
				}
				.cv-cols, .cv-chips { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.8cqw; }
				.cv-col { text-align: center; }
				.cv-col .nm { font-size: 2.3cqw; font-weight: 700; }
				.cv-col .ct { font-size: 1.9cqw; color: rgba(35,34,41,.5); }
				.cv-rail {
					height: .9cqw; border-radius: .5cqw; margin: 0 1cqw;
					background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
				}
				.cv-cell { display: flex; justify-content: center; }
				.cv-chip {
					font-size: 1.9cqw; font-weight: 600; white-space: nowrap;
					background: #fff; border: 1px solid var(--color-base-300);
					border-radius: 4cqw; padding: 1cqw 2cqw;
				}
				.cv-chip small { color: rgba(35,34,41,.5); font-weight: 400; font-size: 1.7cqw; }
				.cv-chip.win {
					border-color: var(--color-secondary);
					opacity: 0;
					animation: cvGlide 12s infinite;
				}
				/* beat: glide in from the left, then hold with a win glow */
				@keyframes cvGlide {
					0% { opacity: 0; transform: translateX(-24cqw); }
					8%, 98% { opacity: 1; transform: none; }
					38%, 52% { background: rgba(63,125,140,.1); box-shadow: 0 2px 10px rgba(63,125,140,.3); }
					60% { background: #fff; box-shadow: none; }
					100% { opacity: 0; }
				}
				@media (prefers-reduced-motion: reduce) {
					.cv-stage * { animation: none !important; }
					.cv-chip.win { opacity: 1; transform: none; }
				}
			`}</style>
			<div className="cv-stage" aria-hidden="true">
				<div className="cv-cols">
					{STAGES.map((s) => (
						<div className="cv-col" key={s.nm}>
							<div className="nm">{s.nm}</div>
							<div className="ct">{s.ct}</div>
						</div>
					))}
				</div>
				<div className="cv-rail" />
				<div className="cv-chips">
					<div className="cv-cell"><div className="cv-chip">Ava Lin <small>· new</small></div></div>
					<div className="cv-cell"><div className="cv-chip">Mike Torres <small>· contacted</small></div></div>
					<div className="cv-cell"><div className="cv-chip">Priya Shah <small>· qualified</small></div></div>
					<div className="cv-cell"><div className="cv-chip win">Dana Reyes <small>· won</small></div></div>
				</div>
			</div>
		</AnimationBox>
	)
}
