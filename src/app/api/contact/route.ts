import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { type, name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // 이메일 전송 (Nodemailer 또는 Resend 연동 전 — 현재는 콘솔 로그)
    // 실제 운영 시 아래 주석을 해제하고 SMTP 설정을 추가하세요
    console.log('📩 New contact form submission:', {
      type,
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    })

    // TODO: 실제 이메일 전송 로직
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'no-reply@simda.co.kr',
    //   to: 'simda@simda.co.kr',
    //   subject: `[심다 문의] ${type} — ${name}`,
    //   text: `이름: ${name}\n이메일: ${email}\n문의유형: ${type}\n\n${message}`,
    // })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Contact API error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
