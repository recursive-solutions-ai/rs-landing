"use client"

import { useRef } from "react"
import {
	gsap,
	useGSAP,
	EASE_TEXT,
	DURATION_NORMAL,
	START_HEADING,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type TextTag = "h1" | "h2" | "h3" | "p" | "span"

interface AnimatedTextProps {
	children: string
	as?: TextTag
	className?: string
	delay?: number
	stagger?: number
	duration?: number
	trigger?: "mount" | "scroll"
}

export function AnimatedText({
	children,
	as: Tag = "p",
	className,
	delay = 0,
	stagger = 0.05,
	duration = 0.8,
	trigger = "scroll",
}: AnimatedTextProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	const words = children.split(/\s+/).filter(Boolean)

	useGSAP(
		() => {
			if (!containerRef.current || prefersReduced) return

			const innerSpans = containerRef.current.querySelectorAll<HTMLSpanElement>(
				"[data-animated-word]"
			)

			if (innerSpans.length === 0) return

			gsap.set(innerSpans, {
				clipPath: "inset(0 0 100% 0)",
			})

			const tweenVars: gsap.TweenVars = {
				clipPath: "inset(0 0 0% 0)",
				duration,
				stagger,
				ease: EASE_TEXT,
				delay: trigger === "mount" ? delay : 0,
			}

			if (trigger === "scroll") {
				tweenVars.scrollTrigger = {
					trigger: containerRef.current,
					start: START_HEADING,
					toggleActions: "play none none none",
				}
				if (delay > 0) {
					tweenVars.delay = delay
				}
			}

			gsap.to(innerSpans, tweenVars)
		},
		{
			scope: containerRef,
			dependencies: [prefersReduced, trigger, delay, stagger, duration],
		}
	)

	if (prefersReduced) {
		return <Tag className={className}>{children}</Tag>
	}

	return (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		<Tag
			ref={containerRef as any}
			className={cn("flex flex-wrap", className)}
		>
			{words.map((word, i) => (
				<span key={`${word}-${i}`} className="inline-block overflow-hidden">
					<span
						data-animated-word=""
						className="inline-block will-change-[clip-path]"
						style={{ clipPath: "inset(0 0 100% 0)" }}
					>
						{word}
					</span>
					{i < words.length - 1 && (
						<span className="inline-block w-[0.3em]">&nbsp;</span>
					)}
				</span>
			))}
		</Tag>
	)
}
