"use client"

import type { ReactNode } from "react"
import { useScrollReveal } from "@/hooks/useGsap"

export function AnimatedFooter({
	children,
	className = "",
}: {
	children: ReactNode
	className?: string
}) {
	const ref = useScrollReveal<HTMLDivElement>({
		direction: "up",
		stagger: 0.1,
	})

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	)
}
