import fs from 'fs'
import path from 'path'
import type { SiteSettings, PageTexts, HeroImage, SectionCard } from '@/types'

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'site-settings.json')

const DEFAULT_SETTINGS: SiteSettings = {
  heroImages: [],
  heroInterval: 5,
  sectionCards: [
    { id: 'archive',    imageUrl: '', imageOverlay: 40 },
    { id: 'publishing', imageUrl: '', imageOverlay: 20 },
    { id: 'program',    imageUrl: '', imageOverlay: 40 },
    { id: 'goods',      imageUrl: '', imageOverlay: 20 },
  ],
  texts: {
    homeTagline: 'Suncheon · Since 2016',
    homeHeading: '사람, 지역,\n기록, 기획.',
    homeSubtext: '심다는 순천을 기반으로\n콘텐츠를 통해 지역과 사람을 연결합니다.',
    homeBrandText: '책방을 졸업한 뒤에도, 기록하고 만들고 연결하는 일은 계속됩니다.',
    homeCtaText: '함께 만들고 싶은\n일이 있으신가요?',
    aboutHeading: '기록하고 만들고\n연결하는 일.',
    aboutIntro1: '심다는 2016년 전남 순천에서 독립서점 책방 심다로 시작했습니다. 10년 동안 책과 사람을 연결하며, 지역의 이야기를 기록해왔습니다.',
    aboutIntro2: '2026년 2월, 책방은 졸업했지만 심다가 해온 일들은 계속됩니다. 공간이 아닌 콘텐츠 브랜드로서, 더 넓은 방식으로 지역과 사람을 연결하고자 합니다.',
    aboutIntro3: '사진 아카이브, 사운드스케이프, 출판, 기념품 — 형태는 달라도 심다가 하는 모든 일의 중심에는 기록이 있습니다.',
    archiveHeading: '일상 아카이브',
    archiveSubtext: '사진과 소리로 지역의 시간을 기록합니다.\n사라지기 전에, 잊히기 전에.',
    publishingHeading: '지역의 작은\n이야기들.',
    publishingSubtext: '사라지기 전에 남겨두고 싶은 이야기들을 책으로 만듭니다.\n순천과 그 주변의 풍경, 사람, 기억.',
    programHeading: '소리 풍경 속을\n함께 걷습니다.',
    programSubtext: 'Sound Walking — 귀를 열고, 천천히, 지금 이 장소의 소리를 듣습니다.',
    goodsHeading: '순천의 풍경을\n일상 속으로.',
    goodsSubtext: '마그넷, 노트, 엽서 — 순천의 기억을 담은 작은 물건들.\n인근 기념품점과 문화공간에서 만날 수 있습니다.',
    projectsHeading: '함께 만들어온\n것들.',
    projectsSubtext: '사진, 사운드, 출판, 지역협업, 행사, 콘텐츠 기획 —\n심다가 진행해온 프로젝트들을 소개합니다.',
    contactHeading: '연락해 주세요.',
    contactSubtext: '촬영, 출판, 굿즈 납품, 협업 등 어떤 이야기든 환영합니다.',
  },
}

export function getSettings(): SiteSettings {
  try {
    if (!fs.existsSync(SETTINGS_PATH)) return DEFAULT_SETTINGS
    const raw = fs.readFileSync(SETTINGS_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as SiteSettings
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      texts: { ...DEFAULT_SETTINGS.texts, ...parsed.texts },
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: SiteSettings): void {
  const dir = path.dirname(SETTINGS_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf-8')
}

export function updateTexts(texts: Partial<PageTexts>): SiteSettings {
  const current = getSettings()
  const updated: SiteSettings = {
    ...current,
    texts: { ...current.texts, ...texts },
  }
  saveSettings(updated)
  return updated
}

export function updateHeroImages(images: HeroImage[], interval?: number): SiteSettings {
  const current = getSettings()
  const updated: SiteSettings = {
    ...current,
    heroImages: images.slice(0, 5),
    heroInterval: interval ?? current.heroInterval,
  }
  saveSettings(updated)
  return updated
}

export function updateSectionCards(cards: SectionCard[]): SiteSettings {
  const current = getSettings()
  const updated: SiteSettings = { ...current, sectionCards: cards }
  saveSettings(updated)
  return updated
}
