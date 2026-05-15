'use client'

import { useMemo, useState } from 'react'
import { APPROACHES, defaultInputs, fmtUSDFull, type Inputs } from '@/lib/roi'
import { AnimatedNumber, SliderInput } from './shared'

const COMPANY_SIZES = [
  { id: 'solo', label: 'Solo / 1-10', team: 5 },
  { id: 'small', label: '11-50', team: 30 },
  { id: 'mid', label: '51-200', team: 120 },
  { id: 'large', label: '201+', team: 350 },
]

export function SingleNumberCalculator() {
  const [size, setSize] = useState('mid')
  const [inputs, setInputs] = useState<Inputs>({ ...defaultInputs, teamSize: 120 })
  const setI = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setInputs((p) => ({ ...p, [k]: v }))

  const breakdown = useMemo(
    () => APPROACHES.map((a) => ({ ...a, value: a.fn(inputs) })),
    [inputs],
  )
  const total = breakdown.reduce((s, b) => s + b.value, 0)
  const investment = 24000
  const multiple = total > 0 ? Math.round(total / investment) : 0

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="badge badge-accent badge-outline mb-3">Concept B · Single Big Number</div>
          <h1 className="text-5xl font-bold mb-2">Your AI ROI, in one number.</h1>
          <p className="text-base-content/70">Drag the sliders. Watch it climb.</p>
        </div>

        <div className="bg-gradient-to-br from-base-300 to-base-200 rounded-3xl p-8 mb-8 text-center">
          <p className="text-xs uppercase tracking-widest text-base-content/60 mb-2">Annual value of AI to your business</p>
          <p className="text-7xl md:text-8xl font-black tracking-tight text-primary">
            <AnimatedNumber value={total} />
          </p>
          {multiple > 0 && (
            <p className="text-lg mt-3">
              That is a <span className="badge badge-lg badge-primary">{multiple}x</span> return on a typical AI tooling investment.
            </p>
          )}
        </div>

        <div className="card bg-base-100 border border-base-300 mb-6">
          <div className="card-body">
            <p className="font-semibold text-sm uppercase tracking-wide text-base-content/60 mb-2">Step 1 · Company size</p>
            <div className="flex flex-wrap gap-2">
              {COMPANY_SIZES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSize(c.id)
                    setI('teamSize', c.team)
                  }}
                  className={`btn btn-sm ${size === c.id ? 'btn-primary' : 'btn-outline'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <p className="font-semibold text-sm uppercase tracking-wide text-base-content/60">Step 2 · Productivity</p>
              <SliderInput label="Team size" value={inputs.teamSize} min={1} max={500} onChange={(v) => setI('teamSize', v)} />
              <SliderInput label="Hourly rate" prefix="$" value={inputs.hourlyRate} min={20} max={300} onChange={(v) => setI('hourlyRate', v)} />
              <SliderInput label="Hours saved / wk / person" value={inputs.hoursSavedPerWeekPerPerson} min={0} max={30} onChange={(v) => setI('hoursSavedPerWeekPerPerson', v)} />
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <p className="font-semibold text-sm uppercase tracking-wide text-base-content/60">Step 3 · Spend you can cut</p>
              <SliderInput label="Monthly SaaS spend" prefix="$" value={inputs.monthlySaasSpend} min={0} max={50000} step={100} onChange={(v) => setI('monthlySaasSpend', v)} />
              <SliderInput label="% replaceable by AI" suffix="%" value={inputs.saasReplaceablePct} min={0} max={100} onChange={(v) => setI('saasReplaceablePct', v)} />
              <SliderInput label="Hires you can avoid" value={inputs.plannedHires} min={0} max={50} onChange={(v) => setI('plannedHires', v)} />
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <p className="font-semibold text-sm uppercase tracking-wide text-base-content/60">Step 4 · Revenue side</p>
              <SliderInput label="Deals / month" value={inputs.monthlyDeals} min={0} max={500} onChange={(v) => setI('monthlyDeals', v)} />
              <SliderInput label="Avg deal value" prefix="$" value={inputs.avgDealValue} min={500} max={500000} step={500} onChange={(v) => setI('avgDealValue', v)} />
              <SliderInput label="Win rate lift" suffix="%" value={inputs.winRateLiftPct} min={0} max={100} onChange={(v) => setI('winRateLiftPct', v)} />
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <p className="font-semibold text-sm uppercase tracking-wide text-base-content/60">Step 5 · Operations</p>
              <SliderInput label="Output units / mo" value={inputs.monthlyOutputUnits} min={0} max={50000} step={10} onChange={(v) => setI('monthlyOutputUnits', v)} />
              <SliderInput label="Old cost / unit" prefix="$" value={inputs.oldCostPerOutput} min={0} max={1000} onChange={(v) => setI('oldCostPerOutput', v)} />
              <SliderInput label="New cost / unit" prefix="$" value={inputs.newCostPerOutput} min={0} max={500} onChange={(v) => setI('newCostPerOutput', v)} />
            </div>
          </div>
        </div>

        <div className="card bg-base-200 mt-6">
          <div className="card-body">
            <h3 className="font-semibold">Breakdown by approach</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {breakdown.map((b) => (
                <div key={b.key} className="bg-base-100 rounded-lg p-3 border border-base-300">
                  <p className="text-xs text-base-content/60">{b.icon} {b.label}</p>
                  <p className="text-xl font-bold font-mono">{fmtUSDFull(b.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
