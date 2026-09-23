import { describe, expect, it } from 'vitest'
import { socialImageMetadata, socialImageTitle } from './social-image'

describe('social previews', () => {
	it('gives Open Graph and Twitter the same personalized image', () => {
		const metadata = socialImageMetadata('Lucy — the unified growth platform | Recursive Solutions')
		const og = metadata.openGraph as { images: { url: string; width: number; height: number }[] }
		const twitter = metadata.twitter as { images: string[] }
		expect(twitter.images).toEqual([og.images[0].url])
		expect(new URL(og.images[0].url, 'https://example.com').searchParams.get('title')).toBe('Lucy — the unified growth platform')
		expect(og.images[0]).toMatchObject({ width: 1200, height: 630 })
	})
	it('keeps punctuation and non-English titles intact', () => {
		const title = 'L’équipe & l’IA : quoi de neuf ?'
		const metadata = socialImageMetadata(title)
		const og = metadata.openGraph as { images: { url: string }[] }
		expect(new URL(og.images[0].url, 'https://example.com').searchParams.get('title')).toBe(title)
	})
	it('uses the tagline for the homepage and bounds long titles', () => {
		expect(socialImageTitle()).toBe('')
		expect(socialImageTitle('Recursive Solutions')).toBe('')
		expect(socialImageTitle('A'.repeat(300))).toHaveLength(160)
	})
})
