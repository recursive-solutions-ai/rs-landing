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

// Unknown first segments must 404, not render the landing page as a
// soft-200 — without this, any stray root path with a dot (skipped by the
// proxy) gets treated as a "locale" and serves duplicate homepage HTML.
export const dynamicParams = false

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
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
