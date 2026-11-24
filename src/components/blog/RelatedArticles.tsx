import { BlogCard, type BlogCardPost } from './BlogCard'

/**
 * Cards sit in `max-w-5xl` (1024px) inside `container px-4`: 1 col < sm,
 * 2 cols sm, 3 cols md (4 cols lg when 4+ posts). Cards top out near 325px.
 */
export const RELATED_IMAGE_SIZES =
	'(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1087px) 33vw, 325px'

interface RelatedArticlesProps {
	/** Already ranked (getRelatedPosts). */
	posts: BlogCardPost[]
	locale: string
	/** URL prefix for the locale: '' for the default language, '/fr' otherwise. */
	localePrefix: string
	heading: string
}

/**
 * Local replacement for the SDK RelatedArticles, minus the booking-CTA slot
 * this site never uses. Same markup; cards use the next/image-backed BlogCard.
 * Related cards sit below the article, so their images stay lazy.
 */
export function RelatedArticles({ posts, locale, localePrefix, heading }: RelatedArticlesProps) {
	if (posts.length === 0) return null
	const columns = posts.length >= 4 ? 'lg:grid-cols-4' : 'md:grid-cols-3'

	return (
		<aside aria-label={heading} className="mt-16">
			<h2 className="text-2xl font-bold mb-6">{heading}</h2>
			<div className={`grid grid-cols-1 sm:grid-cols-2 ${columns} gap-6`}>
				{posts.map((post) => (
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
						imageSizes={RELATED_IMAGE_SIZES}
					/>
				))}
			</div>
		</aside>
	)
}
