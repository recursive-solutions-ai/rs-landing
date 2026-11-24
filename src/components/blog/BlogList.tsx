'use client'

import { useMemo, useState } from 'react'
import { BlogSearch } from '@growth-engine/sdk-client/components'
import { BlogCard, type BlogCardPost } from './BlogCard'

const BLOG_POSTS_PER_PAGE = 9

/**
 * Grid is 1 col < md, 2 cols md, 3 cols lg inside `container mx-auto px-4`
 * (container caps at 1536px, so cards top out near 485px wide).
 */
export const BLOG_LIST_IMAGE_SIZES =
	'(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33vw, 485px'

/** Cards in the first desktop row are above the fold on the blog index. */
const EAGER_CARDS = 3

interface BlogListProps {
	posts: BlogCardPost[]
	locale: string
	/** URL prefix for the locale: '' for the default language, '/fr' otherwise. */
	localePrefix: string
	translations: {
		noPostsMessage: string
		clearSearchLabel: string
		searchPlaceholder: string
	}
	/** Posts per page (default 9). */
	postsPerPage?: number
}

/**
 * Local replacement for the SDK BlogList (client-side search + pagination),
 * ported 1:1 minus the authors / URL-driven pagination props this site never
 * passes. Cards use the local next/image-backed BlogCard.
 */
export function BlogList({ posts, locale, localePrefix, translations, postsPerPage }: BlogListProps) {
	const perPage = postsPerPage ?? BLOG_POSTS_PER_PAGE
	const [search, setSearch] = useState('')
	const [clientPage, setClientPage] = useState(1)

	const filtered = useMemo(() => {
		if (!search.trim()) return posts
		const q = search.toLowerCase()
		return posts.filter(
			(p) => p.title.toLowerCase().includes(q) || (p.seoDesc && p.seoDesc.toLowerCase().includes(q)),
		)
	}, [posts, search])

	const totalPages = Math.ceil(filtered.length / perPage)
	const paginated = filtered.slice((clientPage - 1) * perPage, clientPage * perPage)

	return (
		<section aria-label="Blog posts">
			<BlogSearch
				value={search}
				onChange={(v) => {
					setSearch(v)
					setClientPage(1)
				}}
				placeholder={translations.searchPlaceholder}
			/>

			{paginated.length === 0 ? (
				<div className="text-center py-16 text-base-content/50">
					<p className="text-lg">{translations.noPostsMessage}</p>
					{search && (
						<button onClick={() => setSearch('')} className="btn btn-ghost btn-sm mt-2">
							{translations.clearSearchLabel}
						</button>
					)}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{paginated.map((post, i) => (
						<BlogCard
							key={post.slug}
							slug={post.slug}
							title={post.title}
							content={post.content}
							heroImageUrl={post.heroImageUrl}
							seoDesc={post.seoDesc}
							createdAt={post.createdAt}
							locale={locale}
							localePrefix={localePrefix}
							imageSizes={BLOG_LIST_IMAGE_SIZES}
							eager={clientPage === 1 && i < EAGER_CARDS}
						/>
					))}
				</div>
			)}

			{totalPages > 1 && (
				<div className="flex justify-center mt-8">
					<nav aria-label="Blog pagination" className="join">
						<button
							className="join-item btn btn-sm"
							disabled={clientPage <= 1}
							onClick={() => setClientPage(clientPage - 1)}
							aria-label="Previous page"
						>
							«
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
							<button
								key={p}
								className={`join-item btn btn-sm ${p === clientPage ? 'btn-active' : ''}`}
								onClick={() => setClientPage(p)}
								aria-label={`Page ${p}`}
								aria-current={p === clientPage ? 'page' : undefined}
							>
								{p}
							</button>
						))}
						<button
							className="join-item btn btn-sm"
							disabled={clientPage >= totalPages}
							onClick={() => setClientPage(clientPage + 1)}
							aria-label="Next page"
						>
							»
						</button>
					</nav>
				</div>
			)}
		</section>
	)
}
