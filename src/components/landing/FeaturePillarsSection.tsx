"use client"

import type { CSSProperties } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
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
	const { ref, inView } = useInView<HTMLDivElement>()

	return (
		<div
			ref={ref}
			className={cn(
				"grid grid-cols-1 items-center gap-8 py-16 md:grid-cols-[2fr_3fr] md:gap-12 md:py-24",
				inView && "reveal-in"
			)}
		>
			{/* Text column */}
			<div className="max-w-sm">
				<div className="reveal mb-6 flex items-center gap-3">
					<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
						<FontAwesomeIcon icon={pillar.icon} className="text-sm" />
					</span>
					<span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
						{pillar.num} <span className="text-primary/50">·</span>{" "}
						{pillar.eyebrow}
					</span>
				</div>

				<h3
					className="reveal mb-5 font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-base-content md:text-4xl"
					style={{ "--reveal-delay": "0.1s" } as CSSProperties}
				>
					{pillar.headline}
				</h3>

				<p
					className="reveal mb-8 text-base leading-relaxed text-base-content/60 md:text-lg"
					style={{ "--reveal-delay": "0.2s" } as CSSProperties}
				>
					{pillar.promise}
				</p>

				<ul className="space-y-4">
					{pillar.bullets.map((b, i) => (
						<li
							key={b.label}
							className="reveal flex items-start gap-3"
							style={{ "--reveal-delay": `${0.3 + i * 0.08}s` } as CSSProperties}
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
			<div
				className="reveal w-full"
				style={{ "--reveal-delay": "0.15s" } as CSSProperties}
			>
				<PillarVisual kind={pillar.visual} />
			</div>
		</div>
	)
}

export function FeaturePillarsSection() {
	return (
		<section
			id="platform"
			className="relative mx-auto max-w-6xl px-6 py-24 md:py-24"
		>
			{/* Section header
			<div className="mx-auto max-w-3xl text-center">
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
