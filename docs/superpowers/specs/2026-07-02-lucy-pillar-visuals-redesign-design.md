# Lucy Pillar Visuals Redesign — Design Spec

**Date:** 2026-07-02
**Status:** Approved by Kyle (brainstorm session, visual companion mockups)
**Mockup references:** `.superpowers/brainstorm/1621-1782994326/content/treatments.html` (treatment options), `payoff-frames-v2.html` / `payoff-frames-v3.html` (approved frames + border)

## 1. Goal

Make the five pillar graphics on `/lucy` more attractive and better at marketing each pillar's capability. Today each visual is a dark, sparse, ambient loop — a visitor scrolling past often catches a near-empty frame, and the loops show *process* without resting on the *result*. After this change, each graphic reads as a believable Lucy product screen that spends most of its time showing the payoff.

## 2. Decisions (settled in brainstorm)

1. **Scope:** only the five pillar visuals rendered by `FeaturePillarsSection` on `/lucy` (`src/components/landing/pillar-visuals/*`). Hero, intro band, section copy, and page layout unchanged. The visuals render on `/lucy` only.
2. **Direction:** product screens (not concept art). Each card looks like a real screen of Lucy doing that pillar's job, with window chrome and realistic data.
3. **One-client thread:** a single fictional client — **Holt CPA** (`holtcpa.com`) — flows through all five frames. Its lead **Dana Reyes** is captured in 03 and won in 04.
4. **Treatment:** **payoff-weighted loop** (chosen over rich-static and stepped-walkthrough): a ~2s process beat, then the payoff frame holds ≥80% of the loop with micro-motion. CSS-only; no new libraries.
5. **Style:** the site's own light design language, not the current dark "matrix" look. Colors/typography must match the page (see §5). The dark `VisualFrame` treatment (near-black card, neon-teal glow, grid texture) is retired for these five visuals.
6. **Animation-box border:** each frame gets a 2px navy→slate-teal **gradient border** ("picture frame") plus a soft deep shadow, so the graphics pop off the cream page as deliberate animation boxes.
7. **Terminology:** corner branding is `LUCY · 0n <PILLAR>` (replaces `SYSTEM · 0n`); the Optimize center node is labeled **Lucy / orchestrator** (never "System"). Sub-agents are "experts" (Nancy, Sam, Fran, Otto), never "bots".

## 3. Shared frame anatomy (all five)

```
┌─ gradient border (2px, primary → secondary, radius 14–16px) ─┐
│ chrome bar: ● ● ●   LUCY · 0n <PILLAR> — holtcpa.com         │  bar: base-200, hairline base-300 divider
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ window body (#fdfcfa paper) — the payoff screen           │ │
│ │ white panels with base-300-ish hairline borders           │ │
│ └───────────────────────────────────────────────────────────┘ │
└──────────────────── shadow: 0 12px 34px rgba(35,34,41,.14) ──┘
```

- Aspect ratio ~16:9 (match current `VisualFrame` footprint so `FeaturePillarsSection`'s grid is untouched).
- **Density floor:** the payoff frame must fill the card — no state where most of the frame is empty.
- **Loop timing:** total 10–14s. Process beat ≤ ~2s (≤20%), payoff ≥80% with micro-motion. Payoff content must be legible the instant it appears (no slow fade-in of the whole frame).
- **Reduced motion:** under `prefers-reduced-motion: reduce`, still all loops and show the payoff frame as a rich static screen (beats skipped, sweeps/pulses off). This is currently unhandled in all five components.

## 4. The five payoff frames

Copy strings below are the approved working copy (from the v2/v3 mockups); minor wording polish during implementation is fine, story is not.

### 01 · Attract — `AttractVisual`
- **Beat:** URL bar types `holtcpa.com`, submits.
- **Payoff:** 3×2 grid of six redesigned site thumbnails (header/hero/text-line skeletons in navy/teal washes), each with a navy score badge (98, 96, 95, 94, 93, 91). Footer strip: left "6 redesigns · conversion-first", right (secondary color) "rank-ready · cited by AI ✓".
- **Micro-motion:** a border-glow highlight sweeps tile to tile (staggered, ~6s cycle).

### 02 · Engage — `EngageVisual`
- **Beat:** the "HOLT CPA BRAND VOICE" orb pulses and fans content outward.
- **Payoff:** orb at left; at right a published feed of four panels — "2026 S-Corp Tax Deadlines" (blog · ✓ published), "5 deductions owners miss" (linkedin · ✓ published), "Quarterly estimates, explained" (x thread · ✓ scheduled), "Meet the team behind your books" (instagram · ✓ scheduled). Serif titles.
- **Micro-motion:** newest item slides in each loop; orb keeps a gentle pulse.

### 03 · Capture — `CaptureVisual`
- **Beat:** the "Free Tax Review" form's navy submit button ("Request my review →") presses itself.
- **Payoff:** two panels — form at left; "INBOX · LIVE" at right with new lead **Dana Reyes — "Need help with S-corp filing" / ✓ auto-reply sent · 4s** (teal-washed card) above backlog rows "Mike Torres — bookkeeping · 2h", "Priya Shah — tax prep · 5h".
- **Micro-motion:** Dana's card slides in each loop; button pulse.

### 04 · Convert — `CloseVisual`
- **Beat:** Dana's chip glides in from the left.
- **Payoff:** pipeline of four stages with counts — New (8 leads), Contacted (5 leads), Qualified (3 leads), Won (2 closed) — over a primary→secondary gradient rail, then a deal-chip row.
- **Alignment requirement:** stage labels and deal chips share one `repeat(4, 1fr)` grid so every chip sits directly under its stage: Ava Lin · new / Mike Torres · contacted / Priya Shah · qualified / **Dana Reyes · won** (teal border + win glow).
- **Micro-motion:** Dana's Won chip glows on a ~6s cycle.

### 05 · Optimize — `OptimizeVisual`
- **Beat:** the Lucy orb pulses work outward to the experts.
- **Payoff:** center orb **"Lucy / ORCHESTRATOR"** (navy halo) with "11h saved this week ▲" beneath; flanking expert cards with work done — Nancy · Marketing "drafted 3 posts · updated 2 pages", Sam · Support "answered 14 client questions", Fran · Finance "monthly close: done · 2 flags", Otto · Onboarding "3 new clients set up".
- **Micro-motion:** expert cards tick (border highlight) in staggered rotation.

## 5. Style tokens

Use DaisyUI semantic tokens where a token exists; the page theme resolves to:

| Role | Token / value |
| --- | --- |
| Page background (context) | `base-100` `#f6f3ee` |
| Chrome bar | `base-200` `#ece8e1`, dots + divider `base-300` `#dcd6cc` |
| Window body ("paper") | `#fdfcfa` (literal — intentionally lighter than `base-100`) |
| Panels | white, hairline border `#e5e0d6` (≈`base-300`) |
| Text | `base-content` `#232229`; muted = `base-content/50–55` |
| Primary accent (buttons, score badges, branding `b`, Lucy halo) | `primary` `#284b73` |
| Success/live accent (ticks, tags, highlight sweeps, win glow) | `secondary` `#3f7d8c` |
| Gradient border + pipeline rail | `linear-gradient(135deg, primary, secondary)` |
| Serif titles inside frames (post titles, "Lucy") | `font-display` (Source Serif 4) |

The neon `#00d3bb` / `#7fffe9` teal and `#0a0a0c` black do **not** appear in these five components after this change. If the shared `VisualFrame` is kept as a shell, it needs a light variant (or is replaced by a new light frame component); no other `VisualFrame` consumers exist besides the five visuals and the orphaned `LucyShowcase`/`LucyAnimation`, which are untouched.

## 6. Out of scope

- Hero card, intro band, section copy, `FeaturePillarsSection` layout, `src/data/landing.ts` copy.
- The orphaned `LucyShowcase` / `LucyAnimation` / `LucyExperts` components and `stages.ts` (left as-is).
- Homepage (`SystemTeaser`) — pillar visuals do not render there.
- i18n of in-frame strings (existing visuals hardcode English; keep that convention).

## 7. Success criteria

1. `npm run build` and `npx tsc --noEmit` pass; `npm test` stays green.
2. Screenshot any random moment of each loop: ≥80% of captures land on the dense payoff frame (no empty-frame catches).
3. All five frames show window chrome, `LUCY · 0n` branding, `holtcpa.com` context, and the gradient animation-box border.
4. Convert: each deal chip is horizontally aligned under its stage column at desktop and mobile widths.
5. With `prefers-reduced-motion: reduce`: no motion, payoff frame fully visible and dense.
6. No `#00d3bb`/`#0a0a0c` styling remains in `pillar-visuals/*`; colors match the live page palette.
7. Visual QA on `/en/lucy` at 1440px and 390px widths: frames legible, no overflow/clipping.
