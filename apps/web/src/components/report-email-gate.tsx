import { useState } from 'react'

export function ReportEmailGate() {
	const [email, setEmail] = useState('')
	const [submitted, setSubmitted] = useState(false)

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!email) return
		setSubmitted(true)
	}

	return (
		<section className="relative py-24 px-6">
			<div className="max-w-xl mx-auto text-center">
				{submitted ? (
					<div className="reveal visible">
						<div className="text-4xl mb-4">✉️</div>
						<h3 className="font-serif text-2xl font-semibold mb-2">Check your inbox!</h3>
						<p className="text-muted mb-8">
							The full 32-page report is on its way to{' '}
							<span className="text-ivory">{email}</span>.
						</p>
						<a href="/#hero-input" className="btn-glow inline-flex px-7 py-3 text-sm">
							Validate Your Own Idea — Free
						</a>
					</div>
				) : (
					<>
						<h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 reveal">
							Get the full 32-page report
						</h3>
						<p className="text-muted mb-8 reveal delay-1">
							<span className="italic font-accent text-gradient-warm">
								delivered to your inbox
							</span>
						</p>
						<form
							onSubmit={handleSubmit}
							className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto reveal delay-2"
						>
							<input
								type="email"
								required
								placeholder="you@company.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="flex-1 px-4 py-3 rounded-full bg-ink-light border border-ink-border text-paper text-sm placeholder:text-dim focus:outline-none focus:border-vermillion/50 transition-colors"
							/>
							<button type="submit" className="btn-glow px-7 py-3 text-sm whitespace-nowrap">
								Send Report
							</button>
						</form>
						<p className="mt-4 font-mono text-[10px] text-dim uppercase tracking-wider reveal delay-3">
							Free · No spam · PDF format
						</p>
					</>
				)}
			</div>
		</section>
	)
}
