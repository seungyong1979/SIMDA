import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: '관리자 | Simda',
    template: '%s | 관리자',
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {children}
    </div>
  )
}
