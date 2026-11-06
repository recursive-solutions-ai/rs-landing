import { socialImageMetadata } from '@/lib/social-image'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildUrl } from '@/lib/sitemap-shared'
import { localizedPath } from '@/lib/i18n-utils'

const path = '/use-cases/livecase'
const title = 'LiveCase: a blog that gets found by Google and AI assistants | Recursive Solutions'
const description = 'LiveCase moved its blog onto Recursive Solutions’ Growth Engine. Blog clicks from Google per day went from 5.0 to 11.4 (2.3×), and visits from AI assistants from 8 to 43.'

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

const languages = ['English', 'Spanish', 'French', 'Portuguese']
const engine = [
	['Generate', 'Posts written for LiveCase’s subject matter and audience of educators and MBA programs.'],
	['Translate', 'Every post is translated into Spanish, French and Portuguese, so the blog reaches educators in their own language.'],
	['Index', 'New pages are submitted and tracked so Google knows they exist.'],
	['Monitor', 'Search Console and analytics are watched continuously, so a page that stalls or breaks gets noticed.'],
	['Improve', 'Existing posts are refined over time, and what the data shows shapes what gets written next.'],
]
const results = [
	['Blog clicks from Google, per day', '5.0', '11.4 (2.3×)'],
	['Blog impressions, per day', '651', '1,058 (+63%)'],
	['Blog click rate', '0.77%', '1.08%'],
	['Blog share of all site clicks from Google', '38%', '52%'],
	['Whole-site Google clicks, per day', '13.1', '21.8 (+67%)'],
	['Pages indexed by Google', '78', '127'],
	['Unpaid search visits (GA4)', '279', '801 (+187%)'],
	['Visits from AI assistants', '8', '43 (5×)'],
]
const aiChecks = [['Perplexity', '27 of 50'], ['ChatGPT', '15 of 45'], ['Google AI Mode', '16 of 50'], ['Google AI Overview', '16 of 50']]
const topPosts = [
	['A Simple Technique To Deter Cheating With AI', '263 clicks · 17k impressions · average position 7.9'],
	['5 AI Education Tools Transforming Higher Education', '79 clicks · average position 6.2'],
	['7 Best Business Simulation Platforms in 2026', '12.9k impressions'],
]
const sectionClass = 'mx-auto max-w-7xl px-6 py-16 md:py-24 scroll-mt-24'
const eyebrow = 'text-xs font-bold uppercase tracking-[0.16em] text-primary'

export default async function LiveCasePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	return (
		<article>
			<section className="mx-auto max-w-7xl px-6 pt-10 pb-12 md:pt-16 md:pb-16">
				<p className={eyebrow}>Use cases / LiveCase</p>
				<div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
					<div>
					<h1 className="max-w-3xl font-display text-5xl leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">A blog that<br />gets found,<br />in four languages.</h1>
					<p className="mt-6 max-w-xl text-lg leading-relaxed text-base-content/75">LiveCase moved its blog onto our Growth Engine, Lucy. Posts are written, translated, indexed, monitored and improved on a loop, and Google clicks to the blog have more than doubled.</p>
					<dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-base-300 pt-6 text-sm">
						<div><dt className="text-base-content/65">Customer</dt><dd className="mt-1 font-semibold">LiveCase</dd></div>
						<div><dt className="text-base-content/65">Website</dt><dd className="mt-1 font-semibold"><a href="https://www.livecase.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">livecase.com<span className="sr-only"> (opens in a new tab)</span></a></dd></div>
						<div><dt className="text-base-content/65">Business</dt><dd className="mt-1 font-semibold">AI business simulations and case studies for higher-education and MBA educators</dd></div>
						<div><dt className="text-base-content/65">Scope</dt><dd className="mt-1 font-semibold">Blog content · Translations (ES, FR, PT) · Indexing · Monitoring · Continuous improvement</dd></div>
					</dl>
					</div>
					<figure className="w-full">
						<div className="overflow-hidden rounded-lg border border-base-300 bg-base-200 shadow-sm">
							<Image src="/use-cases/livecase/website-home.webp" alt="LiveCase homepage with the headline Where theory meets practice and a preview of an AI simulation with graded feedback" width={1600} height={1000} priority sizes="(max-width: 1023px) 100vw, 45vw" className="h-auto w-full" />
						</div>
						<figcaption className="mt-3 text-sm text-base-content/65">The LiveCase homepage: AI business simulations for educators.</figcaption>
					</figure>
				</div>
			</section>

			<section aria-label="Results at a glance" className="bg-primary text-primary-content">
				<div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
					<div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
						<div><p className="font-display text-7xl leading-none">2.3×</p><h2 className="mt-3 text-lg font-semibold">Blog clicks from Google</h2><p className="mt-2 text-sm">5.0 → 11.4 a day, comparing the 90 days before and after August 7, 2026.</p></div>
						<div className="border-t border-primary-content/25 pt-7 md:border-t-0 md:border-l md:pl-10 md:pt-0"><p className="font-display text-6xl leading-none">5×</p><h2 className="mt-3 text-lg font-semibold">Visits from AI assistants</h2><p className="mt-2 text-sm">8 → 43 over the same two windows.</p></div>
						<div className="border-t border-primary-content/25 pt-7 md:border-t-0 md:border-l md:pl-10 md:pt-0"><p className="font-display text-6xl leading-none">38%</p><h2 className="mt-3 text-lg font-semibold">Mentioned by AI assistants</h2><p className="mt-2 text-sm">LiveCase appeared in 74 of 195 answers we checked.</p></div>
					</div>
					<p className="mt-8 border-t border-primary-content/25 pt-5 text-sm leading-relaxed"><a href="#measured" className="underline underline-offset-4">How we measured</a></p>
				</div>
			</section>

			<nav aria-label="In this use case" className="border-b border-base-300">
				<div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4 text-sm">
					<span className="font-semibold text-base-content/65">In this story</span>
					{[['The starting point', 'starting-point'], ['The Growth Engine', 'engine'], ['Four languages', 'languages'], ['Results', 'results']].map(([label, id]) => <a key={id} href={`#${id}`} className="py-2 font-medium text-primary underline-offset-4 hover:underline">{label}</a>)}
				</div>
			</nav>

			<section aria-label="Customer testimonial" className="border-b border-base-300">
				<figure className="mx-auto max-w-7xl px-6 py-12 md:py-16">
					<p className={eyebrow}>In our customer’s words</p>
					<blockquote className="mt-5 font-display text-3xl leading-snug md:text-4xl lg:text-5xl">
						<p>“The work is incredible. Everything is optimized, monitored, improved. Content generation is spot on for our business, and the numbers speak for themselves.”</p>
					</blockquote>
					<figcaption className="mt-6 text-sm"><span className="font-semibold text-primary">Antoine Duvauchelle</span><span className="text-base-content/65">, LiveCase</span></figcaption>
				</figure>
			</section>

			<section id="starting-point" className={sectionClass}>
				<div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
					<div><p className={eyebrow}>The starting point</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">A product educators love.<br />A blog that had to earn its place.</h2></div>
					<div>
						<p className="text-lg leading-relaxed text-base-content/80">LiveCase turns case studies into AI-powered business simulations for higher-education and MBA educators. Its audience researches everything: how to deter cheating with AI, which simulation platforms to compare, what AI tools belong in a classroom. A blog that answers those questions in the right language is one of the most direct ways to reach them.</p>
						<p className="mt-5 text-lg leading-relaxed text-base-content/80">On July 20, 2026, LiveCase moved its blog onto the Growth Engine. On September 29, 2026, the Growth Engine became the blog’s only source. 749 posts have been published across languages so far.</p>
					</div>
				</div>
			</section>

			<section id="engine" className="scroll-mt-24 border-t border-base-300 bg-base-200">
				<div className={sectionClass}>
					<p className={eyebrow}>The Growth Engine</p>
					<h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">One loop that keeps the blog<br />moving without anyone chasing it.</h2>
					<ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
						{engine.map(([stage, body], i) => <li key={stage} className="rounded-lg border border-base-300 bg-base-100 p-6"><p className="text-sm font-semibold text-base-content/50">0{i + 1}</p><h3 className="mt-2 font-display text-2xl">{stage}</h3><p className="mt-3 text-sm leading-relaxed text-base-content/75">{body}</p></li>)}
					</ol>
					<aside className="mt-10 max-w-md rounded-lg bg-base-100 p-7 md:p-9"><p className={eyebrow}>Powered by Lucy</p><h3 className="mt-4 font-display text-3xl">The same engine<br />runs on any site.</h3><Link href={localizedPath('/', locale)} className="mt-6 inline-block py-2 font-semibold text-primary underline underline-offset-4">Explore Lucy →</Link></aside>
					<div className="mt-12">
						<figure>
							<a href="/use-cases/livecase/blog-index.webp" target="_blank" rel="noopener noreferrer" aria-label="View the LiveCase blog screenshot full size (opens in a new tab)" className="group block overflow-hidden rounded-lg border border-base-300 bg-base-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
								<Image src="/use-cases/livecase/blog-index.webp" alt="LiveCase blog index showing recent posts such as 5 Examples of Decision-Based Simulations for Business Education and How to not get caught cheating with chatgpt" width={1600} height={1000} sizes="(max-width: 1279px) 100vw, 1216px" className="h-auto w-full" />
								<span className="block border-t border-base-300 px-4 py-3 text-sm font-semibold text-primary group-hover:underline">View full-size screenshot <span aria-hidden="true">↗</span></span>
							</a>
							<figcaption className="mt-4 text-sm leading-relaxed text-base-content/75">The LiveCase blog today. Captured November 6, 2026. <a href="https://www.livecase.com/blog" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Visit the blog<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a></figcaption>
						</figure>
					</div>
				</div>
			</section>

			<section id="languages" className={sectionClass}>
				<div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
					<div><p className={eyebrow}>Four languages</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Translations that<br />outperform the originals.</h2><ul className="mt-6 flex flex-wrap gap-2">{languages.map(l => <li key={l} className="rounded-full border border-base-300 bg-base-100 px-4 py-1.5 text-sm">{l}</li>)}</ul></div>
					<div>
						<p className="text-lg leading-relaxed text-base-content/80">The Spanish and French posts published in late July rank around position 6 to 7 in Google, with click rates of 1.8% to 4.3%. That puts them above most of the English posts. The translations are earning their keep.</p>
						<h3 className="mt-8 font-display text-2xl">Some of the posts doing the work</h3>
						<ul className="mt-4 divide-y divide-base-300 rounded-lg border border-base-300 bg-base-100">{topPosts.map(([name, note]) => <li key={name} className="p-5"><p className="font-semibold">{name}</p><p className="mt-1 text-sm text-base-content/65">{note}</p></li>)}</ul>
					</div>
				</div>
			</section>

			<section id="results" className="scroll-mt-24 border-t border-base-300 bg-base-200">
				<div className={sectionClass}>
					<p className={eyebrow}>Results</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">More of the right people<br />finding the blog.</h2>
					<p className="mt-4 max-w-3xl leading-relaxed text-base-content/75">Per-day averages, comparing the 90 days before August 7, 2026 with the 90 days after.</p>
					<div className="mt-9 overflow-x-auto rounded-lg border border-base-300 bg-base-100">
						<table className="w-full text-left text-sm md:text-base"><thead><tr className="border-b border-base-300 text-base-content/65"><th scope="col" className="p-5 font-medium">Metric</th><th scope="col" className="p-5 font-medium">Before</th><th scope="col" className="p-5 font-medium">After</th></tr></thead><tbody>{results.map(([metric, before, after]) => <tr key={metric} className="border-b border-base-200 last:border-0"><th scope="row" className="p-5 font-medium">{metric}</th><td className="p-5 tabular-nums">{before}</td><td className="p-5 font-semibold tabular-nums">{after}</td></tr>)}</tbody></table>
					</div>
					<div className="mt-12 border-t border-base-300 pt-10">
						<p className={eyebrow}>AI visibility</p>
						<h3 className="mt-3 font-display text-3xl">Mentioned in 38% of the answers we checked.</h3>
						<p className="mt-3 max-w-3xl leading-relaxed text-base-content/75">We asked AI assistants 195 questions that educators might ask and counted the answers that mention LiveCase.</p>
						<dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
							{aiChecks.map(([label, value]) => <div key={label} className="border-t border-base-300 pt-5"><dt className="font-semibold">{label}</dt><dd className="mt-3 font-display text-3xl md:text-4xl">{value}</dd><dd className="mt-2 text-sm font-semibold text-primary">answers mention LiveCase</dd></div>)}
						</dl>
					</div>
					<details id="measured" className="mt-10 scroll-mt-24 rounded-lg border border-base-300 bg-base-100 px-6 py-4"><summary className="cursor-pointer py-2 font-semibold">How we measured</summary><p className="mt-4 max-w-3xl pb-3 text-sm leading-relaxed text-base-content/75">All figures are per-day averages comparing May 9 to August 6, 2026 with August 7 to November 4, 2026. Blog clicks, impressions, click rate, indexed pages and top-post figures come from Google Search Console; unpaid search visits and visits from AI assistants come from Google Analytics 4. Visits are filtered to unpaid search and AI assistants only; we leave out total site visits because suspected bot traffic inflates them. These figures measure visibility and traffic, not leads or revenue. AI visibility is the share of 195 answers from Perplexity, ChatGPT, Google AI Mode and Google AI Overview that mention LiveCase. This is a before-and-after comparison, not a controlled test.</p></details>
				</div>
			</section>

			<section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border-t border-base-300 px-6 py-16 md:flex-row md:items-center md:py-20"><h2 className="font-display text-3xl md:text-4xl">What could your blog do on autopilot?</h2><Link href={localizedPath('/contact', locale)} className="btn btn-primary h-auto min-h-12 shrink-0 px-7 py-3">Talk about your content <span aria-hidden="true">→</span></Link></section>
		</article>
	)
}
