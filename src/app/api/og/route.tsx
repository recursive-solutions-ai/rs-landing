import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { SOCIAL_TAGLINE, socialImageTitle } from '@/lib/social-image'

export const runtime = 'nodejs'

// Local asset: image generation never depends on the site or an external image host.
const logo = readFile(path.join(process.cwd(), 'public/logo-horizontal-no-bg-with-text-dark.png'))

export async function GET(request: Request) {
	const title = socialImageTitle(new URL(request.url).searchParams.get('title') ?? '')
	const logoSrc = `data:image/png;base64,${(await logo).toString('base64')}`

	return new ImageResponse(
		<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#f6f3ee', color: '#232229', padding: '64px 76px', fontFamily: 'sans-serif' }}>
			<img src={logoSrc} alt="Recursive Solutions" width={377} height={72} />
			<div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', paddingTop: 20, paddingBottom: 20 }}>
				{title ? (
					<div style={{ fontSize: title.length > 105 ? 44 : title.length > 65 ? 52 : 64, fontWeight: 700, lineHeight: 1.12, letterSpacing: '-2px', overflowWrap: 'anywhere' }}>{title}</div>
				) : (
					<div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, fontWeight: 700, lineHeight: 1.12, letterSpacing: '-3px' }}>
						<span>Modern systems for</span>
						<span style={{ color: '#284b73' }}>growing businesses.</span>
					</div>
				)}
			</div>
			<div style={{ display: 'flex', borderTop: '1px solid #dcd6cc', paddingTop: 24, fontSize: 24, color: '#284b73' }}>
				{title ? SOCIAL_TAGLINE : 'recursive-solutions.com'}
			</div>
		</div>,
		{ width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' } },
	)
}
