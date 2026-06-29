import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isMultiLang, supportedLocales, defaultLocale } from './i18n/config'
import { defaultLocaleRedirectTarget } from './lib/i18n-utils'

const SKIP_PREFIXES = ['/_next/', '/sitemap']
const SKIP_PATHS = ['/favicon.ico', '/sitemap.xml', '/robots.txt']
const LEGACY_REDIRECTS = new Map<string, string>([
	['/en/map-your-growth', '/'],
	['/map-your-growth', '/'],
	['/en/blog/map-your-growth', '/blog'],
	['/blog/map-your-growth', '/blog'],
	['/en/blog/ai-tools-saving', '/blog'],
	['/blog/ai-tools-saving', '/blog'],
])

function legacyRedirectTarget(pathname: string): string | null {
	const normalized =
		pathname.length > 1 && pathname.endsWith('/')
			? pathname.slice(0, -1)
			: pathname
	return LEGACY_REDIRECTS.get(normalized) ?? null
}

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
	const cookieLocale = request.cookies.get('ge-locale')?.value
	if (cookieLocale && supportedLocales.includes(cookieLocale)) {
		return cookieLocale
	}

	const paramLocale = request.nextUrl.searchParams.get('lang')
	if (paramLocale && supportedLocales.includes(paramLocale)) {
		return paramLocale
	}

	return getLocaleFromHeaders(request)
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname.startsWith('/api/')) {
		const origin = request.headers.get('origin')
		if (origin) {
			const host =
				request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? ''
			try {
				if (new URL(origin).host !== host) {
					return NextResponse.json(
						{ error: 'Cross-origin requests are not allowed' },
						{ status: 403, headers: { Vary: 'Origin' } },
					)
				}
			} catch {
				return NextResponse.json(
					{ error: 'Invalid origin' },
					{ status: 403 },
				)
			}
		}
		return NextResponse.next()
	}

	if (pathname.includes('.')) {
		return NextResponse.next()
	}

	if (
		SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
		SKIP_PATHS.includes(pathname)
	) {
		return NextResponse.next()
	}

	const legacyTarget = legacyRedirectTarget(pathname)
	if (legacyTarget) {
		const url = request.nextUrl.clone()
		url.pathname = legacyTarget
		return NextResponse.redirect(url, 301)
	}

	const paramLocale = request.nextUrl.searchParams.get('lang')
	const segments = pathname.split('/')
	const firstSegment = segments[1] ?? ''
	const pathnameHasLocale = supportedLocales.includes(firstSegment)

	if (pathnameHasLocale) {
		const locale = firstSegment
		const bareTarget = defaultLocaleRedirectTarget(pathname, defaultLocale)
		if (bareTarget) {
			const url = request.nextUrl.clone()
			url.pathname = bareTarget
			return NextResponse.redirect(url, 301)
		}

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

	if (!isMultiLang) {
		const url = request.nextUrl.clone()
		url.pathname = `/${defaultLocale}${pathname}`
		const response = NextResponse.rewrite(url)
		response.headers.set('x-locale', defaultLocale)
		return response
	}

	const locale = detectLocale(request)

	if (locale !== defaultLocale) {
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
	matcher: [
		'/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|woff|woff2|ttf|eot|mp4|webm|json|xml|txt)$).*)',
	],
}
