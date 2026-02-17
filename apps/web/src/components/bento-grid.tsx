import { agents } from '~/data/agents'
import { BlueprintSection } from './blueprint-section'
import { CropMarks } from './crop-marks'

export function BentoGrid() {
	return (
		<BlueprintSection number="04" title="CAPABILITIES" id="what-you-get">
			<p className="text-secondary max-w-xl mb-10 reveal delay-1">
				Enterprise-grade due diligence was gatekept by big companies with big budgets. Our agent
				swarm crawls the internet at scale to give every founder that same rigor.
			</p>

			<CropMarks>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
					{agents.map((agent, i) => (
						<div
							key={agent.name}
							className={`bp-card p-6 reveal delay-${(i % 4) + 2} dim-annotate ${i < 2 ? 'sm:col-span-1 lg:col-span-2' : ''}`}
							data-dim-w={i < 2 ? '↔ 50%' : '↔ 25%'}
							data-dim-h="↕ auto"
						>
							<div className="flex items-start justify-between mb-4">
								<span className="text-xl">{agent.icon}</span>
								<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase">
									{String(i + 1).padStart(2, '0')}
								</span>
							</div>
							<h3 className="font-display text-sm font-700 tracking-[0.04em] uppercase mb-2">{agent.name}</h3>
							<p className="text-xs text-secondary leading-relaxed">{agent.desc}</p>
						</div>
					))}
				</div>
			</CropMarks>
		</BlueprintSection>
	)
}
