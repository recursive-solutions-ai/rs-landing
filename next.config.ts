import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
