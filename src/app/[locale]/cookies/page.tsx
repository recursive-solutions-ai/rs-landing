'use client'

import { useI18n } from '@/i18n/client'

export default function CookiesPage() {
	const { t, locale } = useI18n()

	return (
		<main className="container mx-auto px-4 py-16 max-w-3xl">
			<header className="mb-12 border-b border-base-300 pb-8">
				<h1 className="text-4xl font-bold mb-2">{t('page.cookie.policy')}</h1>
				<p className="text-base-content/40 text-sm">Last updated: March 2026</p>
			</header>

			<div className="space-y-10 text-base-content/80 leading-relaxed">
				<p>
					This Cookie Policy explains what cookies are, how we use them on our
					website, and how you can manage your preferences. This policy should be
					read alongside our{' '}
					<a href={`/${locale}/privacy`} className="text-primary hover:underline">Privacy Policy</a>.
				</p>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">1. What Are Cookies</h2>
					<p>
						Cookies are small text files that are placed on your device (computer,
						tablet, or phone) when you visit a website. They are widely used to
						make websites work more efficiently, remember your preferences, and
						provide reporting information.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-4">2. Types of Cookies We Use</h2>

					<h3 className="text-lg font-medium text-base-content/90 mb-2">Essential cookies</h3>
					<p className="mb-3">
						These cookies are necessary for the website to function correctly. They
						cannot be disabled without affecting site functionality.
					</p>
					<div className="overflow-x-auto mb-6">
						<table className="table table-sm w-full">
							<thead>
								<tr className="border-b border-base-300">
									<th className="text-base-content font-semibold">Cookie</th>
									<th className="text-base-content font-semibold">Purpose</th>
									<th className="text-base-content font-semibold">Duration</th>
								</tr>
							</thead>
							<tbody className="text-base-content/70">
								<tr className="border-b border-base-300/50">
									<td><code className="bg-base-200 px-1.5 py-0.5 rounded text-sm">theme</code></td>
									<td>Stores your light/dark mode preference</td>
									<td>Persistent (localStorage)</td>
								</tr>
								<tr className="border-b border-base-300/50">
									<td><code className="bg-base-200 px-1.5 py-0.5 rounded text-sm">ge-locale</code></td>
									<td>Remembers your language preference</td>
									<td>1 year</td>
								</tr>
							</tbody>
						</table>
					</div>

					<h3 className="text-lg font-medium text-base-content/90 mb-2">Analytics cookies</h3>
					<p className="mb-3">
						These cookies help us understand how visitors interact with the website
						by collecting anonymous usage data. They are only set if you consent to
						analytics.
					</p>
					<div className="overflow-x-auto mb-6">
						<table className="table table-sm w-full">
							<thead>
								<tr className="border-b border-base-300">
									<th className="text-base-content font-semibold">Cookie</th>
									<th className="text-base-content font-semibold">Purpose</th>
									<th className="text-base-content font-semibold">Duration</th>
								</tr>
							</thead>
							<tbody className="text-base-content/70">
								<tr className="border-b border-base-300/50">
									<td><code className="bg-base-200 px-1.5 py-0.5 rounded text-sm">_ga</code></td>
									<td>Google Analytics: distinguishes unique visitors</td>
									<td>2 years</td>
								</tr>
								<tr className="border-b border-base-300/50">
									<td><code className="bg-base-200 px-1.5 py-0.5 rounded text-sm">_ga_*</code></td>
									<td>Google Analytics: maintains session state</td>
									<td>2 years</td>
								</tr>
							</tbody>
						</table>
					</div>

					<h3 className="text-lg font-medium text-base-content/90 mb-2">Functional cookies</h3>
					<p>
						These cookies enable enhanced functionality and personalization, such
						as remembering form data you have previously entered.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">3. Third-Party Cookies</h2>
					<p className="mb-3">
						Some cookies are set by third-party services that appear on our pages.
						We use the following third-party services that may set cookies:
					</p>
					<ul className="list-disc pl-6 space-y-1.5">
						<li>
							<strong className="text-base-content">Google Analytics:</strong> for website traffic analysis and
							reporting. See{' '}
							<a
								href="https://policies.google.com/privacy"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								Google&apos;s Privacy Policy
							</a>
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">4. Managing Cookies</h2>
					<p className="mb-3">You can control and manage cookies in several ways:</p>
					<ul className="list-disc pl-6 space-y-1.5">
						<li>
							<strong className="text-base-content">Browser settings:</strong> most browsers allow you to view,
							manage, and delete cookies through their settings. Note that
							disabling essential cookies may affect the functionality of the
							website.
						</li>
						<li>
							<strong className="text-base-content">Google Analytics opt-out:</strong> you can install the{' '}
							<a
								href="https://tools.google.com/dlpage/gaoptout"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								Google Analytics opt-out browser add-on
							</a>{' '}
							to prevent your data from being used by Google Analytics.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">5. Do Not Track</h2>
					<p>
						Some browsers offer a &quot;Do Not Track&quot; (DNT) setting. There is currently
						no industry standard for how websites should respond to DNT signals. We
						do not currently respond to DNT signals, but we respect your right to
						manage cookies through the methods described above.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">6. Changes to This Policy</h2>
					<p>
						We may update this Cookie Policy from time to time. Changes will be
						posted on this page with an updated revision date.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">7. Contact</h2>
					<p>
						If you have any questions about our use of cookies, please reach out
						through our <a href={`/${locale}/contact`} className="text-primary hover:underline">contact page</a>.
					</p>
				</section>
			</div>
		</main>
	)
}
