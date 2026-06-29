export function stripLeadingArticleHeading(content: string): string {
	return content
		.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, '')
		.replace(/^\s*#\s+.+(?:\r?\n|$)+/, '')
		.trim()
}

export function blogDescription({
	seoDesc,
	content,
}: {
	seoDesc?: string | null
	content: string
}): string {
	const explicitDescription = seoDesc?.trim()
	if (explicitDescription) return explicitDescription

	return truncateDescription(toPlainText(stripLeadingArticleHeading(content)))
}

function truncateDescription(text: string): string {
	if (text.length <= 160) return text
	return `${text.slice(0, 157).trimEnd()}...`
}

function toPlainText(content: string): string {
	return content
		.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
		.replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[`*_~>#-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}
