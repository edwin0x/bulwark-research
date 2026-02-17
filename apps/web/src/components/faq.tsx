interface FaqItem {
	q: string
	a: string
}

interface FaqProps {
	faqs: FaqItem[]
}

export function Faq({ faqs }: FaqProps) {
	return (
		<div className="space-y-0">
			{faqs.map((faq, i) => (
				<details key={faq.q} className={`group border border-border reveal delay-${(i % 4) + 2}`}>
					<summary className="flex items-center justify-between cursor-pointer p-6 text-sm font-medium text-ink list-none">
						<span className="flex items-center gap-4">
							<span className="font-mono text-[10px] text-dim tracking-[0.08em]">
								{String(i + 1).padStart(2, '0')}
							</span>
							{faq.q}
						</span>
						<svg
							className="w-4 h-4 text-dim shrink-0 ml-4 transition-transform group-open:rotate-45"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="1.5"
						>
							<path strokeLinecap="square" strokeLinejoin="miter" d="M12 4v16m8-8H4" />
						</svg>
					</summary>
					<div className="px-6 pb-6 pl-[3.75rem] text-sm text-secondary leading-relaxed">{faq.a}</div>
				</details>
			))}
		</div>
	)
}
