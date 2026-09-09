/** Adapt the server SDK's database text to the client SDK's keyword array. */
export function normalizeBlogKeywords(value: unknown): string[] {
	if (typeof value === 'string') {
		const text = value.trim()
		if (!text) return []
		try {
			value = JSON.parse(text)
		} catch {
			value = text.split(',')
		}
	}
	if (typeof value === 'string') value = value.split(',')
	if (!Array.isArray(value)) return []
	return value
		.filter((keyword): keyword is string => typeof keyword === 'string')
		.map((keyword) => keyword.trim())
		.filter(Boolean)
}
