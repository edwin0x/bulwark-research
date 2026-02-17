import type { ReportSection } from '~/data/sample-report'

interface ReportTabBarProps {
	sections: ReportSection[]
	activeId: string
	onSelect: (id: string) => void
}

export function ReportTabBar({ sections, activeId, onSelect }: ReportTabBarProps) {
	return (
		<div className="overflow-x-auto -mx-6 px-6 scrollbar-none">
			<div className="flex gap-0 min-w-max border-b border-border">
				{sections.map((section) => {
					const isActive = section.id === activeId
					return (
						<button
							key={section.id}
							type="button"
							onClick={() => onSelect(section.id)}
							className={`flex items-center gap-2 px-4 py-3 text-[10px] font-mono uppercase tracking-[0.08em] border-b-2 whitespace-nowrap ${
								isActive
									? 'text-ink border-signal'
									: 'text-dim border-transparent hover:text-secondary'
							}`}
						>
							<span style={{ color: section.hex }}>{section.icon}</span>
							<span>{section.agentName}</span>
						</button>
					)
				})}
			</div>
		</div>
	)
}
