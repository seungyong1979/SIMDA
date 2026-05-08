// ─── Book (Publishing) ───────────────────────────────────────────
export interface Book {
  id: string
  title: string
  year: string
  author: string
  description: string
  coverImage: string
  interiorImages: string[]
  purchaseLink?: string
  isAvailable: boolean
  category?: string
  tags?: string[]
}

// ─── Project ─────────────────────────────────────────────────────
export interface Project {
  id: string
  title: string
  period: string
  client?: string
  category: 'photo' | 'sound' | 'publishing' | 'local' | 'event' | 'content'
  description: string
  result?: string
  images: string[]
  tags?: string[]
}

// ─── Photo Archive ────────────────────────────────────────────────
export interface PhotoItem {
  id: string
  title: string
  category: 'daily' | 'event' | 'local' | 'aerial' | 'underwater'
  description?: string
  image: string
  date?: string
  location?: string
}

// ─── Sound Album ──────────────────────────────────────────────────
export interface SoundTrack {
  id: string
  title: string
  duration: string
  audioUrl: string
  description?: string
}

export interface SoundAlbum {
  id: string
  albumNumber: string
  title: string
  description: string
  coverImage: string
  location?: string
  recordedAt?: string
  tracks: SoundTrack[]
  relatedImages: string[]
}

// ─── Goods ───────────────────────────────────────────────────────
export interface Goods {
  id: string
  name: string
  type: 'magnet' | 'notebook' | 'postcard' | 'etc'
  description: string
  spec?: string
  images: string[]
  isAvailable: boolean
}

// ─── Program ─────────────────────────────────────────────────────
export interface Program {
  id: string
  title: string
  description: string
  location: string
  duration: string
  capacity: string
  price: string
  includes?: string[]
  cancelPolicy?: string
  bookingUrl?: string
  isActive: boolean
  nextDate?: string
}

// ─── Navigation ──────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  subItems?: NavItem[]
}

// ─── Site Settings ───────────────────────────────────────────────
export interface HeroImage {
  url: string
  alt?: string
  overlay?: number   // 0~100, 기본값 40 (어두운 오버레이 강도)
}

export interface SectionCard {
  id: string
  imageUrl?: string  // 배경 이미지 URL
  imageOverlay?: number // 0~100
}

export interface AboutImages {
  introImage?: string    // 소개 섹션 오른쪽 이미지
  valueImages?: {        // 철학 카드 4개 이미지 (사람/지역/기록/기획)
    people?: string
    place?: string
    archive?: string
    curation?: string
  }
}

export interface PageTexts {
  // Home
  homeTagline?: string        // "Suncheon · Since 2016"
  homeHeading?: string        // "사람, 지역, 기록, 기획."
  homeSubtext?: string        // "심다는 순천을 기반으로..."
  homeBrandText?: string      // "책방을 졸업한 뒤에도..."
  homeCtaText?: string        // "함께 만들고 싶은 일이 있으신가요?"
  // About
  aboutHeading?: string
  aboutSubtext?: string
  aboutIntro1?: string
  aboutIntro2?: string
  aboutIntro3?: string
  // Archive
  archiveHeading?: string
  archiveSubtext?: string
  // Publishing
  publishingHeading?: string
  publishingSubtext?: string
  // Program
  programHeading?: string
  programSubtext?: string
  // Goods
  goodsHeading?: string
  goodsSubtext?: string
  // Projects
  projectsHeading?: string
  projectsSubtext?: string
  // Contact
  contactHeading?: string
  contactSubtext?: string
}

export interface SiteSettings {
  heroImages: HeroImage[]      // 최대 5장
  heroInterval: number         // 슬라이드 전환 간격 (초)
  sectionCards?: SectionCard[] // 홈 섹션 카드 배경 이미지
  aboutImages?: AboutImages    // About 페이지 이미지
  texts: PageTexts
}
