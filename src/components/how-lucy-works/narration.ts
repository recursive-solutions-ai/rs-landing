/**
 * Voice-over script for /how-lucy-works, spoken by Lucy in the first person.
 *
 * One clip per stop of the tour. The audio files in
 * public/audio/how-lucy-works/<id>.mp3 are generated from this text by
 * scripts/generate-narration.mjs. If you change a line here, regenerate that clip.
 *
 * Same rule as content.ts: every claim was checked against the product.
 */

import type { DistrictId } from './content'

export type NarrationId = 'intro' | DistrictId | 'outro'

export const narration: { id: NarrationId; text: string }[] = [
  {
    id: 'intro',
    text: 'Hi, I\'m Lucy. You mostly hear from me when I send you something to approve. But most of my work happens in the background, on a schedule, every single week. Let me walk you through it. It takes about three minutes.',
  },
  {
    id: 'foundation',
    text: 'Everything starts with your website. We rebuild it so that Google and AI assistants can read it properly: clean structure, fast pages, a layout made for phones, and the facts about your business written in a format machines understand. It also connects me to your site, and that is what makes everything else possible.',
  },
  {
    id: 'watchtower',
    text: 'Every Monday morning, I go through your whole site, page by page. I run about forty-five checks: broken links, missing descriptions, slow pages, and more. Small things, I fix myself, and every fix can be undone. Bigger things, I prepare and bring to you.',
  },
  {
    id: 'dish',
    text: 'Then I listen. Every day, I read your Google data: which searches show your pages, and who clicks. Every week, I ask AI assistants the questions your customers ask, and I note whether they mention you. These signals tell me what to write next, and what to improve.',
  },
  {
    id: 'press',
    text: 'Now I write. For each topic, I look at what people search for, and I study the pages that already rank. I draft the article, review it against eleven criteria, and check every claim about your business against what you have told me. Then it comes to you for approval.',
  },
  {
    id: 'studio',
    text: 'I do the same for social media. I plan posts from what I know about your business, and I draft them in your voice, with your own photos. Nothing is posted until you approve it. On LinkedIn, I look at what performed, and I use that for the next drafts.',
  },
  {
    id: 'yard',
    text: 'Next, new leads. They come from your website forms, your lists, your inbox, or my own search for businesses that match your ideal customer. I find the right contact, then nurture them with a sequence you have reviewed and switched on. It always starts as a rehearsal, so nothing is ever sent by surprise.',
  },
  {
    id: 'lane',
    text: 'When someone replies with interest, they move into your pipeline. From here, I am your sales assistant. I keep track of every conversation, suggest the next step, draft the follow-up, and put it on your to-do list. You read it, adjust it, and press send. Your name is on the email, so you keep the final word.',
  },
  {
    id: 'house',
    text: 'Once they become customers, I keep watching. I keep the history of each relationship, I tell you who is waiting for a reply, and I flag anyone you have not spoken to in a while.',
  },
  {
    id: 'silo',
    text: 'Behind all of this is what you know. I can research the whole internet, but I cannot know what a customer told you on the phone yesterday. When you share a note, a document or a link, every step you just saw gets better.',
  },
  {
    id: 'gate',
    text: 'And you stay in control. By default, nothing is published or sent without your OK. Everything I do is recorded, and you decide how much freedom I get.',
  },
  {
    id: 'outro',
    text: 'One last thing. This kind of work compounds. The first months can look quiet while Google learns to trust your site. Then the results start to stack up. So if things seem calm on your side, it is because the work is happening here. And if you ever wonder what I am doing, just ask.',
  },
]
