"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useBusinessConfig } from "@growth-engine/sdk-client"
import { trackEvent } from "@/components/analytics/GoogleAnalytics"
import { localizedPath } from "@/lib/i18n-utils"
import type { FormDefinition } from "@/lib/forms-server"
import { ContactFormDark } from "./ContactFormDark"

const EMAIL = "team@recursive-solutions.com"

function KV({ title, data }: { title: string; data: Record<string, unknown> }) {
	return (
		<div className="mt-8">
			<h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{title}</h2>
			<dl className="mt-3 space-y-2 text-sm">
				{Object.entries(data).map(([k, v]) => (
					<div key={k} className="flex justify-between gap-6 border-b border-white/10 pb-2">
						<dt className="capitalize text-white/60">{k}</dt>
						<dd className="text-right text-white/90">{String(v)}</dd>
					</div>
				))}
			</dl>
		</div>
	)
}

export function ContactPageView({ form, locale }: { form: FormDefinition | null; locale: string }) {
	const { config } = useBusinessConfig()

	useEffect(() => {
		trackEvent("contact_view")
	}, [])

	return (
		<div className="lv2-root">
			<main className="bg-[#050816] px-5 py-20 text-white sm:px-8 md:py-28">
				<div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
					<div>
						<p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
							<span aria-hidden="true" className="size-1.5 rounded-full bg-sky-400" />
							Contact
						</p>
						<h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
							Talk to the team
						</h1>
						<p className="mt-5 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
							Tell us about your business. We&apos;ll read it and email you within one business day.
						</p>
						<a
							href={`mailto:${EMAIL}`}
							className="mt-8 inline-block text-lg font-medium text-sky-300 underline decoration-sky-300/40 underline-offset-4 hover:text-sky-200"
						>
							{EMAIL}
						</a>
						{config?.hours ? <KV title="Hours" data={config.hours as Record<string, unknown>} /> : null}
						{config?.contact ? <KV title="Details" data={config.contact as Record<string, unknown>} /> : null}
						<p className="mt-10 text-sm text-white/60">
							Prefer to start with your URL?{" "}
							<Link
								href={`${localizedPath("/", locale)}#final-capture`}
								className="text-sky-300 hover:text-sky-200"
							>
								Drop it here &rarr;
							</Link>
						</p>
					</div>

					<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
						{form ? (
							<ContactFormDark form={form} />
						) : (
							<div role="alert" className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-5 text-sm text-amber-100">
								<p className="font-semibold">The contact form is unavailable right now.</p>
								<p className="mt-2">
									Please email us directly at{" "}
									<a href={`mailto:${EMAIL}`} className="underline">
										{EMAIL}
									</a>
									.
								</p>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	)
}
