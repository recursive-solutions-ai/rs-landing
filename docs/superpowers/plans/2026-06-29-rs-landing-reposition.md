# RS-Landing Repositioning — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the Recursive Solutions landing page from a dark "Lucy" product launch into a company-first, warm-greige, professional-consulting site that delivers the company ethos, with Lucy demoted to one of four offerings.

**Architecture:** Reuse the existing Next.js 16 App Router landing components and `data/landing.ts`. Swap the DaisyUI theme (dark → new "rs" light theme), add two small new band components (CredibilityBar, ProblemSection), rewrite the hero, reframe the existing (currently unused) `ServicesSection` as "Offerings," re-sequence `page.tsx`, and update nav/contact/metadata copy.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind 4 + DaisyUI 5 · GSAP · DM Sans (body) + a serif display face (headlines).

## Global Constraints

- **Source of truth:** `docs/superpowers/specs/2026-06-29-rs-landing-reposition-design.md`. Locked flow: Hero → Credibility bar → Problem → System → Offerings → Process → Team → Contact.
- **Git: local commits on branch `redesign/company-first-reposition`; never push** (no remote exists — Kyle authorized local commits on a branch). Commit once per task with a conventional message. `main` stays untouched; the branch is disposable.
- **Package manager / run:** dev server is already running via `npm run dev` (port 3000). Verify pages at **`http://localhost:3000/en`** (the locale route — `/` serves a Brain fallback, not the landing page).
- **Palette (theme name `rs`, light):** base-100 `#f6f3ee`, base-200 `#ece8e1`, base-300 `#dcd6cc`, base-content `#232229`, primary `#284b73`, primary-content `#ffffff`, secondary/accent `#3f7d8c`, neutral `#232229`, neutral-content `#f6f3ee`, success `#2f7d52`, warning `#b8842a`, error `#b23b3b`.
- **Copy rules:** the word "Lucy" appears **only** on the Offerings "Platform" card. Primary CTA everywhere = **"Book a Consult"** → `#contact`. **"Get Early Access"** appears **only** on the Lucy offering card.
- **Anchors:** `#system` (pillars), `#offerings` (services), `#process`, `#team`, `#contact`.
- **Headlines** use the serif display face; body stays DM Sans.
- **Testing:** this work is presentational — verify visually (dev server `/en` + Playwright screenshot). Add unit tests only where new pure logic is introduced (none expected). Per project CLAUDE.md (test pure functions; skip framework boilerplate).
- **Verify before applying:** the exact DaisyUI 5 custom-theme block syntax — confirm against installed DaisyUI version via Context7 (`/saadeghi/daisyui`) or the DaisyUI docs before Task 1.

---

### Task 1: Apply the "rs" light theme (Slate Navy on warm greige)

**Files:**
- Modify: `src/app/globals.css` (add theme block after the `@plugin 'daisyui';` line, ~line 3)
- Modify: `src/app/layout.tsx:41` (`data-theme="dark"` → `data-theme="rs"`)

**Interfaces:**
- Produces: a default DaisyUI theme named `rs`; all `bg-base-*`, `text-base-content`, `btn-primary`, etc. resolve to the new palette.

- [ ] **Step 1: Confirm DaisyUI 5 theme syntax**

Use Context7 to fetch current DaisyUI custom-theme docs (`resolve-library-id` → `/saadeghi/daisyui`, topic "custom theme"). Confirm the `@plugin "daisyui/theme" { ... }` block shape and the `--color-*` / `--radius-*` token names match the version in `package.json` (`daisyui` `5.0.35`).

- [ ] **Step 2: Add the theme block to `globals.css`**

Insert immediately after line 3 (`@plugin 'daisyui';`):

```css
@plugin "daisyui/theme" {
  name: "rs";
  default: true;
  color-scheme: light;
  --color-base-100: #f6f3ee;
  --color-base-200: #ece8e1;
  --color-base-300: #dcd6cc;
  --color-base-content: #232229;
  --color-primary: #284b73;
  --color-primary-content: #ffffff;
  --color-secondary: #3f7d8c;
  --color-secondary-content: #ffffff;
  --color-accent: #3f7d8c;
  --color-accent-content: #ffffff;
  --color-neutral: #232229;
  --color-neutral-content: #f6f3ee;
  --color-info: #3f7d8c;
  --color-success: #2f7d52;
  --color-warning: #b8842a;
  --color-error: #b23b3b;
  --radius-box: 0.5rem;
  --radius-field: 0.375rem;
}
```

- [ ] **Step 3: Switch the default theme on `<html>`**

In `src/app/layout.tsx` line 41, change `data-theme="dark"` to `data-theme="rs"`.

- [ ] **Step 4: Verify visually**

Reload `http://localhost:3000/en`. Expected: page background is warm off-white (`#f6f3ee`), text is near-black ink, buttons/links render slate-navy. (Layout still old — that's fine; only colors change here.) Take a Playwright screenshot to confirm no dark slate remains.

- [ ] **Step 5: Check the logo on light background**

`src/components/layout/ThemeLogo.tsx` swaps logos by theme. Confirm the logo shown on the light `rs` theme is legible (dark logo on light bg). If it picks a light/white logo, point its non-dark branch at `rs`. Verify in the screenshot.

- [ ] **Step 6: Checkpoint — commit this task**

Confirm `/en` renders in warm-greige + navy with a legible logo. Then commit this task on the branch.

---

### Task 2: Add the serif display face for headlines

**Files:**
- Modify: `src/app/layout.tsx` (load font via `next/font/google`, expose CSS var on `<html>`)
- Modify: `src/app/globals.css` (map a `.font-display` utility / `@theme` token to the var)

**Interfaces:**
- Produces: a `.font-display` class (and/or `font-display` Tailwind family) usable on headings; falls back to a system serif stack.

- [ ] **Step 1: Load the serif via next/font**

In `src/app/layout.tsx`, above the component, add:

```tsx
import { Source_Serif_4 } from 'next/font/google'

const display = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-display',
  display: 'swap',
})
```

Add `className={display.variable}` to the `<html>` element (keep existing attrs):

```tsx
<html lang="en" data-theme="rs" className={display.variable} suppressHydrationWarning>
```

- [ ] **Step 2: Expose a Tailwind family in `globals.css`**

After the imports/plugins block, add:

```css
@theme {
  --font-display: var(--font-display, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif);
}
```

(This registers a `font-display` utility so `className="font-display"` applies the serif; the system stack is the fallback if the var is unset.)

- [ ] **Step 3: Smoke-test the utility**

Temporarily add `font-display` to any visible `<h1>`/`<h2>` (e.g., the contact heading) and reload `/en`. Expected: that heading renders in the serif. Remove the temporary class after confirming (real headings get it in later tasks). Screenshot to confirm.

- [ ] **Step 4: Checkpoint — commit this task**

Serif loads and `font-display` works. Then commit this task on the branch.

---

### Task 3: Reshape `data/landing.ts` — de-Lucy pillars + reframe services into offerings

**Files:**
- Modify: `src/data/landing.ts` (the `ServiceItem` interface, the `services` array, and `featurePillars[4].promise`)

**Interfaces:**
- Produces: `ServiceItem` gains an optional `earlyAccess?: boolean`. `services` becomes the four offerings, Lucy first with `earlyAccess: true`.

- [ ] **Step 1: Extend `ServiceItem`**

In `src/data/landing.ts`, add an optional field to the interface (after `href`):

```ts
export interface ServiceItem {
	id: string
	icon: IconDefinition
	title: string
	description: string
	href: string
	earlyAccess?: boolean
}
```

- [ ] **Step 2: Replace the `services` array with the four offerings**

```ts
export const services: ServiceItem[] = [
	{
		id: "platform",
		icon: faLayerGroup,
		title: "Lucy — the unified platform",
		description:
			"Your website, content, SEO, lead capture, CRM, and analytics in one vertical system we run for you. The fastest way to replace a stack of disconnected tools.",
		href: "#contact",
		earlyAccess: true,
	},
	{
		id: "custom-automations",
		icon: faGears,
		title: "Custom automations",
		description:
			"We map the repetitive work across sales, ops, and admin and automate it — so your team spends its hours on what only people can do.",
		href: "#contact",
	},
	{
		id: "bespoke-tools",
		icon: faRobot,
		title: "Bespoke tools & agents",
		description:
			"Internal tools and AI agents built around your workflows, deployed into how your team already works, and monitored so they keep improving.",
		href: "#contact",
	},
	{
		id: "advisory",
		icon: faComments,
		title: "Advisory & consulting",
		description:
			"A hands-on partner as you adopt AI — we help you evaluate, prioritize, and stay ahead, month by month.",
		href: "#contact",
	},
]
```

Add `faLayerGroup` to the existing `@fortawesome/free-solid-svg-icons` import at the top of the file (the others — `faGears`, `faRobot`, `faComments` — are already imported).

- [ ] **Step 3: De-Lucy feature pillar 05**

In `featurePillars`, the `optimize` pillar (`num: "05"`) currently reads `promise: "Lucy automates the repetitive work..."`. Replace with:

```ts
		promise:
			"Your unified system automates the repetitive work so your team can do what only humans can.",
```

- [ ] **Step 4: Confirm no other "Lucy" remains in this file**

Search `src/data/landing.ts` for "Lucy". Expected: zero matches outside `services[0]` (the Platform card title).

- [ ] **Step 5: Verify build/types**

Run: `npx tsc --noEmit` (or rely on the dev server's type check). Expected: no type errors from `landing.ts`.

- [ ] **Step 6: Checkpoint — commit this task**

Data reshaped; types clean. Then commit this task on the branch.

---

### Task 4: ServiceCard — render the "Get Early Access" CTA on the Lucy card

**Files:**
- Modify: `src/components/landing/ServiceCard.tsx`

**Interfaces:**
- Consumes: `service.earlyAccess` (from Task 3).
- Produces: when `earlyAccess` is true, the card shows a "Get Early Access" button; otherwise unchanged.

- [ ] **Step 1: Read the current card**

Open `src/components/landing/ServiceCard.tsx` and locate where the card body / link renders.

- [ ] **Step 2: Add the conditional CTA**

Inside the card, after the description, add (adapt class names to the file's existing button/link style — match `ButtonLink`/DaisyUI usage already in the repo):

```tsx
{service.earlyAccess && (
	<ButtonLink href={service.href} className="btn btn-primary btn-sm mt-4 self-start">
		Get Early Access
	</ButtonLink>
)}
```

Import `ButtonLink` from `@/components/ui/button-link` if not already imported. Ensure the card is a flex column so `self-start` aligns the button left.

- [ ] **Step 3: Verify visually**

Reload `/en` once Offerings is on the page (Task 9/13). Expected: only the Lucy/Platform card shows a "Get Early Access" button; the other three do not. (If Offerings isn't on the page yet, defer this visual check to Task 13's full-page QA.)

- [ ] **Step 4: Checkpoint — commit this task**

---

### Task 5: New component — CredibilityBar

**Files:**
- Create: `src/components/landing/CredibilityBar.tsx`

**Interfaces:**
- Produces: `export function CredibilityBar()` — a slim full-width band; no props.

- [ ] **Step 1: Create the component**

```tsx
"use client"

import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

export function CredibilityBar() {
	const { ref, inView } = useInView<HTMLDivElement>()

	return (
		<section className="border-y border-base-300 bg-base-200">
			<div
				ref={ref}
				className={cn(
					"mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between",
					inView && "reveal-in"
				)}
			>
				<p className="reveal max-w-2xl text-sm font-medium text-base-content/80 md:text-base">
					<span className="font-bold text-primary">Operators, not theorists.</span>{" "}
					Built by a team with special-operations, operations, and engineering
					backgrounds — we run businesses, then build the systems that fix them.
				</p>
				<div className="reveal flex items-center gap-4 opacity-60">
					<span className="text-[10px] font-bold uppercase tracking-widest text-base-content/50">
						Trusted by
					</span>
					{/* Replace with real client logos when available */}
					<div className="h-4 w-16 rounded bg-base-300" />
					<div className="h-4 w-16 rounded bg-base-300" />
					<div className="h-4 w-16 rounded bg-base-300" />
				</div>
			</div>
		</section>
	)
}
```

- [ ] **Step 2: Verify in isolation**

It renders on the page in Task 13. For now confirm types: `npx tsc --noEmit` shows no errors for this file.

- [ ] **Step 3: Checkpoint — commit this task**

---

### Task 6: New component — ProblemSection

**Files:**
- Create: `src/components/landing/ProblemSection.tsx`

**Interfaces:**
- Produces: `export function ProblemSection()` — a short statement band; no props.

- [ ] **Step 1: Create the component**

```tsx
"use client"

import { type CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

export function ProblemSection() {
	const { ref, inView } = useInView<HTMLDivElement>()

	return (
		<section className="bg-base-100">
			<div
				ref={ref}
				className={cn("mx-auto max-w-4xl px-6 py-24 text-center", inView && "reveal-in")}
			>
				<h2 className="reveal font-display text-3xl font-semibold leading-tight text-base-content md:text-4xl">
					Most businesses are stitched together from a dozen disconnected tools.
				</h2>
				<p
					className="reveal mx-auto mt-5 max-w-2xl text-base text-base-content/60 md:text-lg"
					style={{ "--reveal-delay": "0.1s" } as CSSProperties}
				>
					Generic software, scattered logins, nothing that talks to each other —
					slower decisions, wasted hours, lost leads.
				</p>
			</div>
		</section>
	)
}
```

- [ ] **Step 2: Type-check** — `npx tsc --noEmit` clean for this file.

- [ ] **Step 3: Checkpoint — commit this task**

---

### Task 7: Rewrite HeroSection (company-first, no Lucy, capability panel)

**Files:**
- Modify: `src/components/landing/HeroSection.tsx`

**Interfaces:**
- Produces: hero with eyebrow, serif ethos headline, lead, primary "Book a Consult" + ghost "Explore the system" link, and a "one system, one place" panel. No `LucyAnimation`, no "Lucy" text, no lamp glow.

- [ ] **Step 1: Replace the hero body**

Replace the contents of `HeroSection.tsx` with a left-copy / right-panel layout. Keep the `"use client"` directive and the `revealed` mount-reveal pattern. Reference implementation:

```tsx
"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"

const CAPABILITIES = [
	"Website & conversion",
	"Content & SEO",
	"Lead capture",
	"CRM & pipeline",
	"Analytics & growth ops",
]

export function HeroSection() {
	const [revealed, setRevealed] = useState(false)
	useEffect(() => {
		const id = requestAnimationFrame(() => setRevealed(true))
		return () => cancelAnimationFrame(id)
	}, [])

	return (
		<section className="bg-base-100">
			<div
				className={cn(
					"mx-auto grid max-w-7xl items-center gap-12 px-6 pt-36 pb-24 md:grid-cols-[1.15fr_0.85fr]",
					revealed && "reveal-in"
				)}
			>
				{/* Left: copy */}
				<div>
					<span className="reveal inline-block text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
						Growth Systems &amp; AI Consulting
					</span>
					<h1
						className="reveal font-display mt-4 text-5xl font-semibold leading-[1.08] tracking-tight text-base-content md:text-6xl"
						style={{ "--reveal-delay": "0.1s" } as CSSProperties}
					>
						We make your business simpler, faster, and more valuable.
					</h1>
					<p
						className="reveal mt-6 max-w-xl text-lg leading-relaxed text-base-content/60"
						style={{ "--reveal-delay": "0.2s" } as CSSProperties}
					>
						Instead of scattered tools and generic software, one vertical system —
						website, content, SEO, leads, CRM, analytics — run by a hands-on team.
						When you need more, we build it.
					</p>
					<div
						className="reveal mt-8 flex flex-wrap items-center gap-5"
						style={{ "--reveal-delay": "0.3s" } as CSSProperties}
					>
						<ButtonLink href="#contact" className="btn btn-primary px-8 text-base font-bold">
							Book a Consult
						</ButtonLink>
						<ButtonLink href="#system" className="font-bold text-base-content hover:text-primary">
							Explore the system →
						</ButtonLink>
					</div>
				</div>

				{/* Right: capability panel */}
				<div
					className="reveal rounded-box border border-base-300 bg-base-200 p-6 shadow-sm"
					style={{ "--reveal-delay": "0.25s" } as CSSProperties}
				>
					<p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-base-content/50">
						One system, one place
					</p>
					<ul className="divide-y divide-base-300">
						{CAPABILITIES.map((cap, i) => (
							<li key={cap} className="flex items-center gap-3 py-3 text-sm font-semibold text-base-content">
								<span className="w-5 text-xs font-extrabold text-primary">
									{String(i + 1).padStart(2, "0")}
								</span>
								{cap}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
```

- [ ] **Step 2: Confirm `LucyAnimation` is no longer imported/used here**

Search `HeroSection.tsx` for `Lucy`. Expected: zero matches. (Leave `LucyAnimation.tsx` on disk — it's no longer referenced; do not delete pre-existing files.)

- [ ] **Step 3: Verify visually**

Reload `/en`. Expected: no giant "Lucy"; serif ethos headline left, numbered capability panel right, "Book a Consult" (navy) + "Explore the system →". Screenshot to confirm.

- [ ] **Step 4: Checkpoint — commit this task**

---

### Task 8: System section heading + anchor (FeaturePillarsSection)

**Files:**
- Modify: `src/components/landing/FeaturePillarsSection.tsx`

- [ ] **Step 1: Set the anchor and heading**

Ensure the section element has `id="system"`. Set the section heading/eyebrow to: eyebrow "One vertical system", title **"Everything that grows your business, in one place."** (Match the existing `SectionHeading` usage/props in the file.) Apply `font-display` to the title if the heading component doesn't already.

- [ ] **Step 2: Verify visually**

Reload `/en`, click "Explore the system →" in the hero. Expected: smooth-scrolls to the pillars section; heading reads the new title; pillar 05 no longer says "Lucy". Screenshot.

- [ ] **Step 3: Checkpoint — commit this task**

---

### Task 9: Reframe ServicesSection as "Offerings"

**Files:**
- Modify: `src/components/landing/ServicesSection.tsx`

- [ ] **Step 1: Update id, heading, and copy**

Change `id="services"` → `id="offerings"`. Update the `SectionHeading` to: `tag="Offerings"`, `title="Start with the system. Extend it however you need."`, `subtitle="Begin with the unified platform, then add custom automations, bespoke tools, and advisory as your business needs them."` Apply `font-display` to the title as the other sections do.

- [ ] **Step 2: Verify visually**

Reload `/en`. Expected: four offering cards (Lucy/Platform first with a "Get Early Access" button — from Task 4 — then Custom automations, Bespoke tools & agents, Advisory & consulting). Screenshot.

- [ ] **Step 3: Checkpoint — commit this task**

---

### Task 10: Process + Team anchors/headings

**Files:**
- Modify: `src/components/landing/ProcessSection.tsx`
- Modify: `src/components/landing/TeamSection.tsx`

- [ ] **Step 1: Confirm/add anchors**

Ensure `ProcessSection` has `id="process"` and `TeamSection` has `id="team"`. (Add if missing.)

- [ ] **Step 2: Apply serif to their section titles**

Add `font-display` to the Process and Team section headings to match the rest (via `SectionHeading` or directly).

- [ ] **Step 3: Verify visually** — nav "Process" and "Team" links scroll to the right sections. Screenshot.

- [ ] **Step 4: Checkpoint — commit this task**

---

### Task 11: ContactCTASection copy

**Files:**
- Modify: `src/components/landing/ContactCTASection.tsx:98-116`

- [ ] **Step 1: Update the heading + intro copy**

- Line ~99: heading → **"Let's make your business simpler, faster, and more valuable."** Add `font-display` to the `<h2>`.
- Line ~105: subtitle → "Book a free 30-minute consult with the team. Curious about the platform? Early access is on the Lucy card above."
- Keep the form, the `bg-primary` panel (now navy), and the GrowthEngine submit logic unchanged.

- [ ] **Step 2: Verify visually**

Reload `/en`, scroll to `#contact`. Expected: navy panel, new serif heading, form intact. Screenshot.

- [ ] **Step 3: Checkpoint — commit this task**

---

### Task 12: Header nav + CTA copy

**Files:**
- Modify: `src/components/layout/Header.tsx:13-21`
- Modify: `src/i18n/dictionaries/en.ts` (the `nav.cta` value, and `nav.home` if surfaced)

**Interfaces:**
- Consumes: `t('nav.cta')`.

- [ ] **Step 1: Update nav links + anchors**

Replace `NAV_LINKS` in `Header.tsx` with:

```tsx
const NAV_LINKS = [
	{ href: `/${locale}#system`, label: 'System' },
	{ href: `/${locale}#offerings`, label: 'Offerings' },
	{ href: `/${locale}#process`, label: 'Process' },
	{ href: `/${locale}#team`, label: 'Team' },
]
```

- [ ] **Step 2: Update the CTA label**

In `src/i18n/dictionaries/en.ts`, set `nav.cta` to **"Book a Consult"** (and ensure the French dict has a placeholder; FR copy is a follow-up). The Header already renders `t('nav.cta')` → `#contact`; no Header change needed for the label.

- [ ] **Step 3: Verify visually**

Reload `/en`. Expected: nav reads System · Offerings · Process · Team, CTA button reads "Book a Consult", every nav item scrolls to its section. Screenshot desktop + mobile menu.

- [ ] **Step 4: Checkpoint — commit this task**

---

### Task 13: Re-sequence `page.tsx` (assemble the page)

**Files:**
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `CredibilityBar`, `ProblemSection` (new); existing `HeroSection`, `FeaturePillarsSection`, `ServicesSection`, `ProcessSection`, `TeamSection`, `ContactCTASection`.

- [ ] **Step 1: Update imports and the render order**

Replace the imports + JSX body so the order is exactly:

```tsx
import { HeroSection } from "@/components/landing/HeroSection"
import { CredibilityBar } from "@/components/landing/CredibilityBar"
import { ProblemSection } from "@/components/landing/ProblemSection"
import { FeaturePillarsSection } from "@/components/landing/FeaturePillarsSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { TeamSection } from "@/components/landing/TeamSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"
import { getForm } from "@/lib/forms-server"
import { buildUrl } from "@/lib/sitemap-shared"
import { defaultLocale } from "@/i18n/config"
import type { Metadata } from "next"
```

```tsx
		<div className="no-scrollbar">
			<HeroSection />
			<CredibilityBar />
			<ProblemSection />
			<FeaturePillarsSection />
			<ServicesSection />
			<ProcessSection />
			<TeamSection />
			<ContactCTASection form={contactForm} />
		</div>
```

`ProofOfWorkSection` is no longer imported or rendered. (Leave the component + `proofStats`/`testimonials`/`outcomes` data in place — kept-but-hidden per spec.)

- [ ] **Step 2: Update the page metadata**

In the same file, replace the `metadata` title/description:

```tsx
export const metadata: Metadata = {
	title: "Recursive Solutions — One System to Run Your Growth",
	description:
		"We make your business simpler, faster, and more valuable — one vertical system for your website, content, SEO, leads, CRM, and analytics, run by a hands-on team. Plus custom automations, bespoke tools, and consulting.",
	alternates: { canonical: buildUrl("", defaultLocale) },
}
```

- [ ] **Step 3: Full-page visual QA**

Reload `http://localhost:3000/en`. Take a **full-page** Playwright screenshot. Verify against the locked wireframe (`.superpowers/brainstorm/.../full-page-layout-v4.html`):
- Order: Hero → Credibility bar → Problem → System → Offerings → Process → Team → Contact.
- No "Lucy" anywhere except the Offerings Platform card.
- "Get Early Access" only on that card; "Book a Consult" in hero + nav + contact.
- Warm greige + navy throughout; serif headlines; no dark slate, no lamp glow, no proof/stats section.
- Each nav + hero anchor scrolls to the right section.

- [ ] **Step 4: Checkpoint — commit this task**

---

### Task 14: Cleanup pass — orphans & stray copy

**Files:**
- Modify (only if your changes orphaned them): imports in touched files

- [ ] **Step 1: Remove import orphans your edits created**

Check `HeroSection.tsx` and `page.tsx` for now-unused imports (e.g., a removed `LucyAnimation` import, removed `ProofOfWorkSection` import). Remove only imports **your** changes orphaned. Do **not** delete pre-existing files (`LucyAnimation.tsx`, `ProofOfWorkSection.tsx`) — they're intentionally retained.

- [ ] **Step 2: Repo-wide "Lucy" sweep**

Search `src/` for "Lucy". Expected matches: only `data/landing.ts` `services[0]` title and `LucyAnimation.tsx` (unused file). No "Lucy" in any rendered hero/pillar/contact copy.

- [ ] **Step 3: Type-check + lint**

Run: `npx tsc --noEmit` and `npm run lint`. Expected: clean (or only pre-existing warnings unrelated to this work).

- [ ] **Step 4: Final full-page screenshot**

Capture `/en` full-page once more for the record. Confirm it matches the locked design.

- [ ] **Step 5: Checkpoint — commit this task** — work complete, local only.

---

## Self-Review (author checklist — done)

- **Spec coverage:** theme (T1), serif (T2), de-Lucy + offerings data (T3), early-access CTA (T4), credibility bar (T5), problem band (T6), hero rewrite (T7), system heading/anchor (T8), offerings reframe (T9), process/team anchors (T10), contact copy (T11), nav/CTA (T12), page order + metadata + proof removed (T13), cleanup (T14). All §4 sections + §5 copy + §9 palette covered.
- **Deferred items honored:** proof data kept-but-hidden (T13 note); FR copy flagged follow-up (T12); no commits anywhere (Global Constraints + every checkpoint).
- **Type consistency:** `ServiceItem.earlyAccess` defined in T3, consumed in T4. New components `CredibilityBar`/`ProblemSection` defined in T5/T6, imported in T13 with matching names. Anchors `#system`/`#offerings`/`#process`/`#team`/`#contact` consistent across T7–T13.
- **Open build-time confirm:** DaisyUI 5 theme syntax (T1 Step 1); serif family choice (`Source_Serif_4`, swappable).
