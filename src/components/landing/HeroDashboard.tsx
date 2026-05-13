"use client"

import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faGrip,
	faLayerGroup,
	faRobot,
	faChartLine,
	faPenNib,
	faComments,
	faMagnifyingGlass,
	faClipboardList,
	faMagnet,
	faHandshake,
	faFolderOpen,
	faGears,
} from "@fortawesome/free-solid-svg-icons"
import {
	gsap,
	useGSAP,
	EASE_REVEAL,
	DISTANCE_SM,
	DURATION_NORMAL,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"

/* ── HeroDashboard ──────────────────────────────────────────────────────
 * Animated mockup of the Lucy portal shown inside the hero's browser
 * chrome. The sidebar groups (Marketing / Capture / Sales) mirror the
 * pillar section below, and the stat counters animate up from zero to
 * anchor the "growth" promise. */

interface StatConfig {
	label: string
	target: number
	prefix?: string
	suffix?: string
	caption: string
}

const STATS: StatConfig[] = [
	{ label: "Blog posts", target: 47, caption: "published this quarter" },
	{ label: "Contacts", target: 312, caption: "active leads" },
	{
		label: "Pipeline value",
		target: 184500,
		prefix: "$",
		caption: "across open deals",
	},
	{ label: "Open deals", target: 12, caption: "in progress" },
]

interface ActivityItem {
	tag: "Attract" | "Engage" | "Capture" | "Close" | "Optimize"
	text: string
}

const ACTIVITY: ActivityItem[] = [
	{ tag: "Engage", text: "Post published: 5 Ways AI Grows Service Businesses" },
	{ tag: "Capture", text: "New lead: Jane Doe — Acme Corp" },
	{ tag: "Close", text: "Deal moved to Won: Acme Renewal · $184K" },
	{ tag: "Optimize", text: "Workflow optimized: 18h saved this week" },
	{ tag: "Attract", text: "Ranked #1 for ‘ai for growing businesses’" },
]

const TAG_STYLES: Record<ActivityItem["tag"], string> = {
	Attract: "bg-primary/15 text-primary",
	Engage: "bg-primary/15 text-primary",
	Capture: "bg-emerald-500/15 text-emerald-600",
	Close: "bg-amber-500/15 text-amber-600",
	Optimize: "bg-violet-500/15 text-violet-600",
}

function NavGroupLabel({ children }: { children: React.ReactNode }) {
	return (
		<div className="mt-3 mb-1 px-2 text-[8px] font-bold uppercase tracking-[0.15em] text-base-content/40">
			{children}
		</div>
	)
}

function NavItem({
	icon,
	label,
	active = false,
}: {
	icon: typeof faGrip
	label: string
	active?: boolean
}) {
	return (
		<div
			className={`flex items-center gap-2 rounded-md px-2 py-1 text-[10px] ${
				active
					? "bg-primary/10 font-semibold text-primary"
					: "text-base-content/70"
			}`}
		>
			<FontAwesomeIcon icon={icon} className="w-2.5 text-[9px]" />
			<span>{label}</span>
		</div>
	)
}

export function HeroDashboard() {
	const rootRef = useRef<HTMLDivElement>(null)
	const reducedMotion = useReducedMotion()

	useGSAP(
		() => {
			if (reducedMotion || !rootRef.current) return

			const statCards = rootRef.current.querySelectorAll<HTMLElement>(
				"[data-stat-card]"
			)
			const counters = rootRef.current.querySelectorAll<HTMLElement>(
				"[data-counter]"
			)
			const activityItems = rootRef.current.querySelectorAll<HTMLElement>(
				"[data-activity]"
			)
			const chartPath = rootRef.current.querySelector<SVGPathElement>(
				"[data-growth-path]"
			)
			const growthLabel = rootRef.current.querySelector<HTMLElement>(
				"[data-growth-label]"
			)
			const header = rootRef.current.querySelector<HTMLElement>(
				"[data-header]"
			)

			const tl = gsap.timeline({ delay: 0.9 })

			// Header fade
			tl.fromTo(
				header,
				{ y: DISTANCE_SM, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.5, ease: EASE_REVEAL }
			)

			// Stat cards stagger in
			tl.fromTo(
				statCards,
				{ y: 16, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.5,
					stagger: 0.08,
					ease: EASE_REVEAL,
				},
				"-=0.2"
			)

			// Counters tick up
			counters.forEach((el, i) => {
				const target = Number(el.dataset.target ?? 0)
				const prefix = el.dataset.prefix ?? ""
				const obj = { v: 0 }
				tl.to(
					obj,
					{
						v: target,
						duration: 1.2,
						ease: "power2.out",
						onUpdate: () => {
							const v = Math.round(obj.v)
							el.textContent = `${prefix}${v.toLocaleString()}`
						},
					},
					`-=${i === 0 ? 0.5 : 1.15}`
				)
			})

			// Chart draw
			if (chartPath) {
				const length = chartPath.getTotalLength()
				gsap.set(chartPath, { strokeDasharray: length, strokeDashoffset: length })
				tl.to(
					chartPath,
					{ strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
					"-=1"
				)
				tl.fromTo(
					growthLabel,
					{ opacity: 0, y: 8 },
					{ opacity: 1, y: 0, duration: 0.4, ease: EASE_REVEAL },
					"-=0.3"
				)
			}

			// Activity items stagger
			tl.fromTo(
				activityItems,
				{ x: -16, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.5,
					stagger: 0.1,
					ease: EASE_REVEAL,
				},
				"-=0.9"
			)
		},
		{ scope: rootRef, dependencies: [reducedMotion] }
	)

	return (
		<div
			ref={rootRef}
			className="grid aspect-[16/9] grid-cols-[140px_1fr] bg-base-200 sm:grid-cols-[160px_1fr] md:grid-cols-[180px_1fr]"
		>
			{/* Sidebar */}
			<aside className="border-r border-base-content/10 bg-base-100/70 p-3 backdrop-blur-sm">
				{/* Brand */}
				<div className="mb-3 flex items-center gap-2">
					<div className="size-6 rounded bg-primary/20 ring-1 ring-primary/30" />
					<div className="text-[9px] font-bold tracking-wider text-base-content/80">
						RECURSIVE
					</div>
				</div>

				{/* Workspace selector */}
				<div className="mb-3 flex items-center gap-2 rounded-md bg-base-content/5 px-2 py-1.5">
					<div className="size-3 rounded bg-base-content/30" />
					<div className="text-[9px] font-semibold text-base-content/80">
						Recursive Solutions
					</div>
				</div>

				<nav>
					<NavItem icon={faGrip} label="Dashboard" active />
					<NavItem icon={faLayerGroup} label="Applications" />
					<NavItem icon={faRobot} label="Experts" />
					<NavItem icon={faChartLine} label="Analytics" />

					<NavGroupLabel>Marketing</NavGroupLabel>
					<NavItem icon={faPenNib} label="Blog" />
					<NavItem icon={faComments} label="Social" />
					<NavItem icon={faMagnifyingGlass} label="SEO" />

					<NavGroupLabel>Capture</NavGroupLabel>
					<NavItem icon={faClipboardList} label="Forms" />
					<NavItem icon={faMagnet} label="Lead Finder" />

					<NavGroupLabel>Sales</NavGroupLabel>
					<NavItem icon={faHandshake} label="Contacts" />
					<NavItem icon={faChartLine} label="Pipelines" />

					<NavGroupLabel>Assets</NavGroupLabel>
					<NavItem icon={faFolderOpen} label="Files" />
					<NavItem icon={faGears} label="Workflows" />
				</nav>
			</aside>

			{/* Main */}
			<main className="overflow-hidden p-3 md:p-4">
				{/* Header */}
				<div data-header className="mb-3">
					<div className="font-heading text-sm font-bold text-base-content md:text-base">
						Recursive Solutions
					</div>
					<div className="text-[10px] text-base-content/50">
						Content & growth overview
					</div>
				</div>

				{/* Stat cards */}
				<div className="mb-3 grid grid-cols-4 gap-2">
					{STATS.map((s) => (
						<div
							key={s.label}
							data-stat-card
							className="rounded-lg bg-base-100 p-2 ring-1 ring-base-content/10 md:p-3"
						>
							<div className="mb-1 text-[8px] font-medium uppercase tracking-wider text-base-content/50 md:text-[9px]">
								{s.label}
							</div>
							<div
								data-counter
								data-target={s.target}
								data-prefix={s.prefix ?? ""}
								className="font-heading text-base font-bold leading-none text-base-content md:text-xl"
							>
								{s.prefix ?? ""}0
							</div>
							<div className="mt-1 text-[8px] text-base-content/40 md:text-[9px]">
								{s.caption}
							</div>
						</div>
					))}
				</div>

				{/* Activity + chart */}
				<div className="grid grid-cols-[1.6fr_1fr] gap-2">
					{/* Activity feed */}
					<div className="rounded-lg bg-base-100 p-2 ring-1 ring-base-content/10 md:p-3">
						<div className="mb-2 flex items-center justify-between">
							<div className="text-[9px] font-bold uppercase tracking-wider text-base-content/60 md:text-[10px]">
								Recent activity
							</div>
							<div className="text-[8px] text-base-content/30 md:text-[9px]">
								Live
							</div>
						</div>
						<ul className="space-y-1.5">
							{ACTIVITY.map((a, i) => (
								<li
									key={i}
									data-activity
									className="flex items-center gap-2"
								>
									<span
										className={`flex-shrink-0 rounded px-1 py-px text-[7px] font-bold uppercase tracking-wider md:text-[8px] ${TAG_STYLES[a.tag]}`}
									>
										{a.tag}
									</span>
									<span className="truncate text-[9px] text-base-content/70 md:text-[10px]">
										{a.text}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* Growth chart */}
					<div className="relative rounded-lg bg-base-100 p-2 ring-1 ring-base-content/10 md:p-3">
						<div className="mb-1 flex items-center justify-between">
							<div className="text-[9px] font-bold uppercase tracking-wider text-base-content/60 md:text-[10px]">
								Growth
							</div>
							<div
								data-growth-label
								className="text-[10px] font-bold text-emerald-500 md:text-xs"
							>
								+412%
							</div>
						</div>
						<svg viewBox="0 0 140 50" className="h-12 w-full md:h-14">
							{/* Faint baseline grid */}
							<line
								x1="0"
								y1="48"
								x2="140"
								y2="48"
								stroke="currentColor"
								strokeOpacity="0.1"
								strokeWidth="0.5"
							/>
							<path
								data-growth-path
								d="M2 44 L22 40 L42 38 L62 30 L82 24 L102 16 L122 8 L138 4"
								fill="none"
								stroke="var(--color-primary)"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							{/* Area fill (decorative) */}
							<path
								d="M2 44 L22 40 L42 38 L62 30 L82 24 L102 16 L122 8 L138 4 L138 50 L2 50 Z"
								fill="var(--color-primary)"
								fillOpacity="0.08"
							/>
						</svg>
						<div className="mt-1 flex items-center justify-between text-[8px] text-base-content/40 md:text-[9px]">
							<span>Q1</span>
							<span>Q2</span>
							<span>Q3</span>
							<span>Q4</span>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
