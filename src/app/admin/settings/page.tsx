'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X, GripVertical, Save, Check } from 'lucide-react'
import type { SiteSettings, HeroImage } from '@/types'

// 텍스트 필드 정의
const TEXT_FIELDS = [
  {
    section: '홈 페이지',
    fields: [
      { key: 'homeTagline',   label: '태그라인',          placeholder: 'Suncheon · Since 2016', multiline: false },
      { key: 'homeHeading',   label: '메인 제목',          placeholder: '사람, 지역,\n기록, 기획.', multiline: true },
      { key: 'homeSubtext',   label: '서브 텍스트',        placeholder: '심다는 순천을 기반으로...', multiline: true },
      { key: 'homeBrandText', label: '브랜드 소개 문구',   placeholder: '책방을 졸업한 뒤에도...', multiline: true },
      { key: 'homeCtaText',   label: 'CTA 문구',           placeholder: '함께 만들고 싶은\n일이 있으신가요?', multiline: true },
    ],
  },
  {
    section: 'About 페이지',
    fields: [
      { key: 'aboutHeading', label: '제목',      placeholder: '기록하고 만들고\n연결하는 일.', multiline: true },
      { key: 'aboutIntro1',  label: '소개글 1',  placeholder: '심다는 2016년...', multiline: true },
      { key: 'aboutIntro2',  label: '소개글 2',  placeholder: '2026년 2월...', multiline: true },
      { key: 'aboutIntro3',  label: '소개글 3',  placeholder: '사진 아카이브...', multiline: true },
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

export default function AdminSettingsPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [texts, setTexts] = useState<Record<string, string>>({})
  const [heroImages, setHeroImages] = useState<HeroImage[]>([])
  const [heroInterval, setHeroInterval] = useState(5)
  const [uploading, setUploading] = useState(false)
  const [savingTexts, setSavingTexts] = useState(false)
  const [savingHero, setSavingHero] = useState(false)
  const [savedTexts, setSavedTexts] = useState(false)
  const [savedHero, setSavedHero] = useState(false)
  const [activeTab, setActiveTab] = useState<'hero' | 'texts'>('hero')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then((data: SiteSettings) => {
        setSettings(data)
        setTexts(data.texts as unknown as Record<string, string>)
        setHeroImages(data.heroImages ?? [])
        setHeroInterval(data.heroInterval ?? 5)
      })
  }, [])

  // 이미지 업로드
  const handleFileUpload = async (files: FileList) => {
    if (heroImages.length >= 5) {
      alert('히어로 이미지는 최대 5장까지 등록할 수 있습니다.')
      return
    }
    const remaining = 5 - heroImages.length
    const toUpload = Array.from(files).slice(0, remaining)

    setUploading(true)
    const newImages: HeroImage[] = []
    for (const file of toUpload) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (res.ok) {
        const { url } = await res.json()
        newImages.push({ url, alt: file.name.replace(/\.[^.]+$/, '') })
      }
    }
    setHeroImages(prev => [...prev, ...newImages])
    setUploading(false)
  }

  // 이미지 삭제
  const removeImage = (idx: number) => {
    setHeroImages(prev => prev.filter((_, i) => i !== idx))
  }

  // 이미지 순서 변경 (위/아래)
  const moveImage = (idx: number, dir: -1 | 1) => {
    const next = idx + dir
    if (next < 0 || next >= heroImages.length) return
    setHeroImages(prev => {
      const arr = [...prev]
      ;[arr[idx], arr[next]] = [arr[next], arr[idx]]
      return arr
    })
  }

  // 히어로 이미지 저장
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

  // 텍스트 저장
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
        <div className="flex gap-1 bg-[#efefef] rounded-full p-1 w-fit mb-8">
          {([['hero', '히어로 이미지'], ['texts', '페이지 텍스트']] as const).map(([key, label]) => (
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

        {/* ── 히어로 이미지 탭 ── */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#efefef] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-[#0a0a0a]">히어로 이미지</h2>
                  <p className="text-xs text-[#a0a0a0] mt-0.5">최대 5장 · JPG/PNG/WEBP · 10MB 이하 · 권장 비율 16:9</p>
                </div>
                <span className="text-sm text-[#a0a0a0]">{heroImages.length} / 5</span>
              </div>

              {/* 업로드 영역 */}
              {heroImages.length < 5 && (
                <div
                  className="border-2 border-dashed border-[#dfdfdf] rounded-xl p-8 text-center cursor-pointer hover:border-[#a0a0a0] transition-colors duration-200 mb-5"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleFileUpload(e.dataTransfer.files) }}
                >
                  <Upload size={24} className="text-[#c8c8c8] mx-auto mb-2" />
                  <p className="text-sm text-[#737373]">클릭하거나 드래그해서 이미지 업로드</p>
                  <p className="text-xs text-[#a0a0a0] mt-1">남은 슬롯: {5 - heroImages.length}장</p>
                  {uploading && <p className="text-xs text-[#0a0a0a] mt-2 font-medium">업로드 중...</p>}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={e => e.target.files && handleFileUpload(e.target.files)}
              />

              {/* 이미지 목록 */}
              {heroImages.length > 0 && (
                <div className="space-y-3 mb-6">
                  {heroImages.map((img, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#f8f8f8] rounded-xl p-3">
                      {/* 순서 이동 */}
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => moveImage(i, -1)}
                          disabled={i === 0}
                          className="text-[#c8c8c8] hover:text-[#0a0a0a] disabled:opacity-20 transition-colors text-xs leading-none"
                        >▲</button>
                        <GripVertical size={14} className="text-[#c8c8c8] mx-auto" />
                        <button
                          onClick={() => moveImage(i, 1)}
                          disabled={i === heroImages.length - 1}
                          className="text-[#c8c8c8] hover:text-[#0a0a0a] disabled:opacity-20 transition-colors text-xs leading-none"
                        >▼</button>
                      </div>

                      {/* 미리보기 */}
                      <div className="w-20 h-12 rounded-lg overflow-hidden bg-[#efefef] shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={img.alt ?? ''} className="w-full h-full object-cover" />
                      </div>

                      {/* 순서 + URL */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#0a0a0a]">이미지 {i + 1}</p>
                        <p className="text-xs text-[#a0a0a0] truncate">{img.url}</p>
                      </div>

                      {/* 삭제 */}
                      <button
                        onClick={() => removeImage(i)}
                        className="w-7 h-7 rounded-full bg-[#efefef] hover:bg-red-100 flex items-center justify-center transition-colors shrink-0"
                      >
                        <X size={13} className="text-[#737373] hover:text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {heroImages.length === 0 && (
                <p className="text-center text-sm text-[#a0a0a0] py-4">
                  이미지를 업로드하면 히어로 슬라이드쇼가 활성화됩니다.
                </p>
              )}
            </div>

            {/* 슬라이드 간격 */}
            <div className="bg-white rounded-2xl border border-[#efefef] p-6">
              <h3 className="text-sm font-semibold text-[#0a0a0a] mb-4">슬라이드 전환 간격</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={3}
                  max={15}
                  step={1}
                  value={heroInterval}
                  onChange={e => setHeroInterval(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-semibold text-[#0a0a0a] w-16 text-right">{heroInterval}초</span>
              </div>
              <p className="text-xs text-[#a0a0a0] mt-2">각 이미지가 표시되는 시간 (3초 ~ 15초)</p>
            </div>

            {/* 저장 버튼 */}
            <button
              onClick={saveHeroImages}
              disabled={savingHero}
              className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                savedHero
                  ? 'bg-[#4a8c2a] text-white'
                  : 'bg-[#0a0a0a] text-white hover:bg-[#262626]'
              } disabled:opacity-50`}
            >
              {savedHero ? <><Check size={16} /> 저장됐습니다!</> : savingHero ? '저장 중...' : <><Save size={16} /> 히어로 이미지 저장</>}
            </button>
          </div>
        )}

        {/* ── 텍스트 편집 탭 ── */}
        {activeTab === 'texts' && (
          <div className="space-y-6">
            {TEXT_FIELDS.map(({ section, fields }) => (
              <div key={section} className="bg-white rounded-2xl border border-[#efefef] p-6">
                <h2 className="text-sm font-semibold text-[#0a0a0a] mb-5 pb-3 border-b border-[#f0f0f0]">
                  {section}
                </h2>
                <div className="space-y-5">
                  {fields.map(({ key, label, placeholder, multiline }) => (
                    <div key={key}>
                      <label className="block text-xs text-[#737373] mb-1.5 tracking-wide">{label}</label>
                      {multiline ? (
                        <textarea
                          value={texts[key] ?? ''}
                          onChange={e => setTexts(prev => ({ ...prev, [key]: e.target.value }))}
                          placeholder={placeholder}
                          rows={3}
                          className="w-full text-sm text-[#0a0a0a] border border-[#efefef] rounded-xl px-4 py-3 focus:outline-none focus:border-[#a0a0a0] transition-colors resize-y leading-relaxed placeholder:text-[#d0d0d0]"
                        />
                      ) : (
                        <input
                          type="text"
                          value={texts[key] ?? ''}
                          onChange={e => setTexts(prev => ({ ...prev, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full text-sm text-[#0a0a0a] border border-[#efefef] rounded-xl px-4 py-3 focus:outline-none focus:border-[#a0a0a0] transition-colors placeholder:text-[#d0d0d0]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 저장 버튼 */}
            <button
              onClick={saveTexts}
              disabled={savingTexts}
              className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                savedTexts
                  ? 'bg-[#4a8c2a] text-white'
                  : 'bg-[#0a0a0a] text-white hover:bg-[#262626]'
              } disabled:opacity-50`}
            >
              {savedTexts ? <><Check size={16} /> 저장됐습니다!</> : savingTexts ? '저장 중...' : <><Save size={16} /> 텍스트 저장</>}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
