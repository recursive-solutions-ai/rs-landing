import { socialImageMetadata } from '@/lib/social-image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
	getBlogPost,
	getBlogPosts,
	getBlogAuthors,
	getBlogTopicsForPost,
	getBusinessConfig,
	getRelatedPosts,
} from '@growth-engine/sdk-server'
import { BlogContent, RelatedArticles, TopicChips } from '@growth-engine/sdk-client/components'
import { getDictionary, t } from '@/i18n'
import { supportedLocales } from '@/i18n/config'
import { getDbOrNull } from '@/lib/db'
import { buildUrl } from '@/lib/sitemap-shared'
import { breadcrumbLd } from '@/lib/seo-config'
import { JsonLd } from '@/components/seo/JsonLd'
import { formatDate, localePrefix, localizedPath } from '@/lib/i18n-utils'
import { normalizeBlogKeywords } from '@/lib/blog-keywords'
import { normalizeContentLocaleLinks } from '@/lib/content-locale-links'

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
	const social = socialImageMetadata(post.seoTitle ?? post.title)
	return {
		...social,
		title: post.seoTitle ?? post.title,
		description: post.seoDesc ?? undefined,
		alternates: {
			canonical: buildUrl(`/blog/${slug}`, locale),
		},
		openGraph: {
			title: post.seoTitle ?? post.title,
			description: post.seoDesc ?? undefined,
			...social.openGraph,
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

	// Related posts and topic hubs are ranked by the SDK from stored keywords —
	// the same deterministic ranking Brain's orphan check runs — so every post
	// links out to 3–5 siblings and up to its hub page(s) in server HTML.
	const [relatedPosts, topics, business, authors] = await Promise.all([
		getRelatedPosts(db, post, { locale }).catch(() => []),
		getBlogTopicsForPost(db, post).catch(() => []),
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

	// Post bodies were authored when the default language lived under `/en/...`,
	// so their in-text cross-links still point there. Rewrite them to the bare
	// path so internal links and canonicals agree — see content-locale-links.ts.
	const content = normalizeContentLocaleLinks(post.content, locale)

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
				<h1 className="text-4xl font-bold mt-2 mb-8">{post.title}</h1>

				<BlogContent
					html={content}
					post={{
						...post,
						content,
						keywords: normalizeBlogKeywords(post.keywords),
					}}
					author={author ?? undefined}
					business={business ?? undefined}
				/>
				<TopicChips
					topics={topics}
					locale={locale}
					localePrefix={localePrefix(locale)}
					label={t(dict, 'blog.filed.under')}
					showCounts={false}
					className="mt-10"
				/>
			</article>

			<div className="max-w-5xl mx-auto">
				{/* CTA targets the homepage audit form, not getBookingCallToAction():
				    that links to /forms/<slug>, a route this site doesn't have. */}
				<RelatedArticles
					posts={relatedPosts}
					locale={locale}
					localePrefix={localePrefix(locale)}
					heading={t(dict, 'blog.related.posts')}
					cta={{
						label: t(dict, 'blog.cta.book.call'),
						href: `${localizedPath('/', locale)}#contact`,
						kind: 'form',
					}}
					ctaLabel={t(dict, 'blog.cta.book.call')}
					ctaDescription={t(dict, 'blog.cta.book.call.description')}
				/>
			</div>
		</main>
	)
}
