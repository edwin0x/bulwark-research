import { createFileRoute } from '@tanstack/react-router'
import { BlueprintSection } from '~/components/blueprint-section'
import { ComparisonTable } from '~/components/comparison-table'
import { Cta } from '~/components/cta'
import { Faq } from '~/components/faq'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { PricingCards } from '~/components/pricing-cards'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

const faqs = [
	{
		q: 'How is this different from asking ChatGPT?',
		a: "ChatGPT gives you a single model's opinion. Bulwark deploys an entire swarm of specialized agents — each focused on one dimension of due diligence — that crawl the internet, cross-reference findings across thousands of sources, run financial simulations, and produce a structured dossier with confidence scores. It's the difference between asking a friend and retaining McKinsey.",
	},
	{
		q: 'What do I receive from an engagement?',
		a: 'A 30+ page intelligence dossier covering every dimension a top consulting firm would analyze: market sizing (TAM/SAM/SOM), competitor landscape, business model viability, technical feasibility, risk matrix, GTM strategy, financial projections with Monte Carlo simulations, and an executive summary with a weighted go/no-go recommendation. Synthesized from 1,000+ data sources. Delivered to your inbox within 24 hours.',
	},
	{
		q: 'How does the Deployment retainer work?',
		a: "Deployment is an annual retainer at $499/year — you get 10 deep research engagements per month for the duration. Cancel anytime. The Command tier is a one-time payment for permanent access with no recurring charges.",
	},
	{
		q: 'Is my research kept confidential?',
		a: 'Absolutely. All engagement data is encrypted at rest and in transit. We never share, sell, or use your data to train models. You own your research and can delete it at any time. Confidentiality is foundational to how we operate.',
	},
	{
		q: 'What payment methods do you accept?',
		a: 'We accept all major credit cards (Visa, Mastercard, Amex) and process payments securely through Stripe.',
	},
]

export const Route = createFileRoute('/pricing')({
	head: () => ({
		meta: [
			{ title: 'Engagements & Pricing — Bulwark Research' },
			{
				name: 'description',
				content:
					'Big 4 rigor at founder-friendly rates. Your first research engagement is complimentary.',
			},
			{ property: 'og:title', content: 'Engagements & Pricing — Bulwark Research' },
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
			<section className="pt-32 pb-20 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
							// Engagements
						</span>
						<h1
							className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 animate-slide-in"
							style={{ animationDelay: '0.4s' }}
						>
							BIG 4 RIGOR.
							<br />
							<span className="text-secondary">FOUNDER-FRIENDLY RATES.</span>
						</h1>
						<p
							className="text-lg text-secondary max-w-xl mx-auto animate-slide-in"
							style={{ animationDelay: '0.5s' }}
						>
							Your first engagement is complimentary — a full research dossier delivered to your
							inbox within 24 hours. No commitment, no strings.
						</p>
					</div>

					<PricingCards />
				</div>
			</section>

			{/* Comparison Table */}
			<ComparisonTable />

			{/* FAQ */}
			<BlueprintSection number="02" title="FAQ">
				<div className="max-w-2xl">
					<Faq faqs={faqs} />
				</div>
			</BlueprintSection>

			{/* CTA */}
			<Cta
				overline="// Still deciding?"
				title={
					<>
						YOUR FIRST ENGAGEMENT IS ON US.
					</>
				}
				subtitle="A full research dossier delivered to your inbox within 24 hours — no commitment, no obligation."
				primaryLabel="Hire Us — It's Free"
				primaryHref="/#hero-input"
			/>

			<Footer />
		</div>
	)
}
