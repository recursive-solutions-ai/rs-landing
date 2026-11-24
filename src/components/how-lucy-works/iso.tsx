import type { ReactNode } from 'react'

/**
 * Isometric primitives for the village map.
 * Grid axes: +x runs to the screen's lower right, +y to the lower left, +z up.
 * Light comes from the top left: top face lightest, left face (the +y side)
 * mid, right face (the +x side) darkest.
 */

export const S = 27 // pixels per grid unit
export const N = 16 // platform is N x N grid units
export const OX = 600
export const OY = 235
const KX = 0.866
const KY = 0.5

export type P2 = [number, number]

const r1 = (n: number): number => Math.round(n * 10) / 10

export function iso(x: number, y: number, z = 0): P2 {
  return [r1(OX + (x - y) * KX * S), r1(OY + (x + y) * KY * S - z * S)]
}

export const pts = (ps: P2[]): string => ps.map(([a, b]) => `${a},${b}`).join(' ')

export const pathOf = (ps: [number, number][], z = 0): string =>
  ps
    .map(([x, y], i) => {
      const [a, b] = iso(x, y, z)
      return `${i === 0 ? 'M' : 'L'}${a},${b}`
    })
    .join(' ')

/* ---------- colour helpers ---------- */

function parse(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

export function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = parse(a)
  const [br, bg, bb] = parse(b)
  const c = (p: number, q: number): string =>
    Math.round(p + (q - p) * t)
      .toString(16)
      .padStart(2, '0')
  return `#${c(ar, br)}${c(ag, bg)}${c(ab, bb)}`
}

export type Tones = { top: string; left: string; right: string }

const SHADE = '#0b1230'

/** `base` is the colour of the lit top face; the sides are derived from it. */
export function tones(base: string): Tones {
  return {
    top: mix(base, '#ffffff', 0.08),
    left: mix(base, SHADE, 0.24),
    right: mix(base, SHADE, 0.52),
  }
}

/* ---------- planar helpers ---------- */

/** Quad on the +y face (the left-facing wall). u/v run 0..1 across x and z. */
export function wallL(
  x: number,
  y: number,
  w: number,
  z: number,
  h: number,
  u0: number,
  u1: number,
  v0: number,
  v1: number,
): P2[] {
  return [
    iso(x + w * u0, y, z + h * v1),
    iso(x + w * u1, y, z + h * v1),
    iso(x + w * u1, y, z + h * v0),
    iso(x + w * u0, y, z + h * v0),
  ]
}

/** Quad on the +x face (the right-facing wall). u runs across y. */
export function wallR(
  x: number,
  y: number,
  d: number,
  z: number,
  h: number,
  u0: number,
  u1: number,
  v0: number,
  v1: number,
): P2[] {
  return [
    iso(x, y + d * u0, z + h * v1),
    iso(x, y + d * u1, z + h * v1),
    iso(x, y + d * u1, z + h * v0),
    iso(x, y + d * u0, z + h * v0),
  ]
}

/* ---------- solids ---------- */

type BoxProps = {
  x: number
  y: number
  z?: number
  w: number
  d: number
  h: number
  c: Tones
  /** Draw a faint light edge on the top face. */
  edge?: boolean
}

/** Box with min corner (x, y, z). The viewer sees the top, the +y face and the +x face. */
export function IsoBox({ x, y, z = 0, w, d, h, c, edge = true }: BoxProps): ReactNode {
  const x1 = x + w
  const y1 = y + d
  const z1 = z + h
  const top = [iso(x, y, z1), iso(x1, y, z1), iso(x1, y1, z1), iso(x, y1, z1)]
  const left = [iso(x, y1, z1), iso(x1, y1, z1), iso(x1, y1, z), iso(x, y1, z)]
  const right = [iso(x1, y, z1), iso(x1, y1, z1), iso(x1, y1, z), iso(x1, y, z)]
  return (
    <g>
      <polygon points={pts(left)} fill={c.left} stroke={c.left} strokeWidth={0.7} strokeLinejoin="round" />
      <polygon points={pts(right)} fill={c.right} stroke={c.right} strokeWidth={0.7} strokeLinejoin="round" />
      <polygon
        points={pts(top)}
        fill={c.top}
        stroke={edge ? 'rgba(255,255,255,.28)' : c.top}
        strokeWidth={edge ? 0.8 : 0.7}
        strokeLinejoin="round"
      />
    </g>
  )
}

type CylProps = {
  cx: number
  cy: number
  z?: number
  r: number
  h: number
  c: Tones
  /** Unique gradient id. */
  gid: string
}

export const ellipseRx = (r: number): number => r1(1.2247 * r * S)
export const ellipseRy = (r: number): number => r1(0.7071 * r * S)

/** Upright cylinder; the side is shaded with a gradient from the lit left to the dark right. */
export function IsoCylinder({ cx, cy, z = 0, r, h, c, gid }: CylProps): ReactNode {
  const [sx, sb] = iso(cx, cy, z)
  const [, st] = iso(cx, cy, z + h)
  const rx = ellipseRx(r)
  const ry = ellipseRy(r)
  const side = `M${sx - rx},${st} L${sx - rx},${sb} A${rx},${ry} 0 0 0 ${sx + rx},${sb} L${sx + rx},${st} Z`
  return (
    <g>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={mix(c.left, '#ffffff', 0.1)} />
          <stop offset="0.38" stopColor={c.left} />
          <stop offset="1" stopColor={c.right} />
        </linearGradient>
      </defs>
      <path d={side} fill={`url(#${gid})`} />
      <ellipse cx={sx} cy={st} rx={rx} ry={ry} fill={c.top} stroke="rgba(255,255,255,.3)" strokeWidth={0.8} />
    </g>
  )
}

type RoofProps = {
  x: number
  y: number
  z: number
  w: number
  d: number
  h: number
  /** Eave overhang in grid units. */
  o?: number
  c: Tones
}

/** Gabled roof with the ridge along x. Draws the visible front slope and the right gable. */
export function IsoPrismRoof({ x, y, z, w, d, h, o = 0.18, c }: RoofProps): ReactNode {
  const ym = y + d / 2
  const x0 = x - o
  const x1 = x + w + o
  const yF = y + d + o
  const yB = y - o
  const frontSlope = [iso(x0, yF, z), iso(x1, yF, z), iso(x1, ym, z + h), iso(x0, ym, z + h)]
  const backSlope = [iso(x0, yB, z), iso(x1, yB, z), iso(x1, ym, z + h), iso(x0, ym, z + h)]
  const gable = [iso(x1, yF, z), iso(x1, yB, z), iso(x1, ym, z + h)]
  return (
    <g strokeLinejoin="round">
      <polygon points={pts(backSlope)} fill={c.top} stroke={c.top} strokeWidth={0.7} />
      <polygon points={pts(gable)} fill={c.right} stroke={c.right} strokeWidth={0.7} />
      <polygon points={pts(frontSlope)} fill={c.left} stroke="rgba(255,255,255,.22)" strokeWidth={0.8} />
    </g>
  )
}
