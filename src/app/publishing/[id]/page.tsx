import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { getBooks, getBookById } from '@/lib/notion'

export async function generateStaticParams() {
  const books = await getBooks()
  return books.map((b) => ({ id: b.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const book = await getBookById(id)
  return {
    title: book?.title ?? '도서 상세',
    description: book?.description,
  }
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = await getBookById(id)

  if (!book) {
    return (
      <div className="pt-44 container-site pb-24">
        <p className="text-[#737373]">도서를 찾을 수 없습니다.</p>
        <Link href="/publishing" className="mt-4 inline-flex items-center gap-2 text-sm text-[#0a0a0a]">
          <ArrowLeft size={14} /> 출판 목록으로
        </Link>
      </div>
    )
  }

  return (
    <>
      <section className="pt-36 md:pt-44 pb-20 bg-[#fafafa]">
        <div className="container-site">
          <AnimateIn>
            <Link
              href="/publishing"
              className="inline-flex items-center gap-2 text-[#a0a0a0] text-sm hover:text-[#0a0a0a] transition-colors duration-300 mb-12"
            >
              <ArrowLeft size={14} />
              Publishing
            </Link>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* 표지 */}
            <AnimateIn>
              <div className="aspect-[3/4] bg-[#efefef] rounded-2xl overflow-hidden max-w-[420px]">
                {book.coverImage && book.coverImage !== '/images/placeholder.jpg' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#e8e5e0] to-[#d5d0c8] flex items-end p-8">
                    <p className="text-[#a0a0a0] text-sm">{book.title}</p>
                  </div>
                )}
              </div>
            </AnimateIn>

            {/* 정보 */}
            <AnimateIn delay={120}>
              <div className="space-y-8">
                <div>
                  <p className="text-[#a0a0a0] text-xs tracking-[0.15em] uppercase mb-3">{book.year}</p>
                  <h1 className="font-semibold text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.025em] leading-tight text-[#0a0a0a]">
                    {book.title}
                  </h1>
                  <p className="mt-2 text-[#737373] text-base">{book.author}</p>
                </div>

                <div className="pt-6 border-t border-[#efefef]">
                  <p className="text-[#262626] text-base md:text-lg leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {book.tags && book.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-[#efefef] text-[#737373] text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-2">
                  {book.isAvailable && book.purchaseLink && (
                    <a
                      href={book.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-6 py-4 rounded-full text-sm font-medium hover:bg-[#262626] transition-colors duration-300"
                    >
                      구매하기
                      <ArrowRight size={14} />
                    </a>
                  )}
                  <Link
                    href="/contact?type=publishing"
                    className="inline-flex items-center justify-center gap-2 border border-[#dfdfdf] text-[#0a0a0a] px-6 py-4 rounded-full text-sm hover:border-[#0a0a0a] transition-colors duration-300"
                  >
                    입고 문의
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* 내지 이미지 */}
          {book.interiorImages.length > 0 && (
            <div className="mt-24">
              <AnimateIn>
                <h2 className="font-semibold text-xl text-[#0a0a0a] mb-8">내지 미리보기</h2>
              </AnimateIn>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {book.interiorImages.map((img, i) => (
                  <AnimateIn key={i} delay={i * 60}>
                    <div className="aspect-[4/3] bg-[#efefef] rounded-xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`내지 ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
