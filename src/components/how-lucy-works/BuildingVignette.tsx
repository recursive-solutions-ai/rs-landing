import type { CSSProperties, ReactNode } from 'react'
import type { District } from './content'
import { ACCENT, STAGE_TINT } from './accents'
import { FOCUS, SCENE_ID } from './TownScene'
import StepGlyph from './StepGlyph'

const ASPECT = 2 // width / height of the vignette's viewBox

/**
 * A small still of the building a section is about. It re-uses the scene drawn in the
 * hero map (same document, `<use>`), looked at through that building's FOCUS rectangle,
 * so the stacked layout shows "its" building without a second copy of the artwork.
 */
export default function BuildingVignette({ district }: { district: District }): ReactNode {
  const r = FOCUS[district.id]
  const h = Math.max(r.h * 1.3, (r.w * 1.3) / ASPECT)
  const w = h * ASPECT
  const cx = r.x + r.w / 2
  const cy = r.y + r.h / 2
  const vb = `${(cx - w / 2).toFixed(1)} ${(cy - h / 2).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`
  const style = { '--v': ACCENT[district.id], '--t': STAGE_TINT[district.stage] } as CSSProperties
  return (
    <figure className="hlw-vignette" style={style}>
      <svg className="hlw-vignette-svg" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <use href={`#${SCENE_ID}`} />
      </svg>
      <figcaption className="hlw-vignette-cap">
        <span className="hlw-vignette-n">
          <StepGlyph id={district.id} size={12} />
        </span>
        {district.building}
      </figcaption>
    </figure>
  )
}
