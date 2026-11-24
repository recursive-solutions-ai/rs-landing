import { socialImageMetadata } from '@/lib/social-image'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildUrl } from '@/lib/sitemap-shared'
import { localizedPath } from '@/lib/i18n-utils'
import VillageMap from '@/components/how-lucy-works/VillageMap'
import LoopSection from '@/components/how-lucy-works/LoopSection'
import WeekSchedule from '@/components/how-lucy-works/WeekSchedule'
import CompoundingChart from '@/components/how-lucy-works/CompoundingChart'
import SectionNav from '@/components/how-lucy-works/SectionNav'
import Reveal from '@/components/how-lucy-works/Reveal'
import { closing, districts, hero, underTheHood, yourWeek } from '@/components/how-lucy-works/content'
import '@/components/how-lucy-works/how-lucy-works.css'

const path = '/how-lucy-works'
const title = 'How Lucy works'
const description =
	'See what Lucy does every week behind the scenes: site checks, SEO and AI-search content, social, lead follow-up and customer care, with you in control.'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	const social = socialImageMetadata(title)
	return {
		...social,
		title,
		description,
		alternates: { canonical: buildUrl(path, locale) },
		openGraph: { title, description, url: buildUrl(path, locale), type: 'website', ...social.openGraph },
		robots: { index: false, follow: false },
	}
}

export default async function HowLucyWorksPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const breadcrumb = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Recursive Solutions', item: buildUrl('', locale) },
			{ '@type': 'ListItem', position: 2, name: title, item: buildUrl(path, locale) },
		],
	}
	return (
		<div className="hlw-root">
			<JsonLd data={breadcrumb} />

			<header className="hlw-hero">
				<div className="hlw-stars" aria-hidden="true" />
				<div className="hlw-hero-glow" aria-hidden="true" />
				<div className="hlw-container hlw-hero-inner">
					<p className="hlw-eyebrow" style={{ '--hlw-accent': '#8ea2ff' } as CSSProperties}>
						{hero.eyebrow}
					</p>
					<h1 className="hlw-h1 font-display">{hero.title}</h1>
					<p className="hlw-lead">{hero.lead}</p>
					<div className="hlw-map">
						<VillageMap />
					</div>
				</div>
			</header>

			<section className="hlw-stats" aria-label="Under the hood">
				<div className="hlw-container">
					<ul role="list" className="hlw-stats-grid">
						{underTheHood.map(([value, label]) => (
							<li key={label} className="hlw-stat">
								<span className="hlw-stat-value font-display">{value}</span>
								<span className="hlw-stat-label">{label}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			<div className="hlw-town">
				<SectionNav />
				{districts.map((d, i) => (
					<LoopSection key={d.id} district={d} reversed={i % 2 === 1} alt={i % 2 === 1} showRoad />
				))}
				<WeekSchedule />
				<CompoundingChart />

				<section id="your-part" aria-labelledby="your-part-title" className="hlw-section hlw-yours" style={{ '--hlw-accent': '#8ea2ff' } as CSSProperties}>
					<div className="hlw-container">
						<Reveal>
							<p className="hlw-eyebrow">{yourWeek.eyebrow}</p>
							<h2 id="your-part-title" className="hlw-h2 font-display">
								{yourWeek.headline}
							</h2>
							<p className="hlw-body hlw-sub">{yourWeek.lead}</p>
						</Reveal>
						<ol role="list" className="hlw-yours-grid">
							{yourWeek.items.map(([name, text], i) => (
								<Reveal as="li" key={name} className="hlw-yours-card" delay={i * 80}>
									<span className="hlw-yours-num font-display" aria-hidden="true">
										{String(i + 1).padStart(2, '0')}
									</span>
									<h3 className="hlw-yours-title font-display">{name}</h3>
									<p>{text}</p>
								</Reveal>
							))}
						</ol>
					</div>
				</section>

				<section aria-labelledby="closing-title" className="hlw-section hlw-alt hlw-closing" style={{ '--hlw-accent': '#8ea2ff' } as CSSProperties}>
					<div className="hlw-stars hlw-stars-soft" aria-hidden="true" />
					<Reveal className="hlw-container hlw-closing-inner">
						<h2 id="closing-title" className="hlw-h2 font-display">
							{closing.headline}
						</h2>
						<p className="hlw-body">{closing.body}</p>
						<Link href={localizedPath('/contact', locale)} className="hlw-cta">
							{closing.cta} <span aria-hidden="true">→</span>
						</Link>
					</Reveal>
				</section>
			</div>
		</div>
	)
}
