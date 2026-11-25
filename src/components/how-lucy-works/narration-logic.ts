/** Pure helpers for the narrated tour: caption timing, clip sequencing and time maths. No DOM, no audio. */

export type Chunk = { text: string; start: number; end: number }

const MAX_CHARS = 96

/** Split a script into sentences, keeping the end punctuation. */
export function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
}

/** Break one over-long sentence at the comma, colon or space nearest its middle, recursively. */
function breakLong(s: string, max: number): string[] {
  if (s.length <= max) return [s]
  const mid = s.length / 2
  let best = -1
  let bestScore = Infinity
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c !== ',' && c !== ':' && c !== ';' && c !== ' ') continue
    // Prefer punctuation over plain spaces.
    const score = Math.abs(i - mid) + (c === ' ' ? 18 : 0)
    if (score < bestScore) {
      bestScore = score
      best = i
    }
  }
  if (best <= 0 || best >= s.length - 1) return [s]
  const cut = s[best] === ' ' ? best : best + 1
  return [...breakLong(s.slice(0, cut).trim(), max), ...breakLong(s.slice(cut).trim(), max)]
}

/**
 * Caption chunks for a clip: sentence-sized pieces of at most `max` characters (about two lines),
 * with start/end times in seconds spread across `duration` in proportion to character count.
 */
export function captionChunks(text: string, duration: number, max = MAX_CHARS): Chunk[] {
  const pieces: string[] = []
  for (const sentence of splitSentences(text)) {
    for (const part of breakLong(sentence, max)) {
      const last = pieces[pieces.length - 1]
      // Merge a very short tail into the previous piece when it still fits.
      if (last !== undefined && part.length < 28 && last.length + 1 + part.length <= max) pieces[pieces.length - 1] = `${last} ${part}`
      else pieces.push(part)
    }
  }
  const total = pieces.reduce((n, p) => n + p.length, 0)
  if (total === 0) return []
  const out: Chunk[] = []
  let acc = 0
  for (const p of pieces) {
    const start = (acc / total) * duration
    acc += p.length
    out.push({ text: p, start, end: (acc / total) * duration })
  }
  return out
}

/** Index of the chunk showing at time `t` (clamped to the first and last chunk). */
export function chunkIndexAt(chunks: readonly Chunk[], t: number): number {
  if (chunks.length === 0) return -1
  for (let i = 0; i < chunks.length; i++) if (t < chunks[i].end) return i
  return chunks.length - 1
}

/** Neighbouring clip index, or null when stepping off either end. */
export function neighbourIndex(index: number, dir: 1 | -1, count: number): number | null {
  const n = index + dir
  return n < 0 || n >= count ? null : n
}

/** Start time of each clip on the whole-tour timeline. */
export function clipOffsets(durations: readonly number[]): number[] {
  const out: number[] = []
  let acc = 0
  for (const d of durations) {
    out.push(acc)
    acc += d
  }
  return out
}

export const sum = (xs: readonly number[]): number => xs.reduce((a, b) => a + b, 0)

/** Which clip, and how far into it, a point on the whole-tour timeline falls. */
export function locate(durations: readonly number[], t: number): { index: number; offset: number } {
  const offs = clipOffsets(durations)
  const total = sum(durations)
  const tt = Math.min(Math.max(0, t), total)
  for (let i = durations.length - 1; i >= 0; i--) {
    if (tt >= offs[i]) return { index: i, offset: Math.min(durations[i], tt - offs[i]) }
  }
  return { index: 0, offset: 0 }
}

export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.round(seconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** "3 min", rounded down so it agrees with the spoken "about three minutes" (never "0 min"). */
export function formatMinutes(seconds: number): string {
  return `${Math.max(1, Math.floor(seconds / 60))} min`
}

/** Nearest stop to a scroll position, or -1 when the position is more than `margin` outside the journey. */
export function nearestStopIndex(stops: readonly number[], y: number, margin: number): number {
  if (stops.length === 0) return -1
  if (y < stops[0] - margin || y > stops[stops.length - 1] + margin) return -1
  let best = 0
  for (let i = 1; i < stops.length; i++) if (Math.abs(stops[i] - y) < Math.abs(stops[best] - y)) best = i
  return best
}
