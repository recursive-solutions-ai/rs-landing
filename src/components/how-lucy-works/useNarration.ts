'use client'

import { createContext, useContext, useSyncExternalStore } from 'react'
import type { NarrationController, NarrationState } from './narration-controller'

export const NarrationContext = createContext<NarrationController | null>(null)

/** The shared voice-over controller (stable for the life of the page). Must be used under NarrationProvider. */
export function useNarrationController(): NarrationController {
  const c = useContext(NarrationContext)
  if (!c) throw new Error('useNarration must be used inside <NarrationProvider>')
  return c
}

/** The controller plus its live state. */
export function useNarration(): { state: NarrationState; controller: NarrationController } {
  const controller = useNarrationController()
  const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getServerSnapshot)
  return { state, controller }
}
