'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { cn } from '@/lib/utils'

const photoCategories = [
  { id: 'all',        label: '전체' },
  { id: 'daily',      label: '일상' },
  { id: 'event',      label: '행사' },
  { id: 'local',      label: '지역기록' },
  { id: 'aerial',     label: '항공' },
  { id: 'underwater', label: '수중' },
]

// 목 데이터 (Notion 연동 전)
const mockPhotos = [
  { id: '1', title: '순천만 일출', category: 'local',      aspect: 'aspect-[3/4]',  bg: 'bg-[#c8d4c0]' },
  { id: '2', title: '원도심 골목',  category: 'daily',      aspect: 'aspect-square', bg: 'bg-[#d4c8b8]' },
  { id: '3', title: '갈대밭 항공', category: 'aerial',     aspect: 'aspect-[4/3]',  bg: 'bg-[#b8c4c0]' },
  { id: '4', title: '지역 행사',   category: 'event',      aspect: 'aspect-[3/4]',  bg: 'bg-[#c4b8d4]' },
  { id: '5', title: '수중 풍경',   category: 'underwater', aspect: 'aspect-square', bg: 'bg-[#b8ccd4]' },
  { id: '6', title: '시장 일상',   category: 'daily',      aspect: 'aspect-[4/3]',  bg: 'bg-[#d4d0c8]' },
]

export default function ArchivePage() {
  const [activeTab, setActiveTab] = useState<'photo' | 'sound'>('photo')
  const [photoFilter, setPhotoFilter] = useState('all')

  const filtered = photoFilter === 'all'
    ? mockPhotos
    : mockPhotos.filter(p => p.category === photoFilter)

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
              일상 아카이브
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="mt-5 text-[#525252] text-base md:text-lg leading-relaxed max-w-[500px]">
              사진과 소리로 지역의 시간을 기록합니다.
              사라지기 전에, 잊히기 전에.
            </p>
          </AnimateIn>

          {/* 탭 */}
          <AnimateIn delay={240}>
            <div className="mt-12 flex gap-1 bg-[#efefef] rounded-full p-1 w-fit">
              {(['photo', 'sound'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
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
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2 mb-12">
              {photoCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPhotoFilter(cat.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm transition-all duration-300 border',
                    photoFilter === cat.id
                      ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                      : 'bg-transparent text-[#737373] border-[#dfdfdf] hover:border-[#0a0a0a] hover:text-[#0a0a0a]',
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 사진 그리드 */}
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {filtered.map((photo, i) => (
                <AnimateIn key={photo.id} delay={i * 60}>
                  <div className={cn(
                    'break-inside-avoid rounded-xl overflow-hidden group cursor-pointer',
                    photo.aspect,
                    photo.bg,
                  )}>
                    <div className="w-full h-full min-h-[200px] relative">
                      {/* 실제 이미지로 교체 예정 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-black/60">
                        <p className="text-white text-sm">{photo.title}</p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>

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
          </div>
        </section>
      )}

      {/* ── Soundscape ────────────────────────────────────────────── */}
      {activeTab === 'sound' && (
        <section className="pb-24 bg-[#fafafa]">
          <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  num: '01',
                  title: '순천만의 소리',
                  desc: '새벽 안개 속 순천만에서 채집한 소리들. 갈대 스치는 소리, 철새 울음, 물결 소리.',
                  location: '순천만 국가정원',
                  tracks: 3,
                  recordedAt: '2023년 겨울',
                  id: 'sa-1',
                },
                {
                  num: '02',
                  title: '원도심의 하루',
                  desc: '순천 원도심 시장과 골목에서 기록한 일상의 소리들.',
                  location: '순천 원도심',
                  tracks: 2,
                  recordedAt: '2024년 봄',
                  id: 'sa-2',
                },
              ].map((album, i) => (
                <AnimateIn key={album.num} delay={i * 100}>
                  <Link href={`/archive/sound/${album.id}`}>
                    <div className="group bg-[#0a0a0a] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform duration-500">
                      {/* 커버 영역 */}
                      <div className="aspect-square bg-gradient-to-br from-[#1a2a20] to-[#0a1410] relative p-8 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-white/20 text-xs tracking-[0.2em] uppercase">Sound Album</span>
                          <span className="text-white/20 text-xs">{album.tracks} tracks</span>
                        </div>
                        <div>
                          <p className="text-white/20 text-6xl font-bold tracking-tight">{album.num}</p>
                          <h3 className="text-white text-xl font-semibold mt-2">{album.title}</h3>
                        </div>
                      </div>
                      {/* 정보 영역 */}
                      <div className="p-6 space-y-3">
                        <p className="text-white/60 text-sm leading-relaxed">{album.desc}</p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="space-y-1">
                            <p className="text-white/30 text-xs">{album.location}</p>
                            <p className="text-white/30 text-xs">{album.recordedAt}</p>
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
