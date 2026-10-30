import { getForm } from "@/lib/forms-server"
import { ContactPageView } from "@/components/contact/ContactPageView"
import "@/components/lucy-v2/lucy-v2.css"

export default async function ContactPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const form = await getForm("free-growth-audit")
	if (!form) {
		console.error("[contact] form_unavailable", { slug: "free-growth-audit", locale })
	}
	return <ContactPageView form={form} locale={locale} />
}
