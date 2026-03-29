import { GrowthEngineHandler } from '@growth-engine/sdk-server'

export const { GET, POST } = GrowthEngineHandler({
	brainApiKey: process.env.BRAIN_API_KEY,
	tursoUrl: process.env.TURSO_DATABASE_URL,
	tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
})
