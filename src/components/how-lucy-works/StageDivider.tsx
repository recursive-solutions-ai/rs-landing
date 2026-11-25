import type { CSSProperties, ReactNode } from 'react'
import type { StageId } from './content'
import { STAGE_NO, STAGE_TINT, stageOf } from './accents'

/** A slim band before the first section of each stage. */
export default function StageDivider({ stage }: { stage: StageId }): ReactNode {
  const s = stageOf(stage)
  const no = STAGE_NO[stage]
  return (
    <div className="hlw-stage" style={{ '--t': STAGE_TINT[stage] } as CSSProperties} role="presentation">
      <div className="hlw-container hlw-stage-in">
        <p className="hlw-stage-tag">
          {no !== null && (
            <span className="hlw-stage-no" aria-hidden="true">
              {no}
            </span>
          )}
          {s.name}
        </p>
        <p className="hlw-stage-line">{s.line}</p>
      </div>
    </div>
  )
}
