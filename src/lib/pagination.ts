export type PaginationItem = number | 'ellipsis'

function range(from: number, to: number): number[] {
	return Array.from({ length: Math.max(to - from + 1, 0) }, (_, i) => from + i)
}

/**
 * Page numbers and 'ellipsis' markers for a pager.
 *
 * Always includes the first page, the last page and `current +- siblings`.
 * A gap of exactly one page shows that page instead of an ellipsis, and the
 * item count stays constant (2 * siblings + 5) whenever there are more pages
 * than that, so the buttons do not jump around while paging.
 */
export function paginationItems(current: number, total: number, siblings: number): PaginationItem[] {
	const pages = Math.max(Math.floor(total), 0)
	if (pages === 0) return []
	const s = Math.max(Math.floor(siblings), 0)
	const cur = Math.min(Math.max(Math.floor(current), 1), pages)

	if (pages <= 2 * s + 5) return range(1, pages)

	const left = Math.max(cur - s, 1)
	const right = Math.min(cur + s, pages)
	const showLeftDots = left > 3
	const showRightDots = right < pages - 2
	const edgeCount = 3 + 2 * s

	if (!showLeftDots && showRightDots) return [...range(1, edgeCount), 'ellipsis', pages]
	if (showLeftDots && !showRightDots) return [1, 'ellipsis', ...range(pages - edgeCount + 1, pages)]
	return [1, 'ellipsis', ...range(left, right), 'ellipsis', pages]
}
