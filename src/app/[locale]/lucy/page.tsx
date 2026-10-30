import { permanentRedirect } from "next/navigation"
import { localizedPath } from "@/lib/i18n-utils"

// Lucy now lives on the homepage.
export default async function LucyPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	permanentRedirect(localizedPath("/", locale))
}
