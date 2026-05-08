'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { cn } from '@/lib/utils'

// 목 데이터 (Notion 연동 후 실제 데이터로 교체)
const mockAlbum = {
  albumNumber: '01',
  title: '순천만의 소리',
  description: '새벽 안개 속 순천만에서 채집한 소리들. 갈대 스치는 소리, 철새 울음, 물결 소리. 겨울 순천만이 품고 있는 고요하고 서늘한 공기를 담았습니다.',
  location: '순천만 국가정원',
  recordedAt: '2023년 겨울',
  tracks: [
    { id: 't1', title: '새벽 갈대밭', duration: '4:32', audioUrl: '', description: '동틀 무렵의 갈대 소리. 바람이 갈대밭을 지나며 만드는 파도 같은 소리.' },
    { id: 't2', title: '철새의 아침', duration: '3:18', audioUrl: '', description: '흑두루미 울음소리와 날갯짓. 먼 하늘로 날아오르는 새들의 소리.' },
    { id: 't3', title: '물결과 바람', duration: '5:07', audioUrl: '', description: '수면 위를 스치는 바람 소리. 아주 작은 물결이 갈대에 닿는 소리.' },
  ],
}

export default function SoundAlbumDetailPage() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const track = mockAlbum.tracks[currentTrack]

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const prev = () => {
    setCurrentTrack(i => Math.max(0, i - 1))
    setIsPlaying(false)
  }

  const next = () => {
    setCurrentTrack(i => Math.min(mockAlbum.tracks.length - 1, i + 1))
    setIsPlaying(false)
  }

  return (
    <>
      {/* ── Hero / 커버 ──────────────────────────────────────────── */}
      <section className="pt-24 bg-[#0a0a0a] min-h-[60vh] flex flex-col justify-end">
        <div className="container-site pb-16 md:pb-20">
          {/* 뒤로가기 */}
          <AnimateIn delay={0}>
            <Link
              href="/archive"
              className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/80 transition-colors duration-300 mb-12"
            >
              <ArrowLeft size={15} />
              Archive
            </Link>
          </AnimateIn>

          <AnimateIn delay={80}>
            <p className="text-white/20 text-xs tracking-[0.2em] uppercase mb-4">
              Sound Album {mockAlbum.albumNumber}
            </p>
          </AnimateIn>
          <AnimateIn delay={160}>
            <h1 className="text-white font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-[1.05]">
              {mockAlbum.title}
            </h1>
          </AnimateIn>
          <AnimateIn delay={240}>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-white/40 text-sm">{mockAlbum.location}</span>
              <span className="text-white/20 text-sm">·</span>
              <span className="text-white/40 text-sm">{mockAlbum.recordedAt}</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 플레이어 + 트랙리스트 ────────────────────────────────── */}
      <section className="bg-[#111111] pb-0">
        <div className="container-site">
          {/* 현재 재생 중 */}
          <div className="py-8 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* 컨트롤 */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  disabled={currentTrack === 0}
                  className="text-white/40 hover:text-white disabled:opacity-20 transition-colors duration-300"
                >
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform duration-300"
                >
                  {isPlaying
                    ? <Pause size={20} className="text-[#0a0a0a]" />
                    : <Play  size={20} className="text-[#0a0a0a] ml-0.5" />
                  }
                </button>
                <button
                  onClick={next}
                  disabled={currentTrack === mockAlbum.tracks.length - 1}
                  className="text-white/40 hover:text-white disabled:opacity-20 transition-colors duration-300"
                >
                  <SkipForward size={20} />
                </button>
              </div>

              {/* 트랙 정보 */}
              <div className="flex-1">
                <p className="text-white text-base font-medium">{track.title}</p>
                <p className="text-white/40 text-sm mt-0.5">{track.description}</p>
              </div>

              <span className="text-white/30 text-sm font-mono">{track.duration}</span>
            </div>

            {/* 오디오 프로그레스 바 (시각적) */}
            <div className="mt-4 h-px bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full bg-white/60 rounded-full transition-all duration-300',
                  isPlaying ? 'w-1/3' : 'w-0',
                )}
              />
            </div>
            <audio ref={audioRef} src={track.audioUrl} onEnded={() => setIsPlaying(false)} />
          </div>

          {/* 트랙 목록 */}
          <div className="divide-y divide-white/10">
            {mockAlbum.tracks.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setCurrentTrack(i); setIsPlaying(false) }}
                className={cn(
                  'w-full text-left py-5 flex items-center gap-4 group transition-colors duration-300',
                  currentTrack === i ? 'text-white' : 'text-white/50 hover:text-white/80',
                )}
              >
                <span className="text-xs font-mono w-6 text-center">
                  {currentTrack === i && isPlaying
                    ? <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
                    : String(i + 1).padStart(2, '0')
                  }
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-white/30 mt-0.5">{t.description}</p>
                </div>
                <span className="text-xs font-mono text-white/30">{t.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 앨범 소개 ─────────────────────────────────────────────── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-site max-w-[680px]">
          <AnimateIn>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-5">About this album</p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              {mockAlbum.description}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── 사운드워킹 연결 ───────────────────────────────────────── */}
      <section className="bg-[#111111] py-16">
        <div className="container-site">
          <AnimateIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 md:p-10 border border-white/10 rounded-2xl">
              <div>
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-3">Program</p>
                <h3 className="text-white text-xl font-semibold mb-2">이 소리를 직접 듣고 싶다면</h3>
                <p className="text-white/50 text-sm">사운드 워킹 프로그램에서 현장의 소리를 직접 경험하세요.</p>
              </div>
              <Link
                href="/program"
                className="inline-flex items-center gap-2 text-white text-sm border border-white/30 px-5 py-3 rounded-full hover:border-white transition-colors duration-300 shrink-0"
              >
                프로그램 보기
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
