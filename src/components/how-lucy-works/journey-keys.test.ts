import { describe, expect, it } from 'vitest'
import { intentOf, stopTarget } from './journey-keys'

const k = (key: string, m: Partial<{ shiftKey: boolean; altKey: boolean; ctrlKey: boolean; metaKey: boolean }> = {}) =>
  intentOf({ key, shiftKey: false, altKey: false, ctrlKey: false, metaKey: false, ...m })

describe('journey keys', () => {
  const stops = [100, 300, 500, 700]
  it('moves to the next and previous stop', () => {
    expect(stopTarget(stops, 100, 1)).toBe(1)
    expect(stopTarget(stops, 350, 1)).toBe(2)
    expect(stopTarget(stops, 350, -1)).toBe(1)
    expect(stopTarget(stops, 300, -1)).toBe(0)
  })
  it('tolerates sub-pixel drift on a stop', () => {
    expect(stopTarget(stops, 301.5, 1)).toBe(2)
    expect(stopTarget(stops, 298.5, -1)).toBe(0)
  })
  it('leaves the journey at either end', () => {
    expect(stopTarget(stops, 700, 1)).toBe('after')
    expect(stopTarget(stops, 100, -1)).toBe('before')
  })
  it('maps keys', () => {
    expect(k('ArrowRight')).toEqual({ kind: 'step', dir: 1 })
    expect(k('PageUp')).toEqual({ kind: 'step', dir: -1 })
    expect(k(' ')).toEqual({ kind: 'step', dir: 1 })
    expect(k(' ', { shiftKey: true })).toEqual({ kind: 'step', dir: -1 })
    expect(k('6')).toEqual({ kind: 'district', n: 6 })
    expect(k('9')).toBeNull()
    expect(k('ArrowRight', { metaKey: true })).toBeNull()
    expect(k('ArrowRight', { shiftKey: true })).toBeNull()
    expect(k('a')).toBeNull()
  })
})
