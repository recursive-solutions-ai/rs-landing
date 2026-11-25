import { FOCUS, H, W, type Rect } from './TownScene'
import type { DistrictId } from './content'

/**
 * Camera maths for the town journey. The camera is a rectangle of the scene
 * (an SVG viewBox) with the same aspect ratio as the stage. A camera state is:
 *   fx, fy : the scene point we are looking at
 *   ax     : where that point sits across the stage (0 = left edge, 0.5 = centre)
 *   z      : zoom, 1 = whole town
 */
export type Cam = { fx: number; fy: number; ax: number; z: number }

/** Share of the stage width the focused building is centred on. */
export const FOCUS_AX = 0.22
/** Building fills at most this share of the stage width / height. */
const MAX_W = 0.34
const MAX_H = 0.66

export const OVERVIEW: Cam = { fx: W / 2, fy: H / 2, ax: 0.5, z: 1 }

export function focusCam(id: DistrictId): Cam {
  const r: Rect = FOCUS[id]
  const z = Math.max(1.15, Math.min((MAX_W * W) / r.w, (MAX_H * H) / r.h))
  return { fx: r.x + r.w / 2, fy: r.y + r.h / 2, ax: FOCUS_AX, z }
}

/** ViewBox rect for a camera state. */
export function rectOf(c: Cam): Rect {
  const w = W / c.z
  const h = H / c.z
  return { x: c.fx - c.ax * w, y: c.fy - 0.5 * h, w, h }
}

export const viewBoxOf = (c: Cam): string => {
  const r = rectOf(c)
  return `${r.x.toFixed(2)} ${r.y.toFixed(2)} ${r.w.toFixed(2)} ${r.h.toFixed(2)}`
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

/** Smooth start and end; used for every camera move. */
export const easeSmooth = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10)

/**
 * Fly from one camera state to another. `zMid` pulls the camera back part of
 * the way (the zoom at the half-way point); `bump` slides the focus point to the
 * middle of the stage there so both ends can be seen.
 */
export function fly(a: Cam, b: Cam, p: number, zMid?: number, bump = false): Cam {
  const e = easeSmooth(Math.min(1, Math.max(0, p)))
  const lz = lerp(Math.log(a.z), Math.log(b.z), e)
  const k = zMid ? lerp(Math.log(a.z), Math.log(b.z), 0.5) - Math.log(zMid) : 0
  const s = Math.sin(Math.PI * e)
  const axBase = lerp(a.ax, b.ax, e)
  return {
    fx: lerp(a.fx, b.fx, e),
    fy: lerp(a.fy, b.fy, e),
    ax: bump ? axBase + (0.5 - axBase) * s : axBase,
    z: Math.exp(lz - k * s),
  }
}

/** Zoom at the half-way point of a hop between two buildings: wide enough to see both. */
export function hopZoom(a: Cam, b: Cam): number {
  const dx = Math.abs(a.fx - b.fx)
  const dy = Math.abs(a.fy - b.fy)
  const fit = Math.min((W * 0.86) / (dx + 330), (H * 0.8) / (dy + 260))
  return Math.max(1, Math.min(fit, Math.min(a.z, b.z) * 0.72))
}
