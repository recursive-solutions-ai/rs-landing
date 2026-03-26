"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"
import { AnimatedText } from "./AnimatedText"

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

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
	const tagRef = useRef<HTMLSpanElement>(null)
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (!tagRef.current || prefersReduced) return

			gsap.set(tagRef.current, { opacity: 0, y: 12 })

			gsap.to(tagRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: tagRef.current,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: tagRef, dependencies: [prefersReduced] }
	)

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
					ref={!prefersReduced ? tagRef : undefined}
					className={cn(
						"mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary",
						!prefersReduced && "opacity-0"
					)}
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
