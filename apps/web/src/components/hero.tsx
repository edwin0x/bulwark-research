export function Hero() {
	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden">
			{/* Background effects */}
			<div className="hero-glow absolute inset-0 pointer-events-none" />
			<div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />

			{/* Content */}
			<div className="relative z-10 max-w-4xl mx-auto text-center">
				{/* Overline */}
				<div
					className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full border border-emerald/20 bg-emerald/5 backdrop-blur-sm mb-6 animate-fade-in"
					style={{ animationDelay: '0.1s' }}
				>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
						<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
					</span>
					<span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-emerald">
						Now Accepting Engagements
					</span>
				</div>

				{/* Headline */}
				<h1
					className="section-title text-[1.65rem] sm:text-4xl md:text-5xl lg:text-7xl mb-4 sm:mb-6 animate-fade-up"
					style={{ animationDelay: '0.2s' }}
				>
					Everyone can build now.
					<br />
					Few know <span className="italic font-accent text-gradient-warm">what</span> to build.
				</h1>

				{/* Subheadline */}
				<p
					className="text-sm sm:text-base md:text-lg text-muted max-w-xl mx-auto mb-8 sm:mb-10 animate-fade-up"
					style={{ animationDelay: '0.35s' }}
				>
					Brief us on your idea. We run the diligence.
					<br className="hidden sm:block" />
					{' '}A 30-page research dossier, delivered in 24 hours.
					<br className="hidden sm:block" />
					{' '}First engagement on the house.
				</p>

				{/* CTAs */}
				<div id="hero-input" className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
						<a href="#" className="btn-glow w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-center">
							Hire Us — It's Free →
						</a>
						<a href="/sample-report" className="btn-outline w-full sm:w-auto px-8 py-3.5 text-sm text-center">
							View Sample Dossier
						</a>
					</div>
					<p className="mt-4 sm:mt-5 text-[10px] sm:text-xs text-dim font-mono text-center">
						First engagement complimentary · Delivered in 24 hours · No commitment
					</p>
				</div>

				</div>

		</section>
	)
}
