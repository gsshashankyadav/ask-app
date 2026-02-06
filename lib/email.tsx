import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendYesEmail(
  to: string,
  question: string,
  name: string
) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Someone clicked YES! 🎉',
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>They said YES! 🎉</h1>
          <p>Someone just clicked YES to your question:</p>
          <blockquote style="border-left: 4px solid #ff006e; padding-left: 16px; margin: 20px 0;">
            <p style="font-size: 18px; font-weight: bold;">${question}</p>
          </blockquote>
          <p>The link has been disabled. This was a one-time question.</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Email send failed:', error)
    throw error
  }
}
