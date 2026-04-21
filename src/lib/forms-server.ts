import "server-only"
import { getClientDb } from "@growth-engine/sdk-server"

export type FormFieldType =
	| "text"
	| "email"
	| "tel"
	| "textarea"
	| "select"
	| "checkbox"
	| "number"
	| "url"

export interface FormField {
	name: string
	label: string
	type: FormFieldType
	required: boolean
	placeholder?: string
	options?: string[]
	order: number
}

export interface FormSettings {
	successMessage?: string
	submitButtonText?: string
	notifyEmails?: string[]
	replyToEmail?: string
	sendConfirmationEmail?: boolean
	confirmationEmailSubject?: string
	confirmationEmailMessage?: string
}

export interface FormDefinition {
	id: string
	slug: string
	name: string
	description: string | null
	fields: FormField[]
	settings: FormSettings | null
	status: "active" | "archived"
}

function parseJson<T>(value: unknown): T | null {
	if (typeof value !== "string") return null
	try {
		return JSON.parse(value) as T
	} catch {
		return null
	}
}

export async function getForm(slug: string): Promise<FormDefinition | null> {
	const tursoUrl = process.env.TURSO_DATABASE_URL
	const tursoAuthToken = process.env.TURSO_AUTH_TOKEN
	if (!tursoUrl || !tursoAuthToken) return null

	try {
		const db = getClientDb(tursoUrl, tursoAuthToken)
		const result = await db.$client.execute({
			sql: "SELECT id, slug, name, description, fields, settings, status FROM forms WHERE slug = ? LIMIT 1",
			args: [slug],
		})
		const row = result.rows[0]
		if (!row) return null

		const fields = parseJson<FormField[]>(row.fields as string) ?? []
		fields.sort((a, b) => a.order - b.order)

		const status = (row.status as string) === "archived" ? "archived" : "active"

		return {
			id: row.id as string,
			slug: row.slug as string,
			name: row.name as string,
			description: (row.description as string | null) ?? null,
			fields,
			settings: parseJson<FormSettings>(row.settings as string),
			status,
		}
	} catch (err) {
		console.warn("[getForm] Failed to load form", slug, err)
		return null
	}
}
