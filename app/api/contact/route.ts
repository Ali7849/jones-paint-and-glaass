import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: Request) {
  const body = await req.json()
  const { firstName, lastName, email, phone, store, message, storeEmails } = body
  const isQuote = body.formType === 'quote-request'
  const formTypeLabel = isQuote ? 'Quote Request' : 'General Inquiry'
  const collection = isQuote ? 'quote-submissions' : 'contact-submissions'

  if (!firstName || !lastName || !email || !message || !store) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!storeEmails) {
    return NextResponse.json({ error: 'No store email found' }, { status: 400 })
  }

  // ── 1. Save to Payload first, so nothing is lost if email fails ──
  let submissionId: string | null = null
  try {
    const payload = await getPayload({ config })
    const doc = await (payload as any).create({
      collection,
      data: {
        fullName: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        phone: phone || '',
        store,
        message,
        sentTo: storeEmails,
        emailStatus: 'sent',
        handled: false,
      },
      overrideAccess: true,
    })
    submissionId = doc.id
  } catch (err) {
    console.error('Failed to save submission:', err)
    // Keep going — sending the email still matters
  }

  // ── 2. Send the notification email ──
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Jones Paint & Glass" <${process.env.SMTP_FROM}>`,
      to: storeEmails,
      replyTo: email,
      subject: `New ${formTypeLabel} from ${firstName} ${lastName} — ${store}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0052C6; border-bottom: 2px solid #0052C6; padding-bottom: 10px;">
            New ${formTypeLabel}
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; background: #F6F7FB; font-weight: bold; width: 35%; border: 1px solid #e5e7eb;">Name</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #F6F7FB; font-weight: bold; border: 1px solid #e5e7eb;">Email</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">
                <a href="mailto:${email}" style="color: #0052C6;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #F6F7FB; font-weight: bold; border: 1px solid #e5e7eb;">Phone</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #F6F7FB; font-weight: bold; border: 1px solid #e5e7eb;">Store Location</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${store}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #F6F7FB; font-weight: bold; border: 1px solid #e5e7eb;">Message</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>

          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This email was sent from the Jones Paint &amp; Glass contact form.
            Reply directly to this email to respond to ${firstName}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)

    // Mark the saved record so someone can follow up manually
    if (submissionId) {
      try {
        const payload = await getPayload({ config })
        await (payload as any).update({
          collection,
          id: submissionId,
          data: { emailStatus: 'failed' },
          overrideAccess: true,
        })
      } catch (updateErr) {
        console.error('Failed to flag email status:', updateErr)
      }
    }

    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}