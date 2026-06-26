import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('i18n-utils', () => {
	beforeEach(() => {
		vi.resetModules()
	})

	afterEach(() => {
		vi.doUnmock('@/i18n/config')
	})

	async function load(defaultLocale = 'en') {
		vi.doMock('@/i18n/config', () => ({
			defaultLocale,
			supportedLocales: [defaultLocale, 'fr'],
			isMultiLang: true,
			additionalLocales: ['fr'],
		}))
		return import('./i18n-utils')
	}

	describe('localePrefix', () => {
		it('returns an empty prefix for the default locale', async () => {
			const { localePrefix } = await load('en')
			expect(localePrefix('en')).toBe('')
		})

		it('returns a locale prefix for secondary locales', async () => {
			const { localePrefix } = await load('en')
			expect(localePrefix('fr')).toBe('/fr')
			expect(localePrefix('de')).toBe('/de')
		})
	})

	describe('localizedPath', () => {
		it('keeps default-locale links bare', async () => {
			const { localizedPath } = await load('en')
			expect(localizedPath('/', 'en')).toBe('/')
			expect(localizedPath('/blog', 'en')).toBe('/blog')
			expect(localizedPath('/contact', 'en')).toBe('/contact')
		})

		it('prefixes non-default locales', async () => {
			const { localizedPath } = await load('en')
			expect(localizedPath('/', 'fr')).toBe('/fr')
			expect(localizedPath('/blog', 'fr')).toBe('/fr/blog')
			expect(localizedPath('/contact', 'fr')).toBe('/fr/contact')
		})
	})

	describe('defaultLocaleRedirectTarget', () => {
		it('strips the default locale prefix from nested paths', async () => {
			const { defaultLocaleRedirectTarget } = await load('en')
			expect(defaultLocaleRedirectTarget('/en/blog', 'en')).toBe('/blog')
		})

		it('maps the default locale root to the bare root', async () => {
			const { defaultLocaleRedirectTarget } = await load('en')
			expect(defaultLocaleRedirectTarget('/en', 'en')).toBe('/')
		})

		it('does not redirect bare paths or secondary locales', async () => {
			const { defaultLocaleRedirectTarget } = await load('en')
			expect(defaultLocaleRedirectTarget('/blog', 'en')).toBeNull()
			expect(defaultLocaleRedirectTarget('/fr/blog', 'en')).toBeNull()
		})
	})
})
