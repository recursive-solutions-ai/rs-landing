"use client"

import { VisualFrame } from "./VisualFrame"

export function LeadCaptureVisual() {
	return (
		<VisualFrame glowFrom="rgba(0,211,187,0.18)" glowTo="rgba(96,93,255,0.18)">
			<style>{`
				.pl-stage {
					position: absolute;
					inset: 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 0 6cqw;
					font-family: 'SF Pro Display','Inter',system-ui,sans-serif;
					color: #eaeaf2;
					container-type: inline-size;
				}

				/* ambient particles */
				.pl-particle {
					position: absolute;
					width: 0.35cqw;
					height: 0.35cqw;
					border-radius: 50%;
					background: #00d3bb;
					opacity: .4;
					box-shadow: 0 0 0.7cqw #00d3bb;
				}
				.pl-particle.pl-f1 { top: 18%; left: 20%; animation: plFloat 6s ease-in-out infinite; }
				.pl-particle.pl-f2 { top: 80%; left: 30%; animation: plFloat 7s ease-in-out infinite reverse; animation-delay: 1s; }
				.pl-particle.pl-f3 { top: 25%; left: 78%; animation: plFloat 8s ease-in-out infinite; animation-delay: 2s; background: #605dff; box-shadow: 0 0 0.7cqw #605dff; }
				.pl-particle.pl-f4 { top: 75%; left: 82%; animation: plFloat 5.5s ease-in-out infinite reverse; animation-delay: .5s; background: #605dff; box-shadow: 0 0 0.7cqw #605dff; }
				@keyframes plFloat {
					0%, 100% { transform: translate(0, 0); opacity: .3; }
					50% { transform: translate(1cqw, -1.5cqw); opacity: .7; }
				}

				.pl-track {
					position: relative;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 8cqw;
				}
				.pl-node {
					position: relative;
					z-index: 2;
					width: 14cqw;
					text-align: center;
				}
				.pl-circle {
					width: 6cqw;
					height: 6cqw;
					margin: 0 auto 1.2cqw;
					border-radius: 50%;
					border: 1px solid rgba(255,255,255,0.13);
					background: rgba(20,21,32,0.85);
					display: grid;
					place-items: center;
					font-size: 2.6cqw;
					position: relative;
					transition: all .4s;
				}
				.pl-circle::before {
					content: "";
					position: absolute;
					inset: -0.5cqw;
					border-radius: 50%;
					border: 1px solid rgba(0,211,187,0.35);
					opacity: 0;
					animation: plNodeRing 7s infinite;
				}
				.pl-n1 .pl-circle::before { animation-delay: .5s; }
				.pl-n2 .pl-circle::before { animation-delay: 2s; }
				.pl-n3 .pl-circle::before { animation-delay: 3.5s; }
				.pl-n4 .pl-circle::before { animation-delay: 5s; }
				@keyframes plNodeRing {
					0%, 3% { opacity: 0; transform: scale(.8); }
					5%, 15% { opacity: .8; transform: scale(1); }
					20% { opacity: 0; transform: scale(1.3); }
					25%, 100% { opacity: 0; }
				}
				.pl-n1 .pl-circle { animation: plNodeOn 7s infinite; animation-delay: .5s; }
				.pl-n2 .pl-circle { animation: plNodeOn 7s infinite; animation-delay: 2s; }
				.pl-n3 .pl-circle { animation: plNodeOn 7s infinite; animation-delay: 3.5s; }
				.pl-n4 .pl-circle { animation: plNodeOn 7s infinite; animation-delay: 5s; }
				@keyframes plNodeOn {
					0%, 3% { border-color: rgba(255,255,255,0.13); background: rgba(20,21,32,0.85); box-shadow: none; filter: grayscale(.5); opacity: .7; }
					5%, 18% { border-color: #00d3bb; background: rgba(0,211,187,0.12); box-shadow: 0 0 3cqw rgba(0,211,187,0.18); filter: grayscale(0); opacity: 1; transform: scale(1.08); }
					25%, 100% { border-color: rgba(0,211,187,0.35); background: rgba(20,21,32,0.85); box-shadow: none; filter: grayscale(0); opacity: 1; transform: scale(1); }
				}
				.pl-lbl {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 1.7cqw;
					font-weight: 500;
					color: #eaeaf2;
					letter-spacing: -0.2px;
				}
				.pl-sub {
					font-size: 1.1cqw;
					color: #8a8ba0;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					margin-top: 0.4cqw;
					letter-spacing: 1px;
				}

				.pl-rail {
					position: absolute;
					left: 7cqw;
					right: 7cqw;
					top: 3cqw;
					height: 1px;
					background: rgba(255,255,255,0.13);
					z-index: 1;
				}
				.pl-rail::after {
					content: "";
					position: absolute;
					left: 0;
					top: -1.5px;
					height: 4px;
					width: 0;
					background: linear-gradient(90deg, #00d3bb, #605dff);
					box-shadow: 0 0 1.2cqw #00d3bb;
					border-radius: 3px;
					animation: plRailFill 7s infinite;
				}
				@keyframes plRailFill {
					0% { width: 0; }
					10% { width: 33%; }
					30% { width: 33%; }
					40% { width: 66%; }
					60% { width: 66%; }
					70% { width: 100%; }
					100% { width: 100%; }
				}

				.pl-rail-spark {
					position: absolute;
					top: 3cqw;
					width: 1.4cqw;
					height: 1.4cqw;
					border-radius: 50%;
					background: radial-gradient(circle, #00d3bb, transparent 70%);
					box-shadow: 0 0 1.5cqw #00d3bb;
					transform: translate(-50%, -50%);
					animation: plRailSpark 7s infinite;
					opacity: 0;
					z-index: 3;
					left: 7cqw;
				}
				@keyframes plRailSpark {
					0% { left: 7cqw; opacity: 0; }
					5% { opacity: 1; }
					10% { left: calc(7cqw + (100cqw - 14cqw) * 0.33); }
					30% { left: calc(7cqw + (100cqw - 14cqw) * 0.33); opacity: 1; }
					40% { left: calc(7cqw + (100cqw - 14cqw) * 0.66); }
					60% { left: calc(7cqw + (100cqw - 14cqw) * 0.66); opacity: 1; }
					70% { left: calc(100cqw - 7cqw); }
					75% { opacity: 0; }
					100% { left: calc(100cqw - 7cqw); opacity: 0; }
				}

				.pl-leads {
					display: flex;
					justify-content: center;
					gap: 2cqw;
					flex-wrap: wrap;
					max-width: 80cqw;
					margin: 0 auto;
				}
				.pl-chip {
					padding: 1.2cqw 1.8cqw;
					border-radius: 999px;
					border: 1px solid rgba(255,255,255,0.07);
					background: rgba(20,21,32,0.7);
					font-size: 1.5cqw;
					display: flex;
					align-items: center;
					gap: 1.2cqw;
					backdrop-filter: blur(10px);
				}
				.pl-chip .pl-av {
					width: 2.8cqw;
					height: 2.8cqw;
					border-radius: 50%;
					background: linear-gradient(135deg, rgba(0,211,187,0.3), rgba(96,93,255,0.15));
					display: grid;
					place-items: center;
					font-size: 1.6cqw;
					border: 1px solid rgba(0,211,187,0.35);
				}
				.pl-chip .pl-nm {
					font-family: 'Fraunces', Georgia, serif;
					font-weight: 500;
					letter-spacing: -0.2px;
				}
				.pl-chip .pl-st {
					font-size: 1cqw;
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 1.5px;
					margin-left: 0.4cqw;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
				}
				.pl-chip.pl-l1 { animation: plChipActive 7s infinite; animation-delay: .5s; }
				.pl-chip.pl-l2 { animation: plChipActive 7s infinite; animation-delay: 1.8s; }
				.pl-chip.pl-l3 { animation: plChipActive 7s infinite; animation-delay: 3.2s; }
				@keyframes plChipActive {
					0%, 3% { border-color: rgba(255,255,255,0.07); background: rgba(20,21,32,0.7); box-shadow: none; transform: scale(1); }
					5%, 18% { border-color: #00d3bb; background: rgba(0,211,187,0.12); box-shadow: 0 0 2cqw rgba(0,211,187,0.18); transform: scale(1.08) translateY(-0.5cqw); }
					25%, 100% { border-color: rgba(255,255,255,0.13); background: rgba(20,21,32,0.7); box-shadow: none; transform: scale(1) translateY(0); }
				}

				.pl-stage-marker {
					position: absolute;
					top: 2.4cqw;
					left: 3cqw;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 1.1cqw;
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 2.5px;
					z-index: 5;
				}
				.pl-stage-marker b { color: #00d3bb; font-weight: 500; }
				.pl-marker {
					position: absolute;
					top: 2.4cqw;
					right: 3cqw;
					font-family: 'Fraunces', Georgia, serif;
					font-size: 1.3cqw;
					color: #00d3bb;
					letter-spacing: 1px;
					z-index: 5;
					text-transform: uppercase;
				}
			`}</style>

			<div className="pl-stage">
				<div className="pl-stage-marker">Lucy <b>·</b> 04</div>
				<span className="pl-marker">04 / pipeline</span>

				<span className="pl-particle pl-f1" />
				<span className="pl-particle pl-f2" />
				<span className="pl-particle pl-f3" />
				<span className="pl-particle pl-f4" />

				<div className="pl-track">
					<div className="pl-rail" />
					<span className="pl-rail-spark" />

					<div className="pl-node pl-n1">
						<div className="pl-circle">✨</div>
						<div className="pl-lbl">New</div>
						<div className="pl-sub">4 leads</div>
					</div>
					<div className="pl-node pl-n2">
						<div className="pl-circle">📨</div>
						<div className="pl-lbl">Contacted</div>
						<div className="pl-sub">3 leads</div>
					</div>
					<div className="pl-node pl-n3">
						<div className="pl-circle">📞</div>
						<div className="pl-lbl">Qualified</div>
						<div className="pl-sub">3 leads</div>
					</div>
					<div className="pl-node pl-n4">
						<div className="pl-circle">🎉</div>
						<div className="pl-lbl">Won</div>
						<div className="pl-sub">2 closed</div>
					</div>
				</div>

				<div className="pl-leads">
					<div className="pl-chip pl-l1">
						<span className="pl-av">👤</span>
						<span className="pl-nm">Jamie Reyes</span>
						<span className="pl-st">→ contacted</span>
					</div>
					<div className="pl-chip pl-l2">
						<span className="pl-av">👤</span>
						<span className="pl-nm">Marcus Kim</span>
						<span className="pl-st">→ qualified</span>
					</div>
					<div className="pl-chip pl-l3">
						<span className="pl-av">👤</span>
						<span className="pl-nm">Talia Ng</span>
						<span className="pl-st">→ won</span>
					</div>
				</div>
			</div>
		</VisualFrame>
	)
}
