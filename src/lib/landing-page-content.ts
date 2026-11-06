/**
 * Markdown -> sections parser for Lucy-hosted local SEO landing pages.
 *
 * Lucy's content follows a fixed contract (see parseLandingMarkdown). We parse
 * by heading so the template can give each section its own designed layout.
 * Anything that does not fit the contract is kept as a generic text section so
 * no copy is ever dropped.
 */

export type TextBlock =
	| { type: 'p'; text: string }
	| { type: 'ul'; items: string[] }
	| { type: 'h3'; text: string }

export interface TextSection {
	heading: string
	blocks: TextBlock[]
}

export interface TitledItem {
	title: string
	text: string
}

export interface FaqPair {
	question: string
	answer: string
}

export interface ExtraSection extends TextSection {
	/** Where the template should render it relative to the contract sections. */
	placement: 'before' | 'after'
}

export interface ParsedLandingContent {
	headline: string | null
	subheadline: string | null
	problem: TextSection | null
	services: { heading: string; items: TitledItem[]; intro: TextBlock[] } | null
	process: { heading: string; steps: TitledItem[]; intro: TextBlock[] } | null
	local: TextSection | null
	faq: { heading: string; items: FaqPair[] } | null
	extras: ExtraSection[]
}

type Kind = 'services' | 'process' | 'faq' | 'unknown'

interface RawSection {
	heading: string
	lines: string[]
}

function classify(heading: string): Kind {
	const h = heading.toLowerCase()
	if (/^what we (build|do|offer|deliver)\b/.test(h)) return 'services'
	if (/^how (it|this) works\b/.test(h) || /^our process\b/.test(h)) return 'process'
	if (/^(frequently asked questions|faqs?|common questions)\b/.test(h)) return 'faq'
	return 'unknown'
}

/** Split markdown into the H1, the lines before the first H2, and H2 sections. */
function splitSections(markdown: string): {
	h1: string | null
	lead: string[]
	sections: RawSection[]
} {
	const lines = markdown.replace(/\r\n?/g, '\n').split('\n')
	let h1: string | null = null
	const lead: string[] = []
	const sections: RawSection[] = []
	let current: RawSection | null = null
	let inFence = false

	for (const line of lines) {
		if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
		if (!inFence) {
			const m1 = /^#\s+(.+?)\s*#*\s*$/.exec(line)
			if (m1 && h1 === null && !current) {
				h1 = m1[1].trim()
				continue
			}
			const m2 = /^##\s+(.+?)\s*#*\s*$/.exec(line)
			if (m2) {
				current = { heading: m2[1].trim(), lines: [] }
				sections.push(current)
				continue
			}
		}
		if (current) current.lines.push(line)
		else lead.push(line)
	}
	return { h1, lead, sections }
}

/** Turn lines into paragraph / bullet-list / H3 blocks. */
export function toBlocks(lines: string[]): TextBlock[] {
	const blocks: TextBlock[] = []
	let para: string[] = []
	let list: string[] | null = null

	const flushPara = () => {
		if (para.length) blocks.push({ type: 'p', text: para.join(' ').trim() })
		para = []
	}
	const flushList = () => {
		if (list && list.length) blocks.push({ type: 'ul', items: list })
		list = null
	}

	for (const raw of lines) {
		const line = raw.trim()
		if (!line) {
			flushPara()
			flushList()
			continue
		}
		const h3 = /^#{3,6}\s+(.+?)\s*#*\s*$/.exec(line)
		if (h3) {
			flushPara()
			flushList()
			blocks.push({ type: 'h3', text: h3[1].trim() })
			continue
		}
		const li = /^(?:[-*+]|\d+[.)])\s+(.*)$/.exec(line)
		if (li) {
			flushPara()
			if (!list) list = []
			list.push(li[1].trim())
			continue
		}
		// Continuation of a bullet that wrapped onto the next line.
		if (list && list.length && /^\s/.test(raw)) {
			list[list.length - 1] += ` ${line}`
			continue
		}
		flushList()
		para.push(line)
	}
	flushPara()
	flushList()
	return blocks
}

/** "**Title**: text", "**Title:** text", "**Title** - text", or plain "Title: text". */
export function parseTitledItem(item: string): TitledItem {
	const bold = /^\*\*(.+?)\*\*\s*(.*)$/.exec(item) ?? /^__(.+?)__\s*(.*)$/.exec(item)
	if (bold) {
		const title = bold[1].replace(/[:\s]+$/, '').trim()
		const text = bold[2].replace(/^[:\-\u2013\u2014]\s*/, '').trim()
		return { title, text }
	}
	const colon = /^([^:]{1,60}):\s+(.*)$/.exec(item)
	if (colon) return { title: colon[1].trim(), text: colon[2].trim() }
	return { title: item.trim(), text: '' }
}

function titledItems(blocks: TextBlock[]): { items: TitledItem[]; rest: TextBlock[] } {
	const items: TitledItem[] = []
	const rest: TextBlock[] = []
	for (const block of blocks) {
		if (block.type === 'ul') items.push(...block.items.map(parseTitledItem))
		else rest.push(block)
	}
	return { items, rest }
}

/** "### question" followed by answer paragraphs. Bullets inside answers stay as text. */
function parseFaq(blocks: TextBlock[]): FaqPair[] {
	const pairs: FaqPair[] = []
	let current: { question: string; parts: string[] } | null = null
	for (const block of blocks) {
		if (block.type === 'h3') {
			if (current) pairs.push({ question: current.question, answer: current.parts.join('\n\n').trim() })
			current = { question: block.text, parts: [] }
		} else if (current) {
			current.parts.push(block.type === 'p' ? block.text : block.items.map((i) => `- ${i}`).join('\n'))
		}
	}
	if (current) pairs.push({ question: current.question, answer: current.parts.join('\n\n').trim() })
	return pairs.filter((p) => p.question && p.answer)
}

/**
 * Contract:
 *   # H1                      -> hero headline; first paragraph -> subheadline
 *   ## <problem heading>      -> problem section
 *   ## What we build          -> 4 bullets "- **Title**: text"
 *   ## How it works           -> 4 bullets Map / Architect / Deploy / Calibrate
 *   ## <local heading>        -> local section
 *   ## Frequently asked ...   -> "### question" + answer pairs
 *
 * Unrecognised H2s before the "What we build" / "How it works" sections fill the
 * problem slot first; after them, the local slot first. Any further H2 becomes an
 * extra generic text section. With neither anchor present, the first unknown is
 * the problem and the second the local section.
 */
export function parseLandingMarkdown(markdown: string): ParsedLandingContent {
	const { h1, lead, sections } = splitSections(markdown ?? '')

	// Subheadline: first paragraph after the H1 (before any H2); else null.
	const leadBlocks = toBlocks(lead)
	const firstPara = leadBlocks.find((b): b is Extract<TextBlock, { type: 'p' }> => b.type === 'p')

	const result: ParsedLandingContent = {
		headline: h1,
		subheadline: firstPara ? firstPara.text : null,
		problem: null,
		services: null,
		process: null,
		local: null,
		faq: null,
		extras: [],
	}

	const hasAnchor = sections.some((s) => {
		const k = classify(s.heading)
		return k === 'services' || k === 'process'
	})
	let passedAnchor = false

	for (const section of sections) {
		const kind = classify(section.heading)
		const blocks = toBlocks(section.lines)

		if (kind === 'services' && !result.services) {
			const { items, rest } = titledItems(blocks)
			result.services = { heading: section.heading, items, intro: rest }
			passedAnchor = true
		} else if (kind === 'process' && !result.process) {
			const { items, rest } = titledItems(blocks)
			result.process = { heading: section.heading, steps: items, intro: rest }
			passedAnchor = true
		} else if (kind === 'faq' && !result.faq) {
			result.faq = { heading: section.heading, items: parseFaq(blocks) }
		} else {
			const text: TextSection = { heading: section.heading, blocks }
			if (hasAnchor) {
				if (!passedAnchor && !result.problem) result.problem = text
				else if (passedAnchor && !result.local) result.local = text
				else result.extras.push({ ...text, placement: passedAnchor ? 'after' : 'before' })
			} else if (!result.problem) result.problem = text
			else if (!result.local) result.local = text
			else result.extras.push({ ...text, placement: 'after' })
		}
	}
	return result
}

/** Strip inline markdown for places that need plain text (cards, headings, JSON-LD). */
export function plainText(text: string): string {
	return text
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/(\*\*|__|`)/g, '')
		.replace(/\*([^*]+)\*/g, '$1')
}
