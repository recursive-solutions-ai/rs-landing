import type { Metadata } from 'next'
import { getBlogAuthors, getBlogPosts } from '@growth-engine/sdk-server'
import { getDictionary, t } from '@/i18n'
import { getDb, safeQuery } from '@/lib/db'
import { buildPageMetadata } from '@/lib/seo'
import { AuthorChips } from '@/components/blog/AuthorChips'
import { LocalizedBlogList } from '@/components/blog/LocalizedBlogList'

export const revalidate = 60

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const title = 'Blog - AI for Service Businesses'
	const description =
		'Practical guides on AI consulting, automation, and operational intelligence for service businesses from the team at Recursive Solutions.'
	return buildPageMetadata({
		path: '/blog',
		locale,
		title,
		description,
	})
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const [posts, authors] = await Promise.all([
		safeQuery([], () => getBlogPosts(getDb(), { locale, limit: 0 })),
		safeQuery([], () => getBlogAuthors(getDb())),
	])

	return (
		<main className="container mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold text-center mb-2">{t(dict, 'blog.heading')}</h1>
			<p className="text-center text-base-content/60 mb-10">
				{t(dict, 'blog.subtitle')}
			</p>

			<AuthorChips
				authors={authors}
				locale={locale}
				label={t(dict, 'blog.filter.by.author')}
			/>

			<LocalizedBlogList
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
