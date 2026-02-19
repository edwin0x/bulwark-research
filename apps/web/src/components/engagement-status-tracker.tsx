const STATUSES = ['submitted', 'researching', 'analyzing', 'complete'] as const
type EngagementStatus = (typeof STATUSES)[number]

const STATUS_META: Record<EngagementStatus, { label: string; color: string }> = {
	submitted: { label: 'Submitted', color: 'text-dim' },
	researching: { label: 'Researching', color: 'text-amber' },
	analyzing: { label: 'Analyzing', color: 'text-cyan' },
	complete: { label: 'Complete', color: 'text-emerald' },
}

interface EngagementStatusTrackerProps {
	status: string
}

export function EngagementStatusTracker({ status }: EngagementStatusTrackerProps) {
	const currentIdx = STATUSES.indexOf(status as EngagementStatus)

	return (
		<div className="flex items-center gap-2">
			{STATUSES.map((s, i) => {
				const meta = STATUS_META[s]
				const isCompleted = i < currentIdx
				const isActive = i === currentIdx

				return (
					<div key={s} className="flex items-center gap-2">
						<div className="flex flex-col items-center gap-1.5">
							<div
								className={`w-2 h-2 ${
									isActive
										? 'bg-signal animate-pulse-dot'
										: isCompleted
											? 'bg-signal/40'
											: 'bg-border'
								}`}
							/>
							<span
								className={`font-mono text-[9px] uppercase tracking-wider ${
									isActive ? meta.color : isCompleted ? 'text-signal/60' : 'text-dim/50'
								}`}
							>
								{meta.label}
							</span>
						</div>
						{i < STATUSES.length - 1 && (
							<div
								className={`w-6 h-px mb-4 ${
									i < currentIdx ? 'bg-signal/40' : 'bg-border'
								}`}
							/>
						)}
					</div>
				)
			})}
		</div>
	)
}
