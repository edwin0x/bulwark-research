const stats = [
	{
		value: '10x',
		label:
			'more products launched per year than a decade ago — building is no longer the bottleneck',
		source: 'Y Combinator',
	},
	{
		value: '42%',
		label: 'of startups fail because they built something nobody needed',
		source: 'CB Insights',
	},
	{
		value: '$150K+',
		label: "what a Big 4 firm charges for the research you'll get in 30 minutes",
		source: 'McKinsey / Deloitte',
	},
]

export function Problem() {
	return (
		<section className="relative py-24 px-6">
			<div className="divider max-w-6xl mx-auto mb-24" />

			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<div className="overline-divider max-w-xs mx-auto mb-4 reveal">The Shift</div>
					<h2 className="section-title text-3xl sm:text-4xl md:text-5xl reveal delay-1">
						Building is easy now.
						<br />
						<span className="italic font-accent text-gradient-warm">
							Deciding what to build is the hard part.
						</span>
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{stats.map((stat, i) => (
						<div key={stat.value} className={`card-glass rounded-2xl p-8 reveal delay-${i + 2}`}>
							<div className="font-serif text-4xl md:text-5xl font-bold text-gradient-warm mb-3 stat-num">
								{stat.value}
							</div>
							<p className="text-muted text-base leading-relaxed mb-4">{stat.label}</p>
							<span className="font-mono text-[0.625rem] uppercase tracking-widest text-dim">
								{stat.source}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
