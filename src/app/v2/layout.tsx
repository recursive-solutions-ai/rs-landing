import type { ReactNode } from "react"
import { LenisProvider } from "@/components/scroll-landing/LenisProvider"
import { FloatingNav } from "@/components/scroll-landing/FloatingNav"

export default function ScrollLandingLayout({ children }: { children: ReactNode }) {
	return (
		<LenisProvider>
			<FloatingNav />
			<main>{children}</main>
		</LenisProvider>
	)
}
