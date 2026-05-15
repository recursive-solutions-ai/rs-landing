'use client'

import { useEffect, useMemo, useState } from 'react'
import { SliderInput } from './shared'

const INDUSTRIES = [
  { id: 'saas', label: 'SaaS / Software', gapPct: 35 },
  { id: 'services', label: 'Professional Services', gapPct: 30 },
  { id: 'ecom', label: 'E-commerce', gapPct: 40 },
  { id: 'finance', label: 'Finance / Fintech', gapPct: 28 },
  { id: 'health', label: 'Health / Biotech', gapPct: 18 },
  { id: 'mfg', label: 'Manufacturing', gapPct: 22 },
]

export function DelayCalculator() {
  const [revenue, setRevenue] = useState(2_000_000)
  const [headcount, setHeadcount] = useState(40)
  const [industry, setIndustry] = useState('saas')
  const [competitorsUsingAI, setCompetitorsUsingAI] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [start] = useState(() => Date.now())
  const [now, setNow] = useState(0)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setNow(Date.now()), 100)
    return () => clearInterval(id)
  }, [])

  const industryGap = INDUSTRIES.find((i) => i.id === industry)?.gapPct ?? 30
  const competitorMultiplier = competitorsUsingAI ? 1.5 : 0.6

  const annualDelay = useMemo(() => {
    const efficiencyLoss = revenue * (industryGap / 100) * 0.1 * competitorMultiplier
    const talentRisk = headcount * 8000
    const productivityTax = headcount * 1500 * 12
    return efficiencyLoss + talentRisk + productivityTax
  }, [revenue, industryGap, competitorMultiplier, headcount])

  const perSecond = annualDelay / (365 * 24 * 3600)
  const elapsedSec = mounted ? (now - start) / 1000 : 0
  const burnedSoFar = perSecond * elapsedSec

  return (
    <div className="min-h-screen bg-neutral text-neutral-content relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      <div className="relative max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="badge badge-error badge-outline mb-3">Concept C · Cost of Delay</div>
          <h1 className="text-5xl font-bold mb-2">Doing nothing is not free.</h1>
          <p className="text-neutral-content/70">Every second you wait, this is what AI inaction costs you.</p>
        </div>

        <div className="bg-error/10 border-2 border-error rounded-3xl p-10 text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-error mb-2">Burning right now</p>
          <p className="text-7xl md:text-8xl font-black tracking-tight text-error tabular-nums">
            ${burnedSoFar.toFixed(2)}
          </p>
          <p className="text-sm mt-2 text-neutral-content/60">
            since this page loaded · ${perSecond.toFixed(4)}/sec · {Math.round(perSecond * 60).toLocaleString()} per minute
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-base-100/5 border border-base-content/10 rounded-xl p-4">
            <p className="text-xs uppercase opacity-60 mb-2">Hour</p>
            <p className="text-3xl font-bold text-warning tabular-nums">${Math.round(perSecond * 3600).toLocaleString()}</p>
          </div>
          <div className="bg-base-100/5 border border-base-content/10 rounded-xl p-4">
            <p className="text-xs uppercase opacity-60 mb-2">Day</p>
            <p className="text-3xl font-bold text-warning tabular-nums">${Math.round(perSecond * 86400).toLocaleString()}</p>
          </div>
          <div className="bg-base-100/5 border border-base-content/10 rounded-xl p-4">
            <p className="text-xs uppercase opacity-60 mb-2">Month</p>
            <p className="text-3xl font-bold text-warning tabular-nums">${Math.round(perSecond * 86400 * 30).toLocaleString()}</p>
          </div>
          <div className="bg-base-100/5 border border-base-content/10 rounded-xl p-4">
            <p className="text-xs uppercase opacity-60 mb-2">Year</p>
            <p className="text-3xl font-bold text-error tabular-nums">${Math.round(annualDelay).toLocaleString()}</p>
          </div>
        </div>

        <div className="card bg-base-100/5 border border-base-content/10">
          <div className="card-body">
            <h3 className="font-semibold">Your situation</h3>
            <SliderInput label="Annual revenue" prefix="$" value={revenue} min={100000} max={50_000_000} step={50000} onChange={setRevenue} />
            <SliderInput label="Headcount" value={headcount} min={1} max={500} onChange={setHeadcount} />
            <div className="form-control">
              <label className="label"><span className="label-text text-sm">Industry</span></label>
              <select className="select select-bordered" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                {INDUSTRIES.map((i) => (
                  <option key={i.id} value={i.id}>{i.label} (avg efficiency gap {i.gapPct}%)</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer mt-3">
              <input type="checkbox" checked={competitorsUsingAI} onChange={(e) => setCompetitorsUsingAI(e.target.checked)} className="checkbox checkbox-error" />
              <span className="text-sm">My competitors are already deploying AI</span>
            </label>
          </div>
        </div>

        <div className="mt-8 p-6 bg-warning/10 border-l-4 border-warning rounded">
          <p className="text-sm">
            <span className="font-bold">Reality check:</span> your team is already using AI on personal ChatGPT accounts.
            "Doing nothing" means doing it without oversight, governance, or measurable return.
          </p>
        </div>
      </div>
    </div>
  )
}
