# Robots + Sitemap Bug Summary (Next.js 16 + i18n + Pagination)

## Bug 1: `/sitemap.xml` caught by `[locale]` dynamic route

**Cause:** Used Next.js metadata convention `src/app/sitemap.ts` with `generateSitemaps`. In Next.js 16 + Turbopack, this registers per-batch routes at `/sitemap/<id>.xml` but does **not** auto-create `/sitemap.xml` index. With `app/[locale]/page.tsx` present, the `[locale]` dynamic segment catches `/sitemap.xml` (treats "sitemap.xml" as a locale value) → renders the landing page with `x-matched-path: /[locale]`.

**Symptom:** `https://site.com/sitemap.xml` returns HTML landing page, 200 OK, `content-type: text/html`.

**Fix:** Ditch metadata convention. Use manual route handlers:
- `src/app/sitemap.xml/route.ts` → sitemap index (`<sitemapindex>`)
- `src/app/sitemap/[file]/route.ts` → per-batch `<urlset>`, parses `file` param matching `\d+\.xml`

## Bug 2: Route + metadata conflict on rename attempt

**Cause:** Tried adding `src/app/sitemap.xml/route.ts` while metadata `src/app/sitemap.ts` was still present. Next.js 16 errors at build:

```
Conflicting route and metadata at /sitemap.xml: route at /sitemap.xml/route and metadata at /sitemap.xml/route
```

**Fix:** Delete `src/app/sitemap.ts` entirely. Metadata file and route handler cannot coexist at the same URL.

## Bug 3: Middleware would intercept sitemap URLs

**Cause:** App router middleware doing locale rewriting. Without exclusions, `/sitemap.xml` and `/sitemap/0.xml` get rewritten to `/<locale>/sitemap.xml` → 404.

**Fix:** Two layers of protection in `middleware.ts`:

1. Matcher excludes `.xml` / `.txt` extensions:
   ```ts
   matcher: [
     '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|woff|woff2|ttf|eot|mp4|webm|json|xml|txt)$).*)',
   ],
   ```
2. Belt-and-suspenders inside the handler:
   ```ts
   const SKIP_PREFIXES = ['/_next/', '/sitemap']
   const SKIP_PATHS = ['/favicon.ico', '/sitemap.xml', '/robots.txt']
   ```

## Bug 4 (latent): `robots.ts` advertised a broken URL

**Cause:** `robots.ts` pointed `sitemap:` at `/sitemap.xml`, which fell through to the landing page → crawlers never discovered any sitemap.

**Fix:** Once the index route works, robots stays pointed at `/sitemap.xml`. Verify after deploy.

## Pagination architecture (keeper for boilerplate)

**Shape:**

- Shared lib `src/lib/sitemap-shared.ts` owns:
  - `SITE_URL` resolution (env → Vercel → localhost)
  - `BLOG_BATCH_SIZE` (1000; Google hard cap is 50k URLs per sitemap)
  - `fetchBlogCount()` → total content count via internal API
  - `getBlogSitemapCount(total)` → `max(1, ceil(total / BATCH))`
  - `buildStaticEntries()` → ID 0 sitemap (homepage, contact, legal, etc.) with hreflang alternates
  - `buildBlogEntries(batchId)` → fetches a batch across all locales, groups by `parentPostId` for hreflang, emits one entry per slug
  - `renderSitemapXml(entries)` → manual XML serializer with XML-escape

**Index route** (`src/app/sitemap.xml/route.ts`):

- Computes `[0, 1, ..., N]` where N = blog batch count
- Emits `<sitemapindex>` pointing at `/sitemap/0.xml` … `/sitemap/N.xml`
- ID 0 reserved for static pages

**Batch route** (`src/app/sitemap/[file]/route.ts`):

- Validates `file` matches `^(\d+)\.xml$`
- 404s if `id < 0` or `id > blogSitemapCount`
- `id === 0` → static entries; otherwise → blog batch at `offset = (id - 1) * BATCH`

**Both routes:** `export const revalidate = 3600` + `Cache-Control: public, max-age=0, s-maxage=3600, must-revalidate`.

## Gotchas for boilerplate

1. **Don't use `app/sitemap.ts` metadata convention if** you have an `[locale]` (or any dynamic) segment at app root AND you want pagination. The auto-generated index doesn't reliably exist in Next.js 16; the dynamic route wins.
2. **`SITE_URL` env required in prod.** Self-fetch (`${SITE_URL}/api/...`) breaks if it resolves to `localhost:3000` at build/runtime.
3. **Self-fetch at build can deadlock.** Routes that fetch their own API during SSG fail. Using `revalidate = 3600` + on-demand rendering avoids this. `/sitemap.xml` was static-rendered in the build output — works because the content API is cached/idempotent. If self-fetch fails: `fetchBlogCount()` returns 0 → still emits 1 batch sitemap, no crash.
4. **Dynamic segment with extension:** `app/sitemap/[file]/route.ts` matches `/sitemap/0.xml` with `file="0.xml"`. Dots in dynamic params work in Next.js 16.
5. **XML escaping:** Manual `renderSitemapXml` must escape `& < > " '` in URLs (query strings, slugs with special chars).
6. **hreflang alternates:** Group translated posts by `parentPostId`. Emit one `<url>` per slug with `<xhtml:link rel="alternate" hreflang="..." />` siblings. Namespace `xmlns:xhtml="http://www.w3.org/1999/xhtml"` on `<urlset>`.
7. **Middleware Next.js 16 deprecation:** Build warns `"middleware" file convention is deprecated. Please use "proxy" instead.` Rename `middleware.ts` → `proxy.ts` in the next refactor.

## File checklist for boilerplate

```
src/app/robots.ts                → metadata, points at /sitemap.xml
src/app/sitemap.xml/route.ts     → index
src/app/sitemap/[file]/route.ts  → batches
src/lib/sitemap-shared.ts        → shared logic
src/middleware.ts                → matcher excludes .xml/.txt + SKIP_PATHS
```
