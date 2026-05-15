'use client'

import { useMemo, useState } from 'react'
import { APPROACHES, defaultInputs, fmtUSDFull, type ApproachKey, type Inputs } from '@/lib/roi'
import { AnimatedNumber, SliderInput } from './shared'

type Audience = {
  id: string
  emoji: string
  label: string
  sub: string
  approaches: ApproachKey[]
  hookCopy: string
  endCopy: string
}

const AUDIENCES: Audience[] = [
  {
    id: 'self',
    emoji: '🧑‍💻',
    label: 'I want to justify this for myself',
    sub: 'Solo founder, freelancer, IC',
    approaches: ['time', 'saas'],
    hookCopy: 'Hours back in your week + dead subscriptions cancelled.',
    endCopy: 'That is your number. Put a stopwatch on it for a week and it gets bigger.',
  },
  {
    id: 'boss',
    emoji: '🧑‍💼',
    label: 'I am pitching my boss',
    sub: 'Mid-level, asking for a tool budget',
    approaches: ['time', 'output'],
    hookCopy: 'Time saved across the team, multiplied by cost-per-output.',
    endCopy: 'Lead with the per-unit math. Bosses sign off on apples-to-apples.',
  },
  {
    id: 'finance',
    emoji: '💰',
    label: 'I am pitching Finance',
    sub: 'CFO, controller, procurement',
    approaches: ['saas', 'headcount'],
    hookCopy: 'Hard P&L line items only. Cancelled tools + roles not hired.',
    endCopy: 'CFOs ignore productivity. They count dollars on the bank statement.',
  },
  {
    id: 'board',
    emoji: '📈',
    label: 'I am pitching the Board',
    sub: 'Quarterly, investors, executive',
    approaches: ['revenue', 'opportunity', 'headcount'],
    hookCopy: 'Growth first, urgency second, efficiency in the back pocket.',
    endCopy: 'Boards fund offense, not defense. Open with revenue.',
  },
]

export function WizardCalculator() {
  const [picked, setPicked] = useState<string | null>(null)
  const [inputs, setInputs] = useState<Inputs>(defaultInputs)
  const setI = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setInputs((p) => ({ ...p, [k]: v }))
  const audience = AUDIENCES.find((a) => a.id === picked)

  const breakdown = useMemo(() => {
    if (!audience) return []
    return audience.approaches.map((k) => {
      const a = APPROACHES.find((x) => x.key === k)!
      return { ...a, value: a.fn(inputs) }
    })
  }, [audience, inputs])

  const total = breakdown.reduce((s, b) => s + b.value, 0)

  if (!audience) {
    return (
      <div className="min-h-screen bg-base-100">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="badge badge-secondary badge-outline mb-3">Concept A · Audience Wizard</div>
            <h1 className="text-5xl font-bold mb-3">Who are you trying to convince?</h1>
            <p className="text-base-content/70 max-w-xl mx-auto">
              The number changes based on the room. Pick the audience, we pick the right ROI lens.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AUDIENCES.map((a) => (
              <button
                key={a.id}
                onClick={() => setPicked(a.id)}
                className="card bg-base-100 border-2 border-base-300 hover:border-secondary hover:shadow-xl transition text-left group"
              >
                <div className="card-body">
                  <div className="text-5xl mb-1 group-hover:scale-110 transition-transform">{a.emoji}</div>
                  <h3 className="card-title">{a.label}</h3>
                  <p className="text-sm text-base-content/60 mb-2">{a.sub}</p>
                  <p className="text-xs italic text-base-content/80">"{a.hookCopy}"</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <button onClick={() => setPicked(null)} className="btn btn-ghost btn-sm mb-4">
          ← Different audience
        </button>
        <div className="mb-6">
          <div className="text-5xl">{audience.emoji}</div>
          <h2 className="text-3xl font-bold mt-2">{audience.label}</h2>
          <p className="text-base-content/70">{audience.hookCopy}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-base-content/60">Inputs</h3>
              {audience.approaches.includes('time') && (
                <>
                  <SliderInput label="Team size" value={inputs.teamSize} min={1} max={500} onChange={(v) => setI('teamSize', v)} />
                  <SliderInput label="Hourly rate" prefix="$" value={inputs.hourlyRate} min={20} max={300} onChange={(v) => setI('hourlyRate', v)} />
                  <SliderInput label="Hours saved / wk / person" value={inputs.hoursSavedPerWeekPerPerson} min={0} max={30} onChange={(v) => setI('hoursSavedPerWeekPerPerson', v)} />
                </>
              )}
              {audience.approaches.includes('saas') && (
                <>
                  <SliderInput label="Monthly SaaS spend" prefix="$" value={inputs.monthlySaasSpend} min={0} max={50000} step={100} onChange={(v) => setI('monthlySaasSpend', v)} />
                  <SliderInput label="% replaceable" suffix="%" value={inputs.saasReplaceablePct} min={0} max={100} onChange={(v) => setI('saasReplaceablePct', v)} />
                </>
              )}
              {audience.approaches.includes('headcount') && (
                <>
                  <SliderInput label="Hires avoided / yr" value={inputs.plannedHires} min={0} max={50} onChange={(v) => setI('plannedHires', v)} />
                  <SliderInput label="Fully loaded cost / hire" prefix="$" value={inputs.fullyLoadedCostPerHire} min={40000} max={400000} step={5000} onChange={(v) => setI('fullyLoadedCostPerHire', v)} />
                </>
              )}
              {audience.approaches.includes('revenue') && (
                <>
                  <SliderInput label="Deals / month" value={inputs.monthlyDeals} min={0} max={500} onChange={(v) => setI('monthlyDeals', v)} />
                  <SliderInput label="Avg deal value" prefix="$" value={inputs.avgDealValue} min={500} max={500000} step={500} onChange={(v) => setI('avgDealValue', v)} />
                  <SliderInput label="Win rate lift" suffix="%" value={inputs.winRateLiftPct} min={0} max={100} onChange={(v) => setI('winRateLiftPct', v)} />
                </>
              )}
              {audience.approaches.includes('output') && (
                <>
                  <SliderInput label="Units / month" value={inputs.monthlyOutputUnits} min={0} max={50000} step={10} onChange={(v) => setI('monthlyOutputUnits', v)} />
                  <SliderInput label="Old cost / unit" prefix="$" value={inputs.oldCostPerOutput} min={0} max={1000} onChange={(v) => setI('oldCostPerOutput', v)} />
                  <SliderInput label="New cost / unit" prefix="$" value={inputs.newCostPerOutput} min={0} max={500} onChange={(v) => setI('newCostPerOutput', v)} />
                </>
              )}
              {audience.approaches.includes('opportunity') && (
                <>
                  <SliderInput label="Annual revenue" prefix="$" value={inputs.annualRevenue} min={100000} max={100000000} step={50000} onChange={(v) => setI('annualRevenue', v)} />
                  <SliderInput label="Competitor gap" suffix="%" value={inputs.competitorEfficiencyGapPct} min={0} max={80} onChange={(v) => setI('competitorEfficiencyGapPct', v)} />
                </>
              )}
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary to-primary text-primary-content">
            <div className="card-body">
              <p className="text-sm uppercase opacity-80">The pitch number</p>
              <p className="text-6xl font-bold tracking-tight">
                <AnimatedNumber value={total} />
              </p>
              <p className="text-sm opacity-80 mt-1">per year, using the right lens for this audience.</p>
              <div className="divider opacity-30 my-2" />
              {breakdown.map((b) => (
                <div key={b.key} className="flex justify-between items-center py-1">
                  <span className="text-sm">{b.icon} {b.label}</span>
                  <span className="font-mono text-sm">{fmtUSDFull(b.value)}</span>
                </div>
              ))}
              <p className="text-xs italic opacity-90 mt-4">{audience.endCopy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
