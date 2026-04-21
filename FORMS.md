# Forms Guide

This guide covers how to build type-safe forms in your client site using the Growth Engine SDK.

## How It Works

1. Every new tenant gets a **default "Contact Us" form** seeded automatically during onboarding
2. You can create additional forms in the **Brain portal** (fields, validation, settings)
3. Optionally run `pnpm pull-forms` to generate TypeScript types and Zod schemas for compile-time safety
4. Use SDK hooks (`useForm`, `submitForm`) to render and submit forms — validation happens client-side (Zod) and server-side
5. Submissions are stored in your Turso database, with automatic CRM contact creation, email notifications, and confirmation emails

## Default Contact Form

Every new tenant gets a pre-seeded contact form with slug `contact-form` containing:

| Field | Type | Required |
|-------|------|----------|
| `name` | text | Yes |
| `email` | email | Yes |
| `message` | textarea | Yes |

The scaffolded template includes two pages that use forms out of the box:

- **`/contact`** — Dedicated contact page using the `contact-form` slug, with business info sidebar
- **`/forms/[slug]`** — Dynamic form page that renders any form by slug from the URL

Both pages auto-render fields from the form definition, validate on submit, and display the configured success message.

## Quick Start

### Option A: Use the built-in pages (zero code)

The template's `/contact` page and `/forms/[slug]` page work immediately after onboarding. No code changes needed for the default contact form.

To link to any form: `/forms/my-form-slug`

### Option B: Build a custom form component

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useForm, submitForm } from '@growth-engine/sdk-client'

export function ContactForm() {
  const { form, loading } = useForm('contact-form')
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!form || initialized) return
    const initial: Record<string, unknown> = {}
    for (const field of form.fields) {
      initial[field.name] = field.type === 'checkbox' ? false : ''
    }
    setFormData(initial)
    setInitialized(true)
  }, [form, initialized])

  function updateField(name: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const result = await submitForm('contact-form', formData)
      if (!result.ok) {
        if (result.validationErrors) {
          setError(result.validationErrors.map((err) => err.message).join(', '))
        } else {
          setError(result.error ?? 'Something went wrong')
        }
        return
      }
      setSubmitted(true)
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || !form) return <div>Loading...</div>

  if (submitted) {
    return <p>{form.settings?.successMessage ?? 'Thank you!'}</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      {[...form.fields]
        .sort((a, b) => a.order - b.order)
        .map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span> *</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
                value={String(formData[field.name] ?? '')}
                onChange={(e) => updateField(field.name, e.target.value)}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.name}
                required={field.required}
                value={String(formData[field.name] ?? '')}
                onChange={(e) => updateField(field.name, e.target.value)}
              >
                <option value="">{field.placeholder ?? 'Select...'}</option>
                {(field.options ?? []).map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <label>
                <input
                  type="checkbox"
                  id={field.name}
                  required={field.required}
                  checked={Boolean(formData[field.name])}
                  onChange={(e) => updateField(field.name, e.target.checked)}
                />
                <span>{field.placeholder}</span>
              </label>
            ) : (
              <input
                type={field.type}
                id={field.name}
                required={field.required}
                placeholder={field.placeholder}
                value={String(formData[field.name] ?? '')}
                onChange={(e) => updateField(field.name, e.target.value)}
              />
            )}
          </div>
        ))}

      {error && <p>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : form.settings?.submitButtonText ?? 'Submit'}
      </button>
    </form>
  )
}
```

### Option C: Use generated types for compile-time safety

For stronger TypeScript guarantees, pull form schemas locally:

```bash
pnpm pull-forms
```

This generates `src/generated/forms.ts` with Zod schemas, TypeScript types, and slug constants. See [Generated Types](#generated-types) for details.

## Field Types

| Field Type | Zod Validation | Notes |
|------------|---------------|-------|
| `text` | `z.string().min(1)` | General text input |
| `email` | `z.string().email()` | Email validation |
| `tel` | `z.string().min(1)` | Phone number |
| `textarea` | `z.string().min(1)` | Multi-line text |
| `select` | `z.enum([...options])` | Dropdown with defined options |
| `checkbox` | `z.boolean()` | True/false toggle |
| `number` | `z.coerce.number()` | Numeric input (coerced from string) |
| `url` | `z.string().url()` | URL validation |

Optional fields get `.optional()` appended automatically.

## API Reference

### Hooks and Functions

#### `useForms()`

Fetches all active forms for your tenant.

```tsx
import { useForms } from '@growth-engine/sdk-client'

const { forms, loading, error } = useForms()
```

Returns:

| Field | Type | Description |
|-------|------|-------------|
| `forms` | `Form[]` | Array of active form definitions |
| `loading` | `boolean` | True while fetching |
| `error` | `string \| null` | Error message if fetch failed |

#### `useForm(slug)`

Fetches a single form by slug, including a runtime Zod schema built from its field definitions.

```tsx
import { useForm } from '@growth-engine/sdk-client'

const { form, schema, loading, error } = useForm('contact-form')
```

Returns:

| Field | Type | Description |
|-------|------|-------------|
| `form` | `Form \| null` | The form definition |
| `schema` | `z.ZodObject \| null` | Runtime Zod schema built from `form.fields` |
| `loading` | `boolean` | True while fetching |
| `error` | `string \| null` | Error message if fetch failed |

#### `submitForm(slug, data)`

Validates form data against the schema and submits it. Validation runs client-side before the network request.

```tsx
import { submitForm } from '@growth-engine/sdk-client'

const result = await submitForm('contact-form', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'Hello!',
})
```

Returns:

| Field | Type | Description |
|-------|------|-------------|
| `ok` | `boolean` | Whether submission succeeded |
| `id` | `string?` | Submission ID (on success) |
| `error` | `string?` | Error message (on failure) |
| `validationErrors` | `z.ZodIssue[]?` | Detailed validation errors (on validation failure) |

#### `buildFormSchema(fields)`

Converts a `FormField[]` array into a Zod schema at runtime. This is what `useForm` uses internally, but you can call it directly if needed.

```tsx
import { buildFormSchema } from '@growth-engine/sdk-client'
import type { FormField } from '@growth-engine/types'

const schema = buildFormSchema(myFields)
const result = schema.safeParse(data)
```

### SDK Route

All form API calls go through your app's SDK route at `/api/rs/forms`. This is already configured in `src/app/api/rs/[...route]/route.ts`. The SDK server handles three actions:

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/rs/forms?action=list` | List all active forms |
| GET | `/api/rs/forms?action=get&slug=<slug>` | Get a single form by slug |
| POST | `/api/rs/forms?action=submit&slug=<slug>` | Submit form data |

You never call these directly — the SDK hooks handle it.

## What Happens on Submit

When a form is submitted via `submitForm()`, the following occurs:

1. **Client-side validation** — The SDK builds a Zod schema from the form's field definitions and validates data before sending
2. **Server-side validation** — The SDK server checks all required fields are present
3. **Submission stored** — The data is saved to the `formSubmissions` table in your Turso database
4. **CRM contact created** (best-effort) — If the submission contains recognizable contact fields, a CRM contact is auto-created
5. **Email notifications sent** (best-effort) — If `notifyEmails` is configured in form settings, notification emails are sent to those addresses via the Brain
6. **Confirmation email sent** (best-effort) — If `sendConfirmationEmail` is enabled in form settings, a confirmation email is sent to the submitter's email address

Steps 4-6 are best-effort: they run asynchronously and will not cause the submission to fail if they encounter an error.

## Email Features

### Admin Notifications

Configure `notifyEmails` in the form settings (via the Brain portal) to send an email to one or more addresses whenever a submission comes in. The email includes all submitted field values and a timestamp.

### Confirmation Emails

Enable `sendConfirmationEmail` in the form settings to automatically email the person who submitted the form. Requires the form to have an `email`-type field.

Customizable via form settings:

- `confirmationEmailSubject` — Custom subject line (default: "Thank you for your submission to {formName}")
- `confirmationEmailMessage` — Custom body message

### Reply-To

Set `replyToEmail` in form settings to control the reply-to address on notification emails.

## CRM Integration

When a form submission includes recognizable contact fields, the SDK server automatically creates a CRM contact. The following field name variants are detected (case-insensitive):

| Contact Field | Recognized Names |
|---------------|-----------------|
| Email | `email`, `Email`, `e_mail` |
| First Name | `firstName`, `first_name`, `name`, `Name` |
| Last Name | `lastName`, `last_name` |
| Phone | `phone`, `Phone`, `telephone` |
| Company | `company`, `Company`, `organization` |

Contacts are deduplicated by email address. If a contact with the same email already exists, no duplicate is created. The contact is linked to the submission via `source: 'form'` and `sourceId` pointing to the submission ID.

This is best-effort — CRM errors will not cause the form submission to fail.

## Generated Types

Running `pnpm pull-forms` generates `src/generated/forms.ts`:

```typescript
// src/generated/forms.ts (auto-generated — do not edit manually)

import { z } from 'zod'

// --- contact-form ---
export const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})
export type ContactFormData = z.infer<typeof contactFormSchema>

// Form slug constants
export const FormSlugs = {
  contactForm: 'contact-form',
} as const
export type FormSlug = (typeof FormSlugs)[keyof typeof FormSlugs]
```

Use these generated types for compile-time safety:

```tsx
import { contactFormSchema, FormSlugs } from '@/generated/forms'
import type { ContactFormData } from '@/generated/forms'

const data: ContactFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'Hello!',
}

const parsed = contactFormSchema.safeParse(data)
if (!parsed.success) {
  console.error(parsed.error.issues)
}
```

### Keeping Forms in Sync

Run `pnpm pull-forms` whenever you:

- Create a new form in the Brain portal
- Add, remove, or rename fields on an existing form
- Change field types or required status

The generated file is deterministic — running it twice with the same forms produces the same output. Safe to commit and diff.

### Custom output path

```bash
npx growth-engine-pull-forms --output src/types/forms.ts
```

### Required environment variables

The pull-forms script reads from `.env`:

| Variable | Purpose |
|----------|---------|
| `BRAIN_API_KEY` | Authenticates with the Brain API |
| `BRAIN_URL` | URL of the Brain instance |

## Type Reference

These types are available from `@growth-engine/types`:

```typescript
type FormFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'number' | 'url'

interface FormField {
  name: string          // Field identifier
  label: string         // Display label
  type: FormFieldType
  required: boolean
  placeholder?: string  // Input placeholder text
  options?: string[]    // Options for 'select' type
  order: number         // Display order
}

interface FormSettings {
  successMessage?: string              // Shown after successful submit
  submitButtonText?: string            // Custom submit button text
  notifyEmails?: string[]              // Email addresses to notify on submission
  replyToEmail?: string                // Reply-to address for notification emails
  sendConfirmationEmail?: boolean      // Send confirmation to the submitter
  confirmationEmailSubject?: string    // Custom confirmation email subject
  confirmationEmailMessage?: string    // Custom confirmation email body
}

interface Form {
  id: string
  slug: string
  name: string
  description: string | null
  fields: FormField[]
  settings: FormSettings | null
  status: 'active' | 'archived'
  createdAt: Date
  updatedAt: Date
}

interface FormSubmission {
  id: string
  formId: string
  data: Record<string, unknown>
  metadata: Record<string, unknown> | null
  createdAt: Date
}
```

## Template Pages

The scaffolded client app includes two form pages:

### Contact Page (`/contact`)

- Uses the well-known slug `contact-form` (pre-seeded during onboarding)
- Two-column layout: form on the left, business info on the right
- Tracks analytics events: `contact_view` on page load, `contact_form_submit` on successful submit
- Renders all fields dynamically from the form definition

### Dynamic Form Page (`/forms/[slug]`)

- Renders any form by slug from the URL
- Shows form name and description
- Handles loading, error (form not found), and success states
- Works with any form created in the Brain portal
