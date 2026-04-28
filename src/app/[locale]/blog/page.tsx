import { getBlogPosts } from '@growth-engine/sdk-server'
import { BlogList } from '@growth-engine/sdk-client/components'
import { getDictionary, t } from '@/i18n'
import { getDb } from '@/lib/db'

export const revalidate = 60

export default async function BlogPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const db = getDb()
	const posts = await getBlogPosts(db, { locale, limit: 0 })

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
