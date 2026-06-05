"use client"

import Image from "next/image"
import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { team } from "@/data/landing"
import { SectionHeading } from "./SectionHeading"

export function TeamSection() {
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="team"
			className={cn("mx-auto max-w-5xl px-6 py-32", inView && "reveal-in")}
		>
			<SectionHeading
				tag="Who We Are"
				title="Built by Operators"
				subtitle="We've spent our careers inside the businesses we now serve. We know what works because we've lived it."
				className="mb-16"
			/>

			<div className="flex flex-col gap-8">
				{/* Jake — featured */}
				<div
					className="reveal flex flex-col sm:flex-row gap-8 items-center rounded-2xl border border-primary/30 bg-base-100 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
					style={{ "--reveal-delay": "0.3s" } as CSSProperties}
				>
					{team[0].image ? (
						<div className="shrink-0 h-40 w-40 overflow-hidden rounded-full ring-2 ring-primary/30">
							<Image
								src={team[0].image}
								alt={team[0].name}
								width={160}
								height={160}
								sizes="160px"
								className="h-full w-full object-cover"
							/>
						</div>
					) : (
						<div className="shrink-0 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent text-4xl font-bold text-primary-content">
							{team[0].initials}
						</div>
					)}
					<div className="flex flex-col sm:text-left text-center">
						<h3 className="mb-1 text-2xl font-bold text-base-content">{team[0].name}</h3>
						<p className="mb-4 text-sm font-semibold text-primary">{team[0].role}</p>
						<p className="text-sm leading-relaxed text-base-content/60">{team[0].bio}</p>
					</div>
				</div>

				{/* Luc & Denis — row */}
				<div className="grid gap-8 md:grid-cols-2">
					{team.slice(1).map((member, i) => (
						<div
							key={member.name}
							className="reveal flex flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30"
							style={{ "--reveal-delay": `${0.45 + i * 0.15}s` } as CSSProperties}
						>
							{member.image ? (
								<div className="mb-6 h-36 aspect-square overflow-hidden rounded-full ring-2 ring-primary/20">
									<Image
										src={member.image}
										alt={member.name}
										width={144}
										height={144}
										sizes="144px"
										className="h-full w-full object-cover"
									/>
								</div>
							) : (
								<div className="mb-6 flex h-36 aspect-square items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent text-3xl font-bold text-primary-content">
									{member.initials}
								</div>
							)}
							<h3 className="mb-1 text-xl font-bold text-base-content">{member.name}</h3>
							<p className="mb-4 text-sm font-semibold text-primary">{member.role}</p>
							<p className="text-sm leading-relaxed text-base-content/60">{member.bio}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
