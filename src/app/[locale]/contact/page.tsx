import { getBusinessConfig, getFormBySlug } from '@growth-engine/sdk-server'
import { FormRenderer } from '@growth-engine/sdk-client/components'
import { getDictionary, t } from '@/i18n'
import { getDb, safeQuery } from '@/lib/db'
import { ConfigDisplay } from '@/components/config/ConfigDisplay'
import { ContactAnalytics } from './ContactAnalytics'

const CONTACT_FORM_SLUG = 'contact-form'

export const revalidate = 120

export default async function ContactPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	const [form, config] = await Promise.all([
		safeQuery(null, () => getFormBySlug(getDb(), CONTACT_FORM_SLUG)),
		safeQuery(null, () => getBusinessConfig(getDb())),
	])

	return (
		<main className="container mx-auto px-4 py-12">
			<ContactAnalytics />

			<h1 className="text-4xl font-bold text-center mb-2">{t(dict, 'contact.heading')}</h1>
			<p className="text-center text-base-content/60 mb-10">
				{t(dict, 'contact.subtitle')}
			</p>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
				<div>
					{form ? (
						<FormRenderer
							form={form}
							translations={{
								defaultSubmitLabel: 'Send Message',
							}}
						/>
					) : (
						<p className="text-base-content/60">
							{t(dict, 'forms.empty')}
						</p>
					)}
				</div>

				{config && (
					<div>
						<ConfigDisplay
							hours={config.hours ?? null}
							contact={config.contact ?? null}
						/>
					</div>
				)}
			</div>
		</main>
	)
}
