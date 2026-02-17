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
		<section className="section-dark py-24 px-6">
			<div className="max-w-2xl mx-auto text-center">
				{overline && (
					<div className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase mb-8 reveal">
						{overline}
					</div>
				)}
				<h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-white reveal delay-1">
					{title}
				</h2>
				<p className="text-ghost mt-4 mb-10 reveal delay-2">{subtitle}</p>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal delay-3">
					<a href={primaryHref} className="btn-signal px-8 py-3.5 text-sm">
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
