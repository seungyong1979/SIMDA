'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, X, MapPin, Calendar } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { cn } from '@/lib/utils'
import type { PhotoItem, SoundAlbum } from '@/types'

const PHOTO_CATEGORIES = [
  { id: 'daily',      label: '일상',    labelEn: 'Daily' },
  { id: 'event',      label: '행사',    labelEn: 'Event' },
  { id: 'local',      label: '지역기록', labelEn: 'Local' },
  { id: 'aerial',     label: '항공',    labelEn: 'Aerial' },
  { id: 'underwater', label: '수중',    labelEn: 'Underwater' },
]

interface Props {
  heading: string
  subtext: string
  photos: PhotoItem[]
  soundAlbums: SoundAlbum[]
}

export default function ArchiveClient({ heading, subtext, photos, soundAlbums }: Props) {
  const [activeTab, setActiveTab] = useState<'photo' | 'sound'>('photo')
  // 현재 열려 있는 카테고리 (null = 카테고리 목록 뷰)
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const subtextLines = subtext.split('\n')

  // 카테고리별 사진 묶기
  const photosByCategory = PHOTO_CATEGORIES.map((cat) => {
    const items = photos.filter((p) => p.category === cat.id)
    // 마지막 등록 사진 = 배열 마지막 항목 (Notion sorts by created_time desc or as-is)
    const cover = items.length > 0 ? items[items.length - 1] : null
    return { ...cat, items, cover }
  }).filter((cat) => cat.items.length > 0)  // 사진이 있는 카테고리만 표시

  // 현재 열린 카테고리의 사진들
  const openCategoryData = openCategory
    ? photosByCategory.find((c) => c.id === openCategory) ?? null
    : null

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-16 bg-[#fafafa]">
        <div className="container-site">
          <AnimateIn>
            <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">Archive</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-[1.05] text-[#0a0a0a]">
              {heading}
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="mt-5 text-[#525252] text-base md:text-lg leading-relaxed max-w-[500px]">
              {subtextLines.map((line, i) => (
                <span key={i}>{line}{i < subtextLines.length - 1 && <br />}</span>
              ))}
            </p>
          </AnimateIn>

          {/* 탭 */}
          <AnimateIn delay={240}>
            <div className="mt-12 flex gap-1 bg-[#efefef] rounded-full p-1 w-fit">
              {(['photo', 'sound'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setOpenCategory(null) }}
                  className={cn(
                    'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                    activeTab === tab
                      ? 'bg-[#0a0a0a] text-white'
                      : 'text-[#737373] hover:text-[#0a0a0a]',
                  )}
                >
                  {tab === 'photo' ? 'Photo' : 'Soundscape'}
                </button>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Photo Archive ─────────────────────────────────────────── */}
      {activeTab === 'photo' && (
        <section className="pb-24 bg-[#fafafa]">
          <div className="container-site">

            {/* ── 카테고리 목록 뷰 ── */}
            {!openCategory && (
              <>
                {photosByCategory.length === 0 ? (
                  /* 노션에 등록된 사진이 없을 때 */
                  <div className="py-20 text-center text-[#a0a0a0]">
                    <p className="text-lg mb-2">아직 등록된 사진이 없습니다.</p>
                    <p className="text-sm">노션에서 사진 아카이브 DB에 사진을 등록해 주세요.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photosByCategory.map((cat, i) => (
                      <AnimateIn key={cat.id} delay={i * 80}>
                        <button
                          onClick={() => setOpenCategory(cat.id)}
                          className="group w-full text-left"
                        >
                          {/* 커버 이미지 (마지막 등록 사진) */}
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e8e8e8] mb-4">
                            {cat.cover?.image && cat.cover.image !== '/images/placeholder.jpg' ? (
                              <Image
                                src={cat.cover.image}
                                alt={cat.cover.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e0ddd8] to-[#ccc9c4]">
                                <span className="text-[#a0a0a0] text-sm">{cat.labelEn}</span>
                              </div>
                            )}
                            {/* 다크 오버레이 + hover 효과 */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-500" />
                            {/* 사진 수 배지 */}
                            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                              {cat.items.length}장
                            </div>
                            {/* hover 시 보기 버튼 */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="bg-white text-[#0a0a0a] text-sm font-medium px-5 py-2.5 rounded-full flex items-center gap-2">
                                사진 보기 <ArrowRight size={14} />
                              </span>
                            </div>
                          </div>
                          {/* 카테고리 정보 */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs tracking-[0.15em] uppercase text-[#a0a0a0] mb-1">{cat.labelEn}</p>
                              <h3 className="text-base font-semibold text-[#0a0a0a] group-hover:text-[#525252] transition-colors duration-300">
                                {cat.label}
                              </h3>
                            </div>
                            <ArrowRight
                              size={16}
                              className="text-[#c0c0c0] group-hover:text-[#0a0a0a] group-hover:translate-x-1 transition-all duration-300"
                            />
                          </div>
                        </button>
                      </AnimateIn>
                    ))}
                  </div>
                )}

                {/* 촬영 문의 */}
                <AnimateIn>
                  <div className="mt-20 pt-12 border-t border-[#efefef] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">촬영 문의</h3>
                      <p className="text-[#737373] text-sm">일상, 행사, 항공, 수중 등 다양한 분야의 촬영을 진행합니다.</p>
                    </div>
                    <Link
                      href="/contact?type=photo"
                      className="inline-flex items-center gap-2 text-sm text-[#0a0a0a] font-medium group"
                    >
                      문의하기
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </AnimateIn>
              </>
            )}

            {/* ── 카테고리 상세 뷰 (클릭 후) ── */}
            {openCategory && openCategoryData && (
              <div>
                {/* 뒤로가기 헤더 */}
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-[#a0a0a0] mb-1">
                      {openCategoryData.labelEn}
                    </p>
                    <h2 className="text-2xl font-semibold text-[#0a0a0a]">
                      {openCategoryData.label}
                      <span className="ml-3 text-base font-normal text-[#a0a0a0]">
                        {openCategoryData.items.length}장
                      </span>
                    </h2>
                  </div>
                  <button
                    onClick={() => setOpenCategory(null)}
                    className="flex items-center gap-2 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors duration-200"
                  >
                    <X size={16} />
                    목록으로
                  </button>
                </div>

                {/* 사진 그리드 */}
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                  {openCategoryData.items.map((photo, i) => (
                    <AnimateIn key={photo.id} delay={i * 50}>
                      <div className="break-inside-avoid rounded-xl overflow-hidden group cursor-pointer bg-[#e8e8e8]">
                        <div className="relative w-full min-h-[200px]">
                          {photo.image && photo.image !== '/images/placeholder.jpg' ? (
                            <Image
                              src={photo.image}
                              alt={photo.title}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#e0ddd8] to-[#ccc9c4] flex items-center justify-center">
                              <span className="text-[#a0a0a0] text-xs">{photo.title}</span>
                            </div>
                          )}
                          {/* hover 정보 */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-black/70">
                            <p className="text-white text-sm font-medium mb-1">{photo.title}</p>
                            {photo.location && (
                              <p className="text-white/70 text-xs flex items-center gap-1">
                                <MapPin size={10} />
                                {photo.location}
                              </p>
                            )}
                            {photo.date && (
                              <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                                <Calendar size={10} />
                                {photo.date}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </AnimateIn>
                  ))}
                </div>

                {/* 촬영 문의 */}
                <AnimateIn>
                  <div className="mt-16 pt-10 border-t border-[#efefef] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">촬영 문의</h3>
                      <p className="text-[#737373] text-sm">일상, 행사, 항공, 수중 등 다양한 분야의 촬영을 진행합니다.</p>
                    </div>
                    <Link
                      href="/contact?type=photo"
                      className="inline-flex items-center gap-2 text-sm text-[#0a0a0a] font-medium group"
                    >
                      문의하기
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </AnimateIn>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ── Soundscape ────────────────────────────────────────────── */}
      {activeTab === 'sound' && (
        <section className="pb-24 bg-[#fafafa]">
          <div className="container-site">
            {soundAlbums.length === 0 ? (
              <div className="py-20 text-center text-[#a0a0a0]">
                <p className="text-lg mb-2">아직 등록된 사운드 앨범이 없습니다.</p>
                <p className="text-sm">노션에서 사운드 앨범 DB에 앨범을 등록해 주세요.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {soundAlbums.map((album, i) => (
                  <AnimateIn key={album.id} delay={i * 100}>
                    <Link href={`/archive/sound/${album.id}`}>
                      <div className="group bg-[#0a0a0a] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform duration-500">
                        {/* 커버 영역 */}
                        <div className="aspect-square relative">
                          {album.coverImage && album.coverImage !== '/images/placeholder.jpg' ? (
                            <>
                              <Image
                                src={album.coverImage}
                                alt={album.title}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a20]/80 to-[#0a1410]/80" />
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#1a2a20] to-[#0a1410]" />
                          )}
                          <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="text-white/20 text-xs tracking-[0.2em] uppercase">Sound Album</span>
                              <span className="text-white/20 text-xs">{album.tracks.length} tracks</span>
                            </div>
                            <div>
                              <p className="text-white/20 text-6xl font-bold tracking-tight">{album.albumNumber}</p>
                              <h3 className="text-white text-xl font-semibold mt-2">{album.title}</h3>
                            </div>
                          </div>
                        </div>
                        {/* 정보 영역 */}
                        <div className="p-6 space-y-3">
                          <p className="text-white/60 text-sm leading-relaxed">{album.description}</p>
                          <div className="flex items-center justify-between pt-2">
                            <div className="space-y-1">
                              {album.location && (
                                <p className="text-white/30 text-xs">{album.location}</p>
                              )}
                              {album.recordedAt && (
                                <p className="text-white/30 text-xs">{album.recordedAt}</p>
                              )}
                            </div>
                            <span className="text-white/40 text-xs group-hover:text-white/80 transition-colors duration-300 flex items-center gap-1">
                              앨범 보기 <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimateIn>
                ))}
              </div>
            )}

            {/* 사운드워킹 연결 */}
            <AnimateIn>
              <div className="mt-16 bg-[#f0ede8] rounded-2xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-3">Program</p>
                    <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-2">사운드 워킹</h3>
                    <p className="text-[#737373] text-sm leading-relaxed max-w-[420px]">
                      소리 풍경 속을 직접 걷는 프로그램. 2026년 8월 시작 예정입니다.
                    </p>
                  </div>
                  <Link
                    href="/program"
                    className="inline-flex items-center gap-2 text-sm text-[#0a0a0a] font-medium shrink-0 group"
                  >
                    프로그램 보기
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      )}
    </>
  )
}
