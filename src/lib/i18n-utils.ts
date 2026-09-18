import { defaultLocale } from '@/i18n/config'

export function formatDate(date: Date | string, locale: string = 'en'): string {
	return new Date(date).toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

/**
 * The URL prefix for a locale. The default language lives at the site root and
 * carries NO prefix (''); every other language is prefixed ('/fr', '/de', …).
 * Single source of truth for "does this locale show up in the URL".
 */
export function localePrefix(locale: string): string {
	return locale === defaultLocale ? '' : `/${locale}`
}

/**
 * localizedPath('/', 'en') -> '/'      localizedPath('/', 'fr') -> '/fr'
 * localizedPath('/blog', 'en') -> '/blog'   localizedPath('/blog/x', 'fr') -> '/fr/blog/x'
 * ALWAYS use this for links between pages. Never hand-write `/{locale}/...`.
 */
export function localizedPath(path: string, locale: string): string {
	const prefix = localePrefix(locale)
	if (path === '' || path === '/') return prefix || '/'
	const normalized = path.startsWith('/') ? path : `/${path}`
	return `${prefix}${normalized}`
}

/**
 * If `pathname` carries the DEFAULT locale as its first segment, return the bare
 * path it should 301 to ('/en/blog' -> '/blog', '/en' -> '/'). Null otherwise.
 */
export function defaultLocaleRedirectTarget(
	pathname: string,
	defaultLoc: string = defaultLocale,
): string | null {
	const firstSegment = pathname.split('/')[1] ?? ''
	if (firstSegment !== defaultLoc) return null
	return pathname.slice(`/${defaultLoc}`.length) || '/'
}
