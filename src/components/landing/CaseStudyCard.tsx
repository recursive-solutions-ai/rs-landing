"use client"

import { forwardRef } from "react"
import type { OutcomeItem } from "@/data/landing"
import { cn } from "@/lib/utils"

interface CaseStudyCardProps {
	study: OutcomeItem
}

export const CaseStudyCard = forwardRef<HTMLDivElement, CaseStudyCardProps>(
	function CaseStudyCard({ study }, ref) {
		return (
			<div
				ref={ref}
				className={cn(
					"group relative flex flex-col rounded-2xl border border-base-300 bg-base-100 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
				)}
			>
				<span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-base-content/50">
					{study.category}
				</span>
				<h3 className="mb-3 text-xl font-bold text-base-content">
					{study.title}
				</h3>
				<p className="text-base leading-relaxed text-base-content/70">
					{study.description}
				</p>
			</div>
		)
	}
)
