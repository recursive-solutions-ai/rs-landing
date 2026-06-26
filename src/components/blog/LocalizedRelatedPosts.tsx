import Link from 'next/link'
import type { BlogPost } from '@growth-engine/sdk-client'
import { localizedPath } from '@/lib/i18n-utils'

export function LocalizedRelatedPosts({
	posts,
	currentSlug,
	locale,
	heading,
}: {
	posts: BlogPost[]
	currentSlug: string
	locale: string
	heading: string
}) {
	const related = posts.filter((post) => post.slug !== currentSlug).slice(0, 3)
	if (related.length === 0) return null

	return (
		<section className="mt-16 border-t border-base-300 pt-10">
			<h2 className="text-2xl font-bold mb-6">{heading}</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{related.map((post) => (
					<Link
						key={post.slug}
						href={localizedPath(`/blog/${post.slug}`, locale)}
						className="card bg-base-100 border border-base-200 hover:shadow-md transition-shadow"
					>
						<div className="card-body">
							<h3 className="card-title text-base">{post.title}</h3>
							{post.seoDesc && (
								<p className="text-sm text-base-content/60 line-clamp-2">
									{post.seoDesc}
								</p>
							)}
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
