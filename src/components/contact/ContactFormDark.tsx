"use client"

import { useState, type FormEvent } from "react"
import { submitForm } from "@growth-engine/sdk-client"
import type { FormDefinition } from "@/lib/forms-server"

const field =
	"w-full rounded-lg border border-white/15 bg-white/[0.05] px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"

export function ContactFormDark({ form }: { form: FormDefinition }) {
	const slug = form.slug
	const fields = form.fields
	const settings = form.settings ?? null
	const submitLabel = settings?.submitButtonText ?? "Send message"
	const successMessage = settings?.successMessage ?? "You'll hear from us within one business day."
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
	const [errorMsg, setErrorMsg] = useState("")

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setStatus("loading")
		setErrorMsg("")

		const formEl = e.currentTarget
		const formData = new FormData(formEl)

		// Honeypot: humans never see the "company_website" field — a filled
		// value is a bot, so pretend success and submit nothing.
		if (formData.get("company_website")) {
			setStatus("success")
			formEl.reset()
			return
		}

		const data: Record<string, unknown> = {}

		for (const field of fields) {
			const raw = formData.get(field.name)
			if (field.type === "checkbox") {
				data[field.name] = raw === "on" || raw === "true"
			} else if (field.type === "select" && !raw) {
				// An untouched optional select has no value; omit it rather than
				// post "", which is not one of the field's options.
				data[field.name] = undefined
			} else if (field.type === "number") {
				data[field.name] = raw === null || raw === "" ? undefined : Number(raw)
			} else {
				data[field.name] = typeof raw === "string" ? raw : ""
			}
		}

		const missing = fields.filter(
			(f) => f.required && (data[f.name] === undefined || data[f.name] === "" || data[f.name] === false)
		)
		if (missing.length > 0) {
			setStatus("error")
			setErrorMsg(`Please fill in: ${missing.map((f) => f.label).join(", ")}.`)
			return
		}

		try {
			const result = await submitForm(slug, data)

			if (!result.ok) {
				if (result.validationErrors) {
					throw new Error(result.validationErrors.map((err) => err.message).join(", "))
				}
				throw new Error(result.error ?? "Something went wrong.")
			}

			setStatus("success")
			formEl.reset()
		} catch (err) {
			setStatus("error")
			setErrorMsg(
				err instanceof Error ? err.message : "Something went wrong."
			)
		}
	}

	if (status === "success") {
		return (
			<div className="rounded-xl bg-sky-400/10 p-8 text-center" role="status">
				<p className="text-2xl font-semibold">Message sent!</p>
				<p className="mt-2 text-white/70">{successMessage}</p>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
				<label htmlFor="contact-company_website">Leave this field empty</label>
				<input type="text" id="contact-company_website" name="company_website" tabIndex={-1} autoComplete="off" />
			</div>
			{fields.map((f) => {
				const id = `contact-${f.name}`
				const common = {
					id,
					name: f.name,
					required: f.required,
					"aria-required": f.required,
					placeholder: f.placeholder ?? f.label,
				}
				return (
					<div key={f.name}>
						<label htmlFor={id} className={f.type === "checkbox" ? "sr-only" : "mb-1.5 block text-sm font-medium text-white/80"}>
							{f.label}
						</label>
						{f.type === "textarea" ? (
							<textarea rows={4} {...common} className={field} />
						) : f.type === "select" ? (
							<select {...common} defaultValue="" className={field}>
								<option value="" disabled className="bg-[#050816] text-white">
									{f.placeholder ?? "Select..."}
								</option>
								{(f.options ?? []).map((opt) => (
									<option key={opt} value={opt} className="bg-[#050816] text-white">
										{opt}
									</option>
								))}
							</select>
						) : f.type === "checkbox" ? (
							<label className="flex items-center gap-3 text-white/80">
								<input type="checkbox" id={id} name={f.name} required={f.required} className="size-4 accent-sky-400" />
								<span>{f.placeholder ?? f.label}</span>
							</label>
						) : (
							<input type={f.type} {...common} className={field} />
						)}
					</div>
				)
			})}
			{status === "error" && errorMsg && (
				<p role="alert" className="rounded-lg bg-red-500/15 px-4 py-2 text-sm text-red-200">
					{errorMsg}
				</p>
			)}
			<button
				type="submit"
				disabled={status === "loading"}
				className="w-full rounded-full bg-sky-400 px-6 py-3.5 text-base font-semibold text-[#050816] transition hover:bg-sky-300 disabled:opacity-60"
			>
				{status === "loading" ? "Sending..." : submitLabel}
			</button>
		</form>
	)
}
