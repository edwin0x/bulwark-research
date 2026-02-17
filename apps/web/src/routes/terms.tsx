import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms of Service — Bulwark Research' },
      { name: 'description', content: 'Terms governing the use of Bulwark Research services.' },
      { property: 'og:title', content: 'Terms of Service — Bulwark Research' },
    ],
  }),
  component: TermsPage,
})

function TermsPage() {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="overline-divider max-w-xs mx-auto mb-4 animate-fade-in">Legal</div>
          <h1
            className="section-title text-4xl sm:text-5xl md:text-6xl mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Terms of <span className="italic font-accent text-gradient-warm">Service</span>
          </h1>
          <p
            className="text-lg text-muted animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Last updated: February 2026
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
              {/* Acceptance of Terms */}
              <div className="reveal delay-1 space-y-4">
                <h3 className="text-paper font-semibold text-lg mb-3">
                  Acceptance of Terms
                </h3>
                <p className="text-muted leading-relaxed">
                  By accessing or using Bulwark Research, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
                </p>
              </div>

              {/* Service Description */}
              <div className="reveal delay-2 space-y-4">
                <h3 className="text-paper font-semibold text-lg mb-3">
                  Service Description
                </h3>
                <p className="text-muted leading-relaxed">
                  Bulwark Research provides AI-powered research and intelligence services. We deliver comprehensive research dossiers based on submitted startup ideas. Our services include market analysis, competitive intelligence, and strategic validation reports.
                </p>
                <p className="text-muted leading-relaxed">
                  Research deliverables are typically provided within 24 hours of engagement initiation. Delivery times may vary based on research complexity and system load.
                </p>
              </div>

              {/* Accounts & Access */}
              <div className="reveal delay-3 space-y-4">
                <h3 className="text-paper font-semibold text-lg mb-3">
                  Accounts & Access
                </h3>
                <p className="text-muted leading-relaxed">
                  You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
                </p>
                <p className="text-muted leading-relaxed">
                  You agree to notify us immediately of any unauthorized access or security breach. We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
                </p>
              </div>

              {/* Engagements & Payment */}
              <div className="reveal delay-4 space-y-4">
                <h3 className="text-paper font-semibold text-lg mb-3">
                  Engagements & Payment
                </h3>
                <p className="text-muted leading-relaxed">
                  Bulwark Research operates on a credit-based pricing model with no subscription requirements. Our Free tier provides 10 basic validations per month at no cost. Paid credits are available through one-time purchases and never expire.
                </p>
                <p className="text-muted leading-relaxed">
                  All payments are processed securely via Stripe. By submitting payment information, you authorize us to charge the applicable fees to your payment method.
                </p>
                <p className="text-muted leading-relaxed">
                  All sales are final. Research engagements begin immediately upon purchase, and refunds are not available once research has commenced. We do not offer pro-rata refunds for unused credits.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="reveal delay-5 space-y-4">
                <h3 className="text-paper font-semibold text-lg mb-3">
                  Intellectual Property
                </h3>
                <p className="text-muted leading-relaxed">
                  You retain full ownership of all startup ideas, business concepts, and other information you submit to Bulwark Research. You also retain ownership of the research dossiers we deliver to you.
                </p>
                <p className="text-muted leading-relaxed">
                  Bulwark Research retains all rights, title, and interest in its platform, methodology, agent architecture, proprietary algorithms, and service delivery infrastructure. You may not copy, modify, or reverse engineer any aspect of our technology.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="reveal delay-6 space-y-4">
                <h3 className="text-paper font-semibold text-lg mb-3">
                  Limitation of Liability
                </h3>
                <p className="text-muted leading-relaxed">
                  Our research services are provided for informational purposes only and do not constitute financial, legal, investment, or professional advice. You should consult qualified professionals before making business decisions based on our research.
                </p>
                <p className="text-muted leading-relaxed">
                  We do not guarantee specific business outcomes, market success, or the accuracy of third-party data sources. While we strive for quality and accuracy, research is inherently speculative and subject to uncertainty.
                </p>
                <p className="text-muted leading-relaxed">
                  To the maximum extent permitted by law, Bulwark Research's total liability to you for any claims arising from or related to our services is limited to the amount you paid us in the twelve months preceding the claim.
                </p>
              </div>

              {/* Termination */}
              <div className="reveal delay-7 space-y-4">
                <h3 className="text-paper font-semibold text-lg mb-3">
                  Termination
                </h3>
                <p className="text-muted leading-relaxed">
                  We reserve the right to suspend or terminate your account if you violate these Terms of Service, engage in fraudulent activity, or use our services in a manner that harms our operations or other users.
                </p>
                <p className="text-muted leading-relaxed">
                  You may delete your account and associated data at any time through your account settings. Unused credits associated with deleted accounts are forfeited and non-refundable.
                </p>
              </div>

              {/* Governing Law */}
              <div className="reveal delay-8 space-y-4">
                <h3 className="text-paper font-semibold text-lg mb-3">
                  Governing Law
                </h3>
                <p className="text-muted leading-relaxed">
                  These Terms of Service are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes arising from these terms will be resolved in the courts of Delaware.
                </p>
              </div>

              {/* Contact */}
              <div className="reveal delay-9 space-y-4">
                <h3 className="text-paper font-semibold text-lg mb-3">
                  Contact
                </h3>
                <p className="text-muted leading-relaxed">
                  If you have questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:hello@bulwark.research" className="text-vermillion hover:underline">
                    hello@bulwark.research
                  </a>
                  .
                </p>
              </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
