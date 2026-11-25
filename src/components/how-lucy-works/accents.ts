import { stages, type DistrictId, type StageId } from './content'

/** Per-district accent colours. Same values the village map uses. */
export const ACCENT: Record<DistrictId, string> = {
  foundation: '#8ea2ff',
  watchtower: '#5b8fe0',
  press: '#58c2c9',
  dish: '#e2b25a',
  studio: '#e58fb8',
  yard: '#e6c65a',
  lane: '#a9c1ff',
  house: '#8fa8f0',
  silo: '#7fd69a',
  gate: '#4ade80',
}


/** One tint per stage of the process. Per-district accents above stay for buildings. */
export const STAGE_TINT: Record<StageId, string> = {
  found: '#8ea2ff',
  create: '#58c2c9',
  sell: '#e6c65a',
  always: '#7fd69a',
}

/** Step number (1 to 8) for the process districts; null for the two "always" ones. */
export const STEP_NO: Record<DistrictId, number | null> = {
  foundation: 1,
  watchtower: 2,
  dish: 3,
  press: 4,
  studio: 5,
  yard: 6,
  lane: 7,
  house: 8,
  silo: null,
  gate: null,
}

export const stageOf = (id: StageId): { id: StageId; name: string; line: string } => stages.find((x) => x.id === id) ?? stages[0]

/** 1 to 3 for the process stages, null for "always". */
export const STAGE_NO: Record<StageId, number | null> = { found: 1, create: 2, sell: 3, always: null }
