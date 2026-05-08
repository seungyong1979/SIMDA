import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Simda — 사람·지역·기록·기획',
    template: '%s | Simda',
  },
  description: '사람·지역·기록·기획을 연결하는 콘텐츠 브랜드. 순천을 기반으로 사진 아카이브, 사운드스케이프, 출판, 기념품을 만듭니다.',
  keywords: ['심다', 'simda', '순천', '독립출판', '사운드스케이프', '사진아카이브', '콘텐츠브랜드'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://simda.co.kr',
    siteName: 'Simda',
    title: 'Simda — 사람·지역·기록·기획',
    description: '사람·지역·기록·기획을 연결하는 콘텐츠 브랜드.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-[#fafafa] text-[#0a0a0a]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
