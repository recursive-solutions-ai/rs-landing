import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isMultiLang, supportedLocales, defaultLocale } from './i18n/config'

const SKIP_PREFIXES = ['/api/', '/_next/', '/favicon.ico']

function getLocaleFromHeaders(request: NextRequest): string {
	const acceptLanguage = request.headers.get('accept-language')
	if (!acceptLanguage) return defaultLocale

	const preferred = acceptLanguage
		.split(',')
		.map((part) => {
			const [lang, q] = part.trim().split(';q=')
			return { lang: lang?.split('-')[0] ?? '', q: q ? parseFloat(q) : 1 }
		})
		.sort((a, b) => b.q - a.q)

	for (const { lang } of preferred) {
		if (supportedLocales.includes(lang)) {
			return lang
		}
	}

	return defaultLocale
}

function detectLocale(request: NextRequest): string {
	// 1. Cookie
	const cookieLocale = request.cookies.get('ge-locale')?.value
	if (cookieLocale && supportedLocales.includes(cookieLocale)) {
		return cookieLocale
	}

	// 2. Query param
	const paramLocale = request.nextUrl.searchParams.get('lang')
	if (paramLocale && supportedLocales.includes(paramLocale)) {
		return paramLocale
	}

	// 3. Accept-Language header
	return getLocaleFromHeaders(request)
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Skip static/api routes
	if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
		return NextResponse.next()
	}

	const paramLocale = request.nextUrl.searchParams.get('lang')

	// Check if path starts with a supported locale
	const segments = pathname.split('/')
	const firstSegment = segments[1] ?? ''
	const pathnameHasLocale = supportedLocales.includes(firstSegment)

	if (pathnameHasLocale) {
		const locale = firstSegment
		const response = NextResponse.next()
		response.headers.set('x-locale', locale)

		if (paramLocale && supportedLocales.includes(paramLocale)) {
			response.cookies.set('ge-locale', paramLocale, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				sameSite: 'lax',
			})
		}

		return response
	}

	// Path does NOT have a locale prefix
	const locale = isMultiLang ? detectLocale(request) : defaultLocale

	if (isMultiLang && locale !== defaultLocale) {
		// Redirect to /{locale}/path
		const url = request.nextUrl.clone()
		url.pathname = `/${locale}${pathname}`
		const response = NextResponse.redirect(url)
		response.headers.set('x-locale', locale)

		if (paramLocale && supportedLocales.includes(paramLocale)) {
			response.cookies.set('ge-locale', paramLocale, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				sameSite: 'lax',
			})
		}

		return response
	}

	// Default locale: rewrite internally to /{defaultLocale}/path
	const url = request.nextUrl.clone()
	url.pathname = `/${defaultLocale}${pathname}`
	const response = NextResponse.rewrite(url)
	response.headers.set('x-locale', defaultLocale)

	if (paramLocale && supportedLocales.includes(paramLocale)) {
		response.cookies.set('ge-locale', paramLocale, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			sameSite: 'lax',
		})
	}

	return response
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon\\.ico|favicon_io|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.ico$|.*\\.webp$).*)'],
}
