"use client"

import { forwardRef } from "react"
import type { CaseStudy } from "@/data/landing"
import { cn } from "@/lib/utils"

interface CaseStudyCardProps {
	study: CaseStudy
}

const GRADIENT_MAP: Record<string, string> = {
	"case-1": "from-purple-600 to-indigo-900",
	"case-2": "from-emerald-500 to-teal-900",
	"case-3": "from-orange-500 to-rose-900",
	"case-4": "from-sky-500 to-blue-900",
	"case-5": "from-fuchsia-500 to-purple-900",
	"case-6": "from-amber-500 to-orange-900",
}

export const CaseStudyCard = forwardRef<HTMLDivElement, CaseStudyCardProps>(
	function CaseStudyCard({ study }, ref) {
		const gradient = GRADIENT_MAP[study.id] ?? "from-gray-500 to-gray-900"

		return (
			<div
				ref={ref}
				className={cn(
					"group relative flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-shadow duration-500 hover:shadow-2xl",
					study.span === "wide" && "md:col-span-2",
					study.span === "tall" && "md:row-span-2"
				)}
			>
				{/* Image area with gradient placeholder */}
				<div
					className={cn(
						"relative overflow-hidden",
						study.span === "tall" ? "aspect-[3/4]" : "aspect-video"
					)}
				>
					<div
						className={cn(
							"absolute inset-0 bg-gradient-to-br transition-transform duration-700",
							gradient,
							"group-hover:scale-105"
						)}
						style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
					/>

					{/* Category badge */}
					<span className="absolute left-4 top-4 z-10 rounded-full bg-dark/40 px-3 py-1 text-xs font-semibold text-dark-foreground backdrop-blur-sm">
						{study.category}
					</span>

					{/* Bottom accent bar on hover */}
					<div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col p-5">
					<h3 className="mb-1 text-lg font-bold text-base-content transition-transform duration-300 group-hover:-translate-y-0.5">
						{study.title}
					</h3>
					<p className="text-sm leading-relaxed text-base-content/60">
						{study.description}
					</p>
				</div>
			</div>
		)
	}
)
