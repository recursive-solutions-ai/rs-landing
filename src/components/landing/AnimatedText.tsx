"use client"

import { useEffect, useState, type CSSProperties, type Ref } from "react"
import { useInView } from "@/hooks/useInView"
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

/**
 * Word-by-word clip-path reveal, driven by CSS + IntersectionObserver
 * (no GSAP). Each word animates with a staggered `--reveal-delay`.
 */
export function AnimatedText({
	children,
	as: Tag = "p",
	className,
	delay = 0,
	stagger = 0.05,
	duration = 0.8,
	trigger = "scroll",
}: AnimatedTextProps) {
	const isScroll = trigger === "scroll"
	const { ref, inView } = useInView<HTMLElement>({ enabled: isScroll })
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		if (!isScroll) setMounted(true)
	}, [isScroll])

	const active = isScroll ? inView : mounted
	const words = children.split(/\s+/).filter(Boolean)

	return (
		<Tag
			ref={ref as Ref<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
			className={cn("flex flex-wrap", active && "reveal-in", className)}
		>
			{words.map((word, i) => (
				<span key={`${word}-${i}`} className="inline-block overflow-hidden reveal-mask">
					<span
						className="reveal-clip inline-block"
						style={
							{
								"--reveal-delay": `${delay + i * stagger}s`,
								animationDuration: `${duration}s`,
							} as CSSProperties
						}
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
