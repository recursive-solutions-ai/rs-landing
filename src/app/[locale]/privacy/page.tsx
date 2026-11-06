'use client'

import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/i18n-utils'

export default function PrivacyPage() {
	const { t, locale } = useI18n()

	return (
		<main className="container mx-auto px-4 py-16 max-w-3xl">
			<header className="mb-12 border-b border-base-300 pb-8">
				<h1 className="text-4xl font-bold mb-2">{t('page.privacy.policy')}</h1>
				<p className="text-base-content/40 text-sm">Last updated: November 4, 2026</p>
			</header>

			<div className="space-y-10 text-base-content/80 leading-relaxed">
				<p>
					This Privacy Policy describes how Recursive Solutions collects, uses,
					stores, and protects your personal information when you visit our
					website or interact with our services.
				</p>

				<section id="google-data" className="scroll-mt-24">
					<h2 className="text-xl font-semibold text-base-content mb-3">Google connected accounts and Lucy</h2>
					<p className="mb-3">
						This policy also covers Lucy and the Growth Engine platform at growth-stack.recursive-solutions.com.
						Signing in with Google supplies account identity information such as your name, email address
						and profile picture. It does not by itself connect your mailbox or calendar. You choose each
						Google service separately and authorize its permissions on Google&apos;s consent screen.
					</p>
					<h3 className="text-lg font-medium text-base-content/90 mt-5 mb-2">Data accessed and how it is used</h3>
					<ul className="list-disc pl-6 space-y-2">
						<li><strong>Gmail:</strong> message content, subjects, sender and recipient addresses, threads,
							labels and mailbox metadata are used to display correspondence, recognize replies, classify
							email and prepare replies. Authorized features send messages and apply or remove labels,
							mark messages read and archive messages according to your instructions and mailbox rules.</li>
						<li><strong>Google Calendar:</strong> event titles, times, descriptions, attendees and meeting
							links are used to show upcoming events, check availability and create or update meetings.</li>
						<li><strong>Google Analytics:</strong> property and web-stream information and traffic,
							acquisition, page-performance and conversion reports support reporting and measurement
							setup. The setup feature can create a GA4 property and web data stream when requested.</li>
						<li><strong>Google Search Console:</strong> authorized site properties, search queries,
							clicks, impressions and positions support search-performance reports and SEO work.</li>
						<li><strong>Google Business Profile:</strong> where API access is available, authorized
							business accounts, locations, listing details, reviews and posts support the enabled
							business-profile features. Authorization does not guarantee Google API availability.</li>
					</ul>
					<h3 className="text-lg font-medium text-base-content/90 mt-5 mb-2">AI processing and service providers</h3>
					<p className="mb-3">
						Lucy uses AI to classify email, draft replies, summarize information and carry out the work
						you request. Relevant Google-derived content, including message text and correspondence
						metadata, may be sent to OpenRouter and the model providers that process the request.
						Email classification also uses TypeSafe&apos;s Jev service through OpenRouter. The model
						used depends on the feature and configured model selection. Our hosting, database and
						storage providers process stored records to operate these features.
					</p>
					<p className="mb-3">
						We do not use Google user data to train or fine-tune generalized AI models. Our OpenRouter
						account excludes paid and free endpoints that train on request data, excludes endpoints
						that publish prompts, and does not allow the input/output data-sharing discount.
						TypeSafe states that it does not train or fine-tune models on customer input. These
						training restrictions do not mean every provider has zero retention: processing, security
						and legal retention may apply under the provider&apos;s terms.
					</p>
					<p className="mb-3">
						Before connecting a mailbox, consider that its messages may contain other people&apos;s
						information. Only connect accounts you are authorized to use. You can review and control
						Lucy&apos;s mailbox behavior in Email rules and stop future connected-account access by
						disconnecting the account. If you do not want this processing, do not connect that service.
					</p>
					<h3 className="text-lg font-medium text-base-content/90 mt-5 mb-2">Google API Limited Use</h3>
					<p className="mb-3">
						Recursive Solutions&apos; use and transfer to any other app of information received from
						Google APIs will adhere to the{' '}
						<a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary hover:underline">Google API Services User Data Policy</a>,
						including the Limited Use requirements. Google user data is used to provide the
						user-facing features described here. We do not sell it or use it for advertising targeting,
						credit decisions or generalized AI training. Transfers are limited to providing these
						features with your consent, security purposes, legal requirements or other purposes
						expressly permitted by that policy. Human access is limited to your affirmative permission
						to inspect specific data, security investigations, legal obligations or the limited
						aggregated internal operations permitted by Google&apos;s policy.
					</p>
					<h3 className="text-lg font-medium text-base-content/90 mt-5 mb-2">Storage, disconnection and deletion</h3>
					<p className="mb-3">
						Access and refresh tokens are stored encrypted on our servers. We also store records needed
						for your workspace, including mailbox identifiers, message metadata and snippets,
						classifications, drafts, correspondence and derived CRM or reporting records. Access is
						controlled by account and business permissions, and data is transmitted over HTTPS.
					</p>
					<p className="mb-3">
						Disconnecting a service in Connections removes that stored connection and stops future
						access through it. You can also revoke authorization in{' '}
						<a href="https://myaccount.google.com/connections" className="text-primary hover:underline">your Google Account&apos;s third-party connections</a>.
						Disconnection does not automatically erase previously stored messages, drafts, reports,
						logs or derived records. We retain these only as needed to provide the service and meet
						security or legal obligations; copies held by service providers follow their retention terms.
					</p>
					<p>
						To request access, export or deletion of retained Google-derived data, email{' '}
						<a href="mailto:hello@recursive-solutions.com" className="text-primary hover:underline">hello@recursive-solutions.com</a>
						{' '}and identify your account and business. We respond within 30 days. We will explain
						any records that must be retained and any applicable legal exception rather than treating
						disconnection as a promise of immediate deletion.
					</p>
				</section>

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
							our <a href={localizedPath('/cookies', locale)} className="text-primary hover:underline">Cookie Policy</a>
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
							<strong className="text-base-content">Business platform and CRM providers</strong> that receive and
							store contact form submissions
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
						<a href={localizedPath('/contact', locale)} className="text-primary hover:underline">contact page</a>. We will respond to
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
						<a href={localizedPath('/contact', locale)} className="text-primary hover:underline">contact page</a>.
					</p>
				</section>
			</div>
		</main>
	)
}
