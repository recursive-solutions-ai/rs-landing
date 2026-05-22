'use client'

import { createElement, useState } from 'react'
import Script from 'next/script'

const EMBED_ID = 'f38aa299-a15d-4e0d-b4d8-21fb96ada53b'
const BASE = 'https://growth-stack.recursive-solutions.com'

type Mode = 'iframe' | 'web-component'

const MODES: { id: Mode; label: string }[] = [
	{ id: 'iframe', label: 'Iframe' },
	{ id: 'web-component', label: 'Web component' },
]

export function TestBot() {
	// Default to the iframe. Once the web-component is opened we keep its script
	// + element mounted so toggling back and forth does not re-bootstrap it.
	const [mode, setMode] = useState<Mode>('iframe')
	const [wcRequested, setWcRequested] = useState(false)

	function select(next: Mode) {
		setMode(next)
		if (next === 'web-component') setWcRequested(true)
	}

	return (
		// Definite height = viewport minus the 4rem sticky navbar. A definite
		// height here is what lets the inner flex-1 + h-full chain resolve, so
		// the iframe actually fills the box (% heights collapse otherwise).
		// dvh tracks mobile browser chrome; min-h keeps it usable on short screens.
		<div className="h-[calc(100dvh-4rem)] min-h-[600px] flex flex-col px-4 py-4 gap-3">
			<div role="tablist" className="tabs tabs-boxed self-center">
				{MODES.map((m) => (
					<button
						key={m.id}
						role="tab"
						aria-selected={mode === m.id}
						className={`tab ${mode === m.id ? 'tab-active' : ''}`}
						onClick={() => select(m.id)}
					>
						{m.label}
					</button>
				))}
			</div>

			<div className="flex-1 min-h-0 card bg-base-100 border border-base-300 overflow-hidden">
				{/* Default: iframe embed */}
				<iframe
					src={`${BASE}/embed/${EMBED_ID}`}
					title="Test bot (iframe)"
					className={`w-full h-full border-0 ${mode === 'iframe' ? 'block' : 'hidden'}`}
				/>

				{/* Web component embed — mounted lazily on first switch */}
				<div className={`w-full h-full ${mode === 'web-component' ? 'block' : 'hidden'}`}>
					{wcRequested
						? createElement('recursive-expert-chat', {
								'embed-id': EMBED_ID,
								style: { display: 'block', width: '100%', height: '100%' },
							})
						: null}
				</div>
			</div>

			{/* Web-component loader — only after the user opens that tab */}
			{wcRequested && (
				<Script src={`${BASE}/embed/web-component.js`} strategy="afterInteractive" />
			)}
		</div>
	)
}
