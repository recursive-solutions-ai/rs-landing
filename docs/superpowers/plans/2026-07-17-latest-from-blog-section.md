# Latest from the Blog Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Latest from the Blog" section to the bottom of the landing page showing the 3 newest blog posts as image cards, with a text-only "View all →" link to the blog index.

**Architecture:** A server component (the existing landing page) fetches the 3 newest posts via the Growth Engine SDK and passes a minimal serialized subset to a new client section component, which renders a header row (heading + "View all" link) and a 3-up grid of card components. The section renders nothing when there are zero posts, so no-env/local builds degrade cleanly.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript strict, Tailwind 4, DaisyUI 5, `@growth-engine/sdk-server` (`getBlogPosts`), npm (not bun).

## Global Constraints

- Package manager: **npm** (`npm run build`, `npx tsc --noEmit`). `npm run lint` is broken in this repo — do NOT rely on it.
- No em dashes in any copy, comments, or commit messages. Use commas/periods/parentheses.
- Client landing sections hardcode English copy (match `FieldReportsSection`, `ContactCTASection`). Do NOT add i18n dictionary keys for this feature.
- Use `<img>` with `{/* eslint-disable-next-line @next/next/no-img-element */}` for remote blog hero images, exactly as `src/app/[locale]/blog/[slug]/page.tsx` does. Do NOT introduce `next/image` (remote GCS host is not configured in `next.config.ts`).
- Reveal animation convention: `useInView` hook from `@/hooks/useInView` + `reveal` / `reveal-in` CSS classes + `--reveal-delay` CSS var (see `FieldReportsSection`).
- Match existing card chrome from `ServiceCard`: `rounded-2xl border border-base-300 bg-base-100`, hover lift.
- No unit tests: the two new files are presentational client components and the repo has no component-render test harness (only pure-logic `*.unit.test.ts`). Verification is `npm run build` + `npx tsc --noEmit` + a live browser check, per the spec.

---

### Task 1: Blog teaser card component

**Files:**
- Create: `src/components/landing/BlogTeaserCard.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks. Uses `formatDate` from `@/lib/i18n-utils` (signature `formatDate(date: Date | string, locale?: string): string`) and `cn` from `@/lib/utils`.
- Produces:
  - `export interface BlogTeaser { slug: string; title: string; heroImageUrl: string | null; seoDesc: string | null; createdAt: string | Date }`
  - `export function BlogTeaserCard(props: { post: BlogTeaser; locale: string; index: number }): JSX.Element`

- [ ] **Step 1: Create the component file**

Create `src/components/landing/BlogTeaserCard.tsx` with the exact content:

```tsx
"use client"

import type { CSSProperties } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

export interface BlogTeaser {
	slug: string
	title: string
	heroImageUrl: string | null
	seoDesc: string | null
	createdAt: string | Date
}

interface BlogTeaserCardProps {
	post: BlogTeaser
	locale: string
	index: number
}

export function BlogTeaserCard({ post, locale, index }: BlogTeaserCardProps) {
	return (
		<Link
			href={`/${locale}/blog/${post.slug}`}
			className={cn(
				"reveal group flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100",
				"transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
			)}
			style={{ "--reveal-delay": `${0.1 + index * 0.1}s` } as CSSProperties}
		>
			{/* Hero image (or neutral placeholder when a post has none) */}
			<div className="aspect-video overflow-hidden bg-base-200">
				{post.heroImageUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={post.heroImageUrl}
						alt={post.title}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="h-full w-full bg-gradient-to-br from-base-200 to-base-300" />
				)}
			</div>

			{/* Body */}
			<div className="flex flex-1 flex-col p-6">
				<time className="text-sm text-base-content/50">
					{formatDate(post.createdAt, locale)}
				</time>
				<h3 className="mt-2 line-clamp-2 text-lg font-bold text-base-content">
					{post.title}
				</h3>
				{post.seoDesc && (
					<p className="mt-3 line-clamp-3 text-base leading-relaxed text-base-content/60">
						{post.seoDesc}
					</p>
				)}
			</div>
		</Link>
	)
}
```

- [ ] **Step 2: Typecheck the new file**

Run: `npx tsc --noEmit`
Expected: PASS (no errors). If it reports an error about `--reveal-delay` on `style`, confirm the `as CSSProperties` cast is present (it is in the code above).

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/BlogTeaserCard.tsx
git commit -m "feat(blog): add BlogTeaserCard for landing teaser section"
```

---

### Task 2: Latest-from-blog section component

**Files:**
- Create: `src/components/landing/LatestBlogSection.tsx`

**Interfaces:**
- Consumes: `BlogTeaser` and `BlogTeaserCard` from Task 1 (`import { BlogTeaserCard, type BlogTeaser } from "./BlogTeaserCard"`). Uses `useInView` from `@/hooks/useInView` and `cn` from `@/lib/utils`.
- Produces: `export function LatestBlogSection(props: { posts: BlogTeaser[]; locale: string }): JSX.Element | null`

- [ ] **Step 1: Create the component file**

Create `src/components/landing/LatestBlogSection.tsx` with the exact content:

```tsx
"use client"

import Link from "next/link"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { BlogTeaserCard, type BlogTeaser } from "./BlogTeaserCard"

interface LatestBlogSectionProps {
	posts: BlogTeaser[]
	locale: string
}

export function LatestBlogSection({ posts, locale }: LatestBlogSectionProps) {
	const { ref, inView } = useInView<HTMLElement>()

	// Nothing to show (no posts, or Turso unconfigured) — render nothing so the
	// landing page never shows an empty row above the footer.
	if (posts.length === 0) return null

	return (
		<section
			ref={ref}
			id="latest-blog"
			className={cn("mx-auto max-w-7xl px-6 py-16", inView && "reveal-in")}
		>
			{/* Header row: heading left, text-only "View all" link right */}
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div className="reveal">
					<span className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
						<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
						From the Blog
					</span>
					<h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-base-content md:text-4xl">
						Latest from the Blog
					</h2>
				</div>
				<Link
					href={`/${locale}/blog`}
					className="reveal text-sm font-semibold text-primary transition-colors hover:underline"
				>
					View all →
				</Link>
			</div>

			{/* Cards */}
			<div className="mt-12 grid gap-6 md:grid-cols-3">
				{posts.map((post, i) => (
					<BlogTeaserCard
						key={post.slug}
						post={post}
						locale={locale}
						index={i}
					/>
				))}
			</div>
		</section>
	)
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS (no errors).

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/LatestBlogSection.tsx
git commit -m "feat(blog): add LatestBlogSection landing section"
```

---

### Task 3: Wire the section into the landing page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `LatestBlogSection` + `BlogTeaser` from Task 2. `getBlogPosts` from `@growth-engine/sdk-server`, `getDbOrNull` from `@/lib/db`.
- Produces: nothing (terminal wiring).

- [ ] **Step 1: Add imports**

In `src/app/[locale]/page.tsx`, add these imports alongside the existing landing-section imports (after the `ContactCTASection` import line):

```tsx
import { LatestBlogSection } from "@/components/landing/LatestBlogSection"
import type { BlogTeaser } from "@/components/landing/BlogTeaserCard"
```

And add these below the existing `import { getForm } from "@/lib/forms-server"` line:

```tsx
import { getBlogPosts } from "@growth-engine/sdk-server"
import { getDbOrNull } from "@/lib/db"
```

- [ ] **Step 2: Fetch the 3 newest posts in the page component**

Inside `LandingPage`, after the existing line `const contactForm = await getForm("general-contact-form")`, add:

```tsx
	const db = getDbOrNull()
	const rawPosts = db ? await getBlogPosts(db, { locale, limit: 3 }) : []
	// Serialize only the fields the teaser cards use before crossing to the
	// client component.
	const latestPosts: BlogTeaser[] = rawPosts.map((post) => ({
		slug: post.slug,
		title: post.title,
		heroImageUrl: post.heroImageUrl ?? null,
		seoDesc: post.seoDesc ?? null,
		createdAt: post.createdAt,
	}))
```

- [ ] **Step 3: Render the section as the last child**

In the returned JSX, add `<LatestBlogSection>` immediately after `<ContactCTASection form={contactForm} />` and before the closing `</div>`:

```tsx
			<ContactCTASection form={contactForm} />
			<LatestBlogSection posts={latestPosts} locale={locale} />
		</div>
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS. If `post.createdAt` / `post.heroImageUrl` / `post.seoDesc` report type errors (the `BlogPost` type from `@growth-engine/types` may not resolve — see the existing comment in `blog/[slug]/page.tsx`), the `.map` callback param will be `any` or a resolved type; either way the property reads compile. If a genuine "property does not exist" surfaces, inspect one post at runtime in Step 6 to confirm the real field names and adjust the mapping.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build completes successfully, no type or lint errors that fail the build.

- [ ] **Step 6: Live verification**

Start the dev server (`npm run dev`) and open the landing page (`/en`). Confirm, via browser or Playwright:
1. A "Latest from the Blog" section appears at the bottom, directly above the footer.
2. It shows up to 3 cards, newest first, each with a hero image (or placeholder), a localized date, a title, and a brief description.
3. The "View all →" link (top-right of the section) navigates to `/en/blog`.
4. Clicking a card navigates to `/en/blog/<slug>` and loads the post.

If Turso env is not set locally, the section will correctly render nothing — verify against a build/environment that has `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` (or confirm the empty-state behavior is acceptable and defer the populated check to a preview deploy).

- [ ] **Step 7: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat(blog): show 3 newest posts on landing page above footer"
```

---

## Self-Review

**Spec coverage:**
- Section at bottom above footer → Task 3, Step 3 (last child; layout renders Footer after children). ✓
- 3 newest posts as image cards with date/title/brief description → Task 1 (card) + Task 3 (`limit: 3`). ✓
- Text-only "View all →" link on the right → Task 2 (header row, `flex justify-between`, no `btn` class). ✓
- Server-side fetch matching blog page pattern → Task 3, Step 2 (`getDbOrNull` + `getBlogPosts`). ✓
- Graceful degradation (show what exists, hide at zero) → Task 2, Step 1 (`if (posts.length === 0) return null`) + Task 3 empty array when no db. ✓
- Hardcoded English copy, no i18n keys → Task 2 (hardcoded strings), Global Constraints. ✓
- `<img>` with eslint-disable, no next/image → Task 1, Global Constraints. ✓
- Placeholder for null hero image → Task 1, Step 1 (gradient div branch). ✓
- Newest-first ordering confirmed against live data → Task 3, Step 6. ✓

**Placeholder scan:** No TBD/TODO/"handle edge cases" — all code is concrete. ✓

**Type consistency:** `BlogTeaser` defined in Task 1, imported by Tasks 2 and 3 with the same field names (`slug`, `title`, `heroImageUrl`, `seoDesc`, `createdAt`). `BlogTeaserCard` prop shape (`post`, `locale`, `index`) matches its call site in Task 2. `LatestBlogSection` prop shape (`posts`, `locale`) matches its call site in Task 3. ✓
