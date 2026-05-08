'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const links = [
  { label: 'About',      href: '/about' },
  { label: 'Archive',    href: '/archive' },
  { label: 'Publishing', href: '/publishing' },
  { label: 'Program',    href: '/program' },
  { label: 'Goods',      href: '/goods' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Contact',    href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* 브랜드 */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-semibold tracking-[0.15em] uppercase">
              Simda
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-[260px]">
              사람·지역·기록·기획을 연결하는<br />콘텐츠 브랜드
            </p>
            <p className="text-xs text-white/30">
              전남 순천
            </p>
          </div>

          {/* 링크 */}
          <div>
            <p className="text-xs text-white/30 tracking-widest uppercase mb-5">Pages</p>
            <nav className="flex flex-col gap-3">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 연락처 */}
          <div>
            <p className="text-xs text-white/30 tracking-widest uppercase mb-5">Contact</p>
            <div className="space-y-3">
              <a
                href="mailto:simda@simda.co.kr"
                className="block text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                simda@simda.co.kr
              </a>
              <a
                href="https://www.instagram.com/simda_suncheon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                <ExternalLink size={15} />
                @simda_suncheon
              </a>
              <a
                href="https://smartstore.naver.com/simda"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                네이버 스마트스토어
              </a>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Simda. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            simda.co.kr
          </p>
        </div>
      </div>
    </footer>
  )
}
