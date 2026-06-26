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

export async function safeQuery<T>(fallback: T, query: () => Promise<T>): Promise<T> {
	try {
		return await query()
	} catch (err) {
		console.error('[GrowthEngine] content query failed, rendering fallback:', err)
		return fallback
	}
}
