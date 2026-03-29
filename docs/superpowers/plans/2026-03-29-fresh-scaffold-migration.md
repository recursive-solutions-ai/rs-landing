# Fresh Scaffold Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-scaffold rs-landing from create-client-app to get bug fixes, updated deps, and new features (forms, analytics, SEO), then migrate back the custom landing page.

**Architecture:** Backup current src/public, scaffold fresh from create-client-app, copy scaffold into project root, restore landing components + assets + hooks, merge dependencies, adapt landing page to template layout.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, DaisyUI 5, GSAP, Three.js, Growth Engine SDK, Resend

---

### Task 1: Backup Current Project

**Files:**
- Copy: `src/` -> `_migration_backup/src/`
- Copy: `public/` -> `_migration_backup/public/`
- Copy: `package.json` -> `_migration_backup/package.json`
- Copy: `next.config.ts` -> `_migration_backup/next.config.ts`
- Copy: `middleware.ts` -> `_migration_backup/middleware.ts` (if at root)
- Copy: `.env.local` -> `_migration_backup/.env.local`

- [ ] **Step 1: Create backup directory and copy all project files**

```bash
mkdir -p _migration_backup
cp -r src _migration_backup/src
cp -r public _migration_backup/public
cp package.json _migration_backup/package.json
cp next.config.ts _migration_backup/next.config.ts
cp .env.local _migration_backup/.env.local
# middleware.ts is inside src/ already, so it's covered
```

- [ ] **Step 2: Verify backup is complete**

```bash
ls _migration_backup/src/components/landing/HeroSection.tsx
ls _migration_backup/public/denis.jpg
ls _migration_backup/src/data/landing.ts
ls _migration_backup/src/hooks/useGsap.ts
ls _migration_backup/src/lib/animation-config.ts
ls _migration_backup/src/app/api/contact/route.ts
```

Expected: All files exist, no errors.

- [ ] **Step 3: Commit the backup**

```bash
git add _migration_backup/
git commit -m "chore: backup current project before scaffold migration"
```

---

### Task 2: Scaffold Fresh Project from create-client-app

**Files:**
- Create: `/tmp/rs-landing-fresh/` (temporary scaffold output)

- [ ] **Step 1: Clone the create-client-app repo and run scaffolder**

```bash
cd /tmp
rm -rf create-client-app-repo rs-landing-fresh
git clone https://github.com/recursive-solutions-ai/growth-engine-create-client-app.git create-client-app-repo
```

- [ ] **Step 2: Manually scaffold by copying and transforming the template**

The CLI prompts for input which we can't do non-interactively. Instead, copy the template directly and apply the replacements manually:

```bash
cp -r /tmp/create-client-app-repo/template /tmp/rs-landing-fresh
cd /tmp/rs-landing-fresh

# Rename special files
mv gitignore .gitignore
mv package.json.template package.json
mv .env.local.template .env.local 2>/dev/null || true

# Apply template variable replacements across all text files
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.css" -o -name "*.mjs" \) -exec sed -i '' 's/{{CLIENT_NAME}}/Recursive Solutions/g; s/{{CLIENT_SLUG}}/recursive-solutions/g; s/{{SDK_VERSION}}/sdk-v0.1.0/g' {} +
```

- [ ] **Step 3: Verify scaffold output**

```bash
ls /tmp/rs-landing-fresh/src/app/layout.tsx
ls /tmp/rs-landing-fresh/src/app/[locale]/layout.tsx
ls /tmp/rs-landing-fresh/src/components/layout/Header.tsx
ls /tmp/rs-landing-fresh/src/components/layout/Footer.tsx
ls /tmp/rs-landing-fresh/src/app/robots.ts
ls /tmp/rs-landing-fresh/src/app/sitemap.ts
ls /tmp/rs-landing-fresh/src/instrumentation.ts
ls /tmp/rs-landing-fresh/src/lib/env.ts
cat /tmp/rs-landing-fresh/package.json | head -5
```

Expected: All files exist, package.json shows `"name": "recursive-solutions"`.

---

### Task 3: Replace Project Source with Fresh Scaffold

**Files:**
- Delete: `src/` (current, backed up in Task 1)
- Delete: `public/` (current, backed up in Task 1)
- Copy: all scaffold files from `/tmp/rs-landing-fresh/` into project root

- [ ] **Step 1: Remove current src and public directories**

```bash
cd /Users/denisduvauchelle/Documents/code/rs-landing
rm -rf src public
```

- [ ] **Step 2: Copy fresh scaffold into project root**

Copy only the source files, not git/node_modules:

```bash
cp -r /tmp/rs-landing-fresh/src .
cp -r /tmp/rs-landing-fresh/public . 2>/dev/null || mkdir public
cp /tmp/rs-landing-fresh/package.json .
cp /tmp/rs-landing-fresh/next.config.ts .
cp /tmp/rs-landing-fresh/tsconfig.json .
cp /tmp/rs-landing-fresh/postcss.config.mjs .
cp /tmp/rs-landing-fresh/.gitignore .
cp /tmp/rs-landing-fresh/.env.example . 2>/dev/null || true
cp /tmp/rs-landing-fresh/README.md . 2>/dev/null || true
```

- [ ] **Step 3: Verify fresh scaffold is in place**

```bash
ls src/app/layout.tsx
ls src/app/robots.ts
ls src/app/sitemap.ts
ls src/instrumentation.ts
ls src/lib/env.ts
ls src/components/analytics/GoogleAnalytics.tsx
ls src/components/layout/Header.tsx
ls src/components/layout/Footer.tsx
```

Expected: All template files present.

- [ ] **Step 4: Commit the fresh scaffold**

```bash
git add -A
git commit -m "chore: replace project source with fresh create-client-app scaffold"
```

---

### Task 4: Restore Public Assets

**Files:**
- Copy: `_migration_backup/public/` assets into `public/`

- [ ] **Step 1: Copy back all custom public assets**

```bash
cd /Users/denisduvauchelle/Documents/code/rs-landing

# Logos
cp _migration_backup/public/logo-no-bg-with-text-dark.png public/
cp _migration_backup/public/logo-no-bg-with-text-light.png public/
cp _migration_backup/public/logo-no-bg.png public/
cp _migration_backup/public/logo-horizontal-no-bg-with-text-dark.png public/
cp _migration_backup/public/logo-horizontal-no-bg-with-text-light.png public/

# Social card
cp _migration_backup/public/social-card-2.png public/

# Team photos
cp _migration_backup/public/denis.jpg public/
cp _migration_backup/public/jake.jpg public/

# Landing images
mkdir -p public/landing
cp _migration_backup/public/landing/*.jpeg public/landing/

# Favicons
mkdir -p public/favicon_io
cp -r _migration_backup/public/favicon_io/* public/favicon_io/
```

- [ ] **Step 2: Verify assets**

```bash
ls public/logo-no-bg-with-text-dark.png public/denis.jpg public/landing/dashboard.jpeg public/favicon_io/favicon.ico public/social-card-2.png
```

Expected: All files present.

- [ ] **Step 3: Commit restored assets**

```bash
git add public/
git commit -m "chore: restore custom public assets (logos, images, favicons)"
```

---

### Task 5: Restore Landing Page Components

**Files:**
- Copy: `_migration_backup/src/components/landing/` -> `src/components/landing/`
- Copy: `_migration_backup/src/data/landing.ts` -> `src/data/landing.ts`
- Copy: `_migration_backup/src/hooks/` -> `src/hooks/`
- Copy: `_migration_backup/src/lib/animation-config.ts` -> `src/lib/animation-config.ts`

- [ ] **Step 1: Copy landing components**

```bash
cd /Users/denisduvauchelle/Documents/code/rs-landing

# Landing components (all of them)
mkdir -p src/components/landing
cp _migration_backup/src/components/landing/HeroSection.tsx src/components/landing/
cp _migration_backup/src/components/landing/HeroBackground.tsx src/components/landing/
cp _migration_backup/src/components/landing/TargetMarketSection.tsx src/components/landing/
cp _migration_backup/src/components/landing/ServicesSection.tsx src/components/landing/
cp _migration_backup/src/components/landing/ServiceCard.tsx src/components/landing/
cp _migration_backup/src/components/landing/ProcessSection.tsx src/components/landing/
cp _migration_backup/src/components/landing/CaseStudiesSection.tsx src/components/landing/
cp _migration_backup/src/components/landing/CaseStudyCard.tsx src/components/landing/
cp _migration_backup/src/components/landing/TeamSection.tsx src/components/landing/
cp _migration_backup/src/components/landing/TestimonialsSection.tsx src/components/landing/
cp _migration_backup/src/components/landing/ContactCTASection.tsx src/components/landing/
cp _migration_backup/src/components/landing/SectionHeading.tsx src/components/landing/
cp _migration_backup/src/components/landing/AnimatedText.tsx src/components/landing/
cp _migration_backup/src/components/landing/ScrollReveal.tsx src/components/landing/
cp _migration_backup/src/components/landing/GradientText.tsx src/components/landing/
# Skip Navbar.tsx and AnimatedFooter.tsx - replaced by template Header/Footer
```

- [ ] **Step 2: Copy data file**

```bash
mkdir -p src/data
cp _migration_backup/src/data/landing.ts src/data/landing.ts
```

- [ ] **Step 3: Copy hooks**

```bash
mkdir -p src/hooks
cp _migration_backup/src/hooks/useGsap.ts src/hooks/useGsap.ts
cp _migration_backup/src/hooks/useReducedMotion.ts src/hooks/useReducedMotion.ts
```

- [ ] **Step 4: Copy animation config**

```bash
cp _migration_backup/src/lib/animation-config.ts src/lib/animation-config.ts
```

- [ ] **Step 5: Verify all landing files**

```bash
ls src/components/landing/ | wc -l
ls src/data/landing.ts src/hooks/useGsap.ts src/hooks/useReducedMotion.ts src/lib/animation-config.ts
```

Expected: 15 landing component files (no Navbar or AnimatedFooter), data file, hooks, and animation config all present.

- [ ] **Step 6: Commit restored landing components**

```bash
git add src/components/landing/ src/data/ src/hooks/ src/lib/animation-config.ts
git commit -m "chore: restore custom landing components, data, hooks, and animation config"
```

---

### Task 6: Restore Landing Page Route

**Files:**
- Modify: `src/app/[locale]/page.tsx` (replace template homepage with custom landing page)

- [ ] **Step 1: Replace the template homepage with the custom landing page**

Write `src/app/[locale]/page.tsx` with this content:

```tsx
/**
 * Landing page — the public home page at `/`.
 *
 * Studio Lumio-inspired redesign with GSAP animations and Three.js hero.
 */

import { HeroSection } from "@/components/landing/HeroSection"
import { TargetMarketSection } from "@/components/landing/TargetMarketSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection"
import { TeamSection } from "@/components/landing/TeamSection"
import { ContactCTASection } from "@/components/landing/ContactCTASection"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Modern Systems for Growing Businesses | Recursive Solutions",
	description:
		"We bridge the gap between knowing AI matters and knowing how to use it. AI consulting, advisory, and custom builds for service businesses.",
}

export default async function LandingPage() {
	return (
		<div className="no-scrollbar">
			<HeroSection />
			<TargetMarketSection />
			<ServicesSection />
			<ProcessSection />
			<CaseStudiesSection />
			<TeamSection />
			<ContactCTASection />
		</div>
	)
}
```

- [ ] **Step 2: Commit the landing page route**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: restore custom landing page with GSAP/Three.js sections"
```

---

### Task 7: Restore Contact API Route (Resend)

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Copy back the Resend contact API route**

```bash
mkdir -p src/app/api/contact
cp _migration_backup/src/app/api/contact/route.ts src/app/api/contact/route.ts
```

- [ ] **Step 2: Verify the file is present**

```bash
cat src/app/api/contact/route.ts | head -5
```

Expected: Shows `import { Resend } from "resend"` at the top.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/contact/
git commit -m "chore: restore Resend contact API route"
```

---

### Task 8: Merge Dependencies

**Files:**
- Modify: `package.json` (add landing-specific packages to fresh template)

- [ ] **Step 1: Add landing-specific dependencies to fresh package.json**

Add these to the `"dependencies"` section of `package.json`:

```json
"@fortawesome/fontawesome-svg-core": "^7.2.0",
"@fortawesome/free-brands-svg-icons": "^7.2.0",
"@fortawesome/free-regular-svg-icons": "^7.2.0",
"@fortawesome/free-solid-svg-icons": "^7.2.0",
"@fortawesome/react-fontawesome": "^3.3.0",
"@gsap/react": "^2.1.2",
"@react-three/drei": "^10.7.7",
"@react-three/fiber": "^9.5.0",
"gsap": "^3.14.2",
"resend": "^6.9.4",
```

Note: `three` is a peer dependency of `@react-three/fiber` and should be installed automatically, but if not, add:

```json
"three": "^0.175.0",
```

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/denisduvauchelle/Documents/code/rs-landing
npm install
```

Expected: Installs successfully with no errors. Warnings about peer deps are OK.

- [ ] **Step 3: Commit updated package.json and lockfile**

```bash
git add package.json package-lock.json bun.lock 2>/dev/null
git commit -m "chore: add landing-specific dependencies (GSAP, Three.js, FontAwesome, Resend)"
```

---

### Task 9: Add FontAwesome Config to Root Layout

**Files:**
- Modify: `src/app/layout.tsx` (add FontAwesome CSS import and config)

- [ ] **Step 1: Read the current template root layout**

Read `src/app/layout.tsx` to see the template's version.

- [ ] **Step 2: Add FontAwesome config to root layout**

Add these lines near the top of `src/app/layout.tsx`, before the `globals.css` import:

```tsx
// Font Awesome configuration - prevent FOUC
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
```

- [ ] **Step 3: Add custom metadata to root layout**

Update the `metadata` export in `src/app/layout.tsx` to include the OG/Twitter/favicon metadata from the current project:

```tsx
export const metadata: Metadata = {
	metadataBase: new URL('https://recursive-solutions.com'),
	title: 'Recursive Solutions',
	description: 'Recursive Solutions — Powered by Growth Engine',
	openGraph: {
		images: [{ url: '/social-card-2.png', width: 1200, height: 630 }],
	},
	twitter: {
		card: 'summary_large_image',
		images: ['/social-card-2.png'],
	},
	icons: {
		icon: [
			{ url: '/favicon_io/favicon.ico', sizes: 'any' },
			{ url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
		],
		apple: '/favicon_io/apple-touch-icon.png',
	},
	manifest: '/favicon_io/site.webmanifest',
}
```

- [ ] **Step 4: Add theme initialization script to head**

Ensure the root layout's `<html>` tag includes the theme detection script:

```tsx
<head>
	<script dangerouslySetInnerHTML={{ __html: `
		(function() {
			var stored = localStorage.getItem('theme');
			var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
			document.documentElement.setAttribute('data-theme', theme);
		})();
	` }} />
</head>
```

- [ ] **Step 5: Commit root layout changes**

```bash
git add src/app/layout.tsx
git commit -m "feat: add FontAwesome config, custom metadata, and theme init to root layout"
```

---

### Task 10: Restore ThemeLogo Component

**Files:**
- Copy: `_migration_backup/src/components/layout/ThemeLogo.tsx` -> `src/components/layout/ThemeLogo.tsx`

The template's Header/Footer may reference different branding. We need the ThemeLogo component if the template doesn't include it.

- [ ] **Step 1: Check if template has ThemeLogo**

```bash
ls src/components/layout/ThemeLogo.tsx 2>/dev/null || echo "NOT FOUND"
```

- [ ] **Step 2: Copy ThemeLogo if missing**

If not found:

```bash
cp _migration_backup/src/components/layout/ThemeLogo.tsx src/components/layout/ThemeLogo.tsx
```

- [ ] **Step 3: Commit if copied**

```bash
git add src/components/layout/ThemeLogo.tsx 2>/dev/null
git diff --cached --quiet || git commit -m "chore: restore ThemeLogo component"
```

---

### Task 11: Merge Environment Variables

**Files:**
- Modify: `.env.local` (merge current values into template's .env.local)

- [ ] **Step 1: Update .env.local with current project values**

Write `.env.local` combining the template's structure with the current values:

```bash
BRAIN_API_URL=http://localhost:3000
BRAIN_API_KEY=REPLACE
TURSO_DATABASE_URL=REPLACE
TURSO_AUTH_TOKEN=REPLACE

# Resend (contact form)
RESEND_API_KEY=re_ZU468PgE_Pkve42UiG8xxFmN4sALrW87h
CONTACT_EMAIL=denis@recursive-solutions.com

# i18n (optional — English-only if omitted)
# DEFAULT_LANGUAGE=en
# ADDITIONAL_LANGUAGES=fr,es,de

# Google Analytics (optional)
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL for sitemaps/robots (optional)
# SITE_URL=https://recursive-solutions.com
```

Note: `.env.local` is gitignored, so no commit needed.

---

### Task 12: Merge i18n Dictionaries

**Files:**
- Modify: `src/i18n/dictionaries/en.ts` (may need additional keys from current project)
- Modify: `src/i18n/dictionaries/fr.ts` (same)

- [ ] **Step 1: Compare dictionary keys**

Read both `src/i18n/dictionaries/en.ts` (fresh from template) and `_migration_backup/src/i18n/dictionaries/en.ts` (current project). The template should be a superset, but check for any custom keys in the current version that the template is missing.

- [ ] **Step 2: Add any missing keys**

If the current project has keys not in the template (e.g., landing-specific i18n keys), add them to `src/i18n/dictionaries/en.ts` and `src/i18n/dictionaries/fr.ts`.

Based on the current `en.ts`, the keys are standard template keys (nav, hero, features, blog, footer, contact, legal, lang). These should all exist in the fresh template. No custom landing-specific i18n keys are used (the landing sections use hardcoded English text in `data/landing.ts`).

If keys match, no changes needed. If there are differences, merge them.

- [ ] **Step 3: Commit if changed**

```bash
git diff --quiet src/i18n/ || (git add src/i18n/ && git commit -m "chore: merge i18n dictionary keys")
```

---

### Task 13: Update Template Header with Landing Anchor Links

**Files:**
- Modify: `src/components/layout/Header.tsx` (add landing page section links)

- [ ] **Step 1: Read the template Header**

Read `src/components/layout/Header.tsx` to understand its structure.

- [ ] **Step 2: Add anchor links for landing page sections**

The current Navbar has links to `/#services`, `/#process`, `/#work`, and `/contact`. Add these to the template Header's navigation. The exact edit depends on the Header structure, but add links like:

```tsx
<a href="/#services" className="...">Services</a>
<a href="/#process" className="...">Process</a>
<a href="/#work" className="...">Work</a>
```

These should appear alongside the existing nav links (Home, Blog, Contact) in both desktop and mobile menus.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: add landing page section anchor links to Header navigation"
```

---

### Task 14: Build Verification

- [ ] **Step 1: Run the build**

```bash
cd /Users/denisduvauchelle/Documents/code/rs-landing
npm run build
```

Expected: Build completes successfully. Watch for:
- Import errors (missing modules, wrong paths)
- TypeScript errors (type mismatches between old components and new template)
- Missing dependencies

- [ ] **Step 2: Fix any build errors**

Common issues to expect:
- Landing components may import from `@/components/ui` — verify the template's UI components export the same interfaces (Button, TextLink, Card, etc.)
- Landing components may import `@/components/landing/Navbar` or `@/components/landing/AnimatedFooter` from other components — remove these cross-references
- `three` types may need `@types/three` in devDependencies
- If any component uses `ThemeLogo`, verify it exists in `src/components/layout/`

Fix each error, rebuild, repeat until clean.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git diff --cached --quiet || git commit -m "fix: resolve build errors from migration"
```

---

### Task 15: Runtime Verification

- [ ] **Step 1: Start dev server and test all pages**

The dev server should already be running. If not:

```bash
npm run dev
```

Verify these pages load without console errors:
- `/` (landing page with GSAP animations and Three.js hero)
- `/blog` (template blog listing)
- `/contact` (template contact page)
- `/legal` (template legal page)
- `/privacy` (template privacy page)
- `/cookies` (template cookies page)

- [ ] **Step 2: Test landing page interactions**

- Hero section renders with Three.js background
- Scroll animations trigger on each section
- Anchor links from header scroll to correct sections
- Contact CTA links to `/contact`

- [ ] **Step 3: Fix any runtime issues**

Fix CSS conflicts, missing assets, broken animations. Common issues:
- `no-scrollbar` class may need to be defined in `globals.css`
- GSAP ScrollTrigger may conflict with template layout styles
- Three.js canvas sizing with the template's `pt-16` header offset

- [ ] **Step 4: Commit any runtime fixes**

```bash
git add -A
git diff --cached --quiet || git commit -m "fix: resolve runtime issues from migration"
```

---

### Task 16: Forms Setup

- [ ] **Step 1: Run pull-forms to fetch form schemas**

```bash
npm run pull-forms
```

This fetches form definitions from the Brain API and saves them to `src/generated/`. If the Brain API credentials aren't configured yet (BRAIN_API_KEY=REPLACE), this step can be deferred until credentials are set up.

- [ ] **Step 2: Check what was generated**

```bash
ls -la src/generated/
```

- [ ] **Step 3: Integrate forms into contact page (if schemas available)**

If form schemas are available in `src/generated/`, review them and integrate into `src/app/[locale]/contact/page.tsx`. The exact integration depends on the form schema structure from the Brain API.

If no schemas yet (credentials not configured), skip this step — it can be done when credentials are set up.

- [ ] **Step 4: Commit if forms were integrated**

```bash
git diff --quiet || (git add -A && git commit -m "feat: integrate Growth Engine forms into contact page")
```

---

### Task 17: Cleanup

- [ ] **Step 1: Remove migration backup**

```bash
rm -rf _migration_backup
```

- [ ] **Step 2: Remove old archive if present**

```bash
rm -rf _old
```

- [ ] **Step 3: Clean up temp files**

```bash
rm -rf /tmp/create-client-app-repo /tmp/rs-landing-fresh
```

- [ ] **Step 4: Final build check**

```bash
npm run build
```

Expected: Clean build with no errors.

- [ ] **Step 5: Commit cleanup**

```bash
git add -A
git diff --cached --quiet || git commit -m "chore: remove migration backup and old archive"
```

---

## Summary of File Changes

### New from Template
- `src/app/robots.ts` - SEO robots.txt
- `src/app/sitemap.ts` - Dynamic XML sitemap
- `src/instrumentation.ts` - Env validation at startup
- `src/lib/env.ts` - Environment validation with pretty logging
- `src/components/analytics/GoogleAnalytics.tsx` - gtag integration
- `src/generated/.gitkeep` - For form schemas
- `src/components/layout/Header.tsx` - Template header (replaces custom Navbar)
- `src/components/layout/Footer.tsx` - Template footer (replaces AnimatedFooter)

### Restored from Current Project
- `src/components/landing/*` (15 files, excluding Navbar and AnimatedFooter)
- `src/data/landing.ts`
- `src/hooks/useGsap.ts`, `src/hooks/useReducedMotion.ts`
- `src/lib/animation-config.ts`
- `src/app/api/contact/route.ts` (Resend)
- `public/` assets (logos, team photos, landing images, favicons, social card)

### Removed (replaced by template equivalents)
- `src/components/landing/Navbar.tsx` - replaced by `Header.tsx`
- `src/components/landing/AnimatedFooter.tsx` - replaced by `Footer.tsx`
- `_old/` directory
