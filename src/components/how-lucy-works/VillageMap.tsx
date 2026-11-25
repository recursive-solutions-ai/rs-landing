'use client'

import { memo, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { districts, hero, type District, type DistrictId } from './content'
import { BUILDINGS } from './buildings'
import { iso } from './iso'
import TownScene, { COLOUR, H, W } from './TownScene'
import StepGlyph from './StepGlyph'
import { STAGE_TINT, STEP_NO, stageOf } from './accents'
import './village-map.css'

type CardSpec = { id: DistrictId; side: 'l' | 'r'; y: number }

/**
 * Label cards, grouped by stage: the left column holds Get found (bottom to top,
 * the way the route runs) and Behind every step; the right column holds Create
 * and Sell (top to bottom). y is the card centre in viewBox units.
 */
const CARDS: CardSpec[] = [
  { id: 'dish', side: 'l', y: 150 },
  { id: 'watchtower', side: 'l', y: 265 },
  { id: 'foundation', side: 'l', y: 380 },
  { id: 'silo', side: 'l', y: 560 },
  { id: 'gate', side: 'l', y: 675 },
  { id: 'press', side: 'r', y: 100 },
  { id: 'studio', side: 'r', y: 215 },
  { id: 'yard', side: 'r', y: 330 },
  { id: 'lane', side: 'r', y: 520 },
  { id: 'house', side: 'r', y: 640 },
]
const CARD_LEFT = 1.2 // % of width
const CARD_WIDTH = 16.3
const CARD_RIGHT = 82.5

const FOUNDATION_TARGET = iso(3.2, 15.2)

/** Where each leader line ends: on the side of the building that faces its card. */
const TARGET: Record<DistrictId, [number, number]> = {
  foundation: FOUNDATION_TARGET,
  watchtower: [378, 300],
  dish: [470, 232],
  silo: [549, 450],
  gate: [566, 625],
  press: [750, 300],
  studio: [836, 385],
  yard: [926, 440],
  lane: [742, 489],
  house: [736, 585],
}

/** Cards whose leader drops in from above (x of the vertical run), so it clears a taller building. */
const DROP: Partial<Record<DistrictId, number>> = { dish: 470 }

/** Mobile badge centres and the building point each stem ends on (viewBox units). */
const BADGES: Record<DistrictId, { at: [number, number]; to: [number, number] }> = (() => {
  const out = {} as Record<DistrictId, { at: [number, number]; to: [number, number] }>
  out.foundation = { at: [290, 585], to: FOUNDATION_TARGET }
  for (const b of BUILDINGS) out[b.id] = { at: [b.top[0], b.top[1] - 34], to: [b.top[0], b.top[1] + 8] }
  return out
})()

export type VillageMapProps = {
  /** Journey mode: the camera is driven from outside. */
  focusId?: DistrictId | null
  dimOthers?: boolean
  litAll?: boolean
  /** When set, picking a district calls this instead of opening the detail panel. */
  onPick?: (id: DistrictId) => void
  hideDetail?: boolean
}

function VillageMapImpl({ focusId = null, dimOthers = false, litAll = false, onPick, hideDetail = false }: VillageMapProps): ReactNode {
  const [selected, setSelected] = useState<DistrictId>('silo')
  const [hover, setHover] = useState<DistrictId | null>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const prevSel = useRef<DistrictId>('silo')

  const byId = (id: DistrictId): District => districts.find((d) => d.id === id) ?? districts[0]
  const current = byId(selected)
  const sel: DistrictId | null = onPick ? null : selected
  const isOn = useCallback((id: DistrictId): boolean => sel === id || hover === id, [sel, hover])
  const pick = useCallback(
    (id: DistrictId) => {
      if (onPick) onPick(id)
      else setSelected(id)
    },
    [onPick],
  )

  useEffect(() => {
    if (prevSel.current === selected) return
    prevSel.current = selected
    const box = chipsRef.current
    if (!box || box.clientWidth === 0) return
    const el = box.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!el) return
    box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' })
  }, [selected])

  const hoverProps = (
    id: DistrictId,
  ): {
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

  const cardStyle = (c: CardSpec): CSSProperties =>
    ({
      top: `${(c.y / H) * 100}%`,
      left: `${c.side === 'l' ? CARD_LEFT : CARD_RIGHT}%`,
      width: `${CARD_WIDTH}%`,
      '--c': COLOUR[c.id],
      '--t': STAGE_TINT[byId(c.id).stage],
      '--d': `${1.1 + CARDS.indexOf(c) * 0.05}s`,
    }) as CSSProperties

  const label = (id: DistrictId): string => {
    const n = STEP_NO[id]
    return n === null ? byId(id).building : `${n}. ${byId(id).building}`
  }

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
            <TownScene
              focusId={focusId}
              dimOthers={dimOthers}
              litAll={litAll}
              isOn={isOn}
              hoverProps={hoverProps}
              onSelect={pick}
            >
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
                  const [tx, ty] = TARGET[c.id]
                  const sx = ((c.side === 'l' ? CARD_LEFT + CARD_WIDTH : CARD_RIGHT) / 100) * W
                  const drop = DROP[c.id]
                  return (
                    <g key={c.id} className="vm-leader" data-on={isOn(c.id) ? '1' : undefined} style={{ '--c': COLOUR[c.id] } as CSSProperties}>
                      {drop === undefined ? <line x1={sx} y1={c.y} x2={tx} y2={ty} /> : <polyline points={`${sx},${c.y} ${drop},${c.y} ${tx},${ty}`} />}
                      <circle cx={tx} cy={ty} r={3.6} />
                    </g>
                  )
                })}
              </g>
            </TownScene>

            {/* desktop label cards */}
            <div className="vm-cards">
              {CARDS.map((c) => {
                const d = byId(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    className="vm-card"
                    data-side={c.side}
                    data-on={isOn(c.id) ? '1' : undefined}
                    aria-pressed={sel === c.id}
                    style={cardStyle(c)}
                    onClick={() => pick(c.id)}
                    {...hoverProps(c.id)}
                  >
                    <span className="vm-card-tag">
                      <span className="vm-card-n">
                        <StepGlyph id={c.id} size={11} />
                      </span>
                      <span className="vm-card-stage">{stageOf(d.stage).name}</span>
                    </span>
                    <span className="vm-card-name">{d.building}</span>
                    <span className="vm-card-line">{d.mapLine}</span>
                  </button>
                )
              })}
            </div>

            {/* touch badges */}
            {districts.map((d) => {
              const [bx, by] = BADGES[d.id].at
              return (
                <button
                  key={d.id}
                  type="button"
                  className="vm-badge"
                  data-on={isOn(d.id) ? '1' : undefined}
                  aria-pressed={sel === d.id}
                  aria-label={label(d.id)}
                  style={{ left: `${(bx / W) * 100}%`, top: `${(by / H) * 100}%`, '--c': COLOUR[d.id], '--t': STAGE_TINT[d.stage] } as CSSProperties}
                  onClick={() => pick(d.id)}
                >
                  <span className="vm-badge-dot">
                    <StepGlyph id={d.id} size={12} />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="vm-chips-wrap">
        <div className="vm-chips" ref={chipsRef} role="group" aria-label="Steps">
          {districts.map((d) => (
            <button
              key={d.id}
              type="button"
              className="vm-chip"
              aria-pressed={sel === d.id}
              style={{ '--c': COLOUR[d.id], '--t': STAGE_TINT[d.stage] } as CSSProperties}
              onClick={() => pick(d.id)}
            >
              <span className="vm-chip-n">
                <StepGlyph id={d.id} size={12} />
              </span>
              {d.building}
            </button>
          ))}
        </div>
      </div>

      {!hideDetail && (
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
                See this step in detail <span aria-hidden="true">&darr;</span>
              </a>
            </div>
            <ul className="vm-facts">
              {current.facts.map(([value, label2]) => (
                <li key={label2} className="vm-fact">
                  <span className="vm-fact-v">{value}</span>
                  <span className="vm-fact-l">{label2}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}

const VillageMap = memo(VillageMapImpl)
export default VillageMap
