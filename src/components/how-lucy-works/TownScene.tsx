import { memo, type CSSProperties, type ReactNode, type Ref } from 'react'
import { districts, type District, type DistrictId } from './content'
import { BUILDINGS, type BuildingSpec } from './buildings'
import { N, iso, pathOf, pts, S, type P2 } from './iso'
import { STAGE_TINT, STEP_NO } from './accents'

export const W = 1200
export const H = 780
export const FULL_VIEWBOX = `0 0 ${W} ${H}`
export const SCENE_ID = 'hlw-scene'
const FOUNDATION_COLOUR = '#7f9cf5'
const THICK = 0.75

/** Colour per district, from the building registry (foundation is the platform). */
export const COLOUR: Record<DistrictId, string> = {
  foundation: FOUNDATION_COLOUR,
  watchtower: '#c9d3ea',
  press: '#58c2c9',
  dish: '#e2b25a',
  studio: '#e58fb8',
  yard: '#e6c65a',
  lane: '#9fc4ff',
  house: '#8fa8f0',
  silo: '#7fd69a',
  gate: '#4ade80',
}

export type Rect = { x: number; y: number; w: number; h: number }

/**
 * Camera rectangle per district, in viewBox units: the area the focused building
 * (or, for the foundation, the front edge of the platform) should fill.
 */
export const FOCUS: Record<DistrictId, Rect> = {
  foundation: { x: 235, y: 445, w: 240, h: 175 },
  watchtower: { x: 345, y: 160, w: 100, h: 285 },
  dish: { x: 412, y: 205, w: 140, h: 180 },
  press: { x: 647, y: 251, w: 120, h: 138 },
  studio: { x: 726, y: 304, w: 123, h: 135 },
  yard: { x: 815, y: 368, w: 123, h: 125 },
  lane: { x: 616, y: 391, w: 170, h: 155 },
  house: { x: 642, y: 497, w: 107, h: 110 },
  silo: { x: 470, y: 330, w: 260, h: 190 },
  gate: { x: 547, y: 526, w: 93, h: 135 },
}

/* ---------- the numbered route ---------- */

type G = [number, number]

/** Where each numbered stop sits on the platform (grid units), in process order. */
export const STOPS: { id: DistrictId; at: G }[] = [
  { id: 'foundation', at: [3.7, 14.6] },
  { id: 'watchtower', at: [3.7, 11.0] },
  { id: 'dish', at: [3.7, 6.8] },
  { id: 'press', at: [3.7, 4.2] },
  { id: 'studio', at: [10.2, 4.2] },
  { id: 'yard', at: [13.0, 4.2] },
  { id: 'lane', at: [13.0, 6.8] },
  { id: 'house', at: [14.7, 12.5] },
]

/** Corner points the route passes through between stops. */
const VIA: Partial<Record<DistrictId, G[]>> = {
  house: [[13.0, 12.5]],
}

const SILO_AT: G = [8, 8]

type Leg = { to: DistrictId; pts: G[] }
const LEGS: Leg[] = STOPS.slice(1).map((s, i) => ({
  to: s.id,
  pts: [STOPS[i].at, ...(VIA[s.id] ?? []), s.at],
}))
const ROUTE_ALL: G[] = [STOPS[0].at, ...LEGS.flatMap((l) => l.pts.slice(1))]

const SPOKES: { id: DistrictId; to: G }[] = BUILDINGS.filter((b) => b.id !== 'silo').map((b) => ({ id: b.id, to: b.centre }))

const GATE_OUT: G[] = [
  [14.6, 15.3],
  [14.6, 26],
]
const PERIMETER: G[] = [
  [0.5, 0.5],
  [N - 0.5, 0.5],
  [N - 0.5, N - 0.5],
  [0.5, N - 0.5],
  [0.5, 0.5],
]

/** Midpoint (by length) of a grid polyline, with the screen angle of the segment there. */
function arrowAt(ps: G[]): { at: P2; angle: number } {
  const lens: number[] = []
  let total = 0
  for (let i = 1; i < ps.length; i += 1) {
    const l = Math.hypot(ps[i][0] - ps[i - 1][0], ps[i][1] - ps[i - 1][1])
    lens.push(l)
    total += l
  }
  let want = total / 2
  for (let i = 0; i < lens.length; i += 1) {
    if (want <= lens[i] || i === lens.length - 1) {
      const t = Math.min(1, want / lens[i])
      const a = ps[i]
      const b = ps[i + 1]
      const p = iso(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
      const pa = iso(a[0], a[1])
      const pb = iso(b[0], b[1])
      return { at: p, angle: (Math.atan2(pb[1] - pa[1], pb[0] - pa[0]) * 180) / Math.PI }
    }
    want -= lens[i]
  }
  return { at: iso(ps[0][0], ps[0][1]), angle: 0 }
}

const stageOfId = (id: DistrictId): District['stage'] => districts.find((d) => d.id === id)?.stage ?? 'found'

function Dot({ path, colour, dur, begin }: { path: string; colour: string; dur: number; begin: number }): ReactNode {
  const b = `${begin}s`
  return (
    <g className="vm-dot" opacity={0}>
      <circle r={8} fill={colour} opacity={0.2} />
      <circle r={2.7} fill="#ffffff" />
      <circle r={2.7} fill={colour} opacity={0.75} />
      <animateMotion path={path} dur={`${dur}s`} begin={b} repeatCount="indefinite" rotate="0" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.94;1" dur={`${dur}s`} begin={b} repeatCount="indefinite" />
    </g>
  )
}

function Platform({ on }: { on: boolean }): ReactNode {
  const A = iso(0, 0, 0)
  const B = iso(N, 0, 0)
  const C = iso(N, N, 0)
  const D = iso(0, N, 0)
  const Bd = iso(N, 0, -THICK)
  const Cd = iso(N, N, -THICK)
  const Dd = iso(0, N, -THICK)
  const grid: ReactNode[] = []
  for (let i = 2; i < N; i += 2) {
    const a1 = iso(i, 0)
    const a2 = iso(i, N)
    const b1 = iso(0, i)
    const b2 = iso(N, i)
    grid.push(
      <line key={`x${i}`} x1={a1[0]} y1={a1[1]} x2={a2[0]} y2={a2[1]} />,
      <line key={`y${i}`} x1={b1[0]} y1={b1[1]} x2={b2[0]} y2={b2[1]} />,
    )
  }
  const plaza = [iso(4.6, 4.6), iso(11.4, 4.6), iso(11.4, 11.4), iso(4.6, 11.4)]
  return (
    <g className="vm-platform" data-on={on ? '1' : undefined}>
      <polygon points={pts([D, C, Cd, Dd])} fill="#0a1128" stroke="#0a1128" strokeWidth={0.8} strokeLinejoin="round" />
      <polygon points={pts([B, C, Cd, Bd])} fill="#060a1c" stroke="#060a1c" strokeWidth={0.8} strokeLinejoin="round" />
      <polygon points={pts([A, B, C, D])} fill="url(#vm-top)" />
      <g className="vm-grid" stroke="rgba(160,185,255,.07)" strokeWidth={1}>
        {grid}
      </g>
      <polygon points={pts(plaza)} fill="rgba(127,214,154,.045)" stroke="rgba(160,185,255,.1)" strokeWidth={1} strokeDasharray="3 5" />
      <polygon className="vm-edge" points={pts([A, B, C, D])} fill="none" stroke="rgba(160,185,255,.35)" strokeWidth={1.2} strokeLinejoin="round" />
      <polyline className="vm-edge" points={pts([D, Dd, Cd, Bd, B])} fill="none" stroke="rgba(160,185,255,.28)" strokeWidth={1} strokeLinejoin="round" />
      <line x1={C[0]} y1={C[1]} x2={Cd[0]} y2={Cd[1]} stroke="rgba(160,185,255,.35)" strokeWidth={1} />
    </g>
  )
}

type Handlers = { onMouseEnter: () => void; onMouseLeave: () => void; onFocus: () => void; onBlur: () => void }

export type TownSceneProps = {
  svgRef?: Ref<SVGSVGElement>
  /** Initial viewBox. The journey animates it afterwards. */
  viewBox?: string
  /** District the camera is on, if any. */
  focusId?: DistrictId | null
  dimOthers?: boolean
  litAll?: boolean
  isOn?: (id: DistrictId) => boolean
  hoverProps?: (id: DistrictId) => Handlers
  onSelect?: (id: DistrictId) => void
  /** Extra svg children drawn above the scene (leader lines, stems). */
  children?: ReactNode
}

function TownSceneImpl({
  svgRef,
  viewBox = FULL_VIEWBOX,
  focusId = null,
  dimOthers = false,
  litAll = false,
  isOn = () => false,
  hoverProps,
  onSelect,
  children,
}: TownSceneProps): ReactNode {
  const sorted: BuildingSpec[] = [...BUILDINGS].sort((a, b) => a.centre[0] + a.centre[1] - (b.centre[0] + b.centre[1]))
  const lit = (id: DistrictId): boolean => litAll || focusId === id || isOn(id)
  const hp = (id: DistrictId): Partial<Handlers> => (hoverProps ? hoverProps(id) : {})
  const click = (id: DistrictId) => (onSelect ? () => onSelect(id) : undefined)
  const interactive = Boolean(onSelect)

  const routePath = pathOf(ROUTE_ALL)
  const dots: ReactNode[] = [
    <Dot key="rt-1" path={routePath} colour="#ffffff" dur={30} begin={0} />,
    <Dot key="rt-2" path={routePath} colour="#ffffff" dur={30} begin={-10} />,
    <Dot key="rt-3" path={routePath} colour="#ffffff" dur={30} begin={-20} />,
    <Dot key="per-1" path={pathOf(PERIMETER)} colour="#a9c0ff" dur={34} begin={-4} />,
    <Dot key="per-2" path={pathOf(PERIMETER)} colour="#a9c0ff" dur={34} begin={-21} />,
    <Dot key="gate-out" path={pathOf(GATE_OUT)} colour={COLOUR.gate} dur={6.5} begin={-2} />,
  ]

  return (
    <svg
      ref={svgRef}
      className="vm-svg"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      focusable="false"
      data-focus={focusId ?? undefined}
      data-dim={dimOthers ? '1' : undefined}
      data-lit={litAll ? '1' : undefined}
    >
      <defs>
        <linearGradient id="vm-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2860" />
          <stop offset="0.5" stopColor="#141f48" />
          <stop offset="1" stopColor="#0f1838" />
        </linearGradient>
        <radialGradient id="vm-halo-gate">
          <stop offset="0" stopColor="#4ade80" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4ade80" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vm-under" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#4b6bff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#4b6bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vm-fade" gradientUnits="userSpaceOnUse" x1="0" y1="660" x2="0" y2="780">
          <stop offset="0" stopColor="#a9c0ff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#a9c0ff" stopOpacity="0" />
        </linearGradient>
        {BUILDINGS.map((b) => (
          <radialGradient key={b.id} id={`vm-glow-${b.id}`}>
            <stop offset="0" stopColor={b.colour} stopOpacity="0.34" />
            <stop offset="0.6" stopColor={b.colour} stopOpacity="0.1" />
            <stop offset="1" stopColor={b.colour} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      <g id={SCENE_ID}>
        <ellipse cx={600} cy={455} rx={520} ry={300} fill="url(#vm-under)" />

        <g
          className="vm-b vm-b-foundation"
          data-on={lit('foundation') ? '1' : undefined}
          data-focus={focusId === 'foundation' ? '1' : undefined}
          data-interactive={interactive ? '1' : undefined}
          style={{ '--c': FOUNDATION_COLOUR, '--d': '0s' } as CSSProperties}
          {...hp('foundation')}
          onClick={click('foundation')}
        >
          <Platform on={lit('foundation')} />
        </g>

        {/* spokes, route, runway, perimeter */}
        <g className="vm-ground-layer" fill="none" pointerEvents="none">
          {SPOKES.map((s) => (
            <path
              key={s.id}
              className="vm-road vm-spoke"
              data-on={lit(s.id) || focusId === 'silo' || litAll ? '1' : undefined}
              d={pathOf([SILO_AT, s.to])}
              style={{ '--c': COLOUR[s.id] } as CSSProperties}
            />
          ))}
          <path className="vm-road vm-out" d={pathOf(GATE_OUT)} stroke="url(#vm-fade)" />
          <path className="vm-runway" d={pathOf([[1, N - 0.45], [N - 1, N - 0.45]])} />
          <path className="vm-runway vm-runway-2" d={pathOf([[N - 0.45, 1], [N - 0.45, N - 1]])} />
          <path className="vm-perimeter" d={pathOf(PERIMETER)} />
          {LEGS.map((l) => {
            const tint = STAGE_TINT[stageOfId(l.to)]
            return (
              <g key={`leg-${l.to}`} className="vm-leg" data-on={lit(l.to) ? '1' : undefined} style={{ '--c': tint } as CSSProperties}>
                <path className="vm-route-glow" d={pathOf(l.pts)} />
                <path className="vm-route" d={pathOf(l.pts)} />
              </g>
            )
          })}
          {LEGS.map((l) => {
            const { at, angle } = arrowAt(l.pts)
            const tint = STAGE_TINT[stageOfId(l.to)]
            return (
              <path
                key={`ar-${l.to}`}
                className="vm-arrow"
                d="M-5,-5 L3,0 L-5,5 L-2,0 Z"
                transform={`translate(${at[0]} ${at[1]}) rotate(${angle.toFixed(1)}) scale(1.15)`}
                fill={tint}
              />
            )
          })}
          {dots}
        </g>

        {sorted.map((b, i) => {
          const [gx, gy] = iso(b.centre[0], b.centre[1], 0)
          const rx = Math.round(1.2247 * b.radius * S)
          const ry = Math.round(0.7071 * b.radius * S)
          return (
            <g
              key={b.id}
              className="vm-b"
              data-b={b.id}
              data-on={lit(b.id) ? '1' : undefined}
              data-focus={focusId === b.id ? '1' : undefined}
              data-interactive={interactive ? '1' : undefined}
              style={{ '--c': b.colour, '--d': `${0.25 + i * 0.09}s` } as CSSProperties}
              {...hp(b.id)}
              onClick={click(b.id)}
            >
              <ellipse className="vm-shadow" cx={gx} cy={gy + 3} rx={rx * 0.9} ry={ry * 0.9} fill="rgba(2,4,14,.5)" />
              <ellipse className="vm-glow" cx={gx} cy={gy} rx={rx * 1.25} ry={ry * 1.25} fill={`url(#vm-glow-${b.id})`} />
              <ellipse className="vm-ring" cx={gx} cy={gy} rx={rx} ry={ry} fill="none" stroke={b.colour} strokeWidth={1.6} />
              <g className="vm-lift">{b.render()}</g>
              <rect x={gx - rx} y={b.top[1] - 14} width={rx * 2} height={gy + ry - b.top[1] + 14} fill="transparent" />
            </g>
          )
        })}

        {/* numbered stops on the ground */}
        <g className="vm-marks" pointerEvents="none">
          {STOPS.map((s) => {
            const [x, y] = iso(s.at[0], s.at[1])
            const no = STEP_NO[s.id]
            return (
              <g key={s.id} className="vm-mark" data-x={x} data-y={y} data-id={s.id} data-on={lit(s.id) ? '1' : undefined} transform={`translate(${x} ${y})`} style={{ '--c': STAGE_TINT[stageOfId(s.id)] } as CSSProperties}>
                <circle className="vm-mark-halo" r={15} />
                <circle className="vm-mark-disc" r={9.5} />
                <text className="vm-mark-n" textAnchor="middle" dominantBaseline="central" y={0.5}>
                  {no}
                </text>
              </g>
            )
          })}
        </g>
      </g>

      {children}
    </svg>
  )
}

const TownScene = memo(TownSceneImpl)
export default TownScene

export { stageOfId }
