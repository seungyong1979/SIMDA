import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SESSION_TOKEN = 'simda_admin_session'
const TOKEN_VALUE   = 'authenticated'

export async function requireAdminAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_TOKEN)
  if (session?.value !== TOKEN_VALUE) {
    redirect('/admin/login')
  }
}

export async function isAdminAuthed(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_TOKEN)
  return session?.value === TOKEN_VALUE
}
