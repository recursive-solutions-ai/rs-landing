# TEAM_DECISIONS.md — open calls before launch

*2026-07-04 · follows the pre-deploy review + hardening sweep (commit `5014504`, live on the
team-review link). Everything code-level from that review is already fixed — what's left is
either a decision or post-decision wiring. Nothing here blocks reviewing the current site.*

## Launch decisions

1. **Production home & deploy path.** `rs-landing-kyle` on Vercel is a review sandbox, not the
   prod home. Decide: which Vercel team/project hosts production, and whether deploys stay
   CLI-only or move to a git remote + CI.
2. **Git remote.** The repo is local-only on Kyle's machine (100+ commits, no backup). Decide the
   remote: Kyle's GitHub vs the `recursive-solutions-ai` org (note: this repo was deliberately
   detached from the org's original `rs-landing`). Push before launch regardless.
3. **Domain form: `www` vs apex.** `public/llms.txt` hardcodes `www.recursive-solutions.com`.
   Whatever is chosen, three things must agree: the `SITE_URL` env var, the Vercel domain
   attachment, and llms.txt.
4. **Google Analytics at launch: on or dark.** The cookie policy promises analytics cookies are
   consent-gated, but `GoogleAnalytics.tsx` loads GA unconditionally whenever
   `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. Options: (a) launch with GA unset — code is then
   truthful as-is; (b) add a consent banner before enabling GA; (c) reword the cookie policy.
   A French locale ships in the codebase, so EU exposure isn't hypothetical.
5. **Blog at launch.** Turso will have zero posts. The blog is in the sitemap and llms.txt but
   not nav-linked. Keep advertising an empty `/blog` to crawlers, or pull it from the sitemap
   until the first posts exist?
6. **French locale.** A full `fr` dictionary ships, but landing copy is hardcoded English and
   `<html lang="en">` is fixed in the root layout. Recommendation: launch single-language
   (leave `ADDITIONAL_LANGUAGES` unset); enabling fr today would serve English copy on `/fr`
   with the wrong `lang` attribute.

## Content & brand sign-offs

7. **Client logos.** The CredibilityBar shows **HCCI** and **Roadmap Tax**. Confirm both clients
   approved logo use on a public marketing site.
8. **The consult promise.** The contact CTA commits to a "Website Analysis Report" delivered in a
   30-minute consult. Confirm the team can actually deliver that at launch volume, or soften the
   copy.
9. **Nav label "System" vs the glossary.** `CONTEXT.md` says customer-facing labels always say
   "Lucy", never "(the) System" — but the header nav labels the `/lucy` page **"System"**.
   Deliberate company-first reposition choice, or drift? Pick one and update CONTEXT.md or the nav.
10. **Privacy policy §4 accuracy.** It names **Resend** as the form processor; submissions
    actually flow through the Brain / Growth Engine now. Legal copy edit — needs sign-off, not
    just a code change.
11. **ROI calculator.** Seven routes of internal design concepts ("pick a winner"), currently
    noindexed. Decide: productize one concept, or delete the routes.
12. **/contact page shape.** The page renders only Brain-sourced business hours/info — no form
    (the real form lives in the CTA sections on `/` and `/lucy`). If that's intended, the
    business config must be populated in prod or the page shows a heading and nothing else.

## Post-decision wiring (no debate needed, just sequencing)

- Set `SITE_URL` + `BRAIN_API_URL` + `BRAIN_API_KEY` + `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`
  in the production Vercel project **before** the production build (canonicals/OG/sitemap bake
  from SITE_URL; the contact form — the site's one conversion action — fails at submit without
  the Brain vars, and nothing fails loudly).
- One **real test form submission** as the post-launch smoke test.
- `sameAs: []` in `src/lib/seo-config.ts` — add LinkedIn/social URLs for knowledge-graph
  disambiguation.
- Housekeeping: decide keep-or-delete for the design artifacts still in the repo (root
  screenshots, `lanidng-animation/` mockups, `docs/superpowers/`), and the ~1,400 lines of
  verified-dead components (list in the 2026-07-04 review) whenever a cleanup pass happens.
  (`resend` removed 2026-07-05, commit `8246c12`.)
- Known audit finding, not launch-blocking: `npm audit` flags drizzle-orm <0.45.2 (SQL
  injection via attacker-controlled identifiers) inside the vendored `@growth-engine/sdk-server`.
  Not exploitable here (the SDK only runs its own hardcoded blog queries), but the fix is a
  drizzle bump in the Growth Engine SDK — flag it to whoever maintains the Brain. The postcss
  moderate is Next's bundled copy, build-time only; ignore npm's "fix" (it downgrades Next).
