import type { ReactNode } from 'react'

interface CtaProps {
  overline?: string
  title: ReactNode
  subtitle: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function Cta({
  overline,
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {overline && (
          <div className="overline-divider max-w-md mx-auto mb-10 reveal">{overline}</div>
        )}
        <h2 className="section-title text-3xl sm:text-4xl md:text-5xl reveal delay-1">
          {title}
        </h2>
        <p className="text-muted mt-4 mb-10 reveal delay-2">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal delay-3">
          <a href={primaryHref} className="btn-glow px-8 py-3.5 text-sm">
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref && (
            <a href={secondaryHref} className="btn-outline px-8 py-3.5 text-sm">
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
