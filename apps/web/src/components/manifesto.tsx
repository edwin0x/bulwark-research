import { BlueprintSection } from './blueprint-section'
import { DimensionAnnotation } from './dimension-annotation'

export function Manifesto() {
	return (
		<BlueprintSection number="02" title="WHY WE EXIST">
			<div className="max-w-3xl">
				<div className="space-y-6 text-base text-secondary leading-relaxed">
					<p className="reveal delay-1">
						Vibe coding made building trivially easy. Every founder can ship a product in a
						weekend. But the hard problem was never building — it was{' '}
						<span className="text-ink font-medium">knowing what to build</span>.
					</p>
					<p className="reveal delay-2">
						The best founders at the best companies have always had an unfair advantage: armies of
						analysts, Big 4 consultants, and proprietary market intelligence that cost hundreds of
						thousands of dollars. That's how they made better decisions — not better gut feelings,
						better <span className="text-ink font-medium">data</span>.
					</p>
					<p className="reveal delay-3">
						We built Bulwark to end that asymmetry. An autonomous agent swarm that runs the same
						internet-scale research a McKinsey engagement would — market sizing, competitor
						intelligence, financial modeling, risk analysis — and delivers it in minutes instead
						of months.
					</p>
					<p className="reveal delay-4">
						Because in a world where everyone can build, the founders who win are the ones with
						the <span className="text-ink font-medium">conviction</span> to know they're
						building the right thing.
					</p>
				</div>

				{/* Pull quote */}
				<div className="mt-16 pt-12 border-t border-border reveal delay-5">
					<DimensionAnnotation width="100%" height="auto">
						<blockquote className="text-xl md:text-2xl font-display font-600 text-ink leading-snug tracking-wide uppercase">
							"We don't tell you what to build. We give you the intelligence to decide for yourself
							— with the same rigor a $150K consulting engagement would."
						</blockquote>
					</DimensionAnnotation>
					<cite className="block mt-4 font-mono text-[10px] text-dim tracking-[0.08em] uppercase not-italic">
						— Bulwark Research
					</cite>
				</div>
			</div>
		</BlueprintSection>
	)
}
