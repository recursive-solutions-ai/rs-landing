"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { AnimatedText } from "./AnimatedText"

interface SectionHeadingProps {
	tag?: string
	title: string
	subtitle?: string
	className?: string
	align?: "left" | "center"
}

export function SectionHeading({
	tag,
	title,
	subtitle,
	className,
	align = "center",
}: SectionHeadingProps) {
	const { ref, inView } = useInView<HTMLSpanElement>()
	const isCenter = align === "center"

	return (
		<div
			className={cn(
				"w-full",
				isCenter ? "text-center" : "text-left",
				className
			)}
		>
			{tag && (
				<span
					ref={ref}
					className={cn(
						"reveal mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary",
						inView && "reveal-in"
					)}
					style={{ "--reveal-delay": "0s" } as CSSProperties}
				>
					{tag}
				</span>
			)}

			<AnimatedText
				as="h2"
				className={cn(
					"text-3xl font-bold text-base-content sm:text-4xl md:text-5xl",
					isCenter && "justify-center"
				)}
				stagger={0.04}
			>
				{title}
			</AnimatedText>

			{subtitle && (
				<AnimatedText
					as="p"
					className={cn(
						"mx-auto mt-4 max-w-2xl text-lg text-base-content/60",
						isCenter && "justify-center",
						!isCenter && "mx-0"
					)}
					delay={0.2}
					stagger={0.02}
					duration={0.6}
				>
					{subtitle}
				</AnimatedText>
			)}
		</div>
	)
}
