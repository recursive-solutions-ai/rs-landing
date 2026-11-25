import { districts, stages, type DistrictId } from './content'
import { OVERVIEW, focusCam, fly, hopZoom, type Cam } from './camera'

/**
 * The scroll journey as pure data: a list of beats on one timeline, each a function
 * from progress (0..1) to the complete state of the scene at that moment. The
 * component only has to render `frameAt(t)`, so scrubbing forwards, backwards or
 * jumping (deep links) always lands on the same picture.
 */
export type Frame = {
  cam: Cam
  /** Overview cards, leader lines and map title: 0..1. */
  cards: number
  /** "Scroll to start" cue: 0..1. */
  hint: number
  /** How much of the content panel is revealed: 0..1. Items stagger in as it rises. At 1 the beat is live. */
  panel: number
  /** Index into `districts` of the panel content, or null. */
  panelDi: number | null
  /** Index into `stages` for the stage title card, or null. */
  stageIdx: number | null
  /** Stage title card (and veil) opacity: 0..1. */
  stageCard: number
  focusId: DistrictId | null
  dim: boolean
  litAll: boolean
  /** Index into `districts` highlighted on the progress rail; districts.length means the tour is finished. */
  rail: number | null
}

type Beat = { t0: number; t1: number; kind: string; f: (p: number) => Frame }

export type Plan = {
  total: number
  /** Time at which each district's dwell beat starts (panel fully in). */
  labels: Record<DistrictId, number>
  beats: Beat[]
  frameAt: (t: number) => Frame
}

export const DUR = {
  intro: 0.5,
  cardsOut: 0.8,
  /** About 0.4 viewport heights per stage title card. */
  stageCard: 2.0,
  enter: 1.4,
  /** One dwell beat per district: about 0.6 viewport heights, the panel's own timer walks the steps. */
  dwell: 3.0,
  hop: 1.4,
  out: 1.4,
  outro: 1.6,
  cardsIn: 1.0,
  rest: 1.0,
}
/** Slow push-in while inside a building. */
const DRIFT = 0.05

const sm = (p: number): number => {
  const x = Math.min(1, Math.max(0, p))
  return x * x * (3 - 2 * x)
}
/** 0 to 1 over [a, b]. */
const ramp = (p: number, a: number, b: number): number => sm((p - a) / (b - a))

const blank = (): Frame => ({
  cam: OVERVIEW,
  cards: 0,
  hint: 0,
  panel: 0,
  panelDi: null,
  stageIdx: null,
  stageCard: 0,
  focusId: null,
  dim: false,
  litAll: false,
  rail: null,
})

const holdCam = (id: DistrictId, d: number): Cam => {
  const c = focusCam(id)
  return { ...c, z: c.z * (1 + DRIFT * d) }
}

export function buildPlan(): Plan {
  const beats: Beat[] = []
  let t = 0
  const add = (kind: string, dur: number, f: (p: number) => Frame): void => {
    beats.push({ t0: t, t1: t + dur, kind, f })
    t += dur
  }
  const labels = {} as Record<DistrictId, number>

  add('intro', DUR.intro, () => ({ ...blank(), cards: 1, hint: 1 }))
  add('cards-out', DUR.cardsOut, (p) => ({ ...blank(), cards: 1 - ramp(p, 0, 1), hint: 1 - ramp(p, 0, 0.6) }))

  stages.forEach((stage, si) => {
    const idxs = districts.map((d, i) => (d.stage === stage.id ? i : -1)).filter((i) => i >= 0)
    const firstIdx = idxs[0]
    const first = districts[firstIdx].id

    add('stage-card', DUR.stageCard, (p) => ({
      ...blank(),
      stageIdx: si,
      stageCard: ramp(p, 0, 0.18) * (1 - ramp(p, 0.82, 1)),
      rail: firstIdx,
    }))
    add('enter', DUR.enter, (p) => ({
      ...blank(),
      cam: fly(OVERVIEW, focusCam(first), p),
      panel: ramp(p, 0.45, 1),
      panelDi: firstIdx,
      focusId: p > 0.3 ? first : null,
      dim: p > 0.3,
      rail: firstIdx,
    }))

    idxs.forEach((di, k) => {
      const d = districts[di]
      labels[d.id] = t
      add(`dwell:${d.id}`, DUR.dwell, (p) => ({
        ...blank(),
        cam: holdCam(d.id, p),
        panel: 1,
        panelDi: di,
        focusId: d.id,
        dim: true,
        rail: di,
      }))

      const from = holdCam(d.id, 1)
      const nextDi = idxs[k + 1]
      if (nextDi !== undefined) {
        // pull back part of the way, pan along the route, zoom in on the next building
        const next = districts[nextDi]
        const to = focusCam(next.id)
        const zMid = hopZoom(from, to)
        add(`hop:${d.id}`, DUR.hop, (p) => ({
          ...blank(),
          cam: fly(from, to, p, zMid, true),
          panel: p < 0.3 ? 1 - ramp(p, 0, 0.3) : ramp(p, 0.65, 1),
          panelDi: p < 0.5 ? di : nextDi,
          focusId: p < 0.5 ? d.id : next.id,
          dim: p < 0.1 || p > 0.9,
          rail: p < 0.5 ? di : nextDi,
        }))
      } else if (si < stages.length - 1) {
        // new stage next: all the way back to the overview
        add(`out:${d.id}`, DUR.out, (p) => ({
          ...blank(),
          cam: fly(from, OVERVIEW, p),
          panel: 1 - ramp(p, 0, 0.3),
          panelDi: di,
          focusId: p < 0.4 ? d.id : null,
          dim: p < 0.1,
          rail: di,
        }))
      } else {
        add('outro', DUR.outro, (p) => ({
          ...blank(),
          cam: fly(from, OVERVIEW, p),
          panel: 1 - ramp(p, 0, 0.3),
          panelDi: di,
          focusId: p < 0.3 ? d.id : null,
          dim: p < 0.1,
          litAll: p > 0.35,
          rail: di,
        }))
      }
    })
  })

  add('cards-in', DUR.cardsIn, (p) => ({ ...blank(), cards: ramp(p, 0, 1), litAll: true, rail: districts.length }))
  add('rest', DUR.rest, () => ({ ...blank(), cards: 1, litAll: true, rail: districts.length }))

  const total = t
  const frameAt = (time: number): Frame => {
    const tt = Math.min(total, Math.max(0, time))
    let lo = 0
    let hi = beats.length - 1
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (beats[mid].t0 <= tt) lo = mid
      else hi = mid - 1
    }
    const b = beats[lo]
    return b.f(Math.min(1, Math.max(0, (tt - b.t0) / (b.t1 - b.t0))))
  }
  return { total, labels, beats, frameAt }
}
