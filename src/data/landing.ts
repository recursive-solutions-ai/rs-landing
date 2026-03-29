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
			"We audit your workflows, identify high-impact AI opportunities, and deliver a prioritized roadmap so you know exactly where to start.",
		href: "#contact",
	},
	{
		id: "advisory",
		icon: faComments,
		title: "AI Advisory",
		description:
			"Ongoing strategic guidance — monthly sessions to help you evaluate, adopt, and manage AI across your business.",
		href: "#contact",
	},
	{
		id: "custom-builds",
		icon: faCode,
		title: "Custom AI Builds",
		description:
			"Bespoke AI development — we design and build custom systems tailored to your specific workflows and goals.",
		href: "#contact",
	},
	{
		id: "agent-deployment",
		icon: faRobot,
		title: "Dedicated Agent Deployment",
		description:
			"Managed AI agents embedded in your operations — we deploy, monitor, and optimize agents that work alongside your team.",
		href: "#contact",
	},
]

export const processSteps: ProcessStep[] = [
	{
		step: 1,
		title: "Audit",
		description: "We map your current workflows and find the friction points where AI can make the biggest impact.",
		icon: faMagnifyingGlass,
	},
	{
		step: 2,
		title: "Design",
		description: "We architect the solution — choosing the right tools, integrations, and AI models for your needs.",
		icon: faPenRuler,
	},
	{
		step: 3,
		title: "Implement",
		description: "We build and deploy your custom AI systems, integrating seamlessly with your existing stack.",
		icon: faGears,
	},
	{
		step: 4,
		title: "Optimize",
		description: "We monitor, refine, and evolve your systems as your business grows and AI capabilities advance.",
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
			"Dashboards and alerts that turn your raw business data into decisions. Spot trends, surface anomalies, act faster.",
	},
	{
		id: "outcome-4",
		title: "Content & Communication",
		category: "Marketing",
		description:
			"AI-assisted content creation, translation, and personalized outreach — at the speed your market demands.",
	},
]

export const team: TeamMember[] = [
	{
		image: "/jake.jpg",
		name: "Jake",
		role: "CEO & Strategy",
		bio: "Experienced operator with a background in business strategy and technology adoption for growing companies.",
		initials: "J",
	},
	{
		image: "/luc.jpg",
		name: "Luc",
		role: "COO & Operations",
		bio: "Operations expert focused on turning complex AI capabilities into practical business tools.",
		initials: "L",
	},
	{
		image: "/denis.jpg",
		name: "Denis",
		role: "CTO & AI Architecture",
		bio: "AI architect and developer with a passion for building intelligent systems that solve real business problems.",
		initials: "D",
	},
]
