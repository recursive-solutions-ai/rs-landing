'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/components/lucy-v2/gsap'
import { districts, stages, type DistrictId } from './content'
import { ACCENT, STAGE_NO, STAGE_TINT } from './accents'
import { FULL_VIEWBOX } from './TownScene'
import { viewBoxOf } from './camera'
import { buildPlan } from './journey-plan'
import { intentOf, stopTarget } from './journey-keys'
import VillageMap from './VillageMap'
import StepGlyph from './StepGlyph'
import LoopRing from './LoopRing'
import { TourButton, TourDock, dockVisible } from './NarratedTour'
import { useNarration } from './useNarration'
import { nearestStopIndex } from './narration-logic'
import './journey.css'

/** The journey is a desktop enhancement. Everything else gets the stacked layout. */
const QUERY = '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'
/** Scroll distance per timeline unit, in viewport heights. */
const UNIT_VH = 0.2
/** Fixed site header (LucyV2Chrome: h-16). */
const HEADER_PX = 64
/** First section after the journey (the stats strip). */
const AFTER_ID = 'under-the-hood'

const plan = buildPlan()
const DISTRICT_IDS = new Set<string>(districts.map((d) => d.id))

type Ui = {
  di: number | null
  stageIdx: number | null
  focusId: DistrictId | null
  dim: boolean
  litAll: boolean
  rail: number | null
  idle: boolean
  /** The district's beat is fully in: the step timer may run. */
  live: boolean
}
const UI0: Ui = { di: null, stageIdx: null, focusId: null, dim: false, litAll: false, rail: null, idle: true, live: false }
const sameUi = (a: Ui, b: Ui): boolean =>
  a.di === b.di &&
  a.stageIdx === b.stageIdx &&
  a.focusId === b.focusId &&
  a.dim === b.dim &&
  a.litAll === b.litAll &&
  a.rail === b.rail &&
  a.idle === b.idle &&
  a.live === b.live

const show = (el: Element | null, o: number): void => {
  if (!el) return
  const s = (el as HTMLElement).style
  s.opacity = o.toFixed(3)
  s.visibility = o < 0.01 ? 'hidden' : 'visible'
}

export default function TownJourney(): ReactNode {
  const [journey, setJourney] = useState(false)
  const [ui, setUi] = useState<Ui>(UI0)
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  /** Scroll position the running smooth jump is heading to, or null. */
  const destRef = useRef<number | null>(null)
  const { state: narr, controller: narration } = useNarration()

  // Decide the mode after mount so the server-rendered (stacked) markup always hydrates cleanly.
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const sync = (): void => setJourney(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const killTween = useCallback((): void => {
    tweenRef.current?.kill()
    tweenRef.current = null
    destRef.current = null
  }, [])

  const scrollToY = useCallback(
    (y: number, smooth: boolean): void => {
      const retarget = destRef.current !== null
      killTween()
      if (!smooth) {
        window.scrollTo({ top: y, behavior: 'instant' })
        return
      }
      const from = window.scrollY
      const o = { y: from }
      destRef.current = y
      tweenRef.current = gsap.to(o, {
        y,
        duration: Math.min(2.4, Math.max(0.7, Math.abs(y - from) / 5200)),
        // Retargeting mid-flight: do not ease in from a standstill, the page is already moving.
        ease: retarget ? 'power2.out' : 'power2.inOut',
        onUpdate: () => window.scrollTo({ top: o.y, behavior: 'instant' }),
        onComplete: () => {
          destRef.current = null
        },
      })
    },
    [killTween],
  )

  const goTo = useCallback(
    (id: DistrictId, smooth: boolean): void => {
      const st = stRef.current
      if (!st) return
      scrollToY(st.labelToScroll(`d-${id}`), smooth)
    },
    [scrollToY],
  )

  const afterY = useCallback((): number | null => {
    const el = document.getElementById(AFTER_ID)
    return el ? el.getBoundingClientRect().top + window.scrollY - HEADER_PX : null
  }, [])

  const skip = useCallback((): void => {
    const y = afterY()
    if (y === null) return
    killTween()
    window.scrollTo({ top: y, behavior: 'instant' })
  }, [afterY, killTween])

  const pick = useCallback((id: DistrictId): void => goTo(id, true), [goTo])

  useLayoutEffect(() => {
    if (!journey) return
    const stage = stageRef.current
    const root = rootRef.current
    const page = stage?.closest<HTMLElement>('.hlw-root') ?? null
    const heroEl = stage?.closest<HTMLElement>('.hlw-hero') ?? null
    const svg = stage?.querySelector<SVGSVGElement>('.vm-svg') ?? null
    if (!stage || !root || !svg) return

    page?.setAttribute('data-journey', 'on')
    const marks = Array.from(stage.querySelectorAll<SVGGElement>('.vm-mark'))
    const faded = Array.from(stage.querySelectorAll<Element>('.vm-cards, .vm-leaders, .vm-head'))
    const panelEl = stage.querySelector<HTMLElement>('.tj-panel')
    const cardEl = stage.querySelector<HTMLElement>('.tj-stagecard')
    const veilEl = stage.querySelector<HTMLElement>('.tj-veil')
    const hintEl = stage.querySelector<HTMLElement>('.tj-hint')

    let last = UI0
    const apply = (t: number): void => {
      const f = plan.frameAt(t)
      svg.setAttribute('viewBox', viewBoxOf(f.cam))
      const ms = (1 / Math.pow(f.cam.z, 0.65)).toFixed(3)
      for (const m of marks) m.setAttribute('transform', `translate(${m.dataset.x} ${m.dataset.y}) scale(${ms})`)
      for (const el of faded) show(el, f.cards)
      show(hintEl, f.hint)
      show(veilEl, f.stageCard)
      if (cardEl) {
        show(cardEl, f.stageCard)
        cardEl.style.transform = `translate(-50%, calc(-50% + ${((1 - f.stageCard) * 14).toFixed(1)}px))`
      }
      if (panelEl) {
        show(panelEl, Math.min(1, f.panel * 6))
        panelEl.style.setProperty('--rv', f.panel.toFixed(3))
        panelEl.style.transform = `translate(${((1 - Math.min(1, f.panel * 3)) * 26).toFixed(1)}px, 0)`
      }
      const next: Ui = {
        di: f.panelDi,
        stageIdx: f.stageIdx,
        focusId: f.focusId,
        dim: f.dim,
        litAll: f.litAll,
        rail: f.rail,
        idle: f.hint > 0.5 || f.cards > 0.3,
        live: f.panelDi !== null && f.panel >= 0.98,
      }
      if (!sameUi(last, next)) {
        last = next
        setUi(next)
      }
    }

    const topOffset = (): number => {
      const vh = window.innerHeight
      return HEADER_PX + Math.max(0, (vh - HEADER_PX - stage.offsetHeight) / 2)
    }
    const lengthPx = (): number => plan.total * UNIT_VH * window.innerHeight
    // Keep the hero's decorations at their natural height while the pin adds scroll distance to it.
    const setExtra = (): void => heroEl?.style.setProperty('--tj-extra', `${Math.round(lengthPx())}px`)
    setExtra()
    ScrollTrigger.addEventListener('refreshInit', setExtra)

    const ctx = gsap.context(() => {
      const proxy = { t: 0 }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: () => `top ${topOffset()}px`,
          end: () => `+=${lengthPx()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      tl.to(proxy, { t: plan.total, duration: plan.total, ease: 'none', onUpdate: () => apply(proxy.t) }, 0)
      for (const [id, at] of Object.entries(plan.labels)) tl.addLabel(`d-${id}`, at)
      stRef.current = tl.scrollTrigger ?? null
    }, root)

    // Deep links: any in-page link to a district opens the journey at that district.
    const hashTarget = (hash: string): DistrictId | null => {
      const id = hash.replace(/^#/, '')
      return DISTRICT_IDS.has(id) ? (id as DistrictId) : null
    }
    const onClick = (e: MouseEvent): void => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a || a.classList.contains('tj-skip')) return
      const id = hashTarget(a.getAttribute('href') ?? '')
      if (!id) return
      e.preventDefault()
      history.pushState(null, '', `#${id}`)
      goTo(id, true)
    }
    const onHash = (): void => {
      const id = hashTarget(window.location.hash)
      if (id) goTo(id, false)
    }
    const stop = (): void => killTween()

    // Keyboard: arrows and friends move between stops while the pinned stage is on screen.
    const onKey = (e: KeyboardEvent): void => {
      if (e.defaultPrevented) return
      const st = stRef.current
      if (!st) return
      const intent = intentOf(e)
      if (!intent) return
      const t = e.target as HTMLElement | null
      if (t?.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]')) return
      if ((e.key === ' ' || e.key === 'Spacebar') && t?.closest('button, a[href], summary, [role="button"]')) return
      if (e.repeat && intent.kind === 'step') {
        // Held keys would race through every stop; swallow them while we own the page.
        const y0 = destRef.current ?? window.scrollY
        if (y0 >= st.start - 2 && y0 <= st.end + 2) e.preventDefault()
        return
      }
      const y = destRef.current ?? window.scrollY
      if (y < st.start - 2 || y > st.end + 2) return // before or after the pin: native
      const stops = [st.start, ...districts.map((d) => st.labelToScroll(`d-${d.id}`)), st.end]
      let target: number | null = null
      if (intent.kind === 'step') {
        const r = stopTarget(stops, y, intent.dir)
        if (r === 'after') target = afterY()
        else if (r === 'before') target = 0
        else target = stops[r]
        if (target === null) return
      } else if (intent.kind === 'first') target = stops[0]
      else if (intent.kind === 'last') target = stops[districts.length]
      else target = stops[intent.n]
      e.preventDefault()
      scrollToY(target, true)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHash)
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })

    // Let the narrated tour drive and follow the camera: stop 0 is the overview, 1..10 the districts, 11 the closing overview.
    const stops = (): number[] | null => {
      const st = stRef.current
      return st ? [st.start, ...districts.map((d) => st.labelToScroll(`d-${d.id}`)), st.end] : null
    }
    const unregister = narration.registerJourney({
      goToStop: (i) => {
        const s = stops()
        if (s && s[i] !== undefined) scrollToY(s[i], true)
      },
      nearestStop: () => nearestStopIndex(stops() ?? [], window.scrollY, window.innerHeight * 0.5),
      isMoving: () => destRef.current !== null,
    })

    ScrollTrigger.refresh()
    const initial = hashTarget(window.location.hash)
    if (initial) goTo(initial, false)

    return () => {
      unregister()
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', stop)
      ScrollTrigger.removeEventListener('refreshInit', setExtra)
      killTween()
      ctx.revert()
      stRef.current = null
      page?.removeAttribute('data-journey')
      heroEl?.style.removeProperty('--tj-extra')
      svg.setAttribute('viewBox', FULL_VIEWBOX)
      for (const m of marks) m.setAttribute('transform', `translate(${m.dataset.x} ${m.dataset.y})`)
      for (const el of faded) (el as HTMLElement).removeAttribute('style')
      setUi(UI0)
    }
  }, [journey, goTo, scrollToY, afterY, killTween, narration])

  const d = ui.di === null ? null : districts[ui.di]
  const stage = ui.stageIdx === null ? null : stages[ui.stageIdx]

  return (
    <div className="tj" ref={rootRef} data-mode={journey ? 'journey' : 'stacked'}>
      <div
        className="tj-stage"
        ref={stageRef}
        aria-keyshortcuts={journey ? 'ArrowRight ArrowLeft ArrowDown ArrowUp PageDown PageUp Home End 1 2 3 4 5 6 7 8' : undefined}
        aria-describedby={journey ? 'tj-keys-desc' : undefined}
      >
        {journey && (
          <div className="tj-top">
            <a className={`tj-skip${ui.idle ? ' is-idle' : ''}`} href={`#${AFTER_ID}`} onClick={(e) => (e.preventDefault(), skip())}>
              Skip the tour <span aria-hidden="true">&darr;</span>
            </a>
            <TourButton variant="compact" />
          </div>
        )}
        <VillageMap
          focusId={ui.focusId}
          dimOthers={ui.dim}
          litAll={ui.litAll}
          onPick={journey ? pick : undefined}
          hideDetail={journey}
        />
        {journey && (
          <div className="tj-overlay" data-nt={dockVisible(narr) ? (narr.captions ? 'caps' : 'bar') : undefined}>
            <div className="tj-veil" aria-hidden="true" />

            <div
              className="tj-stagecard"
              aria-hidden="true"
              style={{ '--t': STAGE_TINT[stage?.id ?? 'found'] } as CSSProperties}
            >
              {stage && (
                <>
                  {STAGE_NO[stage.id] !== null && <span className="tj-sc-no font-display">{STAGE_NO[stage.id]}</span>}
                  <p className="tj-sc-name font-display">{stage.name}</p>
                  <p className="tj-sc-line">{stage.line}</p>
                </>
              )}
            </div>

            <p className="tj-hint" aria-hidden="true">
              Scroll to fly through the town <span>&darr;</span>
            </p>

            <section
              className="tj-panel"
              aria-label="District details"
              style={{ '--hlw-accent': d ? ACCENT[d.id] : '#8ea2ff', '--t': d ? STAGE_TINT[d.stage] : '#8ea2ff' } as CSSProperties}
            >
              {d && <PanelBody key={d.id} di={ui.di as number} live={ui.live} />}
            </section>

            <Rail current={ui.rail} onGo={(id) => goTo(id, true)} />
            <TourDock />

            <p className="tj-keys" aria-hidden="true">
              <kbd>&larr;</kbd>
              <kbd>&rarr;</kbd>
              <span>to move</span>
            </p>
            <span id="tj-keys-desc" className="sr-only">
              Keyboard: arrow keys, Page Up and Page Down or Space move between districts. Home and End jump to the
              first and last. Keys 1 to 8 open that step. With a step card focused, left and right arrows change the step.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/** How long each step stays on screen before the next one takes over. */
const STEP_MS = 3200

function PanelBody({ di, live }: { di: number; live: boolean }): ReactNode {
  const d = districts[di]
  const n = d.steps.length
  const [step, setStep] = useState(0)
  // Held = the visitor is hovering or focusing the ring or the card: the timer stands still.
  const [held, setHeld] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [tabVisible, setTabVisible] = useState(true)
  const idx = (i: number): CSSProperties => ({ '--i': i }) as CSSProperties

  useEffect(() => {
    const sync = (): void => setTabVisible(document.visibilityState !== 'hidden')
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  // Leaving the beat rewinds it, so the next visit starts from step 1.
  useEffect(() => {
    if (live) return
    setStep(0)
    setHeld(false)
    setCycle((c) => c + 1)
  }, [live])

  const running = live && tabVisible && !held
  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => setStep((s) => (s + 1) % n), STEP_MS)
    return () => window.clearTimeout(t)
  }, [running, step, cycle, n])

  const select = useCallback(
    (i: number): void => {
      setStep(((i % n) + n) % n)
      setCycle((c) => c + 1)
    },
    [n],
  )
  const hoverNode = useCallback(
    (i: number | null): void => {
      if (i === null) setHeld(false)
      else {
        setHeld(true)
        select(i)
      }
    },
    [select],
  )
  const s = d.steps[step]

  // Left/right inside the ring or the step card walk the steps; the window handler (districts) skips handled keys.
  const onStepKey = (e: ReactKeyboardEvent): void => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    setHeld(true)
    select(step + (e.key === 'ArrowRight' ? 1 : -1))
  }

  return (
    <div className="tj-card" key={d.id}>
      <header className="tj-head">
        <p className="tj-eyebrow tj-it" style={idx(0)}>
          {d.eyebrow}
        </p>
        <h3 className="tj-headline font-display tj-it" style={idx(0)}>
          {d.headline}
        </h3>
        <p className="tj-intro tj-it" style={idx(1)} title={d.intro}>
          {d.intro}
        </p>
      </header>

      <div className="tj-vis tj-it" style={idx(2)}>
        <div
          className="tj-ring"
          onKeyDown={onStepKey}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false)
          }}
        >
          <LoopRing
            district={d}
            active={step}
            onActive={hoverNode}
            onSelect={select}
            tight
            progress={{ ms: STEP_MS, held: held || !live, cycle }}
          />
        </div>

        <div
          className="tj-stepcard"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onKeyDown={onStepKey}
          onFocus={(e) => {
            if (e.target.matches(':focus-visible')) setHeld(true)
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false)
          }}
        >
          <div className="tj-step-stack" aria-live="polite" aria-atomic="true">
            {d.steps.map((st, i) => (
              <article
                key={st.label}
                className={`tj-step${i === step ? ' is-on' : ''}${st.by === 'you' ? ' is-you' : ''}`}
                aria-hidden={i === step ? undefined : true}
              >
                <p className="tj-step-top">
                  <span className="tj-step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className={`hlw-badge ${st.by === 'you' ? 'is-you' : 'is-lucy'}`}>{st.by === 'you' ? 'You' : 'Lucy'}</span>
                </p>
                <h4 className="tj-step-label font-display">{st.label}</h4>
                <p className="tj-step-detail">{st.detail}</p>
              </article>
            ))}
          </div>
          <div className="tj-step-ctl">
            <button type="button" className="tj-arrow" aria-label="Previous step" onClick={() => select(step - 1)}>
              <span aria-hidden="true">&larr;</span>
            </button>
            <span className="tj-count" aria-hidden="true">
              {step + 1} / {n}
            </span>
            <button type="button" className="tj-arrow" aria-label="Next step" onClick={() => select(step + 1)}>
              <span aria-hidden="true">&rarr;</span>
            </button>
            <span className="tj-bar" aria-hidden="true">
              <span
                key={`${step}-${cycle}-${held}`}
                className={`tj-bar-fill${held || !live ? ' is-held' : ''}`}
                style={{ animationDuration: `${STEP_MS}ms` }}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="tj-meta tj-it" style={idx(3)}>
        <p className="tj-runs">
          <span className="tj-runs-label">Runs</span>
          <span>{d.cadence}</span>
        </p>
        {d.facts.map(([value, label]) => (
          <p key={label} className="tj-fact" title={label}>
            <span className="tj-fact-v font-display">{value}</span>
            <span className="tj-fact-l">{label}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

function Rail({ current, onGo }: { current: number | null; onGo: (id: DistrictId) => void }): ReactNode {
  const navRef = useRef<HTMLElement>(null)
  // Keep the floating name pill fully inside the stage: nudge it sideways when its centred spot would clip.
  useLayoutEffect(() => {
    const nav = navRef.current
    const pill = nav?.querySelector<HTMLElement>('.tj-rail-now')
    const box = nav?.closest<HTMLElement>('.tj-stage')
    if (!pill || !box) return
    pill.style.setProperty('--nudge', '0px')
    const b = box.getBoundingClientRect()
    const r = pill.getBoundingClientRect()
    const m = 10
    const dx = r.left < b.left + m ? b.left + m - r.left : r.right > b.right - m ? b.right - m - r.right : 0
    pill.style.setProperty('--nudge', `${Math.round(dx)}px`)
  }, [current])
  return (
    <nav className="tj-rail" aria-label="Tour progress" ref={navRef}>
      {stages.map((s) => (
        <div key={s.id} className="tj-rail-group" style={{ '--t': STAGE_TINT[s.id] } as CSSProperties}>
          <span className="tj-rail-label">{s.name}</span>
          <ol className="tj-rail-dots" role="list">
            {districts.map((d, i) =>
              d.stage !== s.id ? null : (
                <li key={d.id} className="tj-rail-item">
                  <button
                    type="button"
                    className={`tj-dot${current === i ? ' is-current' : ''}${current !== null && i < current ? ' is-done' : ''}`}
                    aria-label={`${STAGE_NO[s.id] === null ? '' : `Step ${i + 1}: `}${d.building}`}
                    aria-current={current === i ? 'step' : undefined}
                    onClick={() => onGo(d.id)}
                  >
                    <StepGlyph id={d.id} size={11} />
                  </button>
                  {current === i && (
                    <span className="tj-rail-now" aria-hidden="true">
                      {d.building}
                    </span>
                  )}
                </li>
              ),
            )}
          </ol>
        </div>
      ))}
    </nav>
  )
}
