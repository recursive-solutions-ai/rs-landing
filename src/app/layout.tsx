import type { Metadata } from 'next'

// Font Awesome configuration - prevent FOUC
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { GrowthEngineProvider } from '@growth-engine/sdk-client'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import './globals.css'

export const metadata: Metadata = {
	metadataBase: new URL('https://recursive-solutions.com'),
	title: 'Recursive Solutions',
	description: 'Recursive Solutions — Powered by Growth Engine',
	openGraph: {
		images: [{ url: '/social-card-2.png', width: 1200, height: 630 }],
	},
	twitter: {
		card: 'summary_large_image',
		images: ['/social-card-2.png'],
	},
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
			<head>
				<script dangerouslySetInnerHTML={{ __html: `
					(function() {
						var stored = localStorage.getItem('theme');
						var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
						document.documentElement.setAttribute('data-theme', theme);
					})();
				` }} />
			</head>
			<body className="min-h-screen flex flex-col">
				<GoogleAnalytics />
				<GrowthEngineProvider>
					{children}
				</GrowthEngineProvider>
			</body>
		</html>
	)
}
