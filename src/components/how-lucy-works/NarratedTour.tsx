'use client'

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import type { DistrictId } from './content'
import { narration } from './narration'
import { NarrationController, clipTitle, durations, CLIP_COUNT, type NarrationState } from './narration-controller'
import { captionChunks, chunkIndexAt, clipOffsets, formatMinutes, formatTime, sum } from './narration-logic'
import { NarrationContext, useNarration } from './useNarration'
import './narration.css'

const TOTAL = sum(durations)
const OFFSETS = clipOffsets(durations)

/** The in-stage bar is on screen (desktop journey, tour mode, scrolled inside the journey). */
export const dockVisible = (s: NarrationState): boolean => s.active && s.mode === 'tour' && s.journey && s.inJourney

const running = (s: NarrationState): boolean => s.status === 'playing' || s.status === 'loading' || s.status === 'moving'

// ---------- icons ----------
const Icon = ({ d, size = 18 }: { d: ReactNode; size?: number }): ReactNode => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    {d}
  </svg>
)
const PlayIcon = ({ size }: { size?: number }): ReactNode => <Icon size={size} d={<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />} />
const PauseIcon = ({ size }: { size?: number }): ReactNode => <Icon size={size} d={<path d="M7 4.5h3.5v15H7zM13.5 4.5H17v15h-3.5z" />} />
const PrevIcon = (): ReactNode => <Icon d={<path d="M6 5h2v14H6zM20 5.7v12.6a.7.7 0 0 1-1.1.6L10.4 12.6a.7.7 0 0 1 0-1.2l8.5-6.3a.7.7 0 0 1 1.1.6Z" />} />
const NextIcon = (): ReactNode => <Icon d={<path d="M16 5h2v14h-2zM4 5.7v12.6a.7.7 0 0 0 1.1.6l8.5-6.3a.7.7 0 0 0 0-1.2L5.1 5.1A.7.7 0 0 0 4 5.7Z" />} />
const CloseIcon = (): ReactNode => <Icon d={<path d="M6.7 5.3 12 10.6l5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" />} />

// ---------- provider ----------
export function NarrationProvider({ children }: { children: ReactNode }): ReactNode {
  const [controller] = useState(() => new NarrationController())
  useEffect(() => {
    controller.attach()
    return () => controller.detach()
  }, [controller])
  return (
    <NarrationContext.Provider value={controller}>
      {children}
      <Hotkeys />
      <MiniPlayer />
    </NarrationContext.Provider>
  )
}

/** Space toggles play/pause and Escape closes, only while the bar is open. Capture phase so the journey's Space = next stop yields. */
function Hotkeys(): null {
  const { state, controller } = useNarration()
  const active = state.active
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent): void => {
      if (e.defaultPrevented) return
      if (e.key === 'Escape') {
        controller.close()
        return
      }
      if ((e.key === ' ' || e.key === 'Spacebar') && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
        const t = e.target as HTMLElement | null
        if (t?.closest('input, textarea, select, button, a[href], summary, [role="button"], [contenteditable=""], [contenteditable="true"]')) return
        e.preventDefault()
        controller.toggle()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [active, controller])
  return null
}

// ---------- entry point ----------
export function TourButton({ variant }: { variant: 'hero' | 'compact' }): ReactNode {
  const { state, controller } = useNarration()
  if (variant === 'compact' && dockVisible(state)) return null
  const on = state.active
  const label = !on ? 'Listen to Lucy explain it' : running(state) ? 'Pause the tour' : 'Resume the tour'
  const showPause = on && running(state)
  const onClick = (): void => (on ? controller.toggle() : controller.startTour())
  return (
    <button type="button" className={`nt-cta nt-cta-${variant}${state.used ? '' : ' is-fresh'}`} onClick={onClick}>
      <span className="nt-cta-icon" aria-hidden="true">
        {showPause ? <PauseIcon size={variant === 'hero' ? 22 : 15} /> : <PlayIcon size={variant === 'hero' ? 22 : 15} />}
      </span>
      <span className="nt-cta-text">
        <span className="nt-cta-label">{label}</span>
        {variant === 'hero' && <span className="nt-cta-sub">A guided tour, narrated by Lucy</span>}
      </span>
      <span className="nt-cta-time">{formatMinutes(TOTAL)}</span>
    </button>
  )
}

/** Hero block: the call to action and the collapsed full transcript. */
export function HeroListen(): ReactNode {
  return (
    <div className="nt-hero">
      <TourButton variant="hero" />
      <details className="nt-transcript">
        <summary>Read the transcript</summary>
        <ol className="nt-tr-list" role="list">
          {narration.map((c, i) => (
            <li key={c.id}>
              <h3 className="nt-tr-title">{clipTitle(i)}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
      </details>
    </div>
  )
}

/** Small "Listen" button in a section header: plays just that section's clip. */
export function SectionListenButton({ id }: { id: DistrictId }): ReactNode {
  const { state, controller } = useNarration()
  const i = narration.findIndex((c) => c.id === id)
  const playing = state.active && state.mode === 'single' && state.index === i && (state.status === 'playing' || state.status === 'loading')
  return (
    <button
      type="button"
      className="nt-listen"
      aria-pressed={playing}
      aria-label={`${playing ? 'Pause' : 'Listen to'} Lucy explain ${clipTitle(i)}`}
      onClick={() => controller.playSingle(i)}
    >
      {playing ? <PauseIcon size={13} /> : <PlayIcon size={13} />}
      <span>{playing ? 'Pause' : 'Listen'}</span>
    </button>
  )
}

// ---------- shared pieces ----------
function Transport({ state, controller, small }: { state: NarrationState; controller: NarrationController; small?: boolean }): ReactNode {
  const isRunning = running(state)
  return (
    <>
      <button type="button" className={`nt-btn nt-play${small ? ' is-small' : ''}`} aria-label={isRunning ? 'Pause' : 'Play'} onClick={() => controller.toggle()}>
        {isRunning ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button type="button" className="nt-btn" aria-label="Previous section" disabled={state.index === 0} onClick={() => controller.prev()}>
        <PrevIcon />
      </button>
      <button type="button" className="nt-btn" aria-label="Next section" disabled={state.index === CLIP_COUNT - 1} onClick={() => controller.next()}>
        <NextIcon />
      </button>
    </>
  )
}

function Progress({ state, controller, scope }: { state: NarrationState; controller: NarrationController; scope: 'tour' | 'clip' }): ReactNode {
  const total = scope === 'tour' ? TOTAL : durations[state.index]
  const elapsed = scope === 'tour' ? OFFSETS[state.index] + state.time : state.time
  const [drag, setDrag] = useState<number | null>(null)
  const value = Math.min(total, drag ?? elapsed)
  const commit = (): void => {
    if (drag === null) return
    if (scope === 'tour') controller.seekTour(drag)
    else controller.seekClip(drag)
    setDrag(null)
  }
  return (
    <div className={`nt-progress${scope === 'clip' ? ' is-clip' : ''}`} style={{ '--p': `${(value / total) * 100}%` } as CSSProperties}>
      <input
        type="range"
        className="nt-range"
        min={0}
        max={total}
        step={1}
        value={value}
        aria-label={scope === 'tour' ? 'Tour progress' : 'Section progress'}
        aria-valuetext={`${formatTime(value)} of ${formatTime(total)}`}
        onChange={(e) => setDrag(Number(e.target.value))}
        onPointerUp={commit}
        onKeyUp={commit}
        onBlur={commit}
      />
      {scope === 'tour' &&
        OFFSETS.map((o, i) => (
          <button
            key={narration[i].id}
            type="button"
            className={`nt-tick${i === state.index ? ' is-current' : ''}${i < state.index ? ' is-done' : ''}`}
            style={{ left: `${(o / TOTAL) * 100}%` }}
            aria-label={`Go to ${clipTitle(i)}`}
            aria-current={i === state.index ? 'true' : undefined}
            title={clipTitle(i)}
            onClick={() => controller.jumpTo(i)}
          />
        ))}
    </div>
  )
}

function ErrorRow({ state, controller }: { state: NarrationState; controller: NarrationController }): ReactNode {
  return (
    <div className="nt-error" role="alert">
      <span>{state.error}</span>
      <button type="button" className="nt-retry" onClick={() => controller.retry()}>
        Try again
      </button>
    </div>
  )
}

function Captions({ state }: { state: NarrationState }): ReactNode {
  const chunks = useMemo(() => captionChunks(narration[state.index].text, durations[state.index]), [state.index])
  const shown = state.status === 'moving' ? -1 : chunkIndexAt(chunks, state.time)
  return (
    <div className="nt-caps" aria-live="off" aria-label="Captions">
      <p className="nt-caps-text" key={shown}>
        {shown >= 0 ? chunks[shown].text : ' '}
      </p>
    </div>
  )
}

// ---------- in-stage bar (desktop journey) ----------
export function TourDock(): ReactNode {
  const { state, controller } = useNarration()
  if (!dockVisible(state)) return null
  return (
    <div className="nt-dock" role="region" aria-label="Guided tour by Lucy">
      {state.captions && <Captions state={state} />}
      <div className="nt-bar">
        <Transport state={state} controller={controller} />
        {state.status === 'error' ? (
          <ErrorRow state={state} controller={controller} />
        ) : (
          <>
            <Progress state={state} controller={controller} scope="tour" />
            <span className="nt-time" aria-hidden="true">
              {formatTime(OFFSETS[state.index] + state.time)} / {formatTime(TOTAL)}
            </span>
          </>
        )}
        <button type="button" className="nt-btn nt-cc" aria-pressed={state.captions} aria-label="Captions" onClick={() => controller.setCaptions(!state.captions)}>
          CC
        </button>
        <button type="button" className="nt-btn" aria-label="Close the tour" onClick={() => controller.close()}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

// ---------- sticky mini player (stacked layout, single clips, or scrolled away from the journey) ----------
function MiniPlayer(): ReactNode {
  const { state, controller } = useNarration()
  if (!state.active || dockVisible(state)) return null
  const scope = state.mode === 'tour' ? 'tour' : 'clip'
  return (
    <div className="nt-mini" role="region" aria-label="Guided tour by Lucy">
      <Progress state={state} controller={controller} scope={scope} />
      <div className="nt-mini-row">
        <Transport state={state} controller={controller} small />
        <div className="nt-mini-title">
          <span className="nt-mini-kicker">Lucy &middot; {state.index + 1} of {CLIP_COUNT}</span>
          <span className="nt-mini-name">{clipTitle(state.index)}</span>
        </div>
        <button type="button" className="nt-btn" aria-label="Close the tour" onClick={() => controller.close()}>
          <CloseIcon />
        </button>
      </div>
      {state.status === 'error' && <ErrorRow state={state} controller={controller} />}
    </div>
  )
}
