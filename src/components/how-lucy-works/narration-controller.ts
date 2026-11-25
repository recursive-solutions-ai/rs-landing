import { districts } from './content'
import { narration } from './narration'
import { narrationDurations } from './narration-durations'
import { locate, neighbourIndex } from './narration-logic'

/**
 * The single owner of the voice-over: one shared HTMLAudioElement, the clip/tour state and the
 * glue to the pinned journey (desktop) or to the stacked sections (mobile).
 *
 * Framework-free on purpose. React reads it through useSyncExternalStore (see useNarration.ts).
 */

export const AUDIO_BASE = '/audio/how-lucy-works/'
export const ERROR_MESSAGE = 'Audio could not be loaded. Try again.'

export type Mode = 'tour' | 'single'
/** `moving`: the camera is travelling to the next stop; the clip starts once it has settled. */
export type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'moving' | 'error'

export type NarrationState = {
  /** The bar or mini player is open. */
  active: boolean
  mode: Mode
  /** Index into `narration` of the current clip. */
  index: number
  status: Status
  /** Seconds into the current clip. */
  time: number
  captions: boolean
  error: string | null
  /** Has the visitor ever pressed play (stops the pulse on the call to action). */
  used: boolean
  /** The pinned journey is mounted (desktop). */
  journey: boolean
  /** The page is currently scrolled inside the journey, so the in-stage bar is on screen. */
  inJourney: boolean
}

/** What TownJourney exposes so narration can drive and follow the camera. */
export type JourneyApi = {
  /** Smoothly scroll to stop `i` (0 = overview, 1..10 = districts, 11 = closing overview). */
  goToStop: (i: number) => void
  /** Nearest stop to the current scroll position, or -1 when scrolled well outside the journey. */
  nearestStop: () => number
  /** A programmatic scroll is in flight. */
  isMoving: () => boolean
}

export const CLIP_COUNT = narration.length
export const durations: number[] = narration.map((c) => narrationDurations[c.id])

const INITIAL: NarrationState = {
  active: false,
  mode: 'tour',
  index: 0,
  status: 'idle',
  time: 0,
  captions: true,
  error: null,
  used: false,
  journey: false,
  inJourney: false,
}

/** After the camera stops, wait this long before playing (programmatic moves). */
const SETTLE_MOVE_MS = 150
/** After the visitor stops scrolling, wait this long before following to the stop they landed on. */
const SETTLE_USER_MS = 600
/** A stalled download that has not recovered after this long counts as a failure. */
const STALL_MS = 8000

const clipUrl = (i: number): string => `${AUDIO_BASE}${narration[i].id}.mp3`

export class NarrationController {
  private state: NarrationState = INITIAL
  private listeners = new Set<() => void>()
  private audio: HTMLAudioElement | null = null
  private journey: JourneyApi | null = null
  private settleTimer: number | null = null
  private stallTimer: number | null = null
  private pendingOffset = 0
  private needsReload = false
  private prefetched = new Set<string>()
  private detachFns: Array<() => void> = []

  // ---- store plumbing ----
  subscribe = (l: () => void): (() => void) => {
    this.listeners.add(l)
    return () => this.listeners.delete(l)
  }
  getSnapshot = (): NarrationState => this.state
  getServerSnapshot = (): NarrationState => INITIAL

  private set(patch: Partial<NarrationState>): void {
    const next = { ...this.state, ...patch }
    for (const k of Object.keys(patch) as Array<keyof NarrationState>) {
      if (next[k] !== this.state[k]) {
        this.state = next
        this.listeners.forEach((l) => l())
        return
      }
    }
  }

  // ---- lifecycle (strict-mode safe: attach/detach can run repeatedly) ----
  attach(): void {
    if (this.audio || typeof window === 'undefined') return
    const a = new Audio()
    a.preload = 'none'
    a.hidden = true
    a.setAttribute('data-narration-audio', '')
    document.body.appendChild(a)
    this.audio = a
    const on = <K extends keyof HTMLMediaElementEventMap>(t: K, fn: () => void): void => {
      a.addEventListener(t, fn)
      this.detachFns.push(() => a.removeEventListener(t, fn))
    }
    on('playing', () => {
      this.clearStall()
      if (this.state.active) this.set({ status: 'playing', error: null })
      this.prefetchNext()
    })
    on('pause', () => {
      // External pause (media keys, headset): reflect it. Our own transitions set status first.
      if (this.state.status === 'playing' && !a.ended) this.set({ status: 'paused' })
    })
    on('timeupdate', () => {
      this.clearStall()
      if (Math.abs(a.currentTime - this.state.time) >= 0.2) this.set({ time: a.currentTime })
    })
    on('ended', () => this.onEnded())
    on('error', () => this.fail(`media error ${a.error?.code ?? '?'}: ${a.error?.message || 'unknown'} (${a.currentSrc || a.src})`))
    const stall = (): void => {
      if (this.stallTimer !== null || this.state.status === 'paused' || !this.state.active) return
      this.stallTimer = window.setTimeout(() => {
        this.stallTimer = null
        this.fail(`stalled for ${STALL_MS / 1000}s without progress (${a.currentSrc || a.src})`)
      }, STALL_MS)
    }
    on('stalled', stall)
    on('waiting', stall)
    on('canplay', () => this.clearStall())

    const onScroll = (): void => this.onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    this.detachFns.push(() => window.removeEventListener('scroll', onScroll))
    this.setupMediaSession()
  }

  detach(): void {
    this.clearSettle()
    this.clearStall()
    this.detachFns.forEach((f) => f())
    this.detachFns = []
    if (this.audio) {
      this.audio.pause()
      this.audio.removeAttribute('src')
      this.audio.load()
      this.audio.remove()
      this.audio = null
    }
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = null
      for (const a of ['play', 'pause', 'previoustrack', 'nexttrack'] as const) navigator.mediaSession.setActionHandler(a, null)
    }
    this.state = { ...INITIAL, journey: this.state.journey }
    this.listeners.forEach((l) => l())
  }

  registerJourney(api: JourneyApi | null): () => void {
    this.journey = api
    this.set({ journey: api !== null, inJourney: false })
    return () => {
      if (this.journey === api) {
        this.journey = null
        this.set({ journey: false, inJourney: false })
      }
    }
  }

  // ---- public actions (all start from a user gesture) ----
  startTour(): void {
    this.attach()
    this.set({ active: true, mode: 'tour', used: true, inJourney: this.journey !== null })
    this.goTo(0, { reason: 'start' })
  }

  /** Play one clip on its own (the "Listen" button in a section). Toggles if it is already playing. */
  playSingle(i: number): void {
    const s = this.state
    if (s.active && s.mode === 'single' && s.index === i && (s.status === 'playing' || s.status === 'loading')) {
      this.pause()
      return
    }
    this.attach()
    this.clearSettle()
    this.set({ active: true, mode: 'single', used: true })
    this.load(i, 0)
  }

  toggle(): void {
    const s = this.state
    if (s.status === 'playing' || s.status === 'loading') this.pause()
    else if (s.status === 'error') this.retry()
    else this.resume()
  }

  pause(): void {
    this.clearSettle()
    this.audio?.pause()
    this.set({ status: 'paused' })
  }

  resume(): void {
    const a = this.audio
    const s = this.state
    if (!a) return
    this.set({ active: true, used: true })
    const atEnd = s.mode === 'tour' && s.index === CLIP_COUNT - 1 && (a.ended || s.time >= durations[s.index] - 0.3)
    if (atEnd) {
      this.goTo(0, { reason: 'user' })
      return
    }
    if (a.src && a.src.endsWith(clipUrl(s.index)) && !a.ended && !this.needsReload) {
      this.set({ status: 'loading' })
      this.play(s.index)
    } else {
      this.load(s.index, a.ended ? 0 : s.time)
    }
  }

  retry(): void {
    this.needsReload = true
    this.load(this.state.index, 0)
  }

  next(): void {
    this.step(1)
  }
  prev(): void {
    this.step(-1)
  }
  private step(dir: 1 | -1): void {
    const n = neighbourIndex(this.state.index, dir, CLIP_COUNT)
    if (n === null) return
    this.set({ mode: 'tour' })
    this.goTo(n, { reason: 'user' })
  }

  /** Jump to a clip (tick on the progress bar, prev/next). Moves the camera when it is on screen. */
  jumpTo(i: number, offset = 0): void {
    this.set({ mode: 'tour' })
    this.goTo(i, { reason: 'user', offset })
  }

  /** Seek on the whole-tour timeline (seconds). */
  seekTour(t: number): void {
    const { index, offset } = locate(durations, t)
    const a = this.audio
    if (a && index === this.state.index && this.state.status !== 'moving' && this.state.status !== 'error' && a.src.endsWith(clipUrl(index))) {
      a.currentTime = offset
      this.set({ time: offset })
      return
    }
    this.jumpTo(index, offset)
  }

  /** Seek inside the current clip (seconds). */
  seekClip(t: number): void {
    const a = this.audio
    if (!a) return
    a.currentTime = Math.min(durations[this.state.index], Math.max(0, t))
    this.set({ time: a.currentTime })
  }

  close(): void {
    this.clearSettle()
    this.clearStall()
    this.audio?.pause()
    this.set({ active: false, status: 'idle', error: null, time: 0, inJourney: false })
  }

  setCaptions(on: boolean): void {
    this.set({ captions: on })
  }

  // ---- internals ----
  private goTo(i: number, o: { reason: 'start' | 'user' | 'auto'; offset?: number }): void {
    this.clearSettle()
    this.clearStall()
    this.audio?.pause()
    this.pendingOffset = o.offset ?? 0
    const j = this.journey
    if (j && (o.reason === 'start' || this.state.inJourney)) {
      this.set({ index: i, status: 'moving', time: this.pendingOffset, error: null, inJourney: true })
      // Start the very first clip right away (we are inside the click that was the user gesture); the rest wait for the camera.
      j.goToStop(i)
      if (o.reason === 'start') {
        this.load(i, 0)
        return
      }
      this.armSettle(450)
      return
    }
    if (!j) this.scrollToSection(i)
    this.load(i, this.pendingOffset)
  }

  private onEnded(): void {
    const s = this.state
    if (s.mode === 'single' || !s.active) {
      this.set({ status: 'paused', time: 0 })
      return
    }
    const n = neighbourIndex(s.index, 1, CLIP_COUNT)
    if (n === null) {
      this.set({ status: 'paused', time: durations[s.index] })
      return
    }
    this.goTo(n, { reason: 'auto' })
  }

  private load(i: number, offset: number): void {
    const a = this.audio
    if (!a) return
    this.clearStall()
    this.pendingOffset = 0
    this.set({ index: i, status: 'loading', error: null, time: offset })
    a.preload = 'auto'
    const url = clipUrl(i)
    if (this.needsReload || !a.src.endsWith(url)) {
      this.needsReload = false
      a.src = url
    }
    try {
      a.currentTime = offset
    } catch {
      /* metadata not ready yet: playback starts from 0 and we seek once it is */
      a.addEventListener('loadedmetadata', () => (a.currentTime = offset), { once: true })
    }
    this.updateMediaSession()
    this.play(i)
  }

  private play(i: number): void {
    const a = this.audio
    if (!a) return
    a.play().catch((err: unknown) => {
      const e = err as { name?: string; message?: string }
      if (e?.name === 'AbortError') return // superseded by a newer load or a pause
      this.fail(`play() rejected: ${e?.name ?? 'Error'}: ${e?.message ?? String(err)}`, i)
    })
  }

  private fail(reason: string, i: number = this.state.index): void {
    if (this.state.status === 'error') return // one failure, one report (error and play() rejection arrive together)
    this.clearStall()
    this.clearSettle()
    this.needsReload = true
    this.audio?.pause()
    console.error('[narration]', { clip: narration[i]?.id, reason })
    this.set({ status: 'error', error: ERROR_MESSAGE })
  }

  private clearStall(): void {
    if (this.stallTimer !== null) window.clearTimeout(this.stallTimer)
    this.stallTimer = null
  }

  private prefetchNext(): void {
    const n = neighbourIndex(this.state.index, 1, CLIP_COUNT)
    if (n === null || this.state.mode === 'single') return
    const url = clipUrl(n)
    if (this.prefetched.has(url)) return
    this.prefetched.add(url)
    fetch(url, { priority: 'low' } as RequestInit).catch((err: unknown) => {
      this.prefetched.delete(url)
      console.warn('[narration]', { clip: narration[n].id, reason: `prefetch failed: ${String(err)}` })
    })
  }

  // ---- following the camera ----
  private armSettle(ms: number): void {
    this.clearSettle()
    this.settleTimer = window.setTimeout(() => this.settle(), ms)
  }
  private clearSettle(): void {
    if (this.settleTimer !== null) window.clearTimeout(this.settleTimer)
    this.settleTimer = null
  }

  private onScroll(): void {
    const j = this.journey
    const s = this.state
    if (!j || !s.active || s.mode !== 'tour') return
    // Do not judge "left the journey" while a programmatic move is still flying in from outside.
    if (!j.isMoving()) {
      const inside = j.nearestStop() !== -1
      if (inside !== s.inJourney) this.set({ inJourney: inside })
    }
    if (s.status === 'error') return
    this.armSettle(j.isMoving() ? SETTLE_MOVE_MS : SETTLE_USER_MS)
  }

  private settle(): void {
    this.settleTimer = null
    const j = this.journey
    const s = this.state
    if (!j || !s.active || s.mode !== 'tour') return
    if (j.isMoving()) {
      this.armSettle(SETTLE_MOVE_MS)
      return
    }
    const stop = j.nearestStop()
    this.set({ inJourney: stop !== -1 })
    if (s.status === 'moving') {
      // Arrived (or the visitor took over mid-flight and landed somewhere else).
      this.load(stop === -1 ? s.index : stop, stop === -1 || stop === s.index ? this.pendingOffset : 0)
      return
    }
    if (stop === -1 || stop === s.index) return
    if (s.status === 'paused' || s.status === 'error') this.set({ index: stop, time: 0, status: 'paused', error: null })
    else this.load(stop, 0)
  }

  private scrollToSection(i: number): void {
    const id = narration[i].id
    let y: number | null = null
    if (id === 'intro') y = 0
    else {
      const el = document.getElementById(id === 'outro' ? 'compounding' : id)
      if (el) y = el.getBoundingClientRect().top + window.scrollY - 72
    }
    if (y !== null) window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
  }

  // ---- media session ----
  private setupMediaSession(): void {
    if (!('mediaSession' in navigator)) return
    const ms = navigator.mediaSession
    const safe = (a: MediaSessionAction, fn: () => void): void => {
      try {
        ms.setActionHandler(a, fn)
      } catch {
        /* action not supported here */
      }
    }
    safe('play', () => this.resume())
    safe('pause', () => this.pause())
    safe('previoustrack', () => this.prev())
    safe('nexttrack', () => this.next())
  }

  private updateMediaSession(): void {
    if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return
    navigator.mediaSession.metadata = new MediaMetadata({ title: clipTitle(this.state.index), artist: 'Lucy', album: 'How Lucy works' })
  }
}

/** Human name of a stop, for the transcript, the mini player and the media session. */
export function clipTitle(i: number): string {
  const id = narration[i].id
  if (id === 'intro') return 'Introduction'
  if (id === 'outro') return 'Why it compounds'
  return districts.find((d) => d.id === id)?.building ?? id
}
