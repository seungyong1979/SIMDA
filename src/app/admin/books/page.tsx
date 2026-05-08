'use server'

import Link from 'next/link'
import { requireAdminAuth } from '@/lib/admin-auth'
import { getBooks } from '@/lib/notion'
import AdminBackButton from '@/components/admin/AdminBackButton'

export default async function AdminBooksPage() {
  await requireAdminAuth()
  const books = await getBooks()

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* 헤더 */}
      <header className="bg-white border-b border-[#efefef] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
          <AdminBackButton />
          <div>
            <span className="text-base font-semibold text-[#0a0a0a]">도서 관리</span>
            <span className="ml-3 text-xs text-[#a0a0a0] bg-[#f0f0f0] px-2 py-0.5 rounded-full">{books.length}권</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Notion 바로가기 */}
        <div className="bg-[#fffbf0] border border-[#f0e0a0] rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6b5a00] mb-0.5">Notion에서 도서 추가·수정하기</p>
            <p className="text-xs text-[#a08000]">새 책을 추가하거나 내용을 수정하려면 Notion 데이터베이스를 이용하세요.</p>
          </div>
          <a
            href="https://notion.so"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#0a0a0a] text-white text-xs px-4 py-2.5 rounded-xl hover:bg-[#262626] transition-colors duration-200 whitespace-nowrap"
          >
            Notion 열기 ↗
          </a>
        </div>

        {/* 도서 목록 */}
        {books.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📚</p>
            <p className="text-[#737373] text-sm">등록된 도서가 없습니다.</p>
            <p className="text-[#a0a0a0] text-xs mt-2">Notion에서 새 도서를 추가하고 "공개여부"를 체크하세요.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-2xl border border-[#efefef] p-5 flex items-start gap-5">
                {/* 표지 */}
                <div className="w-14 h-20 rounded-lg overflow-hidden bg-[#f0ede8] shrink-0">
                  {book.coverImage && book.coverImage !== '/images/placeholder.jpg' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#c8c8c8] text-xs">No img</div>
                  )}
                </div>
                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-[#0a0a0a]">{book.title}</h3>
                      <p className="text-xs text-[#a0a0a0] mt-0.5">{book.year} · {book.author}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {book.category && (
                        <span className="text-xs bg-[#f0ede8] text-[#737373] px-2 py-1 rounded-full">{book.category}</span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${book.isAvailable ? 'bg-[#e8f5e0] text-[#4a8c2a]' : 'bg-[#f0f0f0] text-[#a0a0a0]'}`}>
                        {book.isAvailable ? '구매가능' : '품절'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed mt-2 line-clamp-2">{book.description}</p>
                  {book.tags && book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {book.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-[#f8f8f8] text-[#a0a0a0] border border-[#efefef] px-2 py-0.5 rounded-full">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 도움말 */}
        <div className="mt-8 bg-white rounded-2xl border border-[#efefef] p-6">
          <h3 className="text-sm font-semibold text-[#0a0a0a] mb-3">Notion 도서 DB 컬럼 안내</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { col: '제목', type: '제목', desc: '책 이름' },
              { col: '출간연도', type: '텍스트', desc: '예: 2024' },
              { col: '저자', type: '텍스트', desc: '저자명' },
              { col: '소개', type: '텍스트', desc: '책 소개글' },
              { col: '카테고리', type: '선택', desc: '지역기록, 사진집 등' },
              { col: '구매링크', type: 'URL', desc: '네이버 스마트스토어 등' },
              { col: '구매가능', type: '체크박스', desc: '품절 시 해제' },
              { col: '공개여부', type: '체크박스', desc: '✅ 체크해야 사이트에 표시' },
              { col: '표지', type: '파일·미디어', desc: '표지 이미지 업로드' },
              { col: '내지이미지', type: '파일·미디어', desc: '내부 사진 업로드' },
            ].map((item) => (
              <div key={item.col} className="flex items-start gap-2 text-xs">
                <span className="font-medium text-[#0a0a0a] w-20 shrink-0">{item.col}</span>
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
