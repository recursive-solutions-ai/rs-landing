import { SITE_URL } from '@/lib/sitemap-shared'

/**
 * Central SEO / entity configuration.
 *
 * This data powers the site-wide Organization + WebSite JSON-LD that Google's
 * Knowledge Graph and AI answer engines (ChatGPT, Perplexity, Gemini) use to
 * identify and cite the business.
 */

export const ORG_NAME = 'Recursive Solutions'

export const ORG_DESCRIPTION =
	'AI consulting, advisory, and custom builds for service businesses. We help good people and great businesses not just survive the future — but thrive in it.'

/** Absolute URL to a logo image (used as Organization.logo). */
export const ORG_LOGO = `${SITE_URL}/logo-no-bg-with-text-dark.png`

/**
 * Public profiles that prove this is the same entity (Organization.sameAs).
 * 🔧 FILL THESE IN with your real URLs — LinkedIn company page, X/Twitter,
 * GitHub org, YouTube, Crunchbase, etc. The schema is valid while empty, but
 * `sameAs` is the strongest signal for entity disambiguation in Google's
 * Knowledge Panel and for AI engines linking facts back to you.
 */
export const ORG_SAME_AS: string[] = [
	// 'https://www.linkedin.com/company/recursive-solutions',
	// 'https://x.com/recursivesol',
]

/** Founders / key people — emitted as Organization.founder. */
export const ORG_PEOPLE = [
	{ name: 'Jake', jobTitle: 'CEO & Strategy' },
	{ name: 'Luc', jobTitle: 'COO & Operations' },
	{ name: 'Denis', jobTitle: 'CTO & AI Architecture' },
]

type JsonLd = Record<string, unknown>

/** Stable @id for the Organization so other nodes can reference it. */
export function orgId(): string {
	return `${SITE_URL}/#organization`
}

export function organizationLd(): JsonLd {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': orgId(),
		name: ORG_NAME,
		url: `${SITE_URL}/`,
		logo: ORG_LOGO,
		description: ORG_DESCRIPTION,
		...(ORG_SAME_AS.length > 0 ? { sameAs: ORG_SAME_AS } : {}),
		founder: ORG_PEOPLE.map((p) => ({
			'@type': 'Person',
			name: p.name,
			jobTitle: p.jobTitle,
		})),
	}
}

export function websiteLd(): JsonLd {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		url: `${SITE_URL}/`,
		name: ORG_NAME,
		description: ORG_DESCRIPTION,
		publisher: { '@id': orgId() },
		inLanguage: 'en',
	}
}

/** Build a BreadcrumbList from ordered [name, absolute-url] pairs. */
export function breadcrumbLd(items: { name: string; url: string }[]): JsonLd {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: item.url,
		})),
	}
}
