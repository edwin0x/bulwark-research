function CheckMark() {
	return <span className="text-signal text-center block">✓</span>
}

const rows: Array<{
	feature: string
	recon: React.ReactNode
	deployment: React.ReactNode
	command: React.ReactNode
}> = [
	{
		feature: 'Research engagements',
		recon: '1 complimentary',
		deployment: '10/mo',
		command: '10/mo permanently',
	},
	{
		feature: 'Investment',
		recon: <span className="text-dim">Free (normally $99)</span>,
		deployment: '$499/year',
		command: '$999 one-time',
	},
	{
		feature: 'Agent swarm analysis',
		recon: <span className="text-dim">Standard</span>,
		deployment: 'Full depth',
		command: 'Full depth',
	},
	{
		feature: 'Market sizing',
		recon: <CheckMark />,
		deployment: <CheckMark />,
		command: <CheckMark />,
	},
	{
		feature: 'Monte Carlo financials',
		recon: <span className="text-dim">&mdash;</span>,
		deployment: <CheckMark />,
		command: <CheckMark />,
	},
	{
		feature: 'GTM strategy playbook',
		recon: <span className="text-dim">&mdash;</span>,
		deployment: <CheckMark />,
		command: <CheckMark />,
	},
	{
		feature: 'Investor-grade deliverables',
		recon: <span className="text-dim">&mdash;</span>,
		deployment: <CheckMark />,
		command: <CheckMark />,
	},
	{
		feature: 'Priority turnaround',
		recon: <span className="text-dim">&mdash;</span>,
		deployment: <span className="text-dim">&mdash;</span>,
		command: <CheckMark />,
	},
	{
		feature: 'Client service',
		recon: <span className="text-dim">Email</span>,
		deployment: 'Email',
		command: 'Dedicated desk',
	},
]

export function ComparisonTable() {
	return (
		<section className="relative py-16 px-6">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="section-title text-xl sm:text-2xl reveal">COMPARE ENGAGEMENTS</h2>
				</div>

				<div className="border border-border overflow-hidden reveal delay-1">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-border bg-surface">
								<th className="text-left py-4 px-6 font-mono text-[10px] text-dim uppercase tracking-[0.08em] font-normal">Deliverable</th>
								<th className="py-4 px-4 text-center font-display text-xs font-700 uppercase tracking-wider">Recon</th>
								<th className="py-4 px-4 text-center font-display text-xs font-700 uppercase tracking-wider text-signal">Deployment</th>
								<th className="py-4 px-4 text-center font-display text-xs font-700 uppercase tracking-wider">Command</th>
							</tr>
						</thead>
						<tbody className="text-ink">
							{rows.map((row, i) => (
								<tr
									key={row.feature}
									className={i < rows.length - 1 ? 'border-b border-border' : ''}
								>
									<td className="py-3.5 px-6 text-secondary text-xs">{row.feature}</td>
									<td className="py-3.5 px-4 text-center text-xs">{row.recon}</td>
									<td className="py-3.5 px-4 text-center text-xs">{row.deployment}</td>
									<td className="py-3.5 px-4 text-center text-xs">{row.command}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	)
}
