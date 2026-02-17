export function Hero() {
	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
			{/* Background effects */}
			<div className="hero-glow absolute inset-0 pointer-events-none" />
			<div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />

			{/* Floating background text */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
				<span className="font-serif text-[12vw] font-bold text-white/[0.015] whitespace-nowrap">
					JUDGMENT
				</span>
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-4xl mx-auto text-center">
				{/* Overline */}
				<div
					className="overline-divider max-w-sm mx-auto mb-6 animate-fade-in"
					style={{ animationDelay: '0.1s' }}
				>
					The Last Human Moat
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
					AI made execution cheap. Taste and judgment are the last moat. An agent swarm runs
					internet-scale research on your idea and delivers a Big 4-quality dossier to your inbox —
					in 30 minutes.
				</p>

				{/* Input Area */}
				<div id="hero-input" className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
					<div className="relative max-w-xl mx-auto">
						<div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl border border-ink-border bg-ink-light/60 backdrop-blur-sm">
							<input
								type="text"
								placeholder="Describe your startup idea..."
								className="flex-1 bg-transparent px-5 py-3.5 text-paper placeholder-dim outline-none text-base rounded-xl"
							/>
							<button
								type="button"
								className="btn-glow px-7 py-3.5 text-sm font-semibold whitespace-nowrap"
							>
								Validate Now →
							</button>
						</div>
						<p className="mt-4 text-xs text-dim font-mono">
							First idea free · Delivered to your inbox in 30 min · No credit card
						</p>
					</div>
				</div>

				{/* Trust Signals */}
				<div className="mt-16 animate-fade-up" style={{ animationDelay: '0.65s' }}>
					<p className="text-[10px] font-mono uppercase tracking-[0.2em] text-dim mb-5">
						Research infrastructure powered by
					</p>
					<div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-dim">
						{/* OpenAI */}
						<div className="flex items-center gap-2 opacity-50 hover:opacity-80 transition-opacity">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
								<path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
							</svg>
							<span className="text-xs font-medium">OpenAI</span>
						</div>
						{/* Anthropic */}
						<div className="flex items-center gap-2 opacity-50 hover:opacity-80 transition-opacity">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
								<path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm1.21 5.662l-2.33 5.942h5.072L7.78 9.182z" />
							</svg>
							<span className="text-xs font-medium">Anthropic</span>
						</div>
						{/* Perplexity */}
						<div className="flex items-center gap-2 opacity-50 hover:opacity-80 transition-opacity">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4a9.6 9.6 0 1 1 0 19.2 9.6 9.6 0 0 1 0-19.2zm-1.2 4.8v4.2H7.2L12 6v1.2zm2.4 0l4.8 5.4h-3.6v4.2L10.8 18v-1.2h1.2v-4.2h3.6l-4.8-5.4z" />
							</svg>
							<span className="text-xs font-medium">Perplexity</span>
						</div>
						{/* Firecrawl */}
						<div className="flex items-center gap-2 opacity-50 hover:opacity-80 transition-opacity">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l-3 3 1.5-5.5L12 6l2.5 3-1.5 5.5-3-3v5z" />
							</svg>
							<span className="text-xs font-medium">Firecrawl</span>
						</div>
						{/* Snowflake */}
						<div className="flex items-center gap-2 opacity-50 hover:opacity-80 transition-opacity">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 1l1.5 3.5L17 3l-1.5 3.5L19 8l-3.5 1.5L17 13l-3.5-1.5L12 15l-1.5-3.5L7 13l1.5-3.5L5 8l3.5-1.5L7 3l3.5 1.5L12 1zm0 14l.9 2.1L15 16l-.9 2.1L16 20l-2.1-.9L13 22l-.9-2.1L10 20l2.1-.9L11 16l2.1.9L12 15z" />
							</svg>
							<span className="text-xs font-medium">Snowflake</span>
						</div>
					</div>
					<div className="mt-6 flex items-center justify-center gap-2">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
						</span>
						<span className="text-xs text-dim font-mono">Early access · Limited spots</span>
					</div>
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
