'use client'

import { useState, type CSSProperties } from 'react'
import type { District } from './content'
import { ACCENT } from './accents'
import LoopRing from './LoopRing'
import Reveal from './Reveal'
import BuildingVignette from './BuildingVignette'
import { SectionListenButton } from './NarratedTour'

export default function LoopSection({
  district,
  reversed,
  alt,
  showRoad,
}: {
  district: District
  reversed: boolean
  alt: boolean
  showRoad: boolean
}) {
  const [active, setActive] = useState<number | null>(null)
  const titleId = `${district.id}-title`
  const style = { '--hlw-accent': ACCENT[district.id] } as CSSProperties

  return (
    <section
      id={district.id}
      aria-labelledby={titleId}
      className={`hlw-section hlw-loop${alt ? ' hlw-alt' : ''}${reversed ? ' hlw-flip' : ''}`}
      style={style}
    >
      <div className="hlw-container hlw-loop-grid">
        <div className="hlw-loop-copy">
          <Reveal className="hlw-loop-head">
            <BuildingVignette district={district} />
            <SectionListenButton id={district.id} />
            <p className="hlw-eyebrow">{district.eyebrow}</p>
            <h2 id={titleId} className="hlw-h2 font-display">
              {district.headline}
            </h2>
            <p className="hlw-body">{district.intro}</p>
          </Reveal>

          <Reveal className="hlw-loop-meta" delay={60}>
            <p className="hlw-runs">
              <span className="hlw-runs-label">Runs</span>
              <span className="hlw-runs-value">{district.cadence}</span>
            </p>

            <ul className="hlw-facts" role="list">
              {district.facts.map(([value, label]) => (
                <li key={label} className="hlw-fact">
                  <span className="hlw-fact-value font-display">{value}</span>
                  <span className="hlw-fact-label">{label}</span>
                </li>
              ))}
            </ul>

            {district.note && <p className="hlw-note">{district.note}</p>}
          </Reveal>
        </div>

        <Reveal className="hlw-loop-ring" delay={80}>
          <div className="hlw-ring-wrap">
            <LoopRing district={district} active={active} onActive={setActive} />
          </div>
        </Reveal>

        <Reveal className="hlw-loop-steps" delay={120}>
          <p className="hlw-visual-title">What Lucy does</p>
          <ol className="hlw-steps" role="list">
            {district.steps.map((s, i) => (
              <li
                key={s.label}
                tabIndex={0}
                className={`hlw-step${active === i ? ' is-active' : ''}${s.by === 'you' ? ' is-you' : ''}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              >
                <span className="hlw-step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="hlw-step-body">
                  <span className="hlw-step-head">
                    <strong className="hlw-step-label">{s.label}</strong>
                    <span className={`hlw-badge ${s.by === 'you' ? 'is-you' : 'is-lucy'}`}>{s.by === 'you' ? 'You' : 'Lucy'}</span>
                  </span>
                  <span className="hlw-step-detail">{s.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
      {showRoad && (
        <div className="hlw-road" aria-hidden="true">
          <span className="hlw-road-dot" />
        </div>
      )}
    </section>
  )
}
