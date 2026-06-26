import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { BlogAuthor } from '@growth-engine/sdk-client'
import {
	getBlogPost,
	getBlogPosts,
	getBlogAuthors,
	getBusinessConfig,
} from '@growth-engine/sdk-server'
import { BlogContent } from '@growth-engine/sdk-client/components'
import { getDictionary, t } from '@/i18n'
import { supportedLocales } from '@/i18n/config'
import { getDb, safeQuery } from '@/lib/db'
import { buildUrl } from '@/lib/sitemap-shared'
import { buildPageMetadata } from '@/lib/seo'
import { breadcrumbLd } from '@/lib/seo-config'
import { JsonLd } from '@/components/seo/JsonLd'
import { formatDate, localizedPath } from '@/lib/i18n-utils'
import { AuthorByline } from '@/components/blog/AuthorByline'
import { LocalizedRelatedPosts } from '@/components/blog/LocalizedRelatedPosts'

export const revalidate = 120

export async function generateStaticParams() {
	const results = await Promise.all(
		supportedLocales.map((locale) =>
			safeQuery([], () => getBlogPosts(getDb(), { locale, limit: 0 })),
		),
	)
	return results.flatMap((posts, i) =>
		posts.map((post) => ({ locale: supportedLocales[i], slug: post.slug })),
	)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
	const { locale, slug } = await params
	const post = await safeQuery(null, () => getBlogPost(getDb(), slug, locale))
	if (!post) return { title: 'Post not found' }
	return buildPageMetadata({
		path: `/blog/${slug}`,
		locale,
		title: post.seoTitle ?? post.title,
		description: post.seoDesc,
		image: post.heroImageUrl,
		type: 'article',
	})
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>
}) {
	const { locale, slug } = await params
	const dict = await getDictionary(locale)

	const post = await safeQuery(null, () => getBlogPost(getDb(), slug, locale))
	if (!post) notFound()

	const [allPosts, business, authors] = await Promise.all([
		safeQuery([], () => getBlogPosts(getDb(), { locale, limit: 0 })),
		safeQuery(null, () => getBusinessConfig(getDb())),
		safeQuery<BlogAuthor[]>([], () => getBlogAuthors(getDb())),
	])
	const author =
		authors.find((candidate: BlogAuthor) => candidate.id === post.authorId) ?? null

	const date = formatDate(post.createdAt, locale)

	const breadcrumb = breadcrumbLd([
		{ name: t(dict, 'nav.home'), url: buildUrl('', locale) },
		{ name: t(dict, 'nav.blog'), url: buildUrl('/blog', locale) },
		{ name: post.title, url: buildUrl(`/blog/${slug}`, locale) },
	])

	return (
		<main className="container mx-auto px-4 py-12">
			<JsonLd data={breadcrumb} />
			<nav className="mb-8">
				<Link href={localizedPath('/blog', locale)} className="text-sm text-primary hover:underline">
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
				<h1 className="text-4xl font-bold mt-2 mb-4">{post.title}</h1>

				{author && (
					<div className="mb-8">
						<AuthorByline author={author} locale={locale} />
					</div>
				)}

				<BlogContent
					html={post.content}
					post={post}
					author={author ?? undefined}
					business={business ?? undefined}
				/>
			</article>

			<div className="max-w-5xl mx-auto">
				<LocalizedRelatedPosts
					posts={allPosts}
					currentSlug={slug}
					locale={locale}
					heading={t(dict, 'blog.related.posts')}
				/>
			</div>
		</main>
	)
}
