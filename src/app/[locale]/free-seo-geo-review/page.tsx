import type { Metadata } from 'next'
import { canonicalMetadata } from '@/lib/page-metadata'
import { SeoGeoReviewForm } from './SeoGeoReviewForm'

const path = '/free-seo-geo-review'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	return canonicalMetadata(path, locale, {
		title: 'Free SEO + GEO Review of Your Website | Recursive Solutions',
		description:
			'Get a free SEO and GEO review of your website. See how Google and AI assistants like ChatGPT and Perplexity find your business, with prioritised quick wins, emailed in minutes.',
	})
}

const items = [
	['SEO health', 'Titles and meta descriptions, headings, indexing basics and the pages Google can and can\'t find.'],
	['AI visibility (GEO)', 'How ChatGPT, Perplexity and Google AI Overviews see and cite your business, including structured data and entity clarity.'],
	['Quick wins, prioritised', 'The few fixes worth doing first, in plain English.'],
]

export default function FreeSeoGeoReviewPage() {
	return (
		<main className="mx-auto max-w-6xl px-6 py-12 md:py-20">
			<div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
				<div>
					<p className="text-sm font-semibold uppercase tracking-wide text-primary">Free website review</p>
					<h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
						Is your website found on Google, and by AI?
					</h1>
					<p className="mt-6 max-w-xl text-lg leading-relaxed text-base-content/75">
						Enter your website and email. We&rsquo;ll run a free SEO + GEO review and send the report to your inbox in minutes.
					</p>

					<h2 className="mt-10 font-display text-2xl font-bold">What you&rsquo;ll get</h2>
					<ul className="mt-4 space-y-4">
						{items.map(([title, body]) => (
							<li key={title} className="border-l-2 border-primary pl-4">
								<p className="font-semibold">{title}</p>
								<p className="text-base-content/75">{body}</p>
							</li>
						))}
					</ul>
					<p className="mt-8 max-w-xl text-sm leading-relaxed text-base-content/65">
						<strong className="text-base-content">GEO</strong> (Generative Engine Optimization) means showing up in the answers AI assistants give, not just in search results.
					</p>
				</div>
				<div className="lg:sticky lg:top-24">
					<SeoGeoReviewForm />
				</div>
			</div>
		</main>
	)
}
