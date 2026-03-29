# Fresh Scaffold Migration: rs-landing

**Date:** 2026-03-29
**Goal:** Re-scaffold rs-landing from create-client-app to get bug fixes, updated dependencies, and new features (forms, analytics, SEO) while preserving the custom landing page.

---

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Migration approach | Scaffold fresh, migrate back | Clean base, guaranteed no stale config |
| Utility pages (blog, contact, legal, privacy, cookies) | Use new template versions | Get latest SDK patterns and bug fixes |
| Landing page | Preserve all custom components | Heavy GSAP/Three.js investment, works well |
| Nav/Footer | Use template's Header/Footer everywhere | Consistent layout, landing sections adapt to template layout |
| Contact form | Keep Resend + add Growth Engine forms | Resend as backup, forms as primary |

---

## What Gets Preserved (from current project)

### Landing Components (`src/components/landing/`)
All 18 files migrate back:
- HeroSection, HeroBackground (Three.js WebGL)
- Navbar (will be removed - using template Header instead)
- AnimatedFooter (will be removed - using template Footer instead)
- TargetMarketSection, ServicesSection, ServiceCard
- ProcessSection, CaseStudiesSection, CaseStudyCard
- TeamSection, ContactCTASection
- SectionHeading, AnimatedText, ScrollReveal, GradientText

### Data & Config
- `src/data/landing.ts` - service items, process steps, outcomes, team members

### Hooks & Libraries
- `src/hooks/useGsap.ts` - GSAP animation hook
- `src/hooks/useReducedMotion.ts` - accessibility hook
- `src/lib/animation-config.ts` - centralized GSAP constants

### Public Assets
- Team photos: `denis.jpg`, `jake.jpg`
- Landing images: `public/landing/*.jpeg` (6 images)
- Logos: all logo variants (horizontal/vertical, light/dark)
- Favicons: `public/favicon_io/` directory
- Social card: OG image

### Environment Variables
- All existing `.env.local` values carry over
- Template adds: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional), `SITE_URL` (optional)

---

## What Gets Replaced (from template)

### Config Files
- `package.json` - fresh from template + landing deps added back
- `next.config.ts` - template version
- `tsconfig.json` - template version
- `postcss.config.mjs` - template version
- `.env.example` - template version (superset of current)

### New Files from Template
- `src/app/robots.ts` - SEO robots.txt generation
- `src/app/sitemap.ts` - dynamic XML sitemap with i18n
- `src/instrumentation.ts` - server-side env validation at startup
- `src/lib/env.ts` - environment validation with pretty logging
- `src/components/analytics/GoogleAnalytics.tsx` - gtag integration
- `src/generated/.gitkeep` - for pulled form schemas

### Pages (all use template versions)
- `src/app/[locale]/blog/` - blog listing + slug pages
- `src/app/[locale]/contact/page.tsx` - template contact + forms integration
- `src/app/[locale]/legal/page.tsx` - template legal
- `src/app/[locale]/privacy/page.tsx` - template privacy
- `src/app/[locale]/cookies/page.tsx` - template cookies

### Layouts
- `src/app/layout.tsx` - template root layout (GrowthEngineProvider + GoogleAnalytics)
- `src/app/[locale]/layout.tsx` - template locale layout (Header + Footer)

### Components (template versions)
- `src/components/layout/Header.tsx` - template header with mobile menu
- `src/components/layout/Footer.tsx` - template 3-column footer
- `src/components/layout/LanguageSwitcher.tsx`
- `src/components/layout/ThemeToggle.tsx`
- `src/components/ui/*` - template UI components
- `src/components/blog/*` - template blog components
- `src/components/config/ConfigDisplay.tsx`

### API Routes
- `src/app/api/rs/[...route]/route.ts` - template SDK handler
- `src/app/api/contact/route.ts` - keep existing Resend route

### i18n
- `src/i18n/` - template i18n setup (structurally similar, may have fixes)
- `src/middleware.ts` - template middleware (adds CORS protection)

---

## Additional Dependencies to Add Back

These are NOT in the template and must be added to the fresh `package.json`:

```
gsap @gsap/react                          # GSAP animations
@react-three/fiber @react-three/drei three # Three.js WebGL hero
@fortawesome/fontawesome-svg-core          # FontAwesome icons
@fortawesome/free-solid-svg-icons
@fortawesome/free-regular-svg-icons
@fortawesome/free-brands-svg-icons
@fortawesome/react-fontawesome
resend                                     # Email service (contact backup)
```

---

## Landing Page Adaptation

The current locale layout (`src/app/[locale]/layout.tsx`) uses the custom Navbar and AnimatedFooter. The landing page itself (`page.tsx`) only renders section components. The template will replace the entire locale layout with its own Header/Footer.

What needs to happen:
1. **The locale layout gets replaced** by the template version (Header + Footer instead of Navbar + AnimatedFooter)
2. **Landing page.tsx stays as-is** - it only imports section components, no nav/footer
3. **Verify hero spacing** - the template layout uses `pt-16` for the fixed header; confirm the hero section accounts for this (current layout already does this)
4. **Custom footer content** (anchor links to Services, Process, Work, etc.) needs to be added to the template Footer or Header
5. **AnimatedFooter** component is no longer needed (it was a wrapper for footer animation); the template Footer is static
6. **Navbar** component is no longer needed; the template Header handles navigation including mobile menu

---

## Forms Integration (Contact Page)

1. Run `npm run pull-forms` after scaffold to fetch form schemas from Brain API
2. Form schemas land in `src/generated/`
3. Template contact page will display business config (hours, contact info)
4. Add forms rendering to contact page using pulled schemas
5. Form submissions go through `/api/rs/[...route]` to Brain API (sales pipeline)
6. Keep `src/app/api/contact/route.ts` (Resend) as fallback/notification mechanism

---

## Phase Plan

### Phase 1: Backup
- Copy `src/` to `_migration_backup/src/`
- Copy `public/` to `_migration_backup/public/`
- Copy key configs to `_migration_backup/` (package.json, next.config.ts, .env.local, middleware.ts)

### Phase 2: Scaffold
- Run create-client-app in `/tmp/rs-landing-fresh/`
- Copy scaffold output into project root (excluding .git, node_modules, .claude)

### Phase 3: Restore Landing
- Copy back landing components (minus Navbar, AnimatedFooter)
- Copy back data files, hooks, animation libraries
- Copy back public assets (images, logos, favicons)
- Copy back the contact API route (Resend)

### Phase 4: Merge Dependencies
- Add landing-specific packages to fresh package.json
- Run `npm install` (or `bun install`)

### Phase 5: Adapt Landing Page
- Update `src/app/[locale]/page.tsx` to remove own nav/footer, keep sections
- Add FontAwesome config to root layout
- Merge i18n dictionaries (template keys + any custom landing keys)
- Update template Header with landing page anchor links

### Phase 6: Forms Setup
- Run `pull-forms` to fetch form schemas
- Integrate forms into contact page

### Phase 7: Verify & Cleanup
- Build passes (`npm run build`)
- All pages render correctly
- Landing animations work
- Blog, contact, legal pages work
- Remove `_migration_backup/` and `_old/`
