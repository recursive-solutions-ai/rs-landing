"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { localizedPath } from "@/lib/i18n-utils"

const LOGO_RATIO = 539 / 103

export function scrollToFinalCapture() {
	const target = document.getElementById("final-capture")
	if (!target) return
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
	target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" })
	window.setTimeout(
		() => document.querySelector<HTMLInputElement>("#final-capture input")?.focus({ preventScroll: true }),
		reduce ? 0 : 900,
	)
}

export function LucyV2TopBar({ locale }: { locale: string }) {
	const [scrolled, setScrolled] = useState(false)
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
				scrolled
					? "border-b border-white/10 bg-[#050816]/70 backdrop-blur-xl"
					: "border-b border-transparent bg-transparent"
			}`}
		>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
				<Link href={localizedPath("/", locale)} aria-label="Recursive Solutions home" className="flex items-center">
					<Image
						src="/logo-horizontal-no-bg-with-text-light.png"
						alt="Recursive Solutions"
						width={Math.round(28 * LOGO_RATIO)}
						height={28}
						priority
						className="h-7 w-auto"
					/>
				</Link>
				<a
					href="#final-capture"
					onClick={(e) => {
						e.preventDefault()
						scrollToFinalCapture()
					}}
					className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#050816] transition hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
				>
					Get started
				</a>
			</div>
		</header>
	)
}

export function LucyV2Footer({ locale }: { locale: string }) {
	const link = "underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-sky-400"
	return (
		<footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/55 sm:px-8">
			<p>
				&copy; {new Date().getFullYear()} Recursive Solutions
				<span aria-hidden="true"> &middot; </span>
				<Link href={localizedPath("/privacy", locale)} className={link}>Privacy</Link>
				<span aria-hidden="true"> &middot; </span>
				<Link href={localizedPath("/legal", locale)} className={link}>Legal</Link>
				<span aria-hidden="true"> &middot; </span>
				<a href="mailto:team@recursive-solutions.com" className={link}>team@recursive-solutions.com</a>
			</p>
		</footer>
	)
}
