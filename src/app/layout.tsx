import type { Metadata } from 'next'
import { Source_Serif_4 } from 'next/font/google'

const display = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-serif',
  display: 'swap',
})

// Font Awesome configuration - prevent FOUC
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { GrowthEngineProvider } from '@growth-engine/sdk-client'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { SITE_URL } from '@/lib/sitemap-shared'
import './globals.css'

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
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
		<html lang="en" data-theme="rs" className={display.variable} suppressHydrationWarning>
			<head>
				{/* Without JS the IntersectionObserver never fires — force reveal
				    elements visible so content is never stuck hidden (SEO/no-JS). */}
				<noscript>
					<style>{`.reveal{opacity:1!important;transform:none!important}.reveal-clip{clip-path:none!important}`}</style>
				</noscript>
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
