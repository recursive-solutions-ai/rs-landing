"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { ButtonLink } from "@/components/ui"
import { ThemeLogo } from "@/components/layout/ThemeLogo"

const NAV_LINKS = [
	{ href: "/#services", label: "Services" },
	{ href: "/#process", label: "Process" },
	{ href: "/#work", label: "Work" },
	{ href: "/#contact", label: "Contact" },
]

export function Navbar() {
	const navRef = useRef<HTMLElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	useGSAP(
		() => {
			if (!bgRef.current) return

			// Background fades in on scroll
			gsap.fromTo(
				bgRef.current,
				{ opacity: 0 },
				{
					opacity: 1,
					scrollTrigger: {
						start: 100,
						end: 300,
						scrub: true,
					},
				}
			)

			// Entrance animation on page load
			if (!prefersReduced && contentRef.current) {
				gsap.fromTo(
					contentRef.current,
					{ opacity: 0, y: -10 },
					{ opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power3.out" }
				)
			}
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

			<div ref={contentRef} className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				{/* Logo */}
				<ButtonLink href="/" variant="ghost" className="p-0 hover:bg-transparent">
					<ThemeLogo height={36} />
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
							<span className="absolute -bottom-1 left-0 right-0 h-0.5 origin-center scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
						</a>
					))}
					<ButtonLink
						href="/#contact"
						className="btn btn-primary border-none px-6 text-sm font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
					>
						Book a Discovery Meeting
					</ButtonLink>
				</div>
			</div>
		</nav>
	)
}
