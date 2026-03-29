'use client'

import { useI18n } from '@/i18n/client'

export default function PrivacyPage() {
	const { t, locale } = useI18n()

	return (
		<main className="container mx-auto px-4 py-16 max-w-3xl">
			<header className="mb-12">
				<h1 className="text-4xl font-bold mb-3">{t('page.privacy.policy')}</h1>
				<p className="text-base-content/50 text-sm">Last updated: March 2026</p>
			</header>

			<div className="prose prose-headings:text-base-content prose-p:text-base-content/80 prose-li:text-base-content/80 prose-a:text-primary max-w-none">
				<p>
					This Privacy Policy describes how Recursive Solutions collects, uses,
					stores, and protects your personal information when you visit our
					website or interact with our services.
				</p>

				<h2>1. Information We Collect</h2>

				<h3>Information you provide</h3>
				<ul>
					<li>
						<strong>Contact form submissions:</strong> name, email address, and
						message content when you reach out through our contact form
					</li>
					<li>
						<strong>Email correspondence:</strong> any information you share
						when communicating with us directly
					</li>
				</ul>

				<h3>Information collected automatically</h3>
				<ul>
					<li>
						<strong>Usage data:</strong> pages visited, time spent on pages,
						referring URLs, and navigation patterns
					</li>
					<li>
						<strong>Device information:</strong> browser type, operating system,
						screen resolution, and language preferences
					</li>
					<li>
						<strong>Cookies and similar technologies:</strong> as described in
						our <a href={`/${locale}/cookies`}>Cookie Policy</a>
					</li>
				</ul>

				<h2>2. How We Use Your Information</h2>
				<p>We use the information we collect to:</p>
				<ul>
					<li>Respond to your inquiries and provide customer support</li>
					<li>Operate, maintain, and improve our website</li>
					<li>Analyze usage trends and visitor behavior to enhance the user experience</li>
					<li>Send relevant communications if you have opted in</li>
					<li>Protect against fraudulent or unauthorized activity</li>
					<li>Comply with legal obligations</li>
				</ul>

				<h2>3. Legal Basis for Processing</h2>
				<p>We process your personal data based on one or more of the following:</p>
				<ul>
					<li>
						<strong>Consent:</strong> when you voluntarily submit information
						through our contact form or accept analytics cookies
					</li>
					<li>
						<strong>Legitimate interest:</strong> to operate and improve our
						website and services
					</li>
					<li>
						<strong>Legal obligation:</strong> when required to comply with
						applicable laws
					</li>
				</ul>

				<h2>4. Data Sharing and Third Parties</h2>
				<p>
					We do not sell, rent, or trade your personal information. We may share
					data with the following categories of service providers:
				</p>
				<ul>
					<li>
						<strong>Analytics providers</strong> (e.g., Google Analytics) to
						understand site usage
					</li>
					<li>
						<strong>Email service providers</strong> (e.g., Resend) to process
						contact form submissions
					</li>
					<li>
						<strong>Hosting and infrastructure providers</strong> that support
						our website operations
					</li>
				</ul>
				<p>
					These providers are contractually obligated to protect your data and
					may only use it for the purposes we specify.
				</p>

				<h2>5. Data Retention</h2>
				<p>
					We retain personal information only as long as necessary to fulfill the
					purposes described in this policy, or as required by law. Contact form
					submissions are retained for up to 24 months. Analytics data is
					retained according to our analytics provider&apos;s standard retention
					periods.
				</p>

				<h2>6. Data Security</h2>
				<p>
					We implement appropriate technical and organizational measures to
					protect your personal information against unauthorized access,
					alteration, disclosure, or destruction. However, no method of
					transmission over the internet is completely secure, and we cannot
					guarantee absolute security.
				</p>

				<h2>7. Your Rights</h2>
				<p>
					Depending on your location, you may have the following rights regarding
					your personal data:
				</p>
				<ul>
					<li><strong>Access:</strong> request a copy of the data we hold about you</li>
					<li><strong>Correction:</strong> request that we correct inaccurate data</li>
					<li><strong>Deletion:</strong> request that we delete your personal data</li>
					<li><strong>Portability:</strong> request your data in a structured, machine-readable format</li>
					<li><strong>Objection:</strong> object to processing based on legitimate interests</li>
					<li><strong>Withdrawal of consent:</strong> withdraw consent at any time where processing is based on consent</li>
				</ul>
				<p>
					To exercise any of these rights, please contact us through our{' '}
					<a href={`/${locale}/contact`}>contact page</a>. We will respond to
					your request within 30 days.
				</p>

				<h2>8. International Data Transfers</h2>
				<p>
					Your information may be transferred to and processed in countries other
					than your own. We ensure appropriate safeguards are in place to protect
					your data in accordance with applicable data protection laws.
				</p>

				<h2>9. Children&apos;s Privacy</h2>
				<p>
					Our website is not directed at individuals under the age of 18. We do
					not knowingly collect personal information from children. If you
					believe we have inadvertently collected such information, please
					contact us so we can promptly delete it.
				</p>

				<h2>10. Changes to This Policy</h2>
				<p>
					We may update this Privacy Policy from time to time. Changes will be
					posted on this page with an updated revision date. We encourage you to
					review this page periodically.
				</p>

				<h2>11. Contact</h2>
				<p>
					If you have any questions or concerns about this Privacy Policy or our
					data practices, please reach out through our{' '}
					<a href={`/${locale}/contact`}>contact page</a>.
				</p>
			</div>
		</main>
	)
}
