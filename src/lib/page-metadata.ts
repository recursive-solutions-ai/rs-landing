import { socialImageMetadata } from '@/lib/social-image'
import type { Metadata } from 'next'
import { buildUrl } from '@/lib/sitemap-shared'

/**
 * Build a self-referencing canonical for a page.
 *
 * Use this from a `layout.tsx` for pages that are `'use client'` components
 * (which cannot export `metadata`/`generateMetadata` themselves). The canonical
 * always points at the page's own URL as `buildUrl` renders it — bare for the
 * default language, prefixed for secondary ones — matching the internal links
 * and the sitemap.
 */
export function canonicalMetadata(
	path: string,
	locale: string,
	opts?: { title?: string; description?: string },
): Metadata {
	const social = socialImageMetadata(opts?.title)
	return {
		...social,
		...(opts?.title ? { title: opts.title } : {}),
		...(opts?.description ? { description: opts.description } : {}),
		alternates: {
			canonical: buildUrl(path, locale),
		},
		...(opts?.title || opts?.description
			? {
					openGraph: {
						...social.openGraph,
						...(opts?.title ? { title: opts.title } : {}),
						...(opts?.description ? { description: opts.description } : {}),
						url: buildUrl(path, locale),
					},
				}
			: {}),
	}
}
