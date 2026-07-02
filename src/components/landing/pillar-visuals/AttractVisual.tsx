"use client"

import { AnimationBox } from "./AnimationBox"

/* ── AttractVisual ──────────────────────────────────────────────────────
 * Payoff-weighted loop (spec 2026-07-02): ~2s URL-paste beat, then six
 * scored Holt CPA redesigns hold the frame with a border-glow sweep.
 * Each tile is a distinct wireframe layout so the six reads as six
 * different generated designs, not six copies. */
export function AttractVisual({ bare = false }: { bare?: boolean } = {}) {
	const content = (
		<>
			<style>{`
				.lp-stage {
					position: absolute; inset: 0;
					container-type: inline-size;
					color: var(--color-base-content);
					overflow: hidden;
					font-family: system-ui, sans-serif;
				}
				/* beat — URL paste, ≤20% of the 12s loop */
				.lp-beat {
					position: absolute; inset: 0;
					display: flex; flex-direction: column; align-items: center; justify-content: center;
					gap: 2.4cqw;
					animation: lpBeat 12s infinite;
				}
				.lp-title { font-family: var(--font-display, Georgia), Georgia, serif; font-size: 6cqw; }
				.lp-url {
					width: 56cqw; padding: 1.6cqw 2.6cqw; border-radius: 1.8cqw;
					border: 1px solid var(--color-primary);
					background: #fff; color: var(--color-primary);
					font-family: ui-monospace, monospace; font-size: 2.4cqw;
				}
				@keyframes lpBeat { 0%, 14% { opacity: 1; } 18%, 100% { opacity: 0; } }

				/* payoff — six scored redesigns, holds to end of loop */
				.lp-payoff {
					position: absolute; inset: 3cqw 3.4cqw;
					display: flex; flex-direction: column;
					opacity: 0;
					animation: lpPayoff 12s infinite;
				}
				@keyframes lpPayoff {
					0%, 15% { opacity: 0; transform: scale(.985); }
					18%, 98% { opacity: 1; transform: scale(1); }
					100% { opacity: 0; }
				}
				.lp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.8cqw; flex: 1; min-height: 0; }
				.lp-site {
					position: relative; background: #fff; border-radius: 1.8cqw;
					border: 1px solid #e5e0d6; padding: 1.6cqw;
					display: flex; flex-direction: column; gap: 0.9cqw;
				}
				.lp-site .hd { height: 1.1cqw; width: 55%; border-radius: 2px; background: #cfc9bd; }
				.lp-site .hero {
					flex: 1; border-radius: 0.9cqw;
					background: linear-gradient(135deg, rgba(40,75,115,.25), rgba(63,125,140,.12));
				}
				.lp-site .ln { height: 0.7cqw; border-radius: 2px; background: #e5e0d6; }
				.lp-site .ln.s { width: 70%; }
				/* variant building blocks — six distinct mini-homepage designs */
				.lp-site .row { display: flex; gap: 1cqw; flex: 1; min-height: 0; }
				.lp-site .col { display: flex; flex-direction: column; gap: 0.9cqw; flex: 1; min-width: 0; }
				.lp-site .nav { display: flex; align-items: center; justify-content: space-between; }
				.lp-site .brand { font-size: 1.2cqw; font-weight: 800; letter-spacing: .1em; color: var(--color-primary); }
				.lp-site .links { display: flex; gap: 0.8cqw; }
				.lp-site .nl { width: 3cqw; height: 0.6cqw; border-radius: 2px; background: #e5e0d6; }
				.lp-site .h1 {
					font-family: var(--font-display, Georgia), Georgia, serif;
					font-size: 2cqw; line-height: 1.25; color: var(--color-base-content);
				}
				.lp-site .h1.w { color: #fff; }
				.lp-site .h1.xl { font-size: 2.4cqw; padding-right: 6cqw; }
				.lp-site .h1.c { text-align: center; }
				.lp-site .heroSolid {
					flex: 1; border-radius: 0.9cqw; background: var(--color-primary);
					padding: 1.4cqw 1.6cqw; display: flex; flex-direction: column; justify-content: center; gap: 1cqw;
				}
				.lp-site .cta {
					font-size: 1.2cqw; font-weight: 700; white-space: nowrap;
					color: #fff; background: var(--color-primary);
					border-radius: 2cqw; padding: 0.5cqw 1.6cqw; align-self: flex-start;
				}
				.lp-site .cta.inv { color: var(--color-primary); background: #fff; }
				.lp-site .cta.c { align-self: center; }
				.lp-site .eyebrow {
					font-size: 1.1cqw; font-weight: 800; letter-spacing: .16em;
					text-transform: uppercase; color: var(--color-secondary); text-align: center;
				}
				.lp-site .cap { font-size: 1.2cqw; color: rgba(35,34,41,.55); }
				.lp-site .hero2 {
					flex: 1.1; border-radius: 0.9cqw;
					background: linear-gradient(160deg, rgba(63,125,140,.35), rgba(63,125,140,.1));
				}
				.lp-site .side {
					width: 26%; border-radius: 0.9cqw; background: var(--color-primary);
					padding: 1cqw 0.8cqw; display: flex; flex-direction: column; gap: 0.9cqw;
				}
				.lp-site .side .logo { width: 1.6cqw; height: 1.6cqw; border-radius: 50%; background: #fff; opacity: .9; }
				.lp-site .side .mi { height: 0.6cqw; border-radius: 2px; background: rgba(255,255,255,.5); }
				.lp-site .hero.strip { flex: 1; background: linear-gradient(90deg, rgba(40,75,115,.22), rgba(63,125,140,.1)); }
				.lp-site .cards { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 1cqw; min-height: 0; }
				.lp-site .cell {
					border-radius: 0.9cqw; background: rgba(40,75,115,.12);
					display: flex; align-items: center; justify-content: center;
					font-size: 1.3cqw; font-weight: 700; color: var(--color-primary);
				}
				.lp-site .cell.t { background: rgba(63,125,140,.18); color: var(--color-secondary); }
				.lp-site .score {
					position: absolute; top: 1cqw; right: 1cqw;
					font-size: 1.6cqw; font-weight: 700; color: #fff;
					background: var(--color-primary); border-radius: 2cqw; padding: 0.2cqw 1cqw;
				}
				/* micro-motion: soft border-glow sweeping tile to tile */
				.lp-site { animation: lpSweep 6s infinite; }
				.lp-site:nth-child(2) { animation-delay: 1s; }
				.lp-site:nth-child(3) { animation-delay: 2s; }
				.lp-site:nth-child(4) { animation-delay: 3s; }
				.lp-site:nth-child(5) { animation-delay: 4s; }
				.lp-site:nth-child(6) { animation-delay: 5s; }
				@keyframes lpSweep {
					0%, 100% { border-color: #e5e0d6; box-shadow: none; }
					8%, 16% { border-color: var(--color-secondary); box-shadow: 0 2px 10px rgba(63,125,140,.25); }
					26% { border-color: #e5e0d6; box-shadow: none; }
				}
				.lp-strip {
					display: flex; justify-content: space-between; align-items: center;
					margin-top: 1.8cqw; font-size: 2cqw; font-weight: 600;
					color: rgba(35,34,41,.55);
				}
				.lp-strip .r { color: var(--color-secondary); }

				@media (prefers-reduced-motion: reduce) {
					.lp-stage * { animation: none !important; }
					.lp-beat { opacity: 0; }
					.lp-payoff { opacity: 1; transform: none; }
				}
			`}</style>
			<div className="lp-stage" aria-hidden="true">
				<div className="lp-beat">
					<div className="lp-title">Redesign</div>
					<div className="lp-url">https://holtcpa.com▌</div>
				</div>
				<div className="lp-payoff">
					<div className="lp-grid">
						{/* 98 · bold navy hero */}
						<div className="lp-site">
							<span className="score">98</span>
							<div className="nav">
								<span className="brand">HOLT CPA</span>
								<span className="links"><span className="nl" /><span className="nl" /><span className="nl" /></span>
							</div>
							<div className="heroSolid">
								<div className="h1 w">Tax season, handled.</div>
								<span className="cta inv">Book a call</span>
							</div>
							<div className="ln s" />
						</div>
						{/* 96 · split copy + image */}
						<div className="lp-site">
							<span className="score">96</span>
							<div className="row">
								<div className="col">
									<div className="h1">Your books, balanced.</div>
									<div className="ln" />
									<div className="ln s" />
									<span className="cta">Get started</span>
								</div>
								<div className="hero2" />
							</div>
						</div>
						{/* 95 · sidebar app-style */}
						<div className="lp-site">
							<span className="score">95</span>
							<div className="row">
								<div className="side">
									<span className="logo" />
									<span className="mi" /><span className="mi" /><span className="mi" />
								</div>
								<div className="col">
									<div className="h1">CPA services, simplified.</div>
									<div className="hero" />
									<div className="ln s" />
								</div>
							</div>
						</div>
						{/* 94 · centered launch page */}
						<div className="lp-site">
							<span className="score">94</span>
							<div className="eyebrow">Holt CPA</div>
							<div className="h1 c">Numbers you can trust.</div>
							<span className="cta c">Free tax review</span>
							<div className="hero strip" />
						</div>
						{/* 93 · services grid */}
						<div className="lp-site">
							<span className="score">93</span>
							<div className="h1">Services</div>
							<div className="cards">
								<div className="cell">Tax</div>
								<div className="cell t">Books</div>
								<div className="cell t">Payroll</div>
								<div className="cell">Advice</div>
							</div>
						</div>
						{/* 91 · editorial */}
						<div className="lp-site">
							<span className="score">91</span>
							<div className="h1 xl">Less paperwork. More business.</div>
							<div className="cap">Holt CPA · Financial clarity for owners</div>
							<div className="hero" />
						</div>
					</div>
					<div className="lp-strip">
						<span>6 redesigns · conversion-first</span>
						<span className="r">rank-ready · cited by AI ✓</span>
					</div>
				</div>
			</div>
		</>
	)

	if (bare) return <div className="relative aspect-video w-full @container">{content}</div>
	return (
		<AnimationBox num="01" label="Attract">
			{content}
		</AnimationBox>
	)
}
