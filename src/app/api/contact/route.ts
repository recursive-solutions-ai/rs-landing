// RESEND direct email sending is commented out.
// Contact form submissions now go through the Growth Engine SDK
// via submitForm("contact-form", data) → /api/rs/forms endpoint.
// The Brain backend handles email notifications and confirmations.

import { NextResponse } from "next/server"

export async function POST() {
	return NextResponse.json(
		{ error: "This endpoint is deprecated. Use the Growth Engine SDK form submission instead." },
		{ status: 410 }
	)
}

// import { Resend } from "resend"
//
// const resend = new Resend(process.env.RESEND_API_KEY)
//
// export async function POST(request: Request) {
// 	console.log("[contact] POST received")
//
// 	// Check env vars up front
// 	if (!process.env.RESEND_API_KEY) {
// 		console.error("[contact] RESEND_API_KEY is not set")
// 	} else {
// 		console.log("[contact] RESEND_API_KEY present (starts with:", process.env.RESEND_API_KEY.slice(0, 6) + "...)")
// 	}
//
// 	try {
// 		const body = await request.json()
// 		const { name, email, phone, business, message } = body
// 		console.log("[contact] payload:", { name, email, phone, business, messageLength: message?.length })
//
// 		if (!name || !email || !message) {
// 			console.warn("[contact] Missing required fields")
// 			return NextResponse.json(
// 				{ error: "Name, email, and message are required." },
// 				{ status: 400 }
// 			)
// 		}
//
// 		const to = process.env.CONTACT_EMAIL
// 		if (!to) {
// 			console.error("[contact] CONTACT_EMAIL env variable is not set")
// 			return NextResponse.json(
// 				{ error: "Server configuration error." },
// 				{ status: 500 }
// 			)
// 		}
//
// 		console.log("[contact] Sending email to:", to)
//
// 		const { data, error } = await resend.emails.send({
// 			from: "Recursive Solutions <hello@recursive-solutions.com>",
// 			to,
// 			subject: `New contact from ${name}`,
// 			replyTo: email,
// 			text: [
// 				`Name: ${name}`,
// 				`Email: ${email}`,
// 				...(phone ? [`Phone: ${phone}`] : []),
// 				...(business ? [`Business: ${business}`] : []),
// 				``,
// 				`Message:`,
// 				message,
// 			].join("\n"),
// 		})
//
// 		if (error) {
// 			console.error("[contact] Resend API error:", error)
// 			return NextResponse.json(
// 				{ error: "Failed to send message. Please try again." },
// 				{ status: 500 }
// 			)
// 		}
//
// 		console.log("[contact] Email sent successfully, id:", data?.id)
// 		return NextResponse.json({ success: true, id: data?.id })
// 	} catch (error) {
// 		console.error("[contact] Unexpected error:", error)
// 		return NextResponse.json(
// 			{ error: "Failed to send message. Please try again." },
// 			{ status: 500 }
// 		)
// 	}
// }
