import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('robots', () => {
	const originalEnv = process.env

	beforeEach(() => {
		vi.resetModules()
		process.env = { ...originalEnv }
	})

	afterEach(() => {
		process.env = originalEnv
	})

	async function loadRobots() {
		const mod = await import('./robots')
		return mod.default
	}

	it('allows all crawlers on / and disallows /api/', async () => {
		const robots = await loadRobots()
		const result = robots()
		const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules
		expect(rules?.userAgent).toBe('*')
		expect(rules?.allow).toBe('/')
		expect(rules?.disallow).toContain('/api/')
	})

	it('includes sitemap URL', async () => {
		process.env.SITE_URL = 'https://example.com'
		delete process.env.VERCEL_PROJECT_PRODUCTION_URL
		const robots = await loadRobots()
		expect(robots().sitemap).toBe('https://example.com/sitemap.xml')
	})
})
