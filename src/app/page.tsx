'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { cn } from '@/lib/utils'

const sections = [
  {
    id: 'archive',
    label: 'Archive',
    href: '/archive',
    title: '기록하는 일',
    desc: '사진과 소리로 지역의 시간을 담습니다.',
    bg: 'bg-[#1a1a1a]',
  },
  {
    id: 'publishing',
    label: 'Publishing',
    href: '/publishing',
    title: '만드는 일',
    desc: '지역의 작은 이야기를 책으로 엮습니다.',
    bg: 'bg-[#f0ede8]',
    dark: false,
  },
  {
    id: 'program',
    label: 'Program',
    href: '/program',
    title: '걷는 일',
    desc: '소리 풍경 속을 함께 걷는 프로그램.',
    bg: 'bg-[#2a3228]',
  },
  {
    id: 'goods',
    label: 'Goods',
    href: '/goods',
    title: '남기는 일',
    desc: '순천의 풍경을 일상 속 물건으로.',
    bg: 'bg-[#f5f3f0]',
    dark: false,
  },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const parallax = scrollY * 0.4

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-[#0a0a0a]"
      >
        {/* 배경 그라디언트 (실제 사진 업로드 전 플레이스홀더) */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${parallax}px)` }}
        >
          {/* 배경 이미지 — Notion 연동 후 실제 사진으로 교체 */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/hero-bg.jpg')`,
              backgroundPosition: 'center 40%',
            }}
          />
          {/* 플레이스홀더 그라디언트 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a1a] via-[#0a1a14] to-[#0a0a0a]" />
        </div>

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* 텍스트 */}
        <div className="relative z-10 container-site pb-16 md:pb-24">
          <AnimateIn delay={200} duration={1000}>
            <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-6">
              Suncheon · Since 2016
            </p>
          </AnimateIn>
          <AnimateIn delay={350} duration={1000}>
            <h1 className="text-white font-semibold leading-[1.04] tracking-[-0.03em] text-[clamp(3rem,8vw,7rem)] max-w-[900px]">
              사람, 지역,<br />기록, 기획.
            </h1>
          </AnimateIn>
          <AnimateIn delay={500} duration={1000}>
            <p className="mt-6 text-white/60 text-base md:text-lg max-w-[480px] leading-relaxed">
              심다는 순천을 기반으로<br className="hidden md:block" />
              콘텐츠를 통해 지역과 사람을 연결합니다.
            </p>
          </AnimateIn>
          <AnimateIn delay={650} duration={1000}>
            <div className="mt-10 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white text-sm tracking-wide group"
              >
                심다 소개
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-white/50 text-sm tracking-wide hover:text-white/80 transition-colors duration-300 group"
              >
                프로젝트 보기
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </AnimateIn>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 right-8 md:right-12 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-white/60 animate-[scrollLine_2s_ease-in-out_infinite]"
              style={{ height: '40%', animation: 'scrollLine 2s ease-in-out infinite' }}
            />
          </div>
          <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase rotate-90 origin-center mt-2">
            Scroll
          </p>
        </div>
      </section>

      {/* ── 브랜드 한 줄 소개 ─────────────────────────────────────── */}
      <section className="section-padding bg-[#fafafa]">
        <div className="container-site">
          <AnimateIn>
            <p className="text-[clamp(1.4rem,3vw,2.2rem)] font-light tracking-[-0.01em] text-[#0a0a0a] leading-[1.5] max-w-[700px]">
              책방을 졸업한 뒤에도,{' '}
              <span className="font-semibold">기록하고 만들고 연결하는 일</span>은<br className="hidden md:block" />
              {' '}계속됩니다.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── 4개 섹션 카드 ─────────────────────────────────────────── */}
      <section className="pb-32 bg-[#fafafa]">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {sections.map((s, i) => (
              <AnimateIn key={s.id} delay={i * 80} direction="up">
                <Link
                  href={s.href}
                  className={cn(
                    'group relative block rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10]',
                    s.bg,
                  )}
                >
                  {/* 내용 */}
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                    <p className={cn(
                      'text-xs tracking-[0.2em] uppercase',
                      s.dark === false ? 'text-[#737373]' : 'text-white/40',
                    )}>
                      {s.label}
                    </p>
                    <div>
                      <h3 className={cn(
                        'text-3xl md:text-4xl font-semibold tracking-tight',
                        s.dark === false ? 'text-[#0a0a0a]' : 'text-white',
                      )}>
                        {s.title}
                      </h3>
                      <p className={cn(
                        'mt-2 text-sm leading-relaxed',
                        s.dark === false ? 'text-[#737373]' : 'text-white/50',
                      )}>
                        {s.desc}
                      </p>
                      <div className={cn(
                        'mt-5 inline-flex items-center gap-2 text-xs tracking-wide transition-all duration-300',
                        'group-hover:gap-3',
                        s.dark === false ? 'text-[#0a0a0a]' : 'text-white',
                      )}>
                        자세히 보기
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>

                  {/* 호버 오버레이 */}
                  <div className={cn(
                    'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    s.dark === false
                      ? 'bg-[#0a0a0a]/5'
                      : 'bg-white/5',
                  )} />
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] section-padding">
        <div className="container-site">
          <AnimateIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">Contact</p>
                <h2 className="text-white font-semibold text-[clamp(2rem,5vw,4rem)] tracking-[-0.025em] leading-tight">
                  함께 만들고 싶은<br />일이 있으신가요?
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-white text-base tracking-wide group shrink-0"
              >
                문의하기
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 group-hover:border-white transition-colors duration-300">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <style jsx>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
      `}</style>
    </>
  )
}
