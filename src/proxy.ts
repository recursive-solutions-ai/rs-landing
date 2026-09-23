import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isMultiLang, supportedLocales, defaultLocale } from './i18n/config'
import { defaultLocaleRedirectTarget } from './lib/i18n-utils'

const SKIP_PREFIXES = ['/_next/', '/sitemap']
const SKIP_PATHS = ['/favicon.ico', '/sitemap.xml', '/robots.txt']

// SDK routes this site does not use. The handler would otherwise proxy them
// to the Brain carrying the server's own BRAIN_API_KEY (jobs: arbitrary
// authenticated forward; crm: unauthenticated contact write) — block outright.
const BLOCKED_API_PREFIXES = ['/api/rs/jobs', '/api/rs/crm']

const APEX_HOST = 'recursive-solutions.com'
const CANONICAL_HOST = 'www.recursive-solutions.com'

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

/** Internal rewrite target: `/` -> `/en` (not `/en/`, which would 308). */
function rewriteTarget(pathname: string, locale: string): string {
	return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
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

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Host canonicalization: apex -> www, same path. One hop, and it never adds
	// a locale segment — the default language lives at the bare path, so
	// `https://recursive-solutions.com/blog` lands on `https://www.…/blog`
	// with a 200 rather than starting a redirect chain.
	if (request.nextUrl.hostname === APEX_HOST) {
		const url = request.nextUrl.clone()
		url.hostname = CANONICAL_HOST
		url.protocol = 'https:'
		url.port = ''
		return NextResponse.redirect(url, 301)
	}

	// ─── CORS protection for API routes ─────────────────────────────────
	if (pathname.startsWith('/api/')) {
		if (
			BLOCKED_API_PREFIXES.some(
				(p) => pathname === p || pathname.startsWith(`${p}/`),
			)
		) {
			return NextResponse.json({ error: 'Not found' }, { status: 404 })
		}
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

	// Skip static files (images, fonts, media, etc.)
	if (pathname.includes('.')) {
		return NextResponse.next()
	}

	// Skip static routes
	if (
		SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
		SKIP_PATHS.includes(pathname)
	) {
		return NextResponse.next()
	}

	const paramLocale = request.nextUrl.searchParams.get('lang')

	// Check if path starts with a supported locale
	const segments = pathname.split('/')
	const firstSegment = segments[1] ?? ''
	const pathnameHasLocale = supportedLocales.includes(firstSegment)

	if (pathnameHasLocale) {
		const locale = firstSegment

		// ── The default language must never carry a locale segment. ──
		// 301 /en/foo -> /foo and /en -> /. Secondary locales are left alone.
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

	// Single-language site: REWRITE (never redirect) to /{defaultLocale}/path so
	// the bare URL is the only one that answers 200. `/en/...` is 301'd above.
	if (!isMultiLang) {
		const url = request.nextUrl.clone()
		url.pathname = rewriteTarget(pathname, defaultLocale)
		const response = NextResponse.rewrite(url)
		response.headers.set('x-locale', defaultLocale)
		return response
	}

	// Multi-language, no prefix in the path: detect the visitor's locale.
	const locale = detectLocale(request)

	if (locale !== defaultLocale) {
		// Secondary locale: redirect to /{locale}/path.
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

	// Default locale: rewrite internally, never redirect.
	const url = request.nextUrl.clone()
	url.pathname = rewriteTarget(pathname, defaultLocale)
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
