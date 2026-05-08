'use server'

import { requireAdminAuth } from '@/lib/admin-auth'
import { getSoundAlbums } from '@/lib/notion'
import AdminBackButton from '@/components/admin/AdminBackButton'

export default async function AdminSoundAlbumsPage() {
  await requireAdminAuth()
  const albums = await getSoundAlbums()

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="bg-white border-b border-[#efefef] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
          <AdminBackButton />
          <div>
            <span className="text-base font-semibold text-[#0a0a0a]">사운드 앨범 관리</span>
            <span className="ml-3 text-xs text-[#a0a0a0] bg-[#f0f0f0] px-2 py-0.5 rounded-full">{albums.length}개</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-[#fffbf0] border border-[#f0e0a0] rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6b5a00] mb-0.5">Notion에서 앨범 추가·수정하기</p>
            <p className="text-xs text-[#a08000]">사운드 앨범을 추가하거나 수정하려면 Notion 데이터베이스를 이용하세요.</p>
          </div>
          <a href="https://notion.so" target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-[#0a0a0a] text-white text-xs px-4 py-2.5 rounded-xl hover:bg-[#262626] transition-colors duration-200 whitespace-nowrap">
            Notion 열기 ↗
          </a>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🎵</p>
            <p className="text-[#737373] text-sm">등록된 사운드 앨범이 없습니다.</p>
            <p className="text-[#a0a0a0] text-xs mt-2">Notion에서 앨범을 추가하고 "공개여부"를 체크하세요.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {albums.map((album) => (
              <div key={album.id} className="bg-white rounded-2xl border border-[#efefef] overflow-hidden">
                <div className="flex items-start gap-5 p-5">
                  {/* 커버 */}
                  <div className="w-16 h-16 rounded-xl bg-[#0a0a0a] overflow-hidden shrink-0 flex items-center justify-center">
                    {album.coverImage && album.coverImage !== '/images/placeholder.jpg' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">🎵</span>
                    )}
                  </div>
                  {/* 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <span className="text-xs text-[#a0a0a0] font-mono bg-[#f0f0f0] px-2 py-0.5 rounded">
                        Album {album.albumNumber}
                      </span>
                      <h3 className="text-sm font-semibold text-[#0a0a0a]">{album.title}</h3>
                    </div>
                    <p className="text-xs text-[#737373] leading-relaxed line-clamp-2">{album.description}</p>
                    <div className="flex gap-3 mt-2">
                      {album.location && <p className="text-xs text-[#a0a0a0]">📍 {album.location}</p>}
                      {album.recordedAt && <p className="text-xs text-[#a0a0a0]">📅 {album.recordedAt}</p>}
                      <p className="text-xs text-[#a0a0a0]">🎵 {album.tracks.length}트랙</p>
                    </div>
                  </div>
                </div>
                {/* 트랙 목록 */}
                {album.tracks.length > 0 && (
                  <div className="border-t border-[#f5f5f5] px-5 py-3">
                    <p className="text-xs text-[#a0a0a0] mb-2">트랙 목록</p>
                    <div className="space-y-1.5">
                      {album.tracks.map((track, i) => (
                        <div key={track.id} className="flex items-center gap-3 text-xs text-[#737373]">
                          <span className="text-[#c8c8c8] w-4 text-right">{i + 1}</span>
                          <span className="flex-1">{track.title}</span>
                          <span className="text-[#a0a0a0]">{track.duration}</span>
                          {track.audioUrl ? (
                            <span className="text-[#4a8c2a]">✓ 파일</span>
                          ) : (
                            <span className="text-[#e0a0a0]">파일 없음</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-white rounded-2xl border border-[#efefef] p-6">
          <h3 className="text-sm font-semibold text-[#0a0a0a] mb-3">Notion 사운드 앨범 DB 컬럼 안내</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { col: '제목', type: '제목', desc: '앨범 이름' },
              { col: '앨범번호', type: '텍스트', desc: '예: 01, 02' },
              { col: '소개', type: '텍스트', desc: '앨범 소개글' },
              { col: '장소', type: '텍스트', desc: '녹음 장소' },
              { col: '기록일', type: '텍스트', desc: '예: 2024년 봄' },
              { col: '트랙목록', type: '텍스트', desc: 'JSON 형식으로 입력' },
              { col: '커버이미지', type: '파일·미디어', desc: '앨범 커버 이미지' },
              { col: '관련이미지', type: '파일·미디어', desc: '관련 사진들' },
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
