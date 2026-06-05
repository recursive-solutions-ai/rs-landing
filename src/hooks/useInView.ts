"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
	threshold?: number
	rootMargin?: string
	/** Reveal only once, then stop observing (default true). */
	once?: boolean
	/** When false, skips the observer and never sets inView (default true). */
	enabled?: boolean
}

/**
 * Lightweight IntersectionObserver hook used to drive CSS scroll-reveals.
 * Replaces GSAP ScrollTrigger for simple "fade/slide in on scroll" entrances —
 * no main-thread scroll work, far cheaper than a ScrollTrigger instance.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
	options: UseInViewOptions = {}
) {
	const {
		threshold = 0.15,
		rootMargin = "0px 0px -10% 0px",
		once = true,
		enabled = true,
	} = options

	const ref = useRef<T>(null)
	const [inView, setInView] = useState(false)

	useEffect(() => {
		if (!enabled) return
		const el = ref.current
		if (!el) return

		// If IO is unavailable, reveal immediately so content is never stuck hidden.
		if (typeof IntersectionObserver === "undefined") {
			setInView(true)
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true)
					if (once) observer.disconnect()
				} else if (!once) {
					setInView(false)
				}
			},
			{ threshold, rootMargin }
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [threshold, rootMargin, once, enabled])

	return { ref, inView }
}
