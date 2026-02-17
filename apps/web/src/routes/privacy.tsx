import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Bulwark Research' },
      { name: 'description', content: 'How Bulwark Research handles and protects your data.' },
      { property: 'og:title', content: 'Privacy Policy — Bulwark Research' },
      {
        property: 'og:description',
        content: 'How Bulwark Research handles and protects your data.',
      },
    ],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="overline-divider max-w-xs mx-auto mb-4 animate-fade-in">Legal</div>
          <h1
            className="section-title text-4xl sm:text-5xl md:text-6xl mb-4 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-xl text-secondary animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Your ideas, protected
          </p>
          <p
            className="mt-6 text-sm text-dim animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            Effective Date: February 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
              {/* Introduction */}
              <div className="reveal delay-1 space-y-4">
                <p className="text-secondary leading-relaxed">
                  At Bulwark Research, we take your privacy seriously. This policy outlines what
                  data we collect, how we use it, and the rights you have over your information.
                  We believe in transparency and minimal data collection.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="reveal delay-2 space-y-4">
                <h3 className="mb-3 text-lg font-semibold text-ink">Information We Collect</h3>
                <p className="text-secondary leading-relaxed">
                  We collect only what is necessary to provide our service:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-secondary leading-relaxed">
                  <li>
                    <strong className="text-ink">Email address</strong> — to deliver research
                    reports and service updates
                  </li>
                  <li>
                    <strong className="text-ink">Startup idea descriptions</strong> — the
                    information you submit for research validation
                  </li>
                  <li>
                    <strong className="text-ink">Usage analytics</strong> — anonymized data about
                    how you interact with our platform to improve service quality
                  </li>
                </ul>
              </div>

              {/* How We Use Your Data */}
              <div className="reveal delay-3 space-y-4">
                <h3 className="mb-3 text-lg font-semibold text-ink">How We Use Your Data</h3>
                <p className="text-secondary leading-relaxed">Your data serves three purposes only:</p>
                <ul className="ml-6 list-disc space-y-2 text-secondary leading-relaxed">
                  <li>
                    <strong className="text-ink">To produce research dossiers</strong> — our
                    autonomous agent swarm uses your startup description to conduct internet-scale
                    research
                  </li>
                  <li>
                    <strong className="text-ink">To deliver reports via email</strong> — we send
                    your completed research brief to the email address you provide
                  </li>
                  <li>
                    <strong className="text-ink">To improve service quality</strong> —
                    anonymized and aggregated data helps us optimize research quality and delivery
                    speed
                  </li>
                </ul>
              </div>

              {/* Data Storage & Security */}
              <div className="reveal delay-4 space-y-4">
                <h3 className="mb-3 text-lg font-semibold text-ink">Data Storage & Security</h3>
                <p className="text-secondary leading-relaxed">
                  Your data is protected with industry-standard security measures:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-secondary leading-relaxed">
                  <li>
                    <strong className="text-ink">Encrypted at rest and in transit</strong> —
                    using AES-256 and TLS 1.3
                  </li>
                  <li>
                    <strong className="text-ink">Hosted on secure infrastructure</strong> — with
                    SOC 2 compliant providers
                  </li>
                  <li>
                    <strong className="text-ink">Access limited to essential personnel</strong> —
                    on a strict need-to-know basis
                  </li>
                </ul>
              </div>

              {/* What We Don't Do */}
              <div className="reveal delay-5 space-y-4">
                <h3 className="mb-3 text-lg font-semibold text-ink">What We Don't Do</h3>
                <p className="text-secondary leading-relaxed">Our commitments to you:</p>
                <ul className="ml-6 list-disc space-y-2 text-secondary leading-relaxed">
                  <li>
                    <strong className="text-ink">Never sell your data</strong> — your information
                    is not a product
                  </li>
                  <li>
                    <strong className="text-ink">Never share with third parties</strong> — except
                    where legally required or with your explicit consent
                  </li>
                  <li>
                    <strong className="text-ink">Never use submissions to train AI models</strong>{' '}
                    — your startup ideas remain confidential and are never used for model training
                  </li>
                  <li>
                    <strong className="text-ink">Never display your ideas publicly</strong> —
                    research submissions are private by default
                  </li>
                </ul>
              </div>

              {/* Your Rights */}
              <div className="reveal delay-6 space-y-4">
                <h3 className="mb-3 text-lg font-semibold text-ink">Your Rights</h3>
                <p className="text-secondary leading-relaxed">You have full control over your data:</p>
                <ul className="ml-6 list-disc space-y-2 text-secondary leading-relaxed">
                  <li>
                    <strong className="text-ink">Request data export</strong> — receive a copy of
                    all data we hold about you
                  </li>
                  <li>
                    <strong className="text-ink">Request deletion</strong> — we will permanently
                    remove your data from our systems
                  </li>
                  <li>
                    <strong className="text-ink">Withdraw consent at any time</strong> — opt out
                    of communications or service usage
                  </li>
                </ul>
                <p className="text-secondary leading-relaxed">
                  To exercise any of these rights, contact us at{' '}
                  <a
                    href="mailto:hello@bulwark.research"
                    className="text-signal underline decoration-signal/30 underline-offset-2 transition-colors hover:decoration-signal"
                  >
                    hello@bulwark.research
                  </a>
                </p>
              </div>

              {/* Cookies */}
              <div className="reveal delay-7 space-y-4">
                <h3 className="mb-3 text-lg font-semibold text-ink">Cookies</h3>
                <p className="text-secondary leading-relaxed">
                  We use minimal analytics cookies to understand how users interact with our
                  platform. We do not use advertising trackers or third-party marketing cookies.
                  You can disable cookies in your browser settings, though this may affect site
                  functionality.
                </p>
              </div>

              {/* Changes to This Policy */}
              <div className="reveal delay-8 space-y-4">
                <h3 className="mb-3 text-lg font-semibold text-ink">Changes to This Policy</h3>
                <p className="text-secondary leading-relaxed">
                  We may update this privacy policy from time to time to reflect changes in our
                  practices or legal requirements. We will notify registered users of material
                  changes via email and update the effective date at the top of this page.
                  Continued use of our service after changes constitutes acceptance of the updated
                  policy.
                </p>
              </div>

              {/* Contact */}
              <div className="reveal delay-9 space-y-4 border-t border-border pt-12">
                <p className="text-secondary leading-relaxed">
                  Questions about this privacy policy? Contact us at{' '}
                  <a
                    href="mailto:hello@bulwark.research"
                    className="text-signal underline decoration-signal/30 underline-offset-2 transition-colors hover:decoration-signal"
                  >
                    hello@bulwark.research
                  </a>
                </p>
              </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
