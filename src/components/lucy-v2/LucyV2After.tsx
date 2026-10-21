"use client"

import Image from "next/image"
import Link from "next/link"
import { useLayoutEffect, useRef, useState } from "react"
import { localizedPath } from "@/lib/i18n-utils"
import { gsap } from "./gsap"
import { LucyUrlCapture } from "./LucyUrlCapture"

function Eyebrow({ children }: { children: React.ReactNode }) {
	return (
		<p className="flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
			<span aria-hidden="true" className="size-1.5 rounded-full bg-sky-400" />
			{children}
		</p>
	)
}

/* ---------------- What you get ---------------- */

const GET = [
	{ n: "01", big: "New website", body: "Fast, mobile-first and built to convert, and structured so search engines and AI can read it." },
	{ n: "02", big: "Blog that ranks", body: "Articles your customers search for, written and published by Lucy every week." },
	{ n: "03", big: "AI-ready business", body: "Structured data, marked-up answers and a chatbot that books calls, so AI assistants recommend you." },
	{ n: "04", big: "Email on autopilot", body: "Pricing, availability and what you offer, answered in minutes in your voice. Anything unusual comes straight to you." },
	{ n: "05", big: "Cold outreach", body: "Lucy finds the businesses you want, writes each a personal email and follows up. You approve before it goes out." },
	{ n: "06", big: "Custom AI workflows", body: "AI workflows or a custom app for intake, follow-ups, reporting and document chasing, set up for you." },
	{ n: "07", big: "One dashboard", body: "What was published, answered, sent and booked this week, in one view." },
	{ n: "08", big: "A team behind Lucy", body: "Real people at Recursive Solutions set her up, review the strategy and answer your calls." },
]
const MARQUEE = ["Website", "Blog", "AI-ready", "Email", "Outreach", "Custom AI", "Dashboard"]

export function LucyV2WhatYouGet() {
	const root = useRef<HTMLElement>(null)
	useLayoutEffect(() => {
		const el = root.current
		if (!el) return
		const mm = gsap.matchMedia()
		mm.add("(prefers-reduced-motion: no-preference)", () => {
			gsap.to(".lv2-marq-a", { xPercent: -28, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } })
			gsap.to(".lv2-marq-b", { xPercent: 28, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } })
			gsap.utils.toArray<HTMLElement>(".lv2-get-row").forEach((row) => {
				const num = row.querySelector(".lv2-get-n")
				const txt = row.querySelector(".lv2-get-t")
				const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: row, start: "top 88%", end: "top 45%", scrub: 0.5 } })
				tl.fromTo(txt, { opacity: 0.18, scale: 0.9, x: -40 }, { opacity: 1, scale: 1, x: 0 }, 0)
				tl.fromTo(num, { opacity: 0, xPercent: 60 }, { opacity: 1, xPercent: 0 }, 0)
				tl.fromTo(row.querySelector(".lv2-get-line"), { scaleX: 0 }, { scaleX: 1 }, 0)
			})
		})
		return () => mm.revert()
	}, [])

	return (
		<section ref={root} aria-labelledby="lv2-get-h" className="relative px-5 py-28 sm:px-8 md:py-40">
			<div className="mx-auto max-w-4xl text-center">
				<Eyebrow>What you get</Eyebrow>
				<h2 id="lv2-get-h" className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
					One URL in. A whole growth team out.
				</h2>
			</div>

			<div aria-hidden="true" className="mt-16 select-none overflow-hidden whitespace-nowrap font-display text-[64px] font-semibold leading-none text-transparent sm:text-[120px]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}>
				<div className="lv2-marq-a flex w-max gap-10 pl-[10%]">
					{[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
				</div>
				<div className="lv2-marq-b mt-3 flex w-max gap-10" style={{ marginLeft: "-30%" }}>
					{[...MARQUEE, ...MARQUEE].reverse().map((m, i) => <span key={i}>{m}</span>)}
				</div>
			</div>

			<ul className="mx-auto mt-20 max-w-5xl">
				{GET.map((g) => (
					<li key={g.n} className="lv2-get-row relative py-9 md:py-12">
						<span aria-hidden="true" className="lv2-get-line absolute inset-x-0 top-0 h-px origin-left bg-white/20" />
						<div className="flex items-start gap-5 md:gap-10">
							<span className="lv2-get-n font-display text-4xl font-semibold text-sky-400 md:text-7xl">{g.n}</span>
							<div className="lv2-get-t min-w-0 origin-left">
								<h3 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">{g.big}</h3>
								<p className="mt-3 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">{g.body}</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}

/* ---------------- Proof ---------------- */

const CASES = [
	{
		name: "My Little Paris",
		href: "/use-cases/my-little-paris",
		logo: { src: "/logos/my-little-paris.png", w: 514, h: 118, mono: true, ph: 24 },
		hero: "2.7×",
		heroLabel: "Google search impressions",
		facts: ["~7,980 → ~21,700 appearances in search", "Birthday parties page: search clicks 12 → 24 (+100%)", "+692% active users, as reported in the customer’s own email"],
	},
	{
		name: "Roadmap Tax",
		href: "/use-cases/roadmap-tax",
		logo: { src: "/logos/roadmap-tax.jpg", w: 1800, h: 631, mono: false, ph: 30 },
		hero: "~14 hrs",
		heroLabel: "Reporting work saved every week",
		facts: ["650+ automated steps every month", "Search impressions 478 → 1,747 (3.7×)"],
	},
	{
		name: "Mantle Tax",
		href: "/use-cases/mantle-tax",
		logo: { src: "/logos/mantle-tax.png", w: 2560, h: 707, mono: true, ph: 26 },
		hero: "31 of 31",
		heroLabel: "Pages AI can read as a firm",
		facts: ["Structured data was on 0 pages before", "0 → 20 answers marked up for AI", "AI visibility score 32 → 64"],
	},
]

/* ---------------- Custom AI workflows ---------------- */

const FLOW = ["New client email", "AI reads & sorts", "CRM updated", "Docs requested", "Follow-up sent", "You review"]
const POINTS = [
	{ t: "We map it", b: "We sit with you and find what\u2019s worth automating." },
	{ t: "We build it", b: "AI workflows or a custom app, connected to the tools you already use." },
	{ t: "We run it", b: "Monitored, fixed and improved, so you don\u2019t touch the plumbing." },
]

export function LucyV2Custom({ locale }: { locale: string }) {
	const root = useRef<HTMLElement>(null)
	useLayoutEffect(() => {
		const el = root.current
		if (!el) return
		const mm = gsap.matchMedia()
		mm.add("(prefers-reduced-motion: no-preference)", () => {
			// headline words rise as you scroll in
			gsap.fromTo(".lv2-cw", { yPercent: 115 }, { yPercent: 0, ease: "none", stagger: 0.08, scrollTrigger: { trigger: ".lv2-ch", start: "top 88%", end: "top 50%", scrub: 0.5 } })
			// the process line draws itself; each node lights as the line reaches it
			const nodes = gsap.utils.toArray<HTMLElement>(".lv2-fn")
			const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: ".lv2-flow", start: "top 72%", end: "bottom 58%", scrub: 0.6 } })
			tl.fromTo(".lv2-fline", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 5 }, 0)
			nodes.forEach((n, i) => {
				tl.fromTo(n.querySelector(".lv2-fn-on"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, i - 0.15)
				tl.fromTo(n.querySelector(".lv2-fn-label"), { opacity: 0.35 }, { opacity: 1, duration: 0.3 }, i - 0.15)
			})
			// the three points slide in from alternating sides
			gsap.utils.toArray<HTMLElement>(".lv2-cp").forEach((c, i) => {
				gsap.fromTo(c, { x: (i - 1) * 90, y: 40, rotate: (i - 1) * 3, opacity: 0.15 }, { x: 0, y: 0, rotate: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: c, start: "top 98%", end: "top 62%", scrub: 0.5 } })
			})
		})
		return () => mm.revert()
	}, [])

	return (
		<section ref={root} aria-labelledby="lv2-custom-h" className="relative px-5 py-24 sm:px-8 md:py-36">
			<div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[50rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.22),transparent_70%)]" />
			<div className="lv2-ch relative mx-auto max-w-4xl text-center">
				<Eyebrow>Beyond marketing</Eyebrow>
				<h2 id="lv2-custom-h" className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl">
					{"Custom AI workflows,".split(" ").map((w, i) => (
						<span key={i}><span className="lv2-cmask inline-block overflow-hidden align-top"><span className="lv2-cw inline-block">{w}</span></span>{" "}</span>
					))}
					<span className="text-white/45">
						{"built into how you already work.".split(" ").map((w, i, a) => (
							<span key={i}><span className="lv2-cmask inline-block overflow-hidden align-top"><span className="lv2-cw inline-block">{w}</span></span>{i < a.length - 1 ? " " : ""}</span>
						))}
					</span>
				</h2>
				<p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
					Intake, follow-ups, reporting, document chasing: the repetitive work that eats your week. We map your process, build the AI workflow or custom app around it, and set it all up for you.
				</p>
			</div>

			<div className="lv2-flow relative mx-auto mt-16 max-w-5xl">
				{/* desktop: horizontal line through the six node centres */}
				<svg aria-hidden="true" className="absolute left-[8.333%] top-[19px] hidden h-[2px] w-[83.333%] overflow-visible lg:block" viewBox="0 0 100 2" preserveAspectRatio="none">
					<path d="M0 1H100" pathLength={1} stroke="rgba(255,255,255,0.14)" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" />
					<path className="lv2-fline" d="M0 1H100" pathLength={1} strokeDasharray="1" stroke="#38bdf8" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" fill="none" style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))" }} />
				</svg>
				{/* mobile: vertical line */}
				<svg aria-hidden="true" className="absolute bottom-[20px] left-[19px] top-[20px] w-[2px] overflow-visible lg:hidden" viewBox="0 0 2 100" preserveAspectRatio="none">
					<path d="M1 0V100" pathLength={1} stroke="rgba(255,255,255,0.14)" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" />
					<path className="lv2-fline" d="M1 0V100" pathLength={1} strokeDasharray="1" stroke="#38bdf8" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" fill="none" style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))" }} />
				</svg>
				<ol className="relative grid gap-8 lg:grid-cols-6 lg:gap-2">
					{FLOW.map((f, i) => (
						<li key={f} className="lv2-fn flex items-center gap-4 lg:flex-col lg:gap-3 lg:text-center">
							<span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-[#03060f] text-sm font-bold text-white/70">
								<span aria-hidden="true" className="lv2-fn-on absolute inset-0 rounded-full bg-sky-400 shadow-[0_0_24px_4px_rgba(56,189,248,0.6)]" />
								<span className="relative text-white">{i + 1}</span>
							</span>
							<span className="lv2-fn-label text-sm font-semibold leading-tight text-white sm:text-base lg:px-1">{f}</span>
						</li>
					))}
				</ol>
			</div>

			<p className="relative mx-auto mt-14 max-w-2xl text-center text-base text-white/75 sm:text-lg">
				<Link href={localizedPath("/use-cases/roadmap-tax", locale)} className="underline decoration-sky-400/60 underline-offset-4 hover:decoration-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400">
					<strong className="font-semibold text-white">Roadmap Tax:</strong> 650+ automated steps a month, ~14 hrs of reporting saved every week.
				</Link>
			</p>

			<ul className="relative mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
				{POINTS.map((p, i) => (
					<li key={p.t} className="lv2-cp rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6">
						<span className="font-display text-sm font-semibold text-sky-300">0{i + 1}</span>
						<h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.t}</h3>
						<p className="mt-2 text-[15px] leading-relaxed text-white/65">{p.b}</p>
					</li>
				))}
			</ul>
		</section>
	)
}

export function LucyV2Proof({ locale }: { locale: string }) {
	const root = useRef<HTMLElement>(null)
	useLayoutEffect(() => {
		const el = root.current
		if (!el) return
		const mm = gsap.matchMedia()
		mm.add("(prefers-reduced-motion: no-preference)", () => {
			gsap.utils.toArray<HTMLElement>(".lv2-case").forEach((card, i) => {
				gsap.fromTo(
					card,
					{ y: 90 + i * 50, scale: 0.9, opacity: 0.2 },
					{ y: 0, scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 100%", end: "top 55%", scrub: 0.5 } },
				)
				gsap.fromTo(
					card.querySelector(".lv2-case-hero"),
					{ y: 30 },
					{ y: -30, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } },
				)
			})
		})
		return () => mm.revert()
	}, [])

	return (
		<section ref={root} aria-labelledby="lv2-proof-h" className="relative px-5 py-24 sm:px-8 md:py-36">
			<div className="mx-auto max-w-3xl text-center">
				<Eyebrow>Proof</Eyebrow>
				<h2 id="lv2-proof-h" className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
					Real firms. Real numbers.
				</h2>
			</div>
			<ul className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3">
				{CASES.map((c) => (
					<li key={c.name} className="lv2-case">
						<Link
							href={localizedPath(c.href, locale)}
							className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 transition hover:border-sky-400/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
						>
							<div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.35),transparent)] transition-transform duration-700 group-hover:scale-125" />
							<Image
								src={c.logo.src}
								alt={c.name}
								width={c.logo.w}
								height={c.logo.h}
								style={{ height: c.logo.ph, width: "auto", filter: c.logo.mono ? "brightness(0) invert(1)" : undefined }}
								className={`relative self-start ${c.logo.mono ? "opacity-80" : "rounded-[3px]"}`}
							/>
							<div className="lv2-case-hero relative mt-auto pt-12">
								<p className="font-display text-6xl font-semibold leading-none tracking-tight sm:text-7xl">{c.hero}</p>
								<p className="mt-2 text-sm font-semibold uppercase tracking-wider text-sky-300">{c.heroLabel}</p>
							</div>
							<ul className="relative mt-6 space-y-1.5 text-[15px] text-white/65">
								{c.facts.map((f) => <li key={f}>{f}</li>)}
							</ul>
							<span className="relative mt-6 text-sm font-semibold text-white group-hover:underline">Read the case study &rarr;</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}

/* ---------------- Final CTA ---------------- */

export function LucyV2FinalCta() {
	const root = useRef<HTMLElement>(null)
	useLayoutEffect(() => {
		const el = root.current
		if (!el) return
		const mm = gsap.matchMedia()
		mm.add("(prefers-reduced-motion: no-preference)", () => {
			gsap.fromTo(".lv2-cta-glow", { scale: 0.5, opacity: 0.3 }, { scale: 1.1, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: true } })
			gsap.fromTo(".lv2-cta-in", { y: 70, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "top 40%", scrub: 0.5 } })
		})
		return () => mm.revert()
	}, [])

	return (
		<section ref={root} id="final-capture" aria-labelledby="lv2-cta-h" className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-44">
			<div aria-hidden="true" className="lv2-cta-glow pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[60rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.45),rgba(59,130,246,0)_70%)]" />
			<div className="lv2-cta-in relative mx-auto max-w-3xl text-center">
				<p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-sky-400">Your customers are already asking AI who to hire</p>
				<h2 id="lv2-cta-h" className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
					Drop your URL.
					<span className="block text-white/45">Make sure AI recommends you.</span>
				</h2>
				<div className="mt-10">
					<LucyUrlCapture id="final" />
				</div>
			</div>
		</section>
	)
}

/* ---------------- FAQ ---------------- */

export const LUCY_V2_FAQ = [
	{
		question: "Is it really automated?",
		answer: "Lucy does the daily work. The Recursive Solutions team sets her up and reviews the strategy.",
	},
	{
		question: "Do I approve what gets published or sent?",
		answer: "Yes. Nothing goes out without your OK unless you turn on autopilot.",
	},
	{
		question: "What happens after I drop my URL?",
		answer: "We review your site and come back to you with what we'd redesign and automate, and what it would cost.",
	},
	{
		question: "Can you automate things beyond marketing?",
		answer: "Yes. We build custom AI workflows and apps for the repetitive parts of your operations, like intake, follow-ups, reporting and document collection, and set them up for you.",
	},
	{
		question: "What does it cost after?",
		answer: "It depends on the channels you choose. We'll share pricing when we send you what we'd build.",
	},
]

export function LucyV2Faq() {
	const [open, setOpen] = useState<number | null>(0)
	const schema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: LUCY_V2_FAQ.map((f) => ({
			"@type": "Question",
			name: f.question,
			acceptedAnswer: { "@type": "Answer", text: f.answer },
		})),
	}
	return (
		<section id="faq" aria-labelledby="lv2-faq-h" className="px-5 pb-28 pt-8 sm:px-8">
			{/* Static site-authored data only; escape "<" so no text can close the script tag. */}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
			<div className="mx-auto max-w-3xl">
				<div className="text-center">
					<Eyebrow>FAQ</Eyebrow>
					<h2 id="lv2-faq-h" className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Quick answers.</h2>
				</div>
				<ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
					{LUCY_V2_FAQ.map((f, i) => {
						const isOpen = open === i
						return (
							<li key={f.question}>
								<h3>
									<button
										type="button"
										aria-expanded={isOpen}
										aria-controls={`lv2-faq-${i}`}
										id={`lv2-faq-btn-${i}`}
										onClick={() => setOpen(isOpen ? null : i)}
										className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:text-xl"
									>
										{f.question}
										<span aria-hidden="true" className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl leading-none text-sky-300 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
									</button>
								</h3>
								<div id={`lv2-faq-${i}`} role="region" aria-labelledby={`lv2-faq-btn-${i}`} className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
									<div className="overflow-hidden">
										<p className="pb-6 text-base leading-relaxed text-white/70 sm:text-lg">{f.answer}</p>
									</div>
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	)
}
