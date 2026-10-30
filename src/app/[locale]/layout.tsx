import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n'
import { DictionaryProvider } from '@/i18n/client'
import { supportedLocales, isSupportedLocale } from '@/i18n/config'
import { LucyV2TopBar, LucyV2Footer } from '@/components/lucy-v2/LucyV2Chrome'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationLd, websiteLd } from '@/lib/seo-config'

export function generateStaticParams() {
	return supportedLocales.map((locale) => ({ locale }))
}

// Keep dynamicParams true (the default) so nested routes with their own
// generateStaticParams (e.g. blog/[slug]) can render on demand — a parent
// `dynamicParams = false` cascades to children and 404s any post added after
// the last build. Unknown locales are rejected in the body instead: without
// that guard, a stray root path with a dot (skipped by the proxy) would get
// treated as a "locale" and serve duplicate homepage HTML as a soft-200.
export const dynamicParams = true

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	// Bare paths are rewritten into [locale], so this segment matches ANY first
	// path segment. Reject anything that is not a real locale so `/bogus-xyz`
	// 404s instead of rendering a page with a garbage canonical.
	if (!isSupportedLocale(locale)) notFound()
	const dict = await getDictionary(locale)

	return (
		<DictionaryProvider dict={dict} locale={locale} supportedLocales={supportedLocales}>
			<JsonLd data={[organizationLd(), websiteLd()]} />
			<LucyV2TopBar locale={locale} />
			<main className="flex-1">{children}</main>
			<LucyV2Footer locale={locale} />
		</DictionaryProvider>
	)
}
