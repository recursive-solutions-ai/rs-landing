import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, t } from '@/i18n'
import { formatDate } from '@/lib/i18n-utils'
import { BlogContent } from '@/components/blog/BlogContent'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { getBlogPost, getBlogPosts } from '@/lib/blog-server'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
	const { locale, slug } = await params
	const post = await getBlogPost(slug, locale)
	if (!post) return { title: 'Post not found' }
	return {
		title: post.seoTitle ?? post.title,
		description: post.seoDesc ?? undefined,
		openGraph: {
			title: post.seoTitle ?? post.title,
			description: post.seoDesc ?? undefined,
			images: post.heroImageUrl ? [post.heroImageUrl] : undefined,
			type: 'article',
		},
	}
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>
}) {
	const { locale, slug } = await params
	const dict = await getDictionary(locale)
	const [post, allPosts] = await Promise.all([
		getBlogPost(slug, locale),
		getBlogPosts(locale),
	])

	if (!post) {
		return (
			<main className="container mx-auto px-4 py-12 text-center">
				<h1 className="text-4xl font-bold mb-4">{t(dict, 'blog.post.not.found')}</h1>
				<p className="text-base-content/60 mb-6">
					{t(dict, 'blog.post.not.found.description')}
				</p>
				<Link href={`/${locale}/blog`} className="btn btn-primary">
					{t(dict, 'blog.back')}
				</Link>
			</main>
		)
	}

	const date = formatDate(post.createdAt, locale)

	return (
		<main className="container mx-auto px-4 py-12">
			<nav className="mb-8">
				<Link href={`/${locale}/blog`} className="text-sm text-primary hover:underline">
					← {t(dict, 'blog.back')}
				</Link>
			</nav>

			<article className="max-w-3xl mx-auto">
				{post.heroImageUrl && (
					<figure className="aspect-video overflow-hidden rounded-xl mb-8">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={post.heroImageUrl}
							alt={post.title}
							className="w-full h-full object-cover"
						/>
					</figure>
				)}

				<time className="text-sm text-base-content/50">{date}</time>
				<h1 className="text-4xl font-bold mt-2 mb-8">{post.title}</h1>

				<BlogContent html={post.content} />
			</article>

			<div className="max-w-5xl mx-auto">
				<RelatedPosts posts={allPosts} currentSlug={slug} />
			</div>
		</main>
	)
}
