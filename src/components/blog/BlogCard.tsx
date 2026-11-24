import Link from 'next/link'
import { ContentImage } from '@/components/ui/ContentImage'
import { formatDate } from '@/lib/i18n-utils'

export interface BlogCardPost {
	slug: string
	title: string
	content: string
	heroImageUrl: string | null
	seoDesc: string | null
	createdAt: Date | string
}

interface BlogCardProps extends BlogCardPost {
	locale: string
	/** URL prefix for the locale: '' for the default language, '/fr' otherwise. */
	localePrefix: string
	/** `sizes` for the hero image; depends on the grid the card sits in. */
	imageSizes: string
	/** Above-the-fold card: load eagerly with high fetch priority (LCP). */
	eager?: boolean
}

/**
 * Local replacement for the Growth Engine SDK BlogCard (which renders a raw
 * <img> and has no image slot). Markup, classes and microdata are identical;
 * only the image goes through next/image. Server/client agnostic.
 */
export function BlogCard({
	slug,
	title,
	content,
	heroImageUrl,
	seoDesc,
	createdAt,
	locale,
	localePrefix,
	imageSizes,
	eager = false,
}: BlogCardProps) {
	// formatDate matches the SDK's (toLocaleDateString, long month).
	const date = formatDate(createdAt, locale)
	const isoDate = new Date(createdAt).toISOString()
	const preview = seoDesc ?? content.replace(/<[^>]*>/g, '').slice(0, 160) + '...'

	return (
		<article itemScope itemType="https://schema.org/BlogPosting">
			<Link
				href={`${localePrefix}/blog/${slug}`}
				className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow group"
			>
				{heroImageUrl && (
					<figure className="relative aspect-video overflow-hidden">
						<ContentImage
							src={heroImageUrl}
							alt={title}
							fill
							sizes={imageSizes}
							loading={eager ? 'eager' : 'lazy'}
							fetchPriority={eager ? 'high' : undefined}
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</figure>
				)}
				<div className="card-body">
					<time className="text-xs text-base-content/50" dateTime={isoDate}>
						{date}
					</time>
					<h2 className="card-title text-lg group-hover:text-primary transition-colors">{title}</h2>
					<p className="text-sm text-base-content/70 line-clamp-3">{preview}</p>
				</div>
			</Link>
		</article>
	)
}
