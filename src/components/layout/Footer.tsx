'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/client'

export function Footer() {
	const { t, locale } = useI18n()
	const year = new Date().getFullYear()

	return (
		<footer className="bg-base-200 border-t border-base-300">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="font-bold text-lg mb-2">{'Recursive Solutions'}</h3>
						<p className="text-base-content/60 text-sm">
							{t('footer.powered.by')}
						</p>
						<a
							href="mailto:team@recursive-solutions.com"
							className="mt-3 inline-block text-sm text-base-content/60 hover:text-primary"
						>
							team@recursive-solutions.com
						</a>
					</div>

					<div>
						<h4 className="font-semibold mb-2">{t('footer.navigation')}</h4>
						<nav className="flex flex-col gap-1">
							<Link href={`/${locale}/lucy`} className="text-sm text-base-content/60 hover:text-primary">Lucy</Link>
							<Link href={`/${locale}#process`} className="text-sm text-base-content/60 hover:text-primary">Process</Link>
							<Link href={`/${locale}#field-reports`} className="text-sm text-base-content/60 hover:text-primary">Results</Link>
							<Link href={`/${locale}#team`} className="text-sm text-base-content/60 hover:text-primary">Team</Link>
							<Link href={`/${locale}#offerings`} className="text-sm text-base-content/60 hover:text-primary">Offerings</Link>
							<Link href={`/${locale}/blog`} className="text-sm text-base-content/60 hover:text-primary">Blog</Link>
							<Link href={`/${locale}#contact`} className="text-sm text-base-content/60 hover:text-primary">Contact</Link>
						</nav>
					</div>

					{/* Pinned to the last column while the middle nav sections are hidden. */}
					<div className="md:col-start-4">
						<h4 className="font-semibold mb-2">{t('footer.legal')}</h4>
						<nav className="flex flex-col gap-1">
							<Link href={`/${locale}/legal`} className="text-sm text-base-content/60 hover:text-primary">{t('footer.legal.notice')}</Link>
							<Link href={`/${locale}/privacy`} className="text-sm text-base-content/60 hover:text-primary">{t('footer.privacy.policy')}</Link>
							<Link href={`/${locale}/cookies`} className="text-sm text-base-content/60 hover:text-primary">{t('footer.cookie.policy')}</Link>
						</nav>
					</div>
				</div>

				<div className="divider" />

				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-base-content/50">
						{t('footer.copyright', { year: String(year) })}
					</p>
				</div>
			</div>
		</footer>
	)
}
