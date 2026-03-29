'use client'

import { useI18n } from '@/i18n/client'

export default function PrivacyPage() {
	const { t, locale } = useI18n()

	return (
		<main className="container mx-auto px-4 py-16 max-w-3xl">
			<header className="mb-12 border-b border-base-300 pb-8">
				<h1 className="text-4xl font-bold mb-2">{t('page.privacy.policy')}</h1>
				<p className="text-base-content/40 text-sm">Last updated: March 2026</p>
			</header>

			<div className="space-y-10 text-base-content/80 leading-relaxed">
				<p>
					This Privacy Policy describes how Recursive Solutions collects, uses,
					stores, and protects your personal information when you visit our
					website or interact with our services.
				</p>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">1. Information We Collect</h2>

					<h3 className="text-lg font-medium text-base-content/90 mt-5 mb-2">Information you provide</h3>
					<ul className="list-disc pl-6 space-y-1.5">
						<li>
							<strong className="text-base-content">Contact form submissions:</strong> name, email address, and
							message content when you reach out through our contact form
						</li>
						<li>
							<strong className="text-base-content">Email correspondence:</strong> any information you share
							when communicating with us directly
						</li>
					</ul>

					<h3 className="text-lg font-medium text-base-content/90 mt-5 mb-2">Information collected automatically</h3>
					<ul className="list-disc pl-6 space-y-1.5">
						<li>
							<strong className="text-base-content">Usage data:</strong> pages visited, time spent on pages,
							referring URLs, and navigation patterns
						</li>
						<li>
							<strong className="text-base-content">Device information:</strong> browser type, operating system,
							screen resolution, and language preferences
						</li>
						<li>
							<strong className="text-base-content">Cookies and similar technologies:</strong> as described in
							our <a href={`/${locale}/cookies`} className="text-primary hover:underline">Cookie Policy</a>
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">2. How We Use Your Information</h2>
					<p className="mb-3">We use the information we collect to:</p>
					<ul className="list-disc pl-6 space-y-1.5">
						<li>Respond to your inquiries and provide customer support</li>
						<li>Operate, maintain, and improve our website</li>
						<li>Analyze usage trends and visitor behavior to enhance the user experience</li>
						<li>Send relevant communications if you have opted in</li>
						<li>Protect against fraudulent or unauthorized activity</li>
						<li>Comply with legal obligations</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">3. Legal Basis for Processing</h2>
					<p className="mb-3">We process your personal data based on one or more of the following:</p>
					<ul className="list-disc pl-6 space-y-1.5">
						<li>
							<strong className="text-base-content">Consent:</strong> when you voluntarily submit information
							through our contact form or accept analytics cookies
						</li>
						<li>
							<strong className="text-base-content">Legitimate interest:</strong> to operate and improve our
							website and services
						</li>
						<li>
							<strong className="text-base-content">Legal obligation:</strong> when required to comply with
							applicable laws
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">4. Data Sharing and Third Parties</h2>
					<p className="mb-3">
						We do not sell, rent, or trade your personal information. We may share
						data with the following categories of service providers:
					</p>
					<ul className="list-disc pl-6 space-y-1.5">
						<li>
							<strong className="text-base-content">Analytics providers</strong> (e.g., Google Analytics) to
							understand site usage
						</li>
						<li>
							<strong className="text-base-content">Email service providers</strong> (e.g., Resend) to process
							contact form submissions
						</li>
						<li>
							<strong className="text-base-content">Hosting and infrastructure providers</strong> that support
							our website operations
						</li>
					</ul>
					<p className="mt-3">
						These providers are contractually obligated to protect your data and
						may only use it for the purposes we specify.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">5. Data Retention</h2>
					<p>
						We retain personal information only as long as necessary to fulfill the
						purposes described in this policy, or as required by law. Contact form
						submissions are retained for up to 24 months. Analytics data is
						retained according to our analytics provider&apos;s standard retention
						periods.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">6. Data Security</h2>
					<p>
						We implement appropriate technical and organizational measures to
						protect your personal information against unauthorized access,
						alteration, disclosure, or destruction. However, no method of
						transmission over the internet is completely secure, and we cannot
						guarantee absolute security.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">7. Your Rights</h2>
					<p className="mb-3">
						Depending on your location, you may have the following rights regarding
						your personal data:
					</p>
					<ul className="list-disc pl-6 space-y-1.5">
						<li><strong className="text-base-content">Access:</strong> request a copy of the data we hold about you</li>
						<li><strong className="text-base-content">Correction:</strong> request that we correct inaccurate data</li>
						<li><strong className="text-base-content">Deletion:</strong> request that we delete your personal data</li>
						<li><strong className="text-base-content">Portability:</strong> request your data in a structured, machine-readable format</li>
						<li><strong className="text-base-content">Objection:</strong> object to processing based on legitimate interests</li>
						<li><strong className="text-base-content">Withdrawal of consent:</strong> withdraw consent at any time where processing is based on consent</li>
					</ul>
					<p className="mt-3">
						To exercise any of these rights, please contact us through our{' '}
						<a href={`/${locale}/contact`} className="text-primary hover:underline">contact page</a>. We will respond to
						your request within 30 days.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">8. International Data Transfers</h2>
					<p>
						Your information may be transferred to and processed in countries other
						than your own. We ensure appropriate safeguards are in place to protect
						your data in accordance with applicable data protection laws.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">9. Children&apos;s Privacy</h2>
					<p>
						Our website is not directed at individuals under the age of 18. We do
						not knowingly collect personal information from children. If you
						believe we have inadvertently collected such information, please
						contact us so we can promptly delete it.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">10. Changes to This Policy</h2>
					<p>
						We may update this Privacy Policy from time to time. Changes will be
						posted on this page with an updated revision date. We encourage you to
						review this page periodically.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">11. Contact</h2>
					<p>
						If you have any questions or concerns about this Privacy Policy or our
						data practices, please reach out through our{' '}
						<a href={`/${locale}/contact`} className="text-primary hover:underline">contact page</a>.
					</p>
				</section>
			</div>
		</main>
	)
}
