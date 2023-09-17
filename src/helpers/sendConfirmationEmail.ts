import sgMail from '@sendgrid/mail'

export default async function sendConfirmationEmail(to: string, token: string) {
  if (!process.env.SENDGRID_API_KEY || !process.env.ROOT_URL) {
    throw new Error('Missing sendgrid api env variable')
  }

  if (process.env.SENDMAIL === 'true') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to,
      from: 'noreply@liftpad.org',
      subject: 'LiftPad - Activate your account!',
      text: `Visit the link below to activate your account\nhttps://${process.env.ROOT_URL}/api/confirm/${token}`,
      html: `<p>Visit the link below to activate your account</p><p><a href="${process.env.ROOT_URL}/api/confirm/${token}">${process.env.ROOT_URL}/confirm/${token}</a></p>`,
    }

    try {
      const res = await sgMail.send(msg)
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log(`${process.env.ROOT_URL}/api/confirm/${token}`)
  }
}
