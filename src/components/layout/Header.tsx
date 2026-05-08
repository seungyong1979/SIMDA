'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'About',      href: '/about' },
  { label: 'Archive',    href: '/archive' },
  { label: 'Publishing', href: '/publishing' },
  { label: 'Program',    href: '/program' },
  { label: 'Goods',      href: '/goods' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Contact',    href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 모바일 메뉴 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const headerBg = isHome
    ? scrolled
      ? 'bg-[#fafafa]/90 backdrop-blur-md border-b border-[#efefef]'
      : 'bg-transparent'
    : 'bg-[#fafafa]/90 backdrop-blur-md border-b border-[#efefef]'

  const textColor = isHome && !scrolled ? 'text-white' : 'text-[#0a0a0a]'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          headerBg,
        )}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* 로고 */}
            <Link
              href="/"
              className={cn(
                'text-lg font-semibold tracking-[0.15em] uppercase transition-colors duration-300',
                textColor,
              )}
            >
              Simda
            </Link>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm tracking-wide transition-all duration-300 relative group',
                    textColor,
                    pathname === item.href ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                  )}
                >
                  {item.label}
                  {/* 활성 인디케이터 */}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-px bg-current transition-all duration-300',
                      pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full',
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* 모바일 햄버거 */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                'md:hidden flex items-center justify-center w-10 h-10 transition-colors duration-300',
                textColor,
              )}
              aria-label="메뉴 열기"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center transition-all duration-500 md:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <nav className="container-site flex flex-col gap-2">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-white text-4xl font-light tracking-tight py-3 transition-all duration-300',
                'border-b border-white/10',
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                pathname === item.href ? 'opacity-100' : 'opacity-50 hover:opacity-100',
              )}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
