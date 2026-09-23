import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		// Mirror the `@/*` -> `src/*` alias from tsconfig so modules importing it
		// (e.g. `@/lib/i18n-utils` -> `@/i18n/config`) resolve under vitest too.
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	test: {
		server: {
			// Bundle the SDK so its Next.js extensionless imports resolve in tests.
			deps: { inline: ['@growth-engine/sdk-client'] },
		},
	},
})
