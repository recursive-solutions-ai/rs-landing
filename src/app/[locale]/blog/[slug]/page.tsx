import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
	getBlogPost,
	getBlogPosts,
	getBlogAuthor,
	getBusinessConfig,
} from '@growth-engine/sdk-server'
import { BlogContent, RelatedPosts } from '@growth-engine/sdk-client/components'
import { getDictionary, t } from '@/i18n'
import { supportedLocales } from '@/i18n/config'
import { getDb } from '@/lib/db'
import { buildUrl } from '@/lib/sitemap-shared'
import { breadcrumbLd } from '@/lib/seo-config'
import { JsonLd } from '@/components/seo/JsonLd'
import { formatDate } from '@/lib/i18n-utils'

export const revalidate = 120

export async function generateStaticParams() {
	const db = getDb()
	const results = await Promise.all(
		supportedLocales.map((locale) => getBlogPosts(db, { locale, limit: 0 })),
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
	const db = getDb()
	const post = await getBlogPost(db, slug, locale)
	if (!post) return { title: 'Post not found' }
	return {
		title: post.seoTitle ?? post.title,
		description: post.seoDesc ?? undefined,
		alternates: {
			canonical: buildUrl(`/blog/${slug}`, locale),
		},
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
	const db = getDb()

	const post = await getBlogPost(db, slug, locale)
	if (!post) notFound()

	const [allPosts, business, author] = await Promise.all([
		getBlogPosts(db, { locale, limit: 0 }),
		getBusinessConfig(db).catch(() => null),
		getBlogAuthor(db, slug).catch(() => null),
	])

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

				<BlogContent
					html={post.content}
					post={post}
					author={author ?? undefined}
					business={business ?? undefined}
				/>
			</article>

			<div className="max-w-5xl mx-auto">
				<RelatedPosts
					posts={allPosts}
					currentSlug={slug}
					locale={locale}
					heading={t(dict, 'blog.related.posts')}
				/>
			</div>
		</main>
	)
}
