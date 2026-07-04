import Link from "next/link"
import { defaultLocale } from "@/i18n/config"

// Branded 404 — inherits Header/Footer from the [locale] layout, so a bad
// URL still looks like the site instead of Next's unstyled default.
export default function NotFound() {
	return (
		<div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
			<span className="text-sm font-semibold uppercase tracking-widest text-primary">
				404
			</span>
			<h1 className="font-display mt-4 text-3xl font-bold text-base-content sm:text-4xl">
				This page doesn&rsquo;t exist.
			</h1>
			<p className="mt-4 max-w-md text-lg text-base-content/60">
				The link may be outdated, or the page may have moved.
			</p>
			<Link href={`/${defaultLocale}`} className="btn btn-primary mt-8">
				Back to the homepage
			</Link>
		</div>
	)
}
