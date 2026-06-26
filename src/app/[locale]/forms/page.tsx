import type { Metadata } from 'next'
import Link from 'next/link'
import { getActiveForms } from '@growth-engine/sdk-server'
import { getDictionary, t } from '@/i18n'
import { getDb, safeQuery } from '@/lib/db'
import { localizedPath } from '@/lib/i18n-utils'
import { buildUrl } from '@/lib/sitemap-shared'

export const revalidate = 60

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return {
		title: t(dict, 'forms.heading'),
		description: t(dict, 'forms.subtitle'),
		alternates: {
			canonical: buildUrl('/forms', locale),
		},
	}
}

export default async function FormsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const activeForms = await safeQuery([], () => getActiveForms(getDb()))

	return (
		<main className="container mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold text-center mb-2">{t(dict, 'forms.heading')}</h1>
			<p className="text-center text-base-content/60 mb-10">
				{t(dict, 'forms.subtitle')}
			</p>

			{activeForms.length === 0 ? (
				<p className="text-center text-base-content/60 py-16">
					{t(dict, 'forms.empty')}
				</p>
			) : (
				<div className="mx-auto max-w-2xl grid gap-4">
					{activeForms.map((form) => (
						<Link
							key={form.id}
							href={localizedPath(`/forms/${form.slug}`, locale)}
							className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="card-body">
								<h2 className="card-title">{form.name}</h2>
								{form.description && (
									<p className="text-base-content/60">{form.description}</p>
								)}
							</div>
						</Link>
					))}
				</div>
			)}
		</main>
	)
}
