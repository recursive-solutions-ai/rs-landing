"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null)

	useEffect(() => {
		// Respect prefers-reduced-motion
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		if (prefersReducedMotion) return

		// Override scroll-behavior: smooth from globals.css so Lenis controls scrolling
		const prev = document.documentElement.style.scrollBehavior
		document.documentElement.style.scrollBehavior = "auto"

		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.1,
			duration: 1.2,
		})
		lenisRef.current = lenis

		// Sync Lenis scroll position with GSAP ScrollTrigger
		lenis.on("scroll", ScrollTrigger.update)

		// Single RAF loop driven by GSAP's ticker
		const tickerCallback = (time: number) => {
			lenis.raf(time * 1000)
		}
		gsap.ticker.add(tickerCallback)
		gsap.ticker.lagSmoothing(0)

		return () => {
			gsap.ticker.remove(tickerCallback)
			lenis.destroy()
			lenisRef.current = null
			document.documentElement.style.scrollBehavior = prev
		}
	}, [])

	return <>{children}</>
}
