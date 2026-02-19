import type { ResearchLens } from '~/data/research-lenses'

interface EngagementLensCardProps {
	lens: ResearchLens
	selected: boolean
	onSelect: (value: string) => void
}

export function EngagementLensCard({ lens, selected, onSelect }: EngagementLensCardProps) {
	return (
		<button
			type="button"
			onClick={() => onSelect(lens.value)}
			className={`text-left p-4 border transition-colors ${
				selected ? 'border-signal bg-signal-bg' : 'border-border hover:border-secondary'
			}`}
		>
			<span className={`block text-sm font-display font-600 uppercase tracking-wider ${selected ? 'text-signal' : 'text-ink'}`}>
				{lens.label}
			</span>
			<span className="block text-xs text-dim mt-1">{lens.description}</span>
		</button>
	)
}
