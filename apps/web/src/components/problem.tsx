import { BlueprintSection } from './blueprint-section'
import { CropMarks } from './crop-marks'

const stats = [
	{
		num: '01',
		value: '10x',
		label:
			'more products launched per year than a decade ago — building is no longer the bottleneck',
		source: 'Y Combinator',
	},
	{
		num: '02',
		value: '42%',
		label: 'of startups fail because they built something nobody needed',
		source: 'CB Insights',
	},
	{
		num: '03',
		value: '$150K+',
		label: "what a Big 4 firm charges for the research you'll get in 24 hours",
		source: 'McKinsey / Deloitte',
	},
]

export function Problem() {
	return (
		<BlueprintSection number="01" title="THE SHIFT" id="the-shift">
			<div className="text-center mb-12">
				<h3 className="section-title text-2xl sm:text-3xl md:text-4xl reveal delay-1">
					BUILDING IS EASY NOW.
					<br />
					<span className="text-secondary">DECIDING WHAT TO BUILD IS THE HARD PART.</span>
				</h3>
			</div>

			<CropMarks className="relative">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
					{stats.map((stat, i) => (
						<div
							key={stat.value}
							className={`bp-card p-8 reveal delay-${i + 2} dim-annotate`}
							data-dim-w={`↔ ${i === 0 ? '33%' : '33%'}`}
							data-dim-h="↕ auto"
						>
							<span className="font-mono text-[10px] text-dim tracking-[0.08em] block mb-4">
								{stat.num}
							</span>
							<div className="font-display text-4xl md:text-5xl font-bold text-ink mb-3 stat-num">
								{stat.value}
							</div>
							<p className="text-secondary text-sm leading-relaxed mb-4">{stat.label}</p>
							<span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
								{stat.source}
							</span>
						</div>
					))}
				</div>
			</CropMarks>
		</BlueprintSection>
	)
}
