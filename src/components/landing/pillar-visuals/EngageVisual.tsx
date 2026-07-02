"use client"

import { AnimationBox } from "./AnimationBox"

const POSTS = [
	{ title: "2026 S-Corp Tax Deadlines", tag: "blog", state: "✓ published" },
	{ title: "5 deductions owners miss", tag: "linkedin", state: "✓ published" },
	{ title: "Quarterly estimates, explained", tag: "x thread", state: "✓ scheduled" },
	{ title: "Meet the team behind your books", tag: "instagram", state: "✓ scheduled" },
]

/* ── EngageVisual ───────────────────────────────────────────────────────
 * Beat: the Holt CPA brand-voice orb pulses and fans the feed out.
 * Payoff: this week's published feed holds; newest item re-lands each loop. */
export function EngageVisual() {
	return (
		<AnimationBox num="02" label="Engage">
			<style>{`
				.en-stage {
					position: absolute; inset: 0;
					container-type: inline-size;
					color: var(--color-base-content);
					overflow: hidden; font-family: system-ui, sans-serif;
					display: grid; grid-template-columns: 22cqw 1fr;
					gap: 3cqw; align-items: center; padding: 3cqw 3.4cqw;
				}
				.en-orb {
					width: 17cqw; height: 17cqw; border-radius: 50%;
					justify-self: center;
					display: flex; align-items: center; justify-content: center; text-align: center;
					background: radial-gradient(circle, rgba(40,75,115,.16), rgba(63,125,140,.06) 72%);
					border: 1px solid rgba(40,75,115,.25);
					color: var(--color-primary);
					font-size: 1.7cqw; font-weight: 700; letter-spacing: .12em; line-height: 1.5;
					animation: enPulse 3s ease-in-out infinite;
				}
				@keyframes enPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
				.en-feed { display: flex; flex-direction: column; gap: 1.6cqw; }
				.en-post {
					display: flex; justify-content: space-between; align-items: center; gap: 2cqw;
					background: #fff; border: 1px solid #e5e0d6; border-radius: 2cqw;
					padding: 1.5cqw 2.2cqw; font-size: 2.3cqw; min-width: 0;
				}
				.en-post .t { font-family: var(--font-display, Georgia), Georgia, serif; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
				.en-post .meta { display: flex; align-items: center; gap: 1.6cqw; white-space: nowrap; }
				.en-post .tag {
					font-size: 1.6cqw; font-weight: 700; letter-spacing: .1em;
					text-transform: uppercase; color: var(--color-secondary);
				}
				.en-post .st { font-size: 1.8cqw; font-weight: 600; color: var(--color-secondary); }
				/* beat: feed fans out from the orb in the first ~2s of a 12s loop */
				.en-post { opacity: 0; animation: enFan 12s infinite; }
				.en-post:nth-child(1) { animation-delay: 0s; }
				.en-post:nth-child(2) { animation-delay: .35s; }
				.en-post:nth-child(3) { animation-delay: .7s; }
				.en-post:nth-child(4) { animation-delay: 1.05s; }
				@keyframes enFan {
					0% { opacity: 0; transform: translateX(-3cqw); }
					6%, 98% { opacity: 1; transform: none; }
					100% { opacity: 0; }
				}
				@media (prefers-reduced-motion: reduce) {
					.en-stage * { animation: none !important; }
					.en-post { opacity: 1; transform: none; }
				}
			`}</style>
			<div className="en-stage" aria-hidden="true">
				<div className="en-orb">HOLT CPA<br />BRAND<br />VOICE</div>
				<div className="en-feed">
					{POSTS.map((p) => (
						<div className="en-post" key={p.title}>
							<span className="t">{p.title}</span>
							<span className="meta">
								<span className="tag">{p.tag}</span>
								<span className="st">{p.state}</span>
							</span>
						</div>
					))}
				</div>
			</div>
		</AnimationBox>
	)
}
