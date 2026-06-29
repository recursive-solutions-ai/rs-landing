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
		<section className="bg-base-100">
			<div
				ref={ref}
				className={cn("mx-auto max-w-4xl px-6 py-20 text-center", inView && "reveal-in")}
			>
				<p className="reveal mx-auto max-w-2xl text-xl leading-relaxed text-base-content md:text-2xl">
					Lucy is the unified platform designed by Recursive Solutions. Instead of a dozen
					disconnected tools, one system attracts, engages, captures, and converts — and we
					run and improve it with you.
				</p>
				<div className="mt-12 grid gap-6 sm:grid-cols-3">
					{VALUES.map((v, i) => (
						<div
							key={v.label}
							className="reveal"
							style={{ "--reveal-delay": `${0.1 + i * 0.08}s` } as CSSProperties}
						>
							<span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
								<FontAwesomeIcon icon={v.icon} />
							</span>
							<div className="font-semibold text-base-content">{v.label}</div>
							<div className="mt-1 text-sm text-base-content/60">{v.sub}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
