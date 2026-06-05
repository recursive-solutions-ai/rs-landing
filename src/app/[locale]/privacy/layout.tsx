import type { Metadata } from 'next'
import { canonicalMetadata } from '@/lib/page-metadata'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	return canonicalMetadata('/privacy', locale, {
		title: 'Privacy Policy | Recursive Solutions',
		description:
			'How Recursive Solutions collects, uses, and protects your personal information.',
	})
}

export default function PrivacyLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}
