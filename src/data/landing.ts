import {
	faCode,
	faRobot,
	faMagnifyingGlass,
	faPenRuler,
	faGears,
	faRocket,
	faClipboardList,
	faComments,
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
		description: "We find the friction points in your daily operation where AI moves the needle most. No guesswork.",
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
		title: "Build",
		description: "We deploy your AI engine and integrate it directly into your existing workflow. We handle the plumbing.",
		icon: faGears,
	},
	{
		step: 4,
		title: "Optimize",
		description: "We monitor and refine your system to ensure it keeps getting better as you grow. AI that learns your business.",
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
			"24/7 intelligent agents for customer support, internal ops, or data processing — working alongside your team, not replacing it.",
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
			"AI-assisted content creation, translation, and personalized outreach — so your team produces more without burning out.",
	},
]

export const proofStats: ProofStat[] = [
	{ value: "25%", label: "More leads closed", accent: "primary" },
	{ value: "15h", label: "Admin saved/week", accent: "accent" },
]

export const testimonials: Testimonial[] = [
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
	{
		quote:
			"I knew we had inefficiencies. I just didn't know where. Recursive delivered us a blueprint with a clear diagnosis of how our business actually runs, a prioritized roadmap, and a team that could execute it. No fluff, just results.",
		name: "Founder",
		role: "Strategy Engagement",
		initials: "FD",
		accent: "primary",
	},
]

export const team: TeamMember[] = [
	{
		image: "/jake.jpg",
		name: "Jake",
		role: "CEO & Strategy",
		bio: "Built and scaled a tax advisory firm from the ground up. Now helps service businesses do what he did — use AI to grow smarter, not just bigger.",
		initials: "J",
	},
	{
		image: "/luc.jpg",
		name: "Luc",
		role: "COO & Operations",
		bio: "Spent his career making businesses run better. Obsessed with turning complex AI capabilities into simple, practical tools that teams actually use.",
		initials: "L",
	},
	{
		image: "/denis.jpg",
		name: "Denis",
		role: "CTO & AI Architecture",
		bio: "The builder. Designs and develops the AI systems that power everything we deliver — custom-built for real businesses, not theoretical use cases.",
		initials: "D",
	},
]
