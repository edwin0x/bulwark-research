import { createFileRoute } from '@tanstack/react-router'
import { BentoGrid } from '~/components/bento-grid'
import { BlueprintSection } from '~/components/blueprint-section'
import { Cta } from '~/components/cta'
import { Faq } from '~/components/faq'
import { Footer } from '~/components/footer'
import { Hero } from '~/components/hero'
import { HowItWorks } from '~/components/how-it-works'
import { Manifesto } from '~/components/manifesto'
import { Navbar } from '~/components/navbar'
import { Problem } from '~/components/problem'
import { ReportPreview } from '~/components/report-preview'
import { Testimonials } from '~/components/testimonials'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

const faqs = [
	{
		q: 'How is this different from asking ChatGPT?',
		a: "ChatGPT gives you a single model's opinion. Bulwark deploys an entire swarm of specialized agents — each focused on one dimension of due diligence — that crawl the internet, cross-reference findings across thousands of sources, run financial simulations, and produce a structured report with confidence scores. It's the difference between asking a friend and hiring McKinsey.",
	},
	{
		q: 'What do I receive from an engagement?',
		a: 'A 30+ page intelligence dossier covering every dimension a top consulting firm would analyze: market sizing (TAM/SAM/SOM), competitor landscape, business model viability, technical feasibility, risk matrix, GTM strategy, financial projections with Monte Carlo simulations, and an executive summary with a weighted go/no-go recommendation. Synthesized from 1,000+ data sources. Delivered to your inbox within 24 hours — and archived in your client portal.',
	},
	{
		q: 'What do you mean by "agent swarm"?',
		a: "Instead of a single AI answering your question, we deploy dozens of specialized agents in parallel — each an expert in a specific domain. They independently research, then a synthesis engine cross-references their findings to resolve conflicts and produce a unified intelligence dossier. It's how large consulting firms work, but at internet scale.",
	},
	{
		q: 'Who is this for?',
		a: 'Any founder deciding what to build next. Solo founders evaluating their first idea. Serial entrepreneurs choosing between concepts. Venture studios assessing deal flow. Anyone who believes taste and judgment matter more than execution speed.',
	},
	{
		q: 'Is my idea kept confidential?',
		a: 'Yes. Your ideas are encrypted at rest and in transit. We never share, sell, or use your data to train models. You own your data and can delete it at any time.',
	},
]

export const Route = createFileRoute('/')({
	head: () => ({
		meta: [
			{ title: 'Bulwark Research — AI-Powered Startup Idea Validation' },
			{ property: 'og:title', content: 'Bulwark Research — AI-Powered Startup Idea Validation' },
		],
	}),
	component: HomePage,
})

function HomePage() {
	const revealRef = useScrollReveal()

	return (
		<div ref={revealRef}>
			<Navbar activePage="home" />
			<Hero />
			<Problem />
			<Manifesto />
			<HowItWorks />
			<BentoGrid />
			<ReportPreview />

			{/* Signal Section */}
			<section className="bg-surface py-20 px-6">
				<div className="max-w-4xl mx-auto text-center reveal">
					<span className="font-mono text-4xl md:text-5xl text-ink stat-num block mb-6">
						93% of clients ship within 8 weeks
					</span>
					<p className="text-secondary text-lg italic max-w-xl mx-auto">
						"The dossier didn't just validate our idea — it gave us the roadmap to execute."
					</p>
				</div>
			</section>

			<Testimonials />

			<BlueprintSection number="06" title="FAQ" id="faq">
				<div className="max-w-2xl">
					<Faq faqs={faqs} />
				</div>
			</BlueprintSection>

			<Cta
				overline="// Start a conversation"
				title={
					<>
						TASTE DECIDES WHAT TO BUILD.
						<br />
						<span className="text-ghost">BULWARK GIVES YOU THE PROOF.</span>
					</>
				}
				subtitle="Your first engagement is complimentary. A Big 4-quality dossier delivered to your inbox within 24 hours — no commitment required."
				primaryLabel="Hire Us — It's Free"
				primaryHref="#hero-input"
				secondaryLabel="View Sample Dossier"
				secondaryHref="/sample-report"
			/>
			<Footer />
		</div>
	)
}
