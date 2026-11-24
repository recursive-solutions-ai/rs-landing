import { describe, expect, it } from 'vitest'
import { paginationItems } from './pagination'

const E = 'ellipsis'

describe('paginationItems', () => {
	it('returns nothing for zero pages and one page for one', () => {
		expect(paginationItems(1, 0, 1)).toEqual([])
		expect(paginationItems(1, 1, 1)).toEqual([1])
		expect(paginationItems(1, 1, 0)).toEqual([1])
	})

	it('shows every page when they fit', () => {
		expect(paginationItems(1, 2, 0)).toEqual([1, 2])
		expect(paginationItems(2, 2, 1)).toEqual([1, 2])
		expect(paginationItems(3, 5, 0)).toEqual([1, 2, 3, 4, 5])
		expect(paginationItems(3, 7, 1)).toEqual([1, 2, 3, 4, 5, 6, 7])
	})

	it('siblings=0, total 7', () => {
		expect(paginationItems(1, 7, 0)).toEqual([1, 2, 3, E, 7])
		expect(paginationItems(4, 7, 0)).toEqual([1, E, 4, E, 7])
		expect(paginationItems(7, 7, 0)).toEqual([1, E, 5, 6, 7])
	})

	it('siblings=0, total 16', () => {
		expect(paginationItems(1, 16, 0)).toEqual([1, 2, 3, E, 16])
		expect(paginationItems(8, 16, 0)).toEqual([1, E, 8, E, 16])
		expect(paginationItems(16, 16, 0)).toEqual([1, E, 14, 15, 16])
	})

	it('siblings=1, total 16', () => {
		expect(paginationItems(1, 16, 1)).toEqual([1, 2, 3, 4, 5, E, 16])
		expect(paginationItems(8, 16, 1)).toEqual([1, E, 7, 8, 9, E, 16])
		expect(paginationItems(16, 16, 1)).toEqual([1, E, 12, 13, 14, 15, 16])
	})

	it('never hides a single page behind an ellipsis', () => {
		expect(paginationItems(4, 16, 1)).toEqual([1, 2, 3, 4, 5, E, 16])
		expect(paginationItems(5, 16, 1)).toEqual([1, E, 4, 5, 6, E, 16])
		expect(paginationItems(13, 16, 1)).toEqual([1, E, 12, 13, 14, 15, 16])
	})

	it('keeps a constant item count and includes first, last, current', () => {
		for (const s of [0, 1, 2]) {
			for (let cur = 1; cur <= 16; cur++) {
				const items = paginationItems(cur, 16, s)
				expect(items).toHaveLength(2 * s + 5)
				expect(items[0]).toBe(1)
				expect(items.at(-1)).toBe(16)
				expect(items).toContain(cur)
			}
		}
	})
})
