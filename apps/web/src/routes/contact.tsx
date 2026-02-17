import { createFileRoute } from '@tanstack/react-router'
import { BlueprintSection } from '~/components/blueprint-section'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

export const Route = createFileRoute('/contact')({
	head: () => ({
		meta: [
			{ title: 'Contact — Bulwark Research' },
			{
				name: 'description',
				content:
					'Get in touch with Bulwark Research. Commission strategic intelligence or discuss your next engagement.',
			},
			{ property: 'og:title', content: 'Contact — Bulwark Research' },
		],
	}),
	component: ContactPage,
})

function ContactPage() {
	const revealRef = useScrollReveal()

	return (
		<div ref={revealRef}>
			<Navbar />

			{/* Hero */}
			<section className="pt-32 pb-12 px-6">
				<div className="max-w-2xl mx-auto text-center">
					<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
						// Start a conversation
					</span>
					<h1
						className="section-title text-3xl sm:text-4xl md:text-5xl mb-6 animate-slide-in"
						style={{ animationDelay: '0.4s' }}
					>
						LET'S DISCUSS YOUR
						<br />
						<span className="text-secondary">NEXT ENGAGEMENT.</span>
					</h1>
				</div>
			</section>

			{/* Contact Form */}
			<BlueprintSection number="01" title="CONTACT">
				<div className="max-w-lg mx-auto">
					<form className="space-y-6 reveal delay-1" onSubmit={(e) => e.preventDefault()}>
						<div>
							<label htmlFor="name" className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-2">
								Name
							</label>
							<input
								id="name"
								type="text"
								className="bp-input"
								placeholder="Your name"
							/>
						</div>
						<div>
							<label htmlFor="email" className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-2">
								Email
							</label>
							<input
								id="email"
								type="email"
								className="bp-input"
								placeholder="you@company.com"
							/>
						</div>
						<div>
							<label htmlFor="brief" className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-2">
								Brief Description
							</label>
							<textarea
								id="brief"
								rows={4}
								className="bp-input resize-none"
								placeholder="Tell us about your idea or what you need..."
							/>
						</div>
						<button type="submit" className="btn-signal w-full py-3 text-sm">
							Send Message
						</button>
					</form>
					<p className="font-mono text-[10px] text-dim tracking-wider text-center mt-6 reveal delay-2">
						Typical response: &lt; 24 hours
					</p>
				</div>
			</BlueprintSection>

			<Footer />
		</div>
	)
}
