"use client"

import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	gsap,
	useGSAP,
	EASE_REVEAL,
	DISTANCE_SM,
	DISTANCE_MD,
	DURATION_NORMAL,
	START_HEADING,
	START_CONTENT,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { featurePillars, type FeaturePillar } from "@/data/landing"
import { AttractVisual } from "./pillar-visuals/AttractVisual"
import { EngageVisual } from "./pillar-visuals/EngageVisual"
import { CaptureVisual } from "./pillar-visuals/CaptureVisual"
import { CloseVisual } from "./pillar-visuals/CloseVisual"
import { OptimizeVisual } from "./pillar-visuals/OptimizeVisual"

function PillarVisual({ kind }: { kind: FeaturePillar["visual"] }) {
	switch (kind) {
		case "attract":
			return <AttractVisual />
		case "engage":
			return <EngageVisual />
		case "capture":
			return <CaptureVisual />
		case "close":
			return <CloseVisual />
		case "optimize":
			return <OptimizeVisual />
	}
}

function PillarRow({ pillar }: { pillar: FeaturePillar }) {
	const rowRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (prefersReduced || !rowRef.current) return

			const eyebrow = rowRef.current.querySelector<HTMLElement>("[data-eyebrow]")
			const headline = rowRef.current.querySelector<HTMLElement>("[data-headline]")
			const promise = rowRef.current.querySelector<HTMLElement>("[data-promise]")
			const bullets = rowRef.current.querySelectorAll<HTMLElement>("[data-bullet]")
			const visual = rowRef.current.querySelector<HTMLElement>("[data-visual]")

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: rowRef.current,
					start: START_CONTENT,
					toggleActions: "play none none none",
				},
			})

			tl.fromTo(
				eyebrow,
				{ y: DISTANCE_SM, opacity: 0 },
				{ y: 0, opacity: 1, duration: DURATION_NORMAL, ease: EASE_REVEAL }
			)
				.fromTo(
					headline,
					{ y: DISTANCE_SM, opacity: 0 },
					{ y: 0, opacity: 1, duration: DURATION_NORMAL, ease: EASE_REVEAL },
					"-=0.5"
				)
				.fromTo(
					promise,
					{ y: DISTANCE_SM, opacity: 0 },
					{ y: 0, opacity: 1, duration: DURATION_NORMAL, ease: EASE_REVEAL },
					"-=0.5"
				)
				.fromTo(
					bullets,
					{ y: DISTANCE_SM, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: DURATION_NORMAL,
						stagger: 0.08,
						ease: EASE_REVEAL,
					},
					"-=0.4"
				)
				.fromTo(
					visual,
					{ y: DISTANCE_MD, opacity: 0 },
					{ y: 0, opacity: 1, duration: DURATION_NORMAL, ease: EASE_REVEAL },
					"<"
				)
		},
		{ scope: rowRef, dependencies: [prefersReduced] }
	)

	return (
		<div
			ref={rowRef}
			className="grid grid-cols-1 items-center gap-8 py-16 md:grid-cols-[2fr_3fr] md:gap-12 md:py-24"
		>
			{/* Text column */}
			<div className="max-w-sm">
				<div data-eyebrow className="mb-6 flex items-center gap-3">
					<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
						<FontAwesomeIcon icon={pillar.icon} className="text-sm" />
					</span>
					<span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
						{pillar.num} <span className="text-primary/50">·</span>{" "}
						{pillar.eyebrow}
					</span>
				</div>

				<h3
					data-headline
					className="mb-5 font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-base-content md:text-4xl"
				>
					{pillar.headline}
				</h3>

				<p
					data-promise
					className="mb-8 text-base leading-relaxed text-base-content/60 md:text-lg"
				>
					{pillar.promise}
				</p>

				<ul className="space-y-4">
					{pillar.bullets.map((b) => (
						<li
							key={b.label}
							data-bullet
							className="flex items-start gap-3"
						>
							<span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-base-content/5 text-base-content/70 ring-1 ring-base-content/10">
								<FontAwesomeIcon icon={b.icon} className="text-xs" />
							</span>
							<div>
								<div className="text-sm font-semibold text-base-content">
									{b.label}
								</div>
								<div className="text-sm text-base-content/55">{b.sub}</div>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Visual column */}
			<div data-visual className="w-full">
				<PillarVisual kind={pillar.visual} />
			</div>
		</div>
	)
}

export function FeaturePillarsSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const headingRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (!headingRef.current || prefersReduced) return
			const children = headingRef.current.children
			gsap.set(children, { y: DISTANCE_SM, opacity: 0 })
			gsap.to(children, {
				y: 0,
				opacity: 1,
				duration: DURATION_NORMAL,
				stagger: 0.12,
				ease: EASE_REVEAL,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: START_HEADING,
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	return (
		<section
			ref={sectionRef}
			id="platform"
			className="relative mx-auto max-w-6xl px-6 py-24 md:py-32"
		>
			{/* Section header
			<div ref={headingRef} className="mx-auto max-w-3xl text-center">
				<span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
					The Platform
				</span>
				<h2 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-base-content md:text-6xl">
					One platform. Five jobs.
					<br />
					<span className="text-base-content/40">Built to compound.</span>
				</h2>
				<p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-base-content/60">
					Lucy runs your entire funnel. Every job lives in one place and learns
					from the others.
				</p>
			</div> */}

			{/* Pillar rows */}
			<div className="mt-20 divide-y divide-base-content/5">
				{featurePillars.map((pillar) => (
					<PillarRow key={pillar.num} pillar={pillar} />
				))}
			</div>
		</section>
	)
}
