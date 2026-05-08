import { Client } from '@notionhq/client'
import type { Book, Project, PhotoItem, SoundAlbum, SoundTrack, Goods } from '@/types'

// Notion 클라이언트 초기화 — 항상 최신 데이터 (캐시 없음)
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  fetch: (url, init) =>
    fetch(url, { ...init, cache: 'no-store' }),
})

// ─── 데이터베이스 ID 환경변수 ─────────────────────────────────────
const DB = {
  books:       process.env.NOTION_DB_BOOKS        ?? '',
  projects:    process.env.NOTION_DB_PROJECTS     ?? '',
  photos:      process.env.NOTION_DB_PHOTOS       ?? '',
  soundAlbums: process.env.NOTION_DB_SOUND_ALBUMS ?? '',
  goods:       process.env.NOTION_DB_GOODS        ?? '',
}

// ─── 공통 헬퍼 ───────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getText(prop: any): string {
  if (!prop) return ''
  if (prop.type === 'title')        return prop.title?.[0]?.plain_text ?? ''
  if (prop.type === 'rich_text')    return prop.rich_text?.[0]?.plain_text ?? ''
  if (prop.type === 'select')       return prop.select?.name ?? ''
  if (prop.type === 'multi_select') return prop.multi_select?.map((s: {name:string}) => s.name).join(', ') ?? ''
  if (prop.type === 'number')       return String(prop.number ?? '')
  if (prop.type === 'url')          return prop.url ?? ''
  if (prop.type === 'checkbox')     return String(prop.checkbox ?? false)
  if (prop.type === 'date')         return prop.date?.start ?? ''
  if (prop.type === 'formula')      return String(prop.formula?.string ?? prop.formula?.number ?? '')
  return ''
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCover(page: any): string {
  if (page.cover?.type === 'external') return page.cover.external.url
  if (page.cover?.type === 'file')     return page.cover.file.url
  const files = page.properties?.['표지']?.files ?? page.properties?.['Cover']?.files ?? []
  if (files.length > 0) {
    return files[0].type === 'external' ? files[0].external.url : files[0].file.url
  }
  return '/images/placeholder.jpg'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFiles(prop: any): string[] {
  if (!prop?.files) return []
  return prop.files.map((f: {type: string; external?: {url: string}; file?: {url: string}}) =>
    f.type === 'external' ? f.external!.url : f.file!.url
  )
}

// ─── Books ───────────────────────────────────────────────────────
export async function getBooks(): Promise<Book[]> {
  if (!DB.books) return getMockBooks()
  try {
    const res = await notion.databases.query({
      database_id: DB.books,
      filter: { property: '공개여부', checkbox: { equals: true } },
      sorts: [{ property: '출간연도', direction: 'descending' }],
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.results.map((page: any) => ({
      id:             page.id,
      title:          getText(page.properties['제목']),
      year:           getText(page.properties['출간연도']),
      author:         getText(page.properties['저자']),
      description:    getText(page.properties['소개']),
      coverImage:     getCover(page),
      interiorImages: getFiles(page.properties['내지이미지']),
      purchaseLink:   getText(page.properties['구매링크']) || undefined,
      isAvailable:    page.properties['구매가능']?.checkbox ?? false,
      category:       getText(page.properties['카테고리']) || undefined,
      tags:           page.properties['태그']?.multi_select?.map((s: {name: string}) => s.name) ?? [],
    }))
  } catch (e) {
    console.error('Notion getBooks error:', e)
    return getMockBooks()
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  const books = await getBooks()
  return books.find(b => b.id === id) ?? null
}

// ─── Projects ────────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  if (!DB.projects) return getMockProjects()
  try {
    const res = await notion.databases.query({
      database_id: DB.projects,
      filter: { property: '공개여부', checkbox: { equals: true } },
      sorts: [{ property: '기간', direction: 'descending' }],
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.results.map((page: any) => ({
      id:          page.id,
      title:       getText(page.properties['프로젝트명']),
      period:      getText(page.properties['기간']),
      client:      getText(page.properties['협업처']) || undefined,
      category:    (getText(page.properties['카테고리']) as Project['category']) || 'content',
      description: getText(page.properties['내용']),
      result:      getText(page.properties['결과물']) || undefined,
      images:      getFiles(page.properties['이미지']),
      tags:        page.properties['태그']?.multi_select?.map((s: {name: string}) => s.name) ?? [],
    }))
  } catch (e) {
    console.error('Notion getProjects error:', e)
    return getMockProjects()
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find(p => p.id === id) ?? null
}

// ─── Photos ───────────────────────────────────────────────────────
export async function getPhotos(): Promise<PhotoItem[]> {
  if (!DB.photos) return getMockPhotos()
  try {
    const res = await notion.databases.query({
      database_id: DB.photos,
      filter: { property: '공개여부', checkbox: { equals: true } },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.results.map((page: any) => ({
      id:          page.id,
      title:       getText(page.properties['제목']),
      category:    (getText(page.properties['카테고리']) as PhotoItem['category']) || 'daily',
      description: getText(page.properties['설명']) || undefined,
      image:       getCover(page),
      date:        getText(page.properties['날짜']) || undefined,
      location:    getText(page.properties['장소']) || undefined,
    }))
  } catch (e) {
    console.error('Notion getPhotos error:', e)
    return getMockPhotos()
  }
}

// ─── Sound Albums ─────────────────────────────────────────────────
export async function getSoundAlbums(): Promise<SoundAlbum[]> {
  if (!DB.soundAlbums) return getMockSoundAlbums()
  try {
    const res = await notion.databases.query({
      database_id: DB.soundAlbums,
      filter: { property: '공개여부', checkbox: { equals: true } },
      sorts: [{ property: '앨범번호', direction: 'ascending' }],
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.results.map((page: any) => {
      const tracksRaw = getText(page.properties['트랙목록'])
      let tracks: SoundTrack[] = []
      try { tracks = JSON.parse(tracksRaw) } catch { tracks = [] }
      return {
        id:            page.id,
        albumNumber:   getText(page.properties['앨범번호']),
        title:         getText(page.properties['제목']),
        description:   getText(page.properties['소개']),
        coverImage:    getCover(page),
        location:      getText(page.properties['장소']) || undefined,
        recordedAt:    getText(page.properties['기록일']) || undefined,
        tracks,
        relatedImages: getFiles(page.properties['관련이미지']),
      }
    })
  } catch (e) {
    console.error('Notion getSoundAlbums error:', e)
    return getMockSoundAlbums()
  }
}

export async function getSoundAlbumById(id: string): Promise<SoundAlbum | null> {
  const albums = await getSoundAlbums()
  return albums.find(a => a.id === id) ?? null
}

// ─── Goods ───────────────────────────────────────────────────────
export async function getGoods(): Promise<Goods[]> {
  if (!DB.goods) return getMockGoods()
  try {
    const res = await notion.databases.query({
      database_id: DB.goods,
      filter: { property: '공개여부', checkbox: { equals: true } },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.results.map((page: any) => ({
      id:          page.id,
      name:        getText(page.properties['제품명']),
      type:        (getText(page.properties['종류']) as Goods['type']) || 'etc',
      description: getText(page.properties['설명']),
      spec:        getText(page.properties['규격']) || undefined,
      images:      getFiles(page.properties['이미지']),
      isAvailable: page.properties['공개여부']?.checkbox ?? true,
    }))
  } catch (e) {
    console.error('Notion getGoods error:', e)
    return getMockGoods()
  }
}

// ─── Mock 데이터 (Notion 미연동 시 fallback) ──────────────────────
function getMockBooks(): Book[] {
  return [
    {
      id: 'book-1',
      title: '순천의 골목들',
      year: '2023',
      author: '심다',
      description: '순천 원도심의 골목 하나하나를 걸으며 기록한 사진·글의 아카이브. 사라지기 전에 남겨두고 싶은 풍경들.',
      coverImage: '/images/placeholder.jpg',
      interiorImages: [],
      isAvailable: true,
      category: '지역기록',
      tags: ['순천', '골목', '아카이브'],
    },
    {
      id: 'book-2',
      title: '와온의 시간',
      year: '2022',
      author: '심다',
      description: '순천만 와온 해변의 사계절을 담은 사진집. 갈대와 바람과 빛의 이야기.',
      coverImage: '/images/placeholder.jpg',
      interiorImages: [],
      isAvailable: true,
      category: '지역기록',
      tags: ['순천만', '와온', '사진'],
    },
  ]
}

function getMockProjects(): Project[] {
  return [
    {
      id: 'proj-1',
      title: '순천 원도심 사운드 아카이브',
      period: '2024',
      client: '순천시',
      category: 'sound',
      description: '원도심 주요 장소의 소리 풍경을 기록하는 프로젝트.',
      result: '사운드 앨범 02 제작',
      images: [],
      tags: ['사운드', '순천', '아카이브'],
    },
    {
      id: 'proj-2',
      title: '지역 서점 네트워크 기획',
      period: '2023',
      client: '전남 독립서점 협의회',
      category: 'content',
      description: '전남 지역 독립서점들의 네트워크를 기획하고 공동 콘텐츠를 제작한 프로젝트.',
      result: '공동 엽서 시리즈, 지도 제작',
      images: [],
      tags: ['출판', '네트워크', '지역'],
    },
  ]
}

function getMockPhotos(): PhotoItem[] {
  return [
    { id: 'ph-1', title: '순천만 일출', category: 'local', image: '/images/placeholder.jpg', location: '순천만' },
    { id: 'ph-2', title: '원도심 골목', category: 'daily', image: '/images/placeholder.jpg', location: '순천 원도심' },
    { id: 'ph-3', title: '항공 — 순천만 갈대', category: 'aerial', image: '/images/placeholder.jpg', location: '순천만' },
  ]
}

function getMockSoundAlbums(): SoundAlbum[] {
  return [
    {
      id: 'sa-1',
      albumNumber: '01',
      title: '순천만의 소리',
      description: '새벽 안개 속 순천만에서 채집한 소리들.',
      coverImage: '/images/placeholder.jpg',
      location: '순천만 국가정원',
      recordedAt: '2023년 겨울',
      tracks: [
        { id: 't1', title: '새벽 갈대밭', duration: '4:32', audioUrl: '', description: '동틀 무렵의 갈대 소리' },
        { id: 't2', title: '철새의 아침', duration: '3:18', audioUrl: '', description: '흑두루미 울음소리' },
      ],
      relatedImages: [],
    },
  ]
}

function getMockGoods(): Goods[] {
  return [
    {
      id: 'g-1',
      name: '순천만 마그넷',
      type: 'magnet',
      description: '순천만 갈대밭과 철새를 담은 마그넷 시리즈.',
      spec: '55×55mm, 아크릴',
      images: [],
      isAvailable: true,
    },
    {
      id: 'g-2',
      name: '심다 노트',
      type: 'notebook',
      description: '기록하는 삶을 위한 심다 노트.',
      spec: 'A6, 100p, 무선제본',
      images: [],
      isAvailable: true,
    },
    {
      id: 'g-3',
      name: '순천 엽서 세트',
      type: 'postcard',
      description: '순천의 계절을 담은 엽서 4종 세트.',
      spec: '100×148mm, 4종 세트',
      images: [],
      isAvailable: true,
    },
  ]
}
