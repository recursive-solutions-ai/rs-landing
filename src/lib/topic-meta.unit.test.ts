import { describe, expect, it } from 'vitest'
import en from '@/i18n/dictionaries/en'
import fr from '@/i18n/dictionaries/fr'
import { topicMetaDescription, topicMetaTitle } from './topic-meta'

const words = 'Accounting automation for growing professional services firms and partners '
const labelOf = (n: number) => words.repeat(10).slice(0, n).trim()

const labels: Record<string, string> = {
	short: 'SEO',
	'45 chars': labelOf(45),
	'70 chars': labelOf(70),
	'200 chars': labelOf(200),
	'one long word': 'x'.repeat(90),
}

describe.each([
	['en', en],
	['fr', fr],
] as const)('topic meta (%s)', (_name, dict) => {
	for (const [name, label] of Object.entries(labels)) {
		it(`stays within limits for a ${name} label`, () => {
			for (const count of [2, 37]) {
				const title = topicMetaTitle(dict, label)
				const description = topicMetaDescription(dict, label, count)
				expect(title.length).toBeGreaterThanOrEqual(10)
				expect(title.length).toBeLessThanOrEqual(60)
				expect(description.length).toBeGreaterThanOrEqual(50)
				expect(description.length).toBeLessThanOrEqual(160)
				expect(title).not.toMatch(/\{\w+\}/)
				expect(description).not.toMatch(/\{\w+\}/)
			}
		})
	}

	it('prefers the full templates when they fit', () => {
		expect(topicMetaTitle(dict, 'SEO')).toContain('SEO')
		expect(topicMetaTitle(dict, 'SEO').length).toBeGreaterThan('SEO: articles'.length)
		expect(topicMetaDescription(dict, 'SEO', 5)).toContain('5')
	})

	it('falls back to the short title for a 45-char label', () => {
		const title = topicMetaTitle(dict, labels['45 chars'])
		expect(title).toContain(labels['45 chars'])
	})

	it('cuts an over-long label with an ellipsis', () => {
		const title = topicMetaTitle(dict, labels['200 chars'])
		expect(title.endsWith('…')).toBe(true)
	})
})
