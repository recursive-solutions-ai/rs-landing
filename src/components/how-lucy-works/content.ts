/**
 * Copy and data for /how-lucy-works.
 *
 * Every claim here was checked against the Growth Engine source
 * (recursive-engine) on 2026-11-24. Do not add numbers or capabilities
 * without checking them there first: this page is sent to customers.
 */

export type DistrictId =
  | 'foundation'
  | 'watchtower'
  | 'press'
  | 'dish'
  | 'studio'
  | 'yard'
  | 'lane'
  | 'house'
  | 'silo'
  | 'gate'

export type LoopStep = {
  /** One or two words, shown on the loop ring. */
  label: string
  /** One sentence, shown next to the ring. */
  detail: string
  /** Who does this step. */
  by: 'lucy' | 'you'
}

export type StageId = 'found' | 'create' | 'sell' | 'always'

export type District = {
  id: DistrictId
  /** Which part of the process this belongs to. */
  stage: StageId
  /** Plain name of the job, shown on the map, nav and sections, e.g. "Weekly site check". */
  building: string
  /** Short descriptor shown after the name in the detail panel. */
  title: string
  /** One line under the building name on the map label. */
  mapLine: string
  /** Section eyebrow: the stage and step number, e.g. "Get found, step 2". */
  eyebrow: string
  /** Section headline. */
  headline: string
  /** Section intro paragraph. */
  intro: string
  /** How often it runs. */
  cadence: string
  steps: LoopStep[]
  /** Short stat chips: [value, label]. */
  facts: [string, string][]
  /** Optional honest footnote. */
  note?: string
}

export const hero = {
  eyebrow: 'How Lucy works',
  title: 'A small town that works on your growth every week.',
  lead: 'Lucy runs one process, every week. She gets you found on Google and by AI assistants, turns what she learns into content and a following, then finds leads and helps you follow up until they become customers. Most of that work happens where you cannot see it. This page shows every step.',
  mapHint: 'Hover a building. Click to open it.',
  mapHintTouch: 'Tap a building to open it.',
}

export const districts: District[] = [
  {
    id: 'foundation',
    stage: 'found',
    building: 'Your website',
    title: 'The ground everything stands on',
    mapLine: 'Built so Google and AI can read it',
    eyebrow: 'Get found, step 1',
    headline: 'Why we start with a new website.',
    intro:
      'Google and AI assistants read code before they read words. Structure, speed, mobile layout and machine-readable data all count. Fixing those on an old site one by one is slow and never finished, so we rebuild the ground once, properly. The second reason matters just as much: once your site runs on our foundation, Lucy is plugged into it. She can read every page, measure it, and improve it. Without that, none of the loops below can run.',
    cadence: 'Built once, then maintained every week',
    steps: [
      { label: 'Search structure', detail: 'Every page ships with clean titles, descriptions, canonical links and a sitemap that updates itself.', by: 'lucy' },
      { label: 'Machine-readable facts', detail: 'Structured data tells Google and AI assistants who you are, what you offer, where you are and what each article answers.', by: 'lucy' },
      { label: 'Open to AI search', detail: 'Rules for AI crawlers are managed centrally, so your site stays readable by the assistants your customers ask.', by: 'lucy' },
      { label: 'Speed', detail: 'Images are resized and served in modern formats automatically. Light pages rank better and convert better.', by: 'lucy' },
      { label: 'Mobile first', detail: 'Every layout is built for the phone first, because that is how Google indexes it and how most visitors arrive.', by: 'lucy' },
      { label: 'Plugged in', detail: 'Blog, forms, analytics and CRM are wired to Lucy from day one. This is what lets her work on the site instead of around it.', by: 'lucy' },
    ],
    facts: [
      ['8', 'types of structured data built in'],
      ['2', 'modern image formats served automatically'],
      ['1', 'connection that makes every loop possible'],
    ],
  },
  {
    id: 'watchtower',
    stage: 'found',
    building: 'Weekly site check',
    title: 'Keeps the site healthy',
    mapLine: 'About 45 checks, every Monday',
    eyebrow: 'Get found, step 2',
    headline: 'Every Monday, Lucy checks the whole site.',
    intro:
      'Websites break quietly. A link dies, a page loses its description, an image slows a page down. Nobody notices until rankings drop. Lucy re-reads your site every week, scores it, fixes what is safe to fix and brings you the rest.',
    cadence: 'Every Monday, 05:00 UTC',
    steps: [
      { label: 'Crawl', detail: 'Lucy re-reads the site page by page, up to 250 pages.', by: 'lucy' },
      { label: 'Check', detail: 'About 45 checks: broken links, redirect chains, titles, descriptions, headings, thin content, image alt text, mobile viewport, security certificate, structured data, blocked AI crawlers and load speed.', by: 'lucy' },
      { label: 'Score', detail: 'The result is one health score from 0 to 100, so you can see the trend at a glance.', by: 'lucy' },
      { label: 'Fix', detail: 'Safe fixes are applied directly to your content: titles, descriptions, headings, alt text, broken links. A few per week, so each change can be measured.', by: 'lucy' },
      { label: 'Flag', detail: 'Anything bigger becomes a task for you, or a prepared site change that you preview and publish.', by: 'you' },
      { label: 'Undo', detail: 'Every change Lucy makes is recorded and can be reversed.', by: 'lucy' },
    ],
    facts: [
      ['~45', 'checks per crawl'],
      ['250', 'pages per crawl, maximum'],
      ['0 to 100', 'site health score'],
    ],
  },
  {
    id: 'dish',
    stage: 'found',
    building: 'Google and AI signals',
    title: 'Where you show up, and where you do not',
    mapLine: 'Google daily. 4 AI assistants weekly',
    eyebrow: 'Get found, step 3',
    headline: 'Lucy listens to Google and to AI before she writes a word.',
    intro:
      'Being found starts with knowing where you stand. Lucy reads your Google data every day and asks AI assistants your customers’ questions every week to see whether you are the answer. Those signals decide what gets written next, which articles get refreshed, and which are left to rest while effort moves to what works.',
    cadence: 'Google data daily. AI answers every Monday, 06:00 UTC',
    steps: [
      { label: 'Google', detail: 'Clicks, impressions and positions from Search Console, every day. Whether each page is indexed, every day.', by: 'lucy' },
      { label: 'Attention', detail: 'How long real visitors stay engaged on each post, from your analytics.', by: 'lucy' },
      { label: 'AI answers', detail: 'Each week Lucy asks Perplexity, ChatGPT search, Google AI Mode and Google AI Overviews up to 10 questions your customers ask, and records whether you are cited.', by: 'lucy' },
      { label: 'Refresh', detail: 'A post that loses 30% of its clicks over 28 days is flagged and refreshed. Live posts also get their facts rechecked every week.', by: 'lucy' },
      { label: 'Rest', detail: 'A post that does not perform stays online. Lucy stops investing near that topic until the signals come back.', by: 'lucy' },
    ],
    facts: [
      ['4', 'AI answer engines asked every week'],
      ['30%', 'click drop that triggers a refresh'],
      ['Daily', 'Google and analytics readings'],
    ],
    note: 'Content compounds. Not every article wins, and the first months look quiet. See the curve below.',
  },
  {
    id: 'press',
    stage: 'create',
    building: 'Blog content',
    title: 'Articles for Google and AI search',
    mapLine: 'Research, write, fact-check, publish',
    eyebrow: 'Create, step 4',
    headline: 'Then the signals become articles.',
    intro:
      'A post is the last step of a long process. Before a single word is written, Lucy has looked at what people search for, how hard each keyword is to win, what the pages that already rank are saying, and what is trending right now. The article is built on that, then checked against the facts of your business.',
    cadence: 'Planned weekly, measured daily',
    steps: [
      { label: 'Find demand', detail: 'Live search data for each keyword: monthly volume, difficulty, commercial value and related ideas. Lucy keeps a portfolio of up to 50 target keywords.', by: 'lucy' },
      { label: 'Read the winners', detail: 'For each keyword, Lucy reads up to 4 of the top-ranking pages, maps the topics they cover and finds what your article must cover to compete. Topics only. Nothing is copied.', by: 'lucy' },
      { label: 'Catch trends', detail: 'Rising and falling searches, plus what people are discussing right now, so the plan is not only evergreen content.', by: 'lucy' },
      { label: 'Write', detail: 'Research, sources, images, an FAQ, internal links. Then a self-review on 11 criteria. Anything that scores under 4 out of 5 is rewritten.', by: 'lucy' },
      { label: 'Fact-check', detail: 'Every claim about your business is checked against what you have told us. A post that cannot pass is held for you instead of published.', by: 'lucy' },
      { label: 'Approve', detail: 'You get the draft and a review email with a one-click publish link. Autopilot is available once you trust it.', by: 'you' },
    ],
    facts: [
      ['4', 'top-ranking pages studied per keyword'],
      ['11', 'criteria in every self-review'],
      ['50', 'target keywords tracked'],
    ],
  },
  {
    id: 'studio',
    stage: 'create',
    building: 'Social media',
    title: 'Building a following',
    mapLine: 'Drafted in your voice. You approve',
    eyebrow: 'Create, step 5',
    headline: 'Social posts in your voice, never without your OK.',
    intro:
      'Lucy builds a content plan from what she knows about your business, drafts posts in your voice using your real photos, and waits. Nothing reaches a social network until you approve it.',
    cadence: 'Drafted weekly',
    steps: [
      { label: 'Plan', detail: 'A content plan built from your knowledge, your offers and your audience.', by: 'lucy' },
      { label: 'Draft', detail: 'Posts written in your voice, with your own photos or a document carousel. A post can also promote a new article.', by: 'lucy' },
      { label: 'Approve', detail: 'Every post waits as a draft. Social posts are never published automatically.', by: 'you' },
      { label: 'Publish', detail: 'LinkedIn, X, Instagram, Facebook and your Google Business Profile.', by: 'lucy' },
      { label: 'Learn', detail: 'On LinkedIn, Lucy checks every day how your posts did, and each week drafts one or two new ones based on what worked.', by: 'lucy' },
    ],
    facts: [
      ['5', 'places Lucy can publish'],
      ['0', 'posts published without approval'],
      ['Weekly', 'new drafts from what worked'],
    ],
    note: 'Performance learning runs on LinkedIn today. Other networks are next.',
  },
  {
    id: 'yard',
    stage: 'sell',
    building: 'New leads',
    title: 'Finding and warming up prospects',
    mapLine: '8 ways in. 6 sources searched',
    eyebrow: 'Sell, step 6',
    headline: 'You bring the leads in. Lucy keeps the conversation going.',
    intro:
      'Leads arrive in many ways: your website forms, a list you import, an email from a stranger, a booked meeting, or the Lead Finder, which searches six sources for businesses that match your ideal customer. Once someone is in, Lucy nurtures them with a sequence you have seen and switched on.',
    cadence: 'Always on. New signals scanned every Thursday',
    steps: [
      { label: 'Feed', detail: 'Website forms, imports, manual adds, inbound emails, booked meetings, or the Lead Finder searching business directories, contact databases and the web.', by: 'you' },
      { label: 'Enrich', detail: 'Lucy finds the right contact and email, reads the company site, and each week scans for reasons to reach out now.', by: 'lucy' },
      { label: 'Rehearse', detail: 'Every new sequence starts in simulation. You see exactly who would get what, then you switch it live.', by: 'you' },
      { label: 'Nurture', detail: 'Emails go out on weekdays in business hours, a limited number of new people per day, so it reads like a person and not a blast.', by: 'lucy' },
      { label: 'Protect', detail: 'Lucy never cold-emails a customer, someone in an open deal, or someone already in another sequence.', by: 'lucy' },
      { label: 'Hand over', detail: 'A positive reply stops the sequence and moves the person into your pipeline.', by: 'lucy' },
    ],
    facts: [
      ['8', 'ways a lead can enter'],
      ['6', 'sources the Lead Finder searches'],
      ['20', 'new contacts per sequence per day, maximum'],
    ],
  },
  {
    id: 'lane',
    stage: 'sell',
    building: 'Sales follow-up',
    title: 'Your pipeline of warm leads',
    mapLine: 'Next step, draft and to-do for every deal',
    eyebrow: 'Sell, step 7',
    headline: 'In the pipeline, Lucy is your sales assistant.',
    intro:
      'The pipeline is for warm leads: people who answered and showed interest. From here the work is follow-up, and follow-up is where most deals are lost. Lucy keeps track of every conversation, tells you what to do next and when, and writes the message for you. You press send.',
    cadence: 'Checked every 5 minutes',
    steps: [
      { label: 'Track', detail: 'Emails and meetings land on each contact’s timeline on their own. Stages run from Lead to Qualified, Proposal, Negotiation and Won.', by: 'lucy' },
      { label: 'Suggest', detail: 'For each contact Lucy proposes the next step and the right moment for it.', by: 'lucy' },
      { label: 'Draft', detail: 'She writes the follow-up in your voice, using what was said before and what she knows about your business.', by: 'lucy' },
      { label: 'Remind', detail: 'A to-do with a date appears in your list, and a digest of open tasks arrives every Monday.', by: 'lucy' },
      { label: 'Send', detail: 'You read, adjust and click Approve and send. There is a 2-minute undo.', by: 'you' },
      { label: 'Learn', detail: 'Lucy studies your edits and adjusts how she writes for you.', by: 'lucy' },
    ],
    facts: [
      ['5', 'pipeline stages, yours to rename'],
      ['2 min', 'undo window on every send'],
      ['You', 'press send, every time'],
    ],
    note: 'Why not fully automatic? Because your name is on the email. Lucy prepares everything, and you keep the final word until you choose otherwise.',
  },
  {
    id: 'house',
    stage: 'sell',
    building: 'Customers',
    title: 'Looking after the people who bought',
    mapLine: 'Who needs a reply. Who has gone quiet',
    eyebrow: 'Sell, step 8',
    headline: 'After the sale, Lucy keeps an eye on every account.',
    intro:
      'A won deal becomes a customer, and the same care continues. Lucy keeps the full history of each relationship and tells you who is waiting on you and who you have not spoken to in a while.',
    cadence: 'Continuous',
    steps: [
      { label: 'Remember', detail: 'Every email and meeting with a customer is kept on one timeline.', by: 'lucy' },
      { label: 'Watch', detail: 'Each customer has a status: needs a reply, check-in due after 45 days without a word from you, or quiet after 90.', by: 'lucy' },
      { label: 'Draft', detail: 'When a customer writes, Lucy prepares the reply and adds it to your to-dos.', by: 'lucy' },
      { label: 'Send', detail: 'You approve and send, with the same 2-minute undo.', by: 'you' },
      { label: 'Ask', detail: 'Lucy can request reviews from happy customers and help you answer the ones you receive.', by: 'lucy' },
    ],
    facts: [
      ['45 days', 'before a check-in is due'],
      ['90 days', 'before an account is marked quiet'],
      ['1', 'timeline per customer'],
    ],
  },
  {
    id: 'silo',
    stage: 'always',
    building: 'Your knowledge',
    title: 'Feeds every step',
    mapLine: 'Notes, documents, pages, answers',
    eyebrow: 'Behind every step',
    headline: 'You know things no AI can find. Feed them in.',
    intro:
      'Lucy can research the whole internet, but she cannot know what a customer told you on the phone yesterday. This is where you tell her. Every step of the process draws from it.',
    cadence: 'Whenever you have something. Linked pages re-read daily',
    steps: [
      { label: 'Tell', detail: 'Write a note, or simply message Lucy: “Customers keep asking about the new filing deadline.”', by: 'you' },
      { label: 'Upload', detail: 'Documents, price lists, procedures, policies, questions and answers.', by: 'you' },
      { label: 'Link', detail: 'Point Lucy at web pages. She reads up to 200 pages per source and re-reads them every day.', by: 'you' },
      { label: 'Use', detail: 'Articles are fact-checked against it, social plans are built from it, and reply drafts quote from it.', by: 'lucy' },
      { label: 'Tidy', detail: 'Each week Lucy consolidates what she has learned so it stays current and consistent.', by: 'lucy' },
    ],
    facts: [
      ['200', 'pages read per linked source'],
      ['Daily', 'refresh of linked pages'],
      ['3', 'loops that draw on it: blog, social, replies'],
    ],
  },
  {
    id: 'gate',
    stage: 'always',
    building: 'Your approval',
    title: 'Controls every step',
    mapLine: 'Nothing goes out without your OK',
    eyebrow: 'Behind every step',
    headline: 'Lucy does the work. You keep control.',
    intro:
      'Everything that publishes or sends passes through you. By default nothing goes out until you say so.',
    cadence: 'On every action',
    steps: [
      { label: 'Approve first', detail: '62 kinds of action, including publish, send, schedule and delete, need your confirmation.', by: 'you' },
      { label: 'Rehearse first', detail: 'New outreach sequences start in simulation and send nothing until you switch them live.', by: 'you' },
      { label: 'Undo', detail: 'Sent replies have a 2-minute undo. Changes Lucy makes to your site can be reversed.', by: 'lucy' },
      { label: 'Record', detail: 'Every action is written to an audit log kept for 180 days.', by: 'lucy' },
      { label: 'Autopilot, by choice', detail: 'You can let Lucy publish on her own, area by area, when you are ready. Never before.', by: 'you' },
    ],
    facts: [
      ['62', 'kinds of action that need your OK'],
      ['180 days', 'of audit history'],
      ['Off', 'autopilot, until you turn it on'],
    ],
  },
]

/** The process, in order. Shown as a strip with the map and used to group labels. */
export const stages: { id: StageId; name: string; line: string }[] = [
  { id: 'found', name: 'Get found', line: 'Google and AI assistants can read your site, trust it and recommend it.' },
  { id: 'create', name: 'Create', line: 'What Lucy learns becomes articles and posts that build an audience.' },
  { id: 'sell', name: 'Sell', line: 'Leads are found, followed up and looked after until they are customers.' },
  { id: 'always', name: 'Behind every step', line: 'Your knowledge feeds it. Your approval controls it.' },
]

/** Stats strip under the map. */
export const underTheHood: [string, string][] = [
  ['450+', 'tools Lucy can use across your site, content, CRM and inbox'],
  ['50+', 'scheduled jobs running in the background'],
  ['~45', 'site checks every Monday'],
  ['4', 'AI answer engines asked about you every week'],
]

export type WeekEvent = { time: string; what: string; district: DistrictId }

/** Lucy's real schedule. Times are UTC. */
export const week: { day: string; events: WeekEvent[] }[] = [
  {
    day: 'Monday',
    events: [
      { time: '05:00', what: 'Full site crawl and speed measurement', district: 'watchtower' },
      { time: '06:00', what: 'Asks AI answer engines your customers’ questions', district: 'dish' },
      { time: '08:00', what: 'Your weekly summary and open tasks arrive by email', district: 'gate' },
    ],
  },
  {
    day: 'Wednesday',
    events: [
      { time: '05:00', what: 'Keyword volumes and difficulty refreshed', district: 'press' },
      { time: 'Morning', what: 'Retries missing contact details for new leads', district: 'yard' },
    ],
  },
  {
    day: 'Thursday',
    events: [{ time: '05:00', what: 'Scans target companies for reasons to reach out now', district: 'yard' }],
  },
  {
    day: 'Sunday',
    events: [
      { time: '03:23', what: 'Rechecks the facts in your live articles', district: 'dish' },
      { time: '07:40', what: 'Consolidates what she learned this week', district: 'silo' },
    ],
  },
]

export const everyDay: WeekEvent[] = [
  { time: '03:00', what: 'Reads your Google Search Console data', district: 'dish' },
  { time: '03:30', what: 'Reads your analytics, including engaged time', district: 'dish' },
  { time: '04:19', what: 'Re-reads your linked knowledge pages', district: 'silo' },
  { time: '06:43', what: 'Checks how your LinkedIn posts performed', district: 'studio' },
  { time: '07:13', what: 'Checks your landing pages are live', district: 'watchtower' },
  { time: 'Every 20 min', what: 'Syncs booked meetings to contacts', district: 'lane' },
  { time: 'Every 5 min', what: 'Checks which follow-ups are due', district: 'lane' },
]

export const compounding = {
  eyebrow: 'Why patience pays',
  headline: 'Content compounds. The first months look quiet.',
  body: [
    'One article rarely changes anything. Google takes weeks to trust a new page, and some articles never take off. That is normal, and it is why Lucy does not judge a post in its first month.',
    'What matters is the stack. Each article that ranks keeps bringing visitors while the next ones are added on top, and each one makes the site a stronger answer for Google and for AI assistants. The curve is flat, then it bends.',
  ],
  chartCaption: 'Illustration of how content traffic typically builds. Not a forecast for your site.',
  phases: [
    ['Months 1 to 2', 'Foundation live. Google is indexing. Little visible movement.'],
    ['Months 3 to 5', 'First articles rank. Lucy refreshes the ones that slip.'],
    ['Month 6 onward', 'Articles stack. Old posts keep working while new ones land.'],
  ] as [string, string][],
}

export const yourWeek = {
  eyebrow: 'Your side of it',
  headline: 'What Lucy needs from you.',
  lead: 'Lucy carries the routine. A real team at Recursive Solutions sets her up and watches over her. Your part is small, and it matters.',
  items: [
    ['Approve', 'Review article and social drafts. One click each.'],
    ['Follow up', 'Send the follow-ups Lucy drafts for your warm leads and customers.'],
    ['Feed', 'Tell Lucy what is new in your business and what customers are asking.'],
    ['Read', 'Open the Monday summary. It tells you what moved.'],
  ] as [string, string][],
}

export const closing = {
  headline: 'Questions about any step?',
  body: 'We are happy to walk you through your own setup, step by step.',
  cta: 'Talk to us',
}
