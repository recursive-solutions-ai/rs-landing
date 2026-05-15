export type Inputs = {
  teamSize: number
  hourlyRate: number
  hoursSavedPerWeekPerPerson: number
  monthlySaasSpend: number
  saasReplaceablePct: number
  plannedHires: number
  fullyLoadedCostPerHire: number
  monthlyDeals: number
  avgDealValue: number
  winRateLiftPct: number
  monthlyOutputUnits: number
  oldCostPerOutput: number
  newCostPerOutput: number
  competitorEfficiencyGapPct: number
  annualRevenue: number
}

export const defaultInputs: Inputs = {
  teamSize: 10,
  hourlyRate: 75,
  hoursSavedPerWeekPerPerson: 8,
  monthlySaasSpend: 2000,
  saasReplaceablePct: 60,
  plannedHires: 2,
  fullyLoadedCostPerHire: 140000,
  monthlyDeals: 20,
  avgDealValue: 25000,
  winRateLiftPct: 25,
  monthlyOutputUnits: 500,
  oldCostPerOutput: 50,
  newCostPerOutput: 5,
  competitorEfficiencyGapPct: 30,
  annualRevenue: 2000000,
}

export function timeSaved(i: Inputs): number {
  return i.teamSize * i.hoursSavedPerWeekPerPerson * i.hourlyRate * 52
}

export function saasDisplacement(i: Inputs): number {
  return i.monthlySaasSpend * (i.saasReplaceablePct / 100) * 12
}

export function headcountAvoidance(i: Inputs): number {
  return i.plannedHires * i.fullyLoadedCostPerHire
}

export function revenueAcceleration(i: Inputs): number {
  return i.monthlyDeals * 12 * i.avgDealValue * (i.winRateLiftPct / 100)
}

export function costPerOutput(i: Inputs): number {
  const saved = i.oldCostPerOutput - i.newCostPerOutput
  return Math.max(saved, 0) * i.monthlyOutputUnits * 12
}

export function opportunityCost(i: Inputs): number {
  return i.annualRevenue * (i.competitorEfficiencyGapPct / 100) * 0.1
}

export type ApproachKey =
  | 'time'
  | 'saas'
  | 'headcount'
  | 'revenue'
  | 'output'
  | 'opportunity'

export const APPROACHES: {
  key: ApproachKey
  label: string
  audience: string
  fn: (i: Inputs) => number
  blurb: string
  icon: string
}[] = [
  {
    key: 'time',
    label: 'Time Saved',
    audience: 'You / your boss',
    fn: timeSaved,
    blurb: 'Hours back × rate × 52',
    icon: '⏱️',
  },
  {
    key: 'saas',
    label: 'SaaS Displacement',
    audience: 'Finance / CFO',
    fn: saasDisplacement,
    blurb: 'Cancelled subscriptions',
    icon: '🪓',
  },
  {
    key: 'headcount',
    label: 'Headcount Avoidance',
    audience: 'VP / HR',
    fn: headcountAvoidance,
    blurb: 'Roles you did not need to hire',
    icon: '👥',
  },
  {
    key: 'revenue',
    label: 'Revenue Acceleration',
    audience: 'Board / investors',
    fn: revenueAcceleration,
    blurb: 'More deals, faster cycles',
    icon: '🚀',
  },
  {
    key: 'output',
    label: 'Cost Per Output',
    audience: 'Operations',
    fn: costPerOutput,
    blurb: 'Old $/unit vs new $/unit',
    icon: '⚙️',
  },
  {
    key: 'opportunity',
    label: 'Opportunity Cost',
    audience: 'C-suite / board',
    fn: opportunityCost,
    blurb: 'Cost of doing nothing',
    icon: '⚠️',
  },
]

export function fmtUSD(n: number): string {
  if (!isFinite(n)) return '$0'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 10_000) return `$${(n / 1000).toFixed(0)}K`
  return `$${Math.round(n).toLocaleString()}`
}

export function fmtUSDFull(n: number): string {
  return `$${Math.round(n).toLocaleString()}`
}

export const INDUSTRY_BENCHMARKS: {
  id: string
  label: string
  stats: { label: string; value: string; source: string }[]
}[] = [
  {
    id: 'support',
    label: 'Customer Support',
    stats: [
      { label: 'Cost per ticket', value: '$4.60 → $0.18', source: '96% reduction' },
      { label: 'Tickets handled', value: '+200%', source: 'per agent shift' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales / GTM',
    stats: [
      { label: 'Win rate lift', value: '+30%', source: 'Bain' },
      { label: 'Quota attainment', value: '3.7x', source: 'Gartner' },
      { label: 'Cold conversion', value: '12.1% vs 0.29%', source: '40x lift' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    stats: [
      { label: 'CTR lift on AI copy', value: '+450%', source: 'JPMorgan' },
      { label: 'Hours back / wk', value: '12.2', source: 'per marketer' },
    ],
  },
  {
    id: 'eng',
    label: 'Engineering',
    stats: [
      { label: 'Ship velocity', value: '+55%', source: 'avg dev with AI' },
      { label: 'Code review cost', value: '$150 → $12', source: '92% reduction' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations',
    stats: [
      { label: 'Headcount required', value: '−40%', source: 'Klarna' },
      { label: 'Photo / content cost', value: '−95%', source: 'e-commerce avg' },
    ],
  },
]
