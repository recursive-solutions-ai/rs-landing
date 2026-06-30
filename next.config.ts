import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Allow the cloudflared demo tunnel to load dev resources (HMR/chunks).
	// Dev-only; has no effect on production builds.
	allowedDevOrigins: ['*.trycloudflare.com'],
	serverExternalPackages: [
		'@growth-engine/sdk-server',
		'@libsql/client',
		'libsql',
		'drizzle-orm',
	],
	// Tree-shake large icon/animation packages to their used exports only.
	experimental: {
		optimizePackageImports: [
			'@fortawesome/react-fontawesome',
			'@fortawesome/free-solid-svg-icons',
			'gsap',
		],
	},
	// Serve modern image formats via the next/image optimizer.
	images: {
		formats: ['image/avif', 'image/webp'],
	},
}

export default nextConfig
