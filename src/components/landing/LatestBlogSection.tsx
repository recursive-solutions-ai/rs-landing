"use client"

import Link from "next/link"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { BlogTeaserCard, type BlogTeaser } from "./BlogTeaserCard"

interface LatestBlogSectionProps {
	posts: BlogTeaser[]
	locale: string
}

export function LatestBlogSection({ posts, locale }: LatestBlogSectionProps) {
	const { ref, inView } = useInView<HTMLElement>()

	// Nothing to show (no posts, or Turso unconfigured) — render nothing so the
	// landing page never shows an empty row above the footer.
	if (posts.length === 0) return null

	return (
		<section
			ref={ref}
			id="latest-blog"
			className={cn("mx-auto max-w-7xl px-6 py-16", inView && "reveal-in")}
		>
			{/* Header row: heading left, text-only "View all" link right */}
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div className="reveal">
					<span className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
						<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
						From the Blog
					</span>
					<h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-base-content md:text-4xl">
						Latest from the Blog
					</h2>
				</div>
				<Link
					href={`/${locale}/blog`}
					className="reveal text-sm font-semibold text-primary transition-colors hover:underline"
				>
					View all →
				</Link>
			</div>

			{/* Cards */}
			<div className="mt-12 grid gap-6 md:grid-cols-3">
				{posts.map((post, i) => (
					<BlogTeaserCard
						key={post.slug}
						post={post}
						locale={locale}
						index={i}
					/>
				))}
			</div>
		</section>
	)
}
