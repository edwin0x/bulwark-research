export function Manifesto() {
	return (
		<section className="relative py-28 px-6 overflow-hidden">
			{/* Background accent */}
			<div className="absolute inset-0 bg-grid opacity-40" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-radial-[ellipse_at_center] from-vermillion/5 to-transparent rounded-full blur-3xl" />

			<div className="relative max-w-4xl mx-auto">
				{/* Overline */}
				<div className="text-center mb-8 reveal">
					<div className="overline-divider max-w-sm mx-auto">Why Bulwark Exists</div>
				</div>

				{/* Manifesto */}
				<div className="space-y-8 reveal delay-1">
					<h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-center text-gradient leading-tight">
						The world doesn't need another
						<br />
						<span className="italic font-accent text-gradient-warm">AI chatbot wrapper.</span>
					</h2>

					<div className="max-w-2xl mx-auto space-y-6 text-lg text-muted leading-relaxed">
						<p className="reveal delay-2">
							Vibe coding made building trivially easy. Every founder can ship a product in a
							weekend. But the hard problem was never building — it was{' '}
							<span className="text-paper font-medium">knowing what to build</span>.
						</p>
						<p className="reveal delay-3">
							The best founders at the best companies have always had an unfair advantage: armies of
							analysts, Big 4 consultants, and proprietary market intelligence that cost hundreds of
							thousands of dollars. That's how they made better decisions — not better gut feelings,
							better <span className="text-paper font-medium">data</span>.
						</p>
						<p className="reveal delay-4">
							We built Bulwark to end that asymmetry. An autonomous agent swarm that runs the same
							internet-scale research a McKinsey engagement would — market sizing, competitor
							intelligence, financial modeling, risk analysis — and delivers it in minutes instead
							of months.
						</p>
						<p className="reveal delay-5">
							Because in a world where everyone can build, the founders who win are the ones with
							the <span className="text-paper font-medium">conviction</span> to know they're
							building the right thing.
						</p>
					</div>
				</div>

				{/* Divider quote */}
				<div className="mt-16 pt-12 border-t border-ink-border reveal delay-6">
					<div className="flex flex-col md:flex-row items-center gap-8">
						<div className="flex-shrink-0">
							<svg className="w-14 h-14" viewBox="0 0 32 32" fill="none">
								<path
									fillRule="evenodd"
									d="M6 8V6H9V4h2v2h3V3.5L16 1.5l2 2V6h3V4h2v2h3v2c0 9-4 16-10 21C10 24 6 17 6 8zm3 1.5c0 7.5 3 13 7 16.5 4-3.5 7-9 7-16.5z"
									fill="var(--color-vermillion)"
									opacity="0.3"
								/>
								<path
									d="M16 9.5h7c0 7.5-3 13-7 16.5z"
									fill="var(--color-vermillion)"
									opacity="0.5"
								/>
							</svg>
						</div>
						<blockquote className="text-xl md:text-2xl font-accent italic text-gradient-warm leading-relaxed">
							"We don't tell you what to build. We give you the intelligence to decide for yourself
							— with the same rigor a $150K consulting engagement would."
						</blockquote>
					</div>
				</div>
			</div>
		</section>
	)
}
