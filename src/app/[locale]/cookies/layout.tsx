import type { Metadata } from 'next'
import { canonicalMetadata } from '@/lib/page-metadata'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	return canonicalMetadata('/cookies', locale, {
		title: 'Cookie Policy | Recursive Solutions',
		description:
			'How Recursive Solutions uses cookies and similar technologies on this site.',
	})
}

export default function CookiesLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}
