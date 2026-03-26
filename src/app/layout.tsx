import type { Metadata } from 'next'
import { GrowthEngineProvider } from '@growth-engine/sdk-client'

// Font Awesome configuration - prevent FOUC
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import './globals.css'

export const metadata: Metadata = {
	title: 'Recursive Solutions',
	description: 'Recursive Solutions — Powered by Growth Engine',
	icons: {
		icon: [
			{ url: '/favicon_io/favicon.ico', sizes: 'any' },
			{ url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
		],
		apple: '/favicon_io/apple-touch-icon.png',
	},
	manifest: '/favicon_io/site.webmanifest',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" data-theme="light">
			<body className="min-h-screen flex flex-col">
				<GrowthEngineProvider>
					{children}
				</GrowthEngineProvider>
			</body>
		</html>
	)
}
