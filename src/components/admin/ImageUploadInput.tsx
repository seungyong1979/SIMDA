'use client'

import { useRef, useState } from 'react'
import { Link as LinkIcon, Upload, Loader2 } from 'lucide-react'

interface ImageUploadInputProps {
  value: string
  onChange: (url: string) => void
  placeholder?: string
}

/**
 * 이미지 URL 입력 + "파일 선택" 업로드 버튼을 함께 제공하는 입력 컴포넌트.
 * 파일을 선택하면 /api/admin/upload 로 전송해 Cloudflare R2에 저장하고,
 * 반환된 공개 URL을 자동으로 입력란에 채워줍니다.
 * (URL 직접 입력 방식도 그대로 유지 — 필요하면 외부 링크를 붙여넣어도 됩니다.)
 */
export default function ImageUploadInput({ value, onChange, placeholder }: ImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? '업로드에 실패했습니다.')
      } else {
        onChange(data.url)
      }
    } catch {
      setError('업로드 중 오류가 발생했습니다.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8c8c8]" />
          <input
            type="url"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder ?? 'https://... (또는 오른쪽 버튼으로 사진 업로드)'}
            className="w-full text-sm border border-[#efefef] rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:border-[#a0a0a0] transition-colors placeholder:text-[#d0d0d0]"
          />
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-3 bg-[#0a0a0a] text-white text-sm rounded-xl hover:bg-[#262626] transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? '업로드 중...' : '사진 선택'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  )
}
