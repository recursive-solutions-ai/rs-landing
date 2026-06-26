# Borderplate Infrastructure Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate rs-landing to the updated Growth Engine borderplate infrastructure while preserving Recursive Solutions-specific landing pages, tools, assets, and copy.

**Architecture:** Apply the migration incrementally on a feature branch instead of replacing the app wholesale. Start with test tooling and pure routing/SEO helpers, then move from deprecated middleware to `proxy.ts`, then add RSS/forms/authors and merge layout updates without removing custom local routes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, DaisyUI 5, Growth Engine SDK, Vitest.

---

### Task 1: Test Harness And Routing Contract

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Test: `src/i18n/config.unit.test.ts`
- Test: `src/lib/i18n-utils.unit.test.ts`
- Test: `src/lib/sitemap-shared.unit.test.ts`

- [ ] Add `typecheck` and `test` scripts plus `vitest`.
- [ ] Add a Vitest config with `@` mapped to `src`.
- [ ] Add failing tests that assert default locale URLs are bare: `/`, `/blog`, `/contact`.
- [ ] Add failing tests that assert non-default locale URLs keep the prefix: `/fr`, `/fr/blog`.
- [ ] Add failing tests that assert `/en` redirects to `/` and `/en/blog` redirects to `/blog`.
- [ ] Run `npm test -- --run` and confirm these fail before implementation.

### Task 2: Default-Locale-Bare URL Helpers

**Files:**
- Modify: `src/i18n/config.ts`
- Modify: `src/lib/i18n-utils.ts`
- Modify: `src/lib/sitemap-shared.ts`
- Test: `src/i18n/config.unit.test.ts`
- Test: `src/lib/i18n-utils.unit.test.ts`
- Test: `src/lib/sitemap-shared.unit.test.ts`

- [ ] Add `isSupportedLocale(locale)`.
- [ ] Add `localePrefix(locale)`, `localizedPath(path, locale)`, and `defaultLocaleRedirectTarget(pathname, defaultLocale)`.
- [ ] Update `buildUrl(path, locale)` so default locale is bare and secondary locales are prefixed.
- [ ] Run the helper tests and confirm they pass.

### Task 3: Proxy Routing Migration

**Files:**
- Create: `src/proxy.ts`
- Delete: `src/middleware.ts`
- Test: add route helper coverage where feasible

- [ ] Copy the current CORS and locale detection behavior into `src/proxy.ts`.
- [ ] Add default-locale prefix redirects: `/en` to `/`, `/en/blog` to `/blog`.
- [ ] Rewrite single-language bare paths internally to `/{defaultLocale}` without changing the public URL.
- [ ] Remove deprecated `src/middleware.ts`.
- [ ] Run `npm run build` and verify the middleware deprecation warning is gone.

### Task 4: Metadata, Sitemap, And RSS

**Files:**
- Create: `src/lib/seo.ts`
- Create: `src/lib/rss-shared.ts`
- Create: `src/app/rss.xml/route.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/[locale]/blog/page.tsx`
- Modify: `src/app/[locale]/blog/[slug]/page.tsx`
- Modify: `src/app/sitemap.xml/route.ts`
- Modify: `src/app/sitemap/[file]/route.ts`
- Test: `src/lib/rss-shared.unit.test.ts`
- Test: `src/app/sitemap.xml/route.unit.test.ts`
- Test: `src/app/sitemap/[file]/route.unit.test.ts`

- [ ] Add central `buildPageMetadata` while preserving Recursive Solutions title, social card, favicon, and JSON-LD behavior.
- [ ] Update sitemap index and shards to use tested XML renderers.
- [ ] Add RSS feed generation with `X-Robots-Tag: noindex`.
- [ ] Run metadata/sitemap/RSS tests.

### Task 5: Layout And Internal Links

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/components/layout/Header.tsx`
- Create: `src/components/layout/MobileMenu.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/LanguageSwitcher.tsx`
- Test: `src/lib/no-hardcoded-locale-links.unit.test.ts`

- [ ] Keep the Recursive Solutions logo, landing anchor links, CTA, footer text, and existing utility links.
- [ ] Replace hardcoded `/${locale}` URL construction with `localizedPath`.
- [ ] Add invalid-locale guard in `[locale]/layout.tsx` so bogus first path segments return 404.
- [ ] Run hardcoded-link tests.

### Task 6: Growth Engine Pages And Resilience

**Files:**
- Modify: `src/lib/db.ts`
- Create: `src/app/[locale]/forms/page.tsx`
- Create: `src/app/[locale]/forms/[slug]/page.tsx`
- Modify: `src/app/[locale]/contact/page.tsx`
- Create: `src/app/[locale]/contact/ContactAnalytics.tsx`
- Create: `src/app/[locale]/blog/authors/page.tsx`
- Create: `src/app/[locale]/blog/authors/[slug]/page.tsx`
- Create: `src/components/blog/AuthorByline.tsx`
- Create: `src/components/blog/AuthorCard.tsx`
- Create: `src/components/blog/AuthorChips.tsx`
- Modify: `src/i18n/dictionaries/en.ts`
- Modify: `src/i18n/dictionaries/fr.ts`

- [ ] Add `safeQuery` for content reads.
- [ ] Add forms index/detail pages.
- [ ] Convert contact to server-side Growth Engine form rendering.
- [ ] Add blog author listing/detail pages and bylines.
- [ ] Preserve local routes: ROI calculators, customer support, test bot, and landing page.

### Task 7: Final Verification

**Files:**
- All migrated files.

- [ ] Run `npm run typecheck`.
- [ ] Run `npm test -- --run`.
- [ ] Run `npm run build`.
- [ ] Smoke check `/`, `/en`, `/blog`, `/en/blog`, `/rss.xml`, `/sitemap.xml`, `/sitemap/0.xml`, `/contact`, `/forms`.
- [ ] Inspect `git diff --stat` and commit the migration branch.
