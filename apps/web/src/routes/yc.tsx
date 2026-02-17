import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { BulwarkIcon } from '~/components/bulwark-icon'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

export const Route = createFileRoute('/yc')({
	head: () => ({
		meta: [
			{ title: 'Before You Apply to YC — Get Due Diligence | Bulwark Research' },
			{
				name: 'description',
				content:
					'92% of YC applicants get rejected. Commission a Big 4-quality research dossier on your startup idea — delivered in 24 hours, before you hit submit.',
			},
			{
				property: 'og:title',
				content: 'Before You Apply to YC — Get Due Diligence in 24 Hours',
			},
			{
				property: 'og:description',
				content:
					'An AI-native consulting firm delivers McKinsey-grade due diligence on your idea. First engagement complimentary.',
			},
		],
	}),
	component: YcLandingPage,
})

function YcLandingPage() {
	const revealRef = useScrollReveal()
	const [heroEmail, setHeroEmail] = useState('')
	const [heroSubmitted, setHeroSubmitted] = useState(false)
	const [bottomEmail, setBottomEmail] = useState('')
	const [bottomSubmitted, setBottomSubmitted] = useState(false)

	function handleHeroSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!heroEmail) return
		setHeroSubmitted(true)
	}

	function handleBottomSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!bottomEmail) return
		setBottomSubmitted(true)
	}

	return (
		<div ref={revealRef}>
			{/* ── Minimal Header ─────────────────────────── */}
			<header className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-ink/80 backdrop-blur-xl">
				<div className="mx-auto max-w-6xl px-6 flex items-center h-16">
					<Link to="/" className="flex items-center gap-2.5">
						<BulwarkIcon className="w-7 h-7" />
						<span
							className="text-[18px] tracking-[0.06em] uppercase leading-none"
							style={{ fontFamily: "'Archivo Black', sans-serif" }}
						>
							Bulwark{' '}
							<span
								className="text-muted"
								style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}
							>
								Research
							</span>
						</span>
					</Link>
				</div>
			</header>

			{/* ── Hero ────────────────────────────────────── */}
			<section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
				<div className="hero-glow absolute inset-0 pointer-events-none" />
	
				{/* Floating background text */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
					<span className="font-serif text-[12vw] font-bold text-black/[0.03] whitespace-nowrap">
						DILIGENCE
					</span>
				</div>

				<div className="relative z-10 max-w-3xl mx-auto text-center">
					{/* Overline pill */}
					<div
						className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber/20 bg-amber/5 backdrop-blur-sm mb-6 animate-fade-in"
						style={{ animationDelay: '0.1s' }}
					>
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
						</span>
						<span className="font-mono text-[11px] tracking-[0.15em] uppercase text-amber">
							YC W26 Applications Open
						</span>
					</div>

					{/* Headline */}
					<h1
						className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-up"
						style={{ animationDelay: '0.2s' }}
					>
						Before You Apply to YC —
						<br />
						<span className="italic font-accent text-gradient-warm">
							Get Due Diligence in 24 Hours
						</span>
					</h1>

					{/* Subheadline */}
					<p
						className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 animate-fade-up"
						style={{ animationDelay: '0.35s' }}
					>
						92% of YC applicants get rejected. The most common reason? Weak market insight.
						Commission a Big 4-quality research dossier on your idea before you hit submit.
					</p>

					{/* Email CTA */}
					<div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
						{heroSubmitted ? (
							<div className="max-w-md mx-auto">
								<div className="text-3xl mb-3">✉️</div>
								<h3 className="font-serif text-xl font-semibold mb-2">You're in.</h3>
								<p className="text-muted text-sm">
									We'll deliver your complimentary dossier to{' '}
									<span className="text-ivory">{heroEmail}</span>. Check your inbox within
									24 hours.
								</p>
							</div>
						) : (
							<form onSubmit={handleHeroSubmit} className="max-w-md mx-auto">
								<div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl border border-ink-border bg-ink-light/60 backdrop-blur-sm">
									<input
										type="email"
										required
										placeholder="you@startup.com"
										value={heroEmail}
										onChange={(e) => setHeroEmail(e.target.value)}
										className="flex-1 bg-transparent px-5 py-3.5 text-paper placeholder-dim outline-none text-base rounded-xl"
									/>
									<button
										type="submit"
										className="btn-glow px-7 py-3.5 text-sm font-semibold whitespace-nowrap"
									>
										Hire Us — It's Free
									</button>
								</div>
								<p className="mt-4 text-xs text-dim font-mono">
									First engagement complimentary · Delivered in 24 hours · No commitment
								</p>
							</form>
						)}
					</div>
				</div>

				{/* Scroll indicator */}
				<div
					className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in"
					style={{ animationDelay: '1s' }}
				>
					<div className="w-5 h-8 rounded-full border border-ink-border flex items-start justify-center p-1.5">
						<div className="w-1 h-2 rounded-full bg-muted animate-pulse" />
					</div>
				</div>
			</section>

			{/* ── What You Get ────────────────────────────── */}
			<section className="relative py-24 px-6">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-16">
						<div className="overline-divider max-w-xs mx-auto mb-4 reveal">
							What You Get
						</div>
						<h2 className="section-title text-3xl sm:text-4xl md:text-5xl reveal delay-1">
							The research{' '}
							<span className="italic font-accent text-gradient-warm">
								YC partners wish
							</span>
							<br />
							every applicant had.
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{[
							{
								icon: '📊',
								title: 'Market Size Analysis',
								desc: 'TAM/SAM/SOM sizing from industry reports, government databases, and real transaction data. Not ChatGPT guesses.',
								color: 'var(--color-cyan)',
							},
							{
								icon: '🎯',
								title: 'Competitor Deep Dive',
								desc: 'Top 10 competitors mapped with funding, traction, positioning, and gaps you can exploit. Know the battlefield.',
								color: 'var(--color-amber)',
							},
							{
								icon: '📋',
								title: 'YC-Ready Executive Summary',
								desc: 'A weighted go/no-go score with the exact framing YC partners look for. Walk in with conviction.',
								color: 'var(--color-vermillion)',
							},
						].map((card, i) => (
							<div
								key={card.title}
								className={`card-glass rounded-2xl p-7 reveal delay-${i + 2}`}
							>
								<div className="flex items-start justify-between mb-5">
									<span className="text-2xl">{card.icon}</span>
									<span className="font-mono text-[10px] text-dim tracking-widest uppercase">
										{String(i + 1).padStart(2, '0')}
									</span>
								</div>
								<h3 className="font-serif text-lg font-semibold mb-3">{card.title}</h3>
								<p className="text-sm text-muted leading-relaxed">{card.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── How It Works ────────────────────────────── */}
			<section className="relative py-24 px-6">
				<div className="divider max-w-5xl mx-auto mb-24" />

				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-20">
						<div className="overline-divider max-w-xs mx-auto mb-4 reveal">
							How It Works
						</div>
						<h2 className="section-title text-3xl sm:text-4xl reveal delay-1">
							Three steps.{' '}
							<span className="italic font-accent text-gradient-warm">24 hours.</span>
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
						{[
							{
								num: '01',
								title: 'Describe your idea',
								desc: 'Tell us what you\'re building in plain English. One sentence is enough.',
							},
							{
								num: '02',
								title: 'Agent swarm runs research',
								desc: '47 specialized AI agents crawl thousands of sources in parallel — like a consulting team on fast-forward.',
							},
							{
								num: '03',
								title: 'Dossier in your inbox',
								desc: 'A 30+ page intelligence dossier lands in your inbox within 24 hours. Read it before you apply.',
							},
						].map((step, i) => (
							<div key={step.num} className={`relative reveal delay-${i + 2}`}>
								{i < 2 && (
									<div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-ink-border to-ink-border/0" />
								)}
								<div className="text-center md:text-left">
									<div className="inline-flex items-center gap-3 mb-6">
										<span className="font-mono text-xs text-dim tracking-widest">
											STEP
										</span>
										<span className="w-8 h-px bg-ink-border" />
										<span className="font-serif text-5xl font-bold text-black/8">
											{step.num}
										</span>
									</div>
									<h3 className="font-serif text-xl font-semibold mb-3">
										{step.title}
									</h3>
									<p className="text-muted text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
										{step.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Sample Report Teaser ────────────────────── */}
			<section className="relative py-24 px-6">
				<div className="divider max-w-5xl mx-auto mb-24" />

				<div className="max-w-2xl mx-auto">
					<div className="text-center mb-10">
						<div className="overline-divider max-w-xs mx-auto mb-4 reveal">
							Proof, Not Promises
						</div>
						<h2 className="section-title text-2xl sm:text-3xl reveal delay-1">
							See a real dossier before you commit.
						</h2>
					</div>

					<Link
						to="/sample-report"
						className="block reveal delay-2"
					>
						<div className="report-glow rounded-2xl border border-ink-border bg-ink-light/80 p-6 md:p-8 transition-all duration-300 hover:border-vermillion/30 hover:-translate-y-1">
							<div className="flex items-center justify-between mb-4">
								<div>
									<div className="font-mono text-[10px] text-dim tracking-widest uppercase mb-1">
										Bulwark Dossier · Confidential
									</div>
									<div className="font-serif text-lg font-semibold">
										AI-Powered Pet Health Monitoring Platform
									</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-emerald animate-pulse-dot" />
									<span className="font-mono text-sm text-emerald font-semibold">
										74/100
									</span>
								</div>
							</div>
							<div className="h-px bg-ink-border mb-4" />
							<div className="flex items-center justify-between">
								<div className="font-mono text-[9px] text-dim tracking-widest uppercase">
									32 pages · 1,247 sources · 47 agents
								</div>
								<span className="text-xs text-vermillion font-medium">
									View Full Dossier →
								</span>
							</div>
						</div>
					</Link>
				</div>
			</section>

			{/* ── Bottom CTA ──────────────────────────────── */}
			<section className="relative py-32 px-6 overflow-hidden">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />

				<div className="relative z-10 max-w-2xl mx-auto text-center">
					<div className="overline-divider max-w-md mx-auto mb-10 reveal">
						Your YC Application
					</div>
					<h2 className="section-title text-3xl sm:text-4xl md:text-5xl reveal delay-1">
						Don't apply blind.
					</h2>
					<p className="text-muted mt-4 mb-10 reveal delay-2">
						Get the research{' '}
						<span className="italic font-accent text-gradient-warm">
							YC partners wish every applicant had.
						</span>{' '}
						First engagement complimentary.
					</p>

					<div className="reveal delay-3">
						{bottomSubmitted ? (
							<div>
								<div className="text-3xl mb-3">✉️</div>
								<h3 className="font-serif text-xl font-semibold mb-2">You're in.</h3>
								<p className="text-muted text-sm">
									We'll deliver your complimentary dossier to{' '}
									<span className="text-ivory">{bottomEmail}</span>.
								</p>
							</div>
						) : (
							<form
								onSubmit={handleBottomSubmit}
								className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
							>
								<input
									type="email"
									required
									placeholder="you@startup.com"
									value={bottomEmail}
									onChange={(e) => setBottomEmail(e.target.value)}
									className="flex-1 px-5 py-3.5 rounded-full bg-ink-light border border-ink-border text-paper text-sm placeholder:text-dim focus:outline-none focus:border-vermillion/50 transition-colors"
								/>
								<button
									type="submit"
									className="btn-glow px-7 py-3.5 text-sm font-semibold whitespace-nowrap"
								>
									Hire Us — It's Free
								</button>
							</form>
						)}
					</div>
				</div>
			</section>

			{/* ── Minimal Footer ──────────────────────────── */}
			<footer className="border-t border-ink-border py-8 px-6">
				<div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
					<span className="text-xs text-dim">
						&copy; 2026 Bulwark Research. All rights reserved.
					</span>
					<div className="flex items-center gap-6 text-xs text-dim">
						<a href="#" className="hover:text-paper transition-colors">
							Privacy
						</a>
						<a href="#" className="hover:text-paper transition-colors">
							Terms
						</a>
					</div>
				</div>
			</footer>
		</div>
	)
}
