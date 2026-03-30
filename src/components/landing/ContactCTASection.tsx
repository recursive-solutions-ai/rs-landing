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

export function ContactCTASection() {
	const sectionRef = useRef<HTMLElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	const successRef = useRef<HTMLDivElement>(null)
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle")
	const [errorMsg, setErrorMsg] = useState("")

	// Animate success message entrance
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

		const form = e.currentTarget
		const data = new FormData(form)
		const name = data.get("name") as string
		const email = data.get("email") as string
		const message = data.get("message") as string

		if (!name || !email || !message) {
			setStatus("error")
			setErrorMsg("Please fill in all fields.")
			return
		}

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, message }),
			})

			if (!res.ok) {
				const body = await res.json().catch(() => null)
				throw new Error(body?.error || "Something went wrong.")
			}

			setStatus("success")
			form.reset()
		} catch (err) {
			setStatus("error")
			setErrorMsg(
				err instanceof Error ? err.message : "Something went wrong."
			)
		}
	}

	return (
		<section
			ref={sectionRef}
			id="contact"
			className="mx-auto max-w-6xl px-6 py-24"
		>
			<div ref={contentRef}>
				<h2 className="mb-4 text-3xl font-bold md:text-5xl text-center text-base-content">
					Let&apos;s Find Out What AI Can Do for Your Business
				</h2>
				<p className="mx-auto mb-12 max-w-xl text-lg text-base-content/60 md:text-xl text-center">
					Book a free 30-minute call — no pitch, no commitment.
				</p>

				<div className="mx-auto max-w-2xl">
					<div className="overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-content shadow-2xl md:p-12">
						<h3 className="mb-3 text-2xl font-bold">
							Book a Discovery Meeting
						</h3>
						<p className="mb-8 text-primary-content/80 leading-relaxed">
							In 30 minutes, we&apos;ll learn about your business and hand you a Website Analysis Report — a real breakdown of where you stand and where AI could take you. Worst case, you walk away with free insight your competitors are paying for.
						</p>

						{status === "success" ? (
							<div ref={successRef} className="rounded-2xl bg-neutral/20 p-8 text-center">
								<p className="text-2xl font-semibold mb-2">
									Message sent!
								</p>
								<p className="text-primary-content/80">
									We&apos;ll get back to you shortly.
								</p>
							</div>
						) : (
							<form
								onSubmit={handleSubmit}
								className="space-y-4"
							>
								<div>
									<label htmlFor="contact-name" className="sr-only">Your name</label>
									<Input
										id="contact-name"
										name="name"
										placeholder="Your name"
										required
										aria-required="true"
										className="bg-primary-content/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/50 transition-all duration-200 focus:ring-2 focus:ring-primary-content/30"
									/>
								</div>
								<div>
									<label htmlFor="contact-email" className="sr-only">Email address</label>
									<Input
										id="contact-email"
										name="email"
										type="email"
										placeholder="you@company.com"
										required
										aria-required="true"
										className="bg-primary-content/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/50 transition-all duration-200 focus:ring-2 focus:ring-primary-content/30"
									/>
								</div>
								<div>
									<label htmlFor="contact-message" className="sr-only">What&apos;s the biggest bottleneck slowing your team down?</label>
									<Textarea
										id="contact-message"
										name="message"
										placeholder="(Optional) What's the biggest bottleneck slowing your team down?"
										rows={3}
										required
										aria-required="true"
										className="bg-primary-content/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/50 transition-all duration-200 focus:ring-2 focus:ring-primary-content/30"
									/>
								</div>

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
										"Book My Free Discovery Meeting"
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
