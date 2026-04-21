"use client"

import { useRef, useState, useEffect, type FormEvent } from "react"
import {
	gsap,
	useGSAP,
	EASE_REVEAL,
	DISTANCE_SM,
	DURATION_NORMAL,
	START_CONTENT,
} from "@/lib/animation-config"
import { useReducedMotion } from "@/hooks/useReducedMotion"
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
		placeholder: "(Optional) What's the biggest bottleneck slowing your team down?",
		order: 2,
	},
]

const FALLBACK_SLUG = "general-contact-form"

interface ContactCTASectionProps {
	form?: FormDefinition | null
}

export function ContactCTASection({ form }: ContactCTASectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	const slug = form?.slug ?? FALLBACK_SLUG
	const fields = form?.fields?.length ? form.fields : FALLBACK_FIELDS
	const settings = form?.settings ?? null
	const submitLabel = settings?.submitButtonText ?? "Map My Growth"
	const successMessage = settings?.successMessage ?? "We'll get back to you shortly."

	const successRef = useRef<HTMLDivElement>(null)
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle")
	const [errorMsg, setErrorMsg] = useState("")

	useEffect(() => {
		if (status === "success" && successRef.current && !prefersReduced) {
			gsap.fromTo(
				successRef.current,
				{ opacity: 0, scale: 0.95, y: DISTANCE_SM },
				{ opacity: 1, scale: 1, y: 0, duration: DURATION_NORMAL, ease: EASE_REVEAL }
			)
		}
	}, [status, prefersReduced])

	useGSAP(
		() => {
			if (!contentRef.current || prefersReduced) return

			const children = contentRef.current.children

			gsap.set(children, { y: DISTANCE_SM, opacity: 0 })

			gsap.to(children, {
				y: 0,
				opacity: 1,
				duration: DURATION_NORMAL,
				stagger: 0.1,
				ease: EASE_REVEAL,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: START_CONTENT,
					toggleActions: "play none none none",
				},
			})
		},
		{ scope: sectionRef, dependencies: [prefersReduced] }
	)

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setStatus("loading")
		setErrorMsg("")

		const formEl = e.currentTarget
		const formData = new FormData(formEl)
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
		<section
			ref={sectionRef}
			id="contact"
			className="mx-auto max-w-6xl px-6 py-24"
		>
			<div ref={contentRef}>
				<h2 className="mb-4 text-3xl font-bold md:text-5xl text-center text-base-content">
					Map Your Growth
				</h2>
				<p className="mx-auto mb-12 max-w-xl text-lg text-base-content/60 md:text-xl text-center">
					Book a free 30-minute call — no pitch, no commitment.
				</p>

				<div className="mx-auto max-w-2xl">
					<div className="overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-content shadow-2xl md:p-12">

						<p className="mb-8 text-primary-content/80 leading-relaxed">
							In 30 minutes, we&apos;ll learn about your business and hand you a Website Analysis Report — a real breakdown of where you stand and where AI could take you. Worst case, you walk away with free insight your competitors are paying for.
						</p>

						{status === "success" ? (
							<div ref={successRef} className="rounded-2xl bg-neutral/20 p-8 text-center">
								<p className="text-2xl font-semibold mb-2">
									Message sent!
								</p>
								<p className="text-primary-content/80">{successMessage}</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-4">
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
