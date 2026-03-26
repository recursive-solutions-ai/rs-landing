/**
 * Test Resend API directly (bypasses Next.js).
 * Run: node scripts/test-resend-direct.mjs
 */
import { Resend } from "../node_modules/resend/dist/index.mjs"
import { readFileSync } from "fs"
import { resolve } from "path"

// Load .env.local
try {
	const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf8")
	for (const line of env.split("\n")) {
		const match = line.match(/^([^#=\s]+)\s*=\s*(.*)$/)
		if (match) process.env[match[1]] = match[2].replace(/^["']|["']$/g, "")
	}
} catch {
	console.warn("Could not load .env.local")
}

const apiKey = process.env.RESEND_API_KEY
const to = process.env.CONTACT_EMAIL

console.log("RESEND_API_KEY:", apiKey ? `${apiKey.slice(0, 6)}...` : "MISSING ⚠️")
console.log("CONTACT_EMAIL:", to ?? "MISSING ⚠️")
console.log("")

if (!apiKey || !to) {
	console.error("Missing env vars — check .env.local")
	process.exit(1)
}

const resend = new Resend(apiKey)

console.log("Calling resend.emails.send()...")
const { data, error } = await resend.emails.send({
	from: "Recursive Solutions <hello@recursive-solutions.com>",
	to,
	subject: "Test email — direct Resend API call",
	text: "This is a direct Resend API test from scripts/test-resend-direct.mjs",
})

console.log("data:", JSON.stringify(data, null, 2))
console.log("error:", JSON.stringify(error, null, 2))

if (error) {
	console.log("\n❌ Resend API error:", error.name, error.message)
} else {
	console.log("\n✅ Email sent! ID:", data?.id)
}
