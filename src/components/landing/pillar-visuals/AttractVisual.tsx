"use client"

import { VisualFrame } from "./VisualFrame"

/* ── AttractVisual ──────────────────────────────────────────────────────
 * Faithful migration of 01_landing_pages.html — 3-phase loop:
 * paste URL → fetched basic site → 6 generated iterations. */
export function AttractVisual() {
	return (
		<VisualFrame glowFrom="rgba(0,211,187,0.18)" glowTo="rgba(96,93,255,0.18)">
			<style>{`
				.lp-stage {
					position: absolute;
					inset: 0;
					font-family: 'SF Pro Display','Inter',system-ui,sans-serif;
					color: #eaeaf2;
					container-type: inline-size;
					overflow: hidden;
				}
				.lp-stage-marker {
					position: absolute;
					top: 2.4cqw; left: 3cqw;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 1.1cqw;
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 2.5px;
					z-index: 60;
				}
				.lp-stage-marker b { color: #00d3bb; font-weight: 500; }
				.lp-marker {
					position: absolute;
					top: 2.4cqw; right: 3cqw;
					font-family: 'Fraunces', Georgia, serif;
					font-size: 1.3cqw;
					color: #00d3bb;
					letter-spacing: 1px;
					z-index: 55;
					text-transform: uppercase;
				}

				/* phase containers */
				.lp-phase {
					position: absolute; inset: 0;
					opacity: 0;
					display: flex; align-items: center; justify-content: center;
					padding: 8cqw 5cqw 4cqw;
				}
				.lp-p1 { animation: lpPhase1 14s infinite; }
				.lp-p2 { animation: lpPhase2 14s infinite; }
				.lp-p3 { animation: lpPhase3 14s infinite; }
				@keyframes lpPhase1 {
					0% { opacity: 0; transform: scale(.97); }
					3%, 28% { opacity: 1; transform: scale(1); }
					32%, 100% { opacity: 0; transform: scale(1.02); }
				}
				@keyframes lpPhase2 {
					0%, 28% { opacity: 0; transform: scale(.97); }
					33%, 55% { opacity: 1; transform: scale(1); }
					60%, 100% { opacity: 0; transform: scale(1.02); }
				}
				@keyframes lpPhase3 {
					0%, 55% { opacity: 0; transform: scale(.97); }
					60%, 97% { opacity: 1; transform: scale(1); }
					100% { opacity: 0; transform: scale(1.02); }
				}

				/* PHASE 1 — paste a URL */
				.lp-p1 .lp-inner { width: 100%; max-width: 75cqw; text-align: center; }
				.lp-p1 h1 {
					font-family: 'Fraunces', Georgia, serif;
					font-weight: 500;
					font-size: 6cqw;
					letter-spacing: -0.5px;
					margin: 0 0 1.5cqw;
					line-height: 1;
				}
				.lp-p1 .lp-sub {
					font-size: 1.7cqw;
					color: #8a8ba0;
					margin-bottom: 4cqw;
					font-weight: 400;
				}
				.lp-p1 .lp-url-field {
					position: relative;
					width: 100%;
					padding: 2cqw 2.5cqw;
					border: 1px solid rgba(255,255,255,0.13);
					border-radius: 1.2cqw;
					background: rgba(0,0,0,0.3);
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 1.8cqw;
					color: #eaeaf2;
					text-align: left;
					display: flex;
					align-items: center;
					gap: 1.2cqw;
				}
				.lp-p1 .lp-url-field::before {
					content: "";
					position: absolute;
					inset: -1px;
					border-radius: 1.2cqw;
					border: 1px solid #00d3bb;
					opacity: 0;
					animation: lpUrlGlow 14s infinite;
				}
				@keyframes lpUrlGlow {
					0%, 6% { opacity: 0; }
					9%, 25% { opacity: .8; box-shadow: 0 0 4cqw rgba(0,211,187,0.18); }
					29%, 100% { opacity: 0; }
				}
				.lp-p1 .lp-icon { color: #00d3bb; font-size: 1.5cqw; }
				.lp-p1 .lp-placeholder {
					color: #8a8ba0;
					position: absolute;
					left: 5cqw; top: 50%;
					transform: translateY(-50%);
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 1.8cqw;
					animation: lpPhHide 14s infinite;
				}
				@keyframes lpPhHide { 0%, 3% { opacity: .6; } 5%, 100% { opacity: 0; } }
				.lp-p1 .lp-typed {
					display: inline-block;
					max-width: 0;
					overflow: hidden;
					white-space: nowrap;
					animation: lpTypeUrl 14s infinite;
				}
				@keyframes lpTypeUrl {
					0%, 4% { max-width: 0; }
					14%, 28% { max-width: 30cqw; }
					32%, 100% { max-width: 30cqw; opacity: 0; }
				}
				.lp-p1 .lp-caret {
					display: inline-block;
					width: 2px;
					height: 2cqw;
					background: #00d3bb;
					margin-left: 0.2cqw;
					animation: lpCaret 1s steps(2) infinite;
					vertical-align: middle;
				}
				@keyframes lpCaret { 50% { opacity: 0; } }
				.lp-p1 .lp-btn {
					margin-top: 2cqw;
					display: inline-block;
					padding: 1.4cqw 3.5cqw;
					background: rgba(255,255,255,0.04);
					border: 1px solid rgba(255,255,255,0.07);
					border-radius: 1cqw;
					color: #8a8ba0;
					font-size: 1.5cqw;
					font-weight: 500;
					animation: lpBtnActivate 14s infinite;
				}
				@keyframes lpBtnActivate {
					0%, 18% { background: rgba(255,255,255,0.04); color: #8a8ba0; box-shadow: none; transform: scale(1); }
					22%, 28% { background: #00d3bb; color: #062821; box-shadow: 0 0 4cqw rgba(0,211,187,0.18); transform: scale(.96); }
					32%, 100% { background: rgba(255,255,255,0.04); color: #8a8ba0; }
				}

				/* PHASE 2 — basic site */
				.lp-p2 .lp-container { display: flex; flex-direction: column; align-items: center; width: 100%; gap: 2.5cqw; }
				.lp-p2 .lp-label {
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 1.1cqw;
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 2.5px;
					display: flex; align-items: center; gap: 1cqw;
				}
				.lp-p2 .lp-label::before {
					content: "";
					width: 0.7cqw; height: 0.7cqw;
					border-radius: 50%;
					background: #8a8ba0;
				}
				.lp-p2 .lp-label::after {
					content: "fetched";
					color: #00d3bb;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					letter-spacing: 2px;
				}
				.lp-p2 .lp-browser {
					width: 75cqw; height: 55cqw; max-height: 55cqw;
					border: 1px solid rgba(255,255,255,0.13);
					border-radius: 1cqw;
					overflow: hidden;
					background: #1a1d28;
					box-shadow: 0 2cqw 5cqw rgba(0,0,0,0.5);
				}
				.lp-p2 .lp-bar {
					height: 2.5cqw;
					background: #0d0f16;
					display: flex;
					align-items: center;
					gap: 0.5cqw;
					padding: 0 1.2cqw;
					border-bottom: 1px solid rgba(255,255,255,0.07);
				}
				.lp-p2 .lp-bar i {
					width: 0.8cqw; height: 0.8cqw;
					border-radius: 50%;
					background: #33344a;
					display: inline-block;
				}
				.lp-p2 .lp-bar i:nth-child(1) { background: #ff5f57; }
				.lp-p2 .lp-bar i:nth-child(2) { background: #febc2e; }
				.lp-p2 .lp-bar i:nth-child(3) { background: #28c840; }
				.lp-p2 .lp-bar .lp-url {
					margin-left: auto;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 1cqw;
					color: #8a8ba0;
				}
				.lp-p2 .lp-site {
					padding: 3cqw 4cqw;
					height: calc(100% - 2.5cqw);
					background: linear-gradient(180deg,#1a1d28,#161824);
					display: flex; flex-direction: column; gap: 1.5cqw;
				}
				.lp-p2 .lp-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1cqw;
				}
				.lp-p2 .lp-logo {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 2cqw;
					color: #aab;
					letter-spacing: 1px;
				}
				.lp-p2 .lp-menu {
					display: flex; gap: 2cqw;
					font-size: 1cqw;
					color: #6c6f80;
					text-transform: uppercase;
					letter-spacing: 1.5px;
				}
				.lp-p2 .lp-hero-img {
					height: 14cqw;
					border-radius: 0.5cqw;
					background: repeating-linear-gradient(135deg,#252836,#252836 0.5cqw,#1f2230 0.5cqw,#1f2230 1cqw);
					display: grid;
					place-items: center;
					color: #3a3f50;
					font-size: 1.1cqw;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
				}
				.lp-p2 .lp-site h2 {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 2.2cqw;
					color: #aab;
					font-weight: 400;
					margin: 1cqw 0 0;
					text-align: center;
				}
				.lp-p2 .lp-site p {
					font-size: 1.1cqw;
					color: #5a5d70;
					line-height: 1.6;
					text-align: center;
					max-width: 50cqw;
					margin: 0 auto;
				}
				.lp-p2 .lp-cta-row {
					display: flex;
					justify-content: center;
					margin-top: auto;
					padding-bottom: 1cqw;
				}
				.lp-p2 .lp-cta {
					padding: 1cqw 2.5cqw;
					background: #3a82e5;
					color: #fff;
					font-size: 1.1cqw;
					font-weight: 600;
					border-radius: 0.4cqw;
					letter-spacing: 1px;
				}

				/* PHASE 3 — iterations gallery */
				.lp-p3 .lp-container { display: flex; flex-direction: column; align-items: center; width: 100%; gap: 2cqw; }
				.lp-p3 .lp-label {
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 1.1cqw;
					color: #8a8ba0;
					text-transform: uppercase;
					letter-spacing: 2.5px;
					display: flex;
					align-items: center;
					gap: 1cqw;
				}
				.lp-p3 .lp-label b { color: #00d3bb; font-weight: 500; }
				.lp-p3 .lp-label::before {
					content: "";
					width: 0.7cqw; height: 0.7cqw;
					border-radius: 50%;
					background: #00d3bb;
					box-shadow: 0 0 1cqw #00d3bb;
					animation: lpBlink 1.4s infinite;
				}
				@keyframes lpBlink { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
				.lp-p3 .lp-headline {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 2.6cqw;
					font-weight: 500;
					margin: 0;
					letter-spacing: -0.3px;
					text-align: center;
				}
				.lp-p3 .lp-headline em {
					color: #00d3bb;
					font-style: italic;
					font-weight: 400;
				}
				.lp-p3 .lp-grid {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 1.5cqw;
					width: 100%;
					max-width: 80cqw;
					margin-top: 1cqw;
				}
				.lp-iter {
					position: relative;
					border: 1px solid rgba(255,255,255,0.13);
					border-radius: 1cqw;
					overflow: hidden;
					aspect-ratio: 16/10;
					box-shadow: 0 1.5cqw 3cqw rgba(0,0,0,0.5);
					opacity: 0;
					animation: lpIterIn 0.6s forwards ease-out, lpIterHi 14s infinite;
				}
				.lp-iter:nth-child(1) { animation-delay: 0.15s, 7s; }
				.lp-iter:nth-child(2) { animation-delay: 0.3s, 7.6s; }
				.lp-iter:nth-child(3) { animation-delay: 0.45s, 8.2s; }
				.lp-iter:nth-child(4) { animation-delay: 0.6s, 8.8s; }
				.lp-iter:nth-child(5) { animation-delay: 0.75s, 9.4s; }
				.lp-iter:nth-child(6) { animation-delay: 0.9s, 10s; }
				@keyframes lpIterIn {
					from { opacity: 0; transform: translateY(1.5cqw) scale(.96); }
					to { opacity: 1; transform: translateY(0) scale(1); }
				}
				@keyframes lpIterHi {
					0%, 55% { box-shadow: 0 1.5cqw 3cqw rgba(0,0,0,0.5); transform: scale(1); }
					60%, 66% { box-shadow: 0 1.5cqw 3cqw rgba(0,0,0,0.5), 0 0 3cqw rgba(0,211,187,0.18), 0 0 0 1px #00d3bb; transform: scale(1.04); }
					72%, 100% { box-shadow: 0 1.5cqw 3cqw rgba(0,0,0,0.5); transform: scale(1); }
				}
				.lp-iter .lp-tag {
					position: absolute;
					top: 0.8cqw; left: 0.8cqw;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 0.85cqw;
					background: rgba(0,0,0,0.6);
					color: #eaeaf2;
					padding: 0.3cqw 0.8cqw;
					border-radius: 0.4cqw;
					letter-spacing: 1.5px;
					font-weight: 600;
					border: 1px solid rgba(255,255,255,0.13);
					backdrop-filter: blur(10px);
					z-index: 5;
				}

				/* iter 1: cinematic gold */
				.lp-iter-1 {
					background: radial-gradient(70% 60% at 50% 0%,#3a2a10,#0d0a1e 65%);
					display: flex; flex-direction: column;
					align-items: center; justify-content: center;
					padding: 2cqw 1.5cqw;
				}
				.lp-iter-1 .lp-h {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 1.6cqw;
					color: #fff;
					text-align: center;
					line-height: 1.15;
					font-weight: 500;
				}
				.lp-iter-1 .lp-h em { color: #e8b870; font-style: italic; font-weight: 400; display: block; margin-top: 0.3cqw; }
				.lp-iter-1 .lp-btn {
					margin-top: 1cqw;
					padding: 0.5cqw 1.5cqw;
					background: #e8b870;
					color: #1a1a1a;
					font-size: 0.85cqw;
					font-weight: 700;
					letter-spacing: 1.5px;
				}

				/* iter 2: navy + bold stat */
				.lp-iter-2 {
					background: #0d1d3a;
					color: #fff;
					padding: 1.5cqw;
					display: flex; flex-direction: column;
					gap: 0.6cqw;
				}
				.lp-iter-2 .lp-h {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 1.2cqw;
					line-height: 1.2;
					color: #fff;
				}
				.lp-iter-2 .lp-h em { color: #e8b870; font-style: italic; }
				.lp-iter-2 .lp-stat {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 4.5cqw;
					color: #e8b870;
					font-weight: 500;
					line-height: 1;
					letter-spacing: -1px;
					margin-top: auto;
				}
				.lp-iter-2 .lp-lbl {
					font-size: 0.8cqw;
					color: #aaa;
					text-transform: uppercase;
					letter-spacing: 2px;
				}

				/* iter 3: light editorial */
				.lp-iter-3 {
					background: #f4f1ea;
					color: #1a1a1a;
					padding: 1.5cqw;
					display: flex; flex-direction: column;
				}
				.lp-iter-3 .lp-nav {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 0.7cqw;
					color: #1a1a1a;
					letter-spacing: 1px;
					border-bottom: 1px solid #1a1a1a;
					padding-bottom: 0.6cqw;
					margin-bottom: 0.8cqw;
				}
				.lp-iter-3 .lp-nav .lp-l { font-family: 'Fraunces', Georgia, serif; font-size: 1cqw; font-weight: 500; }
				.lp-iter-3 .lp-meta {
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					font-size: 0.65cqw;
					color: #7a5a20;
					letter-spacing: 1.5px;
					margin-bottom: 0.5cqw;
				}
				.lp-iter-3 .lp-h {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 1.4cqw;
					line-height: 1.15;
					color: #1a1a1a;
					margin-bottom: auto;
				}
				.lp-iter-3 .lp-h em { color: #7a5a20; font-style: italic; }
				.lp-iter-3 .lp-btn {
					align-self: flex-start;
					padding: 0.5cqw 1.2cqw;
					background: #1a1a1a;
					color: #f4f1ea;
					font-size: 0.75cqw;
					font-weight: 600;
					letter-spacing: 1px;
				}

				/* iter 4: modern minimal grid */
				.lp-iter-4 {
					background: #eae5d8;
					color: #1a1a1a;
					padding: 1.5cqw;
					display: flex; flex-direction: column;
					gap: 0.7cqw;
				}
				.lp-iter-4 .lp-h {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 1.4cqw;
					line-height: 1.1;
					font-weight: 500;
				}
				.lp-iter-4 .lp-h em { color: #7a5a20; font-style: italic; }
				.lp-iter-4 .lp-grid-mini {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 0.5cqw;
					margin-top: auto;
				}
				.lp-iter-4 .lp-card {
					background: #fff;
					padding: 0.6cqw;
					border-radius: 0.3cqw;
					border: 0.5px solid rgba(0,0,0,0.1);
				}
				.lp-iter-4 .lp-card .lp-nm {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 0.85cqw;
					font-weight: 500;
				}
				.lp-iter-4 .lp-card .lp-sub {
					font-size: 0.55cqw;
					color: #7a5a20;
					text-transform: uppercase;
					letter-spacing: 1px;
					margin-top: 0.2cqw;
				}

				/* iter 5: vibrant gradient */
				.lp-iter-5 {
					background: linear-gradient(135deg,#1a0f3d 0%,#3d1a5a 50%,#5a2a8a 100%);
					color: #fff;
					padding: 1.5cqw;
					display: flex; flex-direction: column;
					justify-content: space-between;
					position: relative;
					overflow: hidden;
				}
				.lp-iter-5::before {
					content: "";
					position: absolute;
					top: -30%; right: -30%;
					width: 80%; height: 80%;
					background: radial-gradient(circle,rgba(255,180,200,0.4),transparent 60%);
					filter: blur(2cqw);
				}
				.lp-iter-5 .lp-h {
					font-family: 'Fraunces', Georgia, serif;
					font-size: 1.5cqw;
					line-height: 1.15;
					position: relative;
					z-index: 1;
				}
				.lp-iter-5 .lp-h em {
					font-style: italic;
					background: linear-gradient(90deg,#ff9eb5,#ffd49e);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}
				.lp-iter-5 .lp-ctas {
					display: flex; gap: 0.5cqw;
					position: relative; z-index: 1;
				}
				.lp-iter-5 .lp-b1 {
					padding: 0.5cqw 1.2cqw;
					background: #ff9eb5;
					color: #1a0f3d;
					font-size: 0.8cqw;
					font-weight: 700;
					letter-spacing: 0.5px;
					border-radius: 99cqw;
				}
				.lp-iter-5 .lp-b2 {
					padding: 0.5cqw 1.2cqw;
					border: 1px solid rgba(255,255,255,0.4);
					color: #fff;
					font-size: 0.8cqw;
					border-radius: 99cqw;
				}

				/* iter 6: brutalist mono */
				.lp-iter-6 {
					background: #0a0a0a;
					color: #fff;
					padding: 1.5cqw;
					display: flex; flex-direction: column;
					font-family: 'JetBrains Mono', ui-monospace, monospace;
					position: relative;
				}
				.lp-iter-6::after {
					content: "";
					position: absolute;
					left: 1cqw; right: 1cqw;
					bottom: 3cqw;
					height: 1px;
					background: #fff;
					opacity: 0.3;
				}
				.lp-iter-6 .lp-lbl-6 {
					font-size: 0.7cqw;
					color: #fff;
					letter-spacing: 3px;
					text-transform: uppercase;
					margin-bottom: 0.5cqw;
					opacity: 0.6;
				}
				.lp-iter-6 .lp-h {
					font-family: 'Inter', sans-serif;
					font-size: 1.8cqw;
					line-height: 0.95;
					font-weight: 800;
					letter-spacing: -1px;
					text-transform: uppercase;
					margin-bottom: auto;
				}
				.lp-iter-6 .lp-nums {
					display: flex; gap: 1.5cqw;
					font-size: 0.7cqw;
					color: #fff;
					letter-spacing: 1px;
					text-transform: uppercase;
				}
				.lp-iter-6 .lp-nums b {
					font-family: 'Inter', sans-serif;
					font-weight: 800;
					font-size: 1.2cqw;
					display: block;
					letter-spacing: -0.5px;
				}
			`}</style>

			<div className="lp-stage">
				<div className="lp-stage-marker">Lucy <b>·</b> 01</div>
				<span className="lp-marker">01 / landing pages</span>

				{/* PHASE 1 */}
				<div className="lp-phase lp-p1">
					<div className="lp-inner">
						<h1>Redesign</h1>
						<div className="lp-sub">Paste a URL. We&apos;ll handle the rest.</div>
						<div className="lp-url-field">
							<span className="lp-icon">⌖</span>
							<span className="lp-placeholder">https://example.com</span>
							<span className="lp-typed">https://meridianlaw.com<span className="lp-caret" /></span>
						</div>
						<div className="lp-btn">Start</div>
					</div>
				</div>

				{/* PHASE 2 */}
				<div className="lp-phase lp-p2">
					<div className="lp-container">
						<div className="lp-label">Site</div>
						<div className="lp-browser">
							<div className="lp-bar">
								<i /><i /><i />
								<span className="lp-url">meridianlaw.com</span>
							</div>
							<div className="lp-site">
								<div className="lp-top">
									<div className="lp-logo">Meridian Law</div>
									<div className="lp-menu"><span>About</span><span>Services</span><span>Contact</span></div>
								</div>
								<div className="lp-hero-img">[ stock photo · office building ]</div>
								<h2>Welcome to Meridian Law</h2>
								<p>Providing legal services since 1998. Our attorneys handle a wide variety of cases including corporate law, real estate, and litigation.</p>
								<div className="lp-cta-row"><div className="lp-cta">LEARN MORE</div></div>
							</div>
						</div>
					</div>
				</div>

				{/* PHASE 3 */}
				<div className="lp-phase lp-p3">
					<div className="lp-container">
						<div className="lp-label"><b>6 iterations</b> · generated in your brand voice</div>
						<div className="lp-headline">Pick the one that <em>feels right.</em></div>
						<div className="lp-grid">
							<div className="lp-iter lp-iter-1">
								<span className="lp-tag">v01</span>
								<div className="lp-h">Trial-ready counsel for <em>complex matters.</em></div>
								<div className="lp-btn">REQUEST CONSULT</div>
							</div>
							<div className="lp-iter lp-iter-2">
								<span className="lp-tag">v02</span>
								<div className="lp-h">Defensible strategy for <em>high-stakes outcomes.</em></div>
								<div className="lp-stat">25+</div>
								<div className="lp-lbl">years · 1,200 cases won</div>
							</div>
							<div className="lp-iter lp-iter-3">
								<span className="lp-tag">v03</span>
								<div className="lp-nav"><span className="lp-l">Meridian</span><span>EST. 1998</span></div>
								<div className="lp-meta">— TRUSTED COUNSEL —</div>
								<div className="lp-h">Precision <em>where it counts.</em></div>
								<div className="lp-btn">SCHEDULE</div>
							</div>
							<div className="lp-iter lp-iter-4">
								<span className="lp-tag">v04</span>
								<div className="lp-h">Built around <em>your case.</em></div>
								<div className="lp-grid-mini">
									<div className="lp-card"><div className="lp-nm">Corporate</div><div className="lp-sub">contracts</div></div>
									<div className="lp-card"><div className="lp-nm">Real Estate</div><div className="lp-sub">transactions</div></div>
									<div className="lp-card"><div className="lp-nm">Litigation</div><div className="lp-sub">trial-ready</div></div>
									<div className="lp-card"><div className="lp-nm">Advisory</div><div className="lp-sub">strategy</div></div>
								</div>
							</div>
							<div className="lp-iter lp-iter-5">
								<span className="lp-tag">v05</span>
								<div className="lp-h">Modern counsel for <em>founders &amp; firms.</em></div>
								<div className="lp-ctas">
									<span className="lp-b1">Book a call</span>
									<span className="lp-b2">Our work</span>
								</div>
							</div>
							<div className="lp-iter lp-iter-6">
								<span className="lp-tag">v06</span>
								<div className="lp-lbl-6">— Meridian / Law —</div>
								<div className="lp-h">When the case <br />matters most.</div>
								<div className="lp-nums">
									<div><b>1,200</b>cases</div>
									<div><b>98%</b>retention</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</VisualFrame>
	)
}
