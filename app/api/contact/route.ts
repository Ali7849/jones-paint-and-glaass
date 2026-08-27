import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, store, message } = body
    const formTypeLabel = body.formType === 'quote-request' ? 'Quote Request' : 'General Inquiry'

    if (!firstName || !lastName || !email || !message || !store) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

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
      to: process.env.SMTP_TO,
      replyTo: email,
        subject: `New ${formTypeLabel} from ${firstName} ${lastName}`,
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
            This email was sent from the Jones Paint & Glass contact form.
            Reply directly to this email to respond to ${firstName}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}