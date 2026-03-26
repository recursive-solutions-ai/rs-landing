import {
	faCode,
	faBullhorn,
	faChartLine,
	faRobot,
	faMagnifyingGlass,
	faPenRuler,
	faGears,
	faRocket,
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

export interface CaseStudy {
	id: string
	title: string
	category: string
	description: string
	image: string
	href: string
	span?: "wide" | "tall"
}

export interface Testimonial {
	quote: string
	author: string
	role: string
	company: string
}

export const services: ServiceItem[] = [
	{
		id: "web-dev",
		icon: faCode,
		title: "Website Development",
		description:
			"AI-powered websites that adapt, personalize, and convert. We build modern web experiences that work harder than a static page ever could.",
		href: "#contact",
	},
	{
		id: "marketing",
		icon: faBullhorn,
		title: "Marketing & SEO",
		description:
			"From content generation to search optimization, we deploy AI tools that amplify your marketing team and put you in front of the right audience.",
		href: "#contact",
	},
	{
		id: "sales",
		icon: faChartLine,
		title: "Sales Workflows",
		description:
			"Automate lead scoring, follow-ups, and pipeline management. Your sales team closes deals while AI handles the busy work.",
		href: "#contact",
	},
	{
		id: "consulting",
		icon: faRobot,
		title: "AI Consulting",
		description:
			"Not sure where AI fits in your business? We audit your workflows, identify opportunities, and build a roadmap tailored to your goals.",
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

export const caseStudies: CaseStudy[] = [
	{
		id: "case-1",
		title: "Intelligent Lead Scoring",
		category: "Sales Automation",
		description:
			"Stop chasing cold leads. AI qualifies and ranks every inbound prospect in real time so your sales team only works the deals most likely to close.",
		image: "/landing/scoring.jpeg",
		href: "#",
		span: "wide",
	},
	{
		id: "case-6",
		title: "AI-Powered Workflows",
		category: "AI Consulting",
		description:
			"From meeting prep to email triage to task prioritization — we plug AI into the workflows your team already uses, so everything just runs faster.",
		image: "/landing/workflows.jpeg",
		href: "#",
	},
	{
		id: "case-3",
		title: "Smart Document Generation",
		category: "Workflow Automation",
		description:
			"Proposals, reports, contracts — generated from your data in seconds. No more copy-paste marathons or formatting headaches.",
		image: "/landing/doc.jpeg",
		href: "#",
		span: "tall",
	},
	{
		id: "case-4",
		title: "AI Support Agent",
		category: "Customer Experience",
		description:
			"A 24/7 conversational assistant that resolves common questions instantly and only escalates to your team when it actually matters.",
		image: "/landing/support.jpeg",
		href: "#",
	},
	{
		id: "case-2",
		title: "Multilingual Content Engine",
		category: "Content & Localization",
		description:
			"Translate and localize blog posts, emails, and product pages across languages — in minutes instead of weeks.",
		image: "/landing/globe.jpeg",
		href: "#",
	},
	{
		id: "case-5",
		title: "Predictive Analytics Dashboard",
		category: "Data & Insights",
		description:
			"Turn raw business data into live dashboards that spot trends, surface anomalies, and recommend what to do next.",
		image: "/landing/dashboard.jpeg",
		href: "#",
		span: "wide",
	},
]

export const testimonials: Testimonial[] = [
	{
		quote: "We didn't know how much we were missing until our systems started talking to each other. Recursive gave us our Saturdays back.",
		author: "David Marshall",
		role: "Director",
		company: "Marshall Real Estate",
	},
]
