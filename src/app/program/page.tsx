import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Users, Banknote, CalendarDays } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Program',
  description: '소리 풍경 속을 걷는 사운드 워킹 프로그램.',
}

const details = [
  { icon: MapPin,       label: '장소',   value: '순천만 국가정원 일대' },
  { icon: Clock,        label: '시간',   value: '약 2시간' },
  { icon: Users,        label: '인원',   value: '최소 4인 / 최대 10인' },
  { icon: Banknote,     label: '참가비', value: '추후 공지' },
  { icon: CalendarDays, label: '일정',   value: '2026년 8월 시작 예정' },
]

const prepareItems = [
  '편한 신발 (걷기 적합한 운동화)',
  '계절에 맞는 편한 복장',
  '귀를 열어둘 마음',
]

export default function ProgramPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-0 bg-[#0a0a0a]">
        <div className="container-site pb-20">
          <AnimateIn>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-5">Program</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="text-white font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-[1.05] max-w-[700px]">
              소리 풍경 속을<br />함께 걷습니다.
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="mt-5 text-white/50 text-base md:text-lg leading-relaxed max-w-[500px]">
              Sound Walking — 귀를 열고, 천천히, 지금 이 장소의 소리를 듣습니다.
            </p>
          </AnimateIn>

          {/* 오픈 예정 배너 */}
          <AnimateIn delay={240}>
            <div className="mt-10 inline-flex items-center gap-3 bg-white/10 rounded-full px-5 py-2.5">
              <span className="w-2 h-2 rounded-full bg-[#7ab86a] animate-pulse" />
              <span className="text-white/70 text-sm">2026년 8월 오픈 예정</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 프로그램 소개 ─────────────────────────────────────────── */}
      <section className="section-padding bg-[#111111]">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <AnimateIn>
              <div className="space-y-6 text-white/60 text-base md:text-lg leading-relaxed">
                <p>
                  사운드 워킹은 소리에 집중하며 걷는 프로그램입니다.
                  스마트폰을 내려놓고, 이어폰을 빼고, 지금 이 장소가
                  내는 소리를 온전히 듣습니다.
                </p>
                <p>
                  갈대 스치는 소리, 새 울음, 물결, 바람, 발소리 —
                  평소엔 그냥 지나쳤던 소리들이 새롭게 들리기 시작합니다.
                </p>
                <p>
                  심다의 사운드스케이프 아카이브에서 시작된 이 프로그램은,
                  기록을 넘어 <strong className="text-white/90">직접 경험</strong>하는 장으로 이어집니다.
                </p>
              </div>
            </AnimateIn>

            {/* 프로그램 상세 */}
            <AnimateIn delay={120}>
              <div className="bg-white/5 rounded-2xl p-8 space-y-5">
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">Program Details</p>
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} className="text-white/60" />
                    </div>
                    <div>
                      <p className="text-white/30 text-xs mb-0.5">{label}</p>
                      <p className="text-white/80 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── 준비물 ────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-site max-w-[680px]">
          <AnimateIn>
            <h2 className="text-white font-semibold text-2xl mb-8">준비물</h2>
            <ul className="space-y-4">
              {prepareItems.map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white/60 text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </section>

      {/* ── 취소/환불 ─────────────────────────────────────────────── */}
      <section className="pb-20 bg-[#0a0a0a]">
        <div className="container-site max-w-[680px]">
          <AnimateIn>
            <div className="border border-white/10 rounded-2xl p-8">
              <h3 className="text-white/60 text-sm font-medium mb-4">취소 및 환불 규정</h3>
              <ul className="space-y-2 text-white/40 text-sm leading-relaxed">
                <li>· 프로그램 3일 전까지: 전액 환불</li>
                <li>· 프로그램 1~2일 전: 50% 환불</li>
                <li>· 당일 취소: 환불 불가</li>
                <li>· 기상 악화 등 불가피한 사유로 취소 시: 전액 환불 또는 일정 변경</li>
              </ul>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 예약 CTA ──────────────────────────────────────────────── */}
      <section className="section-padding bg-[#2a3228]">
        <div className="container-site">
          <AnimateIn>
            <div className="text-center max-w-[560px] mx-auto">
              <h2 className="text-white font-semibold text-[clamp(2rem,4vw,3rem)] tracking-[-0.025em] leading-tight mb-4">
                함께 걸을 준비가<br />되셨나요?
              </h2>
              <p className="text-white/50 text-base mb-10">
                2026년 8월부터 예약을 받을 예정입니다.<br />
                오픈 소식을 먼저 받고 싶다면 연락 주세요.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/contact?type=program"
                  className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] px-7 py-4 rounded-full text-sm font-medium hover:bg-white/90 transition-colors duration-300 group"
                >
                  사전 알림 신청
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/archive"
                  className="inline-flex items-center gap-2 text-white/60 px-7 py-4 rounded-full text-sm border border-white/20 hover:border-white/50 hover:text-white/90 transition-all duration-300"
                >
                  사운드 아카이브 듣기
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
