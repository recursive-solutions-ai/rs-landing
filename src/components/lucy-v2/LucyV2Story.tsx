"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "./gsap"

const CHAPTERS = [
	{
		label: "URL",
		kicker: "01 · Your URL",
		title: "You drop your URL.",
		body: "That’s the whole brief. Lucy reads your site, your offer and your competitors, and we start from where you are today.",
	},
	{
		label: "Website",
		kicker: "02 · Your website",
		title: "We rebuild your website.",
		body: "Fast, mobile-first and built to convert, and structured so search engines and AI can read it.",
	},
	{
		label: "Blog",
		kicker: "03 · Your blog",
		title: "Your blog starts ranking.",
		body: "Lucy researches what your customers search for, then writes and publishes the articles that get you ranking on Google.",
	},
	{
		label: "AI-ready",
		kicker: "04 · AI-ready",
		title: "AI recommends you.",
		body: "Your customers have stopped scrolling Google. They ask AI who to hire. We make sure the answer is you.",
	},
	{
		label: "Email",
		kicker: "05 · Your inbox",
		title: "Your inbox answers itself.",
		body: "The questions you get every week — pricing, availability, what you offer — answered in minutes, in your voice. Anything unusual comes straight to you.",
	},
	{
		label: "Outreach",
		kicker: "06 · Outreach",
		title: "Cold outreach that books calls.",
		body: "Lucy finds the businesses you want to work with, writes each one a personal email, follows up, and hands you the replies. You approve before anything goes out.",
	},
	{
		label: "Dashboard",
		kicker: "07 · Your week",
		title: "You check the dashboard.",
		body: "One view of what was published, sent and booked. Approve in a click, then take the calls.",
	},
]

const URL_TEXT = "yourfirm.com"

/* ---------- Illustrative mockup pieces (fixed 600x460 canvas) ---------- */

function OldSite() {
	return (
		<div className="lv2-old absolute inset-0">
			<div className="hd">SMITH &amp; CO. ACCOUNTING</div>
			<div className="nav">
				<a>Home</a> | <a>About Us</a> | <a>Our Services</a> | <a>Links</a> | <a>Contact</a>
			</div>
			<div style={{ padding: "12px 16px", display: "flex", gap: 14 }}>
				<div style={{ flex: 1 }}>
					<p style={{ fontSize: 18, fontWeight: "bold", color: "#c00", margin: 0 }}>Welcome to our website!!</p>
					<p style={{ margin: "8px 0 0" }}>
						We are a full service accounting firm serving the greater area since 1987. We offer tax preparation,
						bookkeeping, payroll, and many other services. Please call for an appointment.
					</p>
					<p style={{ margin: "8px 0 0" }}>
						Our office hours are Monday to Friday 9 to 5. Click <a>here</a> to download our client forms (PDF).
					</p>
					<hr />
					<p style={{ margin: 0, fontSize: 12, color: "#555" }}>Tax tip of the month: keep your receipts!</p>
				</div>
				<div style={{ width: 150 }}>
					<div className="box" style={{ height: 96, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
						[ photo.jpg ]
					</div>
					<p style={{ fontSize: 11, textAlign: "center", margin: "8px 0 0" }}>You are visitor #004213</p>
				</div>
			</div>
			<p style={{ position: "absolute", bottom: 10, left: 16, margin: 0, fontSize: 11, color: "#666" }}>
				Best viewed in Internet Explorer 6 &middot; Last updated 2011
			</p>
		</div>
	)
}

const ARTICLES = [
	{ t: "What changes for S-Corps in 2027", hue: "from-sky-400 to-blue-600", m: "6 min read" },
	{ t: "Is a cost segregation study worth it?", hue: "from-indigo-400 to-violet-600", m: "5 min read" },
	{ t: "Moving states: the tax checklist", hue: "from-cyan-400 to-teal-600", m: "7 min read" },
]
const SLOT_X = [18, 206, 394]

function NewSite() {
	return (
		<div className="lv2-new lv2-ns absolute inset-0">
			{/* nav */}
			<div className="lv2-ns-item absolute inset-x-0 top-0 flex h-[44px] items-center justify-between px-6">
				<div className="flex items-center gap-2 text-[14px] font-bold tracking-tight">
					<span className="size-[18px] rounded-md bg-gradient-to-br from-blue-500 to-indigo-600" />
					Smith &amp; Co.
				</div>
				<div className="flex items-center gap-5 text-[11px] font-medium text-slate-500">
					<span>Services</span>
					<span>Insights</span>
					<span>About</span>
					<span className="rounded-full bg-slate-900 px-3 py-1.5 text-white">Book a call</span>
				</div>
			</div>
			{/* hero */}
			<div className="absolute left-6 top-[66px] w-[280px]">
				<h3 className="lv2-ns-item text-[33px] font-extrabold leading-[1.05] tracking-tight">
					Tax advice,
					<br />
					<span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">made simple.</span>
				</h3>
				<p className="lv2-ns-item mt-3 text-[12px] leading-snug text-slate-500">
					Owner-led tax and accounting for growing businesses. Clear answers, fixed prices, no jargon.
				</p>
				<div className="lv2-ns-item mt-4 flex gap-2 text-[11px] font-semibold">
					<span className="rounded-full bg-blue-600 px-4 py-2 text-white shadow-md shadow-blue-600/30">Book a call</span>
					<span className="rounded-full border border-slate-200 px-4 py-2 text-slate-700">Our services</span>
				</div>
			</div>
			<div className="lv2-ns-item absolute right-6 top-[60px] h-[182px] w-[250px] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-100">
				<svg viewBox="0 0 250 182" className="absolute inset-0 size-full" aria-hidden="true">
					<path d="M0 150 C 40 140, 60 110, 100 112 S 170 70, 250 30" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
					<path d="M0 150 C 40 140, 60 110, 100 112 S 170 70, 250 30 L250 182 L0 182Z" fill="#3b82f6" opacity=".1" />
				</svg>
				<div className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-2 text-[10px] shadow-lg">
					<p className="text-slate-400">Saved this year</p>
					<p className="text-[15px] font-extrabold text-slate-900">$12,400</p>
				</div>
			</div>
			{/* article slots */}
			<p className="lv2-ns-item absolute left-[18px] top-[258px] text-[10px] font-bold uppercase tracking-widest text-slate-400">
				Latest insights
			</p>
			{SLOT_X.map((x) => (
				<div
					key={x}
					className="lv2-ns-item absolute top-[278px] h-[122px] w-[176px] rounded-xl border border-dashed border-slate-200 bg-slate-50"
					style={{ left: x }}
				/>
			))}
		</div>
	)
}

function Articles() {
	return (
		<>
			{ARTICLES.map((a, i) => (
				<div
					key={a.t}
					className="lv2-art lv2-new absolute top-[278px] h-[122px] w-[176px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10"
					style={{ left: SLOT_X[i] }}
				>
					<div className={`h-[48px] bg-gradient-to-br ${a.hue}`} />
					<div className="p-2.5">
						<p className="text-[11px] font-bold leading-tight text-slate-900">{a.t}</p>
						<p className="mt-1.5 text-[9px] text-slate-400">{a.m} &middot; Published by Lucy</p>
					</div>
				</div>
			))}
		</>
	)
}

const AI_PRE = "For S-corp filings near you, I’d recommend".split(" ")
const AI_HL = "Smith & Co.".split(" ")
const AI_POST = "They’re owner-led, quote fixed fees and answer questions fast. Their S-corp guide is the clearest I found.".split(" ")
const AI_CHECKS = ["Structured data on every page", "Your answers marked up for AI", "A chatbot on your site that answers 24/7 and books calls"]

function AiView() {
	const w = (t: string, i: number) => (
		<span key={`${t}-${i}`}>
			<span className="lv2-aw inline-block">{t}</span>{" "}
		</span>
	)
	return (
		<div className="lv2-aiv absolute inset-0 overflow-hidden bg-[#070b1f]" style={{ fontFamily: "var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)" }}>
			<div aria-hidden="true" className="lv2-aig absolute left-1/2 top-[38%] h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.5),rgba(59,130,246,0.18)_60%,transparent)]" />
			<div className="relative flex h-[44px] items-center gap-2 border-b border-white/10 px-5 text-[13px] font-semibold text-white">
				<svg viewBox="0 0 24 24" className="size-4 text-sky-300" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 5.7L19.5 9l-5.7 1.8L12 16.5l-1.8-5.7L4.5 9l5.7-1.3zM19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z" /></svg>
				AI assistant
			</div>
			<div className="lv2-aiq-wrap relative ml-auto mr-5 mt-3 w-[330px] rounded-2xl rounded-br-sm bg-blue-600 px-4 py-2.5 text-[12.5px] font-medium leading-snug text-white shadow-lg shadow-blue-600/30">
				<span className="invisible">Who’s the best accountant near me for S-corp filings?</span>
				<span className="lv2-aiq absolute left-4 top-2.5 right-4">Who’s the best accountant near me for S-corp filings?</span>
			</div>
			<div className="relative mx-5 mt-3 flex items-start gap-3">
				<span className="lv2-aiav relative mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-[0_0_24px_rgba(99,102,241,0.8)]">
					<svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 5.7L19.5 9l-5.7 1.8L12 16.5l-1.8-5.7L4.5 9l5.7-1.3z" /></svg>
				</span>
				<p className="max-w-[470px] text-[13px] leading-[1.5] text-white/90">
					{AI_PRE.map(w)}
					<span className="lv2-hlw relative inline-block font-bold text-white">
						<span aria-hidden="true" className="lv2-hl absolute -inset-x-1 inset-y-0 origin-left rounded-md bg-gradient-to-r from-sky-500/60 to-indigo-500/60" />
						<span className="relative">{AI_HL.map(w)}</span>
					</span>{" "}
					{AI_POST.map(w)}
				</p>
			</div>
			<div className="lv2-src relative ml-[60px] mt-3 flex w-[300px] items-center gap-3 rounded-xl border border-white/15 bg-white/[0.07] p-2.5">
				<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-[12px] font-extrabold text-white">S</span>
				<span className="min-w-0 text-[11px] leading-tight">
					<span className="block text-[9px] font-semibold uppercase tracking-wider text-sky-300">Source</span>
					<span className="block truncate font-semibold text-white">S-corp filings made simple · Smith &amp; Co.</span>
					<span className="block text-white/50">yourfirm.com/insights</span>
				</span>
			</div>
			<div className="relative mx-5 mt-4">
				<p className="lv2-ckh text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">What makes AI pick you</p>
				<ul className="mt-2 space-y-1.5">
					{AI_CHECKS.map((c) => (
						<li key={c} className="lv2-ck flex items-center gap-2.5 text-[12px] font-medium text-white">
							<span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/50">
								<svg viewBox="0 0 20 20" className="size-3 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
									<path className="lv2-tick" d="M4.5 10.5l3.5 3.5 7.5-8" pathLength={1} strokeDasharray="1" />
								</svg>
							</span>
							{c}
						</li>
					))}
				</ul>
			</div>
			<div className="lv2-minibot absolute bottom-[14px] right-[16px] flex items-center gap-2">
				<span className="lv2-minitip rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-800 shadow-lg">Hi! Ask me anything, or book a call.</span>
				<span className="flex size-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/40">
					<svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
						<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z" />
					</svg>
				</span>
			</div>
		</div>
	)
}

const PROSPECTS = [
	{ co: "Harbor Dental", who: "Dr. Priya N." },
	{ co: "Northline Logistics", who: "Marcus T." },
	{ co: "Bright Path Therapy", who: "Elena R." },
	{ co: "Oakridge Builders", who: "Sam K." },
]
const STATUSES = [
	{ t: "Sent", cls: "bg-slate-200 text-slate-600" },
	{ t: "Opened", cls: "bg-amber-100 text-amber-700" },
	{ t: "Replied", cls: "bg-sky-100 text-sky-700" },
	{ t: "Booked", cls: "bg-emerald-500 text-white" },
]

function Outreach() {
	return (
		<div className="lv2-outv lv2-new absolute inset-0 bg-slate-50">
			<div className="flex h-[44px] items-center justify-between border-b border-slate-200 bg-white px-5">
				<p className="text-[13px] font-bold">Outreach <span className="font-medium text-slate-400">&middot; Smith &amp; Co.</span></p>
				<p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">4 prospects match your ideal client</p>
			</div>
			<div className="absolute left-4 top-[58px] w-[268px]">
				{PROSPECTS.map((p) => (
					<div key={p.co} className="lv2-prow mb-2 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
						<div className="min-w-0 text-[11px] leading-tight">
							<p className="truncate font-bold text-slate-900">{p.co}</p>
							<p className="mt-0.5 text-slate-400">{p.who}</p>
						</div>
						<span className="relative ml-2 inline-block h-[20px] w-[62px] shrink-0">
							{STATUSES.map((s, k) => (
								<span key={s.t} className={`lv2-st lv2-st-${k} absolute inset-0 flex items-center justify-center rounded-full text-[10px] font-bold ${s.cls}`}>{s.t}</span>
							))}
						</span>
					</div>
				))}
			</div>
			<div className="lv2-ocard absolute right-4 top-[58px] w-[290px] rounded-xl border border-slate-200 bg-white p-3 shadow-md">
				<div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
					<span className="text-blue-600">Lucy&rsquo;s email &middot; Harbor Dental</span>
					<span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">&#10003; Approved</span>
				</div>
				<p className="mt-2 text-[11px] leading-snug text-slate-700">
					Hi Priya, I saw Harbor Dental is opening a second location. We help owner-led practices stay booked without chasing leads. Worth a quick call this week?
				</p>
			</div>
			<div className="lv2-oreply absolute right-4 top-[190px] w-[250px] rounded-xl rounded-tl-sm border border-sky-200 bg-sky-50 p-3">
				<p className="text-[9px] font-bold uppercase tracking-wider text-sky-700">Reply &middot; Priya N.</p>
				<p className="mt-1.5 text-[12px] font-semibold text-slate-900">Sounds good, does Thursday work?</p>
			</div>
			<p className="lv2-obook absolute right-4 top-[270px] inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-white">
				<span aria-hidden="true">&#10003;</span> Meeting booked &middot; Thu 2:00
			</p>
		</div>
	)
}

function Inbox() {
	return (
		<div className="lv2-inbox lv2-new absolute inset-0 bg-slate-50">
			<div className="flex h-[44px] items-center justify-between border-b border-slate-200 bg-white px-5">
				<p className="text-[13px] font-bold">Inbox <span className="font-medium text-slate-400">&middot; Smith &amp; Co.</span></p>
				<p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Handled by Lucy</p>
			</div>
			<div className="lv2-mail absolute left-4 top-[58px] w-[364px] rounded-xl border border-slate-200 bg-white p-3 shadow-md">
				<div className="flex items-center justify-between text-[10px] text-slate-400">
					<span className="font-semibold text-slate-700">Dana R. &lt;dana@client.com&gt;</span>
					<span>just now</span>
				</div>
				<p className="mt-1.5 text-[12px] font-bold text-slate-900">Do you handle S-corp filings? What do you charge?</p>
			</div>
			<div className="lv2-draft absolute left-4 top-[134px] w-[364px] rounded-xl border border-blue-200 bg-blue-50 p-3">
				<p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600">
					<span className="size-1.5 rounded-full bg-blue-500" />Lucy&rsquo;s draft reply
				</p>
				<p className="mt-2 text-[11.5px] leading-snug text-slate-800">
					Hi Dana, yes, we prepare S-corp returns for owner-led businesses. Pricing depends on your bookkeeping and number of owners, so we quote a fixed fee after a 15-minute call. Here&rsquo;s a link to pick a time.
				</p>
			</div>
			<p className="lv2-sent absolute left-4 top-[262px] inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-white">
				<span aria-hidden="true">&#10003;</span> Approved &middot; Sent in 2 min
			</p>
			<div className="absolute right-4 top-[58px] w-[172px]">
				<p className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
					Handled <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700"><Num k="handled" v={13} /></span>
				</p>
				<div className="lv2-pile-new mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-[10px] font-semibold text-emerald-800">S-corp filings &middot; replied</div>
				{["Opening hours \u00b7 replied", "Do you take new clients? \u00b7 replied", "Pricing for bookkeeping \u00b7 replied"].map((t) => (
					<div key={t} className="mt-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[10px] text-slate-400">{t}</div>
				))}
			</div>
		</div>
	)
}

function Num({ k, v, className = "" }: { k: string; v: number; className?: string }) {
	return (
		<span data-c={k} className={`tabular-nums ${className}`}>
			{v}
		</span>
	)
}

const BARS = [38, 52, 44, 70, 62, 84, 96]

export function LucyDashboard({ className = "" }: { className?: string }) {
	const stat = (k: string, v: number, label: string) => (
		<div className="rounded-xl bg-white/[0.05] p-2.5">
			<p className="text-[24px] font-bold leading-none text-white"><Num k={k} v={v} /></p>
			<p className="mt-1.5 text-[10px] leading-tight text-white/55">{label}</p>
		</div>
	)
	return (
		<div className={`rounded-[18px] border border-white/15 bg-[#0b132b] p-4 shadow-[0_30px_80px_-20px_rgba(59,130,246,0.55)] ${className}`}>
			<div className="flex items-center justify-between">
				<p className="flex items-center gap-2 text-[13px] font-bold text-white">
					<span className="size-2 rounded-full bg-emerald-400" />
					Lucy &middot; this week
				</p>
				<span className="text-[10px] text-white/45">Mon &ndash; Sun</span>
			</div>
			<div className="mt-3 grid grid-cols-3 gap-2">
				{stat("d-pages", 12, "pages live")}
				{stat("d-articles", 9, "articles published")}
				{stat("d-ai", 5, "AI answers mentioning you")}
				{stat("d-emails", 23, "emails answered")}
				{stat("d-replies", 9, "outreach replies")}
				{stat("d-calls", 3, "calls booked")}
			</div>
			<div className="mt-3 flex h-[56px] items-end gap-2 rounded-xl bg-white/[0.04] p-3">
				{BARS.map((h, i) => (
					<span key={i} className="lv2-dbar block flex-1 origin-bottom rounded-sm bg-gradient-to-t from-blue-600 to-sky-400" style={{ height: `${h}%` }} />
				))}
			</div>
			<div className="lv2-approve mt-3 flex items-center justify-between rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-[11px] text-sky-100">
				<span>3 items waiting for your OK</span>
				<span className="rounded-full bg-sky-400 px-3 py-1 font-semibold text-[#03060f]">Approve all</span>
			</div>
			<p className="mt-2 text-right text-[9px] uppercase tracking-widest text-white/35">Illustrative example</p>
		</div>
	)
}

function Stage({ canvasRef, wrapRef }: { canvasRef: React.RefObject<HTMLDivElement | null>; wrapRef: React.RefObject<HTMLDivElement | null> }) {
	return (
		<div ref={wrapRef} className="lv2-stage-wrap mx-auto max-w-[min(640px,max(260px,calc((100svh-385px)*1.304)))] lg:col-start-2 lg:row-start-1 lg:max-w-[560px] xl:max-w-[600px]">
			<div ref={canvasRef} className="lv2-canvas" style={{ visibility: "hidden" }} role="img" aria-label="Illustration: a plain website is redesigned, connected to a blog and a chatbot, run by Lucy and summarised in a weekly dashboard.">
				<div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[520px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.28),rgba(59,130,246,0)_70%)]" />
				<div className="lv2-browser absolute inset-0 overflow-hidden rounded-[14px] border border-white/15 bg-[#ecebe3] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)]">
					<div className="relative flex h-[40px] items-center gap-3 border-b border-white/10 bg-[#151b2e] px-3.5">
						<div className="flex gap-1.5">
							<span className="size-[10px] rounded-full bg-[#ff5f57]" />
							<span className="size-[10px] rounded-full bg-[#febc2e]" />
							<span className="size-[10px] rounded-full bg-[#28c840]" />
						</div>
						<div className="flex h-[24px] flex-1 items-center rounded-md bg-[#0a0f1f] px-3 font-mono text-[12px] text-white/85">
							<span className="mr-2 text-white/35">https://</span>
							<span className="lv2-url">{URL_TEXT}</span>
							<span className="lv2-caret ml-px text-sky-400">|</span>
						</div>
						<span className="lv2-load absolute bottom-0 left-0 h-[2px] w-full origin-left bg-sky-400" />
					</div>
					<div className="absolute inset-x-0 bottom-0 top-[40px] overflow-hidden">
						<OldSite />
						<NewSite />
						<span className="lv2-wipe absolute inset-y-0 left-0 w-[3px] bg-sky-400 shadow-[0_0_24px_6px_rgba(56,189,248,0.8)]" />
						<Articles />
						<div className="lv2-speed lv2-new absolute bottom-[14px] left-[14px] flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold shadow-lg">
							<span className="size-2 rounded-full bg-emerald-500" />
							Page speed <Num k="speed" v={98} className="text-emerald-600" />
						</div>
						<div className="lv2-kw lv2-new absolute right-[14px] top-[56px] rounded-full bg-white px-3 py-1.5 text-[11px] font-bold shadow-lg">
							<span className="text-blue-600">&uarr;</span> Ranking for <Num k="kw" v={128} className="text-blue-600" /> keywords
						</div>
						<Inbox />
						<Outreach />
					</div>
					<AiView />
				</div>
				<LucyDashboard className="lv2-dash absolute left-[60px] top-[48px] w-[480px]" />
			</div>
		</div>
	)
}

/* ---------- Section ---------- */

function useReducedMotionFlag() {
	const [reduced, setReduced] = useState(false)
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
		const update = () => setReduced(mq.matches)
		update()
		mq.addEventListener("change", update)
		return () => mq.removeEventListener("change", update)
	}, [])
	return reduced
}

function count(tl: gsap.core.Timeline, el: Element | null, to: number, at: number, dur: number, from = 0) {
	if (!el) return
	const o = { v: from }
	el.textContent = String(from)
	tl.fromTo(
		o,
		{ v: from },
		{ v: to, duration: dur, ease: "none", onUpdate: () => void (el.textContent = String(Math.round(o.v))) },
		at,
	)
}

export function LucyV2Story() {
	const reduced = useReducedMotionFlag()
	const section = useRef<HTMLElement>(null)
	const wrap = useRef<HTMLDivElement>(null)
	const canvas = useRef<HTMLDivElement>(null)
	const stRef = useRef<ScrollTrigger | null>(null)

	// Fit the fixed 600x460 canvas to its container.
	useLayoutEffect(() => {
		const w = wrap.current
		const c = canvas.current
		if (!w || !c) return
		const fit = () => {
			c.style.transform = `scale(${w.clientWidth / 600})`
			c.style.visibility = "visible"
		}
		fit()
		const ro = new ResizeObserver(() => {
			fit()
			ScrollTrigger.refresh()
		})
		ro.observe(w)
		return () => ro.disconnect()
	}, [reduced])

	useLayoutEffect(() => {
		const root = section.current
		if (!root || reduced) return
		const one = (s: string) => root.querySelector<HTMLElement>(s)
		const all = (s: string) => gsap.utils.toArray<HTMLElement>(s, root)

		const mm = gsap.matchMedia()
		mm.add(
			{ desk: "(min-width: 1024px)", mob: "(max-width: 1023px)" },
			(ctx) => {
				const desk = !!ctx.conditions?.desk
				const tl = gsap.timeline({
					defaults: { ease: "none" },
					scrollTrigger: {
						trigger: root,
						start: "top top",
						end: desk ? "+=900%" : "+=580%",
						pin: true,
						scrub: 0.6,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					},
				})
				stRef.current = tl.scrollTrigger ?? null

				const chaps = all(".lv2-chap")
				const fills = all(".lv2-rail-fill")
				const labels = all(".lv2-rail-label")

				/* chapter text + progress rail */
				// Text + rail switch only once the next scene has mostly landed (scene transitions run
				// from i to ~i+0.3), so the kicker number always matches what the mockup shows.
				chaps.forEach((c, i) => {
					if (i > 0) tl.fromTo(c, { autoAlpha: 0, y: 56 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }, i + 0.3)
					if (i < chaps.length - 1) tl.to(c, { autoAlpha: 0, y: -56, duration: 0.2, ease: "power2.in" }, i + 1.02)
					if (i > 0) {
						tl.fromTo(fills[i], { opacity: 0 }, { opacity: 1, duration: 0.15 }, i + 0.3)
						tl.fromTo(labels[i], { opacity: 0.4 }, { opacity: 1, duration: 0.15 }, i + 0.3)
					}
					if (i < chaps.length - 1) tl.to(labels[i], { opacity: 0.4, duration: 0.15 }, i + 1.02)
				})
				gsap.set(fills[0], { opacity: 1 })
				gsap.set(labels[0], { opacity: 1 })
				tl.fromTo(one(".lv2-prog"), { scaleY: 0, scaleX: 0 }, { scaleY: 1, scaleX: 1, duration: 7.4 }, 0)

				/* ch1: URL types itself, page "loads" */
				const urlEl = one(".lv2-url")!
				const st = { n: 0 }
				urlEl.textContent = ""
				tl.fromTo(
					st,
					{ n: 0 },
					{ n: URL_TEXT.length, duration: 0.6, onUpdate: () => void (urlEl.textContent = URL_TEXT.slice(0, Math.round(st.n))) },
					0.1,
				)
				tl.fromTo(".lv2-load", { scaleX: 0 }, { scaleX: 1, duration: 0.22 }, 0.74)
				tl.to(".lv2-load", { opacity: 0, duration: 0.05 }, 0.96)
				tl.fromTo(".lv2-browser", { scale: 0.94 }, { scale: 1, duration: 0.5, ease: "power2.out" }, 0)

				/* ch2: old site wipes into the redesign */
				tl.fromTo(".lv2-ns", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "power2.inOut" }, 1.02)
				tl.fromTo(".lv2-wipe", { x: 0, opacity: 1 }, { x: 600, duration: 0.65, ease: "power2.inOut" }, 1.02)
				tl.to(".lv2-wipe", { opacity: 0, duration: 0.04 }, 1.66)
				tl.to(".lv2-old", { scale: 0.95, duration: 0.65 }, 1.02)
				tl.from(".lv2-ns-item", { opacity: 0, y: 28, scale: 0.86, duration: 0.35, stagger: 0.05, ease: "back.out(1.4)" }, 1.25)
				tl.fromTo(".lv2-speed", { opacity: 0, y: 14, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }, 1.55)
				count(tl, one('[data-c="speed"]'), 98, 1.55, 0.4, 41)
				tl.to(".lv2-speed", { opacity: 0, y: -10, duration: 0.15 }, 1.92)

				/* ch3: blog cards stream in + keyword counter */
				tl.fromTo(
					".lv2-art",
					{ opacity: 0, y: 90, x: (i: number) => (i - 1) * 60, scale: 0.8, rotate: (i: number) => (i - 1) * 8 },
					{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, duration: 0.4, stagger: 0.12, ease: "back.out(1.3)" },
					2.05,
				)
				tl.fromTo(".lv2-kw", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" }, 2.35)
				count(tl, one('[data-c="kw"]'), 128, 2.35, 0.55)

				/* ch4: AI recommends you (the peak) */
				const q = one(".lv2-aiq")!
				const QT = q.textContent ?? ""
				const qs = { n: 0 }
				q.textContent = ""
				tl.fromTo(".lv2-aiv", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(150% at 50% 50%)", duration: 0.3, ease: "power3.inOut" }, 3.0)
				tl.fromTo(".lv2-aig", { scale: 0.5, opacity: 0 }, { scale: 1.1, opacity: 1, duration: 0.5, ease: "power2.out" }, 3.05)
				tl.fromTo(".lv2-aiq-wrap", { opacity: 0, y: 16, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "power2.out" }, 3.2)
				tl.fromTo(qs, { n: 0 }, { n: QT.length, duration: 0.18, onUpdate: () => void (q.textContent = QT.slice(0, Math.round(qs.n))) }, 3.24)
				tl.fromTo(".lv2-aiav", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.1, ease: "back.out(2.5)" }, 3.44)
				tl.fromTo(".lv2-aw", { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.05, stagger: 0.0085, ease: "power1.out" }, 3.52)
				tl.fromTo(".lv2-hl", { scaleX: 0 }, { scaleX: 1, duration: 0.1, ease: "power2.out" }, 3.74)
				tl.fromTo(".lv2-hlw", { scale: 1 }, { scale: 1.07, duration: 0.05, yoyo: true, repeat: 1, ease: "power1.inOut" }, 3.76)
				tl.fromTo(".lv2-src", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.1, ease: "back.out(1.5)" }, 3.78)
				tl.fromTo(".lv2-ckh", { opacity: 0 }, { opacity: 1, duration: 0.05 }, 3.82)
				all(".lv2-ck").forEach((c, i) => {
					tl.fromTo(c, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.07, ease: "power2.out" }, 3.84 + i * 0.045)
					tl.fromTo(c.querySelector(".lv2-tick"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.05 }, 3.88 + i * 0.045)
				})
				tl.fromTo(".lv2-minibot", { scale: 0, opacity: 0, transformOrigin: "100% 100%" }, { scale: 1, opacity: 1, duration: 0.07, ease: "back.out(2)" }, 3.95)
				tl.to(".lv2-aiv", { opacity: 0, duration: 0.05 }, 3.98)

				/* ch5: inbox view; a customer email arrives, Lucy drafts, it is sent and filed */
				tl.fromTo(".lv2-inbox", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "power2.inOut" }, 4.0)
				tl.fromTo(".lv2-mail", { opacity: 0, y: -40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "back.out(1.4)" }, 4.28)
				tl.fromTo(".lv2-draft", { opacity: 0, y: 24, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" }, 4.45)
				tl.fromTo(".lv2-sent", { opacity: 0, scale: 0.7, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: 0.15, ease: "back.out(2)" }, 4.68)
				tl.to([".lv2-mail", ".lv2-draft"], { x: 380, scale: 0.5, opacity: 0, duration: 0.25, ease: "power2.in" }, 4.8)
				tl.to(".lv2-sent", { opacity: 0, duration: 0.1 }, 4.85)
				tl.fromTo(".lv2-pile-new", { opacity: 0, y: -14, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.15 }, 4.95)
				count(tl, one('[data-c="handled"]'), 13, 4.95, 0.05, 12)

				/* ch6: cold outreach; prospects advance Sent > Opened > Replied > Booked */
				tl.fromTo(".lv2-outv", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.28, ease: "power2.inOut" }, 5.0)
				tl.fromTo(".lv2-prow", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.15, stagger: 0.06, ease: "power2.out" }, 5.18)
				tl.fromTo(".lv2-ocard", { opacity: 0, x: 40, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.2, ease: "power2.out" }, 5.3)
				const rows = all(".lv2-prow")
				const stage = (row: number, st: number, at: number) =>
					tl.fromTo(rows[row].querySelector(`.lv2-st-${st}`), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.06 }, at)
				rows.forEach((r) => gsap.set(r.querySelectorAll(".lv2-st-1, .lv2-st-2, .lv2-st-3"), { opacity: 0 }))
				stage(0, 1, 5.44); stage(1, 1, 5.48); stage(2, 1, 5.52)
				stage(0, 2, 5.58); stage(1, 2, 5.68)
				tl.fromTo(".lv2-oreply", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.14, ease: "back.out(1.6)" }, 5.62)
				stage(0, 3, 5.8)
				tl.fromTo(".lv2-obook", { opacity: 0, scale: 0.7, x: -16 }, { opacity: 1, scale: 1, x: 0, duration: 0.12, ease: "back.out(2)" }, 5.82)

				/* ch7: everything resolves into the weekly dashboard */
				tl.to(".lv2-browser", { opacity: 0, scale: 0.8, y: -24, duration: 0.2, ease: "power2.in" }, 6.0)
				tl.fromTo(".lv2-dash", { opacity: 0, scale: 0.88, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" }, 6.1)
				tl.from(".lv2-dbar", { scaleY: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }, 6.5)
				count(tl, one('[data-c="d-pages"]'), 12, 6.35, 0.4)
				count(tl, one('[data-c="d-articles"]'), 9, 6.4, 0.4)
				count(tl, one('[data-c="d-ai"]'), 5, 6.45, 0.4)
				count(tl, one('[data-c="d-emails"]'), 23, 6.5, 0.4)
				count(tl, one('[data-c="d-replies"]'), 9, 6.55, 0.35)
				count(tl, one('[data-c="d-calls"]'), 3, 6.6, 0.3)
				tl.from(".lv2-approve", { opacity: 0, y: 14, duration: 0.2 }, 6.8)
				tl.to({}, { duration: 0.4 }, 7)

				return () => {
					stRef.current = null
				}
			},
			root,
		)
		return () => mm.revert()
	}, [reduced])

	const jumpTo = (i: number) => {
		const st = stRef.current
		if (!st) return
		window.scrollTo({ top: st.start + (st.end - st.start) * ((i + 0.45) / 7.4), behavior: "smooth" })
	}

	if (reduced) {
		return (
			<section id="story" aria-labelledby="lv2-story-h" className="px-5 py-24 sm:px-8">
				<h2 id="lv2-story-h" className="sr-only">How Recursive Solutions turns your website into a growth engine</h2>
				<ol className="mx-auto grid max-w-4xl gap-10">
					{CHAPTERS.map((c) => (
						<li key={c.title}>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">{c.kicker}</p>
							<h3 className="mt-2 font-display text-4xl font-semibold tracking-tight">{c.title}</h3>
							<p className="mt-3 max-w-xl text-lg text-white/70">{c.body}</p>
						</li>
					))}
				</ol>
				<LucyDashboard className="mx-auto mt-14 w-full max-w-[480px]" />
			</section>
		)
	}

	return (
		<section ref={section} id="story" aria-labelledby="lv2-story-h" className="relative h-[100svh] overflow-hidden">
			<h2 id="lv2-story-h" className="sr-only">How Recursive Solutions turns your website into a growth engine</h2>
			<div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
			<div className="mx-auto grid h-full max-w-7xl content-center gap-4 px-5 pb-4 pt-[72px] sm:px-8 lg:grid-cols-[minmax(360px,1fr)_minmax(0,560px)] lg:items-center lg:gap-10 lg:pt-16">
				<Stage canvasRef={canvas} wrapRef={wrap} />

				<div className="flex flex-col gap-3 lg:col-start-1 lg:row-start-1 lg:flex-row lg:gap-5 xl:gap-8">
					<ol aria-label="Story progress" className="relative flex shrink-0 justify-between gap-1 lg:flex-col lg:justify-start lg:gap-5 lg:py-1">
						<span aria-hidden="true" className="absolute left-[9px] top-2 hidden h-[calc(100%-1rem)] w-px bg-white/15 lg:block" />
						<span aria-hidden="true" className="lv2-prog absolute left-[9px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-sky-400 lg:block" />
						{CHAPTERS.map((c, i) => (
							<li key={c.label} className="relative">
								<button
									type="button"
									onClick={() => jumpTo(i)}
									aria-label={`Go to step ${i + 1}: ${c.label}`}
									className="flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
								>
									<span className="relative flex size-[19px] shrink-0 items-center justify-center rounded-full border border-white/25 bg-[#03060f] text-[9px] font-bold text-white/70">
										<span className="lv2-rail-fill absolute inset-0 rounded-full bg-sky-400 opacity-0" />
										<span className="relative text-white">{i + 1}</span>
									</span>
									<span className="lv2-rail-label hidden text-xs font-semibold uppercase tracking-wider text-white opacity-40 xl:inline">{c.label}</span>
								</button>
							</li>
						))}
					</ol>
					<div className="relative h-[200px] min-w-0 flex-1 lg:h-[300px]">
						{CHAPTERS.map((c, i) => (
							<div key={c.title} className="lv2-chap absolute inset-x-0 top-0" style={i === 0 ? undefined : { visibility: "hidden" }}>
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">{c.kicker}</p>
								<h3 className="mt-2 font-display text-[30px] font-semibold leading-[1.08] tracking-tight lg:mt-3 lg:text-5xl lg:text-[3.4rem]">{c.title}</h3>
								<p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/70 lg:mt-4 lg:text-lg">{c.body}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
