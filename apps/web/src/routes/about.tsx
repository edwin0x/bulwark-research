import { createFileRoute } from '@tanstack/react-router'
import { BlueprintSection } from '~/components/blueprint-section'
import { Cta } from '~/components/cta'
import { DimensionAnnotation } from '~/components/dimension-annotation'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

export const Route = createFileRoute('/about')({
	head: () => ({
		meta: [
			{ title: 'About — Bulwark Research' },
			{
				name: 'description',
				content:
					'Bulwark is an AI-native consulting firm that delivers institutional-grade research to anyone with an idea.',
			},
			{ property: 'og:title', content: 'About — Bulwark Research' },
		],
	}),
	component: AboutPage,
})

const principles = [
	{
		title: 'Judgment is the last moat.',
		copy: "AI made execution free. Anyone can ship a product in a weekend. The founders who win aren't the fastest builders — they're the ones who know what to build. We exist to arm that judgment with data.",
	},
	{
		title: "Research shouldn't require a retainer.",
		copy: "For decades, serious market intelligence was locked behind consulting firms that charge $150K and take 8 weeks. That's not rigor — that's a toll booth. We removed the booth.",
	},
	{
		title: 'Everyone deserves due diligence.',
		copy: "Solo founders. Indie hackers. Vibe coders. The person building at 2 AM in their apartment deserves the same quality research as a Series B company with a strategy team. We built Bulwark so they can have it.",
	},
	{
		title: 'AI-native means rethinking the model.',
		copy: "We're not a consulting firm that uses AI. We're an AI-native firm that rethought consulting from scratch — what it covers, how fast it ships, and who gets access to it.",
	},
	{
		title: 'Ship conviction, not slide decks.',
		copy: "Our deliverable isn't a pretty PDF. It's the confidence to make a $500K decision in an afternoon — backed by the same data a Fortune 500 strategy team would use.",
	},
]

const team = [
	{ initial: 'E', name: 'Edwin', role: 'Founder & Principal' },
	{ initial: 'S', name: 'Swarm', role: '47 Specialized Agents' },
]

function AboutPage() {
	const revealRef = useScrollReveal()

	return (
		<div ref={revealRef}>
			<Navbar activePage="about" />

			{/* Hero */}
			<section className="pt-32 pb-20 px-6">
				<div className="max-w-4xl mx-auto">
					<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
						// About Bulwark
					</span>
					<h1
						className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 animate-slide-in"
						style={{ animationDelay: '0.4s' }}
					>
						MARKET RESEARCH
						<br />
						<span className="text-secondary">WAS GATEKEPT. WE OPENED THE DOOR.</span>
					</h1>
					<p
						className="text-lg text-secondary max-w-xl animate-slide-in"
						style={{ animationDelay: '0.5s' }}
					>
						Bulwark is an AI-native consulting firm that delivers institutional-grade
						research to anyone with an idea — no retainer, no RFP, no six-figure
						invoice.
					</p>
				</div>
			</section>

			{/* Principles */}
			<BlueprintSection number="01" title="PRINCIPLES">
				<div className="max-w-3xl">
					{principles.map((principle, i) => (
						<div key={principle.title} className={`reveal delay-${i + 1}`}>
							<div className="py-8 border-b border-border">
								<DimensionAnnotation width="100%" height="auto">
									<div className="flex gap-6">
										<span className="font-mono text-[10px] text-dim tracking-[0.08em] mt-1 shrink-0">
											PRINCIPLE {String(i + 1).padStart(2, '0')}
										</span>
										<div>
											<h3 className="font-display text-lg font-700 uppercase tracking-wider mb-3">
												{principle.title}
											</h3>
											<p className="text-secondary leading-relaxed">{principle.copy}</p>
										</div>
									</div>
								</DimensionAnnotation>
							</div>
						</div>
					))}
				</div>
			</BlueprintSection>

			{/* Team */}
			<BlueprintSection number="02" title="TEAM">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
					{team.map((member, i) => (
						<div key={member.name} className={`reveal delay-${i + 1} flex items-center gap-4`}>
							<div className="w-12 h-12 border border-border bg-surface flex items-center justify-center font-mono text-lg text-secondary">
								{member.initial}
							</div>
							<div>
								<div className="font-display text-sm font-700 uppercase tracking-wider">{member.name}</div>
								<div className="font-mono text-[10px] text-dim tracking-[0.08em]">{member.role}</div>
							</div>
						</div>
					))}
				</div>
			</BlueprintSection>

			{/* CTA */}
			<Cta
				overline="// Join the movement"
				title={
					<>
						THE BEST IDEAS DESERVE REAL RESEARCH.
						<br />
						<span className="text-ghost">YOURS INCLUDED.</span>
					</>
				}
				subtitle="Your first engagement is complimentary. No pitch deck, no RFP, no gatekeepers."
				primaryLabel="Hire Us — It's Free"
				primaryHref="/#hero-input"
				secondaryLabel="View Sample Dossier"
				secondaryHref="/sample-report"
			/>

			<Footer />
		</div>
	)
}
