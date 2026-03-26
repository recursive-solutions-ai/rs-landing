import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { name, email, message } = body

		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Name, email, and message are required." },
				{ status: 400 }
			)
		}

		const to = process.env.CONTACT_EMAIL
		if (!to) {
			console.error("CONTACT_EMAIL env variable is not set")
			return NextResponse.json(
				{ error: "Server configuration error." },
				{ status: 500 }
			)
		}

		await resend.emails.send({
			from: "Recursive Solutions <onboarding@resend.dev>",
			to,
			subject: `New contact from ${name}`,
			replyTo: email,
			text: [
				`Name: ${name}`,
				`Email: ${email}`,
				``,
				`Message:`,
				message,
			].join("\n"),
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Contact form error:", error)
		return NextResponse.json(
			{ error: "Failed to send message. Please try again." },
			{ status: 500 }
		)
	}
}
