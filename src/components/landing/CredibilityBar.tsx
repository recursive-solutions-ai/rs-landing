"use client"

import Image from "next/image"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

const CLIENTS: {
	name: string
	src: string
	width: number
	height: number
	href?: string
}[] = [
	{
		name: "Harrington Construction Co., Inc.",
		src: "/logos/hcci.png",
		width: 1137,
		height: 215,
		href: "https://www.hccigroup.com/",
	},
	{
		name: "Roadmap Tax Services, Inc.",
		src: "/logos/roadmap-tax.jpg",
		width: 1800,
		height: 631,
		href: "https://www.roadmaptax.com/en",
	},
	{
		name: "My Little Paris Cafe",
		src: "/logos/my-little-paris.png",
		width: 514,
		height: 118,
		href: "https://www.my-little-paris.com/",
	},
	{
		name: "Echo Scribe",
		src: "/logos/echo-scribe.png",
		width: 189,
		height: 56,
		href: "https://desduvauchelle.github.io/echo-scribe/#",
	},
]

export function CredibilityBar() {
	const { ref, inView } = useInView<HTMLDivElement>()

	return (
		<section className="border-y border-base-300 bg-base-200">
			<div
				ref={ref}
				className={cn(
					"mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between",
					inView && "reveal-in"
				)}
			>
				<p className="reveal max-w-2xl text-sm font-medium text-base-content/80 md:text-base">
					<span className="font-bold text-primary">Operators, not theorists.</span>{" "}
					Forged in special operations, business, and engineering.  We build the systems that give companies an edge.
				</p>
				<div className="reveal flex items-center gap-4">
					<span className="text-[10px] font-bold uppercase tracking-widest text-base-content/50">
						Trusted by
					</span>
					<div className="flex flex-wrap items-center gap-3">
						{CLIENTS.map((client) => {
							const logo = (
								<Image
									src={client.src}
									alt={client.name}
									width={client.width}
									height={client.height}
									className="h-10 w-auto max-w-48 object-contain p-1.5"
								/>
							)
							const boxClass =
								"inline-flex overflow-hidden rounded-md bg-neutral"

							return client.href ? (
								<a
									key={client.name}
									href={client.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Visit ${client.name}`}
									className={cn(
										boxClass,
										"transition hover:scale-105 hover:ring-2 hover:ring-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
									)}
								>
									{logo}
								</a>
							) : (
								<div key={client.name} className={boxClass}>
									{logo}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
