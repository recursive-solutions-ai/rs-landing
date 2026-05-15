'use client'

import { useEffect, useState } from 'react'

export function AnimatedNumber({ value, prefix = '$', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const start = display
    const end = value
    const duration = 800
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(start + (end - start) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const rounded = Math.round(display)
  let formatted: string
  if (rounded >= 1_000_000) formatted = `${(rounded / 1_000_000).toFixed(2)}M`
  else if (rounded >= 10_000) formatted = `${(rounded / 1000).toFixed(0)}K`
  else formatted = rounded.toLocaleString()

  return (
    <span className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = '',
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  prefix?: string
  suffix?: string
}) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-sm">{label}</span>
        <span className="label-text-alt font-mono text-primary">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range range-primary range-sm"
      />
    </div>
  )
}

export function NavRibbon() {
  const links = [
    { href: '/roi-calculator', label: 'Index' },
    { href: '/roi-calculator/hybrid', label: 'A+D Hybrid' },
    { href: '/roi-calculator/wizard', label: 'A · Wizard' },
    { href: '/roi-calculator/single', label: 'B · Single' },
    { href: '/roi-calculator/delay', label: 'C · Delay' },
    { href: '/roi-calculator/stack', label: 'D · Stack' },
    { href: '/roi-calculator/benchmarks', label: 'E · Benchmarks' },
  ]
  return (
    <div className="sticky top-0 z-40 bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto text-xs">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="btn btn-ghost btn-xs whitespace-nowrap">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}
