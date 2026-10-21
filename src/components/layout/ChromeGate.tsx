'use client'

import { usePathname } from 'next/navigation'
import { supportedLocales } from '@/i18n/config'

/** Routes that render their own chrome (no site header/footer). */
const STANDALONE_PATHS = ['/lucy-v2']

function stripLocale(pathname: string): string {
	for (const locale of supportedLocales) {
		if (pathname === `/${locale}`) return '/'
		if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1)
	}
	return pathname
}

export function ChromeGate({ children }: { children: React.ReactNode }) {
	const pathname = usePathname() ?? '/'
	const path = stripLocale(pathname).replace(/\/+$/, '') || '/'
	if (STANDALONE_PATHS.includes(path)) return null
	return <>{children}</>
}
