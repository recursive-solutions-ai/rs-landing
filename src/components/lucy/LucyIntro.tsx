"use client"

import type { CSSProperties } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faLayerGroup,
	faUsersGear,
	faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

const VALUES = [
	{
		icon: faLayerGroup,
		label: "One system, not a stack",
		sub: "Website, content, SEO, leads, CRM, and analytics in one place.",
	},
	{
		icon: faUsersGear,
		label: "Run for you, not by you",
		sub: "A hands-on team operates and improves it alongside you.",
	},
	{
		icon: faArrowTrendUp,
		label: "Improves every week",
		sub: "The system gets sharper the longer it runs.",
	},
]

export function LucyIntro() {
	const { ref, inView } = useInView<HTMLDivElement>()
	return (
		<section className="bg-primary">
			<div
				ref={ref}
				className={cn("mx-auto max-w-4xl px-6 py-12 text-center", inView && "reveal-in")}
			>
				<div className="grid gap-6 sm:grid-cols-3">
					{VALUES.map((v, i) => (
						<div
							key={v.label}
							className="reveal flex flex-col rounded-2xl border border-base-300 bg-base-100 p-8 text-left transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
							style={{ "--reveal-delay": `${0.1 + i * 0.08}s` } as CSSProperties}
						>
							<span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
								<FontAwesomeIcon icon={v.icon} className="h-6 w-6" />
							</span>
							<h3 className="mb-3 text-xl font-bold text-base-content">{v.label}</h3>
							<p className="text-base leading-relaxed text-base-content/70">{v.sub}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
