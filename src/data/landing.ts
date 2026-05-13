import {
	faCode,
	faRobot,
	faMagnifyingGlass,
	faPenRuler,
	faGears,
	faRocket,
	faClipboardList,
	faComments,
	faChartLine,
	faPenNib,
	faMagnet,
	faHandshake,
	faBolt,
} from "@fortawesome/free-solid-svg-icons"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface ServiceItem {
	id: string
	icon: IconDefinition
	title: string
	description: string
	href: string
}

export interface ProcessStep {
	step: number
	title: string
	description: string
	icon: IconDefinition
}

export interface OutcomeItem {
	id: string
	title: string
	category: string
	description: string
}

export interface Testimonial {
	quote: string
	name: string
	role: string
	initials: string
	accent: "primary" | "accent" | "neutral"
}

export interface ProofStat {
	value: string
	label: string
	accent: "primary" | "accent" | "neutral"
}

export interface FeaturePillarBullet {
	icon: IconDefinition
	label: string
	sub: string
}

export interface FeaturePillar {
	num: string
	eyebrow: string
	headline: string
	promise: string
	bullets: FeaturePillarBullet[]
	visual: "attract" | "engage" | "capture" | "close" | "optimize"
	icon: IconDefinition
}

export interface TeamMember {
	name: string
	role: string
	bio: string
	initials: string
	image?: string
}

export const services: ServiceItem[] = [
	{
		id: "assessment",
		icon: faClipboardList,
		title: "AI Opportunity Assessment",
		description:
			"We get under the hood of your business — your workflows, your bottlenecks, your goals. You walk away with a clear, prioritized roadmap built around what actually matters to your operation.",
		href: "#contact",
	},
	{
		id: "advisory",
		icon: faComments,
		title: "AI Advisory",
		description:
			"For businesses that want a partner in their corner as they navigate AI adoption. We help you evaluate, plan, and stay ahead — month by month.",
		href: "#contact",
	},
	{
		id: "custom-builds",
		icon: faCode,
		title: "Custom AI Builds",
		description:
			"When the roadmap calls for something built specifically for you. Designed around your workflows, delivered to your team.",
		href: "#contact",
	},
	{
		id: "agent-deployment",
		icon: faRobot,
		title: "Dedicated Agent Deployment",
		description:
			"A managed AI agent embedded in your operations — we deploy it, monitor it, and optimize it so it keeps getting better.",
		href: "#contact",
	},
]

export const processSteps: ProcessStep[] = [
	{
		step: 1,
		title: "Discover",
		description: "We find the friction points in your daily operation where AI moves the needle most.",
		icon: faMagnifyingGlass,
	},
	{
		step: 2,
		title: "Design",
		description: "We architect a custom solution tailored to your team's specific tools and habits. A custom wiring diagram for growth.",
		icon: faPenRuler,
	},
	{
		step: 3,
		title: "Execute",
		description: "We deploy your AI engine and integrate it directly into your existing workflow.",
		icon: faGears,
	},
	{
		step: 4,
		title: "Optimize",
		description: "We monitor and refine your system to ensure it keeps getting better as you grow.",
		icon: faRocket,
	},
]

export const outcomes: OutcomeItem[] = [
	{
		id: "outcome-1",
		title: "Workflow Automation",
		category: "Operations",
		description:
			"Eliminate repetitive tasks across sales, ops, and admin. Free your team to focus on the work that actually moves the needle.",
	},
	{
		id: "outcome-2",
		title: "AI Agent Deployment",
		category: "Customer Experience",
		description:
			"24/7 intelligent agents for customer support, internal ops, or data processing. Working alongside your team, not replacing it.",
	},
	{
		id: "outcome-3",
		title: "Operational Intelligence",
		category: "Data & Insights",
		description:
			"Dashboards and alerts that turn raw business data into decisions. Spot trends, surface anomalies, act faster.",
	},
	{
		id: "outcome-4",
		title: "Content & Communication",
		category: "Marketing",
		description:
			"AI-assisted content creation, translation, and personalized outreach, so your team produces more without burning out.",
	},
]

export const proofStats: ProofStat[] = [
	{ value: "25%", label: "More leads closed", accent: "primary" },
	{ value: "15h", label: "Admin saved/week", accent: "accent" },
]

export const testimonials: Testimonial[] = [
	{
		quote:
			"I knew we had inefficiencies. I just didn't know where. Recursive delivered us a blueprint with a clear diagnosis of how our business actually runs, a prioritized roadmap, and a team that could execute it. No fluff, just results.",
		name: "Founder",
		role: "Strategy Engagement",
		initials: "FD",
		accent: "primary",
	},
	{
		quote:
			"We were making decisions off gut instinct and reports that were already stale. Recursive built us a live KPI dashboard that updates automatically every month. Now I walk into every leadership meeting knowing exactly where we stand. It changed how we run the company.",
		name: "CEO",
		role: "Leadership Team",
		initials: "CE",
		accent: "primary",
	},
	{
		quote:
			"We needed to move our entire client base to a new billing model without losing revenue or relationships. Recursive built the migration system that made it possible. What would have taken months of manual work got done in weeks. Smoother than I ever expected.",
		name: "Operations Lead",
		role: "Client Migration",
		initials: "OL",
		accent: "accent",
	},
	{
		quote:
			"Our team was spending hours on tasks that should have taken minutes. Recursive came in, built AI tools directly into how our team works, and the difference showed up fast. Not in a report, but in how our people actually operate every day.",
		name: "Team Director",
		role: "Operations",
		initials: "TD",
		accent: "neutral",
	},

]

export const featurePillars: FeaturePillar[] = [
	{
		num: "01",
		eyebrow: "Attract",
		headline: "Be found. Built to convert.",
		promise:
			"A site engineered to rank, get cited by AI, and turn traffic into leads.",
		icon: faChartLine,
		visual: "attract",
		bullets: [
			{
				icon: faPenRuler,
				label: "Conversion-first design",
				sub: "Pages built around how your customers buy.",
			},
			{
				icon: faMagnifyingGlass,
				label: "Search-ready SEO",
				sub: "Every page ships optimized.",
			},
			{
				icon: faRobot,
				label: "Generative Engine Optimization",
				sub: "Cited by ChatGPT, Gemini, and Perplexity.",
			},
		],
	},
	{
		num: "02",
		eyebrow: "Engage",
		headline: "Publish every day, not every quarter.",
		promise:
			"AI Experts trained on your business write the blog and run your social.",
		icon: faPenNib,
		visual: "engage",
		bullets: [
			{
				icon: faPenNib,
				label: "AI-written blog posts",
				sub: "Scheduled, optimized, on-brand.",
			},
			{
				icon: faComments,
				label: "Multi-platform social",
				sub: "One idea. Every channel.",
			},
			{
				icon: faRobot,
				label: "Custom AI Experts",
				sub: "Trained on your knowledge, not the open web.",
			},
		],
	},
	{
		num: "03",
		eyebrow: "Capture",
		headline: "Turn visitors into leads.",
		promise:
			"Every form, asset, and outreach drops straight into your pipeline.",
		icon: faMagnet,
		visual: "capture",
		bullets: [
			{
				icon: faMagnet,
				label: "Embeddable forms",
				sub: "Drop in anywhere. Lands in your CRM.",
			},
			{
				icon: faMagnifyingGlass,
				label: "Lead finder",
				sub: "Outbound that surfaces fit accounts.",
			},
			{
				icon: faClipboardList,
				label: "Gated assets",
				sub: "Files become qualified opt-ins.",
			},
		],
	},
	{
		num: "04",
		eyebrow: "Convert",
		headline: "Leads land. Replies go out. Instantly.",
		promise:
			"Every form submission routes straight to your inbox with an auto-reply firing in seconds.",
		icon: faHandshake,
		visual: "close",
		bullets: [
			{
				icon: faHandshake,
				label: "Auto-routing",
				sub: "Lead lands straight in your CRM.",
			},
			{
				icon: faBolt,
				label: "Instant response",
				sub: "Auto-reply fires in seconds.",
			},
			{
				icon: faClipboardList,
				label: "Full lead context",
				sub: "Every field captured and stored.",
			},
		],
	},
	{
		num: "05",
		eyebrow: "Optimize",
		headline: "Reclaim your team's time.",
		promise:
			"Lucy automates the repetitive work so your team can do what only humans can.",
		icon: faBolt,
		visual: "optimize",
		bullets: [
			{
				icon: faGears,
				label: "Workflow automation",
				sub: "Cut the manual handoffs.",
			},
			{
				icon: faBolt,
				label: "Always-on optimization",
				sub: "Gets better every run.",
			},
			{
				icon: faRocket,
				label: "Hours saved weekly",
				sub: "Reinvest in growth, not admin.",
			},
		],
	},
]

export const team: TeamMember[] = [
	{
		image: "/jake.jpg",
		name: "Jake",
		role: "CEO & Strategy",
		bio: "Seven years in MARSOC as a Special Operations medic taught one discipline: understand what is actually broken before you act. That approach now guides every Recursive Solutions engagement. Jake works directly with founders and CEOs to identify where the business is losing margin and owner time, then defines the most effective intervention before any technology is recommended.",
		initials: "J",
	},
	{
		image: "/luc.jpg",
		name: "Luc",
		role: "COO & Operations",
		bio: "Spent his career making businesses run better. Focused on turning complex AI capabilities into simple, practical tools that teams actually use.",
		initials: "L",
	},
	{
		image: "/denis.jpg",
		name: "Denis",
		role: "CTO & AI Architecture",
		bio: "The builder. Designs and develops the AI systems that power everything we deliver, custom-built for real businesses, not theoretical use cases.",
		initials: "D",
	},
]
