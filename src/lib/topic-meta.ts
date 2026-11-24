import { t, type Dictionary } from '@/i18n'

export const META_TITLE_MIN = 10
export const META_TITLE_MAX = 60
export const META_DESCRIPTION_MIN = 50
export const META_DESCRIPTION_MAX = 160

const ELLIPSIS = '…'

function fits(value: string, min: number, max: number): boolean {
	return value.length >= min && value.length <= max
}

/** Cut `text` to at most `max` chars at a word boundary, ending with an ellipsis. */
export function cutAtWord(text: string, max: number): string {
	if (text.length <= max) return text
	if (max <= 1) return ELLIPSIS.slice(0, max)
	const room = max - 1
	const slice = text.slice(0, room + 1)
	const lastSpace = slice.lastIndexOf(' ')
	const base = lastSpace > 0 ? slice.slice(0, lastSpace) : text.slice(0, room)
	return `${base.trimEnd().replace(/[\s,;:.\-]+$/, '')}${ELLIPSIS}`
}

/**
 * Longest label (cut at a word boundary) for which `build(label)` fits `max`.
 * `build` must grow monotonically with the label length.
 */
function buildWithCutLabel(label: string, max: number, build: (label: string) => string): string {
	const overhead = build('').length
	const room = max - overhead
	return build(cutAtWord(label, Math.max(room, 1)))
}

/** Topic page <title>, always within 10-60 chars, from dictionary strings. */
export function topicMetaTitle(dict: Dictionary, label: string): string {
	const candidates = [
		t(dict, 'blog.topic.title', { topic: label }),
		t(dict, 'blog.topic.title.short', { topic: label }),
		label,
	]
	for (const c of candidates) {
		if (fits(c, META_TITLE_MIN, META_TITLE_MAX)) return c
	}
	const cut = cutAtWord(label, META_TITLE_MAX)
	if (cut.length >= META_TITLE_MIN) return cut
	return buildWithCutLabel(label, META_TITLE_MAX, (l) => t(dict, 'blog.topic.title.short', { topic: l }))
}

/** Topic page meta description, always within 50-160 chars, from dictionary strings. */
export function topicMetaDescription(dict: Dictionary, label: string, count: number): string {
	const vars = (topic: string) => ({ topic, count: String(count) })
	const candidates = [
		t(dict, 'blog.topic.description', vars(label)),
		t(dict, 'blog.topic.description.short', vars(label)),
		t(dict, 'blog.topic.subtitle', vars(label)),
	]
	for (const c of candidates) {
		if (fits(c, META_DESCRIPTION_MIN, META_DESCRIPTION_MAX)) return c
	}
	// Label too long for any template: keep the short description with a cut label.
	return buildWithCutLabel(label, META_DESCRIPTION_MAX, (l) =>
		t(dict, 'blog.topic.description.short', vars(l)),
	)
}
