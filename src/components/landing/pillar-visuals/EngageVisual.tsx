"use client"

import { Rss } from "lucide-react"
import { VisualFrame } from "./VisualFrame"

/* Brand glyphs — lucide-react dropped social brand icons; inline minimal SVGs. */
const brandIconProps = {
	width: 12,
	height: 12,
	viewBox: "0 0 24 24",
	fill: "currentColor",
	"aria-hidden": true,
} as const

const LinkedinIcon = () => (
	<svg {...brandIconProps}>
		<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
	</svg>
)
const XIcon = () => (
	<svg {...brandIconProps}>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25h6.832l4.713 6.231 5.445-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
	</svg>
)
const InstagramIcon = () => (
	<svg {...brandIconProps}>
		<path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.73.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.26.82-.38.38-.62.75-.82 1.26-.15.39-.33.97-.38 2.04C2.71 9.5 2.7 9.85 2.7 13s.01 3.5.07 4.73c.05 1.07.23 1.65.38 2.04.2.51.44.88.82 1.26.38.38.75.62 1.26.82.39.15.97.33 2.04.38 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.26-.82.38-.38.62-.75.82-1.26.15-.39.33-.97.38-2.04.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.05-1.07-.23-1.65-.38-2.04-.2-.51-.44-.88-.82-1.26-.38-.38-.75-.62-1.26-.82-.39-.15-.97-.33-2.04-.38C15.5 4.01 15.15 4 12 4zm0 3.07A4.93 4.93 0 1 1 12 17a4.93 4.93 0 0 1 0-9.93zm0 1.8a3.13 3.13 0 1 0 0 6.26 3.13 3.13 0 0 0 0-6.26zm5.13-2.04a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
	</svg>
)
const FacebookIcon = () => (
	<svg {...brandIconProps}>
		<path d="M13.5 21.95v-7.83h2.63l.4-3.05h-3.03V9.12c0-.88.24-1.48 1.51-1.48h1.62V4.91c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.93 1.42-3.93 4.04v2.25H7.7v3.05h2.64v7.83h3.16z" />
	</svg>
)

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
				.ce-post .ce-type svg {
					width: clamp(10px, 1vw, 12px);
					height: clamp(10px, 1vw, 12px);
					color: #00d3bb;
					filter: drop-shadow(0 0 4px rgba(0,211,187,0.6));
					flex-shrink: 0;
				}
				.ce-post .ce-t {
					font-family: 'Fraunces', Georgia, serif;
					font-size: clamp(10px, 1vw, 12px);
					line-height: 1.3;
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
					<div className="ce-type"><LinkedinIcon /> LinkedIn</div>
					<div className="ce-t">Augmentation &gt; replacement</div>
				</div>
				<div className="ce-post ce-p2">
					<div className="ce-type"><Rss strokeWidth={1.75} /> Blog · 1432 words</div>
					<div className="ce-t">The Five-Hour AI Audit</div>
				</div>
				<div className="ce-post ce-p3">
					<div className="ce-type"><XIcon /> X · thread</div>
					<div className="ce-t">Hour 5: plug one leak first</div>
				</div>
				<div className="ce-post ce-p4">
					<div className="ce-type"><InstagramIcon /> Instagram</div>
					<div className="ce-t">Three real examples</div>
				</div>
				<div className="ce-post ce-p5">
					<div className="ce-type"><Rss strokeWidth={1.75} /> Blog · draft</div>
					<div className="ce-t">Where AI quietly saves money</div>
				</div>
				<div className="ce-post ce-p6">
					<div className="ce-type"><FacebookIcon /> Facebook</div>
					<div className="ce-t">Why automation stalls</div>
				</div>
			</div>
		</VisualFrame>
	)
}
