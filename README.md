# Recursive Solutions

Built with [Growth Engine](https://github.com/recursive-solutions-ai).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Set these in `.env.local` (never commit this file):

```
BRAIN_API_URL=http://localhost:3000
BRAIN_API_KEY=brain_live_...
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=eyJ...
```

| Variable | Purpose |
|----------|---------|
| `BRAIN_API_URL` | URL of the Brain instance (`http://localhost:3000` for dev, production URL for prod) |
| `BRAIN_API_KEY` | API key for authenticating with the Brain |
| `TURSO_DATABASE_URL` | Your Turso SQLite database URL |
| `TURSO_AUTH_TOKEN` | Auth token for your Turso database |

All four are server-only — do **not** prefix with `NEXT_PUBLIC_`.

## Project Structure

| Path | Purpose |
|------|---------|
| `src/app/api/rs/[...route]/route.ts` | SDK route handler — connects to Brain and Turso |
| `src/app/layout.tsx` | Root layout with `GrowthEngineProvider` |
| `src/app/page.tsx` | Landing page with latest blog posts |
| `src/app/blog/` | Blog listing and detail pages |
| `src/components/` | Reusable UI components |
| `next.config.ts` | Next.js config with `serverExternalPackages` |

## SDK Reference

| Hook / Function | What it does |
|---|---|
| `useContent('blog')` | Fetches blog posts from your Turso DB |
| `useBusinessConfig()` | Fetches business config from your Turso DB |
| `triggerBlogGen({ topic })` | Triggers AI blog generation via the Brain |
| `triggerSocialSync()` | Triggers social media sync via the Brain |
| `useJobStatus(jobId)` | Polls job progress |
| `useSDKStatus()` | Checks SDK version compatibility |

## Deploying to Vercel

1. Push this repo to GitHub
2. Import in Vercel
3. Add the four environment variables in project settings (use your production Brain URL for `BRAIN_API_URL`)
4. Deploy

## Updating the SDK

```bash
npm install github:recursive-solutions-ai/growth-engine-sdk-client#sdk-vLATEST
npm install github:recursive-solutions-ai/growth-engine-sdk-server#sdk-vLATEST
```

Check `useSDKStatus()` or the Brain admin portal for the latest version.

## Creating a New Client Site

To scaffold another site like this one:

```bash
npx --package=github:recursive-solutions-ai/growth-engine-create-client-app -- create-client-app
```
