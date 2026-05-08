import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { getProjects } from '@/lib/notion'
import { getSettings } from '@/lib/settings'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects',
  description: '심다가 진행해온 프로젝트들. 사진, 사운드, 출판, 지역협업.',
}

const categoryLabel: Record<string, string> = {
  photo:      '사진',
  sound:      '사운드',
  publishing: '출판',
  local:      '지역협업',
  event:      '행사',
  content:    '콘텐츠기획',
}

const categoryColors: Record<string, string> = {
  photo:      'bg-[#e8f0e5] text-[#4a6741]',
  sound:      'bg-[#e5e8f0] text-[#414a67]',
  publishing: 'bg-[#f0e8e5] text-[#674141]',
  local:      'bg-[#e5f0ec] text-[#41675a]',
  event:      'bg-[#f0ede5] text-[#67594a]',
  content:    'bg-[#efefef] text-[#525252]',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const settings = getSettings()
  const t = settings.texts

  const lines = (str?: string) => (str ?? '').split('\n')

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-16 bg-[#fafafa]">
        <div className="container-site">
          <AnimateIn>
            <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">Projects</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-[1.05] text-[#0a0a0a] max-w-[700px]">
              {lines(t.projectsHeading || '함께 만들어온\n것들.').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="mt-5 text-[#525252] text-base md:text-lg leading-relaxed max-w-[500px]">
              {lines(t.projectsSubtext || '사진, 사운드, 출판, 지역협업, 행사, 콘텐츠 기획 —\n심다가 진행해온 프로젝트들을 소개합니다.').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── 프로젝트 목록 ─────────────────────────────────────────── */}
      <section className="pb-32 bg-[#fafafa]">
        <div className="container-site">
          <div className="divide-y divide-[#efefef]">
            {projects.map((project, i) => (
              <AnimateIn key={project.id} delay={i * 60}>
                <Link
                  href={`/projects/${project.id}`}
                  className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-8 hover:opacity-70 transition-opacity duration-300"
                >
                  {/* 연도 */}
                  <span className="text-[#a0a0a0] text-sm font-mono shrink-0 w-20">
                    {project.period}
                  </span>

                  {/* 카테고리 배지 */}
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium shrink-0 w-fit ${
                    categoryColors[project.category] ?? 'bg-[#efefef] text-[#525252]'
                  }`}>
                    {categoryLabel[project.category] ?? project.category}
                  </span>

                  {/* 제목·설명 */}
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-[#0a0a0a] mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#737373] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* 협업처 */}
                  {project.client && (
                    <span className="text-sm text-[#a0a0a0] shrink-0 hidden md:block">
                      {project.client}
                    </span>
                  )}

                  {/* 화살표 */}
                  <ArrowRight
                    size={16}
                    className="text-[#c8c8c8] shrink-0 transition-transform duration-300 group-hover:translate-x-1 hidden md:block"
                  />
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 협업 제안 CTA ─────────────────────────────────────────── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-site">
          <AnimateIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              <div>
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">Collaboration</p>
                <h2 className="text-white font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.02em] leading-tight">
                  함께 하고 싶은<br />프로젝트가 있으신가요?
                </h2>
                <p className="mt-3 text-white/50 text-sm leading-relaxed max-w-[400px]">
                  사진, 사운드, 출판, 콘텐츠 기획 등<br />
                  지역 기반 프로젝트 협업을 환영합니다.
                </p>
              </div>
              <Link
                href="/contact?type=collaboration"
                className="inline-flex items-center gap-3 text-white text-sm border border-white/30 px-6 py-3.5 rounded-full hover:border-white transition-colors duration-300 group shrink-0"
              >
                협업 제안하기
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
