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
						<h3 className="font-display text-2xl font-700 uppercase tracking-wider mb-2">CHECK YOUR INBOX</h3>
						<p className="text-secondary mb-8">
							The full 32-page dossier is on its way to{' '}
							<span className="text-ink">{email}</span>.
						</p>
						<a href="/#hero-input" className="btn-signal inline-flex px-7 py-3 text-sm">
							Hire Us — It's Free
						</a>
					</div>
				) : (
					<>
						<h3 className="font-display text-xl sm:text-2xl font-700 uppercase tracking-wider mb-2 reveal">
							RECEIVE THE FULL 32-PAGE DOSSIER
						</h3>
						<p className="text-secondary mb-8 reveal delay-1">
							Delivered to your inbox
						</p>
						<form
							onSubmit={handleSubmit}
							className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto reveal delay-2"
						>
							<input
								type="email"
								required
								placeholder="you@company.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bp-input flex-1"
							/>
							<button type="submit" className="btn-signal px-7 py-3 text-sm whitespace-nowrap">
								Request Dossier
							</button>
						</form>
						<p className="mt-4 font-mono text-[10px] text-dim uppercase tracking-[0.08em] reveal delay-3">
							Complimentary · Confidential · PDF format
						</p>
					</>
				)}
			</div>
		</section>
	)
}
