"use client"

import { useState, type CSSProperties, type FormEvent } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { Input, Textarea } from "@/components/ui"
import { submitForm } from "@growth-engine/sdk-client"
import type { FormDefinition, FormField } from "@/lib/forms-server"

const FALLBACK_FIELDS: FormField[] = [
	{ name: "name", label: "Your name", type: "text", required: true, placeholder: "Your name", order: 0 },
	{ name: "email", label: "Email address", type: "email", required: true, placeholder: "you@company.com", order: 1 },
	{
		name: "message",
		label: "What's the biggest bottleneck slowing your team down?",
		type: "textarea",
		required: true,
		placeholder: "What's the biggest bottleneck slowing your team down?",
		order: 2,
	},
]

const FALLBACK_SLUG = "general-contact-form"

interface ContactCTASectionProps {
	form?: FormDefinition | null
	heading?: string
	subtitle?: string
	intro?: string
	submitLabel?: string
}

export function ContactCTASection({
	form,
	heading,
	subtitle,
	intro,
	submitLabel: submitLabelProp,
}: ContactCTASectionProps) {
	const { ref: contentRef, inView } = useInView<HTMLDivElement>()

	const slug = form?.slug ?? FALLBACK_SLUG
	const fields = form?.fields?.length ? form.fields : FALLBACK_FIELDS
	const settings = form?.settings ?? null
	const submitLabel = submitLabelProp ?? settings?.submitButtonText ?? "Book a Consult"
	const headingText = heading ?? "Let's make your business simpler, faster, and more valuable."
	const subtitleText = subtitle ?? ""
	const introText =
		intro ??
		"In 30 minutes, we'll learn about your business and hand you a Friction Audit. A real breakdown of where your business loses time and margin, and where AI could take you. Worst case, you walk away with free insight your competitors are paying for."
	const successMessage = settings?.successMessage ?? "You'll hear from us within one business day."

	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle")
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

	const fieldClass =
		"bg-primary-content/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/50 transition-all duration-200 focus:ring-2 focus:ring-primary-content/30"

	return (
		<section id="contact" className="mx-auto max-w-6xl px-6 py-16">
			<div ref={contentRef} className={cn(inView && "reveal-in")}>
				<h2
					className={cn(
						"reveal font-display text-3xl font-bold md:text-5xl text-center text-base-content",
						subtitleText ? "mb-4" : "mb-12"
					)}
				>
					{headingText}
				</h2>
				{subtitleText && (
					<p
						className="reveal mx-auto mb-12 max-w-xl text-lg text-base-content/60 md:text-xl text-center"
						style={{ "--reveal-delay": "0.1s" } as CSSProperties}
					>
						{subtitleText}
					</p>
				)}

				<div
					className="reveal mx-auto max-w-2xl"
					style={{ "--reveal-delay": "0.2s" } as CSSProperties}
				>
					<div className="overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-content shadow-2xl md:p-12">

						<p className="mb-8 text-primary-content/80 leading-relaxed">
							{introText}
						</p>

						{status === "success" ? (
							<div className="reveal reveal-in rounded-2xl bg-neutral/20 p-8 text-center">
								<p className="text-2xl font-semibold mb-2">
									Message sent!
								</p>
								<p className="text-primary-content/80">{successMessage}</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-4">
								{/* Honeypot — visually hidden, ignored by people, filled by bots */}
								<div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
									<label htmlFor="contact-company_website">
										Leave this field empty
									</label>
									<input
										type="text"
										id="contact-company_website"
										name="company_website"
										tabIndex={-1}
										autoComplete="off"
									/>
								</div>
								{fields.map((field) => {
									const id = `contact-${field.name}`
									const commonProps = {
										id,
										name: field.name,
										placeholder: field.placeholder ?? field.label,
										required: field.required,
										"aria-required": field.required,
										className: fieldClass,
									}

									return (
										<div key={field.name}>
											<label htmlFor={id} className="sr-only">
												{field.label}
											</label>
											{field.type === "textarea" ? (
												<Textarea rows={3} {...commonProps} />
											) : field.type === "select" ? (
												<select
													{...commonProps}
													className={`select select-bordered w-full ${fieldClass}`}
													defaultValue=""
												>
													<option value="" disabled>
														{field.placeholder ?? "Select..."}
													</option>
													{(field.options ?? []).map((opt) => (
														<option key={opt} value={opt}>
															{opt}
														</option>
													))}
												</select>
											) : field.type === "checkbox" ? (
												<label className="flex items-center gap-3 text-primary-content/90">
													<input
														type="checkbox"
														id={id}
														name={field.name}
														required={field.required}
														className="checkbox checkbox-sm"
													/>
													<span>{field.placeholder ?? field.label}</span>
												</label>
											) : (
												<Input type={field.type} {...commonProps} />
											)}
										</div>
									)
								})}

								{status === "error" && errorMsg && (
									<p className="text-sm text-error-content bg-error/80 rounded-lg px-4 py-2">
										{errorMsg}
									</p>
								)}

								<button
									type="submit"
									disabled={status === "loading"}
									className="btn btn-neutral w-full border-none py-4 text-lg font-bold text-neutral-content shadow-xl transition-all duration-200 hover:bg-neutral/80 active:scale-[0.97] disabled:opacity-60"
								>
									{status === "loading" ? (
										<span className="loading loading-spinner loading-md" />
									) : (
										submitLabel
									)}
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
