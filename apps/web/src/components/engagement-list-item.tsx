import { Link } from '@tanstack/react-router'
import { getLensLabel } from '~/data/research-lenses'

const STATUS_BADGE: Record<string, string> = {
	submitted: 'text-dim border-border',
	researching: 'text-amber border-amber/30',
	analyzing: 'text-cyan border-cyan/30',
	complete: 'text-emerald border-emerald/30',
}

interface EngagementListItemProps {
	id: string
	ideaDescription: string
	researchLens: string
	status: string
	createdAt: string
}

export function EngagementListItem({ id, ideaDescription, researchLens, status, createdAt }: EngagementListItemProps) {
	const badgeClass = STATUS_BADGE[status] ?? STATUS_BADGE.submitted

	return (
		<Link
			to="/portal/engagements/$id"
			params={{ id }}
			className="flex items-center justify-between gap-4 px-4 py-3 border border-border hover:border-signal transition-colors group"
		>
			<div className="flex-1 min-w-0">
				<p className="text-sm text-ink truncate group-hover:text-signal transition-colors">
					{ideaDescription.length > 80 ? `${ideaDescription.slice(0, 80)}...` : ideaDescription}
				</p>
				<div className="flex items-center gap-3 mt-1">
					<span className="font-mono text-[9px] text-dim uppercase tracking-wider">
						{getLensLabel(researchLens)}
					</span>
					<span className="font-mono text-[9px] text-dim">
						{new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
					</span>
				</div>
			</div>
			<span className={`font-mono text-[9px] uppercase tracking-wider border px-2 py-0.5 shrink-0 ${badgeClass}`}>
				{status}
			</span>
		</Link>
	)
}
