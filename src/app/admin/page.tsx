'use server'

import Link from 'next/link'
import { requireAdminAuth } from '@/lib/admin-auth'
import { getBooks, getProjects, getGoods, getSoundAlbums } from '@/lib/notion'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'

export default async function AdminDashboard() {
  await requireAdminAuth()

  const [books, projects, goods, albums] = await Promise.allSettled([
    getBooks(),
    getProjects(),
    getGoods(),
    getSoundAlbums(),
  ])

  const booksCount   = books.status   === 'fulfilled' ? books.value.length   : 0
  const projectCount = projects.status === 'fulfilled' ? projects.value.length : 0
  const goodsCount   = goods.status   === 'fulfilled' ? goods.value.length   : 0
  const albumCount   = albums.status  === 'fulfilled' ? albums.value.length  : 0

  const stats = [
    { label: '도서',        count: booksCount,   href: '/admin/books',        icon: '📚', color: 'bg-[#f0ede8]' },
    { label: '프로젝트',    count: projectCount, href: '/admin/projects',     icon: '🗂️', color: 'bg-[#e8f0e5]' },
    { label: '굿즈',        count: goodsCount,   href: '/admin/goods',        icon: '🎁', color: 'bg-[#e5e8f0]' },
    { label: '사운드 앨범', count: albumCount,   href: '/admin/sound-albums', icon: '🎵', color: 'bg-[#f0e5e8]' },
  ]

  const menuItems = [
    { label: '도서 관리',        desc: '책 목록 조회 및 Notion에서 관리',       href: '/admin/books',        icon: '📚' },
    { label: '프로젝트 관리',    desc: '프로젝트 목록 조회 및 Notion에서 관리', href: '/admin/projects',     icon: '🗂️' },
    { label: '굿즈 관리',        desc: '제품 목록 조회 및 Notion에서 관리',     href: '/admin/goods',        icon: '🎁' },
    { label: '사운드 앨범 관리', desc: '앨범 목록 조회 및 Notion에서 관리',     href: '/admin/sound-albums', icon: '🎵' },
    { label: '사진 아카이브',    desc: '사진 목록 조회 및 Notion에서 관리',     href: '/admin/photos',       icon: '📷' },
    { label: '사이트 방문',      desc: '실제 사이트 확인',                      href: '/',                   icon: '🌐', external: true },
  ]

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* 상단 네비게이션 */}
      <header className="bg-white border-b border-[#efefef] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold tracking-[0.1em] text-[#0a0a0a]">SIMDA</span>
            <span className="text-[#c8c8c8]">/</span>
            <span className="text-sm text-[#737373]">관리자</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors duration-200"
            >
              사이트 보기 →
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* 환영 메시지 */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-[#0a0a0a] mb-1">안녕하세요 👋</h1>
          <p className="text-[#737373] text-sm">심다 홈페이지 관리자 페이지입니다. Notion에서 콘텐츠를 수정하면 사이트에 자동 반영됩니다.</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <div className={`${stat.color} rounded-2xl p-5 hover:opacity-80 transition-opacity duration-200 cursor-pointer`}>
                <div className="text-2xl mb-3">{stat.icon}</div>
                <div className="text-2xl font-semibold text-[#0a0a0a]">{stat.count}</div>
                <div className="text-sm text-[#525252] mt-1">{stat.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Notion 바로가기 */}
        <div className="bg-white rounded-2xl border border-[#efefef] p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-[#0a0a0a] mb-1">Notion에서 콘텐츠 수정하기</h2>
              <p className="text-sm text-[#737373] leading-relaxed">
                콘텐츠는 Notion 데이터베이스에서 관리합니다. Notion에서 내용을 수정하면
                홈페이지에 자동으로 반영됩니다.
              </p>
            </div>
            <a
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-[#0a0a0a] text-white text-sm px-5 py-2.5 rounded-xl hover:bg-[#262626] transition-colors duration-200"
            >
              Notion 열기
            </a>
          </div>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              className="bg-white rounded-2xl border border-[#efefef] p-6 hover:border-[#0a0a0a] transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#0a0a0a] mb-1 group-hover:text-[#525252] transition-colors">
                    {item.label} {item.external && '↗'}
                  </h3>
                  <p className="text-xs text-[#a0a0a0] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 사용 안내 */}
        <div className="mt-10 bg-[#0a0a0a] rounded-2xl p-6 md:p-8">
          <h2 className="text-white font-semibold mb-5">콘텐츠 업데이트 방법</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Notion 열기', desc: 'notion.so에서 심다 워크스페이스의 데이터베이스를 엽니다.' },
              { step: '2', title: '내용 수정 또는 추가', desc: '새 항목을 추가하거나 기존 항목을 수정합니다. "공개여부" 체크박스를 켜야 사이트에 표시됩니다.' },
              { step: '3', title: '자동 반영', desc: '저장 후 약 10~30초 이내에 홈페이지에 자동으로 반영됩니다.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white/60 text-xs font-medium">{item.step}</span>
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium mb-0.5">{item.title}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
