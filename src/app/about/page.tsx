import type { Metadata } from 'next'
import AnimateIn from '@/components/ui/AnimateIn'
import { getSettings } from '@/lib/settings'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About',
  description: '사람·지역·기록·기획을 연결하는 콘텐츠 브랜드 심다 소개.',
}

const values = [
  {
    keyword: '사람',
    en: 'People',
    desc: '지역에 뿌리를 둔 사람들의 이야기에 귀 기울입니다. 기록은 언제나 사람으로부터 시작됩니다.',
  },
  {
    keyword: '지역',
    en: 'Place',
    desc: '순천이라는 장소가 가진 결, 속도, 냄새, 소리. 지역의 고유함을 발견하고 담아냅니다.',
  },
  {
    keyword: '기록',
    en: 'Archive',
    desc: '사진과 소리, 글로 사라지기 전의 것들을 붙잡습니다. 기록은 미래를 위한 선물입니다.',
  },
  {
    keyword: '기획',
    en: 'Curation',
    desc: '흩어진 것들을 연결하고 맥락을 만듭니다. 좋은 기획은 새로운 이야기를 가능하게 합니다.',
  },
]

export default function AboutPage() {
  const settings = getSettings()
  const t = settings.texts

  const lines = (str?: string) => (str ?? '').split('\n')

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 bg-[#fafafa]">
        <div className="container-site">
          <AnimateIn delay={0}>
            <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">About</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-[1.05] text-[#0a0a0a] max-w-[800px]">
              {lines(t.aboutHeading || '기록하고 만들고\n연결하는 일.').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h1>
          </AnimateIn>
        </div>
      </section>

      {/* ── 심다 소개 ─────────────────────────────────────────────── */}
      <section className="section-padding bg-[#fafafa]">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <AnimateIn>
              <div className="space-y-6 text-[#262626] text-base md:text-lg leading-relaxed">
                <p>{t.aboutIntro1 || '심다는 2016년 전남 순천에서 독립서점 책방 심다로 시작했습니다. 10년 동안 책과 사람을 연결하며, 지역의 이야기를 기록해왔습니다.'}</p>
                <p>{t.aboutIntro2 || '2026년 2월, 책방은 졸업했지만 심다가 해온 일들은 계속됩니다. 공간이 아닌 콘텐츠 브랜드로서, 더 넓은 방식으로 지역과 사람을 연결하고자 합니다.'}</p>
                <p>{t.aboutIntro3 || '사진 아카이브, 사운드스케이프, 출판, 기념품 — 형태는 달라도 심다가 하는 모든 일의 중심에는 기록이 있습니다.'}</p>
              </div>
            </AnimateIn>
            <AnimateIn delay={120}>
              <div className="aspect-[4/3] bg-[#efefef] rounded-2xl overflow-hidden">
                {/* 실제 공간 사진으로 교체 예정 */}
                <div className="w-full h-full bg-gradient-to-br from-[#e8e5e0] to-[#d5d0c8] flex items-end p-8">
                  <p className="text-[#a0a0a0] text-sm">책방 심다 — 2016–2026</p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── 브랜드 철학 ───────────────────────────────────────────── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-site">
          <AnimateIn>
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">Philosophy</p>
            <h2 className="text-white font-semibold text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.02em] leading-tight mb-16 md:mb-20">
              심다가 연결하는 네 가지
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {values.map((v, i) => (
              <AnimateIn key={v.keyword} delay={i * 80}>
                <div className="bg-[#0a0a0a] p-10 md:p-12 space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-white font-semibold text-2xl">{v.keyword}</span>
                    <span className="text-white/25 text-sm tracking-widest uppercase">{v.en}</span>
                  </div>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 전환 이야기 ───────────────────────────────────────────── */}
      <section className="section-padding bg-[#fafafa]">
        <div className="container-site max-w-[700px]">
          <AnimateIn>
            <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">Transition</p>
            <h2 className="font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.02em] text-[#0a0a0a] mb-8">
              책방 이후의 심다
            </h2>
          </AnimateIn>
          <AnimateIn delay={80}>
            <div className="space-y-5 text-[#525252] text-base md:text-lg leading-relaxed">
              <p>
                책방이라는 공간은 졸업했지만, 심다가 10년간 쌓아온 것들 —
                지역에 대한 애정, 기록하는 습관, 사람들과의 연결 — 은 그대로입니다.
              </p>
              <p>
                이제 심다는 <strong className="text-[#0a0a0a]">콘텐츠</strong>라는 더 넓은 개념으로
                나아갑니다. 사진으로, 소리로, 책으로, 물건으로.
                지역의 이야기를 다양한 방식으로 담고 전달합니다.
              </p>
              <p>
                순천이라는 도시가 가진 고유한 풍경과 소리와 사람들을
                더 많은 이들과 나누는 것, 그것이 앞으로의 심다입니다.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
