/**
 * Public layout — shared layout for blog, contact, legal pages.
 * Includes a simple navbar and footer.
 */

import type { ReactNode } from "react"
import { ButtonLink, TextLink } from "@/components/ui"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export default function PublicLayout({ children }: { children: ReactNode }) {
	const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "SaaS Starter"

	return (
		<div className="min-h-screen flex flex-col hero-gradient">
			{/* Navbar */}
			<nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto w-full">
				<div className="flex items-center space-x-3">
					<ButtonLink href="/" variant="ghost" className="hover:bg-transparent p-0 text-primary">
						<svg width="36" height="36" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M25 25C25 38.8 36.2 50 50 50C63.8 50 75 38.8 75 25C75 11.2 63.8 0 50 0C36.2 0 25 11.2 25 25ZM0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0C11.2 0 0 11.2 0 25Z" stroke="currentColor" strokeWidth="12" />
						</svg>
						<span className="text-xl font-extrabold tracking-tighter uppercase text-base-content ml-3">Recursive</span>
					</ButtonLink>
				</div>
				<div className="flex items-center space-x-8">
					{/* <ButtonLink href="/#about" variant="ghost" className="hidden md:block text-sm font-semibold text-base-content/70 hover:text-primary transition bg-transparent border-none">Our Philosophy</ButtonLink> */}
					<ButtonLink href="/#contact" className="btn btn-primary px-6 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 border-none">Get an Audit</ButtonLink>
				</div>
			</nav>

			{/* Content */}
			<main className="flex-1">{children}</main>

			{/* Footer */}
			<footer className="footer footer-center bg-base-300 text-base-content p-10 mt-12">
				<ThemeToggle />
				<nav className="flex flex-wrap gap-4 justify-center">
					<TextLink href="/legal" variant="hover">
						Legal
					</TextLink>
					<TextLink href="/privacy" variant="hover">
						Privacy Policy
					</TextLink>
					<TextLink href="/terms" variant="hover">
						Terms of Service
					</TextLink>
					<TextLink href="/cookies" variant="hover">
						Cookie Policy
					</TextLink>
					<TextLink href="/contact" variant="hover">
						Contact
					</TextLink>
				</nav>
				<aside>
					<p>
						&copy; {new Date().getFullYear()} {appName}. All rights reserved.
					</p>
				</aside>
			</footer>
		</div>
	)
}
