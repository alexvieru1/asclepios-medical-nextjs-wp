import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactFormSchema } from "@/lib/validators/contact-form"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parseResult = contactFormSchema.safeParse(json)

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Date invalide.", details: parseResult.error.flatten() },
        { status: 422 }
      )
    }

    const body = parseResult.data

    if (body.website) {
      return NextResponse.json({ success: true, message: "Mulțumim!" })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY")
      return NextResponse.json(
        { error: "Server configuration error (missing API key)" },
        { status: 500 }
      )
    }

    const resend = new Resend(resendApiKey)
    const fromEmail = "Asclepios Cardio <noreply@asclepios-medical.ro>" 
    const toEmail = process.env.CONTACT_EMAIL || "contact@asclepios-medical.ro" 

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Solicitare nouă de la ${body.name}`,
      replyTo: body.email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Solicitare nouă de programare</h2>
          <p><strong>Nume:</strong> ${body.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
          <p><strong>Telefon:</strong> <a href="tel:${body.phone}">${body.phone}</a></p>
          <p><strong>Specialitate:</strong> ${body.specialty}</p>
          <p><strong>Medic:</strong> ${body.doctor || "Nespecificat"}</p>
          <p><strong>Data preferată:</strong> ${body.preferredDate || "Nespecificată"}</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3>Mesaj:</h3>
            <p style="white-space: pre-wrap;">${body.message || "Fără mesaj"}</p>
          </div>
          
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />
          <p style="color: #666; font-size: 12px;">Acest email a fost trimis automat de pe site-ul asclepios-medical.ro via Resend.</p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "A apărut o eroare la trimiterea emailului." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Contact API error:", error.message)
    }
    return NextResponse.json(
      { error: "Date invalide sau eroare de server." },
      { status: 400 }
    )
  }
}

