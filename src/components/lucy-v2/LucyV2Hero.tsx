"use client"

import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import { gsap } from "./gsap"
import { LucyUrlCapture } from "./LucyUrlCapture"

// Client logos (same assets as landing/CredibilityBar). `mono` logos are transparent PNGs rendered
// as white silhouettes; Roadmap Tax ships as a black-background JPG so it is shown as-is.
// `label` logos are an app icon plus the name set in white type (Tucky's site uses the same lockup).
const LOGOS: { name: string; src: string; width: number; height: number; mono: boolean; h: number; label?: string }[] = [
	{ name: "Roadmap Tax Services", src: "/logos/roadmap-tax.jpg", width: 1800, height: 631, mono: false, h: 26 },
	{ name: "Mantle Tax Solutions", src: "/logos/mantle-tax.png", width: 2560, height: 707, mono: true, h: 22 },
	{ name: "My Little Paris Cafe", src: "/logos/my-little-paris.png", width: 514, height: 118, mono: true, h: 20 },
	{ name: "Harrington Construction", src: "/logos/hcci.png", width: 1137, height: 215, mono: true, h: 20 },
	{ name: "Tucky", src: "/logos/tucky-icon.jpeg", width: 128, height: 128, mono: false, h: 22, label: "Tucky" },
]

// Stats pulled from the existing use-case pages (my-little-paris, roadmap-tax).
const STATS = [
	{ value: "2.7×", label: "search impressions", who: "My Little Paris" },
	{ value: "~14 hrs", label: "saved every week", who: "Roadmap Tax" },
	{ value: "650+", label: "automated steps a month", who: "Roadmap Tax" },
]

function Words({ text, className }: { text: string; className?: string }) {
	return (
		<span className={className}>
			{text.split(" ").map((w, i, arr) => (
				<span key={`${w}-${i}`}>
					<span className="lv2-mask">
						<span className="lv2-word">{w}</span>
					</span>
					{i < arr.length - 1 ? " " : ""}
				</span>
			))}
		</span>
	)
}

export function LucyV2Hero() {
	const root = useRef<HTMLElement>(null)

	useLayoutEffect(() => {
		const el = root.current
		if (!el) return
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		let safety = 0
		const ctx = gsap.context(() => {
			if (reduce) {
				el.querySelector(".lv2-hero-inner")?.classList.remove("lv2-pre")
				return
			}
			const words = gsap.utils.toArray<HTMLElement>(".lv2-word")
			const rest = gsap.utils.toArray<HTMLElement>(".lv2-rest")
			// Animate FROM hidden; the DOM/CSS default is the final, visible state.
			el.querySelector(".lv2-hero-inner")?.classList.remove("lv2-pre")
			const tlh = gsap
				.timeline({ defaults: { ease: "power4.out" } })
				.from(words, { yPercent: 118, duration: 1.15, stagger: 0.06 }, 0.1)
				.from(rest, { opacity: 0, y: 26, duration: 0.9, stagger: 0.12 }, 0.45)
			// Safety net: if the ticker is throttled (background tab / paused rAF) or the entrance is
			// interrupted, jump to the final state instead of leaving the hero half-revealed.
			safety = window.setTimeout(() => {
				if (tlh.progress() < 1) tlh.progress(1)
			}, 3000)

			gsap.to(".lv2-glow-wrap", {
				yPercent: 30,
				ease: "none",
				scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
			})
			gsap.to(".lv2-hero-inner", {
				scale: 0.94,
				opacity: 0.15,
				y: -40,
				ease: "none",
				scrollTrigger: { trigger: el, start: "40% top", end: "bottom top", scrub: true },
			})
		}, el)
		return () => {
			window.clearTimeout(safety)
			ctx.revert()
		}
	}, [])

	return (
		<section ref={root} aria-labelledby="lv2-h1" className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-8 pt-[68px] sm:px-8 sm:pt-24">
			<div aria-hidden="true" className="lv2-glow-wrap pointer-events-none absolute inset-0">
				<div className="lv2-glow absolute left-1/2 top-[-12%] h-[44rem] w-[60rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.42),rgba(59,130,246,0)_70%)]" />
				<div className="lv2-glow-b absolute bottom-[-25%] left-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.25),rgba(99,102,241,0)_70%)]" />
			</div>

			<div className="lv2-hero-inner lv2-pre relative mx-auto w-full max-w-4xl text-center">
				<p className="lv2-rest mx-auto inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase leading-snug tracking-[0.1em] text-sky-200 sm:text-[13px] sm:tracking-[0.12em]">
					<span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-sky-400" />
					For owner-led service companies
				</p>

				<h1 id="lv2-h1" className="mt-4 font-display font-semibold tracking-tight">
					<Words text="Drop your URL." className="block text-[38px] leading-[1.05] sm:text-7xl md:text-[5.25rem]" />
					<Words
						text="We’ll turn your website into a growth engine for the AI era."
						className="mx-auto mt-1.5 block max-w-3xl text-[24px] leading-[1.15] text-white/45 sm:text-4xl md:text-5xl"
					/>
				</h1>

				<ul className="lv2-rest mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-white/75 sm:mt-5 sm:text-base">
					{["New website", "Blog that ranks", "Email on autopilot", "Cold outreach", "AI-ready business"].map((item) => (
						<li key={item} className="inline-flex items-center gap-1.5">
							<svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 shrink-0 text-sky-400" fill="currentColor">
								<path d="M8.2 13.6 4.6 10l1.2-1.2 2.4 2.4 6-6L15.4 6z" />
							</svg>
							{item}
						</li>
					))}
				</ul>

				<div className="lv2-rest mt-5 sm:mt-7">
					<LucyUrlCapture id="hero" showChips={false} />
				</div>

				<div className="lv2-rest mx-auto mt-5 max-w-3xl sm:mt-7">
					<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Trusted by</p>
					<ul className="mt-2.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:gap-x-7">
						{LOGOS.map((l) => (
							<li key={l.name} className="flex items-center">
								{l.label ? (
									<span className="inline-flex items-center gap-1.5 opacity-90">
										<Image src={l.src} alt="" width={l.width} height={l.height} style={{ height: l.h, width: l.h }} className="rounded-[5px]" />
										<span className="text-[15px] font-semibold tracking-tight text-white">{l.label}</span>
									</span>
								) : (
								<Image
									src={l.src}
									alt={l.name}
									width={l.width}
									height={l.height}
									style={{ height: l.h, width: "auto", filter: l.mono ? "brightness(0) invert(1)" : undefined }}
									className={l.mono ? "opacity-70" : "rounded-[3px] opacity-90"}
								/>
								)}
							</li>
						))}
					</ul>
					<ul className="mt-4 flex items-start justify-center gap-5 sm:gap-12">
						{STATS.map((s) => (
							<li key={s.value} className="text-center">
								<p className="font-display text-[22px] font-semibold leading-none text-white sm:text-4xl">{s.value}</p>
								<p className="mt-1.5 text-[11px] leading-tight text-white/65 sm:text-sm">
									{s.label}
									<span className="block text-white/40">{s.who}</span>
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
