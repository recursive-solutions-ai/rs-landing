import { redirect } from "next/navigation"
import { localizedPath } from "@/lib/i18n-utils"

export default async function LucyV2Redirect({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	redirect(localizedPath("/", locale))
}
