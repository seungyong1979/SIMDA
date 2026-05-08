import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { getBooks } from '@/lib/notion'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Publishing',
  description: '지역의 작은 이야기를 책으로 엮습니다. 심다 출판 목록.',
}

export default async function PublishingPage() {
  const books = await getBooks()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-16 bg-[#fafafa]">
        <div className="container-site">
          <AnimateIn>
            <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">Publishing</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-[1.05] text-[#0a0a0a] max-w-[700px]">
              지역의 작은<br />이야기들.
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="mt-5 text-[#525252] text-base md:text-lg leading-relaxed max-w-[500px]">
              사라지기 전에 남겨두고 싶은 이야기들을 책으로 만듭니다.
              순천과 그 주변의 풍경, 사람, 기억.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── 출판 방향 ─────────────────────────────────────────────── */}
      <section className="pb-20 bg-[#fafafa]">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#efefef] border border-[#efefef] rounded-2xl overflow-hidden">
            {[
              { label: '지역성', desc: '순천과 전남을 중심으로 지역의 고유한 이야기를 발굴합니다.' },
              { label: '아카이브', desc: '사진, 글, 인터뷰를 통해 기록으로서의 책을 만듭니다.' },
              { label: '소량정예', desc: '많이 팔기보다 오래 남을 책을 만드는 것이 목표입니다.' },
            ].map((item, i) => (
              <AnimateIn key={item.label} delay={i * 80}>
                <div className="bg-[#fafafa] p-8 md:p-10">
                  <h3 className="text-base font-semibold text-[#0a0a0a] mb-3">{item.label}</h3>
                  <p className="text-[#737373] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 도서 목록 ─────────────────────────────────────────────── */}
      <section className="section-padding bg-[#fafafa]">
        <div className="container-site">
          <AnimateIn>
            <h2 className="font-semibold text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em] text-[#0a0a0a] mb-12">
              출간 도서
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {books.map((book, i) => (
              <AnimateIn key={book.id} delay={i * 80}>
                <Link href={`/publishing/${book.id}`} className="group block">
                  {/* 표지 */}
                  <div className="aspect-[3/4] bg-[#efefef] rounded-xl overflow-hidden mb-5">
                    {book.coverImage && book.coverImage !== '/images/placeholder.jpg' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#e8e5e0] to-[#d5d0c8] flex items-end p-5">
                        <p className="text-[#a0a0a0] text-xs">{book.title}</p>
                      </div>
                    )}
                  </div>

                  {/* 정보 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-[#a0a0a0]">{book.year}</p>
                      {book.category && (
                        <p className="text-xs text-[#a0a0a0]">{book.category}</p>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-[#0a0a0a] group-hover:opacity-70 transition-opacity duration-300">
                      {book.title}
                    </h3>
                    <p className="text-sm text-[#737373]">{book.author}</p>
                    <p className="text-sm text-[#a0a0a0] leading-relaxed line-clamp-2">{book.description}</p>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 유통·입고 문의 ────────────────────────────────────────── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-site">
          <AnimateIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">Distribution</p>
                <h2 className="text-white font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.02em] leading-tight">
                  입고 및 유통 문의
                </h2>
                <p className="mt-3 text-white/50 text-sm leading-relaxed max-w-[400px]">
                  서점, 문화공간, 기관 등 심다 도서 입고에 관심 있으신 곳은 편하게 연락 주세요.
                </p>
              </div>
              <Link
                href="/contact?type=publishing"
                className="inline-flex items-center gap-3 text-white text-sm border border-white/30 px-6 py-3.5 rounded-full hover:border-white transition-colors duration-300 shrink-0 group"
              >
                문의하기
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
