import { SystemDiagram } from './system-diagram'

export function Hero() {
	return (
		<section className="relative min-h-screen px-6 pt-24 pb-16 overflow-hidden flex flex-col justify-center">
			<div className="max-w-6xl mx-auto w-full">
				{/* Copy — centered */}
				<div className="max-w-2xl mx-auto text-center mb-12">
					{/* Overline */}
					<div
						className="flex items-center justify-center gap-2.5 mb-8 animate-slide-in"
						style={{ animationDelay: '0.4s' }}
					>
						<span className="relative flex h-2 w-2">
							<span className="animate-pulse-dot absolute inline-flex h-full w-full bg-signal" />
							<span className="relative inline-flex h-2 w-2 bg-signal" />
						</span>
						<span className="font-mono text-[10px] tracking-[0.08em] uppercase text-dim">
							Now Accepting Engagements
						</span>
					</div>

					{/* Headline */}
					<h1
						className="section-title text-3xl sm:text-4xl md:text-5xl mb-6 animate-slide-in"
						style={{ animationDelay: '0.5s' }}
					>
						Know What to Build
						<br className="hidden sm:block" />
						{' '}Before You Build It
					</h1>

					{/* Subheadline */}
					<p
						className="text-secondary text-base md:text-lg mx-auto max-w-lg mb-3 animate-slide-in"
						style={{ animationDelay: '0.6s' }}
					>
						Brief us on your idea. We run the diligence.
						A 30-page research dossier, delivered in 24 hours.
					</p>

					{/* Monospace descriptor */}
					<p
						className="font-mono text-[11px] text-dim tracking-wider mb-10 animate-slide-in"
						style={{ animationDelay: '0.65s' }}
					>
						// Digital consulting for people who build
					</p>

					{/* CTA */}
					<div id="hero-input" className="animate-slide-in" style={{ animationDelay: '0.7s' }}>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
							<a href="/#hero-input" className="btn-signal px-8 py-3 text-sm">
								Hire Us — It's Free →
							</a>
							<a href="/sample-report" className="btn-outline px-8 py-3 text-sm">
								View Sample Dossier
							</a>
						</div>
						<p className="mt-5 font-mono text-[10px] text-dim tracking-wider">
							First engagement complimentary · Delivered in 24 hours · No commitment
						</p>
					</div>
				</div>

				{/* Full-width intelligence network */}
				<div
					className="w-full max-w-5xl mx-auto animate-fade-in"
					style={{ animationDelay: '0.9s' }}
				>
					<SystemDiagram />
				</div>
			</div>
		</section>
	)
}
