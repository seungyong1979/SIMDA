import { cn } from '@/lib/utils'
import AnimateIn from './AnimateIn'

interface SectionTitleProps {
  label?: string        // 작은 상단 레이블 (e.g. "Archive")
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  light?: boolean       // 다크 배경 위에서 사용
}

export default function SectionTitle({
  label,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
  light = false,
}: SectionTitleProps) {
  const textColor = light ? 'text-white' : 'text-[#0a0a0a]'
  const subColor  = light ? 'text-white/40' : 'text-[#a0a0a0]'
  const descColor = light ? 'text-white/60' : 'text-[#525252]'

  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {label && (
        <AnimateIn delay={0}>
          <p className={cn('text-xs tracking-[0.2em] uppercase mb-4', subColor)}>
            {label}
          </p>
        </AnimateIn>
      )}
      <AnimateIn delay={80}>
        <h2
          className={cn(
            'font-semibold text-balance leading-tight',
            'text-[clamp(2rem,4vw,3.25rem)]',
            'tracking-[-0.02em]',
            textColor,
            titleClassName,
          )}
        >
          {title}
        </h2>
      </AnimateIn>
      {description && (
        <AnimateIn delay={160}>
          <p
            className={cn(
              'mt-5 text-base md:text-lg leading-relaxed',
              align === 'center' ? 'max-w-[580px] mx-auto' : 'max-w-[520px]',
              descColor,
            )}
          >
            {description}
          </p>
        </AnimateIn>
      )}
    </div>
  )
}
