'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function AdminBackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push('/admin')}
      className="flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors duration-200"
    >
      <ArrowLeft size={14} />
      대시보드
    </button>
  )
}
