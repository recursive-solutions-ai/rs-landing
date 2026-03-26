/**
 * Test the contact form API directly.
 * Usage:
 *   node scripts/test-contact-email.mjs
 *   # or test the live API:
 *   BASE_URL=https://your-domain.com node scripts/test-contact-email.mjs
 */

import { createRequire } from "module"
import { readFileSync } from "fs"
import { resolve } from "path"

// Load .env.local manually
try {
	const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf8")
	for (const line of env.split("\n")) {
		const match = line.match(/^([^#=\s]+)\s*=\s*(.*)$/)
		if (match) process.env[match[1]] = match[2].replace(/^["']|["']$/g, "")
	}
	console.log("Loaded .env.local")
} catch {
	console.warn("Could not load .env.local — using existing env vars")
}

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"

console.log("\n=== Contact Email Test ===")
console.log("Target:", BASE_URL + "/api/contact")
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY
	? `present (starts with: ${process.env.RESEND_API_KEY.slice(0, 6)}...)`
	: "MISSING ⚠️")
console.log("CONTACT_EMAIL:", process.env.CONTACT_EMAIL ?? "MISSING ⚠️")
console.log("")

const payload = {
	name: "Test User",
	email: "test@example.com",
	message: "This is a test message sent from the test script.",
}

console.log("Sending payload:", payload)
console.log("")

const res = await fetch(BASE_URL + "/api/contact", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(payload),
})

const body = await res.json().catch(() => null)

console.log("HTTP status:", res.status, res.statusText)
console.log("Response body:", JSON.stringify(body, null, 2))

if (res.ok && body?.success) {
	console.log("\n✅ Email sent successfully! Resend ID:", body.id)
} else {
	console.log("\n❌ Failed to send email.")
	console.log("   Check the server terminal for [contact] log lines.")
}
