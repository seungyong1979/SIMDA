'use client'

import { useState, useEffect, useCallback } from 'react'
import type { HeroImage } from '@/types'
import { cn } from '@/lib/utils'

interface HeroSliderProps {
  images: HeroImage[]
  interval?: number
}

export default function HeroSlider({ images, interval = 5 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev]       = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((next: number) => {
    if (animating || next === current) return
    setPrev(current)
    setAnimating(true)
    setCurrent(next)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 1000)
  }, [animating, current])

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => goTo((current + 1) % images.length), interval * 1000)
    return () => clearInterval(timer)
  }, [current, images.length, interval, goTo])

  if (images.length === 0) {
    return <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a1a] via-[#0a1a14] to-[#0a0a0a]" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 이전 이미지 fade-out */}
      {prev !== null && images[prev] && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0"
          style={{ backgroundImage: `url('${images[prev].url}')` }}
        />
      )}

      {/* 이미지 레이어 */}
      {images.map((img, i) => {
        const overlayOpacity = (img.overlay ?? 40) / 100
        return (
          <div
            key={img.url + i}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              i === current ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={i !== current}
          >
            {/* 배경 이미지 */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${img.url}')` }}
            />
            {/* 이미지별 개별 오버레이 */}
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          </div>
        )
      })}

      {/* 하단 그라디언트 (텍스트 가독성) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      {/* 인디케이터 */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'transition-all duration-500 rounded-full',
                i === current ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70',
              )}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
