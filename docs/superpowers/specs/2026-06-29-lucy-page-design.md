# Lucy Page — Design Spec

**Date:** 2026-06-29
**Status:** Design approved (flow + tabbed showcase + marketing direction). Ready for spec review → implementation plan. Not started.
**Scope:** A dedicated `/lucy` deep-dive page reached from the Offerings "Lucy" card. Goes deep on Lucy (what she is, how she works, the experts she orchestrates), reusing the orphaned `LucyAnimation` as an interactive product showcase. **Design language borrowed from [granola.ai](https://www.granola.ai/):** clean, light, whitespace-heavy, product-demo-driven, with a before/during/after–style tabbed interaction. **Also consolidates the "system" story onto this page:** the homepage's full five-pillar section is removed and replaced with a slim teaser that routes to `/lucy` (see §12).

Builds on `2026-06-29-rs-landing-reposition-design.md` (the reposition that demoted Lucy to one offering). This page is Lucy's home now that she's off the hero.

---

## 1. Goal

Give Lucy a single, polished, conversion-focused page that:

- **Explains** what Lucy is in plain terms (the unified platform RS runs for you).
- **Demonstrates** her working — reusing the existing `LucyAnimation` (currently built but rendered nowhere) as a framed, **interactive** product screen.
- **Converts** high-intent visitors to **Get Early Access** (the early-access CTA, per the reposition, lives with Lucy).

Tone: **professional, premium, cohesive.** No theme break, nothing that reads as careless. The dark product screen must feel deliberate — "a look inside Lucy" — not a jarring dark page bolted onto a warm site.

## 2. Design language (from Granola)

| Granola signature | How we apply it to Lucy |
|---|---|
| Light, off-white, generous whitespace | Keep the site's warm-greige `rs` theme (`base-100`/`base-200`). Lots of air. |
| Product **screenshot as proof** | `LucyAnimation` becomes Lucy's "screenshot" — a framed product screen, not decoration. |
| **before/during/after tabbed** interaction | Convert the 4 auto-cycling scenes into a **clickable tabbed walkthrough** (the "expand for detail" the user asked for). |
| Alternating text/visual feature rows | Reuse the existing pillar row pattern (text + visual) for the "five moves." |
| Hairline-rule section separators | Use `divide-*` / thin rules between sections (already a repo convention). |
| Three-benefit icon row | A compact "what Lucy is" value row. |
| Restrained, action-led CTAs | Single primary CTA: **Get Early Access**. |

**Type stays on-brand:** site's **serif headlines (`font-display`/`font-heading`) + DM Sans body** — we borrow Granola's *layout and whitespace*, not its sans fonts.

## 3. Cohesion strategy — the one real risk, mitigated

A near-black animation dropped onto a cream page is the failure mode. The fix is a deliberate **color journey**, not a hard cut:

1. **Warm page** (`base-100`/`base-200`) for hero, what-is, experts, five-moves, process.
2. The showcase lives in a **deep-ink band** using the site's existing `neutral` token (`#232229`) — the *same ink* as the homepage contact band. So the dark is introduced by an **on-brand** section, not a random panel.
3. Inside that ink band, `LucyAnimation`'s near-black (`#0a0b14`) sits in a **device/app-window frame**: rounded chrome, a subtle top bar, soft shadow, warm-tinted hairline border. Captioned above ("A look inside Lucy") and below (active stage caption).
4. The animation's **teal/indigo accents** are echoed *sparingly* on that ink band only (active tab indicator, a label) so the dark section reads as one intentional unit.

Net journey: **cream → on-brand ink → product screen.** Premium, not disconnected.

## 4. Page flow (top → bottom)

| # | Section | Job | Build |
|---|---|---|---|
| — | **Nav / Footer** | Site-consistent. **Not** adding Lucy to top nav (reached from the card). | reuse `Header`/`Footer` |
| 1 | **Lucy hero** | Warm. Eyebrow "The platform · Lucy", serif H1, one-line subhead, primary **Get Early Access**, quiet secondary **← Back to overview**. Optional small static preview of the screen at right. | new `LucyHero` |
| 2 | **What Lucy is** | 2–3 sentence positioning + **three icon value-bullets** (Granola benefit row). | new `LucyIntro` |
| 3 | **See Lucy work** *(centerpiece)* | Ink band + framed product screen. **Tabbed walkthrough** over the 4 stages with captions. The interactive "expand for detail." | new `LucyShowcase` wrapping a refactored `LucyAnimation` |
| 4 | **The experts** | Lucy orchestrates a team: **Nancy** (marketing), **Sam** (support), **Fran** (finance), **Otto** (onboarding) — one line each. Light cards. | new `LucyExperts` |
| 5 | **The system, in five moves** | Attract · Engage · Capture · Convert · Optimize. **Reuse the full `FeaturePillarsSection`** — it leaves the homepage (§12), so the rich version lives here with no redundancy. | reuse `FeaturePillarsSection` (moved off homepage) |
| 6 | **Run with you** | Lucy is run *for* you — Discover · Design · Execute · Optimize. | reuse `processSteps` (condensed) |
| 7 | **Early-access CTA** | Deep-ink conversion band. "Get early access to Lucy." Embedded form. | reuse `ContactCTASection` (parametrized — see §7) |

## 5. Copy direction (working text — refine in build)

- **Eyebrow:** The platform · Lucy
- **Hero H1 (recommended):** *Meet Lucy — the system that runs your growth.*
  - alts: *Lucy runs the busywork. You run the business.* / *One system. Every part of your growth, handled.*
- **Hero subhead:** Your website, content, SEO, lead capture, CRM, and analytics — one vertical system, run for you by a hands-on team.
- **What Lucy is:** Lucy is the unified platform behind Recursive Solutions. Instead of a dozen disconnected tools, one system attracts, engages, captures, and converts — and we run and improve it with you.
  - 3 value bullets: **One system, not a stack** · **Run for you, not by you** · **Improves every week**
- **Showcase intro:** A look inside Lucy. *(tabs:)* `02 Content Engine` · `03 Lead Capture` · `04 Pipeline` · `05 Custom Experts`
  - captions (one line each, reuse the scene's existing meaning):
    - Content Engine — *One brand voice, fanned out to blog, social, and SEO automatically.*
    - Lead Capture — *Forms feed your inbox; an auto-reply fires in seconds.*
    - Pipeline — *Every lead moves new → contacted → qualified → won, tracked.*
    - Custom Experts — *Lucy hands work to named experts trained on your business.*
- **Experts intro:** Lucy doesn't work alone. She directs a team of experts trained on your business.
  - Nancy — *Marketing. Writes and schedules content in your voice.*
  - Sam — *Support. Answers customers around the clock.*
  - Fran — *Finance. Keeps the numbers and reports current.*
  - Otto — *Onboarding. Gets new clients moving without the back-and-forth.*
- **Five moves heading:** Everything that grows your business — in one system.
- **CTA heading:** Get early access to Lucy.
- **CTA sub:** Tell us about your business; we'll show you what Lucy would run first.
- **`<title>` / meta:** Lucy — the unified growth platform | Recursive Solutions. Description leads with the one-system promise. (Dedicated page = strong SEO/GEO surface, per reposition pillar 01.)

## 6. The showcase — interaction & accessibility (the key new build)

- **`LucyAnimation` gets a controlled mode.** Add a `mode` prop:
  - `"auto"` — current ambient auto-cycling behavior (unchanged; preserves the existing component for any future use).
  - `"tabbed"` with an `active` stage index from the parent — the scene-cycling keyframes are **disabled**; only the selected stage renders at full opacity. Per-scene internal micro-animations still play.
- **`LucyShowcase`** (parent, client): renders the device frame, the four tab controls, the active caption, and `<LucyAnimation mode="tabbed" active={n} />`. Tabs are real buttons, keyboard-navigable, `aria-selected`, with a `role="tablist"`/`tab`/`tabpanel` structure. Active tab uses the teal accent.
- **Reduced motion** (`prefers-reduced-motion` / `useReducedMotion`): pause/disable the within-scene animations and show each stage as a representative **static frame**; tabs still switch stages. The page must be fully understandable with zero motion.
- **Optional nicety (defer):** auto-advance tabs on a timer until the user interacts, then stop. Not required for v1.

## 7. Reuse & surgical changes

**Reuse as-is:** `Header`, `Footer`, `ProcessSection` data (`processSteps`), **`FeaturePillarsSection`** (relocated from homepage → Lucy page), `pillar-visuals/*`, `LucyAnimation` scene markup, `ButtonLink`, `SectionHeading`, `useInView`, reveal classes.

**Surgical edits:**
- `data/landing.ts` → `services[0]` ("Lucy — the unified platform"): `href` `#contact` → `/lucy` (locale-prefixed in the card). **Card CTA label** becomes **"Explore Lucy →"**; the **"Get Early Access"** CTA moves onto the `/lucy` page. *(This shifts where early-access lives vs. the reposition spec, which put it on the card — flag for Kyle; it's a deliberate, on-strategy move now that Lucy has a page.)*
- `LucyAnimation.tsx` → add the `mode`/`active` controlled behavior (§6). Default `"auto"` keeps it backward-compatible.
- `ContactCTASection.tsx` → add **optional props** (`heading?`, `subtitle?`, `intro?`, `submitLabel?`) defaulting to current hardcoded copy, so `/lucy` can reuse it with Lucy-specific copy + **Get Early Access** label. Small, backward-compatible. *(Alt if we want to avoid touching the shared component: a lighter ink CTA band that links to `/contact`. Recommendation: parametrize + embed the form — fewer clicks, better conversion for a high-intent page.)*

**New files:**
- `src/app/[locale]/lucy/page.tsx` (server component; `params: { locale }`; metadata; server-fetch the form via `getForm` like the homepage; assemble sections).
- `src/components/lucy/LucyHero.tsx`, `LucyIntro.tsx`, `LucyShowcase.tsx`, `LucyExperts.tsx` (client where interactive/animated). *(No `LucyPillars` — we reuse the full `FeaturePillarsSection` instead.)*
- `src/components/landing/SystemTeaser.tsx` — the slim homepage band that replaces the pillar section (§12).
- Experts data: add a small `lucyExperts` array to `data/landing.ts` (name, role, one-liner, initial) — mirrors the scene-4 agents (Nancy/Sam/Fran/Otto) so the showcase and the section agree.

## 8. Terminology (keep consistent)

- **Lucy** — the platform (capital L, singular). Not "the AI", not "the tool."
- **Experts** — Lucy's sub-agents (Nancy/Sam/Fran/Otto). Not "bots"/"agents" in user copy.
- **Stages** — the four showcase steps `02–05` (Content Engine / Lead Capture / Pipeline / Custom Experts). The numbering `02–05` matches the existing animation markers; `01` (the site/attract) is intentionally upstream.
- **Showcase** — the framed interactive product screen. **Animation** — the underlying `LucyAnimation` component.

## 9. Out of scope / deferred

- French (`fr`) copy — English first, `fr` is a follow-up (matches reposition).
- Recoloring `LucyAnimation` to warm tones — we keep it dark *by design* (it's the product screen). No recolor.
- Real metrics/social proof on the Lucy page — none invented (consistent with the reposition removing unsubstantiated stats).
- Auto-advancing tabs, video, and any motion polish beyond §6.

## 10. Success criteria

- `/[locale]/lucy` renders; the Offerings "Lucy" card links to it; **← Back to overview** returns home.
- Showcase tabs switch all four stages by click and keyboard; reduced-motion shows static stages and still switches.
- Page is fully readable with motion disabled; dark showcase sits in an on-brand ink band (no theme break).
- Primary CTA submits an early-access/contact request (or links to `/contact`) successfully.
- `bun lint` / typecheck clean; no orphaned imports.
- **Homepage:** the full `FeaturePillarsSection` no longer renders there; the `SystemTeaser` band shows in its place with `id="system"`; nav "System" and hero "Explore the system →" still resolve (no dangling anchors) and the teaser links through to `/lucy`. `LucyAnimation` default (`auto`) behavior unchanged.

## 11. Open decisions for the plan

1. **Early-access location** (§7): card → "Explore Lucy →", page owns "Get Early Access". Confirm this is the intended shift from the reposition's "early access on the card."
2. **CTA form** (§7): embed parametrized `ContactCTASection` (recommended) vs. lighter link-to-`/contact` band.

*(Resolved: the five-moves section reuses the full `FeaturePillarsSection`, relocated from the homepage — see §12.)*

## 12. Homepage consolidation (system → Lucy)

Since Lucy's page now owns the system story, the homepage drops the duplicated detail and points to Lucy instead. **Chosen: slim teaser that links to `/lucy`** (not a hard removal — keeps the differentiator and creates the click-path).

- **`page.tsx`:** remove `FeaturePillarsSection`; render a new `SystemTeaser` in its place (same slot, between `ProblemSection` and `ServicesSection`).
- **`SystemTeaser.tsx`** (new, slim band): keeps **`id="system"`** so the existing nav "System" link and the hero "Explore the system →" link **still resolve** (no dangling anchors). One-line "one unified system" headline + short line, and a primary **"See how Lucy works →"** `ButtonLink` → `/[locale]/lucy`. Light/warm, matches landing conventions (`SectionHeading`/reveal). Optionally name-checks the five moves inline (Attract · Engage · Capture · Convert · Optimize) as plain text, no full rows.
- **Nav:** "System" link stays, still `#system` (now lands on the teaser). No rename needed; the teaser carries the through-click to `/lucy`.
- **Hero:** unchanged — "Explore the system →" (`#system`) and the "One system, one place" capability panel both stay; they now lead to the teaser.
- Net: the **full five-pillar breakdown exists in exactly one place** (Lucy's page). Homepage gets tighter and more company-first; no duplicated content; clean path home → teaser → Lucy.
