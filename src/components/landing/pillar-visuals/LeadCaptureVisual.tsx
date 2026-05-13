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
					padding: 0 8%;
					font-family: 'SF Pro Display','Inter',system-ui,sans-serif;
					color: #eaeaf2;
				}
				.pl-track {
					position: relative;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 8.5%;
				}
				.pl-node {
					position: relative;
					z-index: 2;
					width: 12%;
					min-width: 70px;
					text-align: center;
				}
				.pl-circle {
					width: clamp(36px, 5.5%, 56px);
					aspect-ratio: 1;
					margin: 0 auto 10px;
					border-radius: 50%;
					border: 1px solid rgba(255,255,255,0.13);
					background: rgba(20,21,32,0.8);
					display: grid;
					place-items: center;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: clamp(10px, 1.2vw, 14px);
					color: #8a8ba0;
					position: relative;
					transition: all .4s;
				}
				.pl-circle::before {
					content: "";
					position: absolute;
					inset: -4px;
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
					0%, 3% { border-color: rgba(255,255,255,0.13); color: #8a8ba0; background: rgba(20,21,32,0.8); }
					5%, 18% { border-color: #00d3bb; color: #00d3bb; background: rgba(0,211,187,0.1); box-shadow: 0 0 30px rgba(0,211,187,0.18); }
					25%, 100% { border-color: rgba(0,211,187,0.35); color: #00d3bb; background: rgba(20,21,32,0.8); box-shadow: none; }
				}
				.pl-lbl {
					font-size: clamp(8px, 0.85vw, 10px);
					text-transform: uppercase;
					letter-spacing: 1.8px;
					color: #8a8ba0;
				}
				.pl-sub {
					font-size: clamp(7px, 0.75vw, 9px);
					color: #8a8ba0;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					margin-top: 3px;
					opacity: .6;
				}
				.pl-rail {
					position: absolute;
					left: 6%;
					right: 6%;
					top: clamp(18px, 2.3vw, 28px);
					height: 1px;
					background: rgba(255,255,255,0.13);
					z-index: 1;
				}
				.pl-rail::after {
					content: "";
					position: absolute;
					left: 0;
					top: -1px;
					height: 3px;
					width: 0;
					background: linear-gradient(90deg, #00d3bb, #605dff);
					box-shadow: 0 0 12px #00d3bb;
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
				.pl-leads {
					display: flex;
					justify-content: center;
					gap: clamp(8px, 1.3vw, 14px);
					flex-wrap: wrap;
					max-width: 720px;
					margin: 0 auto;
				}
				.pl-chip {
					padding: clamp(5px, 0.7vw, 8px) clamp(9px, 1.3vw, 14px);
					border-radius: 999px;
					border: 1px solid rgba(255,255,255,0.07);
					background: rgba(20,21,32,0.6);
					font-size: clamp(9px, 0.95vw, 11px);
					display: flex;
					align-items: center;
					gap: 8px;
					backdrop-filter: blur(10px);
				}
				.pl-chip .pl-av {
					width: clamp(16px, 1.8vw, 20px);
					aspect-ratio: 1;
					border-radius: 50%;
					background: linear-gradient(135deg, rgba(0,211,187,0.3), rgba(96,93,255,0.1));
					display: grid;
					place-items: center;
					font-size: clamp(8px, 0.8vw, 9px);
					color: #00d3bb;
					font-family: 'Fraunces', Georgia, serif;
				}
				.pl-chip .pl-st {
					font-size: clamp(7px, 0.75vw, 9px);
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 1px;
					margin-left: 4px;
				}
				.pl-chip.pl-l1 { animation: plChipActive 7s infinite; animation-delay: .5s; }
				.pl-chip.pl-l2 { animation: plChipActive 7s infinite; animation-delay: 1.8s; }
				.pl-chip.pl-l3 { animation: plChipActive 7s infinite; animation-delay: 3.2s; }
				@keyframes plChipActive {
					0%, 3% { border-color: rgba(255,255,255,0.07); background: rgba(20,21,32,0.6); box-shadow: none; transform: scale(1); }
					5%, 18% { border-color: #00d3bb; background: rgba(0,211,187,0.08); box-shadow: 0 0 20px rgba(0,211,187,0.18); transform: scale(1.05); }
					25%, 100% { border-color: rgba(0,211,187,0.35); background: rgba(20,21,32,0.6); box-shadow: none; transform: scale(1); }
				}
				.pl-stage-marker {
					position: absolute;
					top: 3.5%;
					left: 3.5%;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: clamp(8px, 0.85vw, 10px);
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 2.5px;
					z-index: 5;
				}
				.pl-stage-marker b { color: #00d3bb; font-weight: 500; }
				.pl-marker {
					position: absolute;
					top: 3.5%;
					right: 3.5%;
					font-family: 'Fraunces', Georgia, serif;
					font-size: clamp(9px, 0.95vw, 11px);
					color: #00d3bb;
					letter-spacing: 1px;
					z-index: 5;
					text-transform: uppercase;
				}
			`}</style>

			<div className="pl-stage">
				<div className="pl-stage-marker">Lucy <b>·</b> 04</div>
				<span className="pl-marker">04 / pipeline</span>

				<div className="pl-track">
					<div className="pl-rail" />
					<div className="pl-node pl-n1">
						<div className="pl-circle">01</div>
						<div className="pl-lbl">New</div>
						<div className="pl-sub">4 leads</div>
					</div>
					<div className="pl-node pl-n2">
						<div className="pl-circle">02</div>
						<div className="pl-lbl">Contacted</div>
						<div className="pl-sub">3 leads</div>
					</div>
					<div className="pl-node pl-n3">
						<div className="pl-circle">03</div>
						<div className="pl-lbl">Qualified</div>
						<div className="pl-sub">3 leads</div>
					</div>
					<div className="pl-node pl-n4">
						<div className="pl-circle">04</div>
						<div className="pl-lbl">Won</div>
						<div className="pl-sub">2 closed</div>
					</div>
				</div>

				<div className="pl-leads">
					<div className="pl-chip pl-l1">
						<span className="pl-av">J</span>
						<span>Jamie Reyes</span>
						<span className="pl-st">→ contacted</span>
					</div>
					<div className="pl-chip pl-l2">
						<span className="pl-av">M</span>
						<span>Marcus Kim</span>
						<span className="pl-st">→ qualified</span>
					</div>
					<div className="pl-chip pl-l3">
						<span className="pl-av">T</span>
						<span>Talia Ng</span>
						<span className="pl-st">→ won</span>
					</div>
				</div>
			</div>
		</VisualFrame>
	)
}
