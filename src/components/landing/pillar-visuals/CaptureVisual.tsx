"use client"

import { AnimationBox } from "./AnimationBox"

/* ── CaptureVisual ──────────────────────────────────────────────────────
 * Beat: the Free Tax Review form's submit button presses itself.
 * Payoff: Dana Reyes lands in the live inbox with the auto-reply tick,
 * above a backlog that shows this happens all day. */
export function CaptureVisual() {
	return (
		<AnimationBox num="03" label="Capture">
			<style>{`
				.cp-stage {
					position: absolute; inset: 0;
					container-type: inline-size;
					color: var(--color-base-content);
					overflow: hidden; font-family: system-ui, sans-serif;
					display: grid; grid-template-columns: 1fr 1.4fr;
					gap: 2.6cqw; padding: 3cqw 3.4cqw;
				}
				.cp-panel { background: #fff; border: 1px solid #e5e0d6; border-radius: 2.2cqw; padding: 2.2cqw; }
				.cp-tag {
					font-size: 1.7cqw; font-weight: 700; letter-spacing: .12em;
					text-transform: uppercase; color: var(--color-secondary);
				}
				.cp-form { display: flex; flex-direction: column; gap: 1.7cqw; }
				.cp-line { height: 2cqw; border-radius: 1cqw; background: var(--color-base-200); border: 1px solid var(--color-base-300); }
				.cp-btn {
					margin-top: .5cqw; text-align: center;
					font-size: 2.1cqw; font-weight: 700; color: #fff;
					background: var(--color-primary); border-radius: 1.6cqw; padding: 1.3cqw;
					animation: cpPress 10s infinite;
				}
				@keyframes cpPress {
					0%, 100% { opacity: .92; transform: none; }
					4%, 8% { opacity: 1; transform: scale(1.04); }
					12% { transform: none; }
				}
				.cp-inbox { display: flex; flex-direction: column; gap: 1.5cqw; }
				.cp-lead { padding: 1.5cqw 2cqw; font-size: 2.1cqw; border-radius: 1.8cqw; border: 1px solid transparent; color: rgba(35,34,41,.55); }
				.cp-lead .nm { color: var(--color-base-content); font-weight: 600; }
				.cp-lead .ok { color: var(--color-secondary); font-weight: 600; font-size: 1.9cqw; }
				.cp-lead.new {
					background: rgba(63,125,140,.07); border-color: rgba(63,125,140,.45);
					opacity: 0; animation: cpLand 10s infinite;
				}
				/* payoff lands right after the button press and holds ~85% of the loop */
				@keyframes cpLand {
					0%, 8% { opacity: 0; transform: translateX(3cqw); }
					13%, 98% { opacity: 1; transform: none; }
					100% { opacity: 0; }
				}
				@media (prefers-reduced-motion: reduce) {
					.cp-stage * { animation: none !important; }
					.cp-lead.new { opacity: 1; transform: none; }
				}
			`}</style>
			<div className="cp-stage" aria-hidden="true">
				<div className="cp-panel cp-form">
					<span className="cp-tag">Free Tax Review</span>
					<div className="cp-line" style={{ width: "85%" }} />
					<div className="cp-line" style={{ width: "65%" }} />
					<div className="cp-line" style={{ width: "75%" }} />
					<div className="cp-btn">Request my review →</div>
				</div>
				<div className="cp-panel cp-inbox">
					<span className="cp-tag">Inbox · Live</span>
					<div className="cp-lead new">
						<span className="nm">Dana Reyes</span> — "Need help with S-corp filing"
						<br />
						<span className="ok">✓ auto-reply sent · 4s</span>
					</div>
					<div className="cp-lead">Mike Torres — bookkeeping · 2h</div>
					<div className="cp-lead">Priya Shah — tax prep · 5h</div>
				</div>
			</div>
		</AnimationBox>
	)
}
