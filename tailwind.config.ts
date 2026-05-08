import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 심다 브랜드 컬러 — 미니멀, 자연, 기록
        simda: {
          black: '#0a0a0a',
          white: '#fafafa',
          gray: {
            50:  '#f7f7f7',
            100: '#efefef',
            200: '#dfdfdf',
            300: '#c8c8c8',
            400: '#a0a0a0',
            500: '#737373',
            600: '#525252',
            700: '#3a3a3a',
            800: '#262626',
            900: '#171717',
          },
          accent: '#4a6741', // 자연/생태 — 깊은 녹색
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg':  ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm':  ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        'site': '1440px',
        'content': '1200px',
        'text': '680px',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'apple-in': 'cubic-bezier(0.42, 0, 1.0, 1.0)',
        'apple-out': 'cubic-bezier(0.0, 0, 0.58, 1.0)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      animation: {
        'fade-up':    'fadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'fade-in':    'fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'slide-up':   'slideUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      aspectRatio: {
        '4/3':  '4 / 3',
        '3/4':  '3 / 4',
        '16/9': '16 / 9',
        '3/2':  '3 / 2',
      },
    },
  },
  plugins: [],
}

export default config
