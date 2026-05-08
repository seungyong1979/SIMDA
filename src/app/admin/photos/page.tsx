'use server'

import { requireAdminAuth } from '@/lib/admin-auth'
import { getPhotos } from '@/lib/notion'
import AdminBackButton from '@/components/admin/AdminBackButton'

const categoryLabel: Record<string, string> = {
  daily: '일상', event: '행사', local: '지역기록', aerial: '항공', underwater: '수중',
}

export default async function AdminPhotosPage() {
  await requireAdminAuth()
  const photos = await getPhotos()

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="bg-white border-b border-[#efefef] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
          <AdminBackButton />
          <div>
            <span className="text-base font-semibold text-[#0a0a0a]">사진 아카이브 관리</span>
            <span className="ml-3 text-xs text-[#a0a0a0] bg-[#f0f0f0] px-2 py-0.5 rounded-full">{photos.length}장</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-[#fffbf0] border border-[#f0e0a0] rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6b5a00] mb-0.5">Notion에서 사진 추가·수정하기</p>
            <p className="text-xs text-[#a08000]">사진을 추가하거나 수정하려면 Notion 데이터베이스를 이용하세요.</p>
          </div>
          <a href="https://notion.so" target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-[#0a0a0a] text-white text-xs px-4 py-2.5 rounded-xl hover:bg-[#262626] transition-colors duration-200 whitespace-nowrap">
            Notion 열기 ↗
          </a>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📷</p>
            <p className="text-[#737373] text-sm">등록된 사진이 없습니다.</p>
            <p className="text-[#a0a0a0] text-xs mt-2">Notion에서 사진을 추가하고 "공개여부"를 체크하세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-xl border border-[#efefef] overflow-hidden">
                <div className="aspect-square bg-[#f5f5f5] overflow-hidden">
                  {photo.image && photo.image !== '/images/placeholder.jpg' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#c8c8c8] text-3xl">📷</div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-[#0a0a0a] truncate">{photo.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] bg-[#f0f0f0] text-[#737373] px-1.5 py-0.5 rounded-full">
                      {categoryLabel[photo.category] ?? photo.category}
                    </span>
                    {photo.location && (
                      <span className="text-[10px] text-[#a0a0a0] truncate">{photo.location}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-white rounded-2xl border border-[#efefef] p-6">
          <h3 className="text-sm font-semibold text-[#0a0a0a] mb-3">Notion 사진 아카이브 DB 컬럼 안내</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { col: '제목', type: '제목', desc: '사진 제목' },
              { col: '카테고리', type: '선택', desc: 'daily / event / local / aerial / underwater' },
              { col: '설명', type: '텍스트', desc: '사진 설명' },
              { col: '날짜', type: '날짜', desc: '촬영 날짜' },
              { col: '장소', type: '텍스트', desc: '촬영 장소' },
              { col: '이미지', type: '파일·미디어', desc: '사진 파일 업로드 또는 페이지 커버 사용' },
              { col: '공개여부', type: '체크박스', desc: '✅ 체크해야 사이트에 표시' },
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
