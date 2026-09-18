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

		// Strip the locale prefix (if any) to get the bare path, then re-add the
		// target locale's prefix. The default language has NO prefix, so
		// switching to it produces `/blog`, not `/en/blog`.
		const segments = pathname.split('/')
		const firstSegment = segments[1] ?? ''
		const barePath = configLocales.includes(firstSegment)
			? pathname.slice(`/${firstSegment}`.length) || '/'
			: pathname

		router.push(localizedPath(barePath, newLocale))
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
