import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { getGoods } from '@/lib/notion'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Goods',
  description: '순천의 풍경을 담은 심다 기념품. 마그넷, 노트, 엽서.',
}

const typeLabel: Record<string, string> = {
  magnet:   '마그넷',
  notebook: '노트',
  postcard: '엽서',
  etc:      '기타',
}

export default async function GoodsPage() {
  const goods = await getGoods()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-16 bg-[#f5f3f0]">
        <div className="container-site">
          <AnimateIn>
            <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">Goods</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-[1.05] text-[#0a0a0a] max-w-[700px]">
              순천의 풍경을<br />일상 속으로.
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="mt-5 text-[#525252] text-base md:text-lg leading-relaxed max-w-[500px]">
              마그넷, 노트, 엽서 — 순천의 기억을 담은 작은 물건들.
              인근 기념품점과 문화공간에서 만날 수 있습니다.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── 제품 목록 ─────────────────────────────────────────────── */}
      <section className="section-padding bg-[#f5f3f0]">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goods.map((item, i) => (
              <AnimateIn key={item.id} delay={i * 80}>
                <div className="group bg-white rounded-2xl overflow-hidden">
                  {/* 제품 이미지 */}
                  <div className="aspect-square bg-[#f0ede8] overflow-hidden">
                    {item.images.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-[#c8c8c8] text-sm">{item.name}</p>
                      </div>
                    )}
                  </div>
                  {/* 제품 정보 */}
                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#a0a0a0] bg-[#f5f3f0] px-2.5 py-1 rounded-full">
                        {typeLabel[item.type] ?? item.type}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-[#0a0a0a]">{item.name}</h3>
                    <p className="text-sm text-[#737373] leading-relaxed">{item.description}</p>
                    {item.spec && (
                      <p className="text-xs text-[#a0a0a0] pt-1">{item.spec}</p>
                    )}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 개인 구매 안내 ────────────────────────────────────────── */}
      <section className="py-16 bg-[#f0ede8]">
        <div className="container-site">
          <AnimateIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 md:p-10 bg-white rounded-2xl">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-3">개인 구매</p>
                <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">
                  온라인에서도 구매할 수 있어요
                </h3>
                <p className="text-[#737373] text-sm leading-relaxed max-w-[400px]">
                  네이버 스마트스토어에서 직접 구매하실 수 있습니다.
                </p>
              </div>
              <a
                href="https://smartstore.naver.com/simda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#03C75A] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[#02b050] transition-colors duration-300 shrink-0"
              >
                네이버 스마트스토어
                <ExternalLink size={13} />
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── B2B 납품·위탁 안내 ───────────────────────────────────── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-site">
          <AnimateIn>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">Wholesale & Stockist</p>
            <h2 className="text-white font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.02em] leading-tight mb-6">
              납품 및 위탁 판매 문의
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                title: '위탁 판매',
                desc: '기념품점, 카페, 문화공간 등 심다 제품을 위탁으로 판매할 수 있습니다. 현재 순천 인근 4곳에서 판매 중입니다.',
              },
              {
                title: '납품',
                desc: '기관, 단체, 행사 기념품으로 납품 가능합니다. 수량과 조건에 따라 협의합니다.',
              },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 80}>
                <div className="bg-white/5 rounded-2xl p-8">
                  <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={160}>
            <Link
              href="/contact?type=goods"
              className="inline-flex items-center gap-3 text-white text-sm border border-white/30 px-6 py-3.5 rounded-full hover:border-white transition-colors duration-300 group"
            >
              납품·위탁 문의하기
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
