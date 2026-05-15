'use client'

import { useMemo, useState } from 'react'
import { APPROACHES, defaultInputs, fmtUSDFull, type ApproachKey, type Inputs } from '@/lib/roi'
import { AnimatedNumber, SliderInput } from './shared'

const PRESETS: { id: string; label: string; keys: ApproachKey[] }[] = [
  { id: 'quick', label: 'Quick Win Stack', keys: ['time', 'saas'] },
  { id: 'exec', label: 'Executive Stack', keys: ['revenue', 'opportunity', 'headcount'] },
  { id: 'ops', label: 'Operations Stack', keys: ['output', 'time'] },
]

export function StackBuilder() {
  const [enabled, setEnabled] = useState<Record<ApproachKey, boolean>>({
    time: true, saas: true, headcount: false, revenue: false, output: false, opportunity: false,
  })
  const [active, setActive] = useState<ApproachKey>('time')
  const [inputs, setInputs] = useState<Inputs>(defaultInputs)
  const setI = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setInputs((p) => ({ ...p, [k]: v }))

  function applyPreset(keys: ApproachKey[]) {
    const next = Object.fromEntries(APPROACHES.map((a) => [a.key, keys.includes(a.key)])) as Record<ApproachKey, boolean>
    setEnabled(next)
    setActive(keys[0])
  }

  const breakdown = useMemo(
    () => APPROACHES.map((a) => ({ ...a, value: a.fn(inputs), on: enabled[a.key] })),
    [inputs, enabled],
  )
  const total = breakdown.filter((b) => b.on).reduce((s, b) => s + b.value, 0)
  const investment = 24000
  const multiple = total > 0 ? Math.round(total / investment) : 0

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="badge badge-info badge-outline mb-3">Concept D · Stack Builder</div>
          <h1 className="text-5xl font-bold mb-2">Build your business case, one lens at a time.</h1>
          <p className="text-base-content/70">Toggle approaches. Stack them. Export.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <span className="text-xs uppercase opacity-60 self-center mr-2">Presets:</span>
          {PRESETS.map((p) => (
            <button key={p.id} onClick={() => applyPreset(p.keys)} className="btn btn-sm btn-outline">
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <p className="text-xs uppercase tracking-wide text-base-content/60 mb-1">Approaches</p>
            {APPROACHES.map((a) => (
              <div
                key={a.key}
                className={`card border-2 cursor-pointer transition ${
                  enabled[a.key] ? 'border-primary bg-base-100' : 'border-base-300 bg-base-100/50 opacity-60'
                } ${active === a.key ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                onClick={() => setActive(a.key)}
              >
                <div className="card-body p-3 flex-row items-center gap-3">
                  <input
                    type="checkbox"
                    checked={enabled[a.key]}
                    onChange={(e) => {
                      e.stopPropagation()
                      setEnabled((p) => ({ ...p, [a.key]: e.target.checked }))
                    }}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{a.label}</p>
                    <p className="text-xs text-base-content/60 truncate">{a.blurb}</p>
                  </div>
                  <span className="text-sm font-mono font-bold">{fmtUSDFull(a.fn(inputs))}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="card bg-gradient-to-r from-primary to-info text-primary-content">
              <div className="card-body">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs uppercase opacity-80">Stacked annual value</p>
                  <p className="text-xs opacity-80">{breakdown.filter((b) => b.on).length} lenses active</p>
                </div>
                <p className="text-6xl font-black tracking-tight">
                  <AnimatedNumber value={total} />
                </p>
                {multiple > 0 && (
                  <p className="text-sm mt-1">{multiple}x return on ~$24K typical AI investment</p>
                )}
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{APPROACHES.find((a) => a.key === active)?.icon}</span>
                  <h3 className="card-title text-base">{APPROACHES.find((a) => a.key === active)?.label}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  {active === 'time' && (
                    <>
                      <SliderInput label="Team size" value={inputs.teamSize} min={1} max={500} onChange={(v) => setI('teamSize', v)} />
                      <SliderInput label="Hourly rate" prefix="$" value={inputs.hourlyRate} min={20} max={300} onChange={(v) => setI('hourlyRate', v)} />
                      <SliderInput label="Hours saved / wk / person" value={inputs.hoursSavedPerWeekPerPerson} min={0} max={30} onChange={(v) => setI('hoursSavedPerWeekPerPerson', v)} />
                    </>
                  )}
                  {active === 'saas' && (
                    <>
                      <SliderInput label="Monthly SaaS spend" prefix="$" value={inputs.monthlySaasSpend} min={0} max={50000} step={100} onChange={(v) => setI('monthlySaasSpend', v)} />
                      <SliderInput label="% replaceable" suffix="%" value={inputs.saasReplaceablePct} min={0} max={100} onChange={(v) => setI('saasReplaceablePct', v)} />
                    </>
                  )}
                  {active === 'headcount' && (
                    <>
                      <SliderInput label="Hires avoided / yr" value={inputs.plannedHires} min={0} max={50} onChange={(v) => setI('plannedHires', v)} />
                      <SliderInput label="Fully loaded cost / hire" prefix="$" value={inputs.fullyLoadedCostPerHire} min={40000} max={400000} step={5000} onChange={(v) => setI('fullyLoadedCostPerHire', v)} />
                    </>
                  )}
                  {active === 'revenue' && (
                    <>
                      <SliderInput label="Deals / month" value={inputs.monthlyDeals} min={0} max={500} onChange={(v) => setI('monthlyDeals', v)} />
                      <SliderInput label="Avg deal value" prefix="$" value={inputs.avgDealValue} min={500} max={500000} step={500} onChange={(v) => setI('avgDealValue', v)} />
                      <SliderInput label="Win rate lift" suffix="%" value={inputs.winRateLiftPct} min={0} max={100} onChange={(v) => setI('winRateLiftPct', v)} />
                    </>
                  )}
                  {active === 'output' && (
                    <>
                      <SliderInput label="Units / month" value={inputs.monthlyOutputUnits} min={0} max={50000} step={10} onChange={(v) => setI('monthlyOutputUnits', v)} />
                      <SliderInput label="Old cost / unit" prefix="$" value={inputs.oldCostPerOutput} min={0} max={1000} onChange={(v) => setI('oldCostPerOutput', v)} />
                      <SliderInput label="New cost / unit" prefix="$" value={inputs.newCostPerOutput} min={0} max={500} onChange={(v) => setI('newCostPerOutput', v)} />
                    </>
                  )}
                  {active === 'opportunity' && (
                    <>
                      <SliderInput label="Annual revenue" prefix="$" value={inputs.annualRevenue} min={100000} max={100000000} step={50000} onChange={(v) => setI('annualRevenue', v)} />
                      <SliderInput label="Competitor gap" suffix="%" value={inputs.competitorEfficiencyGapPct} min={0} max={80} onChange={(v) => setI('competitorEfficiencyGapPct', v)} />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h3 className="card-title text-base">Business case rollup</h3>
                  <button className="btn btn-primary btn-sm" onClick={() => window.print()}>📄 Export PDF</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr><th></th><th>Approach</th><th className="text-right">Annual value</th><th>Audience</th></tr>
                    </thead>
                    <tbody>
                      {breakdown.filter((b) => b.on).map((b) => (
                        <tr key={b.key}>
                          <td>{b.icon}</td>
                          <td className="font-medium">{b.label}</td>
                          <td className="text-right font-mono">{fmtUSDFull(b.value)}</td>
                          <td className="text-xs text-base-content/60">{b.audience}</td>
                        </tr>
                      ))}
                      <tr className="font-bold border-t-2">
                        <td></td>
                        <td>Total</td>
                        <td className="text-right font-mono text-primary">{fmtUSDFull(total)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
