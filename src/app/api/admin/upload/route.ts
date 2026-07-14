import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth } from '@/app/api/admin/auth/route'
import { uploadToR2, isR2Configured } from '@/lib/r2'

export async function POST(req: NextRequest) {
  if (!await checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isR2Configured) {
    return NextResponse.json(
      { error: 'R2가 설정되지 않았습니다. 관리자에게 문의해주세요.' },
      { status: 500 }
    )
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 })
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPG/PNG/WEBP/GIF allowed' }, { status: 400 })
  }

  try {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const url = await uploadToR2(buffer, filename, file.type)

    return NextResponse.json({ url })
  } catch (e) {
    console.error('R2 upload error:', e)
    return NextResponse.json({ error: '업로드에 실패했습니다.' }, { status: 500 })
  }
}
