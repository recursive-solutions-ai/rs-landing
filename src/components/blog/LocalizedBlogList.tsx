'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@growth-engine/sdk-client'
import { formatDate, localizedPath } from '@/lib/i18n-utils'

interface LocalizedBlogListTranslations {
	noPostsMessage: string
	clearSearchLabel: string
	searchPlaceholder: string
}

interface LocalizedBlogListProps {
	posts: BlogPost[]
	locale: string
	translations: LocalizedBlogListTranslations
}

function previewText(post: BlogPost): string {
	const text = post.seoDesc ?? post.content.replace(/<[^>]*>/g, '').trim()
	return text.length > 160 ? `${text.slice(0, 160).trimEnd()}...` : text
}

export function LocalizedBlogList({
	posts,
	locale,
	translations,
}: LocalizedBlogListProps) {
	const [query, setQuery] = useState('')
	const normalizedQuery = query.trim().toLowerCase()

	const filteredPosts = useMemo(() => {
		if (!normalizedQuery) return posts
		return posts.filter((post) => {
			const haystack = `${post.title} ${post.seoDesc ?? ''} ${post.content}`.toLowerCase()
			return haystack.includes(normalizedQuery)
		})
	}, [normalizedQuery, posts])

	return (
		<div className="space-y-8">
			<div className="mx-auto max-w-xl">
				<input
					type="search"
					className="input input-bordered w-full"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder={translations.searchPlaceholder}
					aria-label={translations.searchPlaceholder}
				/>
				{query && (
					<button
						type="button"
						className="btn btn-ghost btn-sm mt-2"
						onClick={() => setQuery('')}
					>
						{translations.clearSearchLabel}
					</button>
				)}
			</div>

			{filteredPosts.length === 0 ? (
				<p className="text-center text-base-content/60 py-16">
					{translations.noPostsMessage}
				</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredPosts.map((post) => (
						<article
							key={post.slug}
							itemScope
							itemType="https://schema.org/BlogPosting"
						>
							<Link
								href={localizedPath(`/blog/${post.slug}`, locale)}
								className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow group h-full"
							>
								{post.heroImageUrl && (
									<figure className="aspect-video overflow-hidden">
										<img
											src={post.heroImageUrl}
											alt={post.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</figure>
								)}
								<div className="card-body">
									<time
										className="text-xs text-base-content/50"
										dateTime={new Date(post.createdAt).toISOString()}
									>
										{formatDate(post.createdAt, locale)}
									</time>
									<h2 className="card-title text-lg group-hover:text-primary transition-colors">
										{post.title}
									</h2>
									<p className="text-sm text-base-content/70 line-clamp-3">
										{previewText(post)}
									</p>
								</div>
							</Link>
						</article>
					))}
				</div>
			)}
		</div>
	)
}
