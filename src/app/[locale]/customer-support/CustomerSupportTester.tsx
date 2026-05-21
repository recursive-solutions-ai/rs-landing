'use client'

import { createElement, useState } from 'react'
import Script from 'next/script'

const EMBED_ID = 'dc2e0c04-a1e5-440e-a779-2b292fd87896'
const BASE = 'https://growth-stack.recursive-solutions.com'

type Tab = 'iframe' | 'web-component'

const TABS: { id: Tab; label: string; hint: string }[] = [
  { id: 'iframe', label: 'Iframe embed', hint: 'Full inline page embed' },
  { id: 'web-component', label: 'Web component', hint: 'Custom element <recursive-expert-chat>' },
]

export function CustomerSupportTester() {
  const [tab, setTab] = useState<Tab>('iframe')
  // Once the web-component tab is opened we keep the script + element mounted
  // so switching back and forth does not re-bootstrap the widget.
  const [wcRequested, setWcRequested] = useState(false)

  function selectTab(next: Tab) {
    setTab(next)
    if (next === 'web-component') setWcRequested(true)
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="badge badge-outline mb-3">Internal test page · not linked · noindex</div>
        <h1 className="text-4xl font-bold mb-2">Customer Support Agent · Embed Tester</h1>
        <p className="text-base-content/60 max-w-2xl mx-auto">
          Three integration methods for the same ticketing agent. Tabs switch between the
          iframe and the web component. The script-tag floating bubble loads on this whole
          page — look for the icon in the bottom-right corner.
        </p>
      </div>

      <div role="tablist" className="tabs tabs-boxed justify-center mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`tab ${tab === t.id ? 'tab-active' : ''}`}
            onClick={() => selectTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Iframe method */}
        <section className={tab === 'iframe' ? 'block' : 'hidden'}>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body p-3">
              <iframe
                src={`${BASE}/embed/${EMBED_ID}`}
                width="100%"
                height={600}
                frameBorder={0}
                className="rounded-lg w-full"
                title="Customer support agent (iframe)"
              />
            </div>
          </div>
          <p className="text-xs text-base-content/50 mt-2 text-center">
            Method 1 · <code>&lt;iframe src=&quot;{BASE}/embed/{EMBED_ID}&quot;&gt;</code>
          </p>
        </section>

        {/* Web component method */}
        <section className={tab === 'web-component' ? 'block' : 'hidden'}>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body p-3 min-h-[600px]">
              {wcRequested
                ? createElement('recursive-expert-chat', { 'embed-id': EMBED_ID })
                : null}
            </div>
          </div>
          <p className="text-xs text-base-content/50 mt-2 text-center">
            Method 2 · <code>&lt;recursive-expert-chat embed-id=&quot;{EMBED_ID}&quot;&gt;</code>
          </p>
        </section>
      </div>

      <div className="text-center mt-10 text-sm text-base-content/50">
        Method 3 (script-tag floating bubble) is always active on this page.
      </div>

      {/* Method 2 loader — loaded lazily on first web-component tab open */}
      {wcRequested && (
        <Script src={`${BASE}/embed/web-component.js`} strategy="afterInteractive" />
      )}

      {/* Method 3 — script-tag floating bubble, present for the whole page */}
      <Script
        src={`${BASE}/embed-loader.js?id=${EMBED_ID}`}
        strategy="afterInteractive"
      />
    </main>
  )
}
