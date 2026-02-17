import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      {
        title: 'Contact — Bulwark Research',
      },
      {
        name: 'description',
        content:
          'Get in touch with Bulwark Research. Commission strategic intelligence or discuss your next engagement.',
      },
      {
        property: 'og:title',
        content: 'Contact — Bulwark Research',
      },
      {
        property: 'og:description',
        content:
          'Get in touch with Bulwark Research. Commission strategic intelligence or discuss your next engagement.',
      },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="overline-divider max-w-xs mx-auto mb-4 animate-fade-in">Get In Touch</div>
          <h1
            className="section-title text-4xl sm:text-5xl md:text-6xl mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
              Let's discuss your{' '}
              <span className="italic font-accent text-gradient-warm">
                next engagement.
              </span>
            </h1>

          <p
            className="text-lg text-muted max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Whether you're commissioning research or exploring a consulting
            partnership, we're here to help you make confident strategic
            decisions.
          </p>
        </div>
      </section>

          {/* Contact Card */}
          <section className="mx-auto mt-16 max-w-2xl">
            <div className="card-glass reveal delay-4 p-8 md:p-12">
              <div className="space-y-8">
                {/* Email */}
                <div>
                  <h3 className="mb-3 font-serif text-xl font-semibold text-paper">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@bulwark.research"
                    className="group inline-flex items-center gap-2 text-lg text-vermillion transition-colors hover:text-amber"
                  >
                    <span>hello@bulwark.research</span>
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>

                {/* Response Time */}
                <div>
                  <h3 className="mb-3 font-serif text-xl font-semibold text-paper">
                    Response Time
                  </h3>
                  <p className="text-muted">
                    We respond to all inquiries within 24 hours during business
                    days.
                  </p>
                </div>

                {/* Scheduling */}
                <div>
                  <h3 className="mb-3 font-serif text-xl font-semibold text-paper">
                    Schedule a Call
                  </h3>
                  <p className="text-muted">
                    Prefer to talk? Drop us an email with your availability and
                    we'll find a time that works for both of us.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Commission Research Section */}
          <section className="mx-auto mt-24 max-w-4xl text-center">
            <div className="reveal delay-5">
              <h2 className="section-title mb-6">
                Ready to{' '}
                <span className="italic font-accent text-gradient-warm">
                  validate an idea?
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted">
                Commission intelligence-grade research directly from our
                homepage. Submit your startup idea and receive a comprehensive
                strategic brief in 30 minutes.
              </p>
              <a
                href="/#hero-input"
                className="btn-glow inline-flex items-center gap-2"
              >
                <span>Commission Research</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mx-auto mt-32 max-w-4xl">
            <div className="card-glass reveal delay-6 p-12 text-center md:p-16">
              <h2 className="section-title mb-4">
                Let's build something{' '}
                <span className="italic font-accent text-gradient-warm">
                  remarkable.
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-muted">
                Whether it's a one-off validation or an ongoing engagement, we
                bring Big 4 rigor to indie-scale execution.
              </p>
              <a
                href="mailto:hello@bulwark.research"
                className="btn-glow inline-block"
              >
                Start a Conversation
              </a>
            </div>
          </section>
      <Footer />
    </div>
  )
}
