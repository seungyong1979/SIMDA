'use client'

import { useState } from 'react'
import { Mail, ExternalLink, Send } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { cn } from '@/lib/utils'

const inquiryTypes = [
  { id: 'photo',         label: '촬영 문의' },
  { id: 'sound',         label: '사운드스케이프 문의' },
  { id: 'program',       label: '프로그램 문의' },
  { id: 'publishing',    label: '출판·입고 문의' },
  { id: 'goods',         label: '굿즈 납품·위탁 문의' },
  { id: 'collaboration', label: '협업 제안' },
  { id: 'etc',           label: '기타' },
]

export default function ContactPage() {
  const [type, setType]       = useState('etc')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name, email, message }),
      })
      if (res.ok) {
        setStatus('done')
        setName(''); setEmail(''); setMessage(''); setType('etc')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-16 bg-[#fafafa]">
        <div className="container-site">
          <AnimateIn>
            <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">Contact</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-[1.05] text-[#0a0a0a]">
              연락해 주세요.
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="mt-5 text-[#525252] text-base md:text-lg leading-relaxed max-w-[480px]">
              촬영, 출판, 굿즈 납품, 협업 등 어떤 이야기든 환영합니다.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── 문의 폼 + 연락처 ─────────────────────────────────────── */}
      <section className="pb-32 bg-[#fafafa]">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-16 md:gap-24">

            {/* 폼 */}
            <AnimateIn>
              {status === 'done' ? (
                <div className="py-20 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#0a0a0a] flex items-center justify-center mx-auto mb-6">
                    <Send size={20} className="text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#0a0a0a] mb-3">
                    메시지를 보냈습니다
                  </h2>
                  <p className="text-[#737373] text-sm">
                    빠른 시일 내에 답변 드리겠습니다.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm text-[#a0a0a0] underline underline-offset-4 hover:text-[#0a0a0a] transition-colors duration-300"
                  >
                    다시 문의하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 문의 유형 */}
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-[#a0a0a0] mb-3">
                      문의 유형
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTypes.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setType(t.id)}
                          className={cn(
                            'px-4 py-2 rounded-full text-sm border transition-all duration-300',
                            type === t.id
                              ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                              : 'bg-transparent text-[#737373] border-[#dfdfdf] hover:border-[#a0a0a0]',
                          )}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 이름 */}
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-[#a0a0a0] mb-3">
                      이름 / 단체명
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="홍길동"
                      className="w-full bg-transparent border-b border-[#dfdfdf] py-3 text-[#0a0a0a] text-base placeholder:text-[#c8c8c8] focus:outline-none focus:border-[#0a0a0a] transition-colors duration-300"
                    />
                  </div>

                  {/* 이메일 */}
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-[#a0a0a0] mb-3">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="hello@example.com"
                      className="w-full bg-transparent border-b border-[#dfdfdf] py-3 text-[#0a0a0a] text-base placeholder:text-[#c8c8c8] focus:outline-none focus:border-[#0a0a0a] transition-colors duration-300"
                    />
                  </div>

                  {/* 메시지 */}
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-[#a0a0a0] mb-3">
                      메시지
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      placeholder="문의 내용을 자유롭게 작성해 주세요."
                      className="w-full bg-transparent border-b border-[#dfdfdf] py-3 text-[#0a0a0a] text-base placeholder:text-[#c8c8c8] focus:outline-none focus:border-[#0a0a0a] transition-colors duration-300 resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm">
                      전송 중 오류가 발생했습니다. 이메일로 직접 연락해 주세요.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-3 bg-[#0a0a0a] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#262626] disabled:opacity-50 transition-all duration-300 group"
                  >
                    {status === 'sending' ? '전송 중...' : '보내기'}
                    <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </AnimateIn>

            {/* 연락처 정보 */}
            <AnimateIn delay={160}>
              <div className="space-y-10">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">Direct</p>
                  <div className="space-y-4">
                    <a
                      href="mailto:simda@simda.co.kr"
                      className="flex items-center gap-3 text-[#262626] text-sm hover:text-[#0a0a0a] transition-colors duration-300 group"
                    >
                      <Mail size={15} className="text-[#a0a0a0]" />
                      simda@simda.co.kr
                    </a>
                    <a
                      href="https://www.instagram.com/simda_suncheon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[#262626] text-sm hover:text-[#0a0a0a] transition-colors duration-300"
                    >
                      <ExternalLink size={15} className="text-[#a0a0a0]" />
                      @simda_suncheon
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">
                    분야별 문의 안내
                  </p>
                  <div className="space-y-3 text-sm text-[#737373]">
                    {[
                      { label: '촬영', desc: '일상·행사·항공·수중 촬영' },
                      { label: '출판·입고', desc: '도서 입고 및 유통 협의' },
                      { label: '굿즈', desc: '납품·위탁 판매 협의' },
                      { label: '프로그램', desc: '사운드 워킹 단체 문의' },
                      { label: '협업', desc: '지역 기반 프로젝트 협업' },
                    ].map((item) => (
                      <div key={item.label} className="flex gap-3">
                        <span className="text-[#0a0a0a] font-medium shrink-0 w-20">{item.label}</span>
                        <span>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#efefef]">
                  <p className="text-xs text-[#c8c8c8] leading-relaxed">
                    보통 1–2 영업일 이내 답변 드립니다.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  )
}
