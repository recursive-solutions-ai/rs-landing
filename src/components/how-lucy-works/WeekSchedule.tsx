import type { CSSProperties } from 'react'
import { districts, everyDay, week, type WeekEvent } from './content'
import { ACCENT } from './accents'
import Reveal from './Reveal'

const nameOf = (id: string) => districts.find(d => d.id === id)?.building ?? ''

function Event({ e }: { e: WeekEvent }) {
  return (
    <li className="hlw-event" style={{ '--hlw-accent': ACCENT[e.district] } as CSSProperties}>
      <span className="hlw-event-dot" aria-hidden="true" />
      <time className="hlw-event-time">{e.time}</time>
      <span className="hlw-event-what">{e.what}</span>
      <span className="hlw-event-where">{nameOf(e.district)}</span>
    </li>
  )
}

export default function WeekSchedule() {
  return (
    <section id="week" aria-labelledby="week-title" className="hlw-section hlw-week" style={{ '--hlw-accent': '#8ea2ff' } as CSSProperties}>
      <div className="hlw-container">
        <Reveal>
          <p className="hlw-eyebrow">The timetable</p>
          <h2 id="week-title" className="hlw-h2 font-display">
            Lucy&rsquo;s week
          </h2>
          <p className="hlw-body hlw-sub">This is her actual schedule. All times UTC.</p>
        </Reveal>

        <Reveal className="hlw-board" delay={100}>
          <div className="hlw-board-bar" aria-hidden="true">
            <span className="hlw-board-light" />
            <span>Weekly schedule</span>
            <span className="hlw-board-utc">UTC</span>
          </div>
          <div className="hlw-days">
            {week.map(d => (
              <article key={d.day} className="hlw-day" aria-labelledby={`day-${d.day}`}>
                <h3 id={`day-${d.day}`} className="hlw-day-name font-display">
                  {d.day}
                </h3>
                <ul role="list" className="hlw-events">
                  {d.events.map(e => (
                    <Event key={e.time + e.what} e={e} />
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="hlw-everyday" aria-labelledby="everyday-title">
            <h3 id="everyday-title" className="hlw-day-name font-display">
              Every day
            </h3>
            <ul role="list" className="hlw-events hlw-events-wide">
              {everyDay.map(e => (
                <Event key={e.time + e.what} e={e} />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
