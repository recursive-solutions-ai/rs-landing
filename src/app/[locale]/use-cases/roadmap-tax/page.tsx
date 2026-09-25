import { socialImageMetadata } from '@/lib/social-image'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildUrl } from '@/lib/sitemap-shared'
import { localizedPath } from '@/lib/i18n-utils'

const path = '/use-cases/roadmap-tax'
const title = 'Roadmap Tax: built to run without anyone chasing it | Recursive Solutions'
const description = 'A website rebuild, a five-day-a-week content engine, and client pipeline automation for Roadmap Tax Services. Google reviews went from 2 to 10, with 650+ automated steps and ~14 hours of reporting saved every month.'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	const social = socialImageMetadata(title)
	return {
		...social,
		title, description,
		alternates: { canonical: buildUrl(path, locale) },
		openGraph: { title, description, url: buildUrl(path, locale), type: 'article', ...social.openGraph, },
	}
}

const services = ['Tax strategy', 'S-Corp elections', 'Cost segregation', 'Retirement planning', 'Tax prep', 'Year-round planning']
const pipeline = [
	['Booked', 'A consultation booking creates the client record and starts onboarding.'],
	['Signed', 'A signed engagement letter updates the record and opens the next step.'],
	['Paid', 'Every payment drops a note in the CRM and closes its step. Failed payments get re-checked two days later, and only real failures go to the strategist.'],
	['Chased', 'Unpaid invoices and unsigned letters get re-sent every 48 hours. At 14 days a person gets flagged.'],
	['Reported', 'A morning snapshot every weekday, a Friday ops report and a monthly dashboard land in leadership’s inbox on their own. Two separate checks confirm the automations actually did their job. If a data source goes down, the report says so instead of showing a zero.'],
]
const results = [
	['Google reviews', '2 (2018–2019)', '10 (8 new, Jul–Aug 2026)'],
	['Average rating', '5.0', '5.0'],
	['New reviews with an owner reply', 'n/a', '8 of 8'],
	['Blog', 'Occasional generic news posts', '116 tax strategy articles'],
	['Automated steps per month', '0', '650+'],
]
const sectionClass = 'mx-auto max-w-7xl px-6 py-16 md:py-24 scroll-mt-24'
const eyebrow = 'text-xs font-bold uppercase tracking-[0.16em] text-primary'

export default async function RoadmapTaxPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	return (
		<article>
			<section className="mx-auto max-w-7xl px-6 pt-10 pb-12 md:pt-16 md:pb-16">
				<p className={eyebrow}>Use cases / Roadmap Tax</p>
				<div className="mt-7 max-w-4xl">
					<h1 className="font-display text-5xl leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">Built to run without<br />anyone chasing it.</h1>
					<p className="mt-6 max-w-2xl text-lg leading-relaxed text-base-content/75">A website rebuild, a content engine that publishes five days a week, and automation that moves a client from booked to signed to paid without anyone pushing each step.</p>
					<dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-base-300 pt-6 text-sm md:grid-cols-4">
						<div><dt className="text-base-content/65">Customer</dt><dd className="mt-1 font-semibold">Roadmap Tax Services</dd></div>
						<div><dt className="text-base-content/65">Location</dt><dd className="mt-1 font-semibold">San Diego, California</dd></div>
						<div><dt className="text-base-content/65">Business</dt><dd className="mt-1 font-semibold">Tax strategy firm for high earners and business owners</dd></div>
						<div><dt className="text-base-content/65">Scope</dt><dd className="mt-1 font-semibold">Website rebuild · Content engine · Client pipeline automation · Operations reporting</dd></div>
					</dl>
				</div>
			</section>

			<section aria-label="Results at a glance" className="bg-primary text-primary-content">
				<div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
					<div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
						<div><p className="font-display text-7xl leading-none">2 → 10</p><h2 className="mt-3 text-lg font-semibold">Google reviews</h2><p className="mt-2 text-sm">Two in the previous seven years, then eight in eight weeks. All 5 stars.</p></div>
						<div className="border-t border-primary-content/25 pt-7 md:border-t-0 md:border-l md:pl-10 md:pt-0"><p className="font-display text-6xl leading-none">650+</p><h2 className="mt-3 text-lg font-semibold">Automated steps every month</h2><p className="mt-2 text-sm">Notes logged, workflows advanced and follow-ups sent with no one touching them.</p></div>
						<div className="border-t border-primary-content/25 pt-7 md:border-t-0 md:border-l md:pl-10 md:pt-0"><p className="font-display text-6xl leading-none">~14 hrs</p><h2 className="mt-3 text-lg font-semibold">Reporting work saved</h2><p className="mt-2 text-sm">Off the team’s plate every month.</p></div>
					</div>
					<p className="mt-8 border-t border-primary-content/25 pt-5 text-sm leading-relaxed"><a href="#measured" className="underline underline-offset-4">How we measured</a></p>
				</div>
			</section>

			<nav aria-label="In this use case" className="border-b border-base-300">
				<div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4 text-sm">
					<span className="font-semibold text-base-content/65">In this story</span>
					{[['The starting point', 'starting-point'], ['The rebuild', 'rebuild'], ['The content loop', 'content-loop'], ['The operations layer', 'operations'], ['Results', 'results']].map(([label, id]) => <a key={id} href={`#${id}`} className="py-2 font-medium text-primary underline-offset-4 hover:underline">{label}</a>)}
				</div>
			</nav>

			<section aria-label="Customer testimonial" className="border-b border-base-300">
				<figure className="mx-auto max-w-7xl px-6 py-12 md:py-16">
					<p className={eyebrow}>In our customer’s words</p>
					<blockquote className="mt-5 font-display text-4xl leading-snug md:text-5xl lg:text-6xl">
						<p>“A fire and forget service.”</p>
					</blockquote>
					<figcaption className="mt-6 text-sm"><span className="font-semibold text-primary">Jesse Lipscomb</span><span className="text-base-content/65">, CEO, Roadmap Tax Services</span></figcaption>
				</figure>
			</section>

			<section id="starting-point" className={sectionClass}>
				<div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
					<div><p className={eyebrow}>The starting point</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">The expertise was there.<br />The systems weren’t.</h2></div>
					<div>
						<p className="text-lg leading-relaxed text-base-content/80">Roadmap had clients who’d stayed more than ten years and a team that knew advanced tax strategy cold. Online, you’d never know it. The firm had two Google reviews in seven years, and the blog ran generic marketing posts about whatever was in the news, with nothing on tax strategy. Behind the scenes, every handoff depended on someone remembering to update the CRM.</p>
						<div className="mt-7 border-l-2 border-secondary pl-5"><h3 className="font-semibold">Full disclosure</h3><p className="mt-2 text-base-content/75">I’m Roadmap’s COO. We built this for our own firm first, and we still run it every day.</p></div>
					</div>
				</div>
			</section>

			<section id="rebuild" className="scroll-mt-24 bg-base-200">
				<div className={sectionClass}>
					<p className={eyebrow}>The rebuild</p><h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">From “good reputation” to<br />“easy to find and easy to book.”</h2>
					<div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
						<div className="space-y-8">
							<div>
								<h3 className="font-display text-2xl">Six service pages</h3>
								<ul className="mt-4 flex flex-wrap gap-2">{services.map(s => <li key={s} className="rounded-full border border-base-300 bg-base-100 px-4 py-1.5 text-sm">{s}</li>)}</ul>
							</div>
							<div><h3 className="font-display text-2xl">One clear next step</h3><p className="mt-3 max-w-2xl leading-relaxed text-base-content/75">Every page leads to a paid Tax Strategy Consultation.</p></div>
							<div><h3 className="font-display text-2xl">A blog about the actual work</h3><p className="mt-3 max-w-2xl leading-relaxed text-base-content/75">A blog rebuilt around what Roadmap actually does.</p></div>
						</div>
						<aside className="self-start rounded-lg bg-base-100 p-7 md:p-9"><p className={eyebrow}>Built to keep evolving</p><h3 className="mt-4 font-display text-3xl">One website.<br />An ongoing operation.</h3><Link href={localizedPath('/lucy', locale)} className="mt-6 inline-block py-2 font-semibold text-primary underline underline-offset-4">Explore Lucy →</Link></aside>
					</div>
					<figure className="mt-12">
						<a href="/use-cases/roadmap-tax/website-after.webp" target="_blank" rel="noopener noreferrer" aria-label="View the rebuilt Roadmap Tax homepage screenshot full size (opens in a new tab)" className="group block overflow-hidden rounded-lg border border-base-300 bg-base-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
							<Image src="/use-cases/roadmap-tax/website-after.webp" alt="Rebuilt Roadmap Tax homepage with the headline Keep more of what you earn. Every year., a Book your strategy call button, and a tax savings estimator" width={1400} height={950} sizes="(max-width: 1279px) 100vw, 1216px" className="h-auto w-full" />
							<span className="block border-t border-base-300 px-4 py-3 text-sm font-semibold text-primary group-hover:underline">View full-size screenshot <span aria-hidden="true">↗</span></span>
						</a>
						<figcaption className="mt-4 text-sm leading-relaxed text-base-content/75">The rebuilt homepage: a clear promise for high earners, a savings estimator, and one next step, a strategy call. Captured September 22, 2026. <a href="https://www.roadmaptax.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Visit Roadmap Tax<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a></figcaption>
					</figure>
				</div>
			</section>

			<section id="content-loop" className={sectionClass}>
				<div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
					<div><p className={eyebrow}>The content loop</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Show up where<br />high earners are looking.</h2><p className="mt-8 font-display text-6xl text-primary">116</p><p className="mt-2 font-semibold">tax strategy articles since the relaunch</p></div>
					<ol className="space-y-7">
						{[['Publish five days a week', 'A new article five days a week on real questions: RSUs, moving out of California, cost segregation, S-Corp timing. That’s 116 since the relaunch.'], ['Reuse every article', 'Each week’s newest article becomes a Google Business Profile post, and the same content feeds LinkedIn.'], ['Ask for the review', 'Clients get an automatic review request. That’s what took the profile from 2 reviews to 10.']].map(([heading, body], i) => <li key={heading} className="flex gap-5"><span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-base-300 text-sm font-semibold text-primary" aria-hidden="true">{i + 1}</span><div><h3 className="text-lg font-semibold">{heading}</h3><p className="mt-2 leading-relaxed text-base-content/75">{body}</p></div></li>)}
					</ol>
				</div>
			</section>

			<section id="operations" className="scroll-mt-24 border-t border-base-300 bg-base-200">
				<div className={sectionClass}>
					<p className={eyebrow}>The operations layer</p>
					<h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">The follow-up happens whether<br />anyone remembers or not.</h2>
					<ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
						{pipeline.map(([stage, body], i) => <li key={stage} className="rounded-lg border border-base-300 bg-base-100 p-6"><p className="text-sm font-semibold text-base-content/50">0{i + 1}</p><h3 className="mt-2 font-display text-2xl">{stage}</h3><p className="mt-3 text-sm leading-relaxed text-base-content/75">{body}</p></li>)}
					</ol>
				</div>
			</section>

			<section id="results" className={sectionClass}>
				<p className={eyebrow}>Results</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">A reputation that finally<br />shows up online.</h2>
				<div className="mt-9 overflow-x-auto rounded-lg border border-base-300 bg-base-100">
					<table className="w-full text-left text-sm md:text-base"><thead><tr className="border-b border-base-300 text-base-content/65"><th scope="col" className="p-5 font-medium">Metric</th><th scope="col" className="p-5 font-medium">Before</th><th scope="col" className="p-5 font-medium">After</th></tr></thead><tbody>{results.map(([metric, before, after]) => <tr key={metric} className="border-b border-base-200 last:border-0"><th scope="row" className="p-5 font-medium">{metric}</th><td className="p-5 tabular-nums">{before}</td><td className="p-5 font-semibold tabular-nums">{after}</td></tr>)}</tbody></table>
				</div>
				<div className="mt-12 border-t border-base-300 pt-10">
					<p className={eyebrow}>Search visibility · Last 90 days vs. the 90 before</p>
					<h3 className="mt-3 font-display text-3xl">The content is starting to get found.</h3>
					<p className="mt-3 max-w-3xl leading-relaxed text-base-content/75">Google Search Console for roadmaptax.com, 90 days to September 19, 2026, compared with the 90 days before. Early numbers from a small base, but moving the right way.</p>
					<dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
						{[['Search impressions', '478 → 1,747', '3.7×'], ['Search clicks', '26 → 75', '2.9×'], ['Average position', '39.1 → 32.7', '6.4 places higher'], ['Queries in the top 10', '88', '34 of them in the top 3']].map(([label, value, note]) => <div key={label} className="border-t border-base-300 pt-5"><dt className="font-semibold">{label}</dt><dd className="mt-3 font-display text-3xl md:text-4xl">{value}</dd><dd className="mt-2 text-sm font-semibold text-primary">{note}</dd></div>)}
					</dl>
				</div>
				<details id="measured" className="mt-10 scroll-mt-24 rounded-lg border border-base-300 bg-base-100 px-6 py-4"><summary className="cursor-pointer py-2 font-semibold">How we measured</summary><p className="mt-4 max-w-3xl pb-3 text-sm leading-relaxed text-base-content/75">Review counts come from Roadmap’s Google Business Profile, and the article count from the live blog, both checked September 22, 2026. Automated steps are August 2026 task counts from Roadmap’s Zapier account. Reporting hours are the number of report runs times the time each report took to build by hand. Search figures come from Google Search Console via Lucy, read September 22, 2026, with data through September 19. They cover every query without filters; the top-10 count is out of 419 queries the site appeared for. Average position is averaged across all those queries, so it isn't a ranking for any single keyword.</p></details>
			</section>

			<section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border-t border-base-300 px-6 py-16 md:flex-row md:items-center md:py-20"><h2 className="font-display text-3xl md:text-4xl">What could your firm run on autopilot?</h2><Link href={`${localizedPath('/', locale)}#contact`} className="btn btn-primary h-auto min-h-12 shrink-0 px-7 py-3">Talk about your operations <span aria-hidden="true">→</span></Link></section>
		</article>
	)
}
