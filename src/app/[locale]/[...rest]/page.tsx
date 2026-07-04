import { notFound } from "next/navigation"

// Catch-all for unmatched paths under a valid locale: without this, Next
// renders its unbranded default 404 instead of the [locale] not-found page.
export default function CatchAllNotFound(): never {
	notFound()
}
