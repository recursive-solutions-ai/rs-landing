"use client"

import { useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

gsap.registerPlugin(ScrollTrigger)

export function FloatingNav() {
	const navRef = useRef<HTMLElement>(null)

	useGSAP(() => {
		gsap.set(navRef.current, { yPercent: -100, opacity: 0 })

		ScrollTrigger.create({
			start: "100vh top",
			onEnter: () => gsap.to(navRef.current, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" }),
			onLeaveBack: () => gsap.to(navRef.current, { yPercent: -100, opacity: 0, duration: 0.3, ease: "power2.in" }),
		})
	})

	return (
		<nav
			ref={navRef}
			className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-base-100/70 border-b border-base-300/50"
		>
			<div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
				<Link href="/v2" className="flex items-center gap-2 text-primary">
					<svg width="28" height="28" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M25 25C25 38.8 36.2 50 50 50C63.8 50 75 38.8 75 25C75 11.2 63.8 0 50 0C36.2 0 25 11.2 25 25ZM0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0C11.2 0 0 11.2 0 25Z"
							stroke="currentColor"
							strokeWidth="12"
						/>
					</svg>
					<span className="text-lg font-extrabold tracking-tighter uppercase text-base-content">
						Recursive
					</span>
				</Link>
				<div className="flex items-center gap-4">
					<ThemeToggle />
					<Link
						href="#cta"
						className="btn btn-primary btn-sm rounded-xl text-sm font-bold shadow-lg shadow-primary/20 border-none"
					>
						Get Started
					</Link>
				</div>
			</div>
		</nav>
	)
}
