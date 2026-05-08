'use client'

import { useState, useEffect, useCallback } from 'react'
import type { HeroImage } from '@/types'
import { cn } from '@/lib/utils'

interface HeroSliderProps {
  images: HeroImage[]
  interval?: number // 초 단위
}

export default function HeroSlider({ images, interval = 5 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((next: number) => {
    if (animating || next === current) return
    setPrev(current)
    setAnimating(true)
    setCurrent(next)
    setTimeout(() => {
      setPrev(null)
      setAnimating(false)
    }, 1000)
  }, [animating, current])

  // 자동 슬라이드
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      goTo((current + 1) % images.length)
    }, interval * 1000)
    return () => clearInterval(timer)
  }, [current, images.length, interval, goTo])

  if (images.length === 0) {
    // 이미지 없을 때 기본 그라디언트
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a1a] via-[#0a1a14] to-[#0a0a0a]" />
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 이전 이미지 (fade-out) */}
      {prev !== null && images[prev] && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0"
          style={{ backgroundImage: `url('${images[prev].url}')` }}
        />
      )}

      {/* 현재 이미지들 */}
      {images.map((img, i) => (
        <div
          key={img.url + i}
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-opacity duration-1000',
            i === current ? 'opacity-100' : 'opacity-0',
          )}
          style={{ backgroundImage: `url('${img.url}')` }}
          aria-hidden={i !== current}
        />
      ))}

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* 인디케이터 (2장 이상일 때) */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'transition-all duration-500 rounded-full',
                i === current
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70',
              )}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
