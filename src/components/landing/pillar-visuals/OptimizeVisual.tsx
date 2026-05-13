"use client"

import { VisualFrame } from "./VisualFrame"

/* ── OptimizeVisual ─────────────────────────────────────────────────────
 * Faithful migration of 05_custom_experts-1.html — Lucy core orbited by
 * four named expert agents with pulse rings, sparks, beams and badges. */
export function OptimizeVisual() {
	return (
		<VisualFrame glowFrom="rgba(0,211,187,0.18)" glowTo="rgba(96,93,255,0.18)">
			<style>{`
				.ce-stage {
					position: absolute;
					inset: 0;
					font-family: 'SF Pro Display','Inter',system-ui,sans-serif;
					color: #eaeaf2;
					container-type: inline-size;
				}
				.ce-stage-marker {
					position: absolute;
					top: 2.4cqw;
					left: 3cqw;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 1.1cqw;
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 2.5px;
					z-index: 60;
				}
				.ce-stage-marker b { color: #00d3bb; font-weight: 500; }
				.ce-marker {
					position: absolute;
					top: 2.4cqw;
					right: 3cqw;
					font-family: 'Fraunces', Georgia, serif;
					font-size: 1.3cqw;
					color: #00d3bb;
					letter-spacing: 1px;
					z-index: 55;
					text-transform: uppercase;
				}

				/* central Lucy core */
				.ce-core {
					position: absolute;
					left: 50%; top: 50%;
					transform: translate(-50%,-50%);
					width: 13cqw; height: 13cqw;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(0,211,187,0.45), rgba(96,93,255,0.15) 55%, transparent 70%);
					display: grid;
					place-items: center;
					z-index: 10;
				}
				.ce-core::before {
					content: "";
					position: absolute;
					inset: -15%;
					border-radius: 50%;
					border: 1px dashed rgba(0,211,187,0.35);
					animation: ceRot 14s linear infinite;
				}
				.ce-core::after {
					content: "";
					position: absolute;
					inset: 18%;
					border-radius: 50%;
					background: radial-gradient(circle, #00d3bb, transparent 70%);
					filter: blur(0.8cqw);
					animation: ceCorePulse 2.2s ease-in-out infinite;
				}
				@keyframes ceRot { to { transform: rotate(360deg); } }
				@keyframes ceCorePulse {
					0%, 100% { transform: scale(.85); opacity: .7; }
					50% { transform: scale(1.1); opacity: 1; }
				}
				.ce-core .ce-lbl {
					position: relative;
					z-index: 2;
					font-family: 'Fraunces', Georgia, serif;
					font-size: 2.2cqw;
					text-align: center;
					line-height: 1;
					font-weight: 500;
				}
				.ce-core .ce-lbl small {
					display: block;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 1.1cqw;
					color: #00d3bb;
					text-transform: uppercase;
					letter-spacing: 2px;
					margin-top: 0.5cqw;
					font-weight: 400;
				}

				/* orbital rings */
				.ce-orbit {
					position: absolute;
					left: 50%; top: 50%;
					transform: translate(-50%,-50%);
					border-radius: 50%;
					border: 1px dashed rgba(255,255,255,0.13);
					opacity: 0.5;
				}
				.ce-orbit.r1 { width: 34cqw; height: 34cqw; }
				.ce-orbit.r2 { width: 47cqw; height: 47cqw; opacity: 0.3; }

				/* expanding pulse rings */
				.ce-pulse-ring {
					position: absolute;
					left: 50%; top: 50%;
					transform: translate(-50%,-50%);
					border-radius: 50%;
					border: 1px solid rgba(0,211,187,0.35);
					animation: cePulseExpand 4s ease-out infinite;
				}
				.ce-pulse-ring.p2 { animation-delay: 1.3s; }
				.ce-pulse-ring.p3 { animation-delay: 2.6s; }
				@keyframes cePulseExpand {
					0% { width: 13cqw; height: 13cqw; opacity: .7; }
					100% { width: 55cqw; height: 55cqw; opacity: 0; }
				}

				/* agent cards */
				.ce-agent {
					position: absolute;
					width: 19cqw;
					border: 1px solid rgba(255,255,255,0.13);
					border-radius: 1.4cqw;
					background: linear-gradient(180deg, rgba(20,21,32,0.92), rgba(14,15,28,0.88));
					backdrop-filter: blur(20px);
					padding: 1.8cqw 1.5cqw;
					text-align: center;
					box-shadow: 0 1cqw 3cqw rgba(0,0,0,0.6);
					z-index: 5;
				}
				.ce-agent .ce-emoji {
					font-size: 4.5cqw;
					line-height: 1;
					margin-bottom: 0.6cqw;
					display: inline-block;
					filter: drop-shadow(0 0 1cqw rgba(0,211,187,0.18));
				}
				.ce-agent .ce-nm {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 2.2cqw;
					font-weight: 500;
					letter-spacing: -0.3px;
					line-height: 1.1;
				}
				.ce-agent .ce-rl {
					font-size: 1.3cqw;
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 1.6px;
					margin-top: 0.6cqw;
					font-weight: 500;
				}

				.ce-agent.top { top: 4%; left: 50%; transform: translateX(-50%); }
				.ce-agent.right { top: 50%; right: 4%; transform: translateY(-50%); }
				.ce-agent.bottom { bottom: 4%; left: 50%; transform: translateX(-50%); }
				.ce-agent.left { top: 50%; left: 4%; transform: translateY(-50%); }

				/* activation: glow + scale */
				.ce-agent.top { animation: ceAgentActive 7s infinite; animation-delay: .4s; }
				.ce-agent.right { animation: ceAgentActiveR 7s infinite; animation-delay: 2s; }
				.ce-agent.bottom { animation: ceAgentActive 7s infinite; animation-delay: 3.6s; }
				.ce-agent.left { animation: ceAgentActiveL 7s infinite; animation-delay: 5.2s; }
				@keyframes ceAgentActive {
					0%, 3% { border-color: rgba(255,255,255,0.13); box-shadow: 0 1cqw 3cqw rgba(0,0,0,0.6); transform: translateX(-50%) scale(1); }
					6%, 18% { border-color: #00d3bb; box-shadow: 0 0 3cqw rgba(0,211,187,0.18), 0 1cqw 3cqw rgba(0,0,0,0.6); transform: translateX(-50%) scale(1.06); }
					22%, 100% { border-color: rgba(255,255,255,0.13); box-shadow: 0 1cqw 3cqw rgba(0,0,0,0.6); transform: translateX(-50%) scale(1); }
				}
				@keyframes ceAgentActiveR {
					0%, 3% { border-color: rgba(255,255,255,0.13); box-shadow: 0 1cqw 3cqw rgba(0,0,0,0.6); transform: translateY(-50%) scale(1); }
					6%, 18% { border-color: #00d3bb; box-shadow: 0 0 3cqw rgba(0,211,187,0.18), 0 1cqw 3cqw rgba(0,0,0,0.6); transform: translateY(-50%) scale(1.06); }
					22%, 100% { border-color: rgba(255,255,255,0.13); box-shadow: 0 1cqw 3cqw rgba(0,0,0,0.6); transform: translateY(-50%) scale(1); }
				}
				@keyframes ceAgentActiveL {
					0%, 3% { border-color: rgba(255,255,255,0.13); box-shadow: 0 1cqw 3cqw rgba(0,0,0,0.6); transform: translateY(-50%) scale(1); }
					6%, 18% { border-color: #00d3bb; box-shadow: 0 0 3cqw rgba(0,211,187,0.18), 0 1cqw 3cqw rgba(0,0,0,0.6); transform: translateY(-50%) scale(1.06); }
					22%, 100% { border-color: rgba(255,255,255,0.13); box-shadow: 0 1cqw 3cqw rgba(0,0,0,0.6); transform: translateY(-50%) scale(1); }
				}

				/* emoji bounce when active */
				.ce-agent .ce-emoji { animation-duration: 7s; animation-iteration-count: infinite; }
				.ce-agent.top .ce-emoji { animation-name: ceEmojiBounce; animation-delay: .4s; }
				.ce-agent.right .ce-emoji { animation-name: ceEmojiBounce; animation-delay: 2s; }
				.ce-agent.bottom .ce-emoji { animation-name: ceEmojiBounce; animation-delay: 3.6s; }
				.ce-agent.left .ce-emoji { animation-name: ceEmojiBounce; animation-delay: 5.2s; }
				@keyframes ceEmojiBounce {
					0%, 3% { transform: translateY(0) scale(1); }
					7% { transform: translateY(-0.8cqw) scale(1.15); }
					11% { transform: translateY(0) scale(1); }
					15% { transform: translateY(-0.4cqw) scale(1.08); }
					19%, 100% { transform: translateY(0) scale(1); }
				}

				/* status pings */
				.ce-agent .ce-ping {
					position: absolute;
					top: 1cqw; right: 1cqw;
					width: 0.9cqw; height: 0.9cqw;
					border-radius: 50%;
					background: #8a8ba0;
				}
				.ce-agent.top .ce-ping { animation: cePingOn 7s infinite; animation-delay: .4s; }
				.ce-agent.right .ce-ping { animation: cePingOn 7s infinite; animation-delay: 2s; }
				.ce-agent.bottom .ce-ping { animation: cePingOn 7s infinite; animation-delay: 3.6s; }
				.ce-agent.left .ce-ping { animation: cePingOn 7s infinite; animation-delay: 5.2s; }
				@keyframes cePingOn {
					0%, 3% { background: #8a8ba0; box-shadow: none; }
					6%, 18% { background: #00d3bb; box-shadow: 0 0 1cqw #00d3bb; }
					22%, 100% { background: #8a8ba0; box-shadow: none; }
				}

				/* live badge */
				.ce-agent .ce-badge {
					position: absolute;
					top: -1cqw; left: 50%;
					transform: translateX(-50%);
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 0.95cqw;
					background: #00d3bb;
					color: #062821;
					padding: 0.35cqw 1cqw;
					border-radius: 99cqw;
					letter-spacing: 1.8px;
					font-weight: 600;
					text-transform: uppercase;
					opacity: 0;
					box-shadow: 0 0 1.5cqw rgba(0,211,187,0.18);
					white-space: nowrap;
				}
				.ce-agent.top .ce-badge { animation: ceBadgeShow 7s infinite; animation-delay: .4s; }
				.ce-agent.right .ce-badge { animation: ceBadgeShow 7s infinite; animation-delay: 2s; }
				.ce-agent.bottom .ce-badge { animation: ceBadgeShow 7s infinite; animation-delay: 3.6s; }
				.ce-agent.left .ce-badge { animation: ceBadgeShow 7s infinite; animation-delay: 5.2s; }
				@keyframes ceBadgeShow {
					0%, 4% { opacity: 0; transform: translateX(-50%) translateY(0.3cqw); }
					7%, 17% { opacity: 1; transform: translateX(-50%) translateY(0); }
					20%, 100% { opacity: 0; transform: translateX(-50%) translateY(-0.3cqw); }
				}

				/* energy beams */
				.ce-beams {
					position: absolute; inset: 0;
					width: 100%; height: 100%;
					pointer-events: none;
					z-index: 3;
				}
				.ce-beams .ce-beam {
					stroke: #00d3bb;
					stroke-width: 2;
					opacity: 0;
					stroke-dasharray: 6 4;
					fill: none;
				}
				.ce-beams .b-top { animation: ceBeam 7s infinite; animation-delay: .4s; }
				.ce-beams .b-right { animation: ceBeam 7s infinite; animation-delay: 2s; }
				.ce-beams .b-bottom { animation: ceBeam 7s infinite; animation-delay: 3.6s; }
				.ce-beams .b-left { animation: ceBeam 7s infinite; animation-delay: 5.2s; }
				@keyframes ceBeam {
					0%, 3% { opacity: 0; stroke-dashoffset: 0; }
					6%, 18% { opacity: .9; stroke-dashoffset: -60; }
					22%, 100% { opacity: 0; }
				}

				/* traveling spark dots */
				.ce-spark {
					position: absolute;
					width: 1.2cqw; height: 1.2cqw;
					border-radius: 50%;
					background: radial-gradient(circle, #00d3bb, transparent 70%);
					box-shadow: 0 0 1.2cqw #00d3bb;
					pointer-events: none;
					z-index: 4;
					opacity: 0;
				}
				.ce-spark.s-top { left: 50%; top: 50%; animation: ceSparkTop 7s infinite; animation-delay: .5s; }
				.ce-spark.s-right { left: 50%; top: 50%; animation: ceSparkRight 7s infinite; animation-delay: 2.1s; }
				.ce-spark.s-bottom { left: 50%; top: 50%; animation: ceSparkBottom 7s infinite; animation-delay: 3.7s; }
				.ce-spark.s-left { left: 50%; top: 50%; animation: ceSparkLeft 7s infinite; animation-delay: 5.3s; }
				@keyframes ceSparkTop {
					0%, 3% { opacity: 0; transform: translate(-50%,-50%); }
					6% { opacity: 1; transform: translate(-50%,-50%); }
					16% { opacity: 1; transform: translate(-50%,-400%); }
					18%, 100% { opacity: 0; transform: translate(-50%,-400%); }
				}
				@keyframes ceSparkRight {
					0%, 3% { opacity: 0; transform: translate(-50%,-50%); }
					6% { opacity: 1; transform: translate(-50%,-50%); }
					16% { opacity: 1; transform: translate(750%,-50%); }
					18%, 100% { opacity: 0; transform: translate(750%,-50%); }
				}
				@keyframes ceSparkBottom {
					0%, 3% { opacity: 0; transform: translate(-50%,-50%); }
					6% { opacity: 1; transform: translate(-50%,-50%); }
					16% { opacity: 1; transform: translate(-50%,400%); }
					18%, 100% { opacity: 0; transform: translate(-50%,400%); }
				}
				@keyframes ceSparkLeft {
					0%, 3% { opacity: 0; transform: translate(-50%,-50%); }
					6% { opacity: 1; transform: translate(-50%,-50%); }
					16% { opacity: 1; transform: translate(-750%,-50%); }
					18%, 100% { opacity: 0; transform: translate(-750%,-50%); }
				}

				/* floating ambient particles */
				.ce-particle {
					position: absolute;
					width: 0.35cqw; height: 0.35cqw;
					border-radius: 50%;
					background: #00d3bb;
					opacity: 0.4;
					box-shadow: 0 0 0.7cqw #00d3bb;
				}
				.ce-particle.f1 { top: 20%; left: 30%; animation: ceFloat 6s ease-in-out infinite; }
				.ce-particle.f2 { top: 75%; left: 25%; animation: ceFloat 7s ease-in-out infinite reverse; animation-delay: 1s; }
				.ce-particle.f3 { top: 30%; left: 72%; animation: ceFloat 8s ease-in-out infinite; animation-delay: 2s; }
				.ce-particle.f4 { top: 70%; left: 75%; animation: ceFloat 5.5s ease-in-out infinite reverse; animation-delay: .5s; }
				.ce-particle.f5 { top: 15%; left: 55%; animation: ceFloat 7.5s ease-in-out infinite; animation-delay: 3s; background: #605dff; box-shadow: 0 0 0.7cqw #605dff; }
				.ce-particle.f6 { top: 82%; left: 50%; animation: ceFloat 6.5s ease-in-out infinite reverse; animation-delay: 2.5s; background: #605dff; box-shadow: 0 0 0.7cqw #605dff; }
				@keyframes ceFloat {
					0%, 100% { transform: translate(0,0); opacity: .3; }
					50% { transform: translate(1cqw,-1.5cqw); opacity: .7; }
				}
			`}</style>

			<div className="ce-stage">
				<div className="ce-stage-marker">Lucy <b>·</b> 05</div>
				<span className="ce-marker">05 / custom experts</span>

				<div className="ce-particle f1" />
				<div className="ce-particle f2" />
				<div className="ce-particle f3" />
				<div className="ce-particle f4" />
				<div className="ce-particle f5" />
				<div className="ce-particle f6" />

				<div className="ce-pulse-ring" />
				<div className="ce-pulse-ring p2" />
				<div className="ce-pulse-ring p3" />

				<div className="ce-orbit r1" />
				<div className="ce-orbit r2" />

				<svg className="ce-beams" viewBox="0 0 1100 688" preserveAspectRatio="none">
					<line className="ce-beam b-top" x1="550" y1="344" x2="550" y2="120" />
					<line className="ce-beam b-right" x1="550" y1="344" x2="920" y2="344" />
					<line className="ce-beam b-bottom" x1="550" y1="344" x2="550" y2="570" />
					<line className="ce-beam b-left" x1="550" y1="344" x2="180" y2="344" />
				</svg>

				<span className="ce-spark s-top" />
				<span className="ce-spark s-right" />
				<span className="ce-spark s-bottom" />
				<span className="ce-spark s-left" />

				<div className="ce-core">
					<div className="ce-lbl">Lucy<small>orchestrator</small></div>
				</div>

				<div className="ce-agent top">
					<div className="ce-ping" />
					<div className="ce-badge">● live</div>
					<div className="ce-emoji">📣</div>
					<div className="ce-nm">Nancy</div>
					<div className="ce-rl">marketing</div>
				</div>
				<div className="ce-agent right">
					<div className="ce-ping" />
					<div className="ce-badge">● live</div>
					<div className="ce-emoji">💬</div>
					<div className="ce-nm">Sam</div>
					<div className="ce-rl">support</div>
				</div>
				<div className="ce-agent bottom">
					<div className="ce-ping" />
					<div className="ce-badge">● live</div>
					<div className="ce-emoji">📊</div>
					<div className="ce-nm">Fran</div>
					<div className="ce-rl">finance</div>
				</div>
				<div className="ce-agent left">
					<div className="ce-ping" />
					<div className="ce-badge">● live</div>
					<div className="ce-emoji">🤝</div>
					<div className="ce-nm">Otto</div>
					<div className="ce-rl">onboarding</div>
				</div>
			</div>
		</VisualFrame>
	)
}
