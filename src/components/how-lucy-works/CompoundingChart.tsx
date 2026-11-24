'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { compounding } from './content'
import Reveal from './Reveal'

const W = 720
const H = 420
const X0 = 48
const X1 = 696
const BASE = 360
const TOP = 70
const MONTHS = 12
const COL = 38
const STEP = (X1 - X0) / MONTHS
// Articles (0-based publication order) that never take off.
const DUDS = new Set([2, 5, 8])

/** Thickness of one article's slab at a given age in months. */
function thickness(age: number, dud: boolean) {
  if (dud) return 2.2
  if (age < 2) return 2.2
  return 2.2 + Math.pow(age - 1, 1.6) * 0.9
}

function build() {
  const cols = Array.from({ length: MONTHS }, (_, m) => {
    // articles 0..m published so far; article k has age m - k at month m
    const slabs = Array.from({ length: m + 1 }, (_, k) => ({ k, t: thickness(m - k, DUDS.has(k)), dud: DUDS.has(k) }))
    const total = slabs.reduce((s, x) => s + x.t, 0)
    return { m, slabs, total }
  })
  const max = Math.max(...cols.map(c => c.total + c.slabs.length * 1.4))
  const scale = (BASE - TOP) / max
  return { cols, scale }
}

function smooth(pts: [number, number][]) {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

export default function CompoundingChart() {
  const boxRef = useRef<HTMLDivElement>(null)
  const { cols, scale } = build()

  const tops: [number, number][] = cols.map(c => [X0 + STEP * c.m + STEP / 2, BASE - (c.total + c.slabs.length * 1.4) * scale - 8])
  const curve = smooth(tops)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight * 0.8 && r.bottom > 0) return
    if (typeof IntersectionObserver === 'undefined') return
    el.classList.add('hlw-chart-armed')
    const io = new IntersectionObserver(
      es => {
        if (es.some(e => e.isIntersecting)) {
          el.classList.add('hlw-chart-in')
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="compounding"
      aria-labelledby="compounding-title"
      className="hlw-section hlw-alt hlw-compounding"
      style={{ '--hlw-accent': '#58c2c9' } as CSSProperties}
    >
      <div className="hlw-container">
        <Reveal className="hlw-compounding-head">
          <p className="hlw-eyebrow">{compounding.eyebrow}</p>
          <h2 id="compounding-title" className="hlw-h2 font-display">
            {compounding.headline}
          </h2>
          <div className="hlw-compounding-body">
            {compounding.body.map(p => (
              <p key={p} className="hlw-body">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="hlw-chart-card" delay={100}>
          <div ref={boxRef} className="hlw-chart">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="hlw-chart-title hlw-chart-desc" preserveAspectRatio="xMidYMid meet">
              <title id="hlw-chart-title">How content builds over 12 months</title>
              <desc id="hlw-chart-desc">
                Illustration: a stack of articles grows each month. Traffic stays flat for the first two months, then climbs faster as older articles keep
                working and new ones are added. Some articles never take off.
              </desc>
              <defs>
                <linearGradient id="hlw-slab" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#2a8a93" />
                  <stop offset="100%" stopColor="#7fe0e6" />
                </linearGradient>
                <linearGradient id="hlw-curve" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8ea2ff" />
                  <stop offset="100%" stopColor="#e2b25a" />
                </linearGradient>
              </defs>

              {/* phase bands, matching compounding.phases */}
              {[[0, 2], [2, 5], [5, 12]].map(([from, to], i) => {
                const [t1, t2] = compounding.phases[i][0].split(/ (.*)/s)
                return (
                  <g key={i}>
                    <rect x={X0 + STEP * from} y={22} width={STEP * (to - from)} height={BASE - 22} className={`hlw-band hlw-band-${i}`} />
                    <text x={X0 + STEP * from + 10} y={46} className="hlw-band-cap">
                      <tspan x={X0 + STEP * from + 10}>{t1}</tspan>
                      <tspan x={X0 + STEP * from + 10} dy="19">{t2}</tspan>
                    </text>
                  </g>
                )
              })}
              <line x1={X0} x2={X1} y1={BASE} y2={BASE} className="hlw-axis" />

              {cols.map(c => {
                let y = BASE
                const x = X0 + STEP * c.m + (STEP - COL) / 2
                return (
                  <g key={c.m} className="hlw-col" style={{ '--i': c.m } as CSSProperties}>
                    {c.slabs.map(s => {
                      const h = Math.max(s.t * scale, 1.2)
                      const ry = y - h
                      y = ry - 1.4 * scale
                      return (
                        <rect
                          key={s.k}
                          x={x}
                          y={ry}
                          width={COL}
                          height={h}
                          rx={1.5}
                          className={s.dud ? 'hlw-slab is-dud' : 'hlw-slab'}
                        />
                      )
                    })}
                  </g>
                )
              })}

              <path d={curve} pathLength={1} className="hlw-curve" />
              <circle cx={tops[MONTHS - 1][0]} cy={tops[MONTHS - 1][1]} r={5} className="hlw-curve-end" />

              {cols.map(c => (
                <text
                  key={c.m}
                  x={X0 + STEP * c.m + STEP / 2}
                  y={BASE + 26}
                  textAnchor="middle"
                  className={`hlw-axis-label${c.m % 2 === 1 ? ' hlw-axis-even' : ''}`}
                >
                  {c.m + 1}
                </text>
              ))}
              <text x={(X0 + X1) / 2} y={BASE + 54} textAnchor="middle" className="hlw-axis-title">
                Month
              </text>
            </svg>
          </div>
          <ul className="hlw-legend" role="list">
            <li>
              <span className="hlw-legend-swatch" /> An article that works
            </li>
            <li>
              <span className="hlw-legend-swatch is-dud" /> An article that does not take off
            </li>
          </ul>
        </Reveal>

        <ol className="hlw-phases" role="list">
          {compounding.phases.map(([title, text], i) => (
            <Reveal as="li" key={title} className="hlw-phase" delay={i * 90}>
              <span className="hlw-phase-title font-display">{title}</span>
              <span className="hlw-phase-text">{text}</span>
            </Reveal>
          ))}
        </ol>
        <p className="hlw-caption">{compounding.chartCaption}</p>
      </div>
    </section>
  )
}
