import { plans } from '~/data/plans'
import { CropMarks } from './crop-marks'

export function PricingCards() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto">
			{plans.map((plan, i) => (
				<div
					key={plan.name}
					className={`bp-card p-8 reveal delay-${i + 2} ${plan.featured ? 'pricing-active' : ''} flex flex-col relative`}
				>
					{plan.featured && (
						<span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-signal-bg border border-signal font-mono text-[10px] text-signal uppercase tracking-[0.08em] whitespace-nowrap">
							Most Popular
						</span>
					)}
					{plan.badge && (
						<span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface border border-border font-mono text-[10px] text-dim uppercase tracking-[0.08em] whitespace-nowrap">
							{plan.badge}
						</span>
					)}

					<div className="mb-6">
						<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-2">
							{String(i + 1).padStart(2, '0')}
						</span>
						<h3 className="font-display text-lg font-700 uppercase tracking-wider mb-1">{plan.name}</h3>
						<p className="text-xs text-dim">{plan.desc}</p>
					</div>

					<div className="mb-8">
						{plan.freeForNow ? (
							<>
								<span className="font-display text-4xl font-bold">Free</span>
								<span className="text-sm text-dim ml-2 line-through">${plan.price}</span>
								<div className="font-mono text-[10px] text-signal uppercase tracking-wider mt-1">Limited time offer</div>
							</>
						) : (
							<>
								<span className="font-display text-4xl font-bold">${plan.price}</span>
								<span className="text-sm text-dim ml-1">{plan.period}</span>
							</>
						)}
					</div>

					<ul className="space-y-3 mb-8 flex-1">
						{plan.features.map((feature) => (
							<li key={feature} className="flex items-start gap-2.5 text-sm">
								<span className="w-1 h-1 bg-signal mt-2 shrink-0" />
								<span className="text-ink">{feature}</span>
							</li>
						))}
					</ul>

					<button
						type="button"
						className={`w-full py-3 text-sm font-semibold ${plan.featured ? 'btn-signal' : 'btn-outline'}`}
					>
						{plan.cta}
					</button>
				</div>
			))}
		</div>
	)
}
