"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const WEEKS_PER_YEAR = 52
const HOURS_PER_WORKDAY = 8
// Full-time employee-year (40h × 52w) — the gauge shows reclaimed hours
// as a share of one person's working year.
const FTE_HOURS = 2080

function num(value: string): number {
	const n = Number(value)
	return Number.isFinite(n) && n > 0 ? n : 0
}

export function FrictionEstimator() {
	const [hours, setHours] = useState("10")
	const [people, setPeople] = useState("3")
	const [showCost, setShowCost] = useState(false)
	const [rate, setRate] = useState("50")

	const reclaimable = Math.round(num(hours) * num(people) * WEEKS_PER_YEAR)
	const workdays = Math.round(reclaimable / HOURS_PER_WORKDAY)
	const annualCost = Math.round(reclaimable * num(rate))
	const fill = Math.min(100, (reclaimable / FTE_HOURS) * 100)

	return (
		<div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl shadow-primary/5 sm:p-8">
			<p className="text-base leading-relaxed text-base-content/70">
				Estimate the time your team loses every year to manual, repetitive work.
			</p>

			{/* Inputs */}
			<div className="mt-6 grid grid-cols-2 items-end gap-4">
				<Field
					id="fe-hours"
					label="Manual hrs / week"
					value={hours}
					onChange={setHours}
				/>
				<Field
					id="fe-people"
					label="People doing it"
					value={people}
					onChange={setPeople}
				/>
			</div>

			{/* Result */}
			<div className="mt-6 rounded-xl bg-base-200 p-5">
				<span className="text-xs font-semibold uppercase tracking-widest text-base-content/50">
					Reclaimable hours / year
				</span>
				<p className="font-display mt-1 text-5xl font-bold leading-none tracking-tight text-base-content">
					{reclaimable.toLocaleString()}{" "}
					<span className="text-primary">hrs</span>
				</p>
				<div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-base-300">
					<div
						className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
						style={{ width: `${fill}%` }}
					/>
				</div>
				<p className="mt-3 text-sm text-base-content/70">
					≈ <span className="font-bold text-base-content">{workdays.toLocaleString()}</span>{" "}
					full work-days handed back to your team.
				</p>
			</div>

			{/* Dollar cost */}
			<button
				type="button"
				onClick={() => setShowCost((v) => !v)}
				className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-base-content/70 transition-colors hover:text-primary"
				aria-expanded={showCost}
			>
				{showCost ? "Hide the dollar cost" : "Calculate the dollar cost"}
				<span className={cn("transition-transform", showCost && "rotate-180")}>↓</span>
			</button>

			{showCost && (
				<div className="mt-4 border-t border-base-300 pt-5">
					<div className="grid grid-cols-2 items-end gap-4">
						<Field
							id="fe-rate"
							label="Hourly cost / person ($)"
							value={rate}
							onChange={setRate}
						/>
						<div>
							<span className="text-xs font-semibold uppercase tracking-widest text-base-content/50">
								Annual cost
							</span>
							<p className="font-display mt-1 text-3xl font-bold leading-none tracking-tight text-primary">
								${annualCost.toLocaleString()}
							</p>
						</div>
					</div>
					<a
						href="#contact"
						className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-base-content"
					>
						Reclaim these hours →
					</a>
				</div>
			)}
		</div>
	)
}

function Field({
	id,
	label,
	value,
	onChange,
}: {
	id: string
	label: string
	value: string
	onChange: (value: string) => void
}) {
	return (
		<div>
			<label
				htmlFor={id}
				className="text-xs font-semibold uppercase tracking-widest text-base-content/50"
			>
				{label}
			</label>
			<input
				id={id}
				type="number"
				min={0}
				inputMode="numeric"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="font-display mt-2 w-full rounded-lg border border-base-300 bg-base-100 px-4 py-3 text-2xl font-semibold text-base-content outline-none transition-colors focus:border-primary"
			/>
		</div>
	)
}
