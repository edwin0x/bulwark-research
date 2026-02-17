const competitors = ['Lemonade Pet', 'Trupanion', 'Healthy Paws']

const risks = [
	{ label: 'Market', level: 'Low', hex: '#46a758' },
	{ label: 'Execution', level: 'Med', hex: '#ffb224' },
	{ label: 'Regulatory', level: 'High', hex: '#e5484d' },
]

const bulletItems = [
	'Multi-agent synthesis with cross-referenced confidence scoring',
	'Internet-scale research across 1,000+ data sources per report',
	'Monte Carlo financial simulations, not napkin math',
	'Delivered to your inbox when ready — also downloadable from the website',
	'Comparison mode for stress-testing multiple ideas',
]

export function ReportPreview() {
	return (
		<section className="relative py-24 px-6 overflow-hidden">
			<div className="divider max-w-6xl mx-auto mb-24" />

			{/* Background glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vermillion/5 rounded-full blur-[120px] pointer-events-none" />

			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left: Copy */}
					<div>
						<div className="overline-divider max-w-xs mb-4 reveal">The Report</div>
						<h2 className="section-title text-3xl sm:text-4xl reveal delay-1">
							A research report
							<br />
							<span className="italic font-accent text-gradient-warm">worthy of a boardroom</span>
						</h2>
						<p className="text-muted mt-4 leading-relaxed reveal delay-2">
							Not a ChatGPT summary. A structured, data-backed intelligence brief synthesized from
							thousands of data points across hundreds of sources — delivered to your inbox in 30
							minutes. The kind Big 4 firms charge $150K+ for.
						</p>

						<ul className="mt-8 space-y-4">
							{bulletItems.map((item, i) => (
								<li key={item} className={`flex items-start gap-3 reveal delay-${i + 3}`}>
									<span className="mt-1 w-1.5 h-1.5 rounded-full bg-vermillion shrink-0" />
									<span className="text-sm text-ivory">{item}</span>
								</li>
							))}
						</ul>

						<div className="mt-10 reveal delay-5">
							<a href="#hero-input" className="btn-glow inline-flex px-7 py-3 text-sm">
								Try It Free →
							</a>
						</div>
					</div>

					{/* Right: Report Mockup */}
					<div className="reveal delay-3">
						<div className="report-glow rounded-2xl border border-ink-border bg-ink-light/80 p-6 md:p-8">
							{/* Report header */}
							<div className="flex items-center justify-between mb-6">
								<div>
									<div className="font-mono text-[10px] text-dim tracking-widest uppercase mb-1">
										Bulwark Report · Confidential
									</div>
									<div className="font-serif text-lg font-semibold">AI-Powered Pet Insurance</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-emerald" />
									<span className="font-mono text-xs text-emerald">78/100</span>
								</div>
							</div>

							<div className="h-px bg-ink-border mb-6" />

							{/* Report sections preview */}
							<div className="space-y-4">
								{/* Market Size */}
								<div className="p-4 rounded-xl bg-ink/50 border border-ink-border/50">
									<div className="flex items-center gap-2 mb-2">
										<span className="text-vermillion text-sm">◎</span>
										<span className="font-mono text-xs text-muted">Market Sizing</span>
									</div>
									<div className="grid grid-cols-3 gap-3">
										<div>
											<div className="font-serif text-xl font-bold">$4.2B</div>
											<div className="font-mono text-[9px] text-dim uppercase">TAM</div>
										</div>
										<div>
											<div className="font-serif text-xl font-bold">$890M</div>
											<div className="font-mono text-[9px] text-dim uppercase">SAM</div>
										</div>
										<div>
											<div className="font-serif text-xl font-bold">$67M</div>
											<div className="font-mono text-[9px] text-dim uppercase">SOM</div>
										</div>
									</div>
								</div>

								{/* Competitor landscape */}
								<div className="p-4 rounded-xl bg-ink/50 border border-ink-border/50">
									<div className="flex items-center gap-2 mb-3">
										<span className="text-amber text-sm">◈</span>
										<span className="font-mono text-xs text-muted">Competitor Landscape</span>
									</div>
									<div className="space-y-2">
										{competitors.map((comp, i) => (
											<div key={comp} className="flex items-center gap-3">
												<div className="w-5 h-5 rounded bg-ink-mid border border-ink-border flex items-center justify-center text-[8px] font-bold text-muted">
													{comp[0]}
												</div>
												<span className="text-xs text-ivory flex-1">{comp}</span>
												<div className="flex gap-0.5">
													{[1, 2, 3, 4, 5].map((n) => (
														<div
															key={n}
															className={`w-4 h-1.5 rounded-sm ${n <= 3 - i ? 'bg-amber/60' : 'bg-ink-border/40'}`}
														/>
													))}
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Risk Score */}
								<div className="p-4 rounded-xl bg-ink/50 border border-ink-border/50">
									<div className="flex items-center gap-2 mb-2">
										<span className="text-vermillion text-sm">△</span>
										<span className="font-mono text-xs text-muted">Risk Assessment</span>
									</div>
									<div className="flex items-center gap-4">
										{risks.map((risk) => (
											<div key={risk.label} className="flex items-center gap-2">
												<div
													className="w-1.5 h-1.5 rounded-full"
													style={{ background: risk.hex }}
												/>
												<span className="font-mono text-[10px] text-dim">
													{risk.label}: <span style={{ color: risk.hex }}>{risk.level}</span>
												</span>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Report footer */}
							<div className="mt-6 flex items-center justify-between">
								<span className="font-mono text-[9px] text-dim tracking-widest uppercase">
									Generated Feb 17, 2026 · 32 pages · 1,247 sources · 47 agents
								</span>
								<div className="flex gap-2">
									<div className="px-2 py-1 rounded text-[10px] font-mono text-dim border border-ink-border hover:border-muted cursor-pointer transition-colors">
										PDF
									</div>
									<div className="px-2 py-1 rounded text-[10px] font-mono text-dim border border-ink-border hover:border-muted cursor-pointer transition-colors">
										Share
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
