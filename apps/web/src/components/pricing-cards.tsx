import { plans } from '~/data/plans'

export function PricingCards() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
			{plans.map((plan, i) => (
				<div
					key={plan.name}
					className={`card-glass rounded-2xl p-8 reveal delay-${i + 2} ${plan.featured ? 'pricing-active' : ''} flex flex-col relative`}
				>
					{plan.featured && (
						<span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ink-light border border-vermillion/20 backdrop-blur-xl font-mono text-[10px] text-vermillion uppercase tracking-widest whitespace-nowrap">
							Most Popular
						</span>
					)}
					{plan.badge && (
						<span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ink-light border border-amber/20 backdrop-blur-xl font-mono text-[10px] text-amber uppercase tracking-widest whitespace-nowrap">
							{plan.badge}
						</span>
					)}

					<div className="mb-6">
						<h3 className="font-serif text-xl font-semibold mb-1">{plan.name}</h3>
						<p className="text-sm text-dim">{plan.desc}</p>
					</div>

					<div className="mb-8">
						{plan.freeForNow ? (
							<>
								<span className="font-serif text-4xl font-bold">Free</span>
								<span className="text-sm text-dim ml-2 line-through">${plan.price}</span>
								<div className="text-xs text-emerald font-mono uppercase tracking-wider mt-1">Limited time offer</div>
							</>
						) : (
							<>
								<span className="font-serif text-4xl font-bold">${plan.price}</span>
								<span className="text-sm text-dim ml-1">{plan.period}</span>
							</>
						)}
					</div>

					<ul className="space-y-3 mb-8 flex-1">
						{plan.features.map((feature) => (
							<li key={feature} className="flex items-start gap-2.5 text-sm">
								<svg
									className="w-4 h-4 text-emerald shrink-0 mt-0.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
								</svg>
								<span className="text-ivory">{feature}</span>
							</li>
						))}
					</ul>

					<button
						type="button"
						className={`w-full py-3 rounded-full text-sm font-semibold transition-all ${plan.featured ? 'btn-glow' : 'btn-outline'}`}
					>
						{plan.cta}
					</button>
				</div>
			))}
		</div>
	)
}
