/**
 * Public layout — shared layout for blog, contact, legal pages.
 * Includes a fixed navbar with scroll effect and dark minimal footer.
 */

import type { ReactNode } from "react"
import { TextLink } from "@/components/ui"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Navbar } from "@/components/landing/Navbar"

export default function PublicLayout({ children }: { children: ReactNode }) {
	const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Recursive Solutions"

	return (
		<div className="min-h-screen flex flex-col bg-base-100">
			<Navbar />

			{/* Content — add top padding for fixed navbar */}
			<main className="flex-1 pt-16">{children}</main>

			{/* Footer — dark minimal */}
			<footer className="section-dark mt-20">
				<div className="max-w-7xl mx-auto px-6 py-16">
					<div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
						{/* Brand */}
						<div>
							<div className="flex items-center gap-2 mb-3">
								<svg width="28" height="28" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M25 25C25 38.8 36.2 50 50 50C63.8 50 75 38.8 75 25C75 11.2 63.8 0 50 0C36.2 0 25 11.2 25 25ZM0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0C11.2 0 0 11.2 0 25Z" stroke="white" strokeWidth="12" />
								</svg>
								<span className="text-lg font-extrabold tracking-tighter uppercase text-white">
									Recursive
								</span>
							</div>
							<p className="text-sm text-white/40 max-w-xs">
								AI systems for modern businesses. We consult, design, and implement.
							</p>
						</div>

						{/* Links */}
						<div className="flex flex-wrap gap-x-8 gap-y-3">
							<TextLink href="/#services" variant="hover" className="text-white/60 hover:text-white transition">Services</TextLink>
							<TextLink href="/#process" variant="hover" className="text-white/60 hover:text-white transition">Process</TextLink>
							<TextLink href="/#work" variant="hover" className="text-white/60 hover:text-white transition">Work</TextLink>
							<TextLink href="/contact" variant="hover" className="text-white/60 hover:text-white transition">Contact</TextLink>
							<TextLink href="/privacy" variant="hover" className="text-white/60 hover:text-white transition">Privacy</TextLink>
							<TextLink href="/terms" variant="hover" className="text-white/60 hover:text-white transition">Terms</TextLink>
						</div>
					</div>

					{/* Bottom bar */}
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
						<p className="text-sm text-white/30">
							&copy; {new Date().getFullYear()} {appName}. All rights reserved.
						</p>
						<ThemeToggle />
					</div>
				</div>
			</footer>
		</div>
	)
}
