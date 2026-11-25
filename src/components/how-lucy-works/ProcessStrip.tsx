import type { CSSProperties, ReactNode } from 'react'
import { districts, stages } from './content'
import { STAGE_NO, STAGE_TINT } from './accents'
import StepGlyph from './StepGlyph'

/** The whole process at a glance: three stages left to right, with the two things behind every step underneath. */
export default function ProcessStrip(): ReactNode {
  const main = stages.filter((s) => s.id !== 'always')
  const always = stages.find((s) => s.id === 'always')
  const chips = (stage: string): ReactNode =>
    districts
      .filter((d) => d.stage === stage)
      .map((d) => (
        <li key={d.id}>
          <a className="ps-chip" href={`#${d.id}`}>
            <span className="ps-chip-n" aria-hidden="true">
              <StepGlyph id={d.id} size={11} />
            </span>
            <span>{d.building}</span>
          </a>
        </li>
      ))

  return (
    <section className="ps" aria-label="The process in three stages">
      <ol className="ps-stages" role="list">
        {main.map((s) => (
          <li key={s.id} className="ps-stage" style={{ '--t': STAGE_TINT[s.id] } as CSSProperties}>
            <div className="ps-stage-in">
              <span className="ps-no font-display" aria-hidden="true">
                {STAGE_NO[s.id]}
              </span>
              <h3 className="ps-name font-display">{s.name}</h3>
              <p className="ps-line">{s.line}</p>
              <ul className="ps-chips" role="list">
                {chips(s.id)}
              </ul>
            </div>
            <span className="ps-arrow" aria-hidden="true" />
          </li>
        ))}
      </ol>
      {always && (
        <div className="ps-base" style={{ '--t': STAGE_TINT.always } as CSSProperties}>
          <div className="ps-base-copy">
            <h3 className="ps-name font-display">{always.name}</h3>
            <p className="ps-line">{always.line}</p>
          </div>
          <ul className="ps-chips" role="list">
            {chips('always')}
          </ul>
        </div>
      )}
    </section>
  )
}
