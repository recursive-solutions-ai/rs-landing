# Design: "Latest from the Blog" landing section

**Date:** 2026-07-17
**Status:** Approved

## Goal

Add a "Latest from the Blog" section to the bottom of the landing page (above the
footer) that shows the site's 3 newest published blog posts as image cards, each
with a hero image, date, title, and brief description. A text-only "View all →"
link sits on the right of the section header and navigates to the blog index.

Reference layout: the same-platform site at
`https://client-road-map-tax-teal.vercel.app/en` (Growth Engine tenant), bottom
section.

## Data flow

- The landing page (`src/app/[locale]/page.tsx`) is already an `async` server
  component. It fetches the newest posts server-side, exactly like
  `src/app/[locale]/blog/page.tsx`:

  ```ts
  const db = getDbOrNull()
  const posts = db ? await getBlogPosts(db, { locale, limit: 3 }) : []
  ```

- `getBlogPosts` returns posts already ordered newest-first (the blog index and
  related-posts UI rely on this order). Passing `limit: 3` takes the three newest.
  Order will be confirmed against live data at verification time rather than
  assumed.
- Each post supplies the `BlogCardProps` shape confirmed from
  `@growth-engine/sdk-client`: `slug`, `title`, `heroImageUrl`, `seoDesc`,
  `createdAt`. These are all we need.

### Graceful degradation (sparse data)

- `db` is null when Turso env vars are absent (local/no-env builds) → `posts` is
  `[]`.
- The section renders **whatever exists**: 1 or 2 cards if that's all there is.
- The section renders **nothing** (returns `null`) when there are **zero** posts.
  This mirrors how `blog/page.tsx` already tolerates a null db and keeps the
  landing page from ever showing an empty/broken row.

## Components

Two new files under `src/components/landing/`, both matching existing section
conventions (`"use client"`, `useInView` reveal animation, DaisyUI/Tailwind
tokens like `base-100`, `base-300`, `primary`).

### 1. `LatestBlogSection.tsx` (client component)

Props: `{ posts: BlogTeaser[]; locale: string }` where `BlogTeaser` is the subset
`{ slug, title, heroImageUrl, seoDesc, createdAt }`.

- Returns `null` when `posts.length === 0`.
- Uses `useInView` + `reveal` / `reveal-in` classes like `FieldReportsSection`.
- **Header row:** `flex items-center justify-between` —
  - Left: heading `Latest from the Blog` (hardcoded English, matching how
    `FieldReportsSection` / `ContactCTASection` hardcode copy). Styled with the
    same eyebrow + `font-display` heading treatment used elsewhere, scaled to a
    section sub-heading.
  - Right: a Next `Link` to `/${locale}/blog` reading `View all →`, **text-only**
    (no `btn` chrome): `text-sm font-semibold text-primary hover:underline`.
- **Cards grid:** `grid gap-6 md:grid-cols-3`, one `BlogTeaserCard` per post,
  with staggered `--reveal-delay` like the other sections.
- Section wrapper matches page rhythm: `mx-auto max-w-7xl px-6 py-16`.

### 2. `BlogTeaserCard.tsx` (client component)

Props: `{ post: BlogTeaser; locale: string; index: number }`.

- Whole card is a Next `Link` → `/${locale}/blog/${post.slug}`.
- **Hero image:** `aspect-video overflow-hidden rounded-t-2xl` figure containing a
  plain `<img>` (`w-full h-full object-cover`, with the same
  `eslint-disable-next-line @next/next/no-img-element` used in
  `blog/[slug]/page.tsx`). When `heroImageUrl` is null, render a neutral
  `bg-base-200` gradient placeholder of the same aspect ratio instead.
- **Body:** padded `p-6`:
  - Date: `formatDate(post.createdAt, locale)` — small, muted
    (`text-sm text-base-content/50`). This is the one string that localizes.
  - Title: bold, `line-clamp-2`.
  - Description: `post.seoDesc`, muted, `line-clamp-3`.
- Card chrome matches `ServiceCard`: `rounded-2xl border border-base-300
  bg-base-100`, hover lift (`hover:-translate-y-1`) + primary shadow, `transition`.

## Wiring

In `src/app/[locale]/page.tsx`:

1. Import `getBlogPosts` from `@growth-engine/sdk-server` and `getDbOrNull` from
   `@/lib/db` (and keep existing imports).
2. Fetch the 3 newest posts alongside the existing `getForm` call.
3. Import `LatestBlogSection` and render it as the **last** child of the returned
   `<div>`, after `<ContactCTASection>`. The layout renders `<Footer />` after
   `{children}`, so this places the section directly above the footer.

Map each SDK post to the `BlogTeaser` subset before passing to the client
component (only serialize the fields the card uses).

## Decisions

- **i18n:** hardcode the English strings "Latest from the Blog" and "View all →".
  Matches sibling landing sections. (The blog *page* uses `t(dict, ...)`; the
  landing sections do not. Revisit only if translation is later required.)
- **Sparse data:** show what exists, hide entirely at zero.

## Out of scope

- No dictionary keys added.
- No changes to the blog index or post-detail pages.
- No new blog data fields or SDK changes.

## Testing / verification

- `npm run build` succeeds.
- `npx tsc --noEmit` clean. (`npm run lint` is known-broken in this repo; skip it.)
- Live check: run the dev server and confirm via browser/Playwright that the
  section renders above the footer, shows 3 newest posts with images + brief
  descriptions, "View all →" navigates to `/[locale]/blog`, and each card
  navigates to its post. Confirm newest-first ordering against live data.
