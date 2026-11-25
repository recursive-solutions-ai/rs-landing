'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { districts, stages } from './content'
import { STAGE_TINT } from './accents'
import StepGlyph from './StepGlyph'

export default function SectionNav() {
  const [active, setActive] = useState<string | null>(null)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = districts.map(d => document.getElementById(d.id)).filter((e): e is HTMLElement => !!e)
    if (!els.length) return
    const visible = new Map<string, number>()
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio)
          else visible.delete(e.target.id)
        }
        // pick the earliest district (document order) that crosses the reading line
        const first = districts.find(d => visible.has(d.id))
        setActive(first ? first.id : null)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.01] },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const box = scroller.current
    if (!box || !active) return
    if (box.scrollWidth <= box.clientWidth + 1) return // everything fits: never scroll
    const chip = box.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (!chip) return
    const target = chip.offsetLeft - (box.clientWidth - chip.offsetWidth) / 2
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    box.scrollTo({ left: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth' })
  }, [active])

  return (
    <nav className="hlw-nav" aria-label="Steps of the process">
      <div className="hlw-nav-inner hlw-container">
        <div className="hlw-nav-scroll" ref={scroller}>
          <ul role="list" className="hlw-nav-groups">
            {stages.map(s => (
              <li key={s.id} className="hlw-nav-group" style={{ '--hlw-accent': STAGE_TINT[s.id] } as CSSProperties}>
                <span className="hlw-nav-stage">{s.name}</span>
                <ul role="list" className="hlw-nav-items">
                  {districts
                    .filter(d => d.stage === s.id)
                    .map(d => (
                      <li key={d.id}>
                        <a
                          href={`#${d.id}`}
                          data-id={d.id}
                          className={`hlw-chip${active === d.id ? ' is-active' : ''}`}
                          aria-current={active === d.id ? 'location' : undefined}
                        >
                          <span className="hlw-chip-dot" aria-hidden="true">
                            <StepGlyph id={d.id} size={10} />
                          </span>
                          {d.building}
                        </a>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
