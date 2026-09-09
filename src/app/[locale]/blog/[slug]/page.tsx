import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
	getBlogPost,
	getBlogPosts,
	getBlogAuthors,
	getBusinessConfig,
} from '@growth-engine/sdk-server'
import { BlogContent, RelatedPosts } from '@growth-engine/sdk-client/components'
import { getDictionary, t } from '@/i18n'
import { supportedLocales } from '@/i18n/config'
import { getDbOrNull } from '@/lib/db'
import { buildUrl } from '@/lib/sitemap-shared'
import { breadcrumbLd } from '@/lib/seo-config'
import { JsonLd } from '@/components/seo/JsonLd'
import { formatDate } from '@/lib/i18n-utils'
import { normalizeBlogKeywords } from '@/lib/blog-keywords'

export const revalidate = 120

// Render slugs that generateStaticParams didn't prebuild (posts added after the
// last build, or ALL posts when the build ran without Turso env) on demand
// instead of 404ing. Without this, App Router locks the route to fallback:false
// and any un-prebuilt slug falls through to the [...rest] catch-all.
export const dynamicParams = true

export async function generateStaticParams() {
	const db = getDbOrNull()
	if (!db) return []
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
	const db = getDbOrNull()
	const post = db ? await getBlogPost(db, slug, locale) : null
	// getBlogPost has no status filter — never emit metadata for drafts
	if (!post || post.status !== 'published') return { title: 'Post not found' }
	return {
		title: post.seoTitle ?? post.title,
		description: post.seoDesc ?? undefined,
		alternates: {
			canonical: buildUrl(`/blog/${slug}`, locale),
		},
		openGraph: {
			title: post.seoTitle ?? post.title,
			description: post.seoDesc ?? undefined,
			// fall back to the site card — an images-less openGraph block would
			// shallow-merge away the root layout's image entirely
			images: post.heroImageUrl ? [post.heroImageUrl] : ['/social-card.jpg'],
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
	const db = getDbOrNull()
	if (!db) notFound()

	const post = await getBlogPost(db, slug, locale)
	// getBlogPost has no status filter — drafts/archived must 404, not render
	if (!post || post.status !== 'published') notFound()

	const [allPosts, business, authors] = await Promise.all([
		getBlogPosts(db, { locale, limit: 0 }),
		getBusinessConfig(db).catch(() => null),
		// getBlogAuthor() looks up by AUTHOR slug — posts only carry authorId,
		// so resolve the byline from the full author list instead
		getBlogAuthors(db).catch(() => []),
	])
	// structural annotation: the SDK's BlogAuthor type doesn't resolve
	// (@growth-engine/types isn't shipped with the vendored SDKs)
	const author =
		authors.find((a: { id?: unknown }) => a.id === post.authorId) ?? null

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
					post={{ ...post, keywords: normalizeBlogKeywords(post.keywords) }}
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
