import type { ReportSection } from '~/data/sample-report'

interface ReportSectionPanelProps {
	section: ReportSection
}

const skeletonWidths = [100, 92, 97, 88, 95, 80, 93, 85, 98, 76, 91, 83, 96, 72, 89]

export function ReportSectionPanel({ section }: ReportSectionPanelProps) {
	return (
		<div className="card-glass rounded-2xl p-6 md:p-8">
			{/* Header */}
			<div className="flex items-center gap-3 mb-6">
				<span className="text-xl" style={{ color: section.hex }}>
					{section.icon}
				</span>
				<h3 className="font-serif text-lg font-semibold">{section.title}</h3>
			</div>

			{/* Highlights */}
			{section.highlights && section.highlights.length > 0 && (
				<div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-ink/50 border border-ink-border/50">
					{section.highlights.map((h) => (
						<div key={h.label}>
							<div className="font-serif text-xl font-bold">{h.value}</div>
							<div className="font-mono text-[9px] text-dim uppercase tracking-wider">
								{h.label}
							</div>
						</div>
					))}
				</div>
			)}

			{/* Visible preview paragraph */}
			<p className="text-ivory leading-relaxed text-sm">{section.previewParagraph}</p>

			{/* Gated skeleton zone */}
			<div className="relative mt-6">
				{/* Skeleton bars */}
				<div className="space-y-2.5">
					{skeletonWidths.slice(0, section.blurredLineCount).map((width, i) => (
						<div
							key={i}
							className="h-3 rounded bg-ink-border/20"
							style={{ width: `${width}%` }}
						/>
					))}
				</div>

				{/* Gradient fade overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-ink-light via-ink-light/80 to-transparent" />

				{/* Lock message */}
				<div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 pb-2">
					<svg
						className="w-3.5 h-3.5 text-dim"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
						<path d="M7 11V7a5 5 0 0 1 10 0v4" />
					</svg>
					<span className="font-mono text-[10px] text-dim uppercase tracking-wider">
						Full section in the complete report
					</span>
				</div>
			</div>
		</div>
	)
}
