'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        setError('비밀번호가 올바르지 않습니다.')
      }
    } catch {
      setError('오류가 발생했습니다. 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-12">
          <p className="text-white text-2xl font-semibold tracking-[0.15em] uppercase mb-1">Simda</p>
          <p className="text-white/30 text-xs tracking-[0.2em] uppercase">Admin</p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors duration-300"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#0a0a0a] py-4 rounded-xl text-sm font-semibold hover:bg-white/90 disabled:opacity-50 transition-all duration-300"
          >
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>

        <p className="text-center mt-8 text-white/20 text-xs">
          simda.co.kr 관리자 전용 페이지입니다
        </p>
      </div>
    </div>
  )
}
