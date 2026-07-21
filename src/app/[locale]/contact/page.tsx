'use client'

import { useEffect } from 'react'
import { useBusinessConfig } from '@growth-engine/sdk-client'
import { useI18n } from '@/i18n/client'
import { ConfigDisplay } from '@/components/config/ConfigDisplay'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

export default function ContactPage() {
	const { t } = useI18n()
	const { config, loading } = useBusinessConfig()

	useEffect(() => {
		trackEvent('contact_view')
	}, [])

	return (
		<main className="container mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold text-center mb-2">{t('contact.heading')}</h1>
			<p className="text-center text-base-content/60 mb-10">
				{t('contact.subtitle')}
			</p>

			{loading && (
				<div className="flex justify-center py-16">
					<span className="loading loading-spinner loading-lg" />
				</div>
			)}

			{!loading && config && (
				<ConfigDisplay
					hours={config.hours ?? null}
					contact={config.contact ?? null}
				/>
			)}

			{/* Fallback: business config missing or failed to load — never leave
			    the page blank; give visitors a direct way to reach us. */}
			{!loading && !config && (
				<div className="mx-auto max-w-md text-center">
					<p className="mb-6 text-base-content/70">{t('contact.reach.direct')}</p>
					<a
						href="mailto:team@recursive-solutions.com"
						className="btn btn-primary"
					>
						team@recursive-solutions.com
					</a>
				</div>
			)}
		</main>
	)
}
