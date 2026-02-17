function CheckIcon() {
	return (
		<svg
			className="w-4 h-4 text-emerald mx-auto"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
		</svg>
	)
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
		recon: <span className="text-dim">Free — no commitment</span>,
		deployment: '$299/year',
		command: '$599 one-time',
	},
	{
		feature: 'Agent swarm analysis',
		recon: <span className="text-dim">Standard</span>,
		deployment: 'Full depth',
		command: 'Full depth',
	},
	{
		feature: 'Market sizing',
		recon: <CheckIcon />,
		deployment: <CheckIcon />,
		command: <CheckIcon />,
	},
	{
		feature: 'Monte Carlo financials',
		recon: <span className="text-dim">&mdash;</span>,
		deployment: <CheckIcon />,
		command: <CheckIcon />,
	},
	{
		feature: 'GTM strategy playbook',
		recon: <span className="text-dim">&mdash;</span>,
		deployment: <CheckIcon />,
		command: <CheckIcon />,
	},
	{
		feature: 'Investor-grade deliverables',
		recon: <span className="text-dim">&mdash;</span>,
		deployment: <CheckIcon />,
		command: <CheckIcon />,
	},
	{
		feature: 'White-label deliverables',
		recon: <span className="text-dim">&mdash;</span>,
		deployment: <span className="text-dim">&mdash;</span>,
		command: <CheckIcon />,
	},
	{
		feature: 'Priority turnaround',
		recon: <span className="text-dim">&mdash;</span>,
		deployment: <span className="text-dim">&mdash;</span>,
		command: <CheckIcon />,
	},
	{
		feature: 'Support',
		recon: <span className="text-dim">Self-serve</span>,
		deployment: 'Email',
		command: 'Dedicated desk',
	},
]

export function ComparisonTable() {
	return (
		<section className="relative py-24 px-6">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="section-title text-2xl sm:text-3xl reveal">Compare engagements</h2>
				</div>

				<div className="card-glass rounded-2xl overflow-hidden reveal delay-1">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-ink-border">
								<th className="text-left py-4 px-6 text-muted font-normal">Deliverable</th>
								<th className="py-4 px-4 text-center font-semibold">Recon</th>
								<th className="py-4 px-4 text-center font-semibold text-vermillion">Deployment</th>
								<th className="py-4 px-4 text-center font-semibold">Command</th>
							</tr>
						</thead>
						<tbody className="text-ivory">
							{rows.map((row, i) => (
								<tr
									key={row.feature}
									className={i < rows.length - 1 ? 'border-b border-ink-border/50' : ''}
								>
									<td className="py-3.5 px-6 text-muted">{row.feature}</td>
									<td className="py-3.5 px-4 text-center">{row.recon}</td>
									<td className="py-3.5 px-4 text-center">{row.deployment}</td>
									<td className="py-3.5 px-4 text-center">{row.command}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	)
}
