/** Pure keyboard logic for the town journey: which key means what, and which stop comes next. */
export type KeyIntent =
  | { kind: 'step'; dir: 1 | -1 }
  | { kind: 'first' }
  | { kind: 'last' }
  | { kind: 'district'; n: number }

type KeyLike = { key: string; shiftKey: boolean; altKey: boolean; ctrlKey: boolean; metaKey: boolean }

/** Map a key press to what it asks for, or null if it is not ours. Modifiers cancel it (except Shift+Space). */
export function intentOf(e: KeyLike): KeyIntent | null {
  if (e.altKey || e.ctrlKey || e.metaKey) return null
  const k = e.key
  if (k === ' ' || k === 'Spacebar') return { kind: 'step', dir: e.shiftKey ? -1 : 1 }
  if (e.shiftKey) return null
  switch (k) {
    case 'ArrowRight':
    case 'ArrowDown':
    case 'PageDown':
      return { kind: 'step', dir: 1 }
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'PageUp':
      return { kind: 'step', dir: -1 }
    case 'Home':
      return { kind: 'first' }
    case 'End':
      return { kind: 'last' }
  }
  if (/^[1-8]$/.test(k)) return { kind: 'district', n: Number(k) }
  return null
}

/**
 * From scroll position `y`, the index of the next/previous stop (stops are ascending scroll positions),
 * or 'after' / 'before' when there is none, meaning "leave the journey".
 */
export function stopTarget(stops: readonly number[], y: number, dir: 1 | -1, eps = 4): number | 'after' | 'before' {
  if (dir === 1) {
    const i = stops.findIndex((s) => s > y + eps)
    return i === -1 ? 'after' : i
  }
  for (let i = stops.length - 1; i >= 0; i--) if (stops[i] < y - eps) return i
  return 'before'
}
