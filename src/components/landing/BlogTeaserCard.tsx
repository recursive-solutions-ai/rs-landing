"use client"

import type { CSSProperties } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

export interface BlogTeaser {
	slug: string
	title: string
	heroImageUrl: string | null
	seoDesc: string | null
	createdAt: string | Date
}

interface BlogTeaserCardProps {
	post: BlogTeaser
	locale: string
	index: number
}

export function BlogTeaserCard({ post, locale, index }: BlogTeaserCardProps) {
	return (
		<Link
			href={`/${locale}/blog/${post.slug}`}
			className={cn(
				"reveal group flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100",
				"transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
			)}
			style={{ "--reveal-delay": `${0.1 + index * 0.1}s` } as CSSProperties}
		>
			{/* Hero image (or neutral placeholder when a post has none) */}
			<div className="aspect-video overflow-hidden bg-base-200">
				{post.heroImageUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={post.heroImageUrl}
						alt={post.title}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="h-full w-full bg-gradient-to-br from-base-200 to-base-300" />
				)}
			</div>

			{/* Body */}
			<div className="flex flex-1 flex-col p-6">
				<time className="text-sm text-base-content/50">
					{formatDate(post.createdAt, locale)}
				</time>
				<h3 className="mt-2 line-clamp-2 text-lg font-bold text-base-content">
					{post.title}
				</h3>
				{post.seoDesc && (
					<p className="mt-3 line-clamp-3 text-base leading-relaxed text-base-content/60">
						{post.seoDesc}
					</p>
				)}
			</div>
		</Link>
	)
}
