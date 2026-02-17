import { createFileRoute } from '@tanstack/react-router'
import { Cta } from '~/components/cta'
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

const beliefs = [
	{
		headline: 'Judgment is the last moat.',
		copy: "AI made execution free. Anyone can ship a product in a weekend. The founders who win aren't the fastest builders — they're the ones who know what to build. We exist to arm that judgment with data.",
	},
	{
		headline: "Research shouldn't require a retainer.",
		copy: "For decades, serious market intelligence was locked behind consulting firms that charge $150K and take 8 weeks. That's not rigor — that's a toll booth. We removed the booth.",
	},
	{
		headline: 'Everyone deserves due diligence.',
		copy: "Solo founders. Indie hackers. Vibe coders. The person building at 2 AM in their apartment deserves the same quality research as a Series B company with a strategy team. We built Bulwark so they can have it.",
	},
	{
		headline: 'AI-native means rethinking the model.',
		copy: "We're not a consulting firm that uses AI. We're an AI-native firm that rethought consulting from scratch — what it covers, how fast it ships, and who gets access to it.",
	},
]

const audiences = [
	{
		name: 'Solo Founders',
		desc: 'Evaluating your first idea and need real data, not ChatGPT opinions.',
	},
	{
		name: 'Indie Hackers',
		desc: 'Building fast but need market conviction before full commitment.',
	},
	{
		name: 'Vibe Coders',
		desc: "You can build anything in a weekend — Bulwark tells you if it's worth building.",
	},
]

const weAreNot = [
	'A chatbot wrapper with a pretty UI',
	'A cheap alternative to real consulting',
	'A recurring commitment that drains your runway',
	'A generic chatbot that hallucinates market data',
]

const weAre = [
	'An AI-native consulting firm, built from scratch',
	'Institutional-grade research, democratized',
	'One-time pricing because founders need cash flow',
	'Real internet-scale research with sourced findings',
]

function AboutPage() {
	const revealRef = useScrollReveal()

	return (
		<div ref={revealRef}>
			<Navbar activePage="about" />

			{/* Hero */}
			<section className="relative pt-40 pb-24 px-6 overflow-hidden">
				<div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />

				<div className="relative z-10 max-w-3xl mx-auto text-center">
					<div className="overline-divider max-w-xs mx-auto mb-4 animate-fade-in">
						About Bulwark
					</div>
					<h1
						className="section-title text-4xl sm:text-5xl md:text-6xl mb-6 animate-fade-up"
						style={{ animationDelay: '0.1s' }}
					>
						Market research was gatekept.
						<br />
						<span className="italic font-accent text-gradient-warm">
							We opened the door.
						</span>
					</h1>
					<p
						className="text-lg text-muted max-w-xl mx-auto animate-fade-up"
						style={{ animationDelay: '0.2s' }}
					>
						Bulwark is an AI-native consulting firm that delivers institutional-grade
						research to anyone with an idea — no retainer, no RFP, no six-figure
						invoice.
					</p>
				</div>
			</section>

			{/* What We Believe */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<div className="overline-divider max-w-xs mx-auto mb-4 reveal">
							What We Believe
						</div>
						<h2 className="section-title text-3xl sm:text-4xl reveal delay-1">
							Convictions, not{' '}
							<span className="italic font-accent text-gradient-warm">
								compromises.
							</span>
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{beliefs.map((belief, i) => (
							<div
								key={belief.headline}
								className={`card-glass rounded-2xl p-8 reveal delay-${i + 2}`}
							>
								<h3 className="text-lg font-semibold text-paper mb-3">
									"{belief.headline}"
								</h3>
								<p className="text-muted leading-relaxed">{belief.copy}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Built For Builders */}
			<section className="relative py-24 px-6">
				<div className="divider max-w-6xl mx-auto mb-24" />
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-16">
						<div className="overline-divider max-w-xs mx-auto mb-4 reveal">
							Built For Builders
						</div>
						<h2 className="section-title text-3xl sm:text-4xl reveal delay-1">
							If you're building something,{' '}
							<span className="italic font-accent text-gradient-warm">
								this is for you.
							</span>
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{audiences.map((audience, i) => (
							<div
								key={audience.name}
								className={`border-l-2 border-vermillion pl-6 py-2 reveal delay-${i + 2}`}
							>
								<h3 className="text-paper font-semibold mb-2">
									{audience.name}
								</h3>
								<p className="text-muted text-sm leading-relaxed">
									{audience.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* What We're Not */}
			<section className="relative py-24 px-6">
				<div className="divider max-w-6xl mx-auto mb-24" />
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-16">
						<div className="overline-divider max-w-xs mx-auto mb-4 reveal">
							Clear On What We Are
						</div>
						<h2 className="section-title text-3xl sm:text-4xl reveal delay-1">
							No pretense.{' '}
							<span className="italic font-accent text-gradient-warm">
								No ambiguity.
							</span>
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
						<div className="reveal delay-2">
							<h3 className="font-mono text-[10px] uppercase tracking-widest text-dim mb-6">
								We're not...
							</h3>
							<ul className="space-y-4">
								{weAreNot.map((item) => (
									<li
										key={item}
										className="flex items-start gap-3 text-dim"
									>
										<span className="text-vermillion/40 mt-0.5">✕</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="reveal delay-3">
							<h3 className="font-mono text-[10px] uppercase tracking-widest text-dim mb-6">
								We are...
							</h3>
							<ul className="space-y-4">
								{weAre.map((item) => (
									<li
										key={item}
										className="flex items-start gap-3 text-paper"
									>
										<span className="text-emerald mt-0.5">✓</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<Cta
				overline="Join the Movement"
				title={
					<>
						The best ideas deserve real research.
						<br />
						<span className="italic font-accent text-gradient-warm">
							Yours included.
						</span>
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
