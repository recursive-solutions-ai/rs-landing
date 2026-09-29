# Recursive website: October 2026 message and contact form update

Instructions for Claude Code on the recursive-solutions.com repo. Written September 29, 2026 for Kyle. Every change is copy or configuration, not a redesign. Keep the existing layout, components and styling.

## Context

- **October message:** "Run your firm on systems, not on the owner."
- **Audience:** owners of owner-led professional services firms doing roughly $2M to $20M a year (accounting and tax, law, engineering and consulting).
- **Path to us:** one path only. Every "Book a Consult" button goes to the contact form. The form sends a branded auto-reply, and we follow up to set up a **discovery call**. On that call the prospect gets a **Friction Audit**. Use those exact names everywhere. Don't use "intro call", "Free Growth Audit" or "Get Early Access".
- **One form:** the site should use only the Lucy form with slug `free-growth-audit` (id `5OCbUhxtHc6NJTgflhI2M`, now named "Contact Form" in Lucy). Its fields, placeholders, button text ("Book a Consult"), success message, notifications and auto-reply are already set in Lucy, and the homepage already renders it from Lucy. Don't hard-code any of that.

## Rules for every change

- No em dashes anywhere in copy. Use periods, commas, colons or parentheses.
- No military or special operations references anywhere on the site.
- Don't change the form slug `free-growth-audit`. Changing it breaks the embed.
- Don't invent client names, quotes, numbers or results. Only use the text given below.

## 1. Homepage (`/`)

### 1a. Hero

| Element | Current | New |
|---|---|---|
| Eyebrow | GROWTH SYSTEMS & AI CONSULTING | AI & OPERATIONS FOR PROFESSIONAL SERVICES FIRMS |
| H1 | We make your business simpler, faster, and more valuable. | Run your firm on systems, not on the owner. |
| Subhead | One vertical system for your website, content, SEO, leads, CRM, and analytics, run by a hands-on team. Plus custom automations, bespoke tools, and consulting. | For owner-led accounting and tax, law, and engineering and consulting firms. One system for your website, content, SEO, leads, CRM and analytics, run by a hands-on team, plus custom automations, AI agents and advisory. |

Keep both hero buttons ("Book a Consult" to `/#contact`, "Explore Lucy" to `/lucy`).

### 1b. Credibility line under the calculator

- **Current:** Operators, not theorists. Forged in special operations, business, and engineering. We build the systems that give companies an edge.
- **New:** Operators, not theorists. We run our own firms on the same systems we build, so we know what it takes for a firm to run without the owner in every decision.

### 1c. Field reports ("What clients are saying")

Keep the three-card layout. Replace the three unattributed quotes with:

- **Card 1 (quote):** "A fire and forget service." Attribution: Jesse Lipscomb, CEO, Roadmap Tax Services. Under the attribution, a smaller supporting line (not in quotation marks, since it isn't Jesse's words): "A website rebuild, a blog publishing five days a week (116 articles so far), and client follow-up that runs from booked to signed to paid on its own." Link: `/use-cases/roadmap-tax`
- **Card 2 (quote):** "Amazing working with the Recursive Solutions team. Above and beyond, really. They captured the essence of who we are and made it so much easier for the right families to find us online." Attribution: My Little Paris. Link: `/use-cases/my-little-paris`
- **Card 3 (result, not a quote):** Heading "~14 hours a week". Body: "Reporting work taken off Roadmap Tax's plate every week, with 650+ steps a month now running without anyone touching them." Link text: "Read the Roadmap Tax story →" to `/use-cases/roadmap-tax`

The quotes and numbers come from the existing use-case pages (with the hours figure corrected per section 2b). If Jake confirms the three original quotes are from real clients, keep whichever ones he names instead.

### 1d. Team section

Change **only** Jake's bio. Leave Luc and Denis as they are.

- **Current:** Seven years in MARSOC as a Special Operations medic taught one discipline: understand what's actually broken before you act. Jake works directly with founders to find where the business is losing margin and owner time, then defines the fix before any technology is recommended.
- **New:** Jake runs operations at Roadmap Tax, a San Diego tax strategy firm, and built Recursive from what worked there. He works directly with owners to find where the firm still runs on them, then defines the fix before any technology is recommended.

### 1e. Common questions (visible accordion AND the FAQPage JSON-LD; both must match)

1. **Question:** "Is my business the right size for this?" becomes "Is my firm the right size for this?"
   **Answer:** "If you own a professional services firm and too much still waits on you, you're the right size. Most of the firms we work with do roughly $2M to $20M a year. Every engagement is scoped to your operation, so you never pay for capability you don't need."
2. **Question:** "What happens on the intro call?" becomes "What happens on the discovery call?"
   **Answer:** "Thirty minutes, no pitch deck. We learn how your firm runs today and where the owner's time is going. You leave with a Friction Audit: an honest read on where you stand and where AI would actually pay off. No pressure to buy anything."
3. **"How does pricing work?"** Leave the answer as is. It already says "Friction Audit".
4. **"Is our business data safe?"** Change the question to "Is our firm's data safe?" and leave the answer as is.

Leave the other questions as they are.

### 1f. Contact section (`#contact`)

| Element | Current | New |
|---|---|---|
| Heading | Let's make your business simpler, faster, and more valuable. | Let's find where your firm still runs on you. |
| Intro line | Tell us a bit about your business, and we'll show you where the biggest wins are. | Tell us about your firm. We'll read it and email you within one business day to set up a discovery call. |

The form itself keeps rendering from Lucy (`free-growth-audit`). Make sure the new `firm_type` select field posts its value with the submission.

### 1g. Page title and meta

- **Title:** "Recursive Solutions | Run Your Firm on Systems, Not on the Owner"
- **Meta description:** "Recursive Solutions helps owner-led accounting, law, engineering and consulting firms run on systems instead of on the owner. One system for website, content, leads, CRM and analytics, run by a hands-on team."

## 2. Lucy page (`/lucy`)

1. **Hero button:** "Get Early Access" becomes "Book a Consult", linking to the contact form on this page (or `/#contact`).
2. **Form:** swap the embed from `general-contact-form` to `free-growth-audit`. Same component the homepage uses.
3. **Contact section heading and intro:** use the same copy as homepage section 1f.
4. **Demo firm:** the mockups use "Holt CPA" and `holtcpa.com`. If that isn't a fictional name, rename it throughout to an obviously fictional one (for example "Harbor Lane CPA", `harborlanecpa.example`). Don't show a real firm's name or domain.
5. **Page title:** remove the em dash. Use "Lucy, the unified growth platform | Recursive Solutions".

## 2b. Roadmap Tax use case (`/use-cases/roadmap-tax`)

The reporting time saved is **per week**, not per month. Jake confirmed this.

- **Current stat card:** "~14 hrs / Reporting work saved / Off the team's plate every month."
- **New stat card:** "~14 hrs / Reporting work saved / Off the team's plate every week."

Search the whole case study, including the "How we measured" note and any meta description or social preview text, for "14" and "per month" / "every month" / "a month" next to the hours figure, and change every instance to weekly. Leave "650+ automated steps every month" as it is. That one is monthly.

## 3. Blog post template (`/blog/[slug]`)

Add a call-to-action block at the end of every post, after the article body and FAQ, before "Filed under" and "Related Posts":

- **Heading:** Where does your firm still run on you?
- **Body:** Tell us about your firm and we'll set up a short discovery call to find the biggest wins.
- **Button:** "Book a Consult", linking to `/#contact`
- **Style:** a light panel in the site's cream and navy (`#f6f3ee` background, `#284b73` button), matching the homepage.

When this ships, tell Jake. The blog writer in Lucy currently writes its own closing call to action into each post, and the guidance will change so posts don't end up with two.

## 4. Site-wide sweep

Search the whole repo for these strings and fix any that remain:

- "Get Early Access": replace with "Book a Consult"
- "Free Growth Audit" or "free growth audit": replace with "Friction Audit" (or remove if it refers to the form)
- "intro call": replace with "discovery call"
- "special operations", "MARSOC", "Marine": remove
- "general-contact-form": replace with "free-growth-audit"
- The em dash character (Unicode U+2014) in visible copy: replace per the rules above

## 5. Check before you ship

- `/` and `/lucy` both render the same Lucy form (`free-growth-audit`) with the button "Book a Consult" and the "What kind of firm?" dropdown.
- Every "Book a Consult", "Get started" and "Talk about your..." link lands on a contact form.
- The FAQ JSON-LD matches the visible FAQ text exactly.
- The Roadmap Tax case study and the homepage card both say ~14 hours a **week**.
- There's no em dash, military reference or "Get Early Access" left on the site.

## 6. After it's live (in Lucy, not the repo)

Once `/lucy` is confirmed on the new form, delete the **General Contact Form** in Lucy (Forms). **Don't** delete "Pilot - Growth Audit Request - Denis". Denis uses it for testing.
