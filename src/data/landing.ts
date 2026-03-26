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
		title: "AI-Powered Lead Qualification",
		category: "Sales Automation",
		description: "Reduced manual lead scoring by 85% for a B2B SaaS company.",
		image: "/images/landing/cases/case-1.jpg",
		href: "#",
		span: "wide",
	},
	{
		id: "case-2",
		title: "Multilingual Content Engine",
		category: "Marketing",
		description: "Automated content localization across 12 languages.",
		image: "/images/landing/cases/case-2.jpg",
		href: "#",
	},
	{
		id: "case-3",
		title: "Smart Document Generation",
		category: "Internal Workflows",
		description: "Automated proposal creation saving 20+ hours per week.",
		image: "/images/landing/cases/case-3.jpg",
		href: "#",
		span: "tall",
	},
	{
		id: "case-4",
		title: "Conversational Support Bot",
		category: "Customer Experience",
		description: "24/7 AI support handling 70% of tickets autonomously.",
		image: "/images/landing/cases/case-4.jpg",
		href: "#",
	},
	{
		id: "case-5",
		title: "Predictive Analytics Dashboard",
		category: "Data & Insights",
		description: "Real-time business intelligence powered by machine learning.",
		image: "/images/landing/cases/case-5.jpg",
		href: "#",
		span: "wide",
	},
	{
		id: "case-6",
		title: "E-commerce Personalization",
		category: "Web Development",
		description: "Dynamic product recommendations that increased conversion by 34%.",
		image: "/images/landing/cases/case-6.jpg",
		href: "#",
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
