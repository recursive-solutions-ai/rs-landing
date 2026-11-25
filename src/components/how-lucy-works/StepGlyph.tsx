import type { ReactNode } from 'react'
import type { DistrictId } from './content'
import { STEP_NO } from './accents'

/** The step number, or an icon for the two districts that sit behind every step. */
export default function StepGlyph({ id, size = 12 }: { id: DistrictId; size?: number }): ReactNode {
  const n = STEP_NO[id]
  if (n !== null) return <>{n}</>
  if (id === 'silo') {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4.2 8 1.8l6 2.4-6 2.4z" />
        <path d="m2 8 6 2.4L14 8" />
        <path d="m2 11.6 6 2.4 6-2.4" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 8.5 3.2 3.2L13 4.5" />
    </svg>
  )
}

