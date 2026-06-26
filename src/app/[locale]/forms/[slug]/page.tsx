import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getFormBySlug } from '@growth-engine/sdk-server'
import { FormRenderer } from '@growth-engine/sdk-client/components'
import { getDb, safeQuery } from '@/lib/db'
import { buildUrl } from '@/lib/sitemap-shared'

export const revalidate = 60

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
	const { locale, slug } = await params
	const form = await safeQuery(null, () => getFormBySlug(getDb(), slug))
	if (!form) return {}
	return {
		title: form.name,
		description: form.description ?? undefined,
		alternates: {
			canonical: buildUrl(`/forms/${slug}`, locale),
		},
	}
}

export default async function DynamicFormPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const form = await safeQuery(null, () => getFormBySlug(getDb(), slug))

	if (!form) notFound()

	return (
		<main className="container mx-auto px-4 py-12">
			<FormRenderer form={form} />
		</main>
	)
}
