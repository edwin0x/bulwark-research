import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { BulwarkIcon } from '~/components/bulwark-icon'

const ROLE_OPTIONS = [
	'Founder / CEO',
	'Investor / VC',
	'Product Lead',
	'Strategy / Biz Dev',
	'Consultant / Advisor',
	'Researcher / Analyst',
] as const

export const Route = createFileRoute('/portal/onboarding')({
	head: () => ({
		meta: [
			{ title: 'Get Started — Bulwark Research' },
			{
				name: 'description',
				content: 'Create your Bulwark Research client account to access research dossiers.',
			},
			{ property: 'og:title', content: 'Get Started — Bulwark Research' },
		],
	}),
	component: OnboardingPage,
})

type Step = 'email' | 'profile' | 'confirmation'

function OnboardingPage() {
	const [step, setStep] = useState<Step>('email')
	const [email, setEmail] = useState('')
	const [fullName, setFullName] = useState('')
	const [roleSelection, setRoleSelection] = useState('')
	const [customRole, setCustomRole] = useState('')
	const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const role = roleSelection === 'Other' ? customRole : roleSelection

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setRoleDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	function handleEmailSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!email) return
		setStep('profile')
	}

	function handleProfileSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!fullName || !role) return
		setStep('confirmation')
	}

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
			{/* Background effects */}
			<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vermillion/4 rounded-full blur-[200px] pointer-events-none" />

			{/* Content */}
			<div className="relative z-10 w-full max-w-sm">
				{/* Logo */}
				<Link to="/" className="flex items-center justify-center gap-2.5 mb-12 group animate-fade-in">
					<BulwarkIcon className="w-8 h-8" />
					<span
						className="text-[20px] tracking-[0.06em] uppercase leading-none"
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

				{/* Step indicator */}
				<div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
					{(['email', 'profile', 'confirmation'] as const).map((s, i) => (
						<div key={s} className="flex items-center gap-2">
							<div
								className={`w-2 h-2 rounded-full transition-colors duration-300 ${
									s === step
										? 'bg-vermillion'
										: ['email', 'profile', 'confirmation'].indexOf(step) > i
											? 'bg-vermillion/40'
											: 'bg-ink-border'
								}`}
							/>
							{i < 2 && (
								<div
									className={`w-8 h-px transition-colors duration-300 ${
										['email', 'profile', 'confirmation'].indexOf(step) > i
											? 'bg-vermillion/40'
											: 'bg-ink-border'
									}`}
								/>
							)}
						</div>
					))}
				</div>

				{/* Step 1: Email */}
				{step === 'email' && (
					<>
						<div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
							<h1 className="section-title text-3xl sm:text-4xl mb-2">
								Get{' '}
								<span className="italic font-accent text-gradient-warm">started</span>
							</h1>
							<p className="text-sm text-muted">
								Enter your email to create your client account.
							</p>
						</div>

						<div className="card-glass p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
							<form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
								<div>
									<label htmlFor="email" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
										Email
									</label>
									<input
										id="email"
										type="email"
										required
										autoFocus
										placeholder="you@company.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full px-4 py-3 rounded-full bg-ink-light border border-ink-border text-paper text-sm placeholder:text-dim focus:outline-none focus:border-vermillion/50 transition-colors"
									/>
								</div>
								<button type="submit" className="btn-glow w-full px-7 py-3 text-sm mt-2">
									Continue
								</button>
							</form>
						</div>
					</>
				)}

				{/* Step 2: Profile */}
				{step === 'profile' && (
					<>
						<div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.05s' }}>
							<h1 className="section-title text-3xl sm:text-4xl mb-2">
								Tell us about{' '}
								<span className="italic font-accent text-gradient-warm">you</span>
							</h1>
							<p className="text-sm text-muted">
								So we can personalize your research experience.
							</p>
						</div>

						<div className="card-glass p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
							<form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
								<div>
									<label htmlFor="fullName" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
										Full Name
									</label>
									<input
										id="fullName"
										type="text"
										required
										autoFocus
										placeholder="Jane Smith"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
										className="w-full px-4 py-3 rounded-full bg-ink-light border border-ink-border text-paper text-sm placeholder:text-dim focus:outline-none focus:border-vermillion/50 transition-colors"
									/>
								</div>
								<div>
									<label className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
										Role
									</label>
									<div ref={dropdownRef} className="relative">
										<button
											type="button"
											onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
											className={`w-full px-4 py-3 rounded-full bg-ink-light border text-sm text-left flex items-center justify-between transition-colors ${
												roleDropdownOpen
													? 'border-vermillion/50'
													: 'border-ink-border'
											} ${roleSelection ? 'text-paper' : 'text-dim'}`}
										>
											<span>{roleSelection || 'Select your role'}</span>
											<svg
												className={`w-4 h-4 text-dim transition-transform duration-200 ${roleDropdownOpen ? 'rotate-180' : ''}`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2}
											>
												<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
											</svg>
										</button>
										{roleDropdownOpen && (
											<div className="absolute z-20 mt-2 w-full rounded-2xl border border-ink-border overflow-hidden overflow-y-auto max-h-52 shadow-lg shadow-black/10 backdrop-blur-none bg-ink">
												{ROLE_OPTIONS.map((option) => (
													<button
														key={option}
														type="button"
														onClick={() => {
															setRoleSelection(option)
															setRoleDropdownOpen(false)
														}}
														className={`w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-black/5 ${
															roleSelection === option ? 'text-vermillion' : 'text-paper'
														}`}
													>
														{option}
													</button>
												))}
												<div className="h-px bg-ink-border" />
												<button
													type="button"
													onClick={() => {
														setRoleSelection('Other')
														setRoleDropdownOpen(false)
													}}
													className={`w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-black/5 ${
														roleSelection === 'Other' ? 'text-vermillion' : 'text-muted'
													}`}
												>
													Other
												</button>
											</div>
										)}
									</div>
									{roleSelection === 'Other' && (
										<input
											type="text"
											required
											autoFocus
											placeholder="Enter your role"
											value={customRole}
											onChange={(e) => setCustomRole(e.target.value)}
											className="w-full mt-3 px-4 py-3 rounded-full bg-ink-light border border-ink-border text-paper text-sm placeholder:text-dim focus:outline-none focus:border-vermillion/50 transition-colors"
										/>
									)}
								</div>
								<div className="flex gap-3 mt-2">
									<button
										type="button"
										onClick={() => setStep('email')}
										className="btn-outline px-5 py-3 text-sm flex-1"
									>
										Back
									</button>
									<button type="submit" className="btn-glow px-7 py-3 text-sm flex-[2]">
										Continue
									</button>
								</div>
							</form>
						</div>
					</>
				)}

				{/* Step 3: Confirmation */}
				{step === 'confirmation' && (
					<>
						<div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.05s' }}>
							<h1 className="section-title text-3xl sm:text-4xl mb-2">
								Check your{' '}
								<span className="italic font-accent text-gradient-warm">inbox</span>
							</h1>
							<p className="text-sm text-muted">
								We sent a sign-in link to
							</p>
						</div>

						<div className="card-glass p-8 rounded-2xl text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
							<div className="text-paper font-medium mb-6">{email}</div>
							<p className="text-xs text-dim leading-relaxed mb-6">
								Click the link in the email to access your client portal. The link expires in 15 minutes.
							</p>
							<div className="h-px bg-ink-border mb-6" />
							<p className="text-xs text-dim">
								Didn't receive it?{' '}
								<button
									type="button"
									onClick={() => setStep('confirmation')}
									className="text-paper hover:text-vermillion transition-colors"
								>
									Resend link
								</button>
							</p>
						</div>
					</>
				)}

				{/* Below card */}
				{step !== 'confirmation' && (
					<p
						className={`relative z-0 text-center text-sm text-muted mt-8 animate-fade-up ${roleDropdownOpen ? 'invisible' : ''}`}
						style={{ animationDelay: '0.3s' }}
					>
						Already have an account?{' '}
						<Link to="/portal/sign-in" className="text-paper hover:text-vermillion transition-colors">
							Sign in
						</Link>
					</p>
				)}
			</div>

			{/* Bottom link back to site */}
			<div className="absolute bottom-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
				<Link to="/" className="text-xs text-dim hover:text-muted transition-colors">
					&larr; Back to bulwarkresearch.com
				</Link>
			</div>
		</div>
	)
}
