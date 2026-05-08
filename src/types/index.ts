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
  albumNumber: string   // e.g. "01", "02"
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
