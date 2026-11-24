'use client'

import { useMemo, useState } from 'react'
import { BlogSearch } from '@growth-engine/sdk-client/components'
import { BlogCard, type BlogCardPost } from './BlogCard'
import { paginationItems } from '@/lib/pagination'

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

interface PaginationRenderOptions {
	current: number
	total: number
	siblings: number
	/** Size classes for every join item (button height / width). */
	size: string
	onChange: (page: number) => void
}

function renderPagination({ current, total, siblings, size, onChange }: PaginationRenderOptions) {
	return (
		<>
			<button
				className={`join-item btn ${size}`}
				disabled={current <= 1}
				onClick={() => onChange(current - 1)}
				aria-label="Previous page"
			>
				«
			</button>
			{paginationItems(current, total, siblings).map((item, i) =>
				item === 'ellipsis' ? (
					<span
						key={`ellipsis-${i}`}
						aria-hidden="true"
						className={`join-item btn ${size} pointer-events-none cursor-default`}
					>
						…
					</span>
				) : (
					<button
						key={item}
						className={`join-item btn ${size} ${item === current ? 'btn-active' : ''}`}
						onClick={() => onChange(item)}
						aria-label={`Page ${item}`}
						aria-current={item === current ? 'page' : undefined}
					>
						{item}
					</button>
				),
			)}
			<button
				className={`join-item btn ${size}`}
				disabled={current >= total}
				onClick={() => onChange(current + 1)}
				aria-label="Next page"
			>
				»
			</button>
		</>
	)
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
					<nav aria-label="Blog pagination">
						{/* Below sm: no siblings and larger tap targets so it fits 320px viewports. */}
						<div className="join sm:hidden">
							{renderPagination({ current: clientPage, total: totalPages, siblings: 0, size: 'btn-md min-w-10 px-0', onChange: setClientPage })}
						</div>
						<div className="join hidden sm:inline-flex">
							{renderPagination({ current: clientPage, total: totalPages, siblings: 1, size: 'btn-sm', onChange: setClientPage })}
						</div>
					</nav>
				</div>
			)}
		</section>
	)
}
