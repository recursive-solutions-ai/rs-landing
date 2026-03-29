# Forms Guide

This guide covers how to build type-safe forms in your client site using the Growth Engine SDK.

## How It Works

1. You create forms visually in the **Brain portal** (fields, validation, settings)
2. You run `npm run pull-forms` to generate TypeScript types and Zod schemas locally
3. You build your form UI using the generated types and SDK hooks
4. On submit, data is validated client-side (Zod) and server-side, then stored in your Turso database
5. Submissions with email/name fields automatically create CRM contacts

## Quick Start

### 1. Create a form in the Brain portal

Go to **Portal > Content > Forms** and click **+ New form**. Add fields using the form builder:

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

### 2. Pull form definitions

```bash
npm run pull-forms
```

This fetches your form definitions from the Brain and generates `src/generated/forms.ts` containing:

- **Zod schemas** for each form (e.g. `contactFormSchema`)
- **TypeScript types** inferred from the schemas (e.g. `ContactFormData`)
- **Slug constants** for type-safe form references (e.g. `FormSlugs.contactForm`)

**Commit this file** so other developers get the types without needing Brain access.

### 3. Build your form component

```tsx
'use client'

import { useState } from 'react'
import { useForm, submitForm } from '@growth-engine/sdk-client'
import { contactFormSchema, FormSlugs } from '@/generated/forms'
import type { ContactFormData } from '@/generated/forms'

export function ContactForm() {
  const { form, loading } = useForm(FormSlugs.contactForm)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (loading || !form) return <div>Loading...</div>

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data: Record<string, unknown> = {}
    for (const field of form!.fields) {
      if (field.type === 'checkbox') {
        data[field.name] = formData.has(field.name)
      } else if (field.type === 'number') {
        data[field.name] = formData.get(field.name)
      } else {
        data[field.name] = formData.get(field.name) ?? ''
      }
    }

    // Validate locally first (optional — submitForm also validates)
    const parsed = contactFormSchema.safeParse(data)
    if (!parsed.success) {
      setError(parsed.error.issues.map(i => i.message).join(', '))
      setSubmitting(false)
      return
    }

    const result = await submitForm(FormSlugs.contactForm, parsed.data)
    setSubmitting(false)

    if (result.ok) {
      setSuccess(true)
    } else {
      setError(result.error ?? 'Submission failed')
    }
  }

  if (success) {
    return <p>{form.settings?.successMessage ?? 'Thank you!'}</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      {form.fields
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
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <input
                id={field.name}
                name={field.name}
                type="checkbox"
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
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
  email: 'user@example.com',
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

## Generated Types

After running `npm run pull-forms`, the generated file looks like this:

```typescript
// src/generated/forms.ts (auto-generated — do not edit manually)

import { z } from 'zod'

// --- contact-form ---
export const contactFormSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(1),
})
export type ContactFormData = z.infer<typeof contactFormSchema>

// --- newsletter ---
export const newsletterSchema = z.object({
  email: z.string().email(),
})
export type NewsletterData = z.infer<typeof newsletterSchema>

// Form slug constants
export const FormSlugs = {
  contactForm: 'contact-form',
  newsletter: 'newsletter',
} as const
export type FormSlug = (typeof FormSlugs)[keyof typeof FormSlugs]
```

Use these generated types to get compile-time safety:

```tsx
import { contactFormSchema } from '@/generated/forms'
import type { ContactFormData } from '@/generated/forms'

// TypeScript knows the exact shape of your form data
const data: ContactFormData = {
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'jane@example.com',
  message: 'Hello!',
}

// Zod validates at runtime
const parsed = contactFormSchema.safeParse(data)
if (!parsed.success) {
  console.error(parsed.error.issues)
}
```

## Keeping Forms in Sync

Run `npm run pull-forms` whenever you:

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
  name: string          // snake_case field identifier
  label: string         // Display label
  type: FormFieldType
  required: boolean
  placeholder?: string  // Input placeholder text
  options?: string[]    // Options for 'select' type
  order: number         // Display order
}

interface FormSettings {
  successMessage?: string     // Shown after successful submit
  submitButtonText?: string   // Custom submit button text
  notifyEmails?: string[]     // Email addresses to notify on submission
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

## CRM Integration

When a form submission includes fields named `email`, `first_name`, `last_name`, `phone`, or `company` (case-insensitive), the SDK server automatically creates a CRM contact. This happens transparently — it will not cause the form submission to fail if the CRM insert has an issue. Contacts are deduplicated by email address.
