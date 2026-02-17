import { BlueprintSection } from './blueprint-section'
import { CropMarks } from './crop-marks'

const competitors = ['Lemonade Pet', 'Trupanion', 'Healthy Paws']

const risks = [
	{ label: 'Market', level: 'Low', hex: '#46a758' },
	{ label: 'Execution', level: 'Med', hex: '#ffb224' },
	{ label: 'Regulatory', level: 'High', hex: '#e5484d' },
]

const bulletItems = [
	'Multi-agent synthesis with cross-referenced confidence scoring',
	'Internet-scale research across 1,000+ data sources per engagement',
	'Monte Carlo financial simulations, not napkin math',
	'Delivered to your inbox when ready — archived in your client portal',
	'Comparison mode for stress-testing multiple ideas',
]

export function ReportPreview() {
	return (
		<BlueprintSection number="05" title="THE DOSSIER">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
				{/* Left: Copy */}
				<div>
					<h3 className="section-title text-2xl sm:text-3xl reveal delay-1">
						A RESEARCH DOSSIER
						<br />
						<span className="text-secondary">WORTHY OF A BOARDROOM</span>
					</h3>
					<p className="text-secondary mt-4 leading-relaxed reveal delay-2">
						Not a ChatGPT summary. A structured, data-backed intelligence brief synthesized from
						thousands of data points across hundreds of sources — delivered to your inbox within
						24 hours. The kind Big 4 firms charge $150K+ for.
					</p>

					<ul className="mt-8 space-y-3">
						{bulletItems.map((item, i) => (
							<li key={item} className={`flex items-start gap-3 reveal delay-${i + 3}`}>
								<span className="mt-1.5 w-1 h-1 bg-signal shrink-0" />
								<span className="text-sm text-ink">{item}</span>
							</li>
						))}
					</ul>

					<div className="mt-10 reveal delay-5">
						<a href="#hero-input" className="btn-signal px-7 py-3 text-sm">
							Hire Us — It's Free →
						</a>
					</div>
				</div>

				{/* Right: Report Mockup */}
				<div className="reveal delay-3">
					<CropMarks>
						<div className="border border-border bg-surface p-6 md:p-8">
							{/* Report header */}
							<div className="flex items-center justify-between mb-6">
								<div>
									<div className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase mb-1">
										Bulwark Dossier · Confidential
									</div>
									<div className="font-display text-lg font-600 uppercase tracking-wider">
										AI-Powered Pet Insurance
									</div>
								</div>
								<div className="flex items-center gap-2">
									<span className="w-2 h-2 bg-signal" />
									<span className="font-mono text-xs text-signal">78/100</span>
								</div>
							</div>

							<div className="h-px bg-border mb-6" />

							{/* Report sections preview */}
							<div className="space-y-4">
								{/* Market Size */}
								<div className="p-4 bg-white border border-border">
									<div className="flex items-center gap-2 mb-2">
										<span className="text-signal text-sm">◎</span>
										<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase">
											Market Sizing
										</span>
									</div>
									<div className="grid grid-cols-3 gap-3">
										{[
											{ val: '$4.2B', label: 'TAM' },
											{ val: '$890M', label: 'SAM' },
											{ val: '$67M', label: 'SOM' },
										].map((m) => (
											<div key={m.label}>
												<div className="font-display text-xl font-bold">{m.val}</div>
												<div className="font-mono text-[9px] text-dim uppercase tracking-wider">
													{m.label}
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Competitor landscape */}
								<div className="p-4 bg-white border border-border">
									<div className="flex items-center gap-2 mb-3">
										<span className="text-dim text-sm">◈</span>
										<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase">
											Competitor Landscape
										</span>
									</div>
									<div className="space-y-2">
										{competitors.map((comp, i) => (
											<div key={comp} className="flex items-center gap-3">
												<div className="w-5 h-5 bg-surface border border-border flex items-center justify-center font-mono text-[8px] font-bold text-secondary">
													{comp[0]}
												</div>
												<span className="text-xs text-ink flex-1">{comp}</span>
												<div className="flex gap-0.5">
													{[1, 2, 3, 4, 5].map((n) => (
														<div
															key={n}
															className={`w-4 h-1.5 ${n <= 3 - i ? 'bg-ink' : 'bg-border'}`}
														/>
													))}
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Risk Score */}
								<div className="p-4 bg-white border border-border">
									<div className="flex items-center gap-2 mb-2">
										<span className="text-signal text-sm">△</span>
										<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase">
											Risk Assessment
										</span>
									</div>
									<div className="flex items-center gap-4">
										{risks.map((risk) => (
											<div key={risk.label} className="flex items-center gap-2">
												<span
													className="w-1.5 h-1.5"
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
								<span className="font-mono text-[9px] text-dim tracking-wider uppercase">
									Generated Feb 17, 2026 · 32 pages · 1,247 sources
								</span>
								<div className="flex gap-2">
									{['PDF', 'Share'].map((action) => (
										<button
											key={action}
											type="button"
											className="px-2 py-1 text-[10px] font-mono text-dim border border-border hover:border-ink cursor-pointer transition-colors"
										>
											{action}
										</button>
									))}
								</div>
							</div>
						</div>
					</CropMarks>
				</div>
			</div>
		</BlueprintSection>
	)
}
