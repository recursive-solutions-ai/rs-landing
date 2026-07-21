import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n'
import { DictionaryProvider } from '@/i18n/client'
import { supportedLocales } from '@/i18n/config'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
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
	if (!supportedLocales.includes(locale)) notFound()
	const dict = await getDictionary(locale)

	return (
		<DictionaryProvider dict={dict} locale={locale} supportedLocales={supportedLocales}>
			<JsonLd data={[organizationLd(), websiteLd()]} />
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
		</DictionaryProvider>
	)
}
