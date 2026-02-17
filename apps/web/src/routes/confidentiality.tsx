import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

export const Route = createFileRoute('/confidentiality')({
  head: () => ({
    meta: [
      { title: 'Confidentiality — Bulwark Research' },
      { name: 'description', content: 'How Bulwark Research protects the confidentiality of your ideas and research.' },
      { property: 'og:title', content: 'Confidentiality — Bulwark Research' },
      { property: 'og:description', content: 'How Bulwark Research protects the confidentiality of your ideas and research.' },
    ],
  }),
  component: ConfidentialityPage,
})

function ConfidentialityPage() {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef}>
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="overline-divider max-w-xs mx-auto mb-4 animate-fade-in">Our Promise</div>
          <h1
            className="section-title text-4xl sm:text-5xl md:text-6xl mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Your ideas are <span className="italic font-accent text-gradient-warm">sacred</span>.
          </h1>
          <p
            className="text-lg text-muted max-w-xl mx-auto animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            When you share a startup idea, you're trusting us with something deeply personal. We treat that trust with the seriousness it deserves.
          </p>
        </div>
      </section>

      {/* Commitment Cards */}
      <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title text-3xl md:text-4xl text-center mb-16 reveal">
              Our Commitments
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="card-glass p-8 reveal delay-1">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-emerald flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-3">End-to-End Encryption</h3>
                    <p className="text-muted leading-relaxed">
                      Data encrypted at rest (AES-256) and in transit (TLS 1.3). Zero plaintext storage. Your submissions are locked down from submission to deletion.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="card-glass p-8 reveal delay-2">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-emerald flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-3">No Model Training</h3>
                    <p className="text-muted leading-relaxed">
                      Your submissions are never used to train or fine-tune AI models. Period. Your ideas don't become someone else's competitive advantage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="card-glass p-8 reveal delay-3">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-emerald flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-3">No Third-Party Sharing</h3>
                    <p className="text-muted leading-relaxed">
                      Research data is never sold, shared, or disclosed to any third party. Not for advertising, not for analytics, not for partnerships. Ever.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="card-glass p-8 reveal delay-4">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-emerald flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-3">Full Data Control</h3>
                    <p className="text-muted leading-relaxed">
                      Export or permanently delete all your data at any time. No retention after deletion. When you say delete, we mean it — gone, not archived.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

			{/* How We Differ Section */}
			<section className="relative py-24 px-6">
				<div className="divider max-w-6xl mx-auto mb-24" />
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-16">
						<div className="overline-divider max-w-xs mx-auto mb-4 reveal">The Difference</div>
						<h2 className="section-title text-3xl sm:text-4xl reveal delay-1">
							How we <span className="italic font-accent text-gradient-warm">differ.</span>
						</h2>
					</div>

					<div className="space-y-8">
						<div className="reveal delay-2">
							<span className="font-mono text-[10px] text-dim uppercase tracking-widest">Typical AI Tools</span>
							<p className="text-dim italic pl-4 border-l-2 border-ink-border mt-2 mb-4">
								"We may use your data to improve our services"
							</p>
							<span className="font-mono text-[10px] text-vermillion uppercase tracking-widest">Bulwark</span>
							<p className="text-paper font-medium pl-4 border-l-2 border-vermillion mt-2">
								We never use your data for anything beyond your engagement. Your ideas train nothing.
							</p>
						</div>

						<div className="reveal delay-3">
							<span className="font-mono text-[10px] text-dim uppercase tracking-widest">Typical AI Tools</span>
							<p className="text-dim italic pl-4 border-l-2 border-ink-border mt-2 mb-4">
								"Data retained indefinitely for service improvement"
							</p>
							<span className="font-mono text-[10px] text-vermillion uppercase tracking-widest">Bulwark</span>
							<p className="text-paper font-medium pl-4 border-l-2 border-vermillion mt-2">
								Delete everything, anytime, permanently. Zero retention post-deletion.
							</p>
						</div>

						<div className="reveal delay-4">
							<span className="font-mono text-[10px] text-dim uppercase tracking-widest">Typical AI Tools</span>
							<p className="text-dim italic pl-4 border-l-2 border-ink-border mt-2 mb-4">
								"Shared with trusted partners and service providers"
							</p>
							<span className="font-mono text-[10px] text-vermillion uppercase tracking-widest">Bulwark</span>
							<p className="text-paper font-medium pl-4 border-l-2 border-vermillion mt-2">
								Zero third-party access, ever. Your data stays within Bulwark infrastructure.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Security Contact Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-3xl mx-auto text-center">
					<div className="card-glass p-12 reveal">
						<h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
							Security Concerns?
						</h2>
						<p className="text-muted text-lg leading-relaxed mb-8">
							If you have questions about our security practices or need to report a vulnerability, our security team is here to help.
						</p>
						<a
							href="mailto:security@bulwark.research"
							className="inline-flex items-center gap-2 text-vermillion hover:text-amber transition-colors font-mono text-sm"
						>
							security@bulwark.research
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
					</div>
				</div>
			</section>

			{/* Bottom CTA */}
			<section className="relative py-32 px-6 overflow-hidden">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />
				<div className="relative z-10 max-w-2xl mx-auto text-center">
					<h2 className="section-title text-3xl sm:text-4xl mb-4 reveal">
						Ready to validate your idea?
					</h2>
					<p className="text-muted mb-8 reveal delay-1">
						Start with your first idea, free. No credit card. No risk.
					</p>
					<a href="/#hero-input" className="btn-glow px-8 py-3.5 text-sm reveal delay-2">
						Validate Your First Idea Free
					</a>
				</div>
			</section>

			<Footer />
		</div>
  )
}
