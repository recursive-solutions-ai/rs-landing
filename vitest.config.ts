import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		server: {
			// Bundle the SDK so its Next.js extensionless imports resolve in tests.
			deps: { inline: ['@growth-engine/sdk-client'] },
		},
	},
})
