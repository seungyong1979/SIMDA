import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Render 배포용 — Node.js 서버 모드
  output: 'standalone',
  images: {
    remotePatterns: [
      // Notion 이미지 도메인
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'notion.so' },
      // 기타 외부 이미지
      { protocol: 'https', hostname: '*.amazonaws.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
