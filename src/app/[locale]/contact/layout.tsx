import type { Metadata } from 'next'
import { canonicalMetadata } from '@/lib/page-metadata'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	return canonicalMetadata('/contact', locale, {
		title: 'Contact | Recursive Solutions',
		description:
			'Get in touch with Recursive Solutions — AI consulting, advisory, and custom builds for service businesses.',
	})
}

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}
