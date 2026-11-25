import type { ReactNode } from 'react'
import type { DistrictId } from './content'
import {
  IsoBox,
  IsoCylinder,
  IsoPrismRoof,
  ellipseRx,
  ellipseRy,
  iso,
  mix,
  pts,
  tones,
  wallL,
  wallR,
  type P2,
} from './iso'

export type BuildingSpec = {
  id: Exclude<DistrictId, 'foundation'>
  /** Main colour of the building. Used for dots, rings and the detail panel. */
  colour: string
  /** Footprint centre on the grid, used for depth sorting and the ground glow. */
  centre: [number, number]
  /** Ground glow radius in grid units. */
  radius: number
  /** Highest screen point of the silhouette. Badges float above it. */
  top: P2
  /** Where leader lines end. */
  target: P2
  render: () => ReactNode
}

const SHADE = '#0b1230'

/* ---------- tower ---------- */
const TOWER: [number, number] = [2.2, 11.0]

function Tower(): ReactNode {
  const [cx, cy] = TOWER
  const shaft = tones('#c9d3ea')
  const plinth = tones('#8e9cc2')
  const cabin = tones('#5b8fe0')
  const x = cx - 0.5
  const y = cy - 0.5
  const bands: ReactNode[] = []
  for (let k = 0; k < 5; k += 1) {
    const z0 = 0.35 + 0.55 + k * 1.0
    bands.push(
      <polygon key={`b${k}`} points={pts(wallL(x, y + 1.0, 1.0, z0, 0.08, 0, 1, 0, 1))} fill="rgba(11,18,48,.2)" />,
      <polygon key={`s${k}`} points={pts(wallL(x, y + 1.0, 1.0, z0 + 0.3, 0.32, 0.38, 0.62, 0, 1))} fill="rgba(40,55,110,.55)" />,
    )
  }
  const [bx, by] = iso(cx, cy, 8.6)
  const [ax, ay] = iso(cx, cy, 6.9)
  return (
    <g>
      <IsoBox x={cx - 0.85} y={cy - 0.85} w={1.7} d={1.7} h={0.35} c={plinth} />
      <IsoBox x={x} y={y} z={0.35} w={1} d={1} h={5.4} c={shaft} />
      {bands}
      <IsoBox x={cx - 0.8} y={cy - 0.8} z={5.75} w={1.6} d={1.6} h={1.15} c={cabin} />
      <polygon points={pts(wallL(cx - 0.8, cy + 0.8, 1.6, 5.75, 1.15, 0.14, 0.86, 0.32, 0.74))} fill="rgba(214,236,255,.9)" />
      <polygon points={pts(wallR(cx + 0.8, cy - 0.8, 1.6, 5.75, 1.15, 0.14, 0.86, 0.32, 0.74))} fill="rgba(170,205,245,.55)" />
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#b8c4e0" strokeWidth={1.6} strokeLinecap="round" />
      <circle className="vm-beacon-ring" cx={bx} cy={by} r={4} fill="none" stroke="#ff8a8a" strokeWidth={1.2} />
      <circle className="vm-beacon" cx={bx} cy={by} r={3.2} fill="#ff7a7a" />
    </g>
  )
}

/* ---------- silo ---------- */
const SILO: [number, number] = [8, 8]

function Silo(): ReactNode {
  const [cx, cy] = SILO
  const base = '#7fd69a'
  const [sx, sy] = iso(cx, cy, 2.7)
  const rTop = 2.0
  const rx = ellipseRx(rTop)
  const ry = ellipseRy(rTop)
  return (
    <g>
      <IsoCylinder cx={cx} cy={cy} z={0} r={2.35} h={0.18} c={tones(mix(base, '#6d8f7c', 0.5))} gid="vm-cyl-silo-0" />
      <IsoCylinder cx={cx} cy={cy} z={0.18} r={2.2} h={0.84} c={tones(mix(base, SHADE, 0.14))} gid="vm-cyl-silo-1" />
      <IsoCylinder cx={cx} cy={cy} z={1.02} r={2.1} h={0.84} c={tones(base)} gid="vm-cyl-silo-2" />
      <IsoCylinder cx={cx} cy={cy} z={1.86} r={2.0} h={0.84} c={tones(mix(base, '#ffffff', 0.1))} gid="vm-cyl-silo-3" />
      {[0.7, 0.42].map((k) => (
        <ellipse
          key={k}
          cx={sx}
          cy={sy}
          rx={r1(rx * k)}
          ry={r1(ry * k)}
          fill="none"
          stroke={mix(base, SHADE, 0.38)}
          strokeWidth={1.4}
          opacity={0.75}
        />
      ))}
      <ellipse cx={sx} cy={sy} rx={r1(rx * 0.16)} ry={r1(ry * 0.16)} fill={mix(base, SHADE, 0.45)} />
      <ellipse cx={sx} cy={sy} rx={r1(rx * 0.84)} ry={r1(ry * 0.84)} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth={0.8} />
      <ellipse className="vm-silo-pulse" cx={sx} cy={sy} rx={r1(rx * 0.5)} ry={r1(ry * 0.5)} fill="none" stroke="#c9f5d6" strokeWidth={2} />
    </g>
  )
}

const r1 = (n: number): number => Math.round(n * 10) / 10

/** The silo sits in the middle of everything, so it is drawn a little smaller to keep the route readable. */
const SILO_SCALE = 0.8

function SiloScaled(): ReactNode {
  const [gx, gy] = iso(SILO[0], SILO[1], 0)
  return (
    <g transform={`translate(${gx} ${gy}) scale(${SILO_SCALE}) translate(${-gx} ${-gy})`}>
      <Silo />
    </g>
  )
}

/* ---------- dish ---------- */
const DISH: [number, number] = [2.2, 6.8]

function Dish(): ReactNode {
  const [cx, cy] = DISH
  const gold = '#e2b25a'
  const [dx, dy] = iso(cx, cy, 2.75)
  return (
    <g>
      <IsoBox x={cx - 0.8} y={cy - 0.8} w={1.6} d={1.6} h={0.45} c={tones(mix(gold, '#8a6a2a', 0.45))} />
      <IsoBox x={cx - 0.18} y={cy - 0.18} z={0.45} w={0.36} d={0.36} h={1.9} c={tones(gold)} />
      <g transform={`translate(${dx} ${dy}) rotate(-30) scale(1.25)`}>
        <ellipse cx={4} cy={4} rx={25} ry={18} fill={mix(gold, SHADE, 0.55)} />
        <ellipse cx={0} cy={0} rx={25} ry={18} fill={mix(gold, SHADE, 0.2)} stroke="rgba(255,255,255,.3)" strokeWidth={0.8} />
        <ellipse cx={-1} cy={-1} rx={19} ry={13} fill={mix(gold, '#ffffff', 0.12)} />
        <ellipse cx={-1} cy={-1} rx={11} ry={7.5} fill={mix(gold, '#ffffff', 0.32)} opacity={0.8} />
        <line x1={-1} y1={-1} x2={-1} y2={-24} stroke="#f3dca0" strokeWidth={1.6} strokeLinecap="round" />
        <circle cx={-1} cy={-25} r={2.6} fill="#fff3c8" />
      </g>
      <g transform={`translate(${dx - 16} ${dy - 28})`}>
        <ellipse className="vm-signal" cx={0} cy={0} rx={20} ry={14} fill="none" stroke={gold} strokeWidth={1.4} />
        <ellipse className="vm-signal vm-signal-2" cx={0} cy={0} rx={20} ry={14} fill="none" stroke={gold} strokeWidth={1.4} />
      </g>
    </g>
  )
}

/* ---------- studio ---------- */
const STUDIO = { x: 9.2, y: 1.2, w: 2, d: 2, h: 2.0 }

function Studio(): ReactNode {
  const { x, y, w, d, h } = STUDIO
  const pink = '#e58fb8'
  const p = (u: number, v: number): P2 => iso(x + w * u, y + d, h * v)
  const [lx, ly] = iso(x + w - 0.4, y + 0.4, h + 0.2)
  return (
    <g>
      <IsoBox x={x} y={y} w={w} d={d} h={h} c={tones(pink)} />
      <IsoBox x={x - 0.1} y={y - 0.1} z={h} w={w + 0.2} d={d + 0.2} h={0.16} c={tones(mix(pink, '#ffffff', 0.22))} />
      <polygon points={pts([p(0.2, 0.2), p(0.8, 0.2), p(0.8, 0.8), p(0.2, 0.8)])} fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.3)" strokeWidth={0.8} strokeLinejoin="round" />
      <polygon points={pts([p(0.4, 0.32), p(0.4, 0.68), p(0.68, 0.5)])} fill="#ffffff" stroke="#ffffff" strokeWidth={1.2} strokeLinejoin="round" />
      <polygon points={pts(wallR(x + w, y, d, 0, h, 0.14, 0.86, 0.4, 0.46))} fill="rgba(255,255,255,.22)" />
      <polygon points={pts(wallR(x + w, y, d, 0, h, 0.14, 0.6, 0.56, 0.62))} fill="rgba(255,255,255,.16)" />
      <circle className="vm-led-glow" cx={lx} cy={ly} r={9} fill="#ff4d5e" opacity={0.28} />
      <circle className="vm-led" cx={lx} cy={ly} r={3.4} fill="#ff4d5e" />
    </g>
  )
}

/* ---------- press ---------- */
const PRESS = { x: 5.2, y: 1.0, w: 2.4, d: 1.6, h: 1.5 }

function Press(): ReactNode {
  const { x, y, w, d, h } = PRESS
  const teal = '#58c2c9'
  const glass = mix(teal, '#ffffff', 0.6)
  const page = { top: '#ffffff', left: '#e6edfb', right: '#a9b7d8' }
  const pages: ReactNode[] = []
  for (let i = 0; i < 5; i += 1) {
    const ph = 0.42 + i * 0.2
    const px = x + 0.25 + i * 0.46
    const py = y + d + 0.3
    pages.push(
      <g key={i} className="vm-page" style={{ animationDelay: `${i * 0.18}s` }}>
        <IsoBox x={px} y={py} w={0.36} d={0.1} h={ph} c={page} />
        <polygon points={pts(wallL(px, py + 0.1, 0.36, 0, ph, 0.2, 0.8, 0.62, 0.7))} fill="rgba(11,18,48,.22)" />
        <polygon points={pts(wallL(px, py + 0.1, 0.36, 0, ph, 0.2, 0.7, 0.38, 0.46))} fill="rgba(11,18,48,.16)" />
      </g>,
    )
  }
  return (
    <g>
      <IsoBox x={x + 0.3} y={y + 0.25} z={h} w={0.45} d={0.45} h={0.9} c={tones(mix(teal, SHADE, 0.3))} />
      <IsoBox x={x} y={y} w={w} d={d} h={h} c={tones(teal)} />
      {[0.08, 0.3, 0.52].map((u) => (
        <polygon key={u} points={pts(wallL(x, y + d, w, 0, h, u, u + 0.15, 0.42, 0.78))} fill={glass} opacity={0.9} />
      ))}
      <polygon points={pts(wallL(x, y + d, w, 0, h, 0.8, 0.93, 0, 0.55))} fill={mix(teal, SHADE, 0.55)} />
      <IsoBox x={x - 0.06} y={y - 0.06} z={h} w={w + 0.12} d={d + 0.12} h={0.12} c={tones(mix(teal, '#ffffff', 0.2))} />
      {pages}
    </g>
  )
}

/* ---------- yard ---------- */
const YARD = { x: 12.9, y: 1.1, w: 2.2, d: 2.2 }

function Yard(): ReactNode {
  const { x, y, w, d } = YARD
  const yellow = '#e6c65a'
  const slats: ReactNode[] = []
  for (let i = 1; i < 6; i += 1) {
    slats.push(
      <polygon key={i} points={pts(wallL(x, y + d, w, 0, 1.1, i / 6 - 0.012, i / 6 + 0.012, 0, 1))} fill="rgba(60,40,0,.2)" />,
    )
  }
  return (
    <g>
      <IsoBox x={x} y={y} w={w} d={d} h={1.1} c={tones(yellow)} />
      {slats}
      <IsoBox x={x + 0.35} y={y + 0.35} z={1.1} w={1.5} d={1.5} h={0.95} c={tones(mix(yellow, '#ffffff', 0.06))} />
      <polygon className="vm-yard-win" points={pts(wallL(x + 0.35, y + 1.85, 1.5, 1.1, 0.95, 0.12, 0.62, 0.26, 0.66))} fill="#fff7d6" />
      <polygon points={pts(wallL(x + 0.35, y + 1.85, 1.5, 1.1, 0.95, 0.18, 0.54, 0.42, 0.5))} fill="rgba(90,60,0,.45)" />
      <polygon points={pts(wallL(x + 0.35, y + 1.85, 1.5, 1.1, 0.95, 0.18, 0.46, 0.54, 0.6))} fill="rgba(90,60,0,.3)" />
    </g>
  )
}

/* ---------- lane ---------- */
const LANE_X = 11.6
const LANE_Y = [6.3, 7.3, 8.3]
const LANE_BADGE = ['#4ade80', '#fbbf24', '#60a5fa']

function Lane(): ReactNode {
  const cube = tones('#dbe7ff')
  return (
    <g>
      {LANE_Y.map((ly, i) => {
        const [bx, by] = iso(LANE_X, ly, 1.05)
        return (
          <g key={ly}>
            <IsoBox x={LANE_X - 0.45} y={ly - 0.45} w={0.9} d={0.9} h={0.9} c={cube} />
            <polygon points={pts(wallL(LANE_X - 0.45, ly + 0.45, 0.9, 0, 0.9, 0.2, 0.8, 0.4, 0.5))} fill="rgba(60,90,160,.35)" />
            <g className="vm-bob" style={{ animationDelay: `${i * 0.5}s` }}>
              <circle cx={bx} cy={by - 16} r={8.5} fill="rgba(8,12,30,.9)" stroke={LANE_BADGE[i]} strokeWidth={1.4} />
              <circle cx={bx} cy={by - 16} r={3.4} fill={LANE_BADGE[i]} />
            </g>
          </g>
        )
      })}
    </g>
  )
}

/* ---------- house ---------- */
const HOUSE = { x: 13.9, y: 9.9, w: 1.6, d: 1.4, h: 1.2 }

function House(): ReactNode {
  const { x, y, w, d, h } = HOUSE
  const wall = tones('#8fa8f0')
  const roof = tones('#5468c0')
  const [wx, wy] = iso(x + w * 0.46, y + d, h * 0.54)
  return (
    <g>
      <IsoBox x={x} y={y} w={w} d={d} h={h} c={wall} />
      <ellipse cx={wx} cy={wy} rx={22} ry={16} fill="#ffd98a" opacity={0.18} className="vm-win-glow" />
      <polygon points={pts(wallL(x, y + d, w, 0, h, 0.3, 0.62, 0.3, 0.8))} fill="#ffd98a" />
      <polygon points={pts(wallL(x, y + d, w, 0, h, 0.3, 0.62, 0.52, 0.56))} fill="rgba(150,90,20,.5)" />
      <polygon points={pts(wallL(x, y + d, w, 0, h, 0.45, 0.47, 0.3, 0.8))} fill="rgba(150,90,20,.5)" />
      <polygon points={pts(wallL(x, y + d, w, 0, h, 0.72, 0.9, 0, 0.58))} fill={mix('#8fa8f0', SHADE, 0.55)} />
      <IsoPrismRoof x={x} y={y} z={h} w={w} d={d} h={0.9} c={roof} />
      <IsoBox x={x + 0.25} y={y + 0.4} z={h + 0.3} w={0.3} d={0.3} h={0.6} c={tones('#6a7fd0')} />
    </g>
  )
}

/* ---------- gate ---------- */
const GATE = { x: 13.5, y: 14.5, w: 2.1, d: 0.7 }
const GATE_H = 2.0

function Gate(): ReactNode {
  const steel = tones('#8fa3bd')
  const { x, y, w, d } = GATE
  const [gx, gy] = iso(x + w / 2, y + d, GATE_H + 1.0)
  return (
    <g>
      <IsoBox x={x} y={y} w={0.6} d={d} h={GATE_H} c={steel} />
      <IsoBox x={x + w - 0.6} y={y} w={0.6} d={d} h={GATE_H} c={steel} />
      <polygon points={pts(wallL(x, y + d, w, GATE_H - 0.12, 0.12, 0.3, 0.7, 0, 1))} fill="rgba(74,222,128,.75)" />
      <IsoBox x={x - 0.1} y={y - 0.05} z={GATE_H} w={w + 0.2} d={d + 0.1} h={0.45} c={tones('#a3b4cc')} />
      <circle className="vm-gate-halo" cx={gx} cy={gy} r={20} fill="url(#vm-halo-gate)" />
      <circle cx={gx} cy={gy} r={11.5} fill="#4ade80" stroke="#bbf7d0" strokeWidth={1} />
      <path d={`M${gx - 5},${gy + 0.5} L${gx - 1.5},${gy + 4} L${gx + 5.5},${gy - 3.5}`} fill="none" stroke="#06240f" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

/* ---------- registry ---------- */

function groundTop(cx: number, cy: number, z: number): P2 {
  return iso(cx, cy, z)
}

export const BUILDINGS: BuildingSpec[] = [
  {
    id: 'watchtower',
    colour: '#c9d3ea',
    centre: TOWER,
    radius: 1.5,
    top: iso(TOWER[0], TOWER[1], 8.6),
    target: groundTop(TOWER[0], TOWER[1], 6.2),
    render: Tower,
  },
  {
    id: 'silo',
    colour: '#7fd69a',
    centre: SILO,
    radius: 2.5,
    top: iso(SILO[0], SILO[1], 3.0),
    target: groundTop(SILO[0] + 0.9, SILO[1] - 0.2, 2.2),
    render: SiloScaled,
  },
  {
    id: 'dish',
    colour: '#e2b25a',
    centre: DISH,
    radius: 1.7,
    top: iso(DISH[0], DISH[1], 3.9),
    target: groundTop(DISH[0], DISH[1], 2.0),
    render: Dish,
  },
  {
    id: 'studio',
    colour: '#e58fb8',
    centre: [STUDIO.x + 1, STUDIO.y + 1],
    radius: 2.2,
    top: iso(STUDIO.x + 1.5, STUDIO.y + 0.5, 2.5),
    target: groundTop(STUDIO.x + 0.6, STUDIO.y + 2, 1.2),
    render: Studio,
  },
  {
    id: 'press',
    colour: '#58c2c9',
    centre: [PRESS.x + 1.2, PRESS.y + 1.2],
    radius: 2.5,
    top: iso(PRESS.x + 0.5, PRESS.y + 0.5, 2.6),
    target: groundTop(PRESS.x + PRESS.w, PRESS.y + 0.9, 0.8),
    render: Press,
  },
  {
    id: 'yard',
    colour: '#e6c65a',
    centre: [YARD.x + 1.1, YARD.y + 1.1],
    radius: 2.0,
    top: iso(YARD.x + 1.1, YARD.y + 1.1, 2.4),
    target: groundTop(YARD.x + YARD.w, YARD.y + 1.2, 1.0),
    render: Yard,
  },
  {
    id: 'lane',
    colour: '#9fc4ff',
    centre: [LANE_X, 7.3],
    radius: 2.0,
    top: iso(LANE_X, LANE_Y[0], 2.6),
    target: groundTop(LANE_X + 0.45, LANE_Y[1], 0.5),
    render: Lane,
  },
  {
    id: 'house',
    colour: '#8fa8f0',
    centre: [HOUSE.x + HOUSE.w / 2, HOUSE.y + HOUSE.d / 2],
    radius: 1.7,
    top: iso(HOUSE.x + 0.8, HOUSE.y + 0.7, 3.0),
    target: groundTop(HOUSE.x + HOUSE.w, HOUSE.y + 0.8, 1.0),
    render: House,
  },
  {
    id: 'gate',
    colour: '#4ade80',
    centre: [GATE.x + GATE.w / 2, GATE.y + 0.4],
    radius: 1.9,
    top: iso(GATE.x + GATE.w / 2, GATE.y + GATE.d, GATE_H + 1.9),
    target: groundTop(GATE.x + GATE.w + 0.1, GATE.y + 0.3, 1.2),
    render: Gate,
  },
]
