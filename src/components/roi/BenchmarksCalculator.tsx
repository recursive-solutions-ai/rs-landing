'use client'

import { useMemo, useState } from 'react'
import { INDUSTRY_BENCHMARKS } from '@/lib/roi'
import { AnimatedNumber, SliderInput } from './shared'

const SIZES = [
  { id: 'sm', label: '< 50', factor: 1 },
  { id: 'md', label: '50-250', factor: 4 },
  { id: 'lg', label: '250-1000', factor: 12 },
  { id: 'xl', label: '1000+', factor: 30 },
]

const INDUSTRY_BASE_SAVINGS: Record<string, number> = {
  support: 150_000,
  sales: 450_000,
  marketing: 220_000,
  eng: 380_000,
  ops: 600_000,
}

export function BenchmarksCalculator() {
  const [industry, setIndustry] = useState('sales')
  const [size, setSize] = useState('md')
  const [revenue, setRevenue] = useState(2_000_000)

  const selected = INDUSTRY_BENCHMARKS.find((b) => b.id === industry)!
  const sizeFactor = SIZES.find((s) => s.id === size)!.factor

  const estimate = useMemo(() => INDUSTRY_BASE_SAVINGS[industry] * sizeFactor, [industry, sizeFactor])
  const percentOfRevenue = revenue > 0 ? (estimate / revenue) * 100 : 0

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="badge badge-success badge-outline mb-3">Concept E · Industry Benchmarks</div>
          <h1 className="text-5xl font-bold mb-2">What companies like yours are saving.</h1>
          <p className="text-base-content/70">Real numbers from real deployments. No projections.</p>
        </div>

        <div className="card bg-base-200 mb-6">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-base-content/60 mb-2">Function</p>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRY_BENCHMARKS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setIndustry(b.id)}
                      className={`btn btn-sm ${industry === b.id ? 'btn-success' : 'btn-outline'}`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-base-content/60 mb-2">Company size</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      className={`btn btn-sm ${size === s.id ? 'btn-success' : 'btn-outline'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <SliderInput label="Annual revenue" prefix="$" value={revenue} min={100000} max={100_000_000} step={100000} onChange={setRevenue} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 card bg-gradient-to-br from-success to-primary text-success-content">
            <div className="card-body">
              <p className="text-xs uppercase opacity-80">Estimated annual savings for {selected.label}, {SIZES.find((s) => s.id === size)?.label} headcount</p>
              <p className="text-6xl font-black tracking-tight">
                <AnimatedNumber value={estimate} />
              </p>
              <p className="opacity-90 mt-1">≈ {percentOfRevenue.toFixed(1)}% of your annual revenue</p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="text-xs uppercase tracking-wide text-base-content/60">Benchmarks for this function</p>
              <div className="space-y-3 mt-2">
                {selected.stats.map((s) => (
                  <div key={s.label} className="border-l-4 border-success pl-3">
                    <p className="text-xs text-base-content/60">{s.label}</p>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs italic text-base-content/60">{s.source}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body">
            <h3 className="card-title">Compare across functions</h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead><tr><th>Function</th><th>Headline stat</th><th>Source</th><th className="text-right">Est for your size</th></tr></thead>
                <tbody>
                  {INDUSTRY_BENCHMARKS.map((b) => {
                    const est = INDUSTRY_BASE_SAVINGS[b.id] * sizeFactor
                    const top = b.stats[0]
                    return (
                      <tr key={b.id} className={industry === b.id ? 'bg-success/10' : ''}>
                        <td className="font-medium">{b.label}</td>
                        <td>{top.value}</td>
                        <td className="text-xs text-base-content/60">{top.source}</td>
                        <td className="text-right font-mono">${est.toLocaleString()}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="text-3xl font-bold">75%</p>
              <p className="text-sm text-base-content/60">Wharton: companies seeing positive AI ROI</p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="text-3xl font-bold">3.6x</p>
              <p className="text-sm text-base-content/60">BCG: top performers shareholder return</p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="text-3xl font-bold">$1M+</p>
              <p className="text-sm text-base-content/60">Estimated cost of a 1-year AI delay (mid-size)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
