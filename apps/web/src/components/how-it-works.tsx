import { swarmAgents } from '~/data/agents'
import { steps } from '~/data/steps'

export function HowItWorks() {
	return (
		<section id="how-it-works" className="relative py-24 px-6">
			<div className="divider max-w-6xl mx-auto mb-24" />

			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-20">
					<div className="overline-divider max-w-xs mx-auto mb-4 reveal">How It Works</div>
					<h2 className="section-title text-3xl sm:text-4xl md:text-5xl reveal delay-1">
						Big 4 research quality.
						<br />
						<span className="italic font-accent text-gradient-warm">24 hours. Not 5 months.</span>
					</h2>
				</div>

				{/* Steps */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
					{steps.map((step, i) => (
						<div key={step.num} className={`relative reveal delay-${i + 2}`}>
							{/* Connector line (desktop) */}
							{i < 2 && (
								<div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-ink-border to-ink-border/0" />
							)}

							<div className="text-center md:text-left">
								{/* Step number */}
								<div className="inline-flex items-center gap-3 mb-6">
									<span className="font-mono text-xs text-dim tracking-widest">{step.mono}</span>
									<span className="w-8 h-px bg-ink-border" />
									<span className="font-serif text-5xl font-bold text-white/10">{step.num}</span>
								</div>

								<h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
								<p className="text-muted text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
									{step.desc}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Process Visualization */}
				<div className="mt-20 reveal delay-4">
					<div className="card-glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
						{/* Terminal header */}
						<div className="flex items-center gap-2 mb-2">
							<div className="w-3 h-3 rounded-full bg-vermillion/60" />
							<div className="w-3 h-3 rounded-full bg-amber/60" />
							<div className="w-3 h-3 rounded-full bg-emerald/60" />
							<span className="ml-3 font-mono text-xs text-dim">
								bulwark validate --deep --internet-scale
							</span>
						</div>

						{/* Status bar */}
						<div className="flex items-center justify-between py-3 mb-4 border-b border-ink-border/50">
							<div className="flex items-center gap-4">
								<span className="font-mono text-[10px] text-emerald flex items-center gap-1.5">
									<span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
									SWARM ACTIVE
								</span>
								<span className="font-mono text-[10px] text-dim">47 agents deployed</span>
								<span className="font-mono text-[10px] text-dim">1,247 sources crawled</span>
								<span className="font-mono text-[10px] text-dim hidden md:inline">
									3.2M tokens processed
								</span>
							</div>
							<span className="font-mono text-[10px] text-muted">02:41 elapsed</span>
						</div>

						{/* Agent swarm status */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
							{swarmAgents.map((agent, i) => (
								<div key={agent.name} className="flex items-center gap-3 py-1.5">
									<div
										className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
										style={{ background: agent.hex, animationDelay: `${i * 0.2}s` }}
									/>
									<span className="font-mono text-[11px] text-muted w-40 shrink-0">
										{agent.name}
									</span>
									<div className="flex-1 h-1 bg-ink-border rounded-full overflow-hidden">
										<div
											className="h-full rounded-full"
											style={{ background: agent.hex, width: `${agent.pct}%` }}
										/>
									</div>
									<span className="font-mono text-[10px] text-dim w-10 text-right">
										{agent.pct}%
									</span>
								</div>
							))}
						</div>

						{/* Activity log */}
						<div className="mt-4 pt-4 border-t border-ink-border/50 space-y-1.5">
							<div className="font-mono text-[10px] text-dim opacity-70">
								<span className="text-emerald">✓</span> Market Sizing: Ingested 23 industry reports,
								4 government databases
							</div>
							<div className="font-mono text-[10px] text-dim opacity-60">
								<span className="text-amber">→</span> Competitor Intel: Crawling 156 company
								profiles, analyzing funding rounds...
							</div>
							<div className="font-mono text-[10px] text-dim opacity-50">
								<span className="text-cyan">→</span> Financial Model: Running Monte Carlo simulation
								(10,000 iterations)...
							</div>
							<div className="font-mono text-[10px] text-dim opacity-40">
								<span className="text-dim">⋯</span> +39 more agents working across 847 data sources
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
