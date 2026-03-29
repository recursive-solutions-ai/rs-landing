'use client'

import { useI18n } from '@/i18n/client'

export default function LegalPage() {
	const { t, locale } = useI18n()

	return (
		<main className="container mx-auto px-4 py-16 max-w-3xl">
			<header className="mb-12 border-b border-base-300 pb-8">
				<h1 className="text-4xl font-bold mb-2">{t('page.terms.of.service')}</h1>
				<p className="text-base-content/40 text-sm">Last updated: March 2026</p>
			</header>

			<div className="space-y-10 text-base-content/80 leading-relaxed">
				<p>
					Please read these Terms of Service carefully before using our website.
					By accessing or using the site, you agree to be bound by these terms.
					If you do not agree, you should not use the site.
				</p>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">1. Acceptance of Terms</h2>
					<p>
						By accessing this website, you confirm that you are at least 18 years
						old and that you agree to comply with and be bound by these Terms of
						Service, as well as our{' '}
						<a href={`/${locale}/privacy`} className="text-primary hover:underline">Privacy Policy</a> and{' '}
						<a href={`/${locale}/cookies`} className="text-primary hover:underline">Cookie Policy</a>, which are
						incorporated by reference.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">2. Use of the Website</h2>
					<p className="mb-3">You agree to use this website only for lawful purposes. You must not:</p>
					<ul className="list-disc pl-6 space-y-1.5">
						<li>Use the site in any way that violates applicable laws or regulations</li>
						<li>Attempt to gain unauthorized access to any part of the site or its systems</li>
						<li>Use automated tools to scrape, crawl, or index the site without permission</li>
						<li>Transmit any material that is defamatory, offensive, or otherwise objectionable</li>
						<li>Interfere with or disrupt the operation of the site</li>
					</ul>
					<p className="mt-3">
						We reserve the right to restrict or terminate your access to the site
						at any time, without notice, if we believe you are in violation of
						these terms.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">3. Intellectual Property</h2>
					<p>
						All content on this website — including but not limited to text,
						graphics, logos, images, software, and design — is the property of
						Recursive Solutions or its licensors and is protected by applicable
						intellectual property laws. You may not reproduce, distribute, modify,
						or create derivative works from any content without prior written
						consent.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">4. Services and Consulting</h2>
					<p>
						Information about our services, including AI consulting, advisory, and
						custom builds, is provided for general informational purposes. Formal
						engagements are governed by separate agreements. Nothing on this site
						constitutes a binding offer or contract unless explicitly stated in a
						signed agreement.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">5. Third-Party Links</h2>
					<p>
						This site may contain links to third-party websites or services. We
						are not responsible for the content, accuracy, or practices of those
						sites. Accessing third-party links is at your own risk.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">6. Disclaimer of Warranties</h2>
					<p>
						This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis,
						without warranties of any kind, either express or implied, including
						but not limited to implied warranties of merchantability, fitness for
						a particular purpose, or non-infringement. We do not warrant that the
						site will be uninterrupted, error-free, or free of harmful components.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">7. Limitation of Liability</h2>
					<p>
						To the fullest extent permitted by law, Recursive Solutions shall not
						be liable for any indirect, incidental, special, consequential, or
						punitive damages arising out of or relating to your use of the site,
						including but not limited to loss of profits, data, or goodwill.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">8. Indemnification</h2>
					<p>
						You agree to indemnify and hold harmless Recursive Solutions, its
						officers, employees, and agents from any claims, damages, losses, or
						expenses arising from your use of the site or your violation of these
						terms.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">9. Governing Law</h2>
					<p>
						These terms are governed by and construed in accordance with the laws
						of the jurisdiction in which Recursive Solutions operates. Any disputes
						shall be resolved in the courts of that jurisdiction.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">10. Changes to These Terms</h2>
					<p>
						We may update these Terms of Service from time to time. Changes will
						be posted on this page with an updated revision date. Your continued
						use of the site after changes constitutes acceptance of the revised
						terms.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-base-content mb-3">11. Contact</h2>
					<p>
						If you have any questions about these terms, please reach out through
						our <a href={`/${locale}/contact`} className="text-primary hover:underline">contact page</a>.
					</p>
				</section>
			</div>
		</main>
	)
}
