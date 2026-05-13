"use client"

import { VisualFrame } from "./VisualFrame"

/* ── EngageVisual ───────────────────────────────────────────────────────
 * Faithful migration of 02_content_engine.html — central brand-voice core
 * with expanding rings, emitting platform-specific content cards. */
export function EngageVisual() {
	return (
		<VisualFrame glowFrom="rgba(0,211,187,0.18)" glowTo="rgba(96,93,255,0.18)">
			<style>{`
				.ce-stage {
					position: absolute;
					inset: 0;
					font-family: 'SF Pro Display','Inter',system-ui,sans-serif;
					color: #eaeaf2;
				}
				.ce-stage-marker {
					position: absolute;
					top: 3.5%;
					left: 3%;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: clamp(8px, 0.85vw, 10px);
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 2.5px;
					z-index: 60;
				}
				.ce-stage-marker b { color: #00d3bb; font-weight: 500; }
				.ce-marker {
					position: absolute;
					top: 3.5%;
					right: 3%;
					font-family: 'Fraunces', Georgia, serif;
					font-size: clamp(9px, 0.95vw, 11px);
					color: #00d3bb;
					letter-spacing: 1px;
					z-index: 55;
					text-transform: uppercase;
				}

				.ce-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
				.ce-lines path {
					stroke: rgba(0,211,187,0.35);
					stroke-width: 1;
					fill: none;
					stroke-dasharray: 4 4;
					opacity: 0.3;
					animation: ceDash 3s linear infinite;
				}
				@keyframes ceDash { to { stroke-dashoffset: -16; } }

				.ce-core {
					position: absolute;
					left: 50%; top: 50%;
					transform: translate(-50%,-50%);
					width: 18%;
					aspect-ratio: 1;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(0,211,187,0.35), rgba(96,93,255,0.08) 60%, transparent 70%);
					display: grid;
					place-items: center;
				}
				.ce-core::after {
					content: "";
					position: absolute;
					inset: 22%;
					border-radius: 50%;
					background: radial-gradient(circle, #00d3bb, transparent 70%);
					filter: blur(8px);
					animation: ceCorePulse 2.2s ease-in-out infinite;
				}
				@keyframes ceCorePulse {
					0%, 100% { transform: scale(0.9); opacity: 0.7; }
					50% { transform: scale(1.1); opacity: 1; }
				}
				.ce-core .ce-label {
					position: relative;
					z-index: 2;
					font-family: 'Fraunces', Georgia, serif;
					font-size: clamp(10px, 1.1vw, 13px);
					letter-spacing: .5px;
					text-align: center;
					line-height: 1.2;
				}
				.ce-core .ce-label small {
					display: block;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: clamp(7px, 0.75vw, 9px);
					color: #00d3bb;
					text-transform: uppercase;
					letter-spacing: 2px;
					margin-top: 4px;
				}

				.ce-ring {
					position: absolute;
					left: 50%; top: 50%;
					transform: translate(-50%,-50%);
					border: 1px solid rgba(0,211,187,0.35);
					border-radius: 50%;
					animation: ceExpand 3s ease-out infinite;
				}
				.ce-r1 { animation-delay: 0s; }
				.ce-r2 { animation-delay: 1s; }
				.ce-r3 { animation-delay: 2s; }
				@keyframes ceExpand {
					0% { width: 18%; aspect-ratio: 1; opacity: 0.6; }
					100% { width: 76%; aspect-ratio: 1; opacity: 0; }
				}

				.ce-post {
					position: absolute;
					border: 1px solid rgba(255,255,255,0.13);
					border-radius: 10px;
					background: rgba(20,21,32,0.85);
					backdrop-filter: blur(20px);
					padding: clamp(6px, 0.9vw, 10px) clamp(8px, 1.2vw, 14px);
					font-size: clamp(9px, 0.95vw, 11px);
					width: clamp(140px, 18vw, 200px);
					opacity: 0;
					box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,211,187,0.18);
				}
				.ce-post .ce-type {
					font-size: clamp(7px, 0.8vw, 9px);
					color: #00d3bb;
					text-transform: uppercase;
					letter-spacing: 1.5px;
					margin-bottom: 4px;
					display: flex;
					align-items: center;
					gap: 6px;
				}
				.ce-post .ce-type::before {
					content: "";
					width: 5px;
					height: 5px;
					border-radius: 50%;
					background: #00d3bb;
					box-shadow: 0 0 6px #00d3bb;
				}
				.ce-post .ce-t {
					font-family: 'Fraunces', Georgia, serif;
					font-size: clamp(10px, 1vw, 12px);
					line-height: 1.3;
				}
				.ce-post .ce-meta {
					font-size: clamp(7px, 0.8vw, 9px);
					color: #8a8ba0;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					margin-top: 5px;
				}

				.ce-p1 { top: 14%; left: 8%; animation: ceEmit 7s infinite; animation-delay: 0.6s; }
				.ce-p2 { top: 14%; right: 8%; animation: ceEmit 7s infinite; animation-delay: 1.4s; }
				.ce-p3 { bottom: 14%; left: 7%; animation: ceEmit 7s infinite; animation-delay: 2.2s; }
				.ce-p4 { bottom: 14%; right: 7%; animation: ceEmit 7s infinite; animation-delay: 3s; }
				.ce-p5 { top: 50%; left: 2%; transform: translateY(-50%); animation: ceEmitL 7s infinite; animation-delay: 3.8s; }
				.ce-p6 { top: 50%; right: 2%; transform: translateY(-50%); animation: ceEmitR 7s infinite; animation-delay: 4.6s; }
				@keyframes ceEmit {
					0% { opacity: 0; transform: scale(0.4); }
					8% { opacity: 0; transform: scale(0.4); }
					18% { opacity: 1; transform: scale(1); }
					70% { opacity: 1; transform: scale(1); }
					85%, 100% { opacity: 0; transform: scale(1); }
				}
				@keyframes ceEmitL {
					0% { opacity: 0; transform: translateY(-50%) scale(0.4); }
					18% { opacity: 1; transform: translateY(-50%) scale(1); }
					70% { opacity: 1; transform: translateY(-50%) scale(1); }
					100% { opacity: 0; transform: translateY(-50%) scale(1); }
				}
				@keyframes ceEmitR {
					0% { opacity: 0; transform: translateY(-50%) scale(0.4); }
					18% { opacity: 1; transform: translateY(-50%) scale(1); }
					70% { opacity: 1; transform: translateY(-50%) scale(1); }
					100% { opacity: 0; transform: translateY(-50%) scale(1); }
				}
			`}</style>

			<div className="ce-stage">
				<div className="ce-stage-marker">Lucy <b>·</b> 02</div>
				<span className="ce-marker">02 / content engine</span>

				<svg className="ce-lines" viewBox="0 0 1100 700" preserveAspectRatio="none">
					<path d="M 550 350 L 200 200" />
					<path d="M 550 350 L 900 180" />
					<path d="M 550 350 L 180 540" />
					<path d="M 550 350 L 920 530" />
					<path d="M 550 350 L 100 350" />
					<path d="M 550 350 L 1000 350" />
				</svg>
				<div className="ce-ring ce-r1" />
				<div className="ce-ring ce-r2" />
				<div className="ce-ring ce-r3" />
				<div className="ce-core">
					<div className="ce-label">Voice<small>brand profile</small></div>
				</div>

				<div className="ce-post ce-p1">
					<div className="ce-type">LinkedIn</div>
					<div className="ce-t">Augmentation &gt; replacement</div>
					<div className="ce-meta">4 platforms · queued</div>
				</div>
				<div className="ce-post ce-p2">
					<div className="ce-type">Blog · 1432 words</div>
					<div className="ce-t">The Five-Hour AI Audit</div>
					<div className="ce-meta">SEO ✓ · GEO ✓</div>
				</div>
				<div className="ce-post ce-p3">
					<div className="ce-type">X · thread</div>
					<div className="ce-t">Hour 5: plug one leak first</div>
					<div className="ce-meta">scheduled · Mon 9 AM</div>
				</div>
				<div className="ce-post ce-p4">
					<div className="ce-type">Instagram</div>
					<div className="ce-t">Three real examples</div>
					<div className="ce-meta">draft · awaiting review</div>
				</div>
				<div className="ce-post ce-p5">
					<div className="ce-type">Blog · draft</div>
					<div className="ce-t">Where AI quietly saves money</div>
					<div className="ce-meta">1180 words</div>
				</div>
				<div className="ce-post ce-p6">
					<div className="ce-type">Facebook</div>
					<div className="ce-t">Why automation stalls</div>
					<div className="ce-meta">posted · 2h ago</div>
				</div>
			</div>
		</VisualFrame>
	)
}
