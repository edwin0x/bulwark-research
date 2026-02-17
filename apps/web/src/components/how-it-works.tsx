import { swarmAgents } from '~/data/agents'
import { steps } from '~/data/steps'
import { BlueprintSection } from './blueprint-section'

export function HowItWorks() {
	return (
		<BlueprintSection number="03" title="PROCESS" id="how-it-works">
			{/* Horizontal process flow */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-16">
				{['DISCOVER', 'ARCHITECT', 'BUILD', 'MEASURE'].map((step, i) => (
					<div
						key={step}
						className={`relative p-6 border border-border reveal delay-${i + 1}`}
					>
						{/* Step number */}
						<span className="font-mono text-[10px] text-dim tracking-[0.08em] block mb-3">
							{String(i + 1).padStart(2, '0')}
						</span>
						{/* Step name */}
						<h3 className="font-display text-sm font-700 tracking-[0.04em] uppercase mb-2">
							{step}
						</h3>
						{/* Description */}
						<p className="text-secondary text-xs leading-relaxed">
							{steps[i]?.desc || 'Systematic process step'}
						</p>
						{/* Arrow connector (desktop) */}
						{i < 3 && (
							<span className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-dim text-sm z-10">
								→
							</span>
						)}
					</div>
				))}
			</div>

			{/* Terminal visualization */}
			<div className="reveal delay-4">
				<div className="bp-card-filled p-6 md:p-8 max-w-4xl">
					{/* Terminal header */}
					<div className="flex items-center gap-3 mb-2">
						<span className="w-2 h-2 bg-signal" />
						<span className="w-2 h-2 bg-dim" />
						<span className="w-2 h-2 bg-dim" />
						<span className="ml-3 font-mono text-[11px] text-dim">
							bulwark validate --deep --internet-scale
						</span>
					</div>

					{/* Status bar */}
					<div className="flex items-center justify-between py-3 mb-4 border-b border-border">
						<div className="flex items-center gap-4">
							<span className="font-mono text-[10px] text-signal flex items-center gap-1.5">
								<span className="w-1.5 h-1.5 bg-signal animate-pulse-dot" />
								SWARM ACTIVE
							</span>
							<span className="font-mono text-[10px] text-dim">47 agents deployed</span>
							<span className="font-mono text-[10px] text-dim hidden sm:inline">1,247 sources crawled</span>
							<span className="font-mono text-[10px] text-dim hidden md:inline">
								3.2M tokens processed
							</span>
						</div>
						<span className="font-mono text-[10px] text-secondary">02:41 elapsed</span>
					</div>

					{/* Agent swarm status */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
						{swarmAgents.map((agent, i) => (
							<div key={agent.name} className="flex items-center gap-3 py-1.5">
								<span
									className="w-1.5 h-1.5 animate-pulse-dot"
									style={{ background: agent.hex, animationDelay: `${i * 0.2}s` }}
								/>
								<span className="font-mono text-[11px] text-secondary w-40 shrink-0">
									{agent.name}
								</span>
								<div className="flex-1 h-1 bg-border overflow-hidden">
									<div
										className="h-full"
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
					<div className="mt-4 pt-4 border-t border-border space-y-1.5">
						<div className="font-mono text-[10px] text-dim opacity-70">
							<span className="text-signal">✓</span> Market Sizing: Ingested 23 industry reports,
							4 government databases
						</div>
						<div className="font-mono text-[10px] text-dim opacity-60">
							<span className="text-secondary">→</span> Competitor Intel: Crawling 156 company
							profiles, analyzing funding rounds...
						</div>
						<div className="font-mono text-[10px] text-dim opacity-50">
							<span className="text-secondary">→</span> Financial Model: Running Monte Carlo simulation
							(10,000 iterations)...
						</div>
						<div className="font-mono text-[10px] text-dim opacity-40">
							<span className="text-dim">⋯</span> +39 more agents working across 847 data sources
						</div>
					</div>
				</div>
			</div>
		</BlueprintSection>
	)
}
