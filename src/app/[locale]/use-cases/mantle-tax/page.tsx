import { socialImageMetadata } from '@/lib/social-image'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildUrl } from '@/lib/sitemap-shared'
import { localizedPath } from '@/lib/i18n-utils'

const path = '/use-cases/mantle-tax'
const title = 'Mantle Tax Solutions: built to be found by AI | Recursive Solutions'
const description = 'A website rebuild for Mantle Tax Solutions™ that made the firm machine-readable. AI visibility audit score 32 to 64, structured data on 31 of 31 pages, and 20 answers marked up for AI.'

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

type Shot = { src: string, label: string, note: string, alt: string, caption: string, link?: [string, string] }
const comparisons: { heading: string, before: Shot, after: Shot }[] = [
	{
		heading: 'Homepage',
		before: { src: 'website-before', label: 'Before', note: 'WordPress / Divi', alt: 'Old Mantle Tax homepage: large centered logo, a two-item menu, an italic mission line over a green gradient, and a Book Free Discovery Call button', caption: 'A logo, a mission statement, and a button. No heading, no location, and no mention of the Enrolled Agent credential.' },
		after: { src: 'website-after', label: 'After', note: 'The rebuilt website', alt: 'New Mantle Tax homepage with the headline Your financial world, finally connected, a Start the conversation button, a phone number, and a three-step Where should you start? selector', caption: 'One clear promise, a plain-language explanation, the phone number, and a short selector that routes each visitor to the right service.', link: ['https://www.mantletax.com/', 'Visit the after website'] },
	},
	{
		heading: 'Services',
		before: { src: 'services-before', label: 'Before', note: 'Three homepage tiles', alt: 'Old Our Services section: three stock photos captioned Tax Advisory Services, Tax Filing, and Financial Reporting, each with one sentence', caption: 'Every service was a stock photo and one sentence, with nowhere to click through. An AI asked “What is the Mantle Blueprint?” found nothing.' },
		after: { src: 'services-after', label: 'After', note: 'A page per service', alt: 'New Mantle Blueprint page with the headline One page. One hour. A picture you can act on., a short explanation, and a photo of two people reviewing a document', caption: 'The Blueprint now has its own page: what it is, who it is for, the four steps, and five answered questions marked up for AI.', link: ['https://www.mantletax.com/blueprint', 'Visit the Blueprint page'] },
	},
]
const principles = [
	['Say who, what, and where', '“Enrolled Agent” on every marketing page; Columbus and Central Ohio on the home and About pages.'],
	['One page, one job', 'Each page has one heading, a unique title, and a description naming the service. Was 0 of 15; now 31 of 31.'],
	['Built to be quoted', 'Short, plain-language answers that an AI assistant can lift word for word and credit to the firm.'],
]
const machineSteps = [
	['Name the firm and its founder', 'One record for the business, linked to one record for Hava and her credentials, so AI engines tie the right services and credentials to the right firm.'],
	['Answer the questions clients ask', 'Twenty question-and-answer pairs across three service pages and four articles, marked up so an assistant knows exactly which text answers which question.'],
	['Define the signature offers', 'The Blueprint, Ecosystem, Compass, Atlas, and Journey each have a definition on the firm’s own domain. Before, searches for them returned nothing.'],
]
const blueprintQuestions = ['What is the Mantle Blueprint™?', 'What happens after the Blueprint?', 'What is the difference between tax filing and tax strategy?', 'I already have a CPA. Is this still worth it?', 'Can you tell me how much I will save?']
const schemaExcerpt = `{
  "@type": "AccountingService",
  "name": "Mantle Tax Solutions™",
  "legalName": "The Mantle Group LLC",
  "telephone": "+16146184556",
  "areaServed": ["Columbus", "Central Ohio"],
  "founder": { "name": "Hava Laudon" },
  "knowsAbout": ["Tax strategy", "IRS representation", …]
}`
const scores = [
	['AI search readiness', '30', '80'],
	['On-page content', '22', '82'],
	['Technical foundation', '45', '85'],
	['Entity, local & brand', '18', '55'],
	['Performance (mobile)', '60', '69'],
	['Authority & visibility', '15', '15'],
]
const siteStats = [
	['Homepage weight', '8.7', '0.9', 'MB, 90% lighter'],
	['Desktop performance', '81', '99', 'Lighthouse score'],
	['Accessibility', '68', '96', 'Lighthouse score'],
	['Images with alt text', '3 of 10', 'all', 'Old homepage vs. entire new site'],
]
const sectionClass = 'mx-auto max-w-7xl px-6 py-16 md:py-24 scroll-mt-24'
const eyebrow = 'text-xs font-bold uppercase tracking-[0.16em] text-primary'

function Screenshot({ shot }: { shot: Shot }) {
	const src = `/use-cases/mantle-tax/${shot.src}.webp`
	return (
		<figure>
			<div className="mb-4 flex items-baseline justify-between gap-4"><h3 className="font-display text-2xl">{shot.label}</h3><span className="text-sm text-base-content/65">{shot.note}</span></div>
			<a href={src} target="_blank" rel="noopener noreferrer" aria-label={`View ${shot.label.toLowerCase()} screenshot full size (opens in a new tab)`} className="group block overflow-hidden rounded-lg border border-base-300 bg-base-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
				<Image src={src} alt={shot.alt} width={1400} height={950} sizes="(max-width: 1023px) 100vw, 600px" className="h-auto w-full" />
				<span className="block border-t border-base-300 px-4 py-3 text-sm font-semibold text-primary group-hover:underline">View full-size screenshot <span aria-hidden="true">↗</span></span>
			</a>
			<figcaption className="mt-4 text-sm leading-relaxed text-base-content/75">{shot.caption}{shot.link && <> <a href={shot.link[0]} target="_blank" rel="noopener noreferrer" className="mt-2 block font-semibold text-primary underline underline-offset-4">{shot.link[1]}<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a></>}</figcaption>
		</figure>
	)
}

export default async function MantleTaxPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	return (
		<article>
			<section className="mx-auto max-w-7xl px-6 pt-10 pb-12 md:pt-16 md:pb-16">
				<p className={eyebrow}>Use cases / Mantle Tax Solutions</p>
				<div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
					<div>
						<h1 className="max-w-3xl font-display text-5xl leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">A trusted advisor.<br />Now AI knows<br />her name.</h1>
						<p className="mt-6 max-w-xl text-lg leading-relaxed text-base-content/75">Mantle’s old website never said what the firm does, where it works, or that its founder is an Enrolled Agent, so AI assistants filled in the blanks from LinkedIn. We rebuilt the site so every page tells people, and the machines that answer their questions, exactly who Mantle is.</p>
						<dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-base-300 pt-6 text-sm">
							<div><dt className="text-base-content/65">Customer</dt><dd className="mt-1 font-semibold">Mantle Tax Solutions™</dd></div>
							<div><dt className="text-base-content/65">Location</dt><dd className="mt-1 font-semibold">Columbus &amp; Central Ohio</dd></div>
							<div><dt className="text-base-content/65">Business</dt><dd className="mt-1 font-semibold">Tax strategy &amp; advisory</dd></div>
							<div><dt className="text-base-content/65">Scope</dt><dd className="mt-1 font-semibold">Website · AI visibility · Content migration</dd></div>
						</dl>
						<a href="https://www.mantletax.com/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block py-2 font-semibold text-primary underline underline-offset-4">Visit Mantle Tax Solutions <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
					</div>
					<figure>
						<div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-base-200 lg:aspect-[4/5]">
							<Image src="/use-cases/mantle-tax/hava-laudon.webp" alt="Hava Laudon, Enrolled Agent and founder of Mantle Tax Solutions" fill priority sizes="(max-width: 1023px) 100vw, 500px" className="object-cover" />
						</div>
						<figcaption className="mt-3 text-sm text-base-content/65">Hava Laudon, EA, founder of Mantle Tax Solutions.</figcaption>
					</figure>
				</div>
			</section>

			<section aria-label="Results at a glance" className="bg-primary text-primary-content">
				<div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
					<div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
						<div><p className="font-display text-7xl leading-none">32 → 64</p><h2 className="mt-3 text-lg font-semibold">AI visibility audit score</h2><p className="mt-2 text-sm">Same 100-point checklist, before and after launch</p></div>
						<div className="border-t border-primary-content/25 pt-7 md:border-t-0 md:border-l md:pl-10 md:pt-0"><p className="font-display text-6xl leading-none">31 of 31</p><h2 className="mt-3 text-lg font-semibold">Pages AI can read as a firm</h2><p className="mt-2 text-sm">Structured data naming the firm, founder, and service area. Was 0.</p></div>
						<div className="border-t border-primary-content/25 pt-7 md:border-t-0 md:border-l md:pl-10 md:pt-0"><p className="font-display text-6xl leading-none">0 → 20</p><h2 className="mt-3 text-lg font-semibold">Answers marked up for AI</h2><p className="mt-2 text-sm">Question-and-answer pairs across service pages and articles</p></div>
					</div>
					<p className="mt-8 border-t border-primary-content/25 pt-5 text-sm leading-relaxed">Baseline audit September 6, 2026 on the old WordPress site; re-run September 23 on the new site, with redirects verified September 24. <a href="#evidence" className="underline underline-offset-4">See the full comparison</a></p>
				</div>
			</section>

			<nav aria-label="In this use case" className="border-b border-base-300">
				<div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4 text-sm">
					<span className="font-semibold text-base-content/65">In this story</span>
					{[['The starting point', 'starting-point'], ['The rebuild', 'rebuild'], ['Before & after', 'before-after'], ['What AI reads now', 'machine-view'], ['Results & evidence', 'evidence']].map(([label, id]) => <a key={id} href={`#${id}`} className="py-2 font-medium text-primary underline-offset-4 hover:underline">{label}</a>)}
				</div>
			</nav>

			<section id="starting-point" className={sectionClass}>
				<div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
					<div><p className={eyebrow}>The starting point</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">The expertise was real.<br />To AI, it was invisible.</h2></div>
					<div>
						<p className="text-lg leading-relaxed text-base-content/80">Mantle Tax Solutions is a Central Ohio tax strategy firm led by Enrolled Agent Hava Laudon. More and more of her future clients start by asking ChatGPT, Perplexity, or Google’s AI Overviews who to call.</p>
						<p className="mt-5 text-lg leading-relaxed text-base-content/80">The old WordPress site gave those engines almost nothing to work with: no service pages, no About page, no FAQ, no structured data, and articles signed “admin.” The firm’s signature offer, the Mantle Blueprint™, had no answer anywhere on the web.</p>
						<div className="mt-7 border-l-2 border-secondary pl-5"><h3 className="font-semibold">Three questions an AI needs answered before it recommends anyone</h3><ul className="mt-3 space-y-2 text-base-content/75"><li>Who is this firm, and who runs it?</li><li>What is she credentialed to do, and where does she work?</li><li>What does each service actually answer for a client?</li></ul></div>
					</div>
				</div>
			</section>

			<section id="rebuild" className="scroll-mt-24 bg-base-200">
				<div className={sectionClass}>
					<p className={eyebrow}>The rebuild</p><h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">From a brochure<br />to the source of truth.</h2>
					<div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
						<div className="space-y-8">
							<div><h3 className="font-display text-2xl">The firm describes itself</h3><p className="mt-3 max-w-2xl leading-relaxed text-base-content/75">Every page now carries a machine-readable record of the firm: legal entity, phone, Columbus and Central Ohio service area, social profiles, six areas of expertise, and a link to Hava’s own record with six professional credentials, Enrolled Agent first.</p></div>
							<div><h3 className="font-display text-2xl">Every service answers real questions</h3><p className="mt-3 max-w-2xl leading-relaxed text-base-content/75">New pages for the Blueprint, Representation &amp; Cleanup, Tax Filing, the Ecosystem, and About, each opening with who it is for and answering what clients actually ask: “I got an IRS notice. What do I do first?” “I already have a CPA. Is this still worth it?”</p></div>
							<div><h3 className="font-display text-2xl">Every article has a credentialed author</h3><p className="mt-3 max-w-2xl leading-relaxed text-base-content/75">All 18 articles were migrated with Hava’s byline, an author page listing her credentials, and their original publish dates, so years of writing now count toward her expertise instead of an anonymous admin.</p></div>
						</div>
						<aside className="self-start rounded-lg bg-base-100 p-7 md:p-9"><p className={eyebrow}>Nothing earned was lost</p><h3 className="mt-4 font-display text-3xl">33 old links.<br />33 new homes.</h3><p className="mt-5 leading-relaxed text-base-content/75">Every old WordPress address, including all 18 article links, now redirects to its new page. Links already sitting in search results, AI answers, emails, and social posts keep working, and search engines carry each page’s standing forward.</p><p className="mt-5 leading-relaxed text-base-content/75">All 16 AI crawlers we tested are welcome, and the firm can change that policy from its portal without a developer.</p><Link href={localizedPath('/lucy', locale)} className="mt-6 inline-block py-2 font-semibold text-primary underline underline-offset-4">Explore Lucy →</Link></aside>
					</div>
				</div>
			</section>

			<section id="before-after" className={`${sectionClass} border-b border-base-300`}>
				<p className={eyebrow}>Before &amp; after</p>
				<h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">Same firm.<br />Finally says what it does.</h2>
				<p className="mt-5 max-w-2xl text-lg leading-relaxed text-base-content/75">The new site leads with the promise, the credential, and a clear first step, and gives every service its own page instead of a stock-photo tile.</p>
				{comparisons.map(({ heading, before, after }, i) => <div key={heading}>
					<p className={`${i === 0 ? 'mt-9' : 'mt-12'} ${eyebrow}`}>{heading}</p>
					<div className="mt-4 grid gap-8 lg:grid-cols-2"><Screenshot shot={before} /><Screenshot shot={after} /></div>
				</div>)}
				<div className="mt-10 grid gap-6 border-t border-base-300 pt-7 md:grid-cols-3">
					{principles.map(([heading, body]) => <div key={heading}><h3 className="font-semibold">{heading}</h3><p className="mt-2 text-sm leading-relaxed text-base-content/75">{body}</p></div>)}
				</div>
				<p className="mt-6 text-xs leading-relaxed text-base-content/60">Before: captures of the old WordPress site, September 15, 2026. The old site is no longer live; its addresses redirect to the new pages. After: live site, September 24, 2026.</p>
			</section>

			<section id="machine-view" className={sectionClass}>
				<div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
					<div><p className={eyebrow}>What AI reads now</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Written for people.<br />Labeled for machines.</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-base-content/75">AI assistants don’t look at a website the way a visitor does. They read the words and the labels underneath them. Now those labels say exactly who Mantle is, on every page.</p><p className="mt-8 font-display text-6xl text-primary">16 of 16</p><p className="mt-2 font-semibold">AI crawlers allowed in</p><p className="mt-2 text-sm text-base-content/65">Including those behind ChatGPT, Claude, Perplexity, Google, Bing, and Apple.</p></div>
					<div className="overflow-hidden">
						<ol className="space-y-7">
							{machineSteps.map(([heading, body], i) => <li key={heading} className="flex gap-5"><span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-base-300 text-sm font-semibold text-primary" aria-hidden="true">{i + 1}</span><div><h3 className="text-lg font-semibold">{heading}</h3><p className="mt-2 leading-relaxed text-base-content/75">{body}</p></div></li>)}
						</ol>
						<div className="mt-9 border-t border-base-300 pt-6">
							<h3 className="font-display text-2xl">What an AI reads on every page</h3>
							<p className="mt-3 leading-relaxed text-base-content/75">An excerpt of the structured data behind every page on mantletax.com. Visitors never see it; AI engines read it first.</p>
							<pre className="mt-4 overflow-x-auto rounded-lg border border-base-300 bg-base-200 p-5 font-mono text-sm leading-relaxed"><code>{schemaExcerpt}</code></pre>
							<details className="mt-4"><summary className="cursor-pointer py-2 font-semibold text-primary">See the Blueprint questions AI can now answer</summary><ul className="mt-3 space-y-4">{blueprintQuestions.map(q => <li key={q} className="text-sm leading-relaxed">{q}</li>)}</ul></details>
						</div>
					</div>
				</div>
			</section>

			<section id="evidence" className="scroll-mt-24 border-t border-base-300 bg-base-200">
				<div className={sectionClass}>
					<p className={eyebrow}>Results &amp; evidence</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Everything a website can fix,<br />fixed.</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-base-content/75">We re-ran the same audit checklist used on the old site. The on-site scores roughly doubled or better. Authority, which is earned off-site through reviews and listings, has not moved yet, and we scored it that way on purpose.</p>
					<div className="mt-9 grid gap-6 sm:grid-cols-2"><div className="rounded-lg border border-base-300 bg-base-100 p-5"><p className={eyebrow}>Before launch</p><p className="mt-2 text-lg font-semibold">September 6, 2026 · WordPress</p></div><div className="rounded-lg border border-primary/30 bg-base-100 p-5"><p className={eyebrow}>After launch</p><p className="mt-2 text-lg font-semibold">September 23, 2026 · Growth Engine</p></div></div>
					<div className="mt-6 overflow-x-auto rounded-lg border border-base-300 bg-base-100">
						<table className="w-full text-left text-sm md:text-base"><caption className="px-5 pt-5 text-left font-semibold">AI visibility audit · scores out of 100</caption><thead><tr className="border-b border-base-300 text-base-content/65"><th scope="col" className="p-5 font-medium">Category</th><th scope="col" className="p-5 font-medium">Before</th><th scope="col" className="p-5 font-medium">After</th></tr></thead><tbody>
							{scores.map(([category, before, after]) => <tr key={category} className="border-b border-base-200 last:border-0"><th scope="row" className="p-5 font-medium">{category}</th><td className="p-5 tabular-nums">{before}</td><td className="p-5 font-semibold tabular-nums">{after}</td></tr>)}
							<tr className="border-b border-base-200 last:border-0"><th scope="row" className="p-5 font-semibold">Overall</th><td className="p-5 font-semibold tabular-nums">32</td><td className="p-5 font-semibold tabular-nums">64</td></tr>
						</tbody></table>
					</div>
					<p className="mt-4 max-w-3xl text-sm leading-relaxed text-base-content/75"><strong>The full picture:</strong> search indexes still held the old site on September 23, so AI answers named the firm in only 2 of 7 sample questions and quoted the new content in none. That is normal this early. Local questions also need a public address and Google Business Profile, which are next.</p>
					<div className="mt-12">
						<p className={eyebrow}>Also delivered · Lighter and more accessible</p>
						<h3 className="mt-3 font-display text-3xl md:text-4xl">A site that loads fast.<br />And works for everyone.</h3>
						<p className="mt-4 max-w-3xl leading-relaxed text-base-content/75">AI crawlers don’t wait for a page to paint, but people and Google do. The rebuild made the site lighter, faster on desktop, and easier to use with assistive technology.</p>
						<dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
							{siteStats.map(([label, before, after, note]) => <div key={label} className="border-t border-base-300 pt-5"><dt className="font-semibold">{label}</dt><dd className="mt-3 font-display text-4xl">{before} <span className="text-base-content/50">→</span> {after}</dd><dd className="mt-2 text-sm font-semibold text-primary">{note}</dd></div>)}
						</dl>
						<div className="mt-8 border-l-2 border-secondary bg-base-100 p-6 md:p-8">
							<h4 className="font-display text-2xl">Launch is the starting line.</h4>
							<p className="mt-3 max-w-3xl leading-relaxed text-base-content/75">The website now does its half of the job: every page states who the firm is, who runs it, and what each service answers. As AI engines re-crawl the site, those answers are what they will find and quote.</p>
							<p className="mt-4 max-w-3xl leading-relaxed text-base-content/75">The other half is off-site: a verified Google Business Profile, directory listings, and client reviews. The 90-day goal is for AI assistants to name Mantle in at least 4 of the same 7 client questions.</p>
							<p className="mt-4 text-sm text-base-content/65">This describes the goal, not a forecast. Leads and bookings need to be measured separately.</p>
						</div>
					</div>
					<details className="mt-10 rounded-lg border border-base-300 bg-base-100 px-6 py-4"><summary className="cursor-pointer py-2 font-semibold">How we measured this</summary><div className="mt-4 max-w-3xl space-y-4 pb-3 text-sm leading-relaxed text-base-content/75"><p>Source: Recursive Solutions AI visibility audit. The September 6 baseline sampled 15 pages of the old WordPress site; the September 23 re-run fetched and parsed all 31 pages in the new sitemap for titles, descriptions, headings, structured data, word count, and alt text. The legacy redirect map was re-tested on production on September 24: 33 of 33 old addresses land on a working page.</p><p>Category scores other than Performance are checklist assessments, applied the same way on both dates, not tool measurements. The overall score is the plain average of the six. Performance is the median of three Lighthouse 12 mobile runs; desktop is a single run.</p><p>The AI answer sample is seven client-style prompts run through one engine’s web search on September 23. ChatGPT, Perplexity, and Google AI Overviews were not sampled. These results measure what the site gives AI engines; they do not yet show rankings, leads, or revenue.</p></div></details>
				</div>
			</section>

			<section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:py-20"><div><h2 className="font-display text-3xl md:text-4xl">What does AI say about your business?</h2><p className="mt-4 text-lg text-base-content/75">We’ll show you what the engines see today, and what it takes to change it.</p></div><Link href={`${localizedPath('/', locale)}#contact`} className="btn btn-primary h-auto min-h-12 shrink-0 px-7 py-3">Talk about your visibility <span aria-hidden="true">→</span></Link></section>
		</article>
	)
}
