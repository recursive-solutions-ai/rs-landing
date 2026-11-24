'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

/**
 * Fade/slide in once when scrolled into view.
 * Server-rendered state is fully visible; the hidden state is only applied
 * after mount (class `hlw-armed`), so no-JS and crawlers see everything.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'article'
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) return // already on screen: leave visible
    if (typeof IntersectionObserver === 'undefined') return
    el.classList.add('hlw-armed')
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('hlw-in')
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = delay ? ({ '--hlw-delay': `${delay}ms` } as CSSProperties) : undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any
  return (
    <T ref={ref} className={className} style={style}>
      {children}
    </T>
  )
}
