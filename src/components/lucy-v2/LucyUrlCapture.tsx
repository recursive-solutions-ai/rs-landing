"use client"

import { useId, useState, type FormEvent } from "react"
import { submitForm } from "@growth-engine/sdk-client"

// Same Growth Engine form as /free-seo-geo-review: `website` (url) + `work_email` (email).
const FORM_SLUG = "seo-geo-review"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Accepts "example.com" or a full URL; returns a normalised https URL or null. */
function normalizeWebsite(input: string): string | null {
	const trimmed = input.trim()
	if (!trimmed) return null
	const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
	try {
		const url = new URL(withScheme)
		if (!url.hostname.includes(".") || /\s/.test(url.hostname)) return null
		return url.toString()
	} catch {
		return null
	}
}

function displayDomain(url: string): string {
	return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "")
}

const CHIPS = ["No call needed", "You approve everything before it goes live"]

interface LucyUrlCaptureProps {
	/** Unique prefix so two instances on one page don't share input ids. */
	id?: string
	/** Show the reassurance chips under the form (final CTA only). */
	showChips?: boolean
}

export function LucyUrlCapture({ id = "hero", showChips = true }: LucyUrlCaptureProps) {
	const uid = useId()
	const base = `${id}-${uid.replace(/:/g, "")}`
	const [step, setStep] = useState<1 | 2>(1)
	const [website, setWebsite] = useState("")
	const [email, setEmail] = useState("")
	const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
	const [error, setError] = useState("")
	const [honeypot, setHoneypot] = useState("")

	const normalized = normalizeWebsite(website)
	const domain = normalized ? displayDomain(normalized) : ""

	function handleUrl(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!normalized) {
			setError("Please enter a valid website address, for example yourbusiness.com.")
			return
		}
		setError("")
		setStep(2)
	}

	async function handleEmail(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setError("")
		const cleanEmail = email.trim()
		if (!EMAIL_RE.test(cleanEmail)) {
			setError("Please enter a valid email address.")
			return
		}
		if (!normalized) {
			setStep(1)
			setError("Please enter a valid website address, for example yourbusiness.com.")
			return
		}
		// Honeypot: humans never see this field; a filled value is a bot.
		if (honeypot) {
			setStatus("success")
			return
		}
		setStatus("loading")
		try {
			const result = await submitForm(FORM_SLUG, { work_email: cleanEmail, website: normalized })
			if (!result.ok) {
				console.error("[lucy-v2] submit failed", result)
				if (result.validationErrors?.length) {
					throw new Error(result.validationErrors.map((err) => err.message).join(", "))
				}
				throw new Error(result.error ?? "Something went wrong.")
			}
			setStatus("success")
		} catch (err) {
			console.error("[lucy-v2] submit error", err)
			setStatus("idle")
			setError(
				`We couldn't submit your request: ${err instanceof Error ? err.message : "Something went wrong."} Please try again, or email team@recursive-solutions.com.`,
			)
		}
	}

	const inputClass =
		"w-full min-w-0 rounded-xl border border-white/15 bg-white/5 py-4 pl-12 pr-4 text-base text-white placeholder:text-white/40 focus:border-sky-400 focus:outline-2 focus:outline-offset-2 focus:outline-sky-400"
	const buttonClass =
		"inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-sky-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:opacity-60 sm:w-auto"

	return (
		<div className="mx-auto w-full max-w-xl">
			<div className="rounded-2xl border border-white/15 bg-white/[0.06] p-2.5 shadow-[0_0_60px_-10px_rgba(59,130,246,0.45)] backdrop-blur sm:p-3">
				{status === "success" ? (
					<div role="status" className="px-3 py-4 text-left">
						<p className="font-display text-2xl font-bold text-white">
							Lucy&rsquo;s on it.
						</p>
						<p className="mt-2 text-white/75">
							Got it. We’ll review {domain} and get back to you at {email.trim()}.
						</p>
					</div>
				) : step === 1 ? (
					<form key="step1" onSubmit={handleUrl} noValidate className="lucy-v2-swap">
						<label htmlFor={`${base}-site`} className="sr-only">
							Your website address
						</label>
						<div className="flex flex-col gap-3 sm:flex-row">
							<div className="relative min-w-0 flex-1">
								<svg
									aria-hidden="true"
									viewBox="0 0 24 24"
									className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/50"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="12" cy="12" r="9" />
									<path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
								</svg>
								<input
									id={`${base}-site`}
									type="text"
									inputMode="url"
									autoComplete="url"
									placeholder="yourbusiness.com"
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
									aria-invalid={error ? true : undefined}
									aria-describedby={error ? `${base}-err` : undefined}
									className={inputClass}
								/>
							</div>
							<button type="submit" className={buttonClass}>
								Get started &rarr;
							</button>
						</div>
					</form>
				) : (
					<form key="step2" onSubmit={handleEmail} noValidate className="lucy-v2-swap">
						<p className="mb-3 px-1 text-left text-base font-medium text-white">
							Where should we send what we’d build for{" "}
							<span className="break-all text-sky-300">{domain}</span>?
						</p>
						<div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
							<label htmlFor={`${base}-company`}>Leave this field empty</label>
							<input
								type="text"
								id={`${base}-company`}
								name="company_name"
								tabIndex={-1}
								autoComplete="off"
								value={honeypot}
								onChange={(e) => setHoneypot(e.target.value)}
							/>
						</div>
						<label htmlFor={`${base}-email`} className="sr-only">
							Your email address
						</label>
						<div className="flex flex-col gap-3 sm:flex-row">
							<div className="relative min-w-0 flex-1">
								<svg
									aria-hidden="true"
									viewBox="0 0 24 24"
									className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/50"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect x="3" y="5" width="18" height="14" rx="2" />
									<path d="m3 7 9 6 9-6" />
								</svg>
								<input
									id={`${base}-email`}
									type="email"
									autoComplete="email"
									placeholder="you@yourbusiness.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoFocus
									aria-invalid={error ? true : undefined}
									aria-describedby={error ? `${base}-err` : undefined}
									className={inputClass}
								/>
							</div>
							<button type="submit" disabled={status === "loading"} className={buttonClass}>
								{status === "loading" ? (
									<span className="loading loading-spinner loading-md" aria-label="Sending" />
								) : (
									"Send"
								)}
							</button>
						</div>
						<button
							type="button"
							onClick={() => {
								setStep(1)
								setError("")
							}}
							className="mt-3 px-1 text-sm text-white/60 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-sky-400"
						>
							&larr; change URL
						</button>
					</form>
				)}
				{error && status !== "success" && (
					<p
						id={`${base}-err`}
						role="alert"
						className="mt-3 rounded-lg bg-red-500/15 px-4 py-2 text-left text-sm text-red-200"
					>
						{error}
					</p>
				)}
			</div>

			{showChips && (
			<ul className="mt-4 flex flex-wrap justify-center gap-2">
				{CHIPS.map((chip) => (
					<li
						key={chip}
						className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
					>
						<svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5 shrink-0 text-sky-400" fill="currentColor">
							<path d="M8.2 13.6 4.6 10l1.2-1.2 2.4 2.4 6-6L15.4 6z" />
						</svg>
						{chip}
					</li>
				))}
			</ul>
			)}
			<style>{`
				@keyframes lucy-v2-swap { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
				.lucy-v2-swap { animation: lucy-v2-swap .35s ease-out both; }
				@media (prefers-reduced-motion: reduce) { .lucy-v2-swap { animation: none; } }
			`}</style>
		</div>
	)
}
