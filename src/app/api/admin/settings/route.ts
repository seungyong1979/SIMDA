import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth } from '@/app/api/admin/auth/route'
import { getSettings, updateTexts, updateHeroImages, updateSectionCards, updateAboutImages } from '@/lib/settings'
import type { PageTexts, HeroImage, SectionCard, AboutImages } from '@/types'

// GET — 현재 설정 조회
export async function GET(req: NextRequest) {
  if (!await checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const settings = getSettings()
  return NextResponse.json(settings)
}

// PATCH — 텍스트 또는 히어로 이미지 업데이트
export async function PATCH(req: NextRequest) {
  if (!await checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()

  if (body.type === 'texts') {
    const updated = updateTexts(body.texts as Partial<PageTexts>)
    return NextResponse.json(updated)
  }

  if (body.type === 'heroImages') {
    const updated = updateHeroImages(
      body.images as HeroImage[],
      body.interval as number | undefined,
    )
    return NextResponse.json(updated)
  }

  if (body.type === 'sectionCards') {
    const updated = updateSectionCards(body.cards as SectionCard[])
    return NextResponse.json(updated)
  }

  if (body.type === 'aboutImages') {
    const updated = updateAboutImages(body.aboutImages as AboutImages)
    return NextResponse.json(updated)
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}
