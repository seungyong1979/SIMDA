'use server'

import { requireAdminAuth } from '@/lib/admin-auth'
import { getProjects } from '@/lib/notion'
import AdminBackButton from '@/components/admin/AdminBackButton'

const categoryLabel: Record<string, string> = {
  photo: '사진', sound: '사운드', publishing: '출판',
  local: '지역협업', event: '행사', content: '콘텐츠기획',
}
const categoryColors: Record<string, string> = {
  photo: 'bg-[#e8f0e5] text-[#4a6741]', sound: 'bg-[#e5e8f0] text-[#414a67]',
  publishing: 'bg-[#f0e8e5] text-[#674141]', local: 'bg-[#e5f0ec] text-[#41675a]',
  event: 'bg-[#f0ede5] text-[#67594a]', content: 'bg-[#efefef] text-[#525252]',
}

export default async function AdminProjectsPage() {
  await requireAdminAuth()
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="bg-white border-b border-[#efefef] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
          <AdminBackButton />
          <div>
            <span className="text-base font-semibold text-[#0a0a0a]">프로젝트 관리</span>
            <span className="ml-3 text-xs text-[#a0a0a0] bg-[#f0f0f0] px-2 py-0.5 rounded-full">{projects.length}개</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-[#fffbf0] border border-[#f0e0a0] rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6b5a00] mb-0.5">Notion에서 프로젝트 추가·수정하기</p>
            <p className="text-xs text-[#a08000]">프로젝트를 추가하거나 수정하려면 Notion 데이터베이스를 이용하세요.</p>
          </div>
          <a href="https://notion.so" target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-[#0a0a0a] text-white text-xs px-4 py-2.5 rounded-xl hover:bg-[#262626] transition-colors duration-200 whitespace-nowrap">
            Notion 열기 ↗
          </a>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🗂️</p>
            <p className="text-[#737373] text-sm">등록된 프로젝트가 없습니다.</p>
            <p className="text-[#a0a0a0] text-xs mt-2">Notion에서 프로젝트를 추가하고 "공개여부"를 체크하세요.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#efefef] bg-white rounded-2xl border border-[#efefef] overflow-hidden">
            {projects.map((project) => (
              <div key={project.id} className="p-5 flex items-start gap-4">
                <div className="shrink-0 w-12 text-right">
                  <span className="text-xs text-[#a0a0a0] font-mono">{project.period}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start flex-wrap gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#0a0a0a]">{project.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[project.category] ?? 'bg-[#efefef] text-[#525252]'}`}>
                      {categoryLabel[project.category] ?? project.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed line-clamp-2">{project.description}</p>
                  {project.client && (
                    <p className="text-xs text-[#a0a0a0] mt-1">협업: {project.client}</p>
                  )}
                  {project.result && (
                    <p className="text-xs text-[#a0a0a0] mt-0.5">결과물: {project.result}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-white rounded-2xl border border-[#efefef] p-6">
          <h3 className="text-sm font-semibold text-[#0a0a0a] mb-3">Notion 프로젝트 DB 컬럼 안내</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { col: '프로젝트명', type: '제목', desc: '프로젝트 이름' },
              { col: '기간', type: '텍스트', desc: '예: 2024, 2023-2024' },
              { col: '협업처', type: '텍스트', desc: '기관·단체명' },
              { col: '카테고리', type: '선택', desc: 'photo/sound/publishing/local/event/content' },
              { col: '내용', type: '텍스트', desc: '프로젝트 설명' },
              { col: '결과물', type: '텍스트', desc: '산출물 요약' },
              { col: '태그', type: '다중선택', desc: '관련 키워드' },
              { col: '이미지', type: '파일·미디어', desc: '대표 이미지 업로드' },
              { col: '공개여부', type: '체크박스', desc: '✅ 체크해야 사이트에 표시' },
            ].map((item) => (
              <div key={item.col} className="flex items-start gap-2 text-xs">
                <span className="font-medium text-[#0a0a0a] w-24 shrink-0">{item.col}</span>
                <span className="text-[#a0a0a0] bg-[#f8f8f8] px-1.5 py-0.5 rounded text-[10px] shrink-0">{item.type}</span>
                <span className="text-[#737373]">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
