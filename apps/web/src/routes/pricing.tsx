import { createFileRoute } from '@tanstack/react-router'
import { ComparisonTable } from '~/components/comparison-table'
import { Faq } from '~/components/faq'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { PricingCards } from '~/components/pricing-cards'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

const faqs = [
	{
		q: 'How is this different from asking ChatGPT?',
		a: "ChatGPT gives you a single model's opinion. Bulwark deploys an entire swarm of specialized agents — each focused on one dimension of due diligence — that crawl the internet, cross-reference findings across thousands of sources, run financial simulations, and produce a structured report with confidence scores. It's the difference between asking a friend and hiring McKinsey.",
	},
	{
		q: 'What kind of research report do I get?',
		a: 'A 30+ page intelligence brief covering every dimension McKinsey would analyze: market sizing (TAM/SAM/SOM), competitor landscape, business model viability, technical feasibility, risk matrix, GTM strategy, financial projections with Monte Carlo simulations, and an executive summary with a weighted go/no-go recommendation. Synthesized from 1,000+ data sources. Delivered to your inbox in about 30 minutes — and always available to download from your dashboard.',
	},
	{
		q: 'Do Pro credits expire?',
		a: "No. Pro credits never expire — use them whenever you're ready. Buy once, validate on your own schedule. The Lifetime plan gives you 10 deep researches per month, forever, with no recurring charges.",
	},
	{
		q: 'Is my idea kept confidential?',
		a: 'Yes. Your ideas are encrypted at rest and in transit. We never share, sell, or use your data to train models. You own your data and can delete it at any time.',
	},
	{
		q: 'What payment methods do you accept?',
		a: 'We accept all major credit cards (Visa, Mastercard, Amex) and process payments securely through Stripe. Annual billing is available for Founder and Studio plans with a 20% discount.',
	},
]

export const Route = createFileRoute('/pricing')({
	head: () => ({
		meta: [
			{ title: 'Pricing — Bulwark Research' },
			{
				name: 'description',
				content:
					'Big 4 rigor at founder-friendly prices. Choose the plan that fits your validation needs.',
			},
			{ property: 'og:title', content: 'Pricing — Bulwark Research' },
		],
	}),
	component: PricingPage,
})

function PricingPage() {
	const revealRef = useScrollReveal()

	return (
		<div ref={revealRef}>
			<Navbar activePage="pricing" />

			{/* Pricing Hero */}
			<section className="relative pt-40 pb-24 px-6 overflow-hidden">
				{/* Background */}
				<div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />

				<div className="relative z-10 max-w-6xl mx-auto">
					<div className="text-center mb-20">
						<div className="overline-divider max-w-xs mx-auto mb-4 animate-fade-in">Pricing</div>
						<h1
							className="section-title text-4xl sm:text-5xl md:text-6xl mb-6 animate-fade-up"
							style={{ animationDelay: '0.1s' }}
						>
							Big 4 rigor.
							<br />
							<span className="italic font-accent text-gradient-warm">
								Founder-friendly pricing.
							</span>
						</h1>
						<p
							className="text-lg text-muted max-w-xl mx-auto animate-fade-up"
							style={{ animationDelay: '0.2s' }}
						>
							Your first idea is free — report delivered to your inbox in 30 minutes. Also available
							to download from your dashboard anytime.
						</p>
					</div>

					<PricingCards />
				</div>
			</section>

			{/* Comparison Table */}
			<ComparisonTable />

			{/* FAQ */}
			<section className="relative py-24 px-6">
				<div className="max-w-2xl mx-auto">
					<div className="text-center mb-16">
						<div className="overline-divider max-w-xs mx-auto mb-4 reveal">FAQ</div>
						<h2 className="section-title text-3xl sm:text-4xl reveal delay-1">Common questions</h2>
					</div>
					<Faq faqs={faqs} />
				</div>
			</section>

			{/* Still not sure? CTA */}
			<section className="relative py-24 px-6">
				<div className="relative z-10 max-w-2xl mx-auto text-center">
					<h2 className="section-title text-2xl sm:text-3xl mb-4 reveal">Still not sure?</h2>
					<p className="text-muted mb-8 reveal delay-1">
						Your first idea is free. Report delivered to your inbox in 30 minutes — no credit card
						required. Download it from the website anytime.
					</p>
					<a href="/#hero-input" className="btn-glow px-8 py-3.5 text-sm reveal delay-2">
						Validate Your First Idea — Free
					</a>
				</div>
			</section>

			<Footer />
		</div>
	)
}
