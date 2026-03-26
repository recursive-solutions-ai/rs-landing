"use client"

import { useRef, useState, type FormEvent } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { Input, Textarea } from "@/components/ui"

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

export function ContactCTASection() {
	const sectionRef = useRef<HTMLElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const prefersReduced = useReducedMotion()

	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle")
	const [errorMsg, setErrorMsg] = useState("")

	useGSAP(
		() => {
			if (!contentRef.current || prefersReduced) return

			const children = contentRef.current.children

			gsap.set(children, { y: 30, opacity: 0 })

			gsap.to(children, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
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
			className="mx-auto max-w-4xl px-6 py-24"
		>
			<div className="overflow-hidden rounded-[3rem] bg-primary p-12 text-primary-content shadow-2xl md:p-20">
				<div ref={contentRef}>
					<h2 className="mb-6 text-3xl font-bold md:text-5xl text-center">
						Let&apos;s talk about your project
					</h2>
					<p className="mx-auto mb-10 max-w-xl text-lg text-primary-content/80 md:text-xl text-center">
						Tell us what&apos;s slowing you down and we&apos;ll show
						you how to fix it.
					</p>

					{status === "success" ? (
						<div className="rounded-2xl bg-neutral/20 p-8 text-center">
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
							className="mx-auto max-w-lg space-y-4"
						>
							<Input
								name="name"
								placeholder="Your name"
								required
								className="bg-primary-content/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/50"
							/>
							<Input
								name="email"
								type="email"
								placeholder="you@company.com"
								required
								className="bg-primary-content/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/50"
							/>
							<Textarea
								name="message"
								placeholder="What's the biggest bottleneck slowing your team down?"
								rows={4}
								required
								className="bg-primary-content/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/50"
							/>

							{status === "error" && errorMsg && (
								<p className="text-sm text-error-content bg-error/80 rounded-lg px-4 py-2">
									{errorMsg}
								</p>
							)}

							<button
								type="submit"
								disabled={status === "loading"}
								className="btn btn-neutral w-full border-none py-4 text-lg font-bold text-neutral-content shadow-xl transition hover:bg-neutral/80 disabled:opacity-60"
							>
								{status === "loading" ? (
									<span className="loading loading-spinner loading-md" />
								) : (
									"Send Message"
								)}
							</button>
						</form>
					)}
				</div>
			</div>
		</section>
	)
}
