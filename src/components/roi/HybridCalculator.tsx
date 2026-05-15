'use client'

import { useMemo, useState } from 'react'
import {
  APPROACHES,
  defaultInputs,
  fmtUSDFull,
  type ApproachKey,
  type Inputs,
} from '@/lib/roi'
import { AnimatedNumber, SliderInput } from './shared'

type Audience = 'self' | 'finance' | 'board' | 'ops'

const AUDIENCE_TO_APPROACHES: Record<Audience, ApproachKey[]> = {
  self: ['time', 'saas'],
  finance: ['saas', 'headcount'],
  board: ['revenue', 'opportunity', 'headcount'],
  ops: ['output', 'time'],
}

const AUDIENCES: { id: Audience; label: string; sub: string; emoji: string }[] = [
  { id: 'self', label: 'Yourself / your boss', sub: 'Justify a tool spend', emoji: '🧑‍💻' },
  { id: 'finance', label: 'Finance / CFO', sub: 'Hard cost reduction', emoji: '💰' },
  { id: 'board', label: 'Board / investors', sub: 'Growth + urgency', emoji: '📈' },
  { id: 'ops', label: 'Operations', sub: 'Per-unit efficiency', emoji: '⚙️' },
]

export function HybridCalculator() {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [audience, setAudience] = useState<Audience>('finance')
  const [enabled, setEnabled] = useState<Record<ApproachKey, boolean>>({
    time: true,
    saas: true,
    headcount: true,
    revenue: false,
    output: false,
    opportunity: false,
  })
  const [inputs, setInputs] = useState<Inputs>(defaultInputs)

  const setI = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setInputs((p) => ({ ...p, [k]: v }))

  const breakdown = useMemo(
    () =>
      APPROACHES.map((a) => ({
        ...a,
        value: a.fn(inputs),
        on: enabled[a.key],
      })),
    [inputs, enabled],
  )

  const total = breakdown.filter((b) => b.on).reduce((s, b) => s + b.value, 0)

  function pickAudience(a: Audience) {
    setAudience(a)
    const keys = AUDIENCE_TO_APPROACHES[a]
    const next = Object.fromEntries(APPROACHES.map((x) => [x.key, keys.includes(x.key)])) as Record<ApproachKey, boolean>
    setEnabled(next)
    setStep(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="badge badge-primary badge-outline mb-3">A + D Hybrid</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">What is AI worth to your business?</h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Pick who you are pitching, stack the approaches that matter, see the business case build live.
          </p>
        </div>

        <ul className="steps w-full mb-10">
          <li className={`step ${step >= 0 ? 'step-primary' : ''}`}>Audience</li>
          <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Inputs</li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Business case</li>
        </ul>

        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AUDIENCES.map((a) => (
              <button
                key={a.id}
                onClick={() => pickAudience(a.id)}
                className="card bg-base-100 border border-base-300 hover:border-primary hover:shadow-lg transition text-left"
              >
                <div className="card-body">
                  <div className="text-4xl">{a.emoji}</div>
                  <h3 className="card-title">{a.label}</h3>
                  <p className="text-sm text-base-content/60">{a.sub}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {AUDIENCE_TO_APPROACHES[a.id].map((k) => {
                      const ap = APPROACHES.find((x) => x.key === k)!
                      return (
                        <span key={k} className="badge badge-sm badge-ghost">
                          {ap.icon} {ap.label}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-base">Stack approaches</h3>
                  <p className="text-xs text-base-content/60 mb-2">Toggle which lenses to include. Audience preset: {audience}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {APPROACHES.map((a) => (
                      <label key={a.key} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-base-200">
                        <input
                          type="checkbox"
                          checked={enabled[a.key]}
                          onChange={(e) => setEnabled((p) => ({ ...p, [a.key]: e.target.checked }))}
                          className="checkbox checkbox-sm checkbox-primary"
                        />
                        <span className="text-sm">
                          {a.icon} {a.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-base mb-2">Your numbers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    <SliderInput label="Team size" value={inputs.teamSize} min={1} max={500} onChange={(v) => setI('teamSize', v)} />
                    <SliderInput label="Hourly rate" prefix="$" value={inputs.hourlyRate} min={20} max={300} onChange={(v) => setI('hourlyRate', v)} />
                    {enabled.time && (
                      <SliderInput label="Hours saved / wk / person" value={inputs.hoursSavedPerWeekPerPerson} min={0} max={30} onChange={(v) => setI('hoursSavedPerWeekPerPerson', v)} />
                    )}
                    {enabled.saas && (
                      <>
                        <SliderInput label="Monthly SaaS spend" prefix="$" value={inputs.monthlySaasSpend} min={0} max={50000} step={100} onChange={(v) => setI('monthlySaasSpend', v)} />
                        <SliderInput label="% replaceable by AI" suffix="%" value={inputs.saasReplaceablePct} min={0} max={100} onChange={(v) => setI('saasReplaceablePct', v)} />
                      </>
                    )}
                    {enabled.headcount && (
                      <>
                        <SliderInput label="Hires avoided / yr" value={inputs.plannedHires} min={0} max={50} onChange={(v) => setI('plannedHires', v)} />
                        <SliderInput label="Fully loaded cost / hire" prefix="$" value={inputs.fullyLoadedCostPerHire} min={40000} max={400000} step={5000} onChange={(v) => setI('fullyLoadedCostPerHire', v)} />
                      </>
                    )}
                    {enabled.revenue && (
                      <>
                        <SliderInput label="Deals / month" value={inputs.monthlyDeals} min={0} max={500} onChange={(v) => setI('monthlyDeals', v)} />
                        <SliderInput label="Avg deal value" prefix="$" value={inputs.avgDealValue} min={500} max={500000} step={500} onChange={(v) => setI('avgDealValue', v)} />
                        <SliderInput label="Win rate lift" suffix="%" value={inputs.winRateLiftPct} min={0} max={100} onChange={(v) => setI('winRateLiftPct', v)} />
                      </>
                    )}
                    {enabled.output && (
                      <>
                        <SliderInput label="Output units / month" value={inputs.monthlyOutputUnits} min={0} max={50000} step={10} onChange={(v) => setI('monthlyOutputUnits', v)} />
                        <SliderInput label="Old cost / unit" prefix="$" value={inputs.oldCostPerOutput} min={0} max={1000} onChange={(v) => setI('oldCostPerOutput', v)} />
                        <SliderInput label="New cost / unit" prefix="$" value={inputs.newCostPerOutput} min={0} max={500} onChange={(v) => setI('newCostPerOutput', v)} />
                      </>
                    )}
                    {enabled.opportunity && (
                      <>
                        <SliderInput label="Annual revenue" prefix="$" value={inputs.annualRevenue} min={100000} max={100000000} step={50000} onChange={(v) => setI('annualRevenue', v)} />
                        <SliderInput label="Competitor efficiency gap" suffix="%" value={inputs.competitorEfficiencyGapPct} min={0} max={80} onChange={(v) => setI('competitorEfficiencyGapPct', v)} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card bg-primary text-primary-content sticky top-20">
                <div className="card-body">
                  <p className="text-xs uppercase opacity-80">Annual AI value</p>
                  <p className="text-4xl font-bold">
                    <AnimatedNumber value={total} />
                  </p>
                  <div className="divider my-1 opacity-30" />
                  {breakdown.filter((b) => b.on).map((b) => (
                    <div key={b.key} className="flex justify-between text-sm">
                      <span>{b.icon} {b.label}</span>
                      <span className="font-mono">{fmtUSDFull(b.value)}</span>
                    </div>
                  ))}
                  <button onClick={() => setStep(2)} className="btn btn-secondary btn-sm mt-4">
                    See business case →
                  </button>
                </div>
              </div>
              <button onClick={() => setStep(0)} className="btn btn-ghost btn-sm w-full">
                ← Change audience
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <div className="badge badge-primary">Business case for {AUDIENCES.find((a) => a.id === audience)?.label}</div>
              <h2 className="text-3xl font-bold mt-2">
                AI is worth <span className="text-primary"><AnimatedNumber value={total} /></span> / year
              </h2>
              <p className="text-base-content/70 mb-4">
                Based on the {breakdown.filter((b) => b.on).length} lenses you stacked.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {breakdown.filter((b) => b.on).map((b) => (
                  <div key={b.key} className="border border-base-300 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium">{b.icon} {b.label}</span>
                      <span className="text-xl font-bold text-primary">{fmtUSDFull(b.value)}</span>
                    </div>
                    <p className="text-xs text-base-content/60">{b.blurb} · best for {b.audience}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setStep(1)} className="btn btn-outline btn-sm">← Tweak inputs</button>
                <a href="/contact" className="btn btn-primary btn-sm">Get this delivered</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
