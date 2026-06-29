"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"

export function SystemTeaser({ locale }: { locale: string }) {
	const { ref, inView } = useInView<HTMLDivElement>()
	return (
		<section id="system" className="bg-base-200">
			<div
				ref={ref}
				className={cn("mx-auto max-w-4xl px-6 py-24 text-center", inView && "reveal-in")}
			>
				<span className="reveal mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
					One vertical system
				</span>
				<h2
					className="reveal font-display text-3xl font-bold text-base-content sm:text-4xl md:text-5xl"
					style={{ "--reveal-delay": "0.1s" } as CSSProperties}
				>
					Everything that grows your business, in one place.
				</h2>
				<p
					className="reveal mx-auto mt-5 max-w-2xl text-lg text-base-content/60"
					style={{ "--reveal-delay": "0.2s" } as CSSProperties}
				>
					Attract · Engage · Capture · Convert · Optimize — one system we run and improve
					for you, powered by our platform, Lucy.
				</p>
				<div
					className="reveal mt-8 flex justify-center"
					style={{ "--reveal-delay": "0.3s" } as CSSProperties}
				>
					<ButtonLink
						href={`/${locale}/lucy`}
						className="btn-primary px-8 text-base font-bold"
					>
						See how Lucy works →
					</ButtonLink>
				</div>
			</div>
		</section>
	)
}
