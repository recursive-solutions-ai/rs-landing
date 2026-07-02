# Lucy Pillar Visuals Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the five pillar visuals on `/lucy` as payoff-weighted product screens in the site's light design language, per the approved spec.

**Architecture:** A new light `AnimationBox` shell (gradient border + chrome bar + paper body) replaces the dark `VisualFrame` for these five visuals. Each visual component is rewritten in place — same file, same export name/signature — as a CSS-only loop: ≤2s process beat, then a dense payoff frame holding ≥80% of the loop with micro-motion. One fictional client (Holt CPA) threads through all five.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind 4 + DaisyUI 5 theme vars · CSS keyframes in per-component `<style>` blocks (existing pattern) · npm.

Spec: [docs/superpowers/specs/2026-07-02-lucy-pillar-visuals-redesign-design.md](../specs/2026-07-02-lucy-pillar-visuals-redesign-design.md).

## Global Constraints

- **Package manager:** **npm** (`package-lock.json`; no bun lockfile). `npm run build`, `npx tsc --noEmit`, `npm test`. **`npm run lint` is BROKEN project-wide — do NOT run it.**
- **Verification gates:** `npx tsc --noEmit` (clean — vitest is installed since 2026-07-02), `npm run build` (authoritative), `npm test` (12 tests, must stay green — this plan adds none).
- **Do NOT run `npm install`** — no dependency changes; installs are permission-blocked in this environment anyway.
- **Dev server:** may already be running at `http://localhost:3100` (background task). If not: `npm run dev -- -p 3100` (the Brain app tends to hold `:3000`). Visual checks target `http://localhost:3100/en/lucy`.
- **Colors:** DaisyUI theme vars — `var(--color-primary)` `#284b73` navy, `var(--color-secondary)` `#3f7d8c` slate-teal, `var(--color-base-200)` `#ece8e1`, `var(--color-base-300)` `#dcd6cc`, `var(--color-base-content)` `#232229`. Allowed literals ONLY: paper `#fdfcfa`, panel hairline `#e5e0d6`, muted ink `rgba(35,34,41,.55)` (and lighter variants), white `#fff`. **The neon `#00d3bb`/`#7fffe9` and black `#0a0a0c` must NOT appear in any rewritten file.**
- **Copy rules:** chrome label is `LUCY · 0n <PILLAR>` — pillar names exactly **Attract, Engage, Capture, Convert, Optimize**. The Optimize orb says **Lucy / orchestrator** (never "System"). Experts are Nancy · Marketing, Sam · Support, Fran · Finance, Otto · Onboarding (never "bots"). Client thread: `holtcpa.com`; lead **Dana Reyes** appears in 03 (captured) and 04 (won).
- **Loop timing:** each visual's master loop is 10–14s; process beat ≤20% of it; payoff visible ≥80%. Micro-motions may run on their own shorter cycles.
- **Reduced motion:** every component's `<style>` ends with a `@media (prefers-reduced-motion: reduce)` block that kills all animations, hides the beat layer, and forces the payoff layer fully visible.
- **Signatures frozen:** `AttractVisual({ bare = false }: { bare?: boolean } = {})` keeps its `bare` prop (the orphaned `LucyShowcase` passes it and must still compile). The other four visuals stay zero-prop. Export names unchanged. `FeaturePillarsSection` is NOT modified.
- **Leave alone:** `VisualFrame.tsx` and `LeadCaptureVisual.tsx` become orphaned by this plan — do not delete or edit them. `LucyShowcase`/`LucyAnimation`/`LucyExperts`, `stages.ts`, page/section copy: untouched.
- **Commits:** local only, on `main`, one per task (repo convention — never push).

---

### Task 1: `AnimationBox` shell

**Files:**
- Create: `src/components/landing/pillar-visuals/AnimationBox.tsx`

**Interfaces:**
- Produces: `AnimationBox({ num, label, children }: { num: string; label: string; children: ReactNode })` — light product-window shell. Tasks 2–6 wrap their stage in it.
- Consumes: nothing.

- [ ] **Step 1: Write the component**

```tsx
// src/components/landing/pillar-visuals/AnimationBox.tsx
"use client"

import type { ReactNode } from "react"

interface AnimationBoxProps {
	/** Two-digit pillar number for the chrome label, e.g. "01". */
	num: string
	/** Pillar name for the chrome label, e.g. "Attract". */
	label: string
	children: ReactNode
}

/* ── AnimationBox ───────────────────────────────────────────────────────
 * Light "product window" shell for the five pillar visuals: navy→teal
 * gradient picture-frame border, cream chrome bar with LUCY · 0n branding,
 * paper body. Replaces the dark VisualFrame treatment for these visuals
 * (spec 2026-07-02). */
export function AnimationBox({ num, label, children }: AnimationBoxProps) {
	return (
		<div
			className="relative isolate flex aspect-video w-full flex-col overflow-hidden rounded-2xl border-2 border-transparent shadow-[0_12px_34px_rgba(35,34,41,0.14)]"
			style={{
				background:
					"linear-gradient(#fdfcfa,#fdfcfa) padding-box, linear-gradient(135deg, var(--color-primary), var(--color-secondary)) border-box",
			}}
		>
			<div className="flex shrink-0 items-center gap-1.5 border-b border-base-300 bg-base-200 px-3 py-2">
				<span className="h-2 w-2 rounded-full bg-base-300" aria-hidden="true" />
				<span className="h-2 w-2 rounded-full bg-base-300" aria-hidden="true" />
				<span className="h-2 w-2 rounded-full bg-base-300" aria-hidden="true" />
				<span className="ml-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-base-content/50">
					Lucy <b className="font-bold text-primary">· {num} {label}</b> — holtcpa.com
				</span>
			</div>
			<div className="relative min-h-0 flex-1">{children}</div>
		</div>
	)
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean (component not yet consumed; this catches syntax/prop errors).

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/pillar-visuals/AnimationBox.tsx
git commit -m "feat(lucy): add light AnimationBox shell for pillar visuals"
```

---

### Task 2: `AttractVisual` — six scored redesigns

**Files:**
- Modify (full rewrite): `src/components/landing/pillar-visuals/AttractVisual.tsx`

**Interfaces:**
- Consumes: `AnimationBox` (Task 1).
- Produces: `AttractVisual({ bare = false }: { bare?: boolean } = {})` — signature identical to current (LucyShowcase compatibility).

- [ ] **Step 1: Replace the entire file**

```tsx
// src/components/landing/pillar-visuals/AttractVisual.tsx
"use client"

import { AnimationBox } from "./AnimationBox"

const SCORES = ["98", "96", "95", "94", "93", "91"]

/* ── AttractVisual ──────────────────────────────────────────────────────
 * Payoff-weighted loop (spec 2026-07-02): ~2s URL-paste beat, then six
 * scored Holt CPA redesigns hold the frame with a border-glow sweep. */
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
					19%, 98% { opacity: 1; transform: scale(1); }
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
					.lp-stage *, .lp-beat, .lp-payoff { animation: none !important; }
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
						{SCORES.map((s) => (
							<div className="lp-site" key={s}>
								<span className="score">{s}</span>
								<div className="hd" />
								<div className="hero" />
								<div className="ln" />
								<div className="ln s" />
							</div>
						))}
					</div>
					<div className="lp-strip">
						<span>6 redesigns · conversion-first</span>
						<span className="r">rank-ready · cited by AI ✓</span>
					</div>
				</div>
			</div>
		</>
	)

	if (bare) return <div className="relative aspect-video w-full">{content}</div>
	return (
		<AnimationBox num="01" label="Attract">
			{content}
		</AnimationBox>
	)
}
```

- [ ] **Step 2: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: both clean (LucyShowcase still compiles against the `bare` prop).

- [ ] **Step 3: Visual check**

With the dev server on `:3100`, load `http://localhost:3100/en/lucy`, scroll to pillar 01. Expected: light paper window with gradient border and `LUCY · 01 ATTRACT — HOLTCPA.COM` chrome; URL beat flashes ~2s; six scored tiles hold the rest of the loop with a teal sweep; no neon/black.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/pillar-visuals/AttractVisual.tsx
git commit -m "feat(lucy): rebuild Attract visual as payoff-weighted product screen"
```

---

### Task 3: `EngageVisual` — brand voice → published feed

**Files:**
- Modify (full rewrite): `src/components/landing/pillar-visuals/EngageVisual.tsx`

**Interfaces:**
- Consumes: `AnimationBox` (Task 1).
- Produces: `EngageVisual()` — zero-prop, unchanged export name.

- [ ] **Step 1: Replace the entire file**

```tsx
// src/components/landing/pillar-visuals/EngageVisual.tsx
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
					display: grid; grid-template-columns: 24cqw 1fr;
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
					padding: 1.5cqw 2.2cqw; font-size: 2.3cqw;
				}
				.en-post .t { font-family: var(--font-display, Georgia), Georgia, serif; }
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
```

- [ ] **Step 2: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: clean.

- [ ] **Step 3: Visual check**

Pillar 02 on `/en/lucy`: orb pulses continuously; the four feed rows fan in within ~1.5s then hold ~10s; serif post titles; teal tags/ticks.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/pillar-visuals/EngageVisual.tsx
git commit -m "feat(lucy): rebuild Engage visual as published-feed product screen"
```

---

### Task 4: `CaptureVisual` — form submit → live inbox

**Files:**
- Modify (full rewrite): `src/components/landing/pillar-visuals/CaptureVisual.tsx`

**Interfaces:**
- Consumes: `AnimationBox` (Task 1).
- Produces: `CaptureVisual()` — zero-prop, unchanged export name.

- [ ] **Step 1: Replace the entire file**

```tsx
// src/components/landing/pillar-visuals/CaptureVisual.tsx
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
						<span className="nm">Dana Reyes</span> — “Need help with S-corp filing”
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
```

- [ ] **Step 2: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: clean.

- [ ] **Step 3: Visual check**

Pillar 03 on `/en/lucy`: navy submit button pulses at loop start; Dana's teal-washed card slides in immediately after and holds; backlog rows static beneath.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/pillar-visuals/CaptureVisual.tsx
git commit -m "feat(lucy): rebuild Capture visual as form-to-inbox product screen"
```

---

### Task 5: `CloseVisual` — aligned pipeline (real component)

`CloseVisual.tsx` is currently just `export { LeadCaptureVisual as CloseVisual } from "./LeadCaptureVisual"`. Replace the re-export with a real component; `LeadCaptureVisual.tsx` becomes orphaned — leave that file untouched.

**Files:**
- Modify (full rewrite): `src/components/landing/pillar-visuals/CloseVisual.tsx`

**Interfaces:**
- Consumes: `AnimationBox` (Task 1).
- Produces: `CloseVisual()` — zero-prop; `FeaturePillarsSection`'s `import { CloseVisual } from "./pillar-visuals/CloseVisual"` keeps working.

- [ ] **Step 1: Replace the entire file**

```tsx
// src/components/landing/pillar-visuals/CloseVisual.tsx
"use client"

import { AnimationBox } from "./AnimationBox"

const STAGES = [
	{ nm: "New", ct: "8 leads" },
	{ nm: "Contacted", ct: "5 leads" },
	{ nm: "Qualified", ct: "3 leads" },
	{ nm: "Won", ct: "2 closed" },
]

/* ── CloseVisual (pillar 04 · Convert) ─────────────────────────────────
 * Beat: Dana's chip glides in to the Won column.
 * Payoff: the staffed pipeline holds — stage labels and deal chips share
 * one 4-column grid so every deal sits directly under its stage. */
export function CloseVisual() {
	return (
		<AnimationBox num="04" label="Convert">
			<style>{`
				.cv-stage {
					position: absolute; inset: 0;
					container-type: inline-size;
					color: var(--color-base-content);
					overflow: hidden; font-family: system-ui, sans-serif;
					display: flex; flex-direction: column; justify-content: center;
					padding: 3cqw 3.4cqw; gap: 2.2cqw;
				}
				.cv-cols, .cv-chips { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.8cqw; }
				.cv-col { text-align: center; }
				.cv-col .nm { font-size: 2.3cqw; font-weight: 700; }
				.cv-col .ct { font-size: 1.9cqw; color: rgba(35,34,41,.5); }
				.cv-rail {
					height: .9cqw; border-radius: .5cqw; margin: 0 1cqw;
					background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
				}
				.cv-cell { display: flex; justify-content: center; }
				.cv-chip {
					font-size: 1.9cqw; font-weight: 600; white-space: nowrap;
					background: #fff; border: 1px solid var(--color-base-300);
					border-radius: 4cqw; padding: 1cqw 2cqw;
				}
				.cv-chip small { color: rgba(35,34,41,.5); font-weight: 400; font-size: 1.7cqw; }
				.cv-chip.win {
					border-color: var(--color-secondary);
					opacity: 0;
					animation: cvGlide 12s infinite;
				}
				/* beat: glide in from the left, then hold with a win glow */
				@keyframes cvGlide {
					0% { opacity: 0; transform: translateX(-24cqw); }
					8%, 98% { opacity: 1; transform: none; }
					38%, 52% { background: rgba(63,125,140,.1); box-shadow: 0 2px 10px rgba(63,125,140,.3); }
					60% { background: #fff; box-shadow: none; }
					100% { opacity: 0; }
				}
				@media (prefers-reduced-motion: reduce) {
					.cv-stage * { animation: none !important; }
					.cv-chip.win { opacity: 1; transform: none; }
				}
			`}</style>
			<div className="cv-stage" aria-hidden="true">
				<div className="cv-cols">
					{STAGES.map((s) => (
						<div className="cv-col" key={s.nm}>
							<div className="nm">{s.nm}</div>
							<div className="ct">{s.ct}</div>
						</div>
					))}
				</div>
				<div className="cv-rail" />
				<div className="cv-chips">
					<div className="cv-cell"><div className="cv-chip">Ava Lin <small>· new</small></div></div>
					<div className="cv-cell"><div className="cv-chip">Mike Torres <small>· contacted</small></div></div>
					<div className="cv-cell"><div className="cv-chip">Priya Shah <small>· qualified</small></div></div>
					<div className="cv-cell"><div className="cv-chip win">Dana Reyes <small>· won</small></div></div>
				</div>
			</div>
		</AnimationBox>
	)
}
```

- [ ] **Step 2: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: clean. (`LeadCaptureVisual.tsx` is now imported by nothing — that is expected and fine.)

- [ ] **Step 3: Visual check**

Pillar 04 on `/en/lucy`: four stage labels with counts over the gradient rail; each chip **directly under its stage column** (Ava/New, Mike/Contacted, Priya/Qualified, Dana/Won); Dana glides in then glows. Check 390px width too — chips must not overflow their columns (shrink `font-size`/padding slightly if they do).

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/pillar-visuals/CloseVisual.tsx
git commit -m "feat(lucy): rebuild Convert visual with stage-aligned pipeline"
```

---

### Task 6: `OptimizeVisual` — Lucy orchestrating the experts

**Files:**
- Modify (full rewrite): `src/components/landing/pillar-visuals/OptimizeVisual.tsx`

**Interfaces:**
- Consumes: `AnimationBox` (Task 1).
- Produces: `OptimizeVisual()` — zero-prop, unchanged export name.

- [ ] **Step 1: Replace the entire file**

```tsx
// src/components/landing/pillar-visuals/OptimizeVisual.tsx
"use client"

import { AnimationBox } from "./AnimationBox"

const LEFT = [
	{ nm: "Nancy · Marketing", task: "drafted 3 posts · updated 2 pages" },
	{ nm: "Sam · Support", task: "answered 14 client questions" },
]
const RIGHT = [
	{ nm: "Fran · Finance", task: "monthly close: done · 2 flags" },
	{ nm: "Otto · Onboarding", task: "3 new clients set up" },
]

/* ── OptimizeVisual ─────────────────────────────────────────────────────
 * Beat: Lucy's orb pulses work outward. Payoff: each expert card shows
 * work done for Holt CPA plus the hours-saved counter. The orb says
 * Lucy — never "System" (spec 2026-07-02). */
export function OptimizeVisual() {
	return (
		<AnimationBox num="05" label="Optimize">
			<style>{`
				.op-stage {
					position: absolute; inset: 0;
					container-type: inline-size;
					color: var(--color-base-content);
					overflow: hidden; font-family: system-ui, sans-serif;
					display: grid; grid-template-columns: 1fr 26cqw 1fr;
					gap: 2.2cqw; align-items: center; padding: 3cqw 3.4cqw;
				}
				.op-lucy {
					width: 19cqw; height: 19cqw; border-radius: 50%; margin: 0 auto;
					display: flex; flex-direction: column; align-items: center; justify-content: center;
					background: radial-gradient(circle, rgba(40,75,115,.18), rgba(63,125,140,.07) 75%);
					border: 1px solid rgba(40,75,115,.3);
					animation: opPulse 3.4s ease-in-out infinite;
				}
				@keyframes opPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
				.op-lucy .n { font-family: var(--font-display, Georgia), Georgia, serif; font-size: 3.4cqw; }
				.op-lucy .r {
					font-size: 1.5cqw; letter-spacing: .18em; text-transform: uppercase;
					color: var(--color-secondary); font-weight: 700;
				}
				.op-saved {
					text-align: center; margin-top: 1.2cqw;
					font-size: 2cqw; font-weight: 700; color: var(--color-primary);
				}
				.op-exps { display: flex; flex-direction: column; gap: 1.6cqw; }
				.op-exp {
					background: #fff; border: 1px solid #e5e0d6; border-radius: 2cqw;
					padding: 1.5cqw 2cqw;
					animation: opTick 8s infinite;
				}
				.op-exp:nth-child(2) { animation-delay: 2.6s; }
				.op-exps.r .op-exp { animation-delay: 1.3s; }
				.op-exps.r .op-exp:nth-child(2) { animation-delay: 3.9s; }
				@keyframes opTick {
					0%, 100% { border-color: #e5e0d6; box-shadow: none; }
					6%, 16% { border-color: var(--color-secondary); box-shadow: 0 2px 10px rgba(63,125,140,.2); }
					24% { border-color: #e5e0d6; box-shadow: none; }
				}
				.op-exp .nm { font-size: 2.1cqw; font-weight: 700; }
				.op-exp .task { font-size: 1.8cqw; color: rgba(35,34,41,.55); }
				@media (prefers-reduced-motion: reduce) {
					.op-stage * { animation: none !important; }
				}
			`}</style>
			<div className="op-stage" aria-hidden="true">
				<div className="op-exps">
					{LEFT.map((e) => (
						<div className="op-exp" key={e.nm}>
							<div className="nm">{e.nm}</div>
							<div className="task">{e.task}</div>
						</div>
					))}
				</div>
				<div>
					<div className="op-lucy">
						<span className="n">Lucy</span>
						<span className="r">orchestrator</span>
					</div>
					<div className="op-saved">11h saved this week ▲</div>
				</div>
				<div className="op-exps r">
					{RIGHT.map((e) => (
						<div className="op-exp" key={e.nm}>
							<div className="nm">{e.nm}</div>
							<div className="task">{e.task}</div>
						</div>
					))}
				</div>
			</div>
		</AnimationBox>
	)
}
```

- [ ] **Step 2: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: clean.

- [ ] **Step 3: Visual check**

Pillar 05 on `/en/lucy`: navy-halo orb reads **Lucy / ORCHESTRATOR** with "11h saved this week ▲" beneath; four expert cards tick in staggered rotation with work summaries.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/pillar-visuals/OptimizeVisual.tsx
git commit -m "feat(lucy): rebuild Optimize visual as Lucy-orchestrator screen"
```

---

### Task 7: Final verification vs. spec success criteria

**Files:**
- Verify only; touch files only to fix issues found.

- [ ] **Step 1: Static gates**

Run: `npx tsc --noEmit && npm run build && npm test`
Expected: all clean; 12 tests pass.

- [ ] **Step 2: No-dark-tokens check**

Run: `grep -rn "00d3bb\|0a0a0c\|7fffe9" src/components/landing/pillar-visuals/AttractVisual.tsx src/components/landing/pillar-visuals/EngageVisual.tsx src/components/landing/pillar-visuals/CaptureVisual.tsx src/components/landing/pillar-visuals/CloseVisual.tsx src/components/landing/pillar-visuals/OptimizeVisual.tsx src/components/landing/pillar-visuals/AnimationBox.tsx`
Expected: no matches. (`VisualFrame.tsx` and `LeadCaptureVisual.tsx` may still contain them — they are orphaned, out of scope.)

- [ ] **Step 3: Payoff-density spot check (Playwright)**

Navigate to `http://localhost:3100/en/lucy` at 1440×900, scroll through all five pillars to trigger reveals, then screenshot each pillar twice ~5s apart. Expected: ≥8 of the 10 captures show the dense payoff frame (per spec criterion 2); every frame shows chrome + gradient border + `LUCY · 0n` label.

- [ ] **Step 4: Mobile width check (Playwright)**

Resize to 390×844, reload, screenshot each pillar. Expected: no horizontal overflow or clipped chips/panels; Convert chips still aligned under their columns.

- [ ] **Step 5: Reduced-motion check (manual)**

In Chromium devtools → Rendering → `prefers-reduced-motion: reduce`, reload `/en/lucy`. Expected: no motion; each frame shows its full payoff (six tiles, feed, Dana card, aligned chips, expert cards) — nothing blank.

- [ ] **Step 6: Final commit (only if fixes were made)**

```bash
git add -A
git commit -m "fix(lucy): pillar visual verification fixes"
```

---

## Self-Review

**Spec coverage:** §2.2 product screens + §3 frame anatomy → Task 1 (AnimationBox) used by Tasks 2–6. §2.3 one-client thread → holtcpa.com in chrome (Task 1), Dana in Tasks 4–5, Holt content in Tasks 2–3, experts in Task 6. §2.4 payoff-weighted timing → beat/payoff keyframes in every visual (12s/10s loops, beat ≤20%). §2.5+§5 light palette/no dark tokens → theme vars throughout + Task 7 step 2 grep. §2.6 gradient border → Task 1. §2.7 terminology → chrome labels `LUCY · 0n`, Lucy orb (Task 6). §4 frame content → verbatim copy in Tasks 2–6. §3 reduced motion → per-component media blocks + Task 7 step 5. Convert alignment → shared `repeat(4,1fr)` grids (Task 5) + Task 7 step 4. §7 success criteria → Task 7 maps 1:1. No gaps found.

**Placeholder scan:** every code step shows the complete file; commands have expected outputs; no TBD/TODO. ✔

**Type consistency:** `AnimationBox({ num, label, children })` (Task 1) matches every call site (`num="01"…"05"`, `label="Attract"…"Optimize"`); `AttractVisual` keeps `{ bare?: boolean }` and `LucyShowcase`'s `<AttractVisual bare />` still compiles; zero-prop signatures for the other four match `FeaturePillarsSection`'s usage (`<EngageVisual />` etc., unchanged). ✔
