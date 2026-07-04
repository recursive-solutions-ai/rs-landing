import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getEnvStatus, checkEnv } from './env'

const REQUIRED = [
	'BRAIN_API_URL',
	'BRAIN_API_KEY',
	'TURSO_DATABASE_URL',
	'TURSO_AUTH_TOKEN',
]

function setAllRequired() {
	process.env.BRAIN_API_URL = 'http://localhost:3000'
	process.env.BRAIN_API_KEY = 'brain_test_abc'
	process.env.TURSO_DATABASE_URL = 'libsql://test.turso.io'
	process.env.TURSO_AUTH_TOKEN = 'token123'
}

describe('getEnvStatus', () => {
	const originalEnv = process.env

	beforeEach(() => {
		process.env = { ...originalEnv }
		for (const name of REQUIRED) delete process.env[name]
	})

	afterEach(() => {
		process.env = originalEnv
	})

	it('reports every required var missing when none are set', () => {
		expect(getEnvStatus().missing).toEqual(REQUIRED)
	})

	it('treats empty/whitespace values as missing', () => {
		setAllRequired()
		process.env.BRAIN_API_URL = '   '
		process.env.BRAIN_API_KEY = ''
		expect(getEnvStatus().missing).toEqual(['BRAIN_API_URL', 'BRAIN_API_KEY'])
	})

	it('reports nothing missing when all required vars are set', () => {
		setAllRequired()
		expect(getEnvStatus().missing).toEqual([])
	})

	it('reports only the specific missing var, not the whole group', () => {
		setAllRequired()
		delete process.env.BRAIN_API_KEY
		expect(getEnvStatus().missing).toEqual(['BRAIN_API_KEY'])
	})
})

describe('checkEnv', () => {
	const originalEnv = process.env

	beforeEach(() => {
		process.env = { ...originalEnv }
		for (const name of REQUIRED) delete process.env[name]
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
	})

	afterEach(() => {
		process.env = originalEnv
		vi.restoreAllMocks()
	})

	it('warns for each missing required var', () => {
		checkEnv()
		const warnings: string[] = vi.mocked(console.warn).mock.calls.map((c: unknown[]) => String(c[0]))
		for (const name of REQUIRED) {
			expect(warnings.some((w) => w.includes(name))).toBe(true)
		}
	})

	it('does not warn when all required vars are set', () => {
		setAllRequired()
		checkEnv()
		expect(console.warn).not.toHaveBeenCalled()
	})
})
