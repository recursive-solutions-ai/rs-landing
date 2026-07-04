import type { Metadata } from "next"
import type { ReactNode } from "react"

// Internal concept-exploration pages ("pick a winner") — keep every route in
// this segment out of search indexes until the calculator is productized.
export const metadata: Metadata = {
	robots: { index: false, follow: false },
}

export default function RoiCalculatorLayout({
	children,
}: {
	children: ReactNode
}) {
	return children
}
