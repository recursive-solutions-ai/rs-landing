'use client'

import { createElement } from 'react'
import Script from 'next/script'

const EMBED_ID = 'f38aa299-a15d-4e0d-b4d8-21fb96ada53b'
const SCRIPT_SRC = 'https://growth-stack.recursive-solutions.com/embed/web-component.js'

export function TestBot() {
	return (
		// h-full fills the flex-1 <main>, so the box claims all space between
		// the header and footer. min-h-0 lets the flex child shrink instead of
		// overflowing on short viewports.
		<div className="h-full flex flex-col px-4 py-4">
			<div className="flex-1 min-h-0 card bg-base-100 border border-base-300 overflow-hidden">
				{createElement('recursive-expert-chat', {
					'embed-id': EMBED_ID,
					style: { display: 'block', width: '100%', height: '100%' },
				})}
			</div>

			<Script src={SCRIPT_SRC} strategy="afterInteractive" />
		</div>
	)
}
