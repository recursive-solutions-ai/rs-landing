import { defaultLocale } from '@/i18n/config'

export function formatDate(date: Date | string, locale: string = 'en'): string {
	return new Date(date).toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

export function localePrefix(locale: string): string {
	return locale === defaultLocale ? '' : `/${locale}`
}

export function localizedPath(path: string, locale: string): string {
	const prefix = localePrefix(locale)
	if (path === '' || path === '/') return prefix || '/'
	const normalized = path.startsWith('/') ? path : `/${path}`
	return `${prefix}${normalized}`
}

export function defaultLocaleRedirectTarget(
	pathname: string,
	defaultLoc: string = defaultLocale,
): string | null {
	const segments = pathname.split('/')
	const firstSegment = segments[1] ?? ''
	if (firstSegment !== defaultLoc) return null
	if (segments.length > 2 && segments[2] === '') return null
	return pathname.slice(`/${defaultLoc}`.length) || '/'
}
