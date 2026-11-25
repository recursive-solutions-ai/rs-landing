import { describe, expect, it } from 'vitest'
import { districts } from './content'
import { buildPlan } from './journey-plan'

describe('journey plan', () => {
  const plan = buildPlan()

  it('visits every district once, in content order', () => {
    const order = Object.entries(plan.labels)
      .sort((a, b) => a[1] - b[1])
      .map(([id]) => id)
    expect(order).toEqual(districts.map((d) => d.id))
  })

  it('gives every district one dwell beat with the whole panel showing', () => {
    for (const d of districts) {
      const beats = plan.beats.filter((b) => b.kind === `dwell:${d.id}`)
      expect(beats).toHaveLength(1)
      for (const p of [0, 0.5, 1]) {
        const f = beats[0].f(p)
        expect(f.panel).toBe(1)
        expect(districts[f.panelDi as number].id).toBe(d.id)
      }
    }
  })

  it('moves the camera continuously: no jumps at beat boundaries', () => {
    for (let i = 1; i < plan.beats.length; i += 1) {
      const a = plan.beats[i - 1].f(1)
      const b = plan.beats[i].f(0)
      const tag = `${plan.beats[i - 1].kind} -> ${plan.beats[i].kind}`
      expect({ tag, fx: Math.round(a.cam.fx), fy: Math.round(a.cam.fy), z: +a.cam.z.toFixed(3), ax: +a.cam.ax.toFixed(3) }).toEqual({
        tag,
        fx: Math.round(b.cam.fx),
        fy: Math.round(b.cam.fy),
        z: +b.cam.z.toFixed(3),
        ax: +b.cam.ax.toFixed(3),
      })
      expect({ tag, panel: +a.panel.toFixed(2) }).toEqual({ tag, panel: +b.panel.toFixed(2) })
      expect({ tag, cards: +a.cards.toFixed(2) }).toEqual({ tag, cards: +b.cards.toFixed(2) })
    }
  })

  it('hides the panel while the camera is between buildings', () => {
    for (const b of plan.beats) {
      if (b.kind.startsWith('hop:')) expect(b.f(0.5).panel).toBe(0)
    }
  })

  it('is about 11 to 13 viewport heights long at 0.2vh per unit', () => {
    expect(plan.total * 0.2).toBeGreaterThan(11)
    expect(plan.total * 0.2).toBeLessThan(13)
  })

  it('has no scroll-driven step walk: only stage cards, enters, dwells, hops, outs', () => {
    const kinds = new Set(plan.beats.map((b) => b.kind.split(':')[0]))
    expect([...kinds].sort()).toEqual(['cards-in', 'cards-out', 'dwell', 'enter', 'hop', 'intro', 'out', 'outro', 'rest', 'stage-card'])
  })

  it('spends about one viewport height per district (enter or hop, plus dwell) and 0.4 per stage card', () => {
    const dur = (k: string): number => plan.beats.filter((b) => b.kind.split(':')[0] === k).reduce((n, b) => n + b.t1 - b.t0, 0)
    expect(dur('stage-card') / 4 * 0.2).toBeCloseTo(0.4, 1)
    const perDistrict = (dur('dwell') + dur('enter') + dur('hop') + dur('out') + dur('outro')) / districts.length
    expect(perDistrict * 0.2).toBeGreaterThan(0.8)
    expect(perDistrict * 0.2).toBeLessThan(1.1)
  })

  it('ends on the full overview with every building lit and cards back', () => {
    const f = plan.frameAt(plan.total)
    expect(f.cam.z).toBe(1)
    expect(f.litAll).toBe(true)
    expect(f.cards).toBe(1)
  })
})
