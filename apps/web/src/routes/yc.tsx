import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { BlueprintSection } from '~/components/blueprint-section'
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
			{/* Minimal Header */}
			<header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
				<div className="mx-auto max-w-6xl px-6 flex items-center h-14">
					<Link to="/" className="flex items-center gap-2.5">
						<BulwarkIcon className="w-7 h-7" />
						<span
							className="text-[18px] tracking-[0.04em] uppercase leading-none"
							style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700 }}
						>
							Bulwark{' '}
							<span
								className="text-dim"
								style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400, letterSpacing: '0.08em' }}
							>
								Research
							</span>
						</span>
					</Link>
				</div>
			</header>

			{/* Hero */}
			<section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
				{/* Floating background text */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
					<span className="font-display text-[12vw] font-bold text-ghost/20 whitespace-nowrap uppercase tracking-widest">
						DILIGENCE
					</span>
				</div>

				<div className="relative z-10 max-w-3xl mx-auto text-center">
					{/* Overline */}
					<div
						className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-signal bg-signal-bg mb-6 animate-fade-in"
						style={{ animationDelay: '0.1s' }}
					>
						<span className="w-2 h-2 bg-signal animate-pulse-dot" />
						<span className="font-mono text-[10px] tracking-[0.08em] uppercase text-signal">
							YC W26 Applications Open
						</span>
					</div>

					{/* Headline */}
					<h1
						className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 animate-slide-in"
						style={{ animationDelay: '0.2s' }}
					>
						BEFORE YOU APPLY TO YC —
						<br />
						<span className="text-secondary">GET DUE DILIGENCE IN 24 HOURS</span>
					</h1>

					{/* Subheadline */}
					<p
						className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 animate-slide-in"
						style={{ animationDelay: '0.35s' }}
					>
						92% of YC applicants get rejected. The most common reason? Weak market insight.
						Commission a Big 4-quality research dossier on your idea before you hit submit.
					</p>

					{/* Email CTA */}
					<div className="animate-slide-in" style={{ animationDelay: '0.5s' }}>
						{heroSubmitted ? (
							<div className="max-w-md mx-auto">
								<h3 className="font-display text-xl font-700 uppercase tracking-wider mb-2">YOU'RE IN.</h3>
								<p className="text-secondary text-sm">
									We'll deliver your complimentary dossier to{' '}
									<span className="text-ink">{heroEmail}</span>. Check your inbox within
									24 hours.
								</p>
							</div>
						) : (
							<form onSubmit={handleHeroSubmit} className="max-w-md mx-auto">
								<div className="flex flex-col sm:flex-row gap-0">
									<input
										type="email"
										required
										placeholder="you@startup.com"
										value={heroEmail}
										onChange={(e) => setHeroEmail(e.target.value)}
										className="bp-input flex-1"
									/>
									<button
										type="submit"
										className="btn-signal px-7 py-3 text-sm font-semibold whitespace-nowrap"
									>
										Hire Us — It's Free
									</button>
								</div>
								<p className="mt-4 font-mono text-[10px] text-dim tracking-[0.08em]">
									First engagement complimentary · Delivered in 24 hours · No commitment
								</p>
							</form>
						)}
					</div>
				</div>
			</section>

			{/* What You Get */}
			<BlueprintSection number="01" title="WHAT YOU GET">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
					{[
						{
							icon: '◎',
							title: 'Market Size Analysis',
							desc: 'TAM/SAM/SOM sizing from industry reports, government databases, and real transaction data. Not ChatGPT guesses.',
						},
						{
							icon: '◈',
							title: 'Competitor Deep Dive',
							desc: 'Top 10 competitors mapped with funding, traction, positioning, and gaps you can exploit. Know the battlefield.',
						},
						{
							icon: '△',
							title: 'YC-Ready Executive Summary',
							desc: 'A weighted go/no-go score with the exact framing YC partners look for. Walk in with conviction.',
						},
					].map((card, i) => (
						<div
							key={card.title}
							className={`bp-card p-7 reveal delay-${i + 2}`}
						>
							<div className="flex items-start justify-between mb-5">
								<span className="text-signal text-lg">{card.icon}</span>
								<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase">
									{String(i + 1).padStart(2, '0')}
								</span>
							</div>
							<h3 className="font-display text-sm font-700 uppercase tracking-wider mb-3">{card.title}</h3>
							<p className="text-sm text-secondary leading-relaxed">{card.desc}</p>
						</div>
					))}
				</div>
			</BlueprintSection>

			{/* How It Works */}
			<BlueprintSection number="02" title="HOW IT WORKS">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
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
						<div key={step.num} className={`border border-border p-6 reveal delay-${i + 2}`}>
							<span className="font-mono text-[10px] text-dim tracking-[0.08em] block mb-3">
								{step.num}
							</span>
							<h3 className="font-display text-sm font-700 uppercase tracking-wider mb-2">
								{step.title}
							</h3>
							<p className="text-secondary text-xs leading-relaxed">
								{step.desc}
							</p>
						</div>
					))}
				</div>
			</BlueprintSection>

			{/* Sample Report Teaser */}
			<BlueprintSection number="03" title="PROOF">
				<div className="max-w-2xl">
					<Link to="/sample-report" className="block reveal delay-2">
						<div className="bp-card p-6 md:p-8 transition-all duration-150 hover:border-signal">
							<div className="flex items-center justify-between mb-4">
								<div>
									<div className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase mb-1">
										Bulwark Dossier · Confidential
									</div>
									<div className="font-display text-base font-600 uppercase tracking-wider">
										AI-Powered Pet Health Monitoring Platform
									</div>
								</div>
								<div className="flex items-center gap-2">
									<span className="w-2 h-2 bg-signal animate-pulse-dot" />
									<span className="font-mono text-sm text-signal font-semibold">74/100</span>
								</div>
							</div>
							<div className="h-px bg-border mb-4" />
							<div className="flex items-center justify-between">
								<div className="font-mono text-[9px] text-dim tracking-[0.08em] uppercase">
									32 pages · 1,247 sources · 47 agents
								</div>
								<span className="font-mono text-xs text-signal">
									View Full Dossier →
								</span>
							</div>
						</div>
					</Link>
				</div>
			</BlueprintSection>

			{/* Bottom CTA */}
			<section className="section-dark py-24 px-6">
				<div className="max-w-2xl mx-auto text-center">
					<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-8 reveal">
						// Your YC Application
					</span>
					<h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-white reveal delay-1">
						DON'T APPLY BLIND.
					</h2>
					<p className="text-ghost mt-4 mb-10 reveal delay-2">
						Get the research YC partners wish every applicant had.
						First engagement complimentary.
					</p>

					<div className="reveal delay-3">
						{bottomSubmitted ? (
							<div>
								<h3 className="font-display text-xl font-700 uppercase tracking-wider text-white mb-2">YOU'RE IN.</h3>
								<p className="text-ghost text-sm">
									We'll deliver your complimentary dossier to{' '}
									<span className="text-white">{bottomEmail}</span>.
								</p>
							</div>
						) : (
							<form
								onSubmit={handleBottomSubmit}
								className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
							>
								<input
									type="email"
									required
									placeholder="you@startup.com"
									value={bottomEmail}
									onChange={(e) => setBottomEmail(e.target.value)}
									className="bp-input flex-1 bg-white/10 border-white/20 text-white placeholder:text-ghost"
								/>
								<button
									type="submit"
									className="btn-signal px-7 py-3 text-sm font-semibold whitespace-nowrap"
								>
									Hire Us — It's Free
								</button>
							</form>
						)}
					</div>
				</div>
			</section>

			{/* Minimal Footer */}
			<footer className="section-dark border-t border-white/10 py-8 px-6">
				<div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
					<span className="font-mono text-[10px] text-dim tracking-[0.08em]">
						&copy; 2026 BULWARK RESEARCH. ALL RIGHTS RESERVED.
					</span>
					<div className="flex items-center gap-6 font-mono text-[10px] text-dim tracking-[0.08em]">
						<a href="#" className="hover:text-white transition-colors">Privacy</a>
						<a href="#" className="hover:text-white transition-colors">Terms</a>
					</div>
				</div>
			</footer>
		</div>
	)
}
