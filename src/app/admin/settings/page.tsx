'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X, GripVertical, Save, Check, Link as LinkIcon, Upload, Loader2 } from 'lucide-react'
import type { SiteSettings, HeroImage, SectionCard, AboutImages } from '@/types'
import ImageUploadInput from '@/components/admin/ImageUploadInput'

const TEXT_FIELDS = [
  {
    section: '홈 페이지',
    fields: [
      { key: 'homeTagline',   label: '태그라인',        placeholder: 'Suncheon · Since 2016', multiline: false },
      { key: 'homeHeading',   label: '메인 제목',        placeholder: '사람, 지역,\n기록, 기획.', multiline: true },
      { key: 'homeSubtext',   label: '서브 텍스트',      placeholder: '심다는 순천을 기반으로...', multiline: true },
      { key: 'homeBrandText', label: '브랜드 소개 문구', placeholder: '책방을 졸업한 뒤에도...', multiline: true },
      { key: 'homeCtaText',   label: 'CTA 문구',         placeholder: '함께 만들고 싶은\n일이 있으신가요?', multiline: true },
    ],
  },
  {
    section: 'About 페이지',
    fields: [
      { key: 'aboutHeading', label: '제목',     placeholder: '기록하고 만들고\n연결하는 일.', multiline: true },
      { key: 'aboutIntro1',  label: '소개글 1', placeholder: '심다는 2016년...', multiline: true },
      { key: 'aboutIntro2',  label: '소개글 2', placeholder: '2026년 2월...', multiline: true },
      { key: 'aboutIntro3',  label: '소개글 3', placeholder: '사진 아카이브...', multiline: true },
    ],
  },
  {
    section: 'Archive 페이지',
    fields: [
      { key: 'archiveHeading', label: '제목',       placeholder: '일상 아카이브', multiline: false },
      { key: 'archiveSubtext', label: '서브 텍스트', placeholder: '사진과 소리로...', multiline: true },
    ],
  },
  {
    section: 'Publishing 페이지',
    fields: [
      { key: 'publishingHeading', label: '제목',       placeholder: '지역의 작은\n이야기들.', multiline: true },
      { key: 'publishingSubtext', label: '서브 텍스트', placeholder: '사라지기 전에...', multiline: true },
    ],
  },
  {
    section: 'Program 페이지',
    fields: [
      { key: 'programHeading', label: '제목',       placeholder: '소리 풍경 속을\n함께 걷습니다.', multiline: true },
      { key: 'programSubtext', label: '서브 텍스트', placeholder: 'Sound Walking —...', multiline: true },
    ],
  },
  {
    section: 'Goods 페이지',
    fields: [
      { key: 'goodsHeading', label: '제목',       placeholder: '순천의 풍경을\n일상 속으로.', multiline: true },
      { key: 'goodsSubtext', label: '서브 텍스트', placeholder: '마그넷, 노트, 엽서...', multiline: true },
    ],
  },
  {
    section: 'Projects 페이지',
    fields: [
      { key: 'projectsHeading', label: '제목',       placeholder: '함께 만들어온\n것들.', multiline: true },
      { key: 'projectsSubtext', label: '서브 텍스트', placeholder: '사진, 사운드, 출판...', multiline: true },
    ],
  },
  {
    section: 'Contact 페이지',
    fields: [
      { key: 'contactHeading', label: '제목',       placeholder: '연락해 주세요.', multiline: false },
      { key: 'contactSubtext', label: '서브 텍스트', placeholder: '촬영, 출판, 굿즈...', multiline: true },
    ],
  },
]

const SECTION_LABELS: Record<string, string> = {
  archive:    'Archive (기록하는 일)',
  publishing: 'Publishing (만드는 일)',
  program:    'Program (걷는 일)',
  goods:      'Goods (남기는 일)',
}

const DEFAULT_CARDS: SectionCard[] = [
  { id: 'archive',    imageUrl: '', imageOverlay: 40 },
  { id: 'publishing', imageUrl: '', imageOverlay: 20 },
  { id: 'program',    imageUrl: '', imageOverlay: 40 },
  { id: 'goods',      imageUrl: '', imageOverlay: 20 },
]

const DEFAULT_ABOUT_IMAGES: AboutImages = {
  introImage: '',
  valueImages: { people: '', place: '', archive: '', curation: '' },
}

type TabKey = 'hero' | 'cards' | 'about' | 'texts'

export default function AdminSettingsPage() {
  const router = useRouter()

  const [settings, setSettings]           = useState<SiteSettings | null>(null)
  const [texts, setTexts]                 = useState<Record<string, string>>({})
  const [heroImages, setHeroImages]       = useState<HeroImage[]>([])
  const [heroInterval, setHeroInterval]   = useState(5)
  const [sectionCards, setSectionCards]   = useState<SectionCard[]>(DEFAULT_CARDS)
  const [aboutImages, setAboutImages]     = useState<AboutImages>(DEFAULT_ABOUT_IMAGES)
  const [newHeroUrl, setNewHeroUrl]       = useState('')
  const [heroUrlError, setHeroUrlError]   = useState('')
  const [heroUploading, setHeroUploading] = useState(false)
  const heroFileInputRef = useRef<HTMLInputElement>(null)
  const [savingTexts, setSavingTexts]     = useState(false)
  const [savingHero, setSavingHero]       = useState(false)
  const [savingCards, setSavingCards]     = useState(false)
  const [savingAbout, setSavingAbout]     = useState(false)
  const [savedTexts, setSavedTexts]       = useState(false)
  const [savedHero, setSavedHero]         = useState(false)
  const [savedCards, setSavedCards]       = useState(false)
  const [savedAbout, setSavedAbout]       = useState(false)
  const [activeTab, setActiveTab]         = useState<TabKey>('hero')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then((data: SiteSettings) => {
        setSettings(data)
        setTexts(data.texts as unknown as Record<string, string>)
        setHeroImages(data.heroImages ?? [])
        setHeroInterval(data.heroInterval ?? 5)
        setSectionCards(
          DEFAULT_CARDS.map(def => {
            const saved = (data.sectionCards ?? []).find(c => c.id === def.id)
            return saved ? { ...def, ...saved } : def
          })
        )
        setAboutImages({
          introImage: data.aboutImages?.introImage ?? '',
          valueImages: {
            people:   data.aboutImages?.valueImages?.people   ?? '',
            place:    data.aboutImages?.valueImages?.place    ?? '',
            archive:  data.aboutImages?.valueImages?.archive  ?? '',
            curation: data.aboutImages?.valueImages?.curation ?? '',
          },
        })
      })
  }, [])

  // ── 히어로 이미지 ─────────────────────────────────────
  const addHeroUrl = () => {
    const url = newHeroUrl.trim()
    if (!url) return
    if (!/^https?:\/\/.+/.test(url)) {
      setHeroUrlError('http:// 또는 https:// 로 시작하는 URL을 입력해주세요.')
      return
    }
    if (heroImages.length >= 5) {
      setHeroUrlError('히어로 이미지는 최대 5장까지 등록할 수 있습니다.')
      return
    }
    setHeroUrlError('')
    setHeroImages(prev => [...prev, { url, alt: '', overlay: 40 }])
    setNewHeroUrl('')
  }

  const handleHeroFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (heroImages.length >= 5) {
      setHeroUrlError('히어로 이미지는 최대 5장까지 등록할 수 있습니다.')
      return
    }
    setHeroUrlError('')
    setHeroUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        setHeroUrlError(data.error ?? '업로드에 실패했습니다.')
      } else {
        setHeroImages(prev => [...prev, { url: data.url, alt: '', overlay: 40 }])
      }
    } catch {
      setHeroUrlError('업로드 중 오류가 발생했습니다.')
    } finally {
      setHeroUploading(false)
      if (heroFileInputRef.current) heroFileInputRef.current.value = ''
    }
  }

  const removeHeroImage = (idx: number) =>
    setHeroImages(prev => prev.filter((_, i) => i !== idx))

  const moveHeroImage = (idx: number, dir: -1 | 1) => {
    const next = idx + dir
    if (next < 0 || next >= heroImages.length) return
    setHeroImages(prev => {
      const arr = [...prev]
      ;[arr[idx], arr[next]] = [arr[next], arr[idx]]
      return arr
    })
  }

  const updateHeroOverlay = (idx: number, val: number) =>
    setHeroImages(prev => prev.map((img, i) => i === idx ? { ...img, overlay: val } : img))

  const saveHeroImages = async () => {
    setSavingHero(true)
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'heroImages', images: heroImages, interval: heroInterval }),
    })
    setSavingHero(false)
    setSavedHero(true)
    setTimeout(() => setSavedHero(false), 2500)
  }

  // ── 섹션 카드 ─────────────────────────────────────────
  const updateCard = (id: string, field: keyof SectionCard, value: string | number) =>
    setSectionCards(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))

  const saveSectionCards = async () => {
    setSavingCards(true)
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'sectionCards', cards: sectionCards }),
    })
    setSavingCards(false)
    setSavedCards(true)
    setTimeout(() => setSavedCards(false), 2500)
  }

  // ── About 이미지 ──────────────────────────────────────
  const saveAboutImages = async () => {
    setSavingAbout(true)
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'aboutImages', aboutImages }),
    })
    setSavingAbout(false)
    setSavedAbout(true)
    setTimeout(() => setSavedAbout(false), 2500)
  }

  // ── 텍스트 ────────────────────────────────────────────
  const saveTexts = async () => {
    setSavingTexts(true)
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'texts', texts }),
    })
    setSavingTexts(false)
    setSavedTexts(true)
    setTimeout(() => setSavedTexts(false), 2500)
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
        <p className="text-[#a0a0a0] text-sm">불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* 헤더 */}
      <header className="bg-white border-b border-[#efefef] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors"
          >
            <ArrowLeft size={14} /> 대시보드
          </button>
          <span className="text-base font-semibold text-[#0a0a0a]">사이트 설정</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* 탭 */}
        <div className="flex gap-1 bg-[#efefef] rounded-full p-1 w-fit mb-8 flex-wrap">
          {([
            ['hero',  '히어로 이미지'],
            ['cards', '섹션 카드'],
            ['about', 'About 이미지'],
            ['texts', '페이지 텍스트'],
          ] as [TabKey, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === key ? 'bg-white text-[#0a0a0a] shadow-sm' : 'text-[#737373] hover:text-[#0a0a0a]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ════════════════ 히어로 이미지 탭 ════════════════ */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            {/* 안내 배너 */}
            <div className="bg-[#eefaf0] border border-[#b8e8c0] rounded-2xl p-5">
              <p className="text-sm font-semibold text-[#1a7a3a] mb-1">📌 사진 업로드 안내</p>
              <p className="text-xs text-[#1a7a3a] leading-relaxed">
                &quot;사진 선택&quot; 버튼으로 사진을 올리면 Cloudflare R2에 안전하게 저장되고, 링크가 자동으로 입력됩니다.
                외부 URL(Imgur 등)을 직접 붙여넣어도 됩니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#efefef] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-[#0a0a0a]">히어로 이미지</h2>
                  <p className="text-xs text-[#a0a0a0] mt-0.5">최대 5장 · 이미지별 불투명도(어둡기) 개별 설정 가능</p>
                </div>
                <span className="text-sm text-[#a0a0a0]">{heroImages.length} / 5</span>
              </div>

              {/* 사진 추가: 파일 업로드 + URL 직접 입력 */}
              {heroImages.length < 5 && (
                <div className="mb-6">
                  <label className="block text-xs text-[#737373] mb-2">사진 추가</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => heroFileInputRef.current?.click()}
                      disabled={heroUploading}
                      className="px-4 py-3 bg-[#0a0a0a] text-white text-sm rounded-xl hover:bg-[#262626] transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                    >
                      {heroUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      {heroUploading ? '업로드 중...' : '사진 선택'}
                    </button>
                    <input
                      ref={heroFileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={handleHeroFileSelect}
                    />
                  </div>
                  <p className="text-xs text-[#c8c8c8] mt-2 mb-2">또는 외부 이미지 URL 직접 입력:</p>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8c8c8]" />
                      <input
                        type="url"
                        value={newHeroUrl}
                        onChange={e => { setNewHeroUrl(e.target.value); setHeroUrlError('') }}
                        onKeyDown={e => e.key === 'Enter' && addHeroUrl()}
                        placeholder="https://i.imgur.com/example.jpg"
                        className="w-full text-sm border border-[#efefef] rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:border-[#a0a0a0] transition-colors placeholder:text-[#d0d0d0]"
                      />
                    </div>
                    <button
                      onClick={addHeroUrl}
                      className="px-4 py-3 bg-white border border-[#efefef] text-[#0a0a0a] text-sm rounded-xl hover:bg-[#f8f8f8] transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Plus size={14} /> 추가
                    </button>
                  </div>
                  {heroUrlError && <p className="text-xs text-red-500 mt-1.5">{heroUrlError}</p>}
                </div>
              )}

              {/* 이미지 목록 */}
              {heroImages.length > 0 ? (
                <div className="space-y-4">
                  {heroImages.map((img, i) => (
                    <div key={i} className="bg-[#f8f8f8] rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        {/* 순서 이동 */}
                        <div className="flex flex-col gap-0.5 items-center shrink-0">
                          <button onClick={() => moveHeroImage(i, -1)} disabled={i === 0}
                            className="text-[#c8c8c8] hover:text-[#0a0a0a] disabled:opacity-20 transition-colors text-xs leading-none">▲</button>
                          <GripVertical size={14} className="text-[#c8c8c8]" />
                          <button onClick={() => moveHeroImage(i, 1)} disabled={i === heroImages.length - 1}
                            className="text-[#c8c8c8] hover:text-[#0a0a0a] disabled:opacity-20 transition-colors text-xs leading-none">▼</button>
                        </div>
                        {/* 미리보기 */}
                        <div className="w-20 h-12 rounded-lg overflow-hidden bg-[#efefef] shrink-0 relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.url} alt="" className="w-full h-full object-cover"
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                          <div className="absolute inset-0 bg-black rounded-lg"
                            style={{ opacity: (img.overlay ?? 40) / 100 }} />
                        </div>
                        {/* URL */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#0a0a0a] mb-0.5">이미지 {i + 1}</p>
                          <p className="text-xs text-[#a0a0a0] truncate">{img.url}</p>
                        </div>
                        {/* 삭제 */}
                        <button onClick={() => removeHeroImage(i)}
                          className="w-7 h-7 rounded-full bg-[#efefef] hover:bg-red-100 flex items-center justify-center transition-colors shrink-0">
                          <X size={13} className="text-[#737373]" />
                        </button>
                      </div>

                      {/* 불투명도 슬라이더 */}
                      <div className="pl-8">
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs text-[#737373]">어둡기 (불투명도)</label>
                          <span className="text-xs font-semibold text-[#0a0a0a]">{img.overlay ?? 40}%</span>
                        </div>
                        <input
                          type="range" min={0} max={90} step={5}
                          value={img.overlay ?? 40}
                          onChange={e => updateHeroOverlay(i, Number(e.target.value))}
                          className="w-full accent-[#0a0a0a]"
                        />
                        <div className="flex justify-between text-[10px] text-[#c8c8c8] mt-0.5">
                          <span>밝게 (0%)</span>
                          <span>어둡게 (90%)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-[#a0a0a0] py-6">
                  이미지 URL을 추가하면 히어로 슬라이드쇼가 활성화됩니다.
                </p>
              )}
            </div>

            {/* 슬라이드 간격 */}
            <div className="bg-white rounded-2xl border border-[#efefef] p-6">
              <h3 className="text-sm font-semibold text-[#0a0a0a] mb-4">슬라이드 전환 간격</h3>
              <div className="flex items-center gap-4">
                <input type="range" min={3} max={15} step={1} value={heroInterval}
                  onChange={e => setHeroInterval(Number(e.target.value))}
                  className="flex-1 accent-[#0a0a0a]" />
                <span className="text-sm font-semibold text-[#0a0a0a] w-12 text-right">{heroInterval}초</span>
              </div>
              <p className="text-xs text-[#a0a0a0] mt-2">각 이미지가 표시되는 시간 (3초 ~ 15초)</p>
            </div>

            <button onClick={saveHeroImages} disabled={savingHero}
              className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                savedHero ? 'bg-[#4a8c2a] text-white' : 'bg-[#0a0a0a] text-white hover:bg-[#262626]'
              } disabled:opacity-50`}>
              {savedHero ? <><Check size={16} /> 저장됐습니다!</> : savingHero ? '저장 중...' : <><Save size={16} /> 히어로 이미지 저장</>}
            </button>
          </div>
        )}

        {/* ════════════════ 섹션 카드 탭 ════════════════ */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            <div className="bg-[#f0f4ff] border border-[#c8d4f8] rounded-2xl p-5">
              <p className="text-sm font-semibold text-[#3050b0] mb-1">📌 홈 섹션 카드 이미지</p>
              <p className="text-xs text-[#3050b0] leading-relaxed">
                스크롤 내리면 보이는 Archive·Publishing·Program·Goods 4개 카드의 배경 이미지를 설정합니다.<br />
                이미지가 없으면 기존 단색 배경이 표시됩니다.
              </p>
            </div>

            {sectionCards.map(card => (
              <div key={card.id} className="bg-white rounded-2xl border border-[#efefef] p-6 space-y-4">
                <h2 className="text-sm font-semibold text-[#0a0a0a] pb-3 border-b border-[#f0f0f0]">
                  {SECTION_LABELS[card.id]}
                </h2>

                {/* 배경 사진 */}
                <div>
                  <label className="block text-xs text-[#737373] mb-1.5">배경 사진</label>
                  <ImageUploadInput
                    value={card.imageUrl ?? ''}
                    onChange={url => updateCard(card.id, 'imageUrl', url)}
                    placeholder="https://... (비워두면 단색 배경)"
                  />
                </div>

                {/* 미리보기 + 불투명도 */}
                <div className="flex gap-4 items-start">
                  <div className="w-28 rounded-xl overflow-hidden bg-[#efefef] shrink-0 relative aspect-video">
                    {card.imageUrl?.startsWith('http') && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={card.imageUrl} alt="" className="w-full h-full object-cover"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        <div className="absolute inset-0 bg-black"
                          style={{ opacity: (card.imageOverlay ?? 30) / 100 }} />
                      </>
                    )}
                    {!card.imageUrl?.startsWith('http') && (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-[#c8c8c8]">미리보기</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs text-[#737373]">어둡기 (불투명도)</label>
                      <span className="text-xs font-semibold text-[#0a0a0a]">{card.imageOverlay ?? 30}%</span>
                    </div>
                    <input
                      type="range" min={0} max={90} step={5}
                      value={card.imageOverlay ?? 30}
                      onChange={e => updateCard(card.id, 'imageOverlay', Number(e.target.value))}
                      className="w-full accent-[#0a0a0a]"
                    />
                    <div className="flex justify-between text-[10px] text-[#c8c8c8] mt-0.5">
                      <span>밝게 (0%)</span>
                      <span>어둡게 (90%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={saveSectionCards} disabled={savingCards}
              className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                savedCards ? 'bg-[#4a8c2a] text-white' : 'bg-[#0a0a0a] text-white hover:bg-[#262626]'
              } disabled:opacity-50`}>
              {savedCards ? <><Check size={16} /> 저장됐습니다!</> : savingCards ? '저장 중...' : <><Save size={16} /> 섹션 카드 저장</>}
            </button>
          </div>
        )}

        {/* ════════════════ About 이미지 탭 ════════════════ */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-[#f0f9f0] border border-[#b8e0b8] rounded-2xl p-5">
              <p className="text-sm font-semibold text-[#2a6a2a] mb-1">📌 About 페이지 이미지 설정</p>
              <p className="text-xs text-[#2a6a2a] leading-relaxed">
                소개 섹션 오른쪽 이미지와 브랜드 철학 카드(사람/지역/기록/기획) 배경 이미지를 설정합니다.
              </p>
            </div>

            {/* 소개 이미지 */}
            <div className="bg-white rounded-2xl border border-[#efefef] p-6 space-y-4">
              <h2 className="text-sm font-semibold text-[#0a0a0a] pb-3 border-b border-[#f0f0f0]">소개 섹션 이미지</h2>
              <p className="text-xs text-[#a0a0a0]">About 페이지 상단, 소개 텍스트 오른쪽에 표시되는 사진입니다.</p>
              <div className="flex gap-4 items-start">
                <div className="w-28 shrink-0 aspect-[4/3] rounded-xl overflow-hidden bg-[#efefef]">
                  {aboutImages.introImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={aboutImages.introImage} alt="" className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs text-[#c8c8c8]">미리보기</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-[#737373] mb-1.5">사진</label>
                  <ImageUploadInput
                    value={aboutImages.introImage ?? ''}
                    onChange={url => setAboutImages(prev => ({ ...prev, introImage: url }))}
                  />
                </div>
              </div>
            </div>

            {/* 철학 카드 이미지 4개 */}
            <div className="bg-white rounded-2xl border border-[#efefef] p-6 space-y-5">
              <h2 className="text-sm font-semibold text-[#0a0a0a] pb-3 border-b border-[#f0f0f0]">브랜드 철학 카드 이미지</h2>
              <p className="text-xs text-[#a0a0a0]">사람·지역·기록·기획 4개 카드의 배경 이미지입니다. 이미지가 없으면 검정 배경으로 표시됩니다.</p>
              {([
                { key: 'people',   label: '사람 (People)' },
                { key: 'place',    label: '지역 (Place)' },
                { key: 'archive',  label: '기록 (Archive)' },
                { key: 'curation', label: '기획 (Curation)' },
              ] as { key: keyof NonNullable<AboutImages['valueImages']>; label: string }[]).map(({ key, label }) => (
                <div key={key} className="flex gap-4 items-start pb-5 border-b border-[#f8f8f8] last:border-0 last:pb-0">
                  <div className="w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-[#0a0a0a] relative">
                    {aboutImages.valueImages?.[key] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={aboutImages.valueImages[key]} alt="" className="w-full h-full object-cover opacity-50"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[10px] text-white/30">{label.split(' ')[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-[#737373] mb-1.5">{label}</label>
                    <ImageUploadInput
                      value={aboutImages.valueImages?.[key] ?? ''}
                      onChange={url => setAboutImages(prev => ({
                        ...prev,
                        valueImages: { ...prev.valueImages, [key]: url },
                      }))}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={saveAboutImages} disabled={savingAbout}
              className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                savedAbout ? 'bg-[#4a8c2a] text-white' : 'bg-[#0a0a0a] text-white hover:bg-[#262626]'
              } disabled:opacity-50`}>
              {savedAbout ? <><Check size={16} /> 저장됐습니다!</> : savingAbout ? '저장 중...' : <><Save size={16} /> About 이미지 저장</>}
            </button>
          </div>
        )}

        {/* ════════════════ 텍스트 탭 ════════════════ */}
        {activeTab === 'texts' && (
          <div className="space-y-6">
            {TEXT_FIELDS.map(({ section, fields }) => (
              <div key={section} className="bg-white rounded-2xl border border-[#efefef] p-6">
                <h2 className="text-sm font-semibold text-[#0a0a0a] mb-5 pb-3 border-b border-[#f0f0f0]">{section}</h2>
                <div className="space-y-5">
                  {fields.map(({ key, label, placeholder, multiline }) => (
                    <div key={key}>
                      <label className="block text-xs text-[#737373] mb-1.5 tracking-wide">{label}</label>
                      {multiline ? (
                        <textarea value={texts[key] ?? ''}
                          onChange={e => setTexts(prev => ({ ...prev, [key]: e.target.value }))}
                          placeholder={placeholder} rows={3}
                          className="w-full text-sm text-[#0a0a0a] border border-[#efefef] rounded-xl px-4 py-3 focus:outline-none focus:border-[#a0a0a0] transition-colors resize-y leading-relaxed placeholder:text-[#d0d0d0]" />
                      ) : (
                        <input type="text" value={texts[key] ?? ''}
                          onChange={e => setTexts(prev => ({ ...prev, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full text-sm text-[#0a0a0a] border border-[#efefef] rounded-xl px-4 py-3 focus:outline-none focus:border-[#a0a0a0] transition-colors placeholder:text-[#d0d0d0]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={saveTexts} disabled={savingTexts}
              className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                savedTexts ? 'bg-[#4a8c2a] text-white' : 'bg-[#0a0a0a] text-white hover:bg-[#262626]'
              } disabled:opacity-50`}>
              {savedTexts ? <><Check size={16} /> 저장됐습니다!</> : savingTexts ? '저장 중...' : <><Save size={16} /> 텍스트 저장</>}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
