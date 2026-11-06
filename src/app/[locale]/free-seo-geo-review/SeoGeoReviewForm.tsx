"use client"

import { useState, type FormEvent } from "react"
import { submitForm } from "@growth-engine/sdk-client"

// Lucy Growth Engine form slug and field names. Must match the form defined
// in the Brain portal: `work_email` (email) and `website` (url).
const FORM_SLUG = "seo-geo-review"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Accepts "example.com" or a full URL; returns a normalised https URL or null. */
export function normalizeWebsite(input: string): string | null {
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

export function SeoGeoReviewForm() {
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
	const [errorMsg, setErrorMsg] = useState("")
	const [submittedSite, setSubmittedSite] = useState("")

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setStatus("loading")
		setErrorMsg("")

		const formEl = e.currentTarget
		const formData = new FormData(formEl)

		// Honeypot: humans never see this field; a filled value is a bot.
		if (formData.get("company_name")) {
			setSubmittedSite("your website")
			setStatus("success")
			return
		}

		const email = String(formData.get("work_email") ?? "").trim()
		const website = normalizeWebsite(String(formData.get("website") ?? ""))

		if (!EMAIL_RE.test(email)) {
			setStatus("error")
			setErrorMsg("Please enter a valid email address.")
			return
		}
		if (!website) {
			setStatus("error")
			setErrorMsg("Please enter a valid website address, for example yourfirm.com.")
			return
		}

		try {
			const result = await submitForm(FORM_SLUG, { work_email: email, website })
			if (!result.ok) {
				console.error("[seo-geo-review] submit failed", result)
				if (result.validationErrors?.length) {
					throw new Error(result.validationErrors.map((err) => err.message).join(", "))
				}
				throw new Error(result.error ?? "Something went wrong.")
			}
			setSubmittedSite(website.replace(/^https?:\/\//, "").replace(/\/$/, ""))
			setStatus("success")
			formEl.reset()
		} catch (err) {
			console.error("[seo-geo-review] submit error", err)
			setStatus("error")
			setErrorMsg(
				`We couldn't submit your request: ${err instanceof Error ? err.message : "Something went wrong."} Please try again, or email team@recursive-solutions.com.`,
			)
		}
	}

	if (status === "success") {
		return (
			<div role="status" className="rounded-box border border-base-300 bg-base-100 p-8 shadow-sm">
				<p className="font-display text-2xl font-bold">Thanks. We&rsquo;re reviewing {submittedSite} now.</p>
				<p className="mt-3 text-base-content/75">
					Your report will land in your inbox within a few minutes.
				</p>
			</div>
		)
	}

	const inputClass =
		"w-full rounded-lg border border-base-300 bg-base-100 px-4 py-3 text-base text-base-content placeholder:text-base-content/50 focus:outline-2 focus:outline-offset-2 focus:outline-primary"

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="space-y-4 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm md:p-8"
		>
			<div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
				<label htmlFor="seo-company_name">Leave this field empty</label>
				<input type="text" id="seo-company_name" name="company_name" tabIndex={-1} autoComplete="off" />
			</div>
			<div>
				<label htmlFor="seo-website" className="mb-1 block text-sm font-semibold">
					Website
				</label>
				<input
					id="seo-website"
					name="website"
					type="text"
					inputMode="url"
					autoComplete="url"
					placeholder="yourfirm.com"
					required
					aria-required="true"
					className={inputClass}
				/>
			</div>
			<div>
				<label htmlFor="seo-work_email" className="mb-1 block text-sm font-semibold">
					Email
				</label>
				<input
					id="seo-work_email"
					name="work_email"
					type="email"
					autoComplete="email"
					placeholder="you@yourfirm.com"
					required
					aria-required="true"
					className={inputClass}
				/>
			</div>

			{status === "error" && errorMsg && (
				<p role="alert" className="rounded-lg bg-error px-4 py-2 text-sm text-error-content">
					{errorMsg}
				</p>
			)}

			<button
				type="submit"
				disabled={status === "loading"}
				className="btn btn-primary w-full text-base disabled:opacity-60"
			>
				{status === "loading" ? <span className="loading loading-spinner loading-md" /> : "Send my free review"}
			</button>
			<p className="text-center text-sm text-base-content/65">
				Free. No call required. Report in a few minutes.
			</p>
		</form>
	)
}
