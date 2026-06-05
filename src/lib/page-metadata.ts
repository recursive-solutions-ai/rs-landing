import type { Metadata } from 'next'
import { buildUrl } from '@/lib/sitemap-shared'

/**
 * Build a self-referencing canonical for a locale-prefixed page.
 *
 * Use this from a `layout.tsx` for pages that are `'use client'` components
 * (which cannot export `metadata`/`generateMetadata` themselves). The canonical
 * always points at the page's own `/${locale}/...` URL — matching the internal
 * links and the sitemap.
 */
export function canonicalMetadata(
	path: string,
	locale: string,
	opts?: { title?: string; description?: string },
): Metadata {
	return {
		...(opts?.title ? { title: opts.title } : {}),
		...(opts?.description ? { description: opts.description } : {}),
		alternates: {
			canonical: buildUrl(path, locale),
		},
		...(opts?.title || opts?.description
			? {
					openGraph: {
						...(opts?.title ? { title: opts.title } : {}),
						...(opts?.description ? { description: opts.description } : {}),
						url: buildUrl(path, locale),
					},
				}
			: {}),
	}
}
