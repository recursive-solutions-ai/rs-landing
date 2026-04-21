import { BlogList } from '@/components/blog/BlogList'
import { getDictionary, t } from '@/i18n'
import { getBlogPosts } from '@/lib/blog-server'

export default async function BlogPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const posts = await getBlogPosts(locale)

	return (
		<main className="container mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold text-center mb-2">{t(dict, 'blog.heading')}</h1>
			<p className="text-center text-base-content/60 mb-10">
				{t(dict, 'blog.subtitle')}
			</p>

			<BlogList posts={posts} />
		</main>
	)
}
