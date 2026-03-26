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
					"group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gray-900 transition-shadow duration-500 hover:shadow-2xl",
					study.span === "wide" && "md:col-span-2",
					study.span === "tall" && "md:row-span-2"
				)}
			>
				{/* Image area — flex-1 so it grows to fill all space above the text */}
				<div className="relative min-h-[80px] flex-1 overflow-hidden">
					<div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
					<img
						src={study.image}
						alt=""
						className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
						loading="lazy"
					/>
					{/* Category badge */}
					<span className="absolute left-4 top-3 z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
						{study.category}
					</span>
				</div>

				{/* Text area — gradient background fades into image above, no fixed height */}
				<div className="bg-gradient-to-t from-gray-900 from-60% to-transparent px-5 pb-5 pt-10">
					<h3 className="mb-1.5 text-base font-bold text-white">
						{study.title}
					</h3>
					<p className="text-sm leading-snug text-white/70">
						{study.description}
					</p>
				</div>

				{/* Bottom accent bar on hover */}
				<div className="absolute bottom-0 left-0 right-0 z-20 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
			</div>
		)
	}
)
