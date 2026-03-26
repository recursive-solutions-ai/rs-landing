"use client"

import { forwardRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { ServiceItem } from "@/data/landing"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
	service: ServiceItem
	index: number
}

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
	function ServiceCard({ service, index }, ref) {
		const useAccent = index >= 2

		return (
			<div
				ref={ref}
				className={cn(
					"group relative flex min-h-[280px] flex-col rounded-2xl border bg-base-100 p-8",
					"border-base-300 transition-all duration-500",
					useAccent
						? "hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
						: "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
					"hover:-translate-y-1"
				)}
			>
				{/* Icon */}
				<div
					className={cn(
						"mb-6 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110",
						useAccent
							? "bg-accent/10 text-accent"
							: "bg-primary/10 text-primary"
					)}
				>
					<FontAwesomeIcon icon={service.icon} className="h-6 w-6" />
				</div>

				{/* Title */}
				<h3 className="mb-3 text-xl font-bold text-base-content">
					{service.title}
				</h3>

				{/* Description */}
				<p className="text-base leading-relaxed text-base-content/70">
					{service.description}
				</p>

				{/* Learn more hint */}
				<div className="mt-auto pt-4 flex items-center gap-1.5 text-sm font-semibold opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
					style={{ color: useAccent ? "oklch(var(--a))" : "oklch(var(--p))" }}
				>
					Learn more
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</div>
			</div>
		)
	}
)
