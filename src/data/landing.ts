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
		description: "We sit down with you, learn how your business actually runs, and find the friction points where AI can make the biggest impact.",
		icon: faMagnifyingGlass,
	},
	{
		step: 2,
		title: "Design",
		description: "We map the right solution — the tools, the integrations, and the approach — tailored to your operation, not off a shelf.",
		icon: faPenRuler,
	},
	{
		step: 3,
		title: "Build",
		description: "We develop and deploy your AI solution, integrating it into your existing workflows so your team can hit the ground running.",
		icon: faGears,
	},
	{
		step: 4,
		title: "Optimize",
		description: "We monitor, refine, and evolve your systems as your business grows. Always improving.",
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
