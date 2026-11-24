'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { districts, hero, type District, type DistrictId } from './content'
import { BUILDINGS, type BuildingSpec } from './buildings'
import { N, iso, pathOf, pts, S, type P2 } from './iso'
import './village-map.css'

const W = 1200
const H = 780
const FOUNDATION_COLOUR = '#7f9cf5'
const THICK = 0.75

/** Colour per district, from the building registry (foundation is the platform). */
const COLOUR: Record<DistrictId, string> = {
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

type CardSpec = { id: DistrictId; side: 'l' | 'r'; y: number }

/** Label cards: left column, right column. y is the card centre in viewBox units. */
const CARDS: CardSpec[] = [
  { id: 'watchtower', side: 'l', y: 150 },
  { id: 'dish', side: 'l', y: 300 },
  { id: 'studio', side: 'l', y: 455 },
  { id: 'foundation', side: 'l', y: 625 },
  { id: 'silo', side: 'r', y: 90 },
  { id: 'yard', side: 'r', y: 195 },
  { id: 'house', side: 'r', y: 300 },
  { id: 'lane', side: 'r', y: 530 },
  { id: 'press', side: 'r', y: 632 },
  { id: 'gate', side: 'r', y: 722 },
]
const CARD_LEFT = 1.2 // % of width
const CARD_WIDTH = 16.3
const CARD_RIGHT = 82.5

const FOUNDATION_TARGET: P2 = iso(4.4, N, -0.4)

/** Mobile badge centres and the building point each stem ends on (viewBox units). */
const BADGES: Record<DistrictId, { at: P2; to: P2 }> = {
  foundation: { at: [250, 600], to: FOUNDATION_TARGET },
  watchtower: { at: [600, 38], to: [600, 112] },
  press: { at: [770, 618], to: [705, 545] },
  dish: { at: [325, 265], to: [408, 330] },
  studio: { at: [335, 430], to: [425, 432] },
  yard: { at: [790, 268], to: [785, 340] },
  lane: { at: [815, 505], to: [750, 458] },
  house: { at: [935, 305], to: [905, 372] },
  silo: { at: [682, 285], to: [655, 372] },
  gate: { at: [500, 565], to: [580, 572] },
}

const SILO_AT: [number, number] = [8, 8]

type Road = { id: DistrictId; pts: [number, number][]; dur: number; from?: [number, number] }

const ROADS: Road[] = [
  { id: 'watchtower', pts: [SILO_AT, [8, 2.6], [3.6, 2.6]], dur: 5.6 },
  { id: 'yard', pts: [SILO_AT, [8, 2.7], [9.2, 2.7]], dur: 4.6 },
  { id: 'house', pts: [SILO_AT, [8, 3.95], [14.8, 3.95], [14.8, 2.9]], dur: 6.6 },
  { id: 'dish', pts: [SILO_AT, [2.8, 8], [2.8, 10.4]], dur: 5.4 },
  { id: 'studio', pts: [SILO_AT, [6.2, 8], [6.2, 12.2]], dur: 5.0 },
  { id: 'press', pts: [SILO_AT, [8, 9.1], [11.2, 9.1]], dur: 4.4 },
  { id: 'gate', pts: [SILO_AT, [8, 13.2], [14.6, 13.2], [14.6, 14.5]], dur: 7.6 },
]
const LANE_ROAD: [number, number][] = [
  [10.3, 3.8],
  [11.0, 3.8],
  [11.0, 7.4],
]
const GATE_OUT: [number, number][] = [
  [14.6, 15.3],
  [14.6, 26],
]
const PERIMETER: [number, number][] = [
  [0.5, 0.5],
  [N - 0.5, 0.5],
  [N - 0.5, N - 0.5],
  [0.5, N - 0.5],
  [0.5, 0.5],
]

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`
}

function Dot({ path, colour, dur, begin }: { path: string; colour: string; dur: number; begin: number }): ReactNode {
  const b = `${begin}s`
  return (
    <g className="vm-dot" opacity={0}>
      <circle r={8} fill={colour} opacity={0.2} />
      <circle r={2.7} fill="#ffffff" />
      <circle r={2.7} fill={colour} opacity={0.75} />
      <animateMotion path={path} dur={`${dur}s`} begin={b} repeatCount="indefinite" rotate="0" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.86;1" dur={`${dur}s`} begin={b} repeatCount="indefinite" />
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

export default function VillageMap(): ReactNode {
  const [selected, setSelected] = useState<DistrictId>('silo')
  const [hover, setHover] = useState<DistrictId | null>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const prevSel = useRef<DistrictId>('silo')

  const byId = (id: DistrictId): District => districts.find((d) => d.id === id) ?? districts[0]
  const current = byId(selected)
  const isOn = useCallback((id: DistrictId): boolean => selected === id || hover === id, [selected, hover])

  useEffect(() => {
    if (prevSel.current === selected) return
    prevSel.current = selected
    const box = chipsRef.current
    if (!box || box.clientWidth === 0) return
    const el = box.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!el) return
    box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' })
  }, [selected])

  const hoverProps = (id: DistrictId): {
    onMouseEnter: () => void
    onMouseLeave: () => void
    onFocus: () => void
    onBlur: () => void
  } => ({
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover((h) => (h === id ? null : h)),
    onFocus: () => setHover(id),
    onBlur: () => setHover((h) => (h === id ? null : h)),
  })

  const sorted: BuildingSpec[] = [...BUILDINGS].sort((a, b) => a.centre[0] + a.centre[1] - (b.centre[0] + b.centre[1]))

  const dots: ReactNode[] = []
  ROADS.forEach((r, i) => {
    const p = pathOf(r.pts)
    const c = COLOUR[r.id]
    dots.push(<Dot key={`r${r.id}`} path={p} colour={c} dur={r.dur} begin={-(i * 1.3) % r.dur} />)
  })
  dots.push(<Dot key="lane" path={pathOf(LANE_ROAD)} colour={COLOUR.lane} dur={4.8} begin={-1.5} />)
  dots.push(<Dot key="per-1" path={pathOf(PERIMETER)} colour="#a9c0ff" dur={34} begin={-4} />)
  dots.push(<Dot key="per-2" path={pathOf(PERIMETER)} colour="#a9c0ff" dur={34} begin={-21} />)
  dots.push(<Dot key="gate-out" path={pathOf(GATE_OUT)} colour={COLOUR.gate} dur={6.5} begin={-2} />)

  const perim = pathOf(PERIMETER)

  const cardStyle = (c: CardSpec): CSSProperties =>
    ({
      top: `${(c.y / H) * 100}%`,
      left: `${c.side === 'l' ? CARD_LEFT : CARD_RIGHT}%`,
      width: `${CARD_WIDTH}%`,
      '--c': COLOUR[c.id],
      '--d': `${1.1 + CARDS.indexOf(c) * 0.05}s`,
    }) as CSSProperties

  const targetOf = (id: DistrictId): P2 => (id === 'foundation' ? FOUNDATION_TARGET : (BUILDINGS.find((b) => b.id === id)?.target ?? [0, 0]))
  
  return (
    <div className="vm-root">
      <div className="vm-panel" data-sel={selected}>
        <div className="vm-head">
          <h2 className="vm-title font-display">Lucy&rsquo;s town</h2>
          <p className="vm-hint">
            <span className="vm-hint-d">{hero.mapHint}</span>
            <span className="vm-hint-t">{hero.mapHintTouch}</span>
          </p>
        </div>

        <div className="vm-stage">
          <div className="vm-canvas">
            <svg
              className="vm-svg"
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="xMidYMid meet"
              shapeRendering="geometricPrecision"
              aria-hidden="true"
              focusable="false"
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

              <ellipse cx={600} cy={455} rx={520} ry={300} fill="url(#vm-under)" />

              <g
                className="vm-b vm-b-foundation"
                data-on={isOn('foundation') ? '1' : undefined}
                style={{ '--c': FOUNDATION_COLOUR, '--d': '0s' } as CSSProperties}
                {...hoverProps('foundation')}
                onClick={() => setSelected('foundation')}
              >
                <Platform on={isOn('foundation')} />
              </g>

              {/* roads, runway, perimeter */}
              <g className="vm-ground-layer" fill="none" pointerEvents="none">
                {ROADS.map((r) => (
                  <path
                    key={r.id}
                    className="vm-road"
                    data-on={isOn(r.id) ? '1' : undefined}
                    d={pathOf(r.pts)}
                    style={{ '--c': COLOUR[r.id] } as CSSProperties}
                  />
                ))}
                <path className="vm-road vm-lane-road" data-on={isOn('lane') ? '1' : undefined} d={pathOf(LANE_ROAD)} style={{ '--c': COLOUR.lane } as CSSProperties} />
                <path className="vm-road vm-lane-band" d={pathOf(LANE_ROAD)} />
                <path className="vm-road vm-out" d={pathOf(GATE_OUT)} stroke="url(#vm-fade)" />
                <path className="vm-runway" d={pathOf([[1, N - 0.45], [N - 1, N - 0.45]])} />
                <path className="vm-runway vm-runway-2" d={pathOf([[N - 0.45, 1], [N - 0.45, N - 1]])} />
                <path className="vm-perimeter" d={perim} />
                {dots}
              </g>

              {sorted.map((b, i) => {
                const [gx, gy] = iso(b.centre[0], b.centre[1], 0)
                const rx = Math.round(1.2247 * b.radius * S)
                const ry = Math.round(0.7071 * b.radius * S)
                const on = isOn(b.id)
                return (
                  <g
                    key={b.id}
                    className="vm-b"
                    data-on={on ? '1' : undefined}
                    style={{ '--c': b.colour, '--d': `${0.25 + i * 0.09}s` } as CSSProperties}
                    {...hoverProps(b.id)}
                    onClick={() => setSelected(b.id)}
                  >
                    <ellipse className="vm-shadow" cx={gx} cy={gy + 3} rx={rx * 0.9} ry={ry * 0.9} fill="rgba(2,4,14,.5)" />
                    <ellipse className="vm-glow" cx={gx} cy={gy} rx={rx * 1.25} ry={ry * 1.25} fill={`url(#vm-glow-${b.id})`} />
                    <ellipse className="vm-ring" cx={gx} cy={gy} rx={rx} ry={ry} fill="none" stroke={b.colour} strokeWidth={1.6} />
                    <g className="vm-lift">{b.render()}</g>
                    <rect
                      x={gx - rx}
                      y={b.top[1] - 14}
                      width={rx * 2}
                      height={gy + ry - b.top[1] + 14}
                      fill="transparent"
                    />
                  </g>
                )
              })}

              <g className="vm-stems" pointerEvents="none" fill="none">
                {districts.map((d) => (
                  <g key={d.id} className="vm-stem" data-on={isOn(d.id) ? '1' : undefined} style={{ '--c': COLOUR[d.id] } as CSSProperties}>
                    <line x1={BADGES[d.id].at[0]} y1={BADGES[d.id].at[1]} x2={BADGES[d.id].to[0]} y2={BADGES[d.id].to[1]} />
                    <circle cx={BADGES[d.id].to[0]} cy={BADGES[d.id].to[1]} r={4} />
                  </g>
                ))}
              </g>

              {/* leader lines (desktop only) */}
              <g className="vm-leaders" pointerEvents="none" fill="none">
                {CARDS.map((c) => {
                  const [tx, ty] = targetOf(c.id)
                  const sx = ((c.side === 'l' ? CARD_LEFT + CARD_WIDTH : CARD_RIGHT) / 100) * W
                  return (
                    <g key={c.id} className="vm-leader" data-on={isOn(c.id) ? '1' : undefined} style={{ '--c': COLOUR[c.id] } as CSSProperties}>
                      <line x1={sx} y1={c.y} x2={tx} y2={ty} />
                      <circle cx={tx} cy={ty} r={3.6} />
                    </g>
                  )
                })}
              </g>
            </svg>

            {/* desktop label cards */}
            {CARDS.map((c) => {
              const d = byId(c.id)
              return (
                <button
                  key={c.id}
                  type="button"
                  className="vm-card"
                  data-side={c.side}
                  data-on={isOn(c.id) ? '1' : undefined}
                  aria-pressed={selected === c.id}
                  style={cardStyle(c)}
                  onClick={() => setSelected(c.id)}
                  {...hoverProps(c.id)}
                >
                  <span className="vm-card-name">{d.building}</span>
                  <span className="vm-card-line">{d.mapLine}</span>
                </button>
              )
            })}

            {/* touch badges */}
            {districts.map((d, i) => {
              const [bx, by] = BADGES[d.id].at
              return (
                <button
                  key={d.id}
                  type="button"
                  className="vm-badge"
                  data-on={isOn(d.id) ? '1' : undefined}
                  aria-pressed={selected === d.id}
                  aria-label={`${i + 1}. ${d.building}`}
                  style={{ left: `${(bx / W) * 100}%`, top: `${(by / H) * 100}%`, '--c': COLOUR[d.id] } as CSSProperties}
                  onClick={() => setSelected(d.id)}
                >
                  <span className="vm-badge-dot">{i + 1}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="vm-chips-wrap">
      <div className="vm-chips" ref={chipsRef} role="group" aria-label="Districts">
        {districts.map((d, i) => (
          <button
            key={d.id}
            type="button"
            className="vm-chip"
            aria-pressed={selected === d.id}
            style={{ '--c': COLOUR[d.id] } as CSSProperties}
            onClick={() => setSelected(d.id)}
          >
            <span className="vm-chip-n">{i + 1}</span>
            {d.building}
          </button>
        ))}
      </div>
      </div>

      <section className="vm-detail" aria-live="polite" aria-atomic="true" style={{ '--c': COLOUR[selected] } as CSSProperties}>
        <div className="vm-detail-in" key={current.id}>
          <div className="vm-d-main">
            <div className="vm-d-top">
              <span className="vm-d-dot" aria-hidden="true" />
              <h3 className="vm-d-title">
                {current.building} &middot; {current.title}
              </h3>
              <span className="vm-pill">{current.cadence}</span>
            </div>
            <p className="vm-d-headline font-display">{current.headline}</p>
            <p className="vm-d-intro">{current.intro}</p>
            <a className="vm-d-link" href={`#${current.id}`}>
              See how this loop works <span aria-hidden="true">&darr;</span>
            </a>
          </div>
          <ul className="vm-facts">
            {current.facts.map(([value, label]) => (
              <li key={label} className="vm-fact">
                <span className="vm-fact-v">{value}</span>
                <span className="vm-fact-l">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
