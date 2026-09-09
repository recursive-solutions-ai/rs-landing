import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildUrl } from '@/lib/sitemap-shared'

const path = '/use-cases/my-little-paris'
const title = 'My Little Paris: a website built for growth | Recursive Solutions'
const description = 'A website rebuild, Lucy integration, and ongoing SEO for My Little Paris. See approximately 2.7× Google search impressions, 14% more search clicks, and an email-reported 692% increase in active users.'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	return {
		title, description,
		alternates: { canonical: buildUrl(path, locale) },
		openGraph: { title, description, url: buildUrl(path, locale), type: 'article', images: [{ url: '/social-card.jpg', width: 1200, height: 630 }] },
	}
}

const pageResults = [
	{ page: 'Birthday parties', before: 12, after: 24, change: '+100%' },
	{ page: 'Reservations', before: 15, after: 19, change: '+27%' },
	{ page: 'Café menu', before: 25, after: 31, change: '+24%' },
	{ page: 'Play space', before: 8, after: 12, change: '+50%' },
]
const articles = [
	{ title: 'Indoor play spots for toddlers in San Gabriel & Alhambra', clicks: 12 },
	{ title: 'Rainy-day toddler activities in the San Gabriel Valley', clicks: 7 },
	{ title: 'A guide to My Little Paris in San Gabriel', clicks: 6 },
	{ title: 'First-birthday party venues in the San Gabriel Valley', clicks: 4 },
]
const sectionClass = 'mx-auto max-w-7xl px-6 py-16 md:py-24 scroll-mt-24'
const eyebrow = 'text-xs font-bold uppercase tracking-[0.16em] text-primary'

export default async function MyLittleParisPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	return (
		<article>
			<section className="mx-auto max-w-7xl px-6 pt-10 pb-12 md:pt-16 md:pb-16">
				<p className={eyebrow}>Use cases / My Little Paris</p>
				<div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
					<div>
						<h1 className="max-w-3xl font-display text-5xl leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">A local favorite.<br />More ways<br />to be found.</h1>
						<p className="mt-6 max-w-xl text-lg leading-relaxed text-base-content/75">We rebuilt My Little Paris’s Squarespace website around the needs of local families, connected it to Lucy, and put an ongoing search and content strategy to work.</p>
						<dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-base-300 pt-6 text-sm">
							<div><dt className="text-base-content/65">Customer</dt><dd className="mt-1 font-semibold">My Little Paris</dd></div>
							<div><dt className="text-base-content/65">Location</dt><dd className="mt-1 font-semibold">San Gabriel, California</dd></div>
							<div><dt className="text-base-content/65">Business</dt><dd className="mt-1 font-semibold">Family café & indoor play</dd></div>
							<div><dt className="text-base-content/65">Scope</dt><dd className="mt-1 font-semibold">Website · Lucy · SEO & content</dd></div>
						</dl>
						<a href="https://www.my-little-paris.com/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block py-2 font-semibold text-primary underline underline-offset-4">
							Visit My Little Paris <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
						</a>
					</div>
					<figure>
						<div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-base-200 lg:aspect-[4/5]">
							<Image src="/use-cases/my-little-paris/cafe-play.webp" alt="Parents dining beside the indoor play area at My Little Paris" fill priority sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover" />
						</div>
						<figcaption className="mt-3 text-sm text-base-content/65">A place for children to play and parents to enjoy the café.</figcaption>
					</figure>
				</div>
			</section>

			<section aria-label="Results at a glance" className="bg-primary text-primary-content">
				<div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
					<div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
						<div><p className="font-display text-7xl leading-none">2.7×</p><h2 className="mt-3 text-lg font-semibold">Google search impressions</h2><p className="mt-2 text-sm">~7,980 → ~21,700 appearances in search</p></div>
						<div className="border-t border-primary-content/25 pt-7 md:border-t-0 md:border-l md:pl-10 md:pt-0"><p className="font-display text-6xl leading-none">+14%</p><h2 className="mt-3 text-lg font-semibold">Google search clicks</h2><p className="mt-2 text-sm">518 → 592 clicks to the website</p></div>
						<div className="border-t border-primary-content/25 pt-7 md:border-t-0 md:border-l md:pl-10 md:pt-0"><p className="font-display text-6xl leading-none">+692%</p><h2 className="mt-3 text-lg font-semibold">Reported active users</h2><p className="mt-2 text-sm">2.6K active users in the September 1 email</p><a href="#email-report" className="mt-2 inline-block text-sm underline underline-offset-4">Email comparison dates unverified</a></div>
					</div>
					<p className="mt-8 border-t border-primary-content/25 pt-5 text-sm leading-relaxed">Search metrics: July 1–19 vs. August 19–September 6, 2026, two 19-day periods. Active-user growth comes from a separate customer-supplied email. <a href="#evidence" className="underline underline-offset-4">See the full comparison</a></p>
				</div>
			</section>

			<nav aria-label="In this use case" className="border-b border-base-300">
				<div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4 text-sm">
					<span className="font-semibold text-base-content/65">In this story</span>
					{[['The starting point', 'starting-point'], ['The rebuild', 'rebuild'], ['Before & after', 'before-after'], ['The SEO loop', 'seo-loop'], ['Results & evidence', 'evidence']].map(([label, id]) => <a key={id} href={`#${id}`} className="py-2 font-medium text-primary underline-offset-4 hover:underline">{label}</a>)}
				</div>
			</nav>

			<section aria-label="Customer testimonial" className="border-b border-base-300">
				<figure className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 md:grid-cols-[0.65fr_1.35fr] md:gap-14 md:py-16">
					<div className="mx-auto w-full max-w-[18rem] md:max-w-[22rem]">
						<Image
							src="/use-cases/my-little-paris/customer-photo.webp"
							alt="A family posing together in front of pastel balloons and Easter decorations"
							width={1080}
							height={1443}
							sizes="(max-width: 767px) 288px, 352px"
							className="h-auto w-full rounded-lg"
						/>
					</div>
					<div>
						<p className={eyebrow}>In our customer’s words</p>
						<blockquote className="mt-5 max-w-3xl font-display text-2xl leading-snug md:text-3xl lg:text-4xl">
							<p>“Amazing working with the Recursive Solutions team. Above and beyond, really. They captured the essence of who we are and made it so much easier for the right families to find us online. Such a transformative experience.”</p>
						</blockquote>
						<figcaption className="mt-6 text-sm font-semibold text-primary">My Little Paris</figcaption>
					</div>
				</figure>
			</section>

			<section id="starting-point" className={sectionClass}>
				<div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
					<div><p className={eyebrow}>The starting point</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">The experience was there.<br />The website needed to catch up.</h2></div>
					<div><p className="text-lg leading-relaxed text-base-content/80">My Little Paris combines a café, indoor play, and children’s parties. The website had to help families understand those different experiences and find the right next step.</p><p className="mt-5 text-lg leading-relaxed text-base-content/80">The brief was to move beyond the existing Squarespace site: make the offer clearer, design around conversion, and give the business a foundation for ongoing search visibility.</p>
						<div className="mt-7 border-l-2 border-secondary pl-5"><h3 className="font-semibold">Three questions the site needed to answer</h3><ul className="mt-3 space-y-2 text-base-content/75"><li>What can my family do here?</li><li>What do I need to know before visiting?</li><li>How do I reserve a session or plan a party?</li></ul></div>
					</div>
				</div>
			</section>

			<section id="rebuild" className="scroll-mt-24 bg-base-200">
				<div className={sectionClass}>
					<p className={eyebrow}>The rebuild</p><h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">A clearer path from<br />“looks lovely” to “let’s go.”</h2>
					<div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
						<div className="space-y-8">
							{[
								['Clarify the experience', 'Rebuilt the site from the ground up, with messaging and information organized around the café, play space, and birthday parties.'],
								['Make the next step easy to find', 'Gave reservations and party inquiries clear calls to action, alongside the information families need to make a decision.'],
								['Connect content and SEO', 'Integrated the website with Lucy so content and SEO could be managed beyond the initial launch.'],
							].map(([heading, body]) => <div key={heading}><h3 className="font-display text-2xl">{heading}</h3><p className="mt-3 max-w-2xl leading-relaxed text-base-content/75">{body}</p></div>)}
						</div>
						<aside className="self-start rounded-lg bg-base-100 p-7 md:p-9"><p className={eyebrow}>Built to keep evolving</p><h3 className="mt-4 font-display text-3xl">One website.<br />An ongoing operation.</h3><p className="mt-5 leading-relaxed text-base-content/75">The rebuild established the customer experience. Lucy provided the content foundation. The SEO loop added a continuing process for finding topics and publishing useful answers.</p><Link href={`/${locale}/lucy`} className="mt-6 inline-block py-2 font-semibold text-primary underline underline-offset-4">Explore Lucy →</Link></aside>
					</div>
				</div>
			</section>


			<section id="before-after" className={`${sectionClass} border-b border-base-300`}>
				<p className={eyebrow}>Before & after</p>
				<h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">Same personality.<br />A clearer first impression.</h2>
				<p className="mt-5 max-w-2xl text-lg leading-relaxed text-base-content/75">The new homepage brings the experience, the practical details, and the next step together, so families can quickly picture their visit.</p>
				<div className="mt-9 grid gap-8 lg:grid-cols-2">
					{[
						{ label: 'Before', platform: 'The Squarespace website', image: 'website-before.webp', url: 'https://my-little-paris.squarespace.com/', alt: 'Old My Little Paris homepage with a long introduction over a superhero photo, a reservation button, and an upcoming event below', caption: 'A broad introduction, followed by events and promotions. The café and play experience takes more scrolling to explore.' },
						{ label: 'After', platform: 'The rebuilt website', image: 'website-after.webp', url: 'https://www.my-little-paris.com/', alt: 'Rebuilt My Little Paris homepage with the headline Kids play freely. Parents dine peacefully., café and playground photos, and separate reservation and birthday party buttons', caption: 'A focused promise, photos of the actual experience, and distinct paths to reserve a session or plan a birthday party.' },
					].map(shot => <figure key={shot.label}>
						<div className="mb-4 flex items-baseline justify-between gap-4"><h3 className="font-display text-2xl">{shot.label}</h3><span className="text-sm text-base-content/65">{shot.platform}</span></div>
						<a href={`/use-cases/my-little-paris/${shot.image}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${shot.label.toLowerCase()} homepage screenshot full size (opens in a new tab)`} className="group block overflow-hidden rounded-lg border border-base-300 bg-base-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
							<Image src={`/use-cases/my-little-paris/${shot.image}`} alt={shot.alt} width={1400} height={950} sizes="(max-width: 1023px) 100vw, 50vw" className="h-auto w-full" />
							<span className="block border-t border-base-300 px-4 py-3 text-sm font-semibold text-primary group-hover:underline">View full-size screenshot <span aria-hidden="true">↗</span></span>
						</a>
						<figcaption className="mt-4 text-sm leading-relaxed text-base-content/75">{shot.caption} <a href={shot.url} target="_blank" rel="noopener noreferrer" className="mt-2 block font-semibold text-primary underline underline-offset-4">Visit the {shot.label.toLowerCase()} website<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a></figcaption>
					</figure>)}
				</div>
				<div className="mt-10 grid gap-6 border-t border-base-300 pt-7 md:grid-cols-3">
					{[['Understand it faster', 'A short headline explains the benefit for both children and parents.'], ['Picture the visit', 'Café and playground photography shows what families can expect.'], ['Choose the next step', 'Reservations and birthday parties each have a clear call to action.']].map(([heading, body]) => <div key={heading}><h3 className="font-semibold">{heading}</h3><p className="mt-2 text-sm leading-relaxed text-base-content/75">{body}</p></div>)}
				</div>
				<p className="mt-6 text-xs leading-relaxed text-base-content/60">Homepage captures from the old Squarespace site and current website, September 9, 2026. The old site is shown as it remains available today.</p>
			</section>

			<section id="seo-loop" className={sectionClass}>
				<div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
					<div><p className={eyebrow}>The ongoing SEO loop</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Show up for what<br />families are searching.</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-base-content/75">Alongside the rebuild, we put an ongoing keyword-monitoring and content process in place.</p><p className="mt-8 font-display text-6xl text-primary">~300</p><p className="mt-2 font-semibold">keywords monitored for the business</p><p className="mt-2 text-sm text-base-content/65">Campaign scope; separate from Search Console’s query count.</p></div>
					<div>
						<ol className="space-y-7">
							{[['Monitor searches', 'Track keyword opportunities relevant to the business and the families it serves.'], ['Create targeted content', 'Publish articles around practical needs, from rainy-day activities to first-birthday party planning.'], ['Review the response', 'Use search performance to see which topics are earning visibility and bringing people to the website.']].map(([heading, body], i) => <li key={heading} className="flex gap-5"><span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-base-300 text-sm font-semibold text-primary" aria-hidden="true">{i + 1}</span><div><h3 className="text-lg font-semibold">{heading}</h3><p className="mt-2 leading-relaxed text-base-content/75">{body}</p></div></li>)}
						</ol>
						<div className="mt-9 border-t border-base-300 pt-6"><h3 className="font-display text-2xl">New routes into the website</h3><p className="mt-3 leading-relaxed text-base-content/75">Four observed blog pages brought 29 search clicks in the recent period, compared with zero in the baseline. That is a subtotal of those pages, not the entire blog.</p><details className="mt-4"><summary className="cursor-pointer py-2 font-semibold text-primary">See the four article topics</summary><ul className="mt-3 space-y-4">{articles.map(item => <li key={item.title} className="flex justify-between gap-6 text-sm leading-relaxed"><span>{item.title}</span><span className="shrink-0 font-semibold">{item.clicks} clicks</span></li>)}</ul></details></div>
					</div>
				</div>
			</section>

			<section id="email-report" className={sectionClass}>
				<div className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
					<div>
						<p className={eyebrow}>The growth report</p>
						<h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">A much bigger<br />online audience.</h2>
						<p className="mt-6 max-w-2xl text-lg leading-relaxed text-base-content/75">The September 1 email shared by My Little Paris reported around 2,600 active users, up 692.17%, and around 2,600 new users, up 675%. These are the figures shown in the original snapshot alongside.</p>
						<div className="mt-8 border-t border-base-300 pt-6">
							<h3 className="font-display text-2xl">Search visibility grew, too.</h3>
							<p className="mt-3 max-w-2xl leading-relaxed text-base-content/75">Separately, our verified Search Console comparison shows <strong className="text-base-content">2.7× the search impressions</strong> and <strong className="text-base-content">14% more search clicks</strong> across two matching 19-day periods.</p>
							<a href="#evidence" className="mt-4 inline-block py-2 font-semibold text-primary underline underline-offset-4">Explore the search results →</a>
						</div>
						<details className="mt-5 border-t border-base-300 pt-4">
							<summary className="cursor-pointer py-2 font-semibold">About the email figures</summary>
							<div className="mt-3 max-w-2xl space-y-3 text-sm leading-relaxed text-base-content/75"><p>The screenshot shows +692.17% active users, +675% new users, and +700.23% events. Headline percentages are rounded. It also shows average engagement time of 51 seconds, down 5.77%.</p><p>The email’s date ranges, property, channel filters, and tracking continuity are not visible or independently verified. These reported increases should not be read as a confirmed before-and-after effect of the rebuild. Users, events, and Google search clicks are different measures.</p></div>
						</details>
					</div>
					<figure className="mx-auto w-full max-w-[20rem]">
						<a href="/use-cases/my-little-paris/september-email-report.jpg" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-base-300 bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label="View the original September 1 email report (new tab)">
							<Image src="/use-cases/my-little-paris/september-email-report.jpg" alt="Customer-supplied September 1 email showing 2.6K active users up 692.17%, 2.6K new users up 675%, and 17.7K events up 700.23%" width={945} height={2048} sizes="320px" className="h-auto w-full" />
						</a>
						<figcaption className="mt-3 text-sm leading-relaxed text-base-content/65">Original customer-supplied email screenshot. Select to view full size.</figcaption>
					</figure>
				</div>
			</section>

			<section id="evidence" className="scroll-mt-24 border-t border-base-300 bg-base-200">
				<div className={sectionClass}>
					<p className={eyebrow}>Results & evidence</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">More visibility.<br />A measurable lift in clicks.</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-base-content/75">The largest change was how often the site appeared in Google. Search clicks also rose, including clicks to pages where families plan a visit or party.</p>
					<div className="mt-9 grid gap-6 sm:grid-cols-2"><div className="rounded-lg border border-base-300 bg-base-100 p-5"><p className={eyebrow}>Before launch · 19 days</p><p className="mt-2 text-lg font-semibold">July 1–19, 2026</p></div><div className="rounded-lg border border-primary/30 bg-base-100 p-5"><p className={eyebrow}>After launch · 19 days</p><p className="mt-2 text-lg font-semibold">August 19–September 6, 2026</p></div></div>
					<div className="mt-6 overflow-x-auto rounded-lg border border-base-300 bg-base-100">
						<table className="w-full text-left text-sm md:text-base"><caption className="px-5 pt-5 text-left font-semibold">Google Web search · whole domain</caption><thead><tr className="border-b border-base-300 text-base-content/65"><th scope="col" className="p-5 font-medium">Metric</th><th scope="col" className="p-5 font-medium">Before</th><th scope="col" className="p-5 font-medium">After</th></tr></thead><tbody>{[['Search clicks', '518', '592'], ['Search impressions', '~7,980', '~21,700'], ['Average position', '9.5', '7.5'], ['Click-through rate', '6.5%', '2.7%']].map(([metric, before, after]) => <tr key={metric} className="border-b border-base-200 last:border-0"><th scope="row" className="p-5 font-medium">{metric}</th><td className="p-5 tabular-nums">{before}</td><td className="p-5 font-semibold tabular-nums">{after}</td></tr>)}</tbody></table>
					</div>
					<p className="mt-4 max-w-3xl text-sm leading-relaxed text-base-content/75"><strong>The full picture:</strong> click-through rate fell from 6.5% to 2.7%. The site appeared in search much more often, but clicks grew more slowly. The reason for that change needs further analysis.</p>
					<div className="mt-12">
						<p className={eyebrow}>Early momentum · A 19-day snapshot</p>
						<h3 className="mt-3 font-display text-3xl md:text-4xl">Early traction.<br />Built to grow over time.</h3>
						<p className="mt-4 max-w-3xl leading-relaxed text-base-content/75">These figures capture Google search clicks to four specific pages over just 19 days. They are one part of the customer journey, rather than the website’s total audience or the number of families booking a visit.</p>
						<dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
							{pageResults.map(item => <div key={item.page} className="border-t border-base-300 pt-5"><dt className="font-semibold">{item.page}</dt><dd className="mt-3 font-display text-4xl">{item.before} <span className="text-base-content/50">→</span> {item.after}</dd><dd className="mt-2 text-sm font-semibold text-primary">{item.change} search clicks</dd></div>)}
						</dl>
						<div className="mt-8 border-l-2 border-secondary bg-base-100 p-6 md:p-8">
							<h4 className="font-display text-2xl">The opportunity builds beyond this snapshot.</h4>
							<p className="mt-3 max-w-3xl leading-relaxed text-base-content/75">Each useful article adds another way for a family to discover My Little Paris. As the content library grows and existing pages keep attracting searches, those opportunities can build on one another over the following months.</p>
							<p className="mt-4 max-w-3xl leading-relaxed text-base-content/75">The goal is to turn that growing reach into more party inquiries, reservations, and returning families. That is why the work continues after launch: useful content to bring people in, clearer information to help them decide, and an easy next step when they are ready.</p>
							<p className="mt-4 text-sm text-base-content/65">This describes the growth opportunity, not a forecast. Booking and customer growth need to be measured separately.</p>
						</div>
					</div>
					<details className="mt-10 rounded-lg border border-base-300 bg-base-100 px-6 py-4"><summary className="cursor-pointer py-2 font-semibold">How we measured this</summary><div className="mt-4 max-w-3xl space-y-4 pb-3 text-sm leading-relaxed text-base-content/75"><p>Source: Google Search Console, my-little-paris.com domain property, Web search, read September 9, 2026. Headline totals have no page, query, country, or device filters. Impressions and average metrics use the rounded values shown in the report.</p><p>The website launched around July 20, 2026. Both comparison windows contain 19 days and the same weekday mix. Search position is an average across searches, rather than a ranking for one specific keyword.</p><p>These results measure search visibility and clicks. They do not establish booking or revenue growth, or isolate the effects of the rebuild from content, seasonality, and other changes. The approximately 300 monitored keywords describe the campaign scope.</p></div></details>

					<div className="mt-14 border-t border-base-300 pt-10"><h3 className="font-display text-3xl">The original analytics snapshots</h3><p className="mt-3 max-w-3xl leading-relaxed text-base-content/75">The supplied Squarespace screenshots document July 2–31, 2026. That period overlaps launch, so these provide historical context; the before-and-after figures above come from Search Console.</p>
						<div className="mt-6 grid gap-8 lg:grid-cols-2">
							{[{src: 'squarespace-visits-july.png', width: 1547, height: 587, title: 'Website traffic in Squarespace', caption: '4,134 visits · July 2–31, 2026. Visits were already up 34% against the previous period.', alt: 'Original Squarespace daily visits chart showing 4,134 visits for July 2 through July 31, 2026'}, {src: 'squarespace-keywords-july.png', width: 1540, height: 653, title: 'Google keywords in Squarespace', caption: '467 keyword clicks in the supplied view. Its reporting scope differs from the Search Console domain totals.', alt: 'Original Squarespace keyword clicks chart showing 467 clicks for July 2 through July 31, 2026'}].map(shot => <figure key={shot.src}><a href={`/use-cases/my-little-paris/${shot.src}`} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-base-300 bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label={`Open full-size screenshot: ${shot.title} (new tab)`}><Image src={`/use-cases/my-little-paris/${shot.src}`} width={shot.width} height={shot.height} alt={shot.alt} sizes="(max-width: 1023px) 100vw, 50vw" className="h-auto w-full" /></a><figcaption className="mt-4 text-sm leading-relaxed"><strong className="block text-base">{shot.title}</strong><span className="mt-1 block text-base-content/75">{shot.caption}</span><span className="mt-2 block text-primary">Select image to view full size ↗</span></figcaption></figure>)}
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:py-20"><div><h2 className="font-display text-3xl md:text-4xl">What could your website do next?</h2><p className="mt-4 text-lg text-base-content/75">Let’s look at your customer journey and where you can grow.</p></div><Link href={`/${locale}#contact`} className="btn btn-primary h-auto min-h-12 shrink-0 px-7 py-3">Talk about your website <span aria-hidden="true">→</span></Link></section>
		</article>
	)
}
