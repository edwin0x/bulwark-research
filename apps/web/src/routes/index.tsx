import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/navbar'
import { Hero } from '~/components/hero'
import { Problem } from '~/components/problem'
import { Manifesto } from '~/components/manifesto'
import { HowItWorks } from '~/components/how-it-works'
import { BentoGrid } from '~/components/bento-grid'
import { ReportPreview } from '~/components/report-preview'
import { Testimonials } from '~/components/testimonials'
import { PricingCards } from '~/components/pricing-cards'
import { Faq } from '~/components/faq'
import { Cta } from '~/components/cta'
import { Footer } from '~/components/footer'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

const faqs = [
  { q: 'How is this different from asking ChatGPT?', a: "ChatGPT gives you a single model's opinion. Bulwark deploys an entire swarm of specialized agents — each focused on one dimension of due diligence — that crawl the internet, cross-reference findings across thousands of sources, run financial simulations, and produce a structured report with confidence scores. It's the difference between asking a friend and hiring McKinsey." },
  { q: 'What kind of research report do I get?', a: 'A 30+ page intelligence brief covering every dimension McKinsey would analyze: market sizing (TAM/SAM/SOM), competitor landscape, business model viability, technical feasibility, risk matrix, GTM strategy, financial projections with Monte Carlo simulations, and an executive summary with a weighted go/no-go recommendation. Synthesized from 1,000+ data sources. Delivered to your inbox in about 30 minutes — and always available to download from your dashboard.' },
  { q: 'What do you mean by "agent swarm"?', a: "Instead of a single AI answering your question, Bulwark deploys dozens of specialized agents in parallel — each an expert in a specific domain. They independently research, then a synthesis engine cross-references their findings to resolve conflicts and produce a unified intelligence brief. It's how large consulting firms work, but at internet scale." },
  { q: 'Who is this for?', a: 'Any founder deciding what to build next. Solo founders validating their first idea. Serial entrepreneurs choosing between concepts. Venture studios evaluating deal flow. Anyone who believes taste and judgment matter more than execution speed.' },
  { q: 'Is my idea kept confidential?', a: 'Yes. Your ideas are encrypted at rest and in transit. We never share, sell, or use your data to train models. You own your data and can delete it at any time.' },
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
      <Testimonials />
      <section id="pricing" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="overline-divider max-w-xs mx-auto mb-4 reveal">Pricing</div>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl reveal delay-1">
              Big 4 rigor.<br />
              <span className="italic font-accent text-gradient-warm">Founder-friendly pricing.</span>
            </h2>
          </div>
          <PricingCards />
        </div>
      </section>
      <section id="faq" className="relative py-24 px-6">
        <div className="divider max-w-6xl mx-auto mb-24" />
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <div className="overline-divider max-w-xs mx-auto mb-4 reveal">FAQ</div>
            <h2 className="section-title text-3xl sm:text-4xl reveal delay-1">Common questions</h2>
          </div>
          <Faq faqs={faqs} />
        </div>
      </section>
      <Cta
        overline="The Last Moat"
        title={<>Taste decides what to build.<br /><span className="italic font-accent text-gradient-warm">Bulwark gives you the proof.</span></>}
        subtitle="Your first idea is free. Get a Big 4-quality dossier delivered to your inbox in 30 minutes — no credit card, no catch."
        primaryLabel="Validate Your Idea — Free"
        primaryHref="#hero-input"
        secondaryLabel="See Sample Report"
        secondaryHref="#"
      />
      <Footer />
    </div>
  )
}
