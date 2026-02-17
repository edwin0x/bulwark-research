interface FaqItem {
	q: string
	a: string
}

interface FaqProps {
	faqs: FaqItem[]
}

export function Faq({ faqs }: FaqProps) {
	return (
		<div className="space-y-4">
			{faqs.map((faq, i) => (
				<details key={faq.q} className={`group card-glass rounded-xl reveal delay-${(i % 4) + 2}`}>
					<summary className="flex items-center justify-between cursor-pointer p-6 text-sm font-medium text-ivory hover:text-paper transition-colors list-none">
						{faq.q}
						<svg
							className="w-4 h-4 text-dim shrink-0 ml-4 transition-transform group-open:rotate-45"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
						</svg>
					</summary>
					<div className="px-6 pb-6 text-sm text-muted leading-relaxed">{faq.a}</div>
				</details>
			))}
		</div>
	)
}
