import { socialImageMetadata } from '@/lib/social-image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBlogTopic, getBlogTopics } from '@growth-engine/sdk-server'
import { BlogList, TopicChips } from '@growth-engine/sdk-client/components'
import { getDictionary, t } from '@/i18n'
import { getDbOrNull } from '@/lib/db'
import { buildUrl } from '@/lib/sitemap-shared'
import { breadcrumbLd } from '@/lib/seo-config'
import { JsonLd } from '@/components/seo/JsonLd'
import { localePrefix, localizedPath } from '@/lib/i18n-utils'

export const revalidate = 120
export const dynamicParams = true

// Topic hub pages: `/blog/topic/<keyword>` lists every published post sharing
// that keyword, so each cluster has one page linking to all of its posts and
// linked back from each of them (<TopicChips> on the post). Hubs are computed
// from stored post keywords by the SDK — nothing to curate — and appear once
// two posts share a keyword. Listed in the sitemap via buildTopicEntries().

async function loadTopic(slug: string, locale: string) {
	const db = getDbOrNull()
	if (!db) return null
	return getBlogTopic(db, slug, locale).catch(() => null)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
	const { locale, slug } = await params
	const page = await loadTopic(slug, locale)
	if (!page) return { title: 'Topic not found' }
	const dict = await getDictionary(locale)
	const title = t(dict, 'blog.topic.title', { topic: page.topic.label })
	const description = t(dict, 'blog.topic.subtitle', {
		topic: page.topic.label,
		count: String(page.topic.postCount),
	})
	const url = buildUrl(`/blog/topic/${page.topic.slug}`, locale)
	const social = socialImageMetadata(title)
	return {
		...social,
		title,
		description,
		alternates: { canonical: url },
		openGraph: { title, description, url, type: 'website', ...social.openGraph },
	}
}

export default async function BlogTopicPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>
}) {
	const { locale, slug } = await params
	const page = await loadTopic(slug, locale)
	if (!page) notFound()

	const dict = await getDictionary(locale)
	const db = getDbOrNull()
	const topics = db ? await getBlogTopics(db, locale).catch(() => []) : []
	const title = t(dict, 'blog.topic.title', { topic: page.topic.label })

	const breadcrumb = breadcrumbLd([
		{ name: t(dict, 'nav.home'), url: buildUrl('', locale) },
		{ name: t(dict, 'nav.blog'), url: buildUrl('/blog', locale) },
		{ name: page.topic.label, url: buildUrl(`/blog/topic/${page.topic.slug}`, locale) },
	])

	return (
		<main className="container mx-auto px-4 py-12">
			<JsonLd data={breadcrumb} />
			<nav className="mb-8">
				<Link href={localizedPath('/blog', locale)} className="text-sm text-primary hover:underline">
					← {t(dict, 'blog.back')}
				</Link>
			</nav>

			<h1 className="text-4xl font-bold text-center mb-2">{title}</h1>
			<p className="text-center text-base-content/60 mb-10">
				{t(dict, 'blog.topic.subtitle', {
					topic: page.topic.label,
					count: String(page.topic.postCount),
				})}
			</p>

			<BlogList
				posts={page.posts}
				locale={locale}
				localePrefix={localePrefix(locale)}
				postsPerPage={Math.max(page.posts.length, 1)}
				translations={{
					noPostsMessage: t(dict, 'blog.no.posts'),
					clearSearchLabel: t(dict, 'blog.clear.search'),
					searchPlaceholder: t(dict, 'blog.search.placeholder'),
				}}
			/>

			<TopicChips
				topics={topics}
				locale={locale}
				localePrefix={localePrefix(locale)}
				label={t(dict, 'blog.topics.label')}
				currentSlug={page.topic.slug}
				className="mt-16"
			/>
		</main>
	)
}
