/**
 * Public layout — shared layout for blog, contact, legal pages.
 * Includes a fixed navbar with scroll effect and dark minimal footer.
 */

import type { ReactNode } from "react"
import { TextLink } from "@/components/ui"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { ThemeLogo } from "@/components/layout/ThemeLogo"
import { Navbar } from "@/components/landing/Navbar"

export default function PublicLayout({ children }: { children: ReactNode }) {
	const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Recursive Solutions"

	return (
		<div className="min-h-screen flex flex-col bg-base-100">
			<Navbar />

			{/* Content — add top padding for fixed navbar */}
			<main className="flex-1 pt-16">{children}</main>

			{/* Footer */}
			<footer className="mt-20 border-t border-base-300 bg-base-200">
				<div className="max-w-7xl mx-auto px-6 py-16">
					<div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
						{/* Brand */}
						<div>
							<div className="mb-3">
								<ThemeLogo height={28} />
							</div>
							<p className="text-sm text-base-content/40 max-w-xs">
								AI systems for modern businesses. We consult, design, and implement.
							</p>
						</div>

						{/* Links */}
						<div className="flex flex-wrap gap-x-8 gap-y-3">
							<TextLink href="/#services" variant="hover" className="text-base-content/60 hover:text-base-content transition">Services</TextLink>
							<TextLink href="/#process" variant="hover" className="text-base-content/60 hover:text-base-content transition">Process</TextLink>
							<TextLink href="/#work" variant="hover" className="text-base-content/60 hover:text-base-content transition">Work</TextLink>
							<TextLink href="/contact" variant="hover" className="text-base-content/60 hover:text-base-content transition">Contact</TextLink>
							<TextLink href="/privacy" variant="hover" className="text-base-content/60 hover:text-base-content transition">Privacy</TextLink>
							<TextLink href="/terms" variant="hover" className="text-base-content/60 hover:text-base-content transition">Terms</TextLink>
						</div>
					</div>

					{/* Bottom bar */}
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-base-300">
						<p className="text-sm text-base-content/30">
							&copy; {new Date().getFullYear()} {appName}. All rights reserved.
						</p>
						<ThemeToggle />
					</div>
				</div>
			</footer>
		</div>
	)
}
