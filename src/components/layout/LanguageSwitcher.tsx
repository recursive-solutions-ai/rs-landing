'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/client'
import { supportedLocales as configLocales } from '@/i18n/config'
import { localizedPath } from '@/lib/i18n-utils'
import type { DictionaryKey } from '@/i18n/dictionaries/en'

export function LanguageSwitcher() {
	const { locale, t, supportedLocales } = useI18n()
	const pathname = usePathname()
	const router = useRouter()

	if (supportedLocales.length <= 1) {
		return null
	}

	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const newLocale = e.target.value

		// Check if the current path starts with a locale prefix
		const segments = pathname.split('/')
		const firstSegment = segments[1] ?? ''
		const hasLocalePrefix = configLocales.includes(firstSegment)

		let newPath: string

		if (hasLocalePrefix) {
			const barePath = `/${segments.slice(2).join('/')}`.replace(/\/$/, '') || '/'
			newPath = localizedPath(barePath, newLocale)
		} else {
			newPath = localizedPath(pathname, newLocale)
		}

		router.push(newPath)
	}

	return (
		<select
			className="select select-sm select-bordered"
			value={locale}
			onChange={handleChange}
			aria-label="Select language"
		>
			{supportedLocales.map((loc) => {
				const labelKey = `lang.${loc}` as DictionaryKey
				const label = t(labelKey)
				return (
					<option key={loc} value={loc}>
						{label}
					</option>
				)
			})}
		</select>
	)
}
