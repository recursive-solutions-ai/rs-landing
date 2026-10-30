"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useI18n } from "@/i18n/client"
import { localizedPath } from "@/lib/i18n-utils"
import { supportedLocales } from "@/i18n/config"

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

const USE_CASES = [
	{ href: "/use-cases/my-little-paris", label: "My Little Paris" },
	{ href: "/use-cases/roadmap-tax", label: "Roadmap Tax" },
	{ href: "/use-cases/mantle-tax", label: "Mantle Tax Solutions" },
]

const NAV_LINK =
	"rounded-md px-3 py-2 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"

function UseCasesMenu({ locale }: { locale: string }) {
	const [open, setOpen] = useState(false)
	const wrap = useRef<HTMLDivElement>(null)
	const timer = useRef<number | undefined>(undefined)

	useEffect(() => {
		if (!open) return
		const onDown = (e: MouseEvent) => {
			if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
		}
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpen(false)
				wrap.current?.querySelector<HTMLButtonElement>("button")?.focus()
			}
		}
		document.addEventListener("mousedown", onDown)
		document.addEventListener("keydown", onKey)
		return () => {
			document.removeEventListener("mousedown", onDown)
			document.removeEventListener("keydown", onKey)
		}
	}, [open])

	const enter = () => {
		window.clearTimeout(timer.current)
		setOpen(true)
	}
	const leave = () => {
		window.clearTimeout(timer.current)
		timer.current = window.setTimeout(() => setOpen(false), 120)
	}

	return (
		<div ref={wrap} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
			<button
				type="button"
				aria-expanded={open}
				aria-haspopup="true"
				aria-controls="lv2-usecases-menu"
				onClick={() => setOpen((o) => !o)}
				className={`${NAV_LINK} inline-flex items-center gap-1.5`}
			>
				Use cases
				<svg aria-hidden="true" viewBox="0 0 12 12" className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
					<path d="M2.5 4.5 6 8l3.5-3.5" />
				</svg>
			</button>
			{open && (
				<div id="lv2-usecases-menu" className="absolute left-0 top-full z-50 pt-2">
					<ul className="min-w-56 rounded-xl border border-white/10 bg-[#0b1024]/95 p-1.5 shadow-2xl backdrop-blur-xl">
						{USE_CASES.map((u) => (
							<li key={u.href}>
								<Link
									href={localizedPath(u.href, locale)}
									onClick={() => setOpen(false)}
									className="block rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-300"
								>
									{u.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

function isHomePath(pathname: string): boolean {
	const clean = pathname.replace(/\/+$/, "") || "/"
	if (clean === "/") return true
	return supportedLocales.some((l) => clean === `/${l}`)
}

function getStarted(e: React.MouseEvent) {
	e.preventDefault()
	scrollToFinalCapture()
}

export function LucyV2TopBar({ locale }: { locale: string }) {
	const [scrolled, setScrolled] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])
	useEffect(() => {
		if (!mobileOpen) return
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false)
		document.addEventListener("keydown", onKey)
		return () => document.removeEventListener("keydown", onKey)
	}, [mobileOpen])

	const pathname = usePathname() ?? "/"
	const isHome = isHomePath(pathname)
	useEffect(() => {
		if (!isHome || window.location.hash !== "#final-capture") return
		const id = window.setTimeout(scrollToFinalCapture, 400)
		return () => window.clearTimeout(id)
	}, [isHome, pathname])
	const solid = !isHome || scrolled || mobileOpen
	const finalCaptureHref = `${localizedPath("/", locale)}#final-capture`
	const cta =
		"inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#050816] transition hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
	const mobileLink = "block rounded-lg px-3 py-3 text-base text-white/70 hover:bg-white/5 hover:text-white"

	return (
		<>
		{!isHome && <div aria-hidden="true" className="h-16" />}
		<header
			className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
				solid
					? "border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl"
					: "border-b border-transparent bg-transparent"
			}`}
		>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
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
				<nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
					<UseCasesMenu locale={locale} />
					<Link href={localizedPath("/contact", locale)} className={NAV_LINK}>Contact</Link>
				</nav>
				<div className="flex items-center gap-2">
					{isHome ? (
						<a href="#final-capture" onClick={getStarted} className={cta}>
							Get started
						</a>
					) : (
						<Link href={finalCaptureHref} className={cta}>
							Get started
						</Link>
					)}
					<button
						type="button"
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
						aria-expanded={mobileOpen}
						aria-controls="lv2-mobile-menu"
						onClick={() => setMobileOpen((o) => !o)}
						className="inline-flex size-10 items-center justify-center rounded-md text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-300 md:hidden"
					>
						<svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
							{mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
						</svg>
					</button>
				</div>
			</div>
			{mobileOpen && (
				<div id="lv2-mobile-menu" className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-[#0b1024]/95 backdrop-blur-xl md:hidden">
					<nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
						<p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Use cases</p>
						{USE_CASES.map((u) => (
							<Link key={u.href} href={localizedPath(u.href, locale)} onClick={() => setMobileOpen(false)} className={mobileLink}>
								{u.label}
							</Link>
						))}
						<div className="my-2 border-t border-white/10" />
						<Link href={localizedPath("/contact", locale)} onClick={() => setMobileOpen(false)} className={mobileLink}>Contact</Link>
					</nav>
				</div>
			)}
		</header>
		</>
	)
}

export function LucyV2Footer({ locale }: { locale: string }) {
	const { t } = useI18n()
	const year = new Date().getFullYear()
	const link = "text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400"
	const heading = "mb-3 text-sm font-semibold text-white"
	return (
		<footer className="border-t border-white/10 bg-[#050816] px-5 py-12 sm:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
					<div>
						<h3 className="mb-2 text-lg font-bold text-white">Recursive Solutions</h3>
						{t("footer.powered.by") && <p className="text-sm text-white/55">{t("footer.powered.by")}</p>}
						<a href="mailto:team@recursive-solutions.com" className={`${link} mt-3 inline-block`}>
							team@recursive-solutions.com
						</a>
					</div>
					<div>
						<h4 className={heading}>{t("footer.navigation")}</h4>
						<nav className="flex flex-col gap-1.5">
							<Link href={localizedPath("/blog", locale)} className={link}>Blog</Link>
							<Link href={localizedPath("/contact", locale)} className={link}>Contact</Link>
						</nav>
					</div>
					<div>
						<h4 className={heading}>Use cases</h4>
						<nav aria-label="Use cases" className="flex flex-col gap-1.5">
							{USE_CASES.map((u) => (
								<Link key={u.href} href={localizedPath(u.href, locale)} className={link}>{u.label}</Link>
							))}
						</nav>
					</div>
					<div>
						<h4 className={heading}>{t("footer.legal")}</h4>
						<nav className="flex flex-col gap-1.5">
							<Link href={localizedPath("/legal", locale)} className={link}>{t("footer.legal.notice")}</Link>
							<Link href={localizedPath("/privacy", locale)} className={link}>{t("footer.privacy.policy")}</Link>
							<Link href={localizedPath("/cookies", locale)} className={link}>{t("footer.cookie.policy")}</Link>
						</nav>
					</div>
				</div>
				<div className="mt-10 border-t border-white/10 pt-6">
					<p className="text-sm text-white/45">{t("footer.copyright", { year: String(year) })}</p>
				</div>
			</div>
		</footer>
	)
}
