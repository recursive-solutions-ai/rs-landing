import Link from "next/link"
import { defaultLocale } from "@/i18n/config"

// Root-level 404 — reached only for paths that never resolve a locale
// (e.g. an unknown first segment containing a dot). No Header/Footer here;
// the [locale] not-found covers the fully-chromed case.
export default function RootNotFound() {
	return (
		<div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
			<span className="text-sm font-semibold uppercase tracking-widest text-primary">
				404
			</span>
			<h1 className="font-display mt-4 text-3xl font-bold text-base-content sm:text-4xl">
				This page doesn&rsquo;t exist.
			</h1>
			<Link href={`/${defaultLocale}`} className="btn btn-primary mt-8">
				Back to the homepage
			</Link>
		</div>
	)
}
