import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { plans } from '~/data/plans'
import { CropMarks } from './crop-marks'

/** 2026-02-21 00:00:00 IST = 2026-02-20 18:30:00 UTC */
const COUNTDOWN_END = Date.UTC(2026, 1, 20, 18, 30, 0)

function useCountdown() {
	const calcRemaining = () => Math.max(0, COUNTDOWN_END - Date.now())
	const [remaining, setRemaining] = useState(calcRemaining)

	useEffect(() => {
		const interval = setInterval(() => setRemaining(calcRemaining()), 1000)
		return () => clearInterval(interval)
	}, [])

	const hrs = Math.floor(remaining / (1000 * 60 * 60))
	const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
	const secs = Math.floor((remaining % (1000 * 60)) / 1000)

	return { hrs, mins, secs, expired: remaining === 0 }
}

function Countdown() {
	const { hrs, mins, secs, expired } = useCountdown()

	if (expired) return <span className="font-mono text-[10px] text-signal uppercase tracking-wider">Offer expired</span>

	return (
		<div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider mt-2">
			<span className="text-dim uppercase">Ends in</span>
			<div className="flex gap-1">
				<span className="bg-surface border border-border px-1.5 py-0.5 text-ink tabular-nums">{String(hrs).padStart(2, '0')}h</span>
				<span className="bg-surface border border-border px-1.5 py-0.5 text-ink tabular-nums">{String(mins).padStart(2, '0')}m</span>
				<span className="bg-surface border border-border px-1.5 py-0.5 text-ink tabular-nums">{String(secs).padStart(2, '0')}s</span>
			</div>
		</div>
	)
}

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
						) : plan.originalPrice ? (
							<>
								<span className="font-display text-4xl font-bold">${plan.price}</span>
								<span className="text-sm text-dim ml-2 line-through">${plan.originalPrice}</span>
								<span className="text-sm text-dim ml-1">{plan.period}</span>
								<div className="font-mono text-[10px] text-signal uppercase tracking-wider mt-1">Limited time offer</div>
							</>
						) : (
							<>
								<span className="font-display text-4xl font-bold">${plan.price}</span>
								<span className="text-sm text-dim ml-1">{plan.period}</span>
								{plan.launchOnly && (
									<>
										<div className="font-mono text-[10px] text-signal uppercase tracking-wider mt-1">Launch only</div>
										<Countdown />
									</>
								)}
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

					{plan.ctaLink ? (
						<Link
							to={plan.ctaLink}
							className={`w-full py-3 text-sm font-semibold text-center block ${plan.featured ? 'btn-signal' : 'btn-outline'}`}
						>
							{plan.cta}
						</Link>
					) : (
						<button
							type="button"
							className={`w-full py-3 text-sm font-semibold ${plan.featured ? 'btn-signal' : 'btn-outline'}`}
						>
							{plan.cta}
						</button>
					)}
				</div>
			))}
		</div>
	)
}
