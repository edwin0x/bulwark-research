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
  free: React.ReactNode
  pro: React.ReactNode
  lifetime: React.ReactNode
}> = [
  {
    feature: 'Validations',
    free: '10/mo',
    pro: '10 credits',
    lifetime: '10/mo forever',
  },
  {
    feature: 'Pricing model',
    free: <span className="text-dim">Free forever</span>,
    pro: 'One-time',
    lifetime: 'One-time',
  },
  {
    feature: 'Agent swarm analysis',
    free: <span className="text-dim">Basic</span>,
    pro: 'Full',
    lifetime: 'Full',
  },
  {
    feature: 'Market sizing',
    free: <CheckIcon />,
    pro: <CheckIcon />,
    lifetime: <CheckIcon />,
  },
  {
    feature: 'Monte Carlo financials',
    free: <span className="text-dim">&mdash;</span>,
    pro: <CheckIcon />,
    lifetime: <CheckIcon />,
  },
  {
    feature: 'GTM playbook',
    free: <span className="text-dim">&mdash;</span>,
    pro: <CheckIcon />,
    lifetime: <CheckIcon />,
  },
  {
    feature: 'Investor-ready reports',
    free: <span className="text-dim">&mdash;</span>,
    pro: <CheckIcon />,
    lifetime: <CheckIcon />,
  },
  {
    feature: 'White-label reports',
    free: <span className="text-dim">&mdash;</span>,
    pro: <span className="text-dim">&mdash;</span>,
    lifetime: <CheckIcon />,
  },
  {
    feature: 'Priority processing',
    free: <span className="text-dim">&mdash;</span>,
    pro: <span className="text-dim">&mdash;</span>,
    lifetime: <CheckIcon />,
  },
  {
    feature: 'Support',
    free: <span className="text-dim">Community</span>,
    pro: 'Email',
    lifetime: 'Dedicated',
  },
]

export function ComparisonTable() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title text-2xl sm:text-3xl reveal">Compare plans</h2>
        </div>

        <div className="card-glass rounded-2xl overflow-hidden reveal delay-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-border">
                <th className="text-left py-4 px-6 text-muted font-normal">Feature</th>
                <th className="py-4 px-4 text-center font-semibold">Free</th>
                <th className="py-4 px-4 text-center font-semibold text-vermillion">Pro</th>
                <th className="py-4 px-4 text-center font-semibold">Lifetime</th>
              </tr>
            </thead>
            <tbody className="text-ivory">
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i < rows.length - 1 ? 'border-b border-ink-border/50' : ''}
                >
                  <td className="py-3.5 px-6 text-muted">{row.feature}</td>
                  <td className="py-3.5 px-4 text-center">{row.free}</td>
                  <td className="py-3.5 px-4 text-center">{row.pro}</td>
                  <td className="py-3.5 px-4 text-center">{row.lifetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
