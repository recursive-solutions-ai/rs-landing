import { describe, expect, it } from 'vitest'
import { parseLandingMarkdown, parseTitledItem } from './landing-page-content'

const FULL = `# AI Automation Services in San Diego

San Diego firms lose hours to manual work. We fix that.

## Your team is drowning in busywork

Paragraph one about the problem.

Paragraph two about the problem.

## What we build

- **Lucy**: The unified platform.
- **Custom automations**: Repetitive work, automated.
- **Bespoke tools and AI agents**: Built around your workflow.
- **Advisory and consulting**: A partner as you adopt AI.

## How it works

- **Map**: We find the friction.
- **Architect**: We design the fix.
- **Deploy**: We ship it.
- **Calibrate**: We keep improving it.

## Why San Diego firms pick a local partner

We know the market.

Second local paragraph.

## Frequently asked questions

### How much does it cost?

It depends on scope.

### How long does it take?

Weeks, not months.
`

describe('parseLandingMarkdown', () => {
	it('parses every contract section', () => {
		const p = parseLandingMarkdown(FULL)
		expect(p.headline).toBe('AI Automation Services in San Diego')
		expect(p.subheadline).toBe('San Diego firms lose hours to manual work. We fix that.')
		expect(p.problem?.heading).toBe('Your team is drowning in busywork')
		expect(p.problem?.blocks).toHaveLength(2)
		expect(p.services?.items.map((i) => i.title)).toEqual([
			'Lucy',
			'Custom automations',
			'Bespoke tools and AI agents',
			'Advisory and consulting',
		])
		expect(p.services?.items[0].text).toBe('The unified platform.')
		expect(p.process?.steps.map((s) => s.title)).toEqual(['Map', 'Architect', 'Deploy', 'Calibrate'])
		expect(p.local?.heading).toBe('Why San Diego firms pick a local partner')
		expect(p.local?.blocks).toHaveLength(2)
		expect(p.extras).toEqual([])
	})

	it('parses FAQ question/answer pairs', () => {
		const p = parseLandingMarkdown(FULL)
		expect(p.faq?.items).toEqual([
			{ question: 'How much does it cost?', answer: 'It depends on scope.' },
			{ question: 'How long does it take?', answer: 'Weeks, not months.' },
		])
	})

	it('keeps unexpected H2s as extras so nothing is lost', () => {
		const md = FULL.replace(
			'## Frequently asked questions',
			'## A surprise section\n\nSurprise copy.\n\n## Frequently asked questions',
		)
		const p = parseLandingMarkdown(md)
		expect(p.local?.heading).toBe('Why San Diego firms pick a local partner')
		expect(p.extras).toHaveLength(1)
		expect(p.extras[0]).toMatchObject({ heading: 'A surprise section', placement: 'after' })
		expect(p.extras[0].blocks).toEqual([{ type: 'p', text: 'Surprise copy.' }])
	})

	it('treats unknown H2s before the anchors as extras after the problem', () => {
		const md = FULL.replace('## What we build', '## Extra before\n\nHello.\n\n## What we build')
		const p = parseLandingMarkdown(md)
		expect(p.problem?.heading).toBe('Your team is drowning in busywork')
		expect(p.extras[0]).toMatchObject({ heading: 'Extra before', placement: 'before' })
	})

	it('handles missing sections', () => {
		const p = parseLandingMarkdown('# Only a headline\n\nOnly a lead.')
		expect(p.headline).toBe('Only a headline')
		expect(p.subheadline).toBe('Only a lead.')
		expect(p.problem).toBeNull()
		expect(p.services).toBeNull()
		expect(p.process).toBeNull()
		expect(p.local).toBeNull()
		expect(p.faq).toBeNull()
		expect(p.extras).toEqual([])
	})

	it('handles empty and headline-less input', () => {
		const p = parseLandingMarkdown('')
		expect(p.headline).toBeNull()
		expect(p.subheadline).toBeNull()
		const q = parseLandingMarkdown('## Why us\n\nBecause.')
		expect(q.headline).toBeNull()
		expect(q.problem?.heading).toBe('Why us')
	})

	it('without anchors, first unknown is problem and second is local', () => {
		const p = parseLandingMarkdown('# H\n\nSub.\n\n## One\n\na\n\n## Two\n\nb\n\n## Three\n\nc')
		expect(p.problem?.heading).toBe('One')
		expect(p.local?.heading).toBe('Two')
		expect(p.extras.map((e) => e.heading)).toEqual(['Three'])
	})

	it('does not treat headings inside code fences as sections', () => {
		const p = parseLandingMarkdown('# H\n\nSub.\n\n## One\n\n```\n## Not a heading\n```\n')
		expect(p.problem?.heading).toBe('One')
		expect(p.extras).toEqual([])
	})
})

describe('parseTitledItem', () => {
	it('supports colon inside or outside the bold', () => {
		expect(parseTitledItem('**Map**: Find it.')).toEqual({ title: 'Map', text: 'Find it.' })
		expect(parseTitledItem('**Map:** Find it.')).toEqual({ title: 'Map', text: 'Find it.' })
		expect(parseTitledItem('**Map** - Find it.')).toEqual({ title: 'Map', text: 'Find it.' })
		expect(parseTitledItem('Map: Find it.')).toEqual({ title: 'Map', text: 'Find it.' })
		expect(parseTitledItem('Just text')).toEqual({ title: 'Just text', text: '' })
	})
})
