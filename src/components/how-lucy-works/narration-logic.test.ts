import { describe, expect, it } from 'vitest'
import { narration } from './narration'
import { narrationDurations } from './narration-durations'
import { districts } from './content'
import {
  captionChunks,
  chunkIndexAt,
  clipOffsets,
  formatMinutes,
  formatTime,
  locate,
  nearestStopIndex,
  neighbourIndex,
  splitSentences,
  sum,
} from './narration-logic'

describe('caption chunks', () => {
  it('splits sentences and keeps punctuation', () => {
    expect(splitSentences('Hi, I am Lucy. Let me walk you through it. Ready?')).toEqual(['Hi, I am Lucy.', 'Let me walk you through it.', 'Ready?'])
  })

  it('covers the whole clip with contiguous, ordered chunks', () => {
    for (const c of narration) {
      const d = narrationDurations[c.id]
      const chunks = captionChunks(c.text, d)
      expect(chunks.length).toBeGreaterThan(0)
      expect(chunks[0].start).toBe(0)
      expect(chunks[chunks.length - 1].end).toBeCloseTo(d, 6)
      for (let i = 1; i < chunks.length; i++) expect(chunks[i].start).toBeCloseTo(chunks[i - 1].end, 6)
    }
  })

  it('never drops or reorders text and keeps each chunk to about two lines', () => {
    for (const c of narration) {
      const chunks = captionChunks(c.text, 10)
      expect(chunks.map((k) => k.text).join(' ').replace(/\s+/g, ' ')).toBe(c.text.replace(/\s+/g, ' ').trim())
      for (const k of chunks) expect(k.text.length).toBeLessThanOrEqual(130)
    }
  })

  it('times chunks in proportion to their character count', () => {
    const chunks = captionChunks('Aaa. Bbbbbbb.', 12, 10)
    expect(chunks).toHaveLength(2)
    expect(chunks[0].end - chunks[0].start).toBeCloseTo(4, 6)
    expect(chunks[1].end - chunks[1].start).toBeCloseTo(8, 6)
  })

  it('picks the chunk for a given time, clamped at both ends', () => {
    const chunks = captionChunks('One two three. Four five six. Seven eight nine.', 9, 20)
    expect(chunkIndexAt(chunks, -1)).toBe(0)
    expect(chunkIndexAt(chunks, 0)).toBe(0)
    expect(chunkIndexAt(chunks, 4)).toBe(1)
    expect(chunkIndexAt(chunks, 8.9)).toBe(2)
    expect(chunkIndexAt(chunks, 99)).toBe(2)
    expect(chunkIndexAt([], 1)).toBe(-1)
  })
})

describe('clip sequencing', () => {
  it('has intro, every district in order, then outro', () => {
    expect(narration.map((c) => c.id)).toEqual(['intro', ...districts.map((d) => d.id), 'outro'])
  })

  it('has a duration for every clip', () => {
    for (const c of narration) expect(narrationDurations[c.id]).toBeGreaterThan(5)
  })

  it('steps to neighbours and stops at the ends', () => {
    expect(neighbourIndex(0, 1, 12)).toBe(1)
    expect(neighbourIndex(5, -1, 12)).toBe(4)
    expect(neighbourIndex(0, -1, 12)).toBeNull()
    expect(neighbourIndex(11, 1, 12)).toBeNull()
  })

  it('maps tour time to a clip and offset', () => {
    const d = [10, 20, 30]
    expect(clipOffsets(d)).toEqual([0, 10, 30])
    expect(locate(d, 0)).toEqual({ index: 0, offset: 0 })
    expect(locate(d, 10)).toEqual({ index: 1, offset: 0 })
    expect(locate(d, 25)).toEqual({ index: 1, offset: 15 })
    expect(locate(d, 59)).toEqual({ index: 2, offset: 29 })
    expect(locate(d, 500)).toEqual({ index: 2, offset: 30 })
    expect(locate(d, -5)).toEqual({ index: 0, offset: 0 })
    expect(sum(d)).toBe(60)
  })

  it('formats times', () => {
    expect(formatTime(0)).toBe('0:00')
    expect(formatTime(75.4)).toBe('1:15')
    expect(formatMinutes(219)).toBe('3 min')
    expect(formatMinutes(10)).toBe('1 min')
  })
})

describe('nearest stop', () => {
  const stops = [100, 300, 500, 700]
  it('snaps to the closest stop', () => {
    expect(nearestStopIndex(stops, 100, 50)).toBe(0)
    expect(nearestStopIndex(stops, 390, 50)).toBe(1)
    expect(nearestStopIndex(stops, 410, 50)).toBe(2)
    expect(nearestStopIndex(stops, 720, 50)).toBe(3)
  })
  it('returns -1 well outside the journey', () => {
    expect(nearestStopIndex(stops, 20, 50)).toBe(-1)
    expect(nearestStopIndex(stops, 800, 50)).toBe(-1)
    expect(nearestStopIndex(stops, 60, 50)).toBe(0)
    expect(nearestStopIndex([], 1, 50)).toBe(-1)
  })
})
