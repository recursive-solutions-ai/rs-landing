import { describe, expect, it } from 'vitest'
import {
	blogDescription,
	stripLeadingArticleHeading,
} from './blog-content'

describe('blog content SEO helpers', () => {
	it('uses an explicit SEO description when one exists', () => {
		expect(
			blogDescription({
				seoDesc: 'A specific search result summary.',
				content: '# Ignored heading\n\nIgnored body copy.',
			}),
		).toBe('A specific search result summary.')
	})

	it('falls back to clean body copy when a post has no SEO description', () => {
		expect(
			blogDescription({
				seoDesc: null,
				content:
					'# Hello World\n\n<p>AI operators can remove handoff delays for service teams.</p>',
			}),
		).toBe('AI operators can remove handoff delays for service teams.')
	})

	it('removes a leading markdown article heading from rendered body content', () => {
		expect(
			stripLeadingArticleHeading(
				'# Stop Delegating to the Void\n\nTasks disappear when ownership is implicit.',
			),
		).toBe('Tasks disappear when ownership is implicit.')
	})

	it('removes a leading HTML article heading from rendered body content', () => {
		expect(
			stripLeadingArticleHeading(
				'<h1>Stop Delegating to the Void</h1><p>Tasks disappear when ownership is implicit.</p>',
			),
		).toBe('<p>Tasks disappear when ownership is implicit.</p>')
	})
})
