import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { checkEnv } from './env'

describe('checkEnv', () => {
	const originalEnv = process.env

	beforeEach(() => {
		process.env = { ...originalEnv }
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
	})

	afterEach(() => {
		process.env = originalEnv
		vi.restoreAllMocks()
	})

	it('warns when Brain API vars are missing', () => {
		delete process.env.BRAIN_API_URL
		delete process.env.BRAIN_API_KEY
		delete process.env.TURSO_DATABASE_URL
		delete process.env.TURSO_AUTH_TOKEN

		checkEnv()

		const warnings = vi.mocked(console.warn).mock.calls.map((c) => c[0])
		expect(warnings.some((w: string) => w.includes('BRAIN_API_URL'))).toBe(true)
		expect(warnings.some((w: string) => w.includes('BRAIN_API_KEY'))).toBe(true)
		expect(warnings.some((w: string) => w.includes('Forms and CRM'))).toBe(true)
	})

	it('warns when Turso vars are missing', () => {
		process.env.BRAIN_API_URL = 'http://localhost:3000'
		process.env.BRAIN_API_KEY = 'brain_test_abc'
		delete process.env.TURSO_DATABASE_URL
		delete process.env.TURSO_AUTH_TOKEN

		checkEnv()

		const warnings = vi.mocked(console.warn).mock.calls.map((c) => c[0])
		expect(warnings.some((w: string) => w.includes('TURSO_DATABASE_URL'))).toBe(true)
		expect(warnings.some((w: string) => w.includes('Blog system'))).toBe(true)
	})

	it('treats empty/whitespace values as missing', () => {
		process.env.BRAIN_API_URL = '   '
		process.env.BRAIN_API_KEY = ''
		delete process.env.TURSO_DATABASE_URL
		delete process.env.TURSO_AUTH_TOKEN

		checkEnv()

		const warnings = vi.mocked(console.warn).mock.calls.map((c) => c[0])
		expect(warnings.some((w: string) => w.includes('BRAIN_API_URL'))).toBe(true)
		expect(warnings.some((w: string) => w.includes('BRAIN_API_KEY'))).toBe(true)
	})

	it('shows no warnings when all required vars are set', () => {
		process.env.BRAIN_API_URL = 'http://localhost:3000'
		process.env.BRAIN_API_KEY = 'brain_test_abc'
		process.env.TURSO_DATABASE_URL = 'libsql://test.turso.io'
		process.env.TURSO_AUTH_TOKEN = 'token123'

		checkEnv()

		expect(console.warn).not.toHaveBeenCalled()
		const logs = vi.mocked(console.log).mock.calls.map((c) => c[0])
		expect(logs.some((l: string) => l.includes('All required environment variables are set'))).toBe(true)
	})

	it('defaults to English single-language mode', () => {
		delete process.env.DEFAULT_LANGUAGE
		delete process.env.ADDITIONAL_LANGUAGES

		checkEnv()

		const logs = vi.mocked(console.log).mock.calls.map((c) => c[0])
		expect(logs.some((l: string) => l.includes('Single-language mode (en)'))).toBe(true)
	})

	it('reports multi-language config when ADDITIONAL_LANGUAGES is set', () => {
		process.env.DEFAULT_LANGUAGE = 'en'
		process.env.ADDITIONAL_LANGUAGES = 'fr,es'

		checkEnv()

		const logs = vi.mocked(console.log).mock.calls.map((c) => c[0])
		expect(logs.some((l: string) => l.includes('additional: fr,es'))).toBe(true)
	})

	it('warns only for the specific missing var, not the whole group', () => {
		process.env.BRAIN_API_URL = 'http://localhost:3000'
		delete process.env.BRAIN_API_KEY
		process.env.TURSO_DATABASE_URL = 'libsql://test.turso.io'
		process.env.TURSO_AUTH_TOKEN = 'token123'

		checkEnv()

		const warnings = vi.mocked(console.warn).mock.calls.map((c) => c[0])
		expect(warnings).toHaveLength(1)
		expect(warnings[0]).toContain('BRAIN_API_KEY')
		expect(warnings[0]).not.toContain('BRAIN_API_URL')
	})
})
