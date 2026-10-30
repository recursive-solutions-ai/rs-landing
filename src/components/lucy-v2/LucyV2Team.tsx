"use client"

import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import { team, type TeamMember } from "@/data/landing"
import { gsap } from "./gsap"

function LinkedInLink({ href, name }: { href: string; name: string }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`${name} on LinkedIn`}
			className="text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
		>
			<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
			</svg>
		</a>
	)
}

function Photo({ member, size }: { member: TeamMember; size: number }) {
	const box = { width: size, height: size }
	return member.image ? (
		<div style={box} className="shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
			<Image src={member.image} alt={member.name} width={size} height={size} sizes={`${size}px`} className="size-full object-cover" />
		</div>
	) : (
		<div style={box} className="flex shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-3xl font-semibold text-white ring-2 ring-white/10">
			{member.initials}
		</div>
	)
}

export function LucyV2Team() {
	const root = useRef<HTMLElement>(null)
	useLayoutEffect(() => {
		const el = root.current
		if (!el) return
		const mm = gsap.matchMedia()
		mm.add("(prefers-reduced-motion: no-preference)", () => {
			gsap.utils.toArray<HTMLElement>(".lv2-tm").forEach((card, i) => {
				gsap.fromTo(
					card,
					{ y: 60 + i * 20, scale: 0.94, opacity: 0.2 },
					{ y: 0, scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 100%", end: "top 62%", scrub: 0.5 } },
				)
			})
		})
		return () => mm.revert()
	}, [])

	const [lead, ...rest] = team
	const card = "lv2-tm rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-8"

	return (
		<section ref={root} id="team" aria-labelledby="lv2-team-h" className="relative px-5 py-24 sm:px-8 md:py-36">
			<div className="mx-auto max-w-3xl text-center">
				<p className="flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
					<span aria-hidden="true" className="size-1.5 rounded-full bg-sky-400" />
					Who we are
				</p>
				<h2 id="lv2-team-h" className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
					Built by operators.
				</h2>
			</div>

			<div className="mx-auto mt-16 flex max-w-5xl flex-col gap-5">
				<div className={`${card} flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left`}>
					<Photo member={lead} size={160} />
					<div className="min-w-0">
						<div className="mb-1 flex items-center justify-center gap-2.5 sm:justify-start">
							<h3 className="font-display text-3xl font-semibold tracking-tight text-white">{lead.name}</h3>
							{lead.linkedin && <LinkedInLink href={lead.linkedin} name={lead.name} />}
						</div>
						<p className="mb-4 text-sm font-semibold text-sky-300">{lead.role}</p>
						<p className="text-[15px] leading-relaxed text-white/60">{lead.bio}</p>
					</div>
				</div>

				<div className="grid gap-5 md:grid-cols-2">
					{rest.map((m) => (
						<div key={m.name} className={`${card} flex flex-col items-center text-center`}>
							<div className="mb-6"><Photo member={m} size={144} /></div>
							<div className="mb-1 flex items-center justify-center gap-2.5">
								<h3 className="font-display text-2xl font-semibold tracking-tight text-white">{m.name}</h3>
								{m.linkedin && <LinkedInLink href={m.linkedin} name={m.name} />}
							</div>
							<p className="mb-4 text-sm font-semibold text-sky-300">{m.role}</p>
							<p className="text-[15px] leading-relaxed text-white/60">{m.bio}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
