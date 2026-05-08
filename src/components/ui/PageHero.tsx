import { cn } from '@/lib/utils'
import AnimateIn from './AnimateIn'

interface PageHeroProps {
  label?: string
  title: string
  description?: string
  className?: string
}

export default function PageHero({ label, title, description, className }: PageHeroProps) {
  return (
    <section className={cn('pt-36 md:pt-44 pb-16 md:pb-20 bg-[#fafafa]', className)}>
      <div className="container-site">
        {label && (
          <AnimateIn delay={0}>
            <p className="text-xs tracking-[0.2em] uppercase text-[#a0a0a0] mb-5">
              {label}
            </p>
          </AnimateIn>
        )}
        <AnimateIn delay={80}>
          <h1 className="font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-[1.05] text-[#0a0a0a] max-w-[800px]">
            {title}
          </h1>
        </AnimateIn>
        {description && (
          <AnimateIn delay={160}>
            <p className="mt-6 text-base md:text-lg text-[#525252] leading-relaxed max-w-[560px]">
              {description}
            </p>
          </AnimateIn>
        )}
      </div>
    </section>
  )
}
