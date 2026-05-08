import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'simda2026'
const SESSION_TOKEN  = 'simda_admin_session'
const TOKEN_VALUE    = 'authenticated'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const cookieStore = await cookies()
  cookieStore.set(SESSION_TOKEN, TOKEN_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: '/',
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_TOKEN)
  return NextResponse.json({ ok: true })
}

// 인증 확인 헬퍼 (다른 API에서 import해서 사용)
export async function checkAdminAuth(req: NextRequest): Promise<boolean> {
  const sessionCookie = req.cookies.get(SESSION_TOKEN)
  return sessionCookie?.value === TOKEN_VALUE
}
