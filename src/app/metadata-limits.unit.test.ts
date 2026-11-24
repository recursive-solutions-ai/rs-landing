import { describe, expect, it, vi } from 'vitest'

// The blog index loads posts from the DB; no DB in tests, so it must render with none.
vi.mock('@/lib/db', () => ({ getDbOrNull: () => null }))

type MetaModule = {
	generateMetadata: (args: { params: Promise<{ locale: string }> }) => Promise<{
		title?: unknown
		description?: unknown
	}>
}

const pages: Array<[string, () => Promise<MetaModule>]> = [
	['home', () => import('./[locale]/page')],
	['blog index', () => import('./[locale]/blog/page')],
	['free-seo-geo-review', () => import('./[locale]/free-seo-geo-review/page')],
	['contact', () => import('./[locale]/contact/layout')],
	['privacy', () => import('./[locale]/privacy/layout')],
	['legal', () => import('./[locale]/legal/layout')],
	['cookies', () => import('./[locale]/cookies/layout')],
	['use-case livecase', () => import('./[locale]/use-cases/livecase/page')],
	['use-case mantle-tax', () => import('./[locale]/use-cases/mantle-tax/page')],
	['use-case my-little-paris', () => import('./[locale]/use-cases/my-little-paris/page')],
	['use-case roadmap-tax', () => import('./[locale]/use-cases/roadmap-tax/page')],
]

describe('page metadata stays within audit limits (title 10-60, description 50-160)', () => {
	for (const [name, load] of pages) {
		for (const locale of ['en', 'fr']) {
			it(`${name} (${locale})`, async () => {
				const mod = await load()
				const meta = await mod.generateMetadata({ params: Promise.resolve({ locale }) })
				expect(typeof meta.title).toBe('string')
				expect(typeof meta.description).toBe('string')
				const title = meta.title as string
				const description = meta.description as string
				expect(title.length).toBeGreaterThanOrEqual(10)
				expect(title.length).toBeLessThanOrEqual(60)
				expect(description.length).toBeGreaterThanOrEqual(50)
				expect(description.length).toBeLessThanOrEqual(160)
			})
		}
	}
})
