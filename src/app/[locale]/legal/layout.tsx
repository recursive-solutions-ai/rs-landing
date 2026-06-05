import type { Metadata } from 'next'
import { canonicalMetadata } from '@/lib/page-metadata'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	return canonicalMetadata('/legal', locale, {
		title: 'Terms of Service | Recursive Solutions',
		description:
			'The terms and conditions governing your use of the Recursive Solutions website.',
	})
}

export default function LegalLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}
