'use client'

import type { FocusEvent, KeyboardEvent } from 'react'
import type { District } from './content'

const C = 210 // centre of the 420 x 420 viewBox
const R = 108 // ring radius
const NR = 20 // node radius

function wrap(text: string, max: number): string[] {
  const pieces: { t: string; join: string }[] = []
  text.split(' ').forEach(w => {
    w.split(/(?<=-)/).forEach((p, k) => pieces.push({ t: p, join: k === 0 ? ' ' : '' }))
  })
  const lines: string[] = []
  let cur = ''
  for (const p of pieces) {
    const cand = cur ? cur + p.join + p.t : p.t
    if (cand.length <= max || !cur) cur = cand
    else {
      lines.push(cur)
      cur = p.t
    }
  }
  if (cur) lines.push(cur)
  return lines
}

/** Keyboard and click behaviour for a step node, only when the ring is interactive. */
function selectProps(onSelect: ((i: number) => void) | undefined, i: number, label: string, on: boolean) {
  if (!onSelect) return {}
  return {
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': `Step ${i + 1}: ${label}`,
    'aria-pressed': on,
    onClick: () => onSelect(i),
    onFocus: (e: FocusEvent) => {
      if ((e.target as Element).matches(':focus-visible')) onSelect(i)
    },
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect(i)
      }
    },
  }
}

type Props = {
  district: District
  active: number | null
  onActive: (i: number | null) => void
  /**
   * Journey panel mode: nodes become keyboard-focusable buttons that call `onSelect`,
   * and the ring gets an accent arc from the active step to the next that fills over
   * `progress.ms` (static and full while `progress.held`).
   */
  onSelect?: (i: number) => void
  /** Crop the viewBox to the drawing (labels included) so it fills a small frame. */
  tight?: boolean
  progress?: { ms: number; held: boolean; cycle: number }
}

export default function LoopRing({ district, active, onActive, onSelect, tight = false, progress }: Props) {
  const label = `${district.building}: ${district.steps.map(s => s.label).join(', ')}${district.id === 'foundation' ? '' : ', then it repeats'}`
  return (
    <svg
      className="hlw-ring"
      viewBox={tight ? (district.id === 'foundation' ? '62 8 340 392' : '44 52 362 316') : '0 0 420 420'}
      role={onSelect ? 'group' : 'img'}
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`hlw-glow-${district.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--hlw-accent)" stopOpacity="0.22" />
          <stop offset="70%" stopColor="var(--hlw-accent)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--hlw-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r={206} fill={`url(#hlw-glow-${district.id})`} />
      {district.id === 'foundation' ? (
        <Layers district={district} active={active} onActive={onActive} onSelect={onSelect} />
      ) : (
        <Ring district={district} active={active} onActive={onActive} onSelect={onSelect} progress={progress} />
      )}
    </svg>
  )
}

function Ring({ district, active, onActive, onSelect, progress }: Props) {
  const n = district.steps.length
  const ang = (i: number) => (i / n) * 2 * Math.PI
  const at = (a: number, r = R): [number, number] => [C + r * Math.sin(a), C - r * Math.cos(a)]
  const off = (NR + 7) / R // angular clearance around a node

  const nameLines = wrap(district.building, 11)
  const nameSize = nameLines.length > 2 || nameLines.some(l => l.length > 11) ? 16 : 19

  return (
    <g>
      <circle cx={C} cy={C} r={R} className="hlw-ring-track" />

      {/* arc arrows */}
      {district.steps.map((_, i) => {
        const a1 = ang(i) + off
        const a2 = ang(i + 1) - off
        const [x1, y1] = at(a1)
        const [x2, y2] = at(a2)
        const tx = Math.cos(a2)
        const ty = Math.sin(a2)
        const nx = -ty
        const ny = tx
        const bx = x2 - 7 * tx
        const by = y2 - 7 * ty
        return (
          <g key={`arc-${i}`} className="hlw-arc">
            <path d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`} />
            <path
              d={`M ${(bx + 4.5 * nx).toFixed(2)} ${(by + 4.5 * ny).toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)} L ${(bx - 4.5 * nx).toFixed(2)} ${(by - 4.5 * ny).toFixed(2)}`}
            />
          </g>
        )
      })}

      {/* progress: fills from the active step towards the next while the timer runs */}
      {progress && active !== null && (() => {
        const [x1, y1] = at(ang(active) + off)
        const [x2, y2] = at(ang(active + 1) - off)
        return (
          <path
            key={`${active}-${progress.cycle}-${progress.held}`}
            d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
            pathLength={1}
            className={`hlw-progress${progress.held ? ' is-held' : ''}`}
            style={{ animationDuration: `${progress.ms}ms` }}
            aria-hidden="true"
          />
        )
      })()}

      {/* orbiting dot */}
      <g className="hlw-orbit" aria-hidden="true">
        {Array.from({ length: 18 }, (_, k) => {
          const a1 = ((-84 + k * 4.6) * Math.PI) / 180
          const a2 = ((-84 + (k + 1) * 4.6) * Math.PI) / 180
          const [x1, y1] = at(a1)
          const [x2, y2] = at(a2)
          const t = (k + 1) / 18
          return (
            <path
              key={k}
              d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
              className="hlw-comet"
              style={{ strokeOpacity: (t * t * 0.7).toFixed(3), strokeWidth: (0.8 + t * 4.2).toFixed(2) }}
            />
          )
        })}
        <circle cx={C} cy={C - R} r={11} className="hlw-orbit-halo" />
        <circle cx={C} cy={C - R} r={5} className="hlw-orbit-dot" />
      </g>

      {/* centre */}
      <g className="hlw-ring-centre" aria-hidden="true">
        <g transform={`translate(${C} ${C - 28 - (nameLines.length - 1) * 3})`} className="hlw-repeat-icon">
          <path d="M -8 -1 A 8 8 0 0 1 6 -6" />
          <path d="M 3 -9 L 7 -5.5 L 2 -3" />
          <path d="M 8 1 A 8 8 0 0 1 -6 6" />
          <path d="M -3 9 L -7 5.5 L -2 3" />
        </g>
        <text textAnchor="middle" className="hlw-ring-name font-display" style={{ fontSize: nameSize }}>
          {nameLines.map((l, k) => (
            <tspan key={k} x={C} y={C + 8 + k * 22 - (nameLines.length - 1) * 3}>
              {l}
            </tspan>
          ))}
        </text>
      </g>

      {/* labels */}
      {district.steps.map((s, i) => {
        const a = ang(i)
        const sin = Math.sin(a)
        const cos = Math.cos(a)
        const [lx, ly] = at(a, R + NR + 8)
        const anchor = sin > 0.35 ? 'start' : sin < -0.35 ? 'end' : 'middle'
        const lines = wrap(s.label, 10)
        const lh = 17
        let y0: number
        if (anchor === 'middle') y0 = cos > 0 ? ly - (lines.length - 1) * lh - 3 : ly + 10
        else y0 = ly - ((lines.length - 1) * lh) / 2 + 4.5
        return (
          <text
            key={`lab-${i}`}
            textAnchor={anchor}
            className={`hlw-ring-label${active === i ? ' is-active' : ''}`}
            aria-hidden="true"
          >
            {lines.map((l, k) => (
              <tspan key={k} x={lx.toFixed(1)} y={(y0 + k * lh).toFixed(1)}>
                {l}
              </tspan>
            ))}
          </text>
        )
      })}

      {/* nodes */}
      {district.steps.map((s, i) => {
        const [x, y] = at(ang(i))
        const you = s.by === 'you'
        const [tx, ty] = at(ang(i), R - NR - 9)
        return (
          <g
            key={`node-${i}`}
            transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`}
            onMouseEnter={() => onActive(i)}
            onMouseLeave={() => onActive(null)}
            {...selectProps(onSelect, i, s.label, active === i)}
          >
            <g className={`hlw-node ${you ? 'is-you' : 'is-lucy'}${active === i ? ' is-active' : ''}`}>
              <circle r={NR + 7} className="hlw-node-glow" />
              <circle r={NR} className="hlw-node-disc" />
              <text className="hlw-node-num" textAnchor="middle" dominantBaseline="central">
                {i + 1}
              </text>
            </g>
            {you && (
              <g transform={`translate(${(tx - x).toFixed(2)} ${(ty - y).toFixed(2)})`} className="hlw-you-tag" aria-hidden="true">
                <rect x={-12} y={-7} width={24} height={14} rx={7} />
                <text textAnchor="middle" dominantBaseline="central" y={0.5}>
                  You
                </text>
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
}

function Layers({ district, active, onActive, onSelect }: Props) {
  const cx = 186
  const hw = 98
  const hh = 30
  const th = 11
  const gap = 58
  const yBase = 335

  return (
    <g>
      {/* soft ground shadow */}
      <ellipse cx={cx} cy={yBase + 52} rx={120} ry={20} className="hlw-layer-shadow" />
      {district.steps.map((s, i) => {
        const yc = yBase - i * gap
        const top = `${cx},${yc - hh} ${cx + hw},${yc} ${cx},${yc + hh} ${cx - hw},${yc}`
        const left = `${cx - hw},${yc} ${cx},${yc + hh} ${cx},${yc + hh + th} ${cx - hw},${yc + th}`
        const right = `${cx},${yc + hh} ${cx + hw},${yc} ${cx + hw},${yc + th} ${cx},${yc + hh + th}`
        const lines = wrap(s.label, 14)
        return (
          <g
            key={i}
            onMouseEnter={() => onActive(i)}
            onMouseLeave={() => onActive(null)}
            className={`hlw-layer${active === i ? ' is-active' : ''}`}
            {...selectProps(onSelect, i, s.label, active === i)}
          >
            <g className="hlw-layer-body">
              <polygon points={left} className="hlw-layer-base" />
              <polygon points={left} className="hlw-layer-side" />
              <polygon points={right} className="hlw-layer-base" />
              <polygon points={right} className="hlw-layer-side2" />
              <polygon points={top} className="hlw-layer-base" />
              <polygon points={top} className="hlw-layer-top" />
              <g transform={`translate(${cx} ${yc})`} className="hlw-node is-lucy">
                <circle r={14} className="hlw-node-disc" />
                <text className="hlw-node-num" textAnchor="middle" dominantBaseline="central">
                  {i + 1}
                </text>
              </g>
            </g>
            <path d={`M ${cx + hw + 3} ${yc + 4} L ${cx + hw + 14} ${yc + 4}`} className="hlw-layer-leader" />
            <text className={`hlw-ring-label${active === i ? ' is-active' : ''}`} aria-hidden="true">
              {lines.map((l, k) => (
                <tspan key={k} x={cx + hw + 20} y={yc + 4 - ((lines.length - 1) * 15) / 2 + 4.5 + k * 15}>
                  {l}
                </tspan>
              ))}
            </text>
          </g>
        )
      })}
    </g>
  )
}
