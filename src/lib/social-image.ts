import type { Metadata } from 'next'

export const SOCIAL_TAGLINE = 'Modern systems for growing businesses.'

export function socialImageTitle(title = ''): string {
	const cleaned = title.replace(/\s*[|·—–-]\s*Recursive Solutions\s*$/i, '').trim()
	if (cleaned === 'Recursive Solutions') return ''
	return cleaned.length > 160 ? `${cleaned.slice(0, 159).trimEnd()}…` : cleaned
}

/** Set both explicitly: Next.js replaces nested metadata rather than deep-merging it. */
export function socialImageMetadata(title = '') {
	const displayTitle = socialImageTitle(title)
	const url = `/api/og${displayTitle ? `?${new URLSearchParams({ title: displayTitle })}` : ''}`
	return {
		openGraph: {
			images: [{ url, width: 1200, height: 630, alt: displayTitle ? `${displayTitle} — ${SOCIAL_TAGLINE}` : `Recursive Solutions — ${SOCIAL_TAGLINE}` }],
		},
		twitter: {
			card: 'summary_large_image',
			images: [url],
		},
	} satisfies Metadata
}
