import Link from 'next/link'
import { NavRibbon } from '@/components/roi/shared'

export const metadata = {
  title: 'AI ROI Calculator · Pick a concept | Recursive Solutions',
}

const CONCEPTS = [
  {
    href: '/roi-calculator/hybrid',
    badge: 'Recommended',
    badgeClass: 'badge-primary',
    title: 'A + D Hybrid',
    subtitle: 'Audience wizard + stack builder',
    pitch: 'Pick the audience, guided inputs, live-stacked business case. Ties to lead capture.',
    pros: ['Differentiated', 'Matches doc thesis', 'Highest perceived value'],
    cons: ['More UX surface to maintain'],
    emoji: '🎯',
  },
  {
    href: '/roi-calculator/wizard',
    badge: 'Concept A',
    badgeClass: 'badge-secondary',
    title: 'Audience Wizard',
    subtitle: 'Persona-driven, the number changes by room',
    pitch: 'User picks who they are pitching. We pick the right ROI lenses. Sharp copy per audience.',
    pros: ['Memorable', 'Strong persona framing', 'Quick to fill out'],
    cons: ['Less flexible than stacker'],
    emoji: '🧭',
  },
  {
    href: '/roi-calculator/single',
    badge: 'Concept B',
    badgeClass: 'badge-accent',
    title: 'Single Big Number',
    subtitle: 'Linear funnel, one giant ROI figure',
    pitch: 'All inputs on one page, hero number on top, multiplier badge. Classic high-conversion calculator.',
    pros: ['Familiar pattern', 'Instant payoff', 'Easy to share screenshot'],
    cons: ['No persona nuance', 'Generic feel'],
    emoji: '💯',
  },
  {
    href: '/roi-calculator/delay',
    badge: 'Concept C',
    badgeClass: 'badge-error',
    title: 'Cost of Delay',
    subtitle: 'Live ticker burning money every second',
    pitch: 'Aggressive. Reframes from "prove ROI" to "calculate the cost of doing nothing." Board-deck framing.',
    pros: ['Urgency machine', 'Memorable visual', 'Cuts through skepticism'],
    cons: ['Risk: feels like fearmongering', 'Less defensible numbers'],
    emoji: '🔥',
  },
  {
    href: '/roi-calculator/stack',
    badge: 'Concept D',
    badgeClass: 'badge-info',
    title: 'Stack Builder',
    subtitle: 'Toggle approaches, compound view, export',
    pitch: 'Internal advocate tool. Toggle which approaches apply, see math compound, print PDF for the meeting.',
    pros: ['Pro-grade', 'Re-usable in client engagements', 'PDF export hook for lead gen'],
    cons: ['Overwhelm risk for first-time visitors'],
    emoji: '🧱',
  },
  {
    href: '/roi-calculator/benchmarks',
    badge: 'Concept E',
    badgeClass: 'badge-success',
    title: 'Industry Benchmarks',
    subtitle: 'Compare against companies like yours',
    pitch: 'Light on math, heavy on proof. Pick function + size, see real deployment stats. Trust-builder.',
    pros: ['Low friction', 'Credibility-first', 'Good top-of-funnel'],
    cons: ['Less personalized than others'],
    emoji: '📊',
  },
]

export default function Page() {
  return (
    <>
      <NavRibbon />
      <div className="min-h-screen bg-base-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="badge badge-outline mb-3">Internal preview</div>
            <h1 className="text-5xl font-bold mb-3">AI ROI Calculator · 6 concepts</h1>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Six takes on the same problem. Click through, pick a winner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CONCEPTS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="card bg-base-100 border-2 border-base-300 hover:border-primary hover:shadow-xl transition group"
              >
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-5xl group-hover:scale-110 transition-transform">{c.emoji}</div>
                    <span className={`badge ${c.badgeClass}`}>{c.badge}</span>
                  </div>
                  <h3 className="card-title">{c.title}</h3>
                  <p className="text-sm text-base-content/60 italic">{c.subtitle}</p>
                  <p className="text-sm mt-2">{c.pitch}</p>
                  <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                    <div>
                      <p className="font-bold text-success mb-1">Pros</p>
                      <ul className="space-y-1">
                        {c.pros.map((p) => <li key={p}>+ {p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-error mb-1">Cons</p>
                      <ul className="space-y-1">
                        {c.cons.map((p) => <li key={p}>− {p}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-3">
                    <span className="btn btn-primary btn-sm">Try it →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
