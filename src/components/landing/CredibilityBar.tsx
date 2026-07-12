"use client"

import Image from "next/image"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

const CLIENTS = [
	{ name: "HCCI", src: "/logos/hcci.png" },
	{ name: "Roadmap Tax Services, Inc.", src: "/logos/roadmap-tax.jpg" },
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
					<span className="text-[10px] font-bold uppercase tracking-widest text-base-content/70">
						Trusted by
					</span>
					<div className="flex items-center gap-3">
						{CLIENTS.map((client) => (
							<div
								key={client.name}
								className="relative h-10 w-28 overflow-hidden rounded-md bg-neutral"
							>
								<Image
									src={client.src}
									alt={client.name}
									fill
									sizes="112px"
									className="object-contain p-1.5"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
