"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { ButtonLink } from "@/components/ui"

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

const NAV_LINKS = [
	{ href: "/#services", label: "Services" },
	{ href: "/#process", label: "Process" },
	{ href: "/#work", label: "Work" },
	{ href: "/#contact", label: "Contact" },
]

export function Navbar() {
	const navRef = useRef<HTMLElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (!bgRef.current) return

			gsap.set(bgRef.current, { opacity: 0 })

			ScrollTrigger.create({
				start: 100,
				onUpdate: (self) => {
					if (!bgRef.current) return
					const progress = Math.min(self.scroll() / 200, 1)
					gsap.set(bgRef.current, { opacity: progress })
				},
			})
		},
		{ scope: navRef, dependencies: [prefersReduced] }
	)

	return (
		<nav
			ref={navRef}
			className="fixed left-0 right-0 top-0 z-50"
		>
			{/* Background layer that fades in on scroll */}
			<div
				ref={bgRef}
				className="absolute inset-0 border-b border-base-300/50 bg-base-100/90 backdrop-blur-xl"
				style={{ opacity: 0 }}
			/>

			<div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				{/* Logo */}
				<ButtonLink href="/" variant="ghost" className="p-0 text-primary hover:bg-transparent">
					<svg width="36" height="36" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M25 25C25 38.8 36.2 50 50 50C63.8 50 75 38.8 75 25C75 11.2 63.8 0 50 0C36.2 0 25 11.2 25 25ZM0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0C11.2 0 0 11.2 0 25Z" stroke="currentColor" strokeWidth="12" />
					</svg>
					<span className="ml-3 text-xl font-extrabold uppercase tracking-tighter text-base-content">
						Recursive
					</span>
				</ButtonLink>

				{/* Nav links + CTA */}
				<div className="flex items-center gap-6">
					{NAV_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="group relative hidden text-sm font-semibold text-base-content/70 transition hover:text-base-content md:inline-flex"
						>
							{link.label}
							<span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-full" />
						</a>
					))}
					<ButtonLink
						href="/#contact"
						className="btn btn-primary border-none px-6 text-sm font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
					>
						Get an Audit
					</ButtonLink>
				</div>
			</div>
		</nav>
	)
}
