import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { getProjects } from '@/lib/notion'

export const dynamic = 'force-dynamic'

const categoryLabel: Record<string, string> = {
  photo:      '사진',
  sound:      '사운드',
  publishing: '출판',
  local:      '지역협업',
  event:      '행사',
  content:    '콘텐츠기획',
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const projects = await getProjects()
  const project = projects.find((p) => p.id === id)
  return {
    title: project?.title ?? '프로젝트 상세',
    description: project?.description,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const projects = await getProjects()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="pt-44 container-site pb-24">
        <p className="text-[#737373]">프로젝트를 찾을 수 없습니다.</p>
        <Link href="/projects" className="mt-4 inline-flex items-center gap-2 text-sm text-[#0a0a0a]">
          <ArrowLeft size={14} /> 프로젝트 목록으로
        </Link>
      </div>
    )
  }

  return (
    <>
      <section className="pt-36 md:pt-44 pb-20 bg-[#fafafa]">
        <div className="container-site">
          {/* 뒤로가기 */}
          <AnimateIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#a0a0a0] text-sm hover:text-[#0a0a0a] transition-colors duration-300 mb-12"
            >
              <ArrowLeft size={14} />
              Projects
            </Link>
          </AnimateIn>

          <div className="max-w-[800px]">
            {/* 메타 */}
            <AnimateIn>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs bg-[#efefef] text-[#525252] px-3 py-1.5 rounded-full">
                  {categoryLabel[project.category] ?? project.category}
                </span>
                <span className="text-[#a0a0a0] text-sm font-mono">{project.period}</span>
                {project.client && (
                  <>
                    <span className="text-[#dfdfdf]">·</span>
                    <span className="text-[#a0a0a0] text-sm">{project.client}</span>
                  </>
                )}
              </div>
            </AnimateIn>

            {/* 제목 */}
            <AnimateIn delay={80}>
              <h1 className="font-semibold text-[clamp(2rem,5vw,4rem)] tracking-[-0.025em] leading-[1.1] text-[#0a0a0a]">
                {project.title}
              </h1>
            </AnimateIn>

            {/* 설명 */}
            <AnimateIn delay={160}>
              <p className="mt-8 text-[#525252] text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
            </AnimateIn>

            {/* 결과물 */}
            {project.result && (
              <AnimateIn delay={220}>
                <div className="mt-10 pt-8 border-t border-[#efefef]">
                  <p className="text-xs tracking-[0.15em] uppercase text-[#a0a0a0] mb-3">결과물</p>
                  <p className="text-[#262626] text-base">{project.result}</p>
                </div>
              </AnimateIn>
            )}

            {/* 태그 */}
            {project.tags && project.tags.length > 0 && (
              <AnimateIn delay={280}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-[#efefef] text-[#737373] text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </AnimateIn>
            )}
          </div>

          {/* 이미지 갤러리 */}
          {project.images.length > 0 && (
            <div className="mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((img, i) => (
                  <AnimateIn key={i} delay={i * 60}>
                    <div className="aspect-[4/3] bg-[#efefef] rounded-2xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" />
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
