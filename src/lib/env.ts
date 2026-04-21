/**
 * Environment variable checker.
 * All vars are technically optional — the app runs without them —
 * but this module logs exactly which features are degraded so devs
 * aren't left guessing why something silently does nothing.
 */

interface EnvVar {
	name: string
	value: string | undefined
	description: string
	required: boolean
}

function isSet(value: string | undefined): boolean {
	return value !== undefined && value.trim().length > 0
}

function maskValue(value: string): string {
	if (value.length <= 8) return '••••'
	return value.slice(0, 4) + '••••' + value.slice(-4)
}

export function checkEnv(): void {
	const vars: EnvVar[] = [
		// Required
		{ name: 'BRAIN_API_URL', value: process.env.BRAIN_API_URL, description: 'Brain API endpoint for forms and CRM integration', required: true },
		{ name: 'BRAIN_API_KEY', value: process.env.BRAIN_API_KEY, description: 'Brain API authentication key', required: true },
		{ name: 'TURSO_DATABASE_URL', value: process.env.TURSO_DATABASE_URL, description: 'Turso database connection URL for blog system', required: true },
		{ name: 'TURSO_AUTH_TOKEN', value: process.env.TURSO_AUTH_TOKEN, description: 'Turso database authentication token', required: true },
		{ name: 'RESEND_API_KEY', value: process.env.RESEND_API_KEY, description: 'Resend API key for contact form emails', required: true },
		{ name: 'CONTACT_EMAIL', value: process.env.CONTACT_EMAIL, description: 'Email address that receives contact form submissions', required: true },
		// Optional
		{ name: 'SITE_URL', value: process.env.SITE_URL, description: 'Public site URL for sitemap.xml and robots.txt', required: false },
		{ name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID', value: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, description: 'Google Analytics measurement ID', required: false },
		{ name: 'DEFAULT_LANGUAGE', value: process.env.DEFAULT_LANGUAGE, description: 'Default language code (defaults to "en")', required: false },
		{ name: 'ADDITIONAL_LANGUAGES', value: process.env.ADDITIONAL_LANGUAGES, description: 'Comma-separated additional language codes', required: false },
	]

	const divider = '─'.repeat(60)
	const lines: string[] = []

	lines.push('')
	lines.push(divider)
	lines.push(' Growth Engine — Environment Check')
	lines.push(divider)

	let hasMissingRequired = false

	// Required variables
	lines.push(' Required:')
	for (const v of vars.filter((v) => v.required)) {
		if (isSet(v.value)) {
			lines.push(`   ✓ ${v.name} = ${maskValue(v.value!)}`)
			lines.push(`     ${v.description}`)
		} else {
			hasMissingRequired = true
			lines.push(`   ✗ ${v.name} — MISSING`)
			lines.push(`     ${v.description}`)
		}
	}

	// Optional variables
	lines.push(' Optional:')
	for (const v of vars.filter((v) => !v.required)) {
		if (isSet(v.value)) {
			lines.push(`   ✓ ${v.name} = ${maskValue(v.value!)}`)
			lines.push(`     ${v.description}`)
		} else {
			lines.push(`   ℹ ${v.name} — not configured`)
			lines.push(`     ${v.description}`)
		}
	}

	// Summary
	lines.push(divider)
	if (hasMissingRequired) {
		lines.push(' ✗ INCOMPLETE — missing required environment variables')
	} else {
		lines.push(' ✓ All required environment variables are set')
	}
	lines.push(divider)
	lines.push('')

	// Output — use warn for missing required so it stands out
	for (const line of lines) {
		if (line.includes('✗')) {
			console.warn(line)
		} else {
			console.log(line)
		}
	}
}
