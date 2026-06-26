import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '..')
const ANTIPATTERN = '@growth-engine/types'

function walk(dir: string): string[] {
	const files: string[] = []
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry)
		if (statSync(full).isDirectory()) {
			files.push(...walk(full))
		} else if (/\.(ts|tsx)$/.test(entry) && !entry.includes('.test.')) {
			files.push(full)
		}
	}
	return files
}

describe('no @growth-engine/types import', () => {
	it('imports shared Growth Engine types from the SDK packages only', () => {
		const offenders: string[] = []
		for (const file of walk(SRC)) {
			if (readFileSync(file, 'utf8').includes(ANTIPATTERN)) {
				offenders.push(file.slice(SRC.length + 1))
			}
		}
		expect(offenders).toEqual([])
	})
})
