"use client"

import { VisualFrame } from "./VisualFrame"

/* ── OptimizeVisual ─────────────────────────────────────────────────────
 * Faithful migration of 05_custom_experts.html — Lucy core orbited by
 * four named expert agents, each pulsing in turn with a beam to the core. */
export function OptimizeVisual() {
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

				.ce-beams { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
				.ce-beams line {
					stroke: #00d3bb;
					stroke-width: 1.5;
					opacity: 0;
					stroke-dasharray: 3 6;
				}
				.ce-beams line.b-top { animation: ceBeam 7s infinite; animation-delay: .4s; }
				.ce-beams line.b-right { animation: ceBeam 7s infinite; animation-delay: 2s; }
				.ce-beams line.b-bottom { animation: ceBeam 7s infinite; animation-delay: 3.6s; }
				.ce-beams line.b-left { animation: ceBeam 7s infinite; animation-delay: 5.2s; }
				@keyframes ceBeam {
					0%, 3% { opacity: 0; }
					5%, 18% { opacity: .8; stroke-dashoffset: -30; }
					25%, 100% { opacity: 0; }
				}

				.ce-orbit {
					position: absolute;
					left: 50%; top: 50%;
					transform: translate(-50%,-50%);
					width: 62%;
					aspect-ratio: 1;
					border-radius: 50%;
					border: 1px dashed rgba(255,255,255,0.13);
					opacity: 0.4;
				}
				.ce-orbit2 {
					position: absolute;
					left: 50%; top: 50%;
					transform: translate(-50%,-50%);
					width: 42%;
					aspect-ratio: 1;
					border-radius: 50%;
					border: 1px solid rgba(0,211,187,0.35);
					opacity: 0;
					animation: ceOrbitPulse 3s ease-in-out infinite;
				}
				@keyframes ceOrbitPulse {
					0%, 100% { opacity: 0; transform: translate(-50%,-50%) scale(.9); }
					50% { opacity: .6; transform: translate(-50%,-50%) scale(1); }
				}

				.ce-core {
					position: absolute;
					left: 50%; top: 50%;
					transform: translate(-50%,-50%);
					width: 12%;
					aspect-ratio: 1;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(0,211,187,0.35), rgba(96,93,255,0.08) 60%, transparent 70%);
					display: grid;
					place-items: center;
					z-index: 5;
				}
				.ce-core::after {
					content: "";
					position: absolute;
					inset: 20%;
					border-radius: 50%;
					background: radial-gradient(circle, #00d3bb, transparent 70%);
					filter: blur(6px);
					animation: ceCorePulse 2.2s ease-in-out infinite;
				}
				@keyframes ceCorePulse {
					0%, 100% { transform: scale(.9); opacity: .7; }
					50% { transform: scale(1.1); opacity: 1; }
				}
				.ce-core .ce-lbl {
					position: relative;
					z-index: 2;
					font-family: 'Fraunces', Georgia, serif;
					font-size: clamp(10px, 1.1vw, 13px);
				}

				.ce-agent {
					position: absolute;
					width: clamp(96px, 12vw, 130px);
					border: 1px solid rgba(255,255,255,0.13);
					border-radius: 14px;
					background: rgba(20,21,32,0.85);
					backdrop-filter: blur(20px);
					padding: clamp(8px, 1vw, 12px);
					text-align: center;
					box-shadow: 0 12px 40px rgba(0,0,0,0.6);
				}
				.ce-agent .ce-av {
					width: clamp(28px, 3.4vw, 36px);
					aspect-ratio: 1;
					border-radius: 10px;
					margin: 0 auto 8px;
					display: grid;
					place-items: center;
					font-family: 'Fraunces', Georgia, serif;
					font-size: clamp(13px, 1.4vw, 16px);
					background: linear-gradient(135deg, rgba(0,211,187,0.2), rgba(96,93,255,0.1));
					border: 1px solid rgba(0,211,187,0.35);
					color: #00d3bb;
				}
				.ce-agent .ce-nm {
					font-family: 'Fraunces', Georgia, serif;
					font-size: clamp(11px, 1.1vw, 13px);
				}
				.ce-agent .ce-rl {
					font-size: clamp(7px, 0.8vw, 9px);
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 1.2px;
					margin-top: 3px;
				}

				.ce-agent.top { top: 8%; left: 50%; transform: translateX(-50%); }
				.ce-agent.right { top: 50%; right: 8%; transform: translateY(-50%); }
				.ce-agent.bottom { bottom: 8%; left: 50%; transform: translateX(-50%); }
				.ce-agent.left { top: 50%; left: 8%; transform: translateY(-50%); }

				.ce-agent.top { animation: ceAgentActive 7s infinite; animation-delay: .4s; }
				.ce-agent.right { animation: ceAgentActive 7s infinite; animation-delay: 2s; }
				.ce-agent.bottom { animation: ceAgentActive 7s infinite; animation-delay: 3.6s; }
				.ce-agent.left { animation: ceAgentActive 7s infinite; animation-delay: 5.2s; }
				@keyframes ceAgentActive {
					0%, 3% { border-color: rgba(255,255,255,0.13); box-shadow: 0 12px 40px rgba(0,0,0,0.6); }
					5%, 18% { border-color: #00d3bb; box-shadow: 0 0 40px rgba(0,211,187,0.18), 0 12px 40px rgba(0,0,0,0.6); }
					25%, 100% { border-color: rgba(255,255,255,0.13); box-shadow: 0 12px 40px rgba(0,0,0,0.6); }
				}

				.ce-agent .ce-ping {
					position: absolute;
					top: 8px; right: 8px;
					width: 6px; height: 6px;
					border-radius: 50%;
					background: #8a8ba0;
				}
				.ce-agent.top .ce-ping { animation: cePingOn 7s infinite; animation-delay: .4s; }
				.ce-agent.right .ce-ping { animation: cePingOn 7s infinite; animation-delay: 2s; }
				.ce-agent.bottom .ce-ping { animation: cePingOn 7s infinite; animation-delay: 3.6s; }
				.ce-agent.left .ce-ping { animation: cePingOn 7s infinite; animation-delay: 5.2s; }
				@keyframes cePingOn {
					0%, 3% { background: #8a8ba0; box-shadow: none; }
					5%, 18% { background: #00d3bb; box-shadow: 0 0 10px #00d3bb; }
					25%, 100% { background: #8a8ba0; box-shadow: none; }
				}
			`}</style>

			<div className="ce-stage">
				<div className="ce-stage-marker">Lucy <b>·</b> 05</div>
				<span className="ce-marker">05 / custom experts</span>

				<svg className="ce-beams" viewBox="0 0 1100 700" preserveAspectRatio="none">
					<line className="b-top" x1="550" y1="350" x2="550" y2="160" />
					<line className="b-right" x1="550" y1="350" x2="930" y2="350" />
					<line className="b-bottom" x1="550" y1="350" x2="550" y2="560" />
					<line className="b-left" x1="550" y1="350" x2="170" y2="350" />
				</svg>

				<div className="ce-orbit" />
				<div className="ce-orbit2" />

				<div className="ce-core">
					<div className="ce-lbl">Lucy</div>
				</div>

				<div className="ce-agent top">
					<div className="ce-ping" />
					<div className="ce-av">N</div>
					<div className="ce-nm">Nancy</div>
					<div className="ce-rl">marketing</div>
				</div>
				<div className="ce-agent right">
					<div className="ce-ping" />
					<div className="ce-av">S</div>
					<div className="ce-nm">Sam</div>
					<div className="ce-rl">support</div>
				</div>
				<div className="ce-agent bottom">
					<div className="ce-ping" />
					<div className="ce-av">F</div>
					<div className="ce-nm">Fran</div>
					<div className="ce-rl">finance</div>
				</div>
				<div className="ce-agent left">
					<div className="ce-ping" />
					<div className="ce-av">O</div>
					<div className="ce-nm">Otto</div>
					<div className="ce-rl">onboarding</div>
				</div>
			</div>
		</VisualFrame>
	)
}
