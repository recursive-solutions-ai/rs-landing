import type { Metadata } from 'next'
import { getBlogPosts } from '@growth-engine/sdk-server'
import { BlogList } from '@growth-engine/sdk-client/components'
import { getDictionary, t } from '@/i18n'
import { getDbOrNull } from '@/lib/db'
import { buildUrl } from '@/lib/sitemap-shared'

export const revalidate = 60

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const title = 'Blog — AI for Service Businesses | Recursive Solutions'
	const description =
		'Practical guides on AI consulting, automation, and operational intelligence for service businesses — from the team at Recursive Solutions.'
	return {
		title,
		description,
		alternates: {
			canonical: buildUrl('/blog', locale),
		},
		openGraph: {
			title,
			description,
			url: buildUrl('/blog', locale),
			type: 'website',
		},
	}
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const db = getDbOrNull()
	const posts = db ? await getBlogPosts(db, { locale, limit: 0 }) : []

	return (
		<main className="container mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold text-center mb-2">{t(dict, 'blog.heading')}</h1>
			<p className="text-center text-base-content/60 mb-10">
				{t(dict, 'blog.subtitle')}
			</p>

			<BlogList
				posts={posts}
				locale={locale}
				translations={{
					noPostsMessage: t(dict, 'blog.no.posts'),
					clearSearchLabel: t(dict, 'blog.clear.search'),
					searchPlaceholder: t(dict, 'blog.search.placeholder'),
				}}
			/>
		</main>
	)
}
