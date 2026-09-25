import { GrowthEngineHandler } from '@growth-engine/sdk-server'

export const { GET, POST } = GrowthEngineHandler({
	brainApiUrl: process.env.BRAIN_API_URL!,
	brainApiKey: process.env.BRAIN_API_KEY!,
	tursoUrl: process.env.TURSO_DATABASE_URL!,
	tursoAuthToken: process.env.TURSO_AUTH_TOKEN!,
	// The post page renders <RelatedArticles> + <TopicChips> and
	// /blog/topic/[slug] exists, so Brain's orphan check may count those
	// structural links. Set back to false if any of the three is removed —
	// leaving it true would report a blog of orphans as healthy.
	structuralLinks: true,
})
