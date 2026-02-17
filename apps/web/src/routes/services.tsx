import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Cta } from '~/components/cta'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

export const Route = createFileRoute('/services')({
	head: () => ({
		meta: [
			{ title: 'Services — Bulwark Research' },
			{
				name: 'description',
				content:
					'Idea validation, market research, competitor intelligence, technical feasibility, and go-to-market strategy — delivered by autonomous AI agents in 24 hours.',
			},
			{ property: 'og:title', content: 'Services — Bulwark Research' },
		],
	}),
	component: ServicesPage,
})

interface Service {
	id: string
	num: string
	title: string
	tag: string
	description: string
	deliverables: string[]
	timeline: string
}

const services: Service[] = [
	{
		id: 'idea-validation',
		num: '01',
		title: 'IDEA VALIDATION',
		tag: 'STRATEGY',
		description:
			'A comprehensive viability assessment of your startup idea. We analyze market demand, competitive dynamics, and business model feasibility to give you a data-backed go/no-go recommendation — not a gut feeling.',
		deliverables: [
			'Weighted viability score (0–100) with confidence intervals',
			'Market demand signals from real transaction data',
			'Business model stress test with unit economics',
			'Risk matrix across market, execution, and regulatory dimensions',
			'Executive summary with go/no-go recommendation',
		],
		timeline: '24 HOURS',
	},
	{
		id: 'market-research',
		num: '02',
		title: 'MARKET RESEARCH',
		tag: 'INTELLIGENCE',
		description:
			'Internet-scale market sizing with TAM/SAM/SOM analysis sourced from industry reports, government databases, and real transaction data. The same depth a Big 4 engagement would deliver.',
		deliverables: [
			'TAM / SAM / SOM sizing with methodology documentation',
			'Growth rate projections with historical trend analysis',
			'Customer segmentation and persona mapping',
			'Regulatory landscape assessment',
			'Market timing analysis — why now, or why wait',
		],
		timeline: '24 HOURS',
	},
	{
		id: 'competitor-intelligence',
		num: '03',
		title: 'COMPETITOR INTELLIGENCE',
		tag: 'ANALYSIS',
		description:
			'Deep competitive landscape mapping across funding, traction, positioning, pricing, and technology stack. Know who you\'re up against before you write a line of code.',
		deliverables: [
			'Top 10–15 competitor profiles with funding and traction data',
			'Positioning matrix — where the gaps are',
			'Pricing and monetization strategy comparison',
			'Technology and feature audit',
			'Strategic opportunity areas and white space analysis',
		],
		timeline: '24 HOURS',
	},
	{
		id: 'technical-feasibility',
		num: '04',
		title: 'TECHNICAL FEASIBILITY',
		tag: 'ENGINEERING',
		description:
			'Architecture-level assessment of what it takes to build your product. We evaluate complexity, infrastructure requirements, and time-to-MVP with pragmatic engineering rigor.',
		deliverables: [
			'Architecture recommendation with technology stack analysis',
			'Complexity assessment and risk identification',
			'MVP scope definition with feature prioritization',
			'Infrastructure cost projections (12-month runway)',
			'Build-vs-buy analysis for key components',
		],
		timeline: '24 HOURS',
	},
	{
		id: 'gtm-strategy',
		num: '05',
		title: 'GO-TO-MARKET STRATEGY',
		tag: 'GROWTH',
		description:
			'A data-driven launch playbook. We model your acquisition channels, pricing strategy, and growth levers based on comparable companies and real market data.',
		deliverables: [
			'Channel-by-channel acquisition strategy with CAC estimates',
			'Pricing model recommendation with willingness-to-pay analysis',
			'Launch sequence and milestone roadmap',
			'Monte Carlo financial projections (10,000 simulations)',
			'Growth lever identification and prioritization',
		],
		timeline: '24–48 HOURS',
	},
]

function ServicesPage() {
	const revealRef = useScrollReveal()
	const [activeService, setActiveService] = useState(services[0].id)

	const active = services.find((s) => s.id === activeService) ?? services[0]

	return (
		<div ref={revealRef}>
			<Navbar activePage="services" />

			{/* Hero */}
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-6xl mx-auto">
					<span
						className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-4 animate-slide-in"
						style={{ animationDelay: '0.3s' }}
					>
						// Services
					</span>
					<h1
						className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 animate-slide-in"
						style={{ animationDelay: '0.4s' }}
					>
						WHAT WE DELIVER
					</h1>
					<p
						className="text-lg text-secondary max-w-xl animate-slide-in"
						style={{ animationDelay: '0.5s' }}
					>
						Each engagement deploys our autonomous agent swarm to produce
						institutional-grade research. Select a service to see what's included.
					</p>
				</div>
			</section>

			{/* Sidebar + Content */}
			<section className="px-6 pb-20">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border reveal">
						{/* Left Sidebar — Service Navigation */}
						<div className="lg:col-span-4 border-r border-border">
							{services.map((service) => {
								const isActive = service.id === activeService
								return (
									<button
										key={service.id}
										type="button"
										onClick={() => setActiveService(service.id)}
										className={`w-full text-left px-6 py-5 border-b border-border flex items-center gap-4 transition-colors duration-100 ${
											isActive
												? 'bg-signal-bg border-l-2 border-l-signal'
												: 'hover:bg-surface'
										}`}
									>
										<span className="font-mono text-[10px] text-dim tracking-[0.08em]">
											{service.num}
										</span>
										<span
											className={`font-display text-xs font-700 uppercase tracking-wider ${
												isActive ? 'text-ink' : 'text-secondary'
											}`}
										>
											{service.title}
										</span>
									</button>
								)
							})}
						</div>

						{/* Right Content — Service Detail */}
						<div className="lg:col-span-8 p-8 md:p-12">
							{/* Tag */}
							<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-4">
								{active.tag}
							</span>

							{/* Title */}
							<h2 className="section-title text-2xl sm:text-3xl mb-6">
								{active.title}
							</h2>

							{/* Description */}
							<p className="text-secondary leading-relaxed mb-10">
								{active.description}
							</p>

							{/* Deliverables */}
							<div className="mb-10">
								<h3 className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase mb-4">
									Deliverables
								</h3>
								<ul className="space-y-3">
									{active.deliverables.map((item) => (
										<li key={item} className="flex items-start gap-3 text-sm">
											{/* Crop mark bullet */}
											<span className="mt-1.5 shrink-0 w-2 h-2 border-t border-l border-grid" />
											<span className="text-ink">{item}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Timeline */}
							<div className="flex items-center gap-3 pt-6 border-t border-border">
								<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase">
									Typical Turnaround
								</span>
								<span className="font-mono text-sm text-signal font-semibold">
									{active.timeline}
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<Cta
				overline="// Ready to start?"
				title={
					<>
						YOUR FIRST ENGAGEMENT
						<br />
						<span className="text-ghost">IS COMPLIMENTARY.</span>
					</>
				}
				subtitle="Commission any service above. A Big 4-quality dossier delivered to your inbox within 24 hours — no commitment required."
				primaryLabel="Hire Us — It's Free"
				primaryHref="/#hero-input"
				secondaryLabel="View Pricing"
				secondaryHref="/pricing"
			/>

			<Footer />
		</div>
	)
}
