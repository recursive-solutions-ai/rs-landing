import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('sitemap-shared URL building', () => {
	const originalEnv = process.env

	beforeEach(() => {
		vi.resetModules()
		process.env = { ...originalEnv, SITE_URL: 'https://example.com/' }
	})

	afterEach(() => {
		process.env = originalEnv
		vi.doUnmock('@/i18n/config')
	})

	async function load(config?: {
		defaultLocale?: string
		supportedLocales?: string[]
		isMultiLang?: boolean
	}) {
		vi.doMock('@/i18n/config', () => ({
			defaultLocale: config?.defaultLocale ?? 'en',
			supportedLocales: config?.supportedLocales ?? ['en'],
			isMultiLang: config?.isMultiLang ?? false,
			additionalLocales: (config?.supportedLocales ?? ['en']).slice(1),
		}))
		return import('./sitemap-shared')
	}

	it('strips trailing slashes from SITE_URL', async () => {
		const { SITE_URL } = await load()
		expect(SITE_URL).toBe('https://example.com')
	})

	it('builds bare URLs for the default locale', async () => {
		const { buildUrl } = await load()
		expect(buildUrl('', 'en')).toBe('https://example.com')
		expect(buildUrl('/blog', 'en')).toBe('https://example.com/blog')
	})

	it('prefixes secondary locale URLs', async () => {
		const { buildUrl } = await load({
			defaultLocale: 'en',
			supportedLocales: ['en', 'fr'],
			isMultiLang: true,
		})
		expect(buildUrl('', 'fr')).toBe('https://example.com/fr')
		expect(buildUrl('/blog', 'fr')).toBe('https://example.com/fr/blog')
	})

	it('emits static sitemap entries with bare default-locale URLs', async () => {
		const { buildStaticEntries } = await load()
		const urls = buildStaticEntries().map((entry) => entry.url)
		expect(urls).toContain('https://example.com')
		expect(urls).toContain('https://example.com/blog')
		expect(urls).not.toContain('https://example.com/en')
		expect(urls).not.toContain('https://example.com/en/blog')
	})
})
