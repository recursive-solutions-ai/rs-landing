# RS-Landing Repositioning — Design Spec

**Date:** 2026-06-29
**Status:** Layout, format, **and palette locked** (Slate Navy on warm greige — see §9). Ready for the implementation plan. Implementation not started. **Local-only — no commits/pushes.**
**Scope:** Reposition the Recursive Solutions landing page (`rs-landing`) from a single-product
("Lucy") launch into a company-first professional consulting site. Covers **structure, section
flow, format, and copy direction**. **Color is settled in a dedicated palette pass that happens
before implementation** (Kyle chose to lock the palette first rather than recolor later).

---

## 1. Problem / motivation

The current live site (`recursive-solutions.com/en`) is a **dark "Lucy" product launch**:

- `data-theme="dark"`, primary `#605dff` (the generic-AI indigo), magenta secondary, near-black bases.
- Hero `<h1>` is literally **"Lucy"**, tagged *"The AI for growing businesses,"* CTA **"Get Early Access"** (waitlist framing).
- Reads like every other AI startup; the company and its ethos are invisible.

**Goal:** lead with the **company ethos**, present Recursive Solutions as a hands-on consulting firm
with one unified system, and demote **Lucy to one offering among several**. Tone: corporate,
buttoned-up, editorial — not sci-fi.

## 2. North-star ethos (the copy spine)

> We make your business simpler, faster, and more valuable. Instead of forcing your business into
> scattered tools and generic software, we have built one vertical system that brings your website,
> content, SEO, lead capture, CRM, analytics, and growth operations together in one place. When you
> need more, we build more: custom automations, bespoke tools, operational workflows, and consulting
> designed around your business. You get a hands-on team that runs it with you, keeps improving it,
> and helps your business move faster without wasting time on disconnected systems.

The page is a section-by-section delivery of this paragraph.

## 3. Key decisions (from brainstorm)

| Decision | Choice |
|---|---|
| Lucy's role | **One offering among several**; company/team leads. Name leaves the hero; lives on the Offerings "Platform" card (and lightly in the system section). |
| Scope | **Deeper restructure** — new hero, re-ordered sections, new bands; reuse existing components/data where possible. |
| Primary CTA | **Book a Consult** (company-led), routes to existing contact form. |
| Secondary CTA | **Get Early Access** — relocated to the **Lucy/Platform offering card only**. Not in the hero. |
| Tone | Corporate / buttoned-up. **Warm greige** light bases (Kyle approved), **serif headlines** (confirmed), formal rules/labels, restrained motion. Moving **away** from the live dark/indigo theme. |
| Proof | Generic stats + testimonials **removed from the page** (were unsubstantiated). Credibility handled by a **slim credibility bar** (real founder pedigree) + **Team as the primary proof**. |
| Color | **Locked** (Kyle: option b — palette before build). **Slate Navy** primary on **warm-greige** light bases — exact tokens in §9. Replaces the live dark/indigo theme. |
| Git | **Local-only.** Do not commit or push — project is intentionally detached. |

## 4. Information architecture (locked)

Top → bottom. "Asset" = what already exists in the repo.

| # | Section | Conversion job / intent | Asset |
|---|---|---|---|
| — | **Nav** | Logo + anchors + **Book a Consult** button. | `Header.tsx` (update CTA) |
| 0 | **Hero** | Eyebrow ("Growth Systems & AI Consulting") · ethos headline · lead · **Book a Consult** + quiet *"Explore the system ↓"* link. New visual replaces the "Lucy" H1 + `LucyAnimation`. Layout: headline left, "one system, one place" capability panel right. | `HeroSection.tsx` (rewrite) |
| 1 | **Credibility bar** *(new, slim)* | Earn the right to keep talking. Real founder pedigree ("Operators, not theorists — special-operations, operations, engineering"). Optional client-logo slots (placeholder until real). | New component |
| 2 | **Problem** *(new, short band)* | Agitate: "stitched together from a dozen disconnected tools." | New component |
| 3 | **One unified system** | The differentiator/mechanism. Five pillars: Attract · Engage · Capture · Convert · Optimize. **Remove "Lucy"** from pillar 05 copy. | `FeaturePillarsSection.tsx` + `data/landing.ts` |
| 4 | **Offerings** | "When you need more, we build more." Four cards: **Lucy (Platform — Get Early Access)**, Custom automations, Bespoke tools & agents, Advisory & consulting. | `ServicesSection.tsx` (currently built but unused) + reframed `services` data |
| 5 | **Process** | De-risk the engagement: Discover · Design · Execute · Optimize. | `ProcessSection.tsx` |
| 6 | **Team** *(the proof)* | People = trust; founders are the proof for an early-stage firm. Jake (CEO, MARSOC) · Luc (COO) · Denis (CTO). | `TeamSection.tsx` |
| 7 | **Contact / CTA** | Deep-ink band. "Let's make your business simpler, faster, and more valuable." Book a Consult + contact form. | `ContactCTASection.tsx` |
| 8 | **Footer** | Nav, legal, links. | `Footer.tsx` |

**Removed from page:** `ProofOfWorkSection` (stats + testimonials). *Data is kept, see §6.*

## 5. Copy direction (working text — refine in build)

- **Eyebrow:** Growth Systems & AI Consulting
- **Hero H1:** We make your business simpler, faster, and more valuable.
- **Hero lead:** Instead of scattered tools and generic software, one vertical system — website, content, SEO, leads, CRM, analytics — run by a hands-on team. When you need more, we build it.
- **Credibility bar:** Operators, not theorists. Built by a team with special-operations, operations, and engineering backgrounds — we run businesses, then build the systems that fix them.
- **Problem:** Most businesses are stitched together from a dozen disconnected tools.
- **System heading:** Everything that grows your business, in one place.
- **Offerings heading:** Start with the system. Extend it however you need.
- **Contact heading:** Let's make your business simpler, faster, and more valuable.
- **Rule:** no "Lucy" anywhere except the Offerings Platform card.
- **Metadata/`<title>`:** move off the current "Every Great Business Will Run on AI" / Lucy framing to company-first.

## 6. Implementation notes (for the plan, not exhaustive)

- `page.tsx`: new section order — Hero, CredibilityBar, Problem, FeaturePillars, Offerings(Services), Process, Team, Contact. Drop `ProofOfWorkSection` import.
- `HeroSection.tsx`: remove "Lucy" H1 and `LucyAnimation`; new headline/CTAs/panel. Some hero copy is currently hardcoded in the component (not i18n) — keep that pattern or move to dictionary (decide in plan).
- New components: `CredibilityBar`, `ProblemSection` (small bands; match existing landing component conventions, `ScrollReveal`/`useInView`).
- `data/landing.ts`: de-Lucy pillar 05; reframe `services` → 4 offerings; Lucy card carries an `earlyAccess` CTA variant. **`proofStats` / `testimonials` / `outcomes`: keep in the data file but stop rendering them** (retain for a future proof visual if the team wants); only `ProofOfWorkSection` leaves the page.
- `Header.tsx` / nav + `ContactCTASection.tsx`: CTA label → Book a Consult; ensure anchor targets exist (`#contact`, `#system`, `#offerings`, `#process`, `#team`).
- **Theme:** apply the locked Slate-Navy/greige DaisyUI theme (§9) as the **default light theme** — this is the first build step. Replaces the current dark-default. (Decide in plan whether to keep a dark variant or drop it.)
- i18n: English first; `fr` dictionary updates are a follow-up.

## 7. Deferred / out of scope (this pass)

- **Real client logos** and **real case studies/testimonials** — add when available; the hidden data + a proof slot can return.
- French (`fr`) locale copy.
- Any new `LucyAnimation` replacement beyond the static hero panel (motion polish is a later pass).

## 8. Resolved decisions (2026-06-29)

1. **Color sequencing:** (b) settle the warm-greige palette **before** building — palette pass happens next, before the implementation plan.
2. **Unused data:** keep `proofStats` / `testimonials` / `outcomes` in the data file but **don't render** them (retain for a future proof visual); only `ProofOfWorkSection` leaves the page.
3. **Serif headlines:** confirmed.
4. **Git:** repo stays **local-only — do not commit/push** (project intentionally detached).

Still to confirm during build:
- Hero visual: capability **panel** (current wireframe) vs. a lighter treatment.

## 9. Palette — locked (2026-06-29): "Slate Navy on warm greige"

Light theme. Warm-greige bases, slate-navy primary, steel-blue secondary/accent, near-black ink.

| Token | Hex | Use |
|---|---|---|
| base-100 | `#f6f3ee` | Main surface / hero / cards (lightest) |
| base-200 | `#ece8e1` | Warm greige — alternating section bands, body |
| base-300 | `#dcd6cc` | Borders, rules, dividers |
| base-content | `#232229` | Ink — body text + serif headlines |
| primary | `#284b73` | Slate navy — buttons, eyebrows, numbers, links |
| primary-content | `#ffffff` | Text on primary |
| secondary | `#3f7d8c` | Steel blue — secondary accents |
| secondary-content | `#ffffff` | Text on secondary |
| accent | `#3f7d8c` | Steel blue — small highlights (tags/pills) |
| accent-content | `#ffffff` | Text on accent |
| neutral | `#232229` | Deep ink — dark contact/CTA band |
| neutral-content | `#f6f3ee` | Text on the ink band |
| info | `#3f7d8c` | |
| success | `#2f7d52` | |
| warning | `#b8842a` | |
| error | `#b23b3b` | |

DaisyUI 5 theme block (target shape — **verify exact syntax against the installed DaisyUI version via Context7/docs during build**):

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

Typography: **serif headlines** (refined Palatino/Georgia-class stack — confirm exact family in build) over **DM Sans** body (already loaded). Set `<html data-theme="rs">` as default; lamp-glow / dark-hero effects from the old theme are removed.
