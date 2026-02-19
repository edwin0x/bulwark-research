import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { BulwarkIcon } from '~/components/bulwark-icon'
import { EngagementLensCard } from '~/components/engagement-lens-card'
import { RESEARCH_LENSES } from '~/data/research-lenses'
import { useRequireAuth } from '~/hooks/use-require-auth'
import type { ResearchLens } from '~/lib/database.types'
import { getSupabase } from '~/lib/supabase'

export const Route = createFileRoute('/portal/engagements/new')({
	head: () => ({
		meta: [
			{ title: 'New Engagement — Bulwark Research' },
			{
				name: 'description',
				content: 'Submit a startup idea for deep research analysis.',
			},
			{ property: 'og:title', content: 'New Engagement — Bulwark Research' },
		],
	}),
	component: NewEngagementPage,
})

type Step = 'idea' | 'details' | 'review'
const STEPS: Step[] = ['idea', 'details', 'review']

function NewEngagementPage() {
	const navigate = useNavigate()
	const { session, loading: authLoading } = useRequireAuth()
	const [step, setStep] = useState<Step>('idea')
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState('')

	// Step 1
	const [ideaDescription, setIdeaDescription] = useState('')
	const [researchLens, setResearchLens] = useState('')

	// Step 2
	const [targetMarket, setTargetMarket] = useState('')
	const [knownCompetitors, setKnownCompetitors] = useState('')
	const [specificQuestions, setSpecificQuestions] = useState('')
	const [geographyFocus, setGeographyFocus] = useState('')

	function handleStep1Submit(e: React.FormEvent) {
		e.preventDefault()
		if (!ideaDescription.trim() || !researchLens) {
			setError('Please describe your idea and select a research lens.')
			return
		}
		setError('')
		setStep('details')
	}

	function handleStep2Continue(e: React.FormEvent) {
		e.preventDefault()
		setStep('review')
	}

	function handleSkip() {
		setStep('review')
	}

	async function handleSubmit() {
		if (!session) return

		setSubmitting(true)
		setError('')

		const supabase = getSupabase()
		const { data, error: insertError } = await supabase
			.from('engagements')
			.insert({
				user_id: session.user.id,
				idea_description: ideaDescription.trim(),
				research_lens: researchLens as ResearchLens,
				target_market: targetMarket.trim() || null,
				known_competitors: knownCompetitors.trim() || null,
				specific_questions: specificQuestions.trim() || null,
				geography_focus: geographyFocus.trim() || null,
			})
			.select('id')
			.single()

		if (insertError) {
			setError(insertError.message)
			setSubmitting(false)
			return
		}

		navigate({ to: '/portal/engagements/$id', params: { id: data.id } })
	}

	if (authLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-sm text-dim font-mono animate-pulse">Loading...</p>
			</div>
		)
	}

	const currentStepIdx = STEPS.indexOf(step)
	const selectedLens = RESEARCH_LENSES.find((l) => l.value === researchLens)

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
			<div className="relative z-10 w-full max-w-lg">
				{/* Logo */}
				<Link to="/" className="flex items-center justify-center gap-2.5 mb-12 group animate-fade-in">
					<BulwarkIcon className="w-8 h-8" />
					<span
						className="text-[20px] tracking-[0.04em] uppercase leading-none"
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

				{/* Step indicator */}
				<div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
					{STEPS.map((s, i) => (
						<div key={s} className="flex items-center gap-2">
							<div
								className={`w-2 h-2 transition-colors duration-300 ${
									s === step ? 'bg-signal' : currentStepIdx > i ? 'bg-signal/40' : 'bg-border'
								}`}
							/>
							{i < STEPS.length - 1 && (
								<div
									className={`w-8 h-px transition-colors duration-300 ${
										currentStepIdx > i ? 'bg-signal/40' : 'bg-border'
									}`}
								/>
							)}
						</div>
					))}
				</div>

				{/* Error */}
				{error && (
					<div className="mb-4 p-3 border border-signal/30 bg-signal-bg text-signal text-xs font-mono text-center">
						{error}
					</div>
				)}

				{/* Step 1: Idea + Lens */}
				{step === 'idea' && (
					<>
						<div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
							<h1 className="section-title text-3xl sm:text-4xl mb-2">
								Describe your <span className="text-secondary">idea</span>
							</h1>
							<p className="text-sm text-secondary">
								Tell us about the startup you want to validate.
							</p>
						</div>

						<div className="bp-card p-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
							<form onSubmit={handleStep1Submit} className="flex flex-col gap-6">
								<div>
									<label htmlFor="idea" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
										Idea Description
									</label>
									<textarea
										id="idea"
										required
										rows={4}
										placeholder="Describe your startup idea in 2-3 paragraphs..."
										value={ideaDescription}
										onChange={(e) => setIdeaDescription(e.target.value)}
										className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors resize-y min-h-[100px]"
									/>
								</div>

								<div>
									<label className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-3">
										Research Lens
									</label>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{RESEARCH_LENSES.map((lens) => (
											<EngagementLensCard
												key={lens.value}
												lens={lens}
												selected={researchLens === lens.value}
												onSelect={setResearchLens}
											/>
										))}
									</div>
								</div>

								<button type="submit" className="btn-signal w-full px-7 py-3 text-sm mt-2">
									Continue
								</button>
							</form>
						</div>
					</>
				)}

				{/* Step 2: Enhance (optional) */}
				{step === 'details' && (
					<>
						<div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.05s' }}>
							<h1 className="section-title text-3xl sm:text-4xl mb-2">
								Add <span className="text-secondary">context</span>
							</h1>
							<p className="text-sm text-secondary">
								All fields are optional — skip if you want speed.
							</p>
						</div>

						<div className="bp-card p-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
							<form onSubmit={handleStep2Continue} className="flex flex-col gap-4">
								<div>
									<label htmlFor="targetMarket" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
										Target Market
									</label>
									<input
										id="targetMarket"
										type="text"
										placeholder="e.g., Solo founders, SMBs in APAC"
										value={targetMarket}
										onChange={(e) => setTargetMarket(e.target.value)}
										className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors"
									/>
								</div>
								<div>
									<label htmlFor="competitors" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
										Known Competitors
									</label>
									<input
										id="competitors"
										type="text"
										placeholder="e.g., Gartner, CB Insights, Exploding Topics"
										value={knownCompetitors}
										onChange={(e) => setKnownCompetitors(e.target.value)}
										className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors"
									/>
								</div>
								<div>
									<label htmlFor="questions" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
										Specific Questions
									</label>
									<textarea
										id="questions"
										rows={3}
										placeholder="What specific questions should our research answer?"
										value={specificQuestions}
										onChange={(e) => setSpecificQuestions(e.target.value)}
										className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors resize-y"
									/>
								</div>
								<div>
									<label htmlFor="geography" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
										Geography Focus
									</label>
									<input
										id="geography"
										type="text"
										placeholder="e.g., US, Europe, Global"
										value={geographyFocus}
										onChange={(e) => setGeographyFocus(e.target.value)}
										className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors"
									/>
								</div>
								<div className="flex gap-3 mt-2">
									<button
										type="button"
										onClick={() => {
											setStep('idea')
											setError('')
										}}
										className="btn-outline px-5 py-3 text-sm flex-1"
									>
										Back
									</button>
									<button type="button" onClick={handleSkip} className="btn-outline px-5 py-3 text-sm flex-1">
										Skip
									</button>
									<button type="submit" className="btn-signal px-7 py-3 text-sm flex-[2]">
										Continue
									</button>
								</div>
							</form>
						</div>
					</>
				)}

				{/* Step 3: Review & Submit */}
				{step === 'review' && (
					<>
						<div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.05s' }}>
							<h1 className="section-title text-3xl sm:text-4xl mb-2">
								Review & <span className="text-secondary">submit</span>
							</h1>
							<p className="text-sm text-secondary">Confirm your engagement details before submitting.</p>
						</div>

						<div className="bp-card p-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
							<div className="flex flex-col gap-5">
								<div>
									<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
										Research Lens
									</span>
									<span className="inline-block font-mono text-[10px] uppercase tracking-wider border border-signal/30 text-signal px-2 py-0.5">
										{selectedLens?.label}
									</span>
								</div>

								<div>
									<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
										Idea Description
									</span>
									<p className="text-sm text-ink whitespace-pre-wrap">{ideaDescription}</p>
								</div>

								{targetMarket && (
									<div>
										<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
											Target Market
										</span>
										<p className="text-sm text-ink">{targetMarket}</p>
									</div>
								)}

								{knownCompetitors && (
									<div>
										<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
											Known Competitors
										</span>
										<p className="text-sm text-ink">{knownCompetitors}</p>
									</div>
								)}

								{specificQuestions && (
									<div>
										<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
											Specific Questions
										</span>
										<p className="text-sm text-ink whitespace-pre-wrap">{specificQuestions}</p>
									</div>
								)}

								{geographyFocus && (
									<div>
										<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
											Geography Focus
										</span>
										<p className="text-sm text-ink">{geographyFocus}</p>
									</div>
								)}

								<div className="h-px bg-border mt-2" />

								<div className="flex gap-3">
									<button
										type="button"
										onClick={() => {
											setStep('details')
											setError('')
										}}
										className="btn-outline px-5 py-3 text-sm flex-1"
									>
										Back
									</button>
									<button
										type="button"
										onClick={handleSubmit}
										disabled={submitting}
										className="btn-signal px-7 py-3 text-sm flex-[2] disabled:opacity-50"
									>
										{submitting ? 'Submitting...' : 'Submit Engagement'}
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</div>

			{/* Bottom link */}
			<div className="absolute bottom-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
				<Link to="/portal" className="text-xs text-dim hover:text-secondary transition-colors">
					&larr; Back to portal
				</Link>
			</div>
		</div>
	)
}
