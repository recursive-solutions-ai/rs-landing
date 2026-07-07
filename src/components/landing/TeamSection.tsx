"use client"

import Image from "next/image"
import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { team } from "@/data/landing"
import { SectionHeading } from "./SectionHeading"

function LinkedInLink({ href, name }: { href: string; name: string }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`${name} on LinkedIn`}
			className="text-base-content/40 transition-colors hover:text-primary"
		>
			<svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
			</svg>
		</a>
	)
}

export function TeamSection() {
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="team"
			className={cn("mx-auto max-w-5xl px-6 py-16", inView && "reveal-in")}
		>
			<SectionHeading
				tag="Who We Are"
				title="Built by Operators"
				subtitle=""
				className="mb-8"
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
						<div className="mb-1 flex items-center justify-center gap-2.5 sm:justify-start">
							<h3 className="text-2xl font-bold text-base-content">{team[0].name}</h3>
							{team[0].linkedin && (
								<LinkedInLink href={team[0].linkedin} name={team[0].name} />
							)}
						</div>
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
							<div className="mb-1 flex items-center justify-center gap-2.5">
								<h3 className="text-xl font-bold text-base-content">{member.name}</h3>
								{member.linkedin && (
									<LinkedInLink href={member.linkedin} name={member.name} />
								)}
							</div>
							<p className="mb-4 text-sm font-semibold text-primary">{member.role}</p>
							<p className="text-sm leading-relaxed text-base-content/60">{member.bio}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
