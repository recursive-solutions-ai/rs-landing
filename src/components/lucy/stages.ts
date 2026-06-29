export interface LucyStage {
	/** Tab label shown to the user. */
	label: string
	/** Two-digit marker matching the LucyAnimation scene markers (01–05), aligned to the five pillars. */
	marker: string
	/** One-line caption shown under the showcase for this stage. */
	caption: string
}

export const LUCY_STAGES: LucyStage[] = [
	{ label: 'Be Found', marker: '01', caption: 'Engineered to rank in search and get cited by AI engines like ChatGPT and Perplexity.' },
	{ label: 'Content Engine', marker: '02', caption: 'One brand voice, fanned out to blog, social, and SEO — automatically.' },
	{ label: 'Lead Capture', marker: '03', caption: 'Forms feed your inbox; an auto-reply fires in seconds.' },
	{ label: 'Pipeline', marker: '04', caption: 'Every lead moves new → contacted → qualified → won, tracked end to end.' },
	{ label: 'Custom Experts', marker: '05', caption: 'Lucy hands work to named experts trained on your business.' },
]

/** Clamp an arbitrary index into the valid stage range [0, LUCY_STAGES.length - 1]. */
export function clampStageIndex(index: number): number {
	if (Number.isNaN(index)) return 0
	return Math.max(0, Math.min(index, LUCY_STAGES.length - 1))
}
