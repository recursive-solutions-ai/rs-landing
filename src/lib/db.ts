import "server-only"
import { getClientDb } from "@growth-engine/sdk-server"

export function getDb() {
	const url = process.env.TURSO_DATABASE_URL
	const token = process.env.TURSO_AUTH_TOKEN
	if (!url || !token) {
		throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN")
	}
	return getClientDb(url, token)
}

/**
 * Like getDb() but returns null when Turso isn't configured, so build-time
 * data collection (e.g. the optional blog) degrades to empty instead of
 * failing the production build.
 */
export function getDbOrNull() {
	const url = process.env.TURSO_DATABASE_URL
	const token = process.env.TURSO_AUTH_TOKEN
	if (!url || !token) return null
	return getClientDb(url, token)
}
