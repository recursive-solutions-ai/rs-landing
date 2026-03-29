"use client"

import type { ReactNode } from "react"
import { useScrollReveal, type RevealDirection } from "@/hooks/useGsap"

interface ScrollRevealProps {
	children: ReactNode
	direction?: RevealDirection
	delay?: number
	duration?: number
	stagger?: number
	className?: string
	as?: "div" | "section"
}

export function ScrollReveal({
	children,
	direction = "up",
	delay = 0,
	duration = 0.8,
	stagger = 0,
	className = "",
	as: Tag = "div",
}: ScrollRevealProps) {
	const ref = useScrollReveal<HTMLDivElement>({
		direction,
		delay,
		duration,
		stagger,
	})

	return (
		<Tag ref={ref} className={className}>
			{children}
		</Tag>
	)
}
