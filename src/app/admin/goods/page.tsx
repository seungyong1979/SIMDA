'use server'

import { requireAdminAuth } from '@/lib/admin-auth'
import { getGoods } from '@/lib/notion'
import AdminBackButton from '@/components/admin/AdminBackButton'

const typeLabel: Record<string, string> = {
  magnet: '마그넷', notebook: '노트', postcard: '엽서', etc: '기타',
}

export default async function AdminGoodsPage() {
  await requireAdminAuth()
  const goods = await getGoods()

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="bg-white border-b border-[#efefef] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
          <AdminBackButton />
          <div>
            <span className="text-base font-semibold text-[#0a0a0a]">굿즈 관리</span>
            <span className="ml-3 text-xs text-[#a0a0a0] bg-[#f0f0f0] px-2 py-0.5 rounded-full">{goods.length}개</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-[#fffbf0] border border-[#f0e0a0] rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6b5a00] mb-0.5">Notion에서 굿즈 추가·수정하기</p>
            <p className="text-xs text-[#a08000]">새 제품을 추가하거나 수정하려면 Notion 데이터베이스를 이용하세요.</p>
          </div>
          <a href="https://notion.so" target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-[#0a0a0a] text-white text-xs px-4 py-2.5 rounded-xl hover:bg-[#262626] transition-colors duration-200 whitespace-nowrap">
            Notion 열기 ↗
          </a>
        </div>

        {goods.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🎁</p>
            <p className="text-[#737373] text-sm">등록된 굿즈가 없습니다.</p>
            <p className="text-[#a0a0a0] text-xs mt-2">Notion에서 제품을 추가하고 "공개여부"를 체크하세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goods.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-[#efefef] p-5 flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#f5f3f0] overflow-hidden shrink-0">
                  {item.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#c8c8c8] text-lg">🎁</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#0a0a0a]">{item.name}</h3>
                    <span className="text-xs bg-[#f5f3f0] text-[#737373] px-2 py-0.5 rounded-full shrink-0">
                      {typeLabel[item.type] ?? item.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed line-clamp-2">{item.description}</p>
                  {item.spec && <p className="text-xs text-[#a0a0a0] mt-1">{item.spec}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-white rounded-2xl border border-[#efefef] p-6">
          <h3 className="text-sm font-semibold text-[#0a0a0a] mb-3">Notion 굿즈 DB 컬럼 안내</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { col: '제품명', type: '제목', desc: '제품 이름' },
              { col: '종류', type: '선택', desc: 'magnet / notebook / postcard / etc' },
              { col: '설명', type: '텍스트', desc: '제품 소개' },
              { col: '규격', type: '텍스트', desc: '예: 55×55mm, 아크릴' },
              { col: '이미지', type: '파일·미디어', desc: '제품 사진 업로드' },
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
