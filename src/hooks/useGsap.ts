"use client"

import { useRef, useEffect } from "react"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/animation-config"

export type RevealDirection = "up" | "left" | "right" | "none"

interface ScrollRevealOptions {
	direction?: RevealDirection
	delay?: number
	duration?: number
	stagger?: number
	start?: string
	once?: boolean
}

/**
 * Hook that animates an element into view when it scrolls into the viewport.
 * Returns a ref to attach to the container element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
	options: ScrollRevealOptions = {}
) {
	const {
		direction = "up",
		delay = 0,
		duration = 0.8,
		stagger = 0,
		start = "top 85%",
		once = true,
	} = options

	const containerRef = useRef<T>(null)
	const prefersReducedMotion = useRef(false)

	useEffect(() => {
		prefersReducedMotion.current = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches
	}, [])

	useGSAP(
		() => {
			if (!containerRef.current || prefersReducedMotion.current) return

			const from: gsap.TweenVars = { opacity: 0 }
			if (direction === "up") from.y = 40
			if (direction === "left") from.x = -40
			if (direction === "right") from.x = 40

			const targets = stagger
				? containerRef.current.children
				: containerRef.current

			gsap.from(targets, {
				...from,
				duration,
				delay,
				stagger: stagger || 0,
				ease: "power2.out",
				scrollTrigger: {
					trigger: containerRef.current,
					start,
					toggleActions: once
						? "play none none none"
						: "play none none reverse",
				},
			})
		},
		{ scope: containerRef }
	)

	return containerRef
}

export { useGSAP, gsap, ScrollTrigger }
