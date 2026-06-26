import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('i18n/config — supported locale guard', () => {
	const originalEnv = { ...process.env }

	beforeEach(() => {
		vi.resetModules()
	})

	afterEach(() => {
		process.env = { ...originalEnv }
	})

	async function load(defaultLanguage?: string, additionalLanguages?: string) {
		vi.resetModules()
		if (defaultLanguage === undefined) delete process.env.DEFAULT_LANGUAGE
		else process.env.DEFAULT_LANGUAGE = defaultLanguage
		if (additionalLanguages === undefined) delete process.env.ADDITIONAL_LANGUAGES
		else process.env.ADDITIONAL_LANGUAGES = additionalLanguages
		return import('./config')
	}

	it('accepts the default locale', async () => {
		const { isSupportedLocale } = await load()
		expect(isSupportedLocale('en')).toBe(true)
	})

	it('rejects bogus dotted first path segments', async () => {
		const { isSupportedLocale } = await load()
		expect(isSupportedLocale('rss.xml')).toBe(false)
		expect(isSupportedLocale('index.iml')).toBe(false)
		expect(isSupportedLocale('sitemap.xml')).toBe(false)
	})

	it('accepts only configured secondary locales', async () => {
		const { isSupportedLocale } = await load('en', 'fr,de')
		expect(isSupportedLocale('fr')).toBe(true)
		expect(isSupportedLocale('de')).toBe(true)
		expect(isSupportedLocale('es')).toBe(false)
	})
})
