export function Hero() {
	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
			{/* Background effects */}
			<div className="hero-glow absolute inset-0 pointer-events-none" />
			<div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />

			{/* Content */}
			<div className="relative z-10 max-w-4xl mx-auto text-center">
				{/* Overline */}
				<div
					className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald/20 bg-emerald/5 backdrop-blur-sm mb-6 animate-fade-in"
					style={{ animationDelay: '0.1s' }}
				>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
						<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
					</span>
					<span className="font-mono text-[11px] tracking-[0.15em] uppercase text-emerald">
						Now Accepting Engagements
					</span>
				</div>

				{/* Headline */}
				<h1
					className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-up"
					style={{ animationDelay: '0.2s' }}
				>
					Everyone can build now.
					<br />
					Few know <span className="italic font-accent text-gradient-warm">what</span> to build.
				</h1>

				{/* Subheadline */}
				<p
					className="text-lg md:text-xl text-muted max-w-xl mx-auto mb-10 animate-fade-up"
					style={{ animationDelay: '0.35s' }}
				>
					Brief us on your idea. We run the diligence.
					<br />
					A 30-page research dossier, delivered in 24 hours.
					<br />
					First engagement on the house.
				</p>

				{/* CTAs */}
				<div id="hero-input" className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<a href="#" className="btn-glow px-8 py-3.5 text-sm font-semibold">
							Hire Us — It's Free →
						</a>
						<a href="/sample-report" className="btn-outline px-8 py-3.5 text-sm">
							View Sample Dossier
						</a>
					</div>
					<p className="mt-5 text-xs text-dim font-mono text-center">
						First engagement complimentary · Delivered in 24 hours · No commitment
					</p>
				</div>

				</div>

			{/* Scroll indicator */}
			<div
				className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in"
				style={{ animationDelay: '1s' }}
			>
				<div className="w-5 h-8 rounded-full border border-ink-border flex items-start justify-center p-1.5">
					<div className="w-1 h-2 rounded-full bg-muted animate-pulse" />
				</div>
			</div>
		</section>
	)
}
