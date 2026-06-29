import { describe, it, expect } from 'vitest'
import { LUCY_STAGES, clampStageIndex } from './stages'

describe('LUCY_STAGES', () => {
	it('has five stages with markers 01–05', () => {
		expect(LUCY_STAGES.map((s) => s.marker)).toEqual(['01', '02', '03', '04', '05'])
	})
	it('every stage has a non-empty label and caption', () => {
		for (const s of LUCY_STAGES) {
			expect(s.label.length).toBeGreaterThan(0)
			expect(s.caption.length).toBeGreaterThan(0)
		}
	})
})

describe('clampStageIndex', () => {
	it('passes through valid indices', () => {
		expect(clampStageIndex(0)).toBe(0)
		expect(clampStageIndex(4)).toBe(4)
	})
	it('clamps below range to 0', () => {
		expect(clampStageIndex(-5)).toBe(0)
	})
	it('clamps above range to the last index', () => {
		expect(clampStageIndex(99)).toBe(4)
	})
	it('treats NaN as 0', () => {
		expect(clampStageIndex(Number.NaN)).toBe(0)
	})
})
