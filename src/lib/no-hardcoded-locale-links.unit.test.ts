import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '..')
const SCAN_DIRS = [join(SRC, 'app'), join(SRC, 'components')]
const ANTIPATTERN = '/${locale}'

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

describe('no hand-written locale-prefixed links', () => {
	it('keeps page and component links on localizedPath()', () => {
		const offenders: string[] = []
		for (const dir of SCAN_DIRS) {
			for (const file of walk(dir)) {
				if (readFileSync(file, 'utf8').includes(ANTIPATTERN)) {
					offenders.push(file.slice(SRC.length + 1))
				}
			}
		}
		expect(
			offenders,
			`Use localizedPath(path, locale) instead of hand-written locale-prefixed links in: ${offenders.join(', ')}`,
		).toEqual([])
	})
})
