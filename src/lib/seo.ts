import type { Metadata } from 'next'
import { defaultLocale } from '@/i18n/config'
import { SITE_URL, buildAlternates, buildUrl } from '@/lib/sitemap-shared'

export const SITE_NAME = 'Recursive Solutions'

interface PageMetadataInput {
	path: string
	locale: string
	title: string
	description?: string | null
	image?: string | null
	type?: 'website' | 'article'
	brand?: boolean
}

export function buildPageMetadata({
	path,
	locale,
	title,
	description,
	image,
	type = 'website',
	brand = true,
}: PageMetadataInput): Metadata {
	const canonical = buildUrl(path, locale)
	const languages = buildAlternates(path)
	const fullTitle = brand ? `${title} | ${SITE_NAME}` : title
	const languagesWithDefault = languages
		? { ...languages, 'x-default': buildUrl(path, defaultLocale) }
		: undefined

	return {
		title: { absolute: fullTitle },
		...(description ? { description } : {}),
		alternates: {
			canonical,
			types: {
				'application/rss+xml': [{ url: '/rss.xml', title: `${SITE_NAME} RSS Feed` }],
			},
			...(languagesWithDefault ? { languages: languagesWithDefault } : {}),
		},
		openGraph: {
			title: fullTitle,
			...(description ? { description } : {}),
			url: canonical,
			siteName: SITE_NAME,
			type,
			...(image ? { images: [{ url: image }] } : {}),
		},
		twitter: {
			card: image ? 'summary_large_image' : 'summary',
			title: fullTitle,
			...(description ? { description } : {}),
			...(image ? { images: [image] } : {}),
		},
	}
}

export { SITE_URL }
