# Backlog

### Local dev: /api/rs/* routes 500 with "Cannot find module '@growth-engine/sdk-server'"
- **Kind:** bug · **Severity:** high
- **Found:** 2026-10-23, while previewing the Lucy V2 homepage on `npm run dev -- -p 3100`
- **Decision needed:** none, but needs diagnosis
- **Context:** `GET /api/rs/sdk-status` and `GET /api/rs/config` return 500 in dev. The dev terminal shows `Error: Cannot find module '@growth-engine/sdk-server'` from `.next/dev/server/app/api/rs/[...route]/route.js`. The package is installed at `node_modules/@growth-engine/sdk-server` (v0.1.95 via github) and is listed in `serverExternalPackages` in `/Users/denisduvauchelle/Documents/code/rs-clients/rs-landing/next.config.ts`. Pages that import it (e.g. /blog) work, so only the route handler fails to resolve it. Effect: `useBusinessConfig` gets no config (contact page shows no hours) and SDK form submits / tracking through /api/rs likely fail locally. Check whether prod is affected, then whether the package needs a `main`/`exports` entry that Turbopack's external require can resolve.

### Blog content links to https://www.recursive-solutions.com/en#contact
- **Kind:** bug · **Severity:** med
- **Found:** 2026-10-23, while moving all contact links to the new /contact page
- **Decision needed:** none
- **Context:** The /blog page HTML contains a "Book a call" link to `https://www.recursive-solutions.com/en#contact`. It comes from blog post content in the Growth Engine DB, not from `src`. The homepage no longer has a `#contact` section, and `/en` is no longer the canonical prefix. Update the content to `https://www.recursive-solutions.com/contact`, or normalise it in the blog markdown link normaliser.
