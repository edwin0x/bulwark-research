import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { BulwarkIcon } from '~/components/bulwark-icon'
import { getSupabase } from '~/lib/supabase'

const ROLE_OPTIONS = [
	'Solo Dev / Indie Hacker',
	'Founder / CEO',
	'Product Lead',
	'Investor / VC',
	'Consultant / Advisor',
	'Agency / Freelancer',
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
	const [password, setPassword] = useState('')
	const [roleSelection, setRoleSelection] = useState('')
	const [customRole, setCustomRole] = useState('')
	const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
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
		setError('')
		setStep('profile')
	}

	async function handleProfileSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!fullName || !role || !password) return
		if (password.length < 8) {
			setError('Password must be at least 8 characters.')
			return
		}

		setLoading(true)
		setError('')

		const { data, error: signUpError } = await getSupabase().auth.signUp({
			email,
			password,
			options: {
				data: { full_name: fullName, role },
				emailRedirectTo: `${window.location.origin}/portal/callback`,
			},
		})

		if (signUpError) {
			setError(signUpError.message)
			setLoading(false)
			return
		}

		setLoading(false)
		setStep('confirmation')
	}

	async function handleResendConfirmation() {
		setLoading(true)
		setError('')
		const { error: resendError } = await getSupabase().auth.resend({
			type: 'signup',
			email,
		})
		if (resendError) {
			setError(resendError.message)
		}
		setLoading(false)
	}

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
			{/* Content */}
			<div className="relative z-10 w-full max-w-sm">
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
					{(['email', 'profile', 'confirmation'] as const).map((s, i) => (
						<div key={s} className="flex items-center gap-2">
							<div
								className={`w-2 h-2 transition-colors duration-300 ${
									s === step
										? 'bg-signal'
										: ['email', 'profile', 'confirmation'].indexOf(step) > i
											? 'bg-signal/40'
											: 'bg-border'
								}`}
							/>
							{i < 2 && (
								<div
									className={`w-8 h-px transition-colors duration-300 ${
										['email', 'profile', 'confirmation'].indexOf(step) > i
											? 'bg-signal/40'
											: 'bg-border'
									}`}
								/>
							)}
						</div>
					))}
				</div>

				{/* Error message */}
				{error && (
					<div className="mb-4 p-3 border border-signal/30 bg-signal-bg text-signal text-xs font-mono text-center">
						{error}
					</div>
				)}

				{/* Step 1: Email */}
				{step === 'email' && (
					<>
						<div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
							<h1 className="section-title text-3xl sm:text-4xl mb-2">
								Get{' '}
								<span className="text-secondary">started</span>
							</h1>
							<p className="text-sm text-secondary">
								Enter your email to create your client account.
							</p>
						</div>

						<div className="bp-card p-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
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
										className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors"
									/>
								</div>
								<button type="submit" className="btn-signal w-full px-7 py-3 text-sm mt-2">
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
								<span className="text-secondary">you</span>
							</h1>
							<p className="text-sm text-secondary">
								So we can personalize your research experience.
							</p>
						</div>

						<div className="bp-card p-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
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
										className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors"
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
											className={`w-full px-4 py-3 bg-surface border text-sm text-left flex items-center justify-between transition-colors ${
												roleDropdownOpen
													? 'border-signal/50'
													: 'border-border'
											} ${roleSelection ? 'text-ink' : 'text-dim'}`}
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
											<div className="absolute z-20 mt-2 w-full border border-border overflow-hidden overflow-y-auto max-h-52 shadow-lg shadow-black/10 backdrop-blur-sm bg-white/95">
												{ROLE_OPTIONS.map((option) => (
													<button
														key={option}
														type="button"
														onClick={() => {
															setRoleSelection(option)
															setRoleDropdownOpen(false)
														}}
														className={`w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-border ${
															roleSelection === option ? 'text-signal' : 'text-ink'
														}`}
													>
														{option}
													</button>
												))}
												<div className="h-px bg-border" />
												<button
													type="button"
													onClick={() => {
														setRoleSelection('Other')
														setRoleDropdownOpen(false)
													}}
													className={`w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-border ${
														roleSelection === 'Other' ? 'text-signal' : 'text-secondary'
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
											className="w-full mt-3 px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors"
										/>
									)}
								</div>
								<div>
									<label htmlFor="password" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
										Password
									</label>
									<input
										id="password"
										type="password"
										required
										minLength={8}
										placeholder="Min 8 characters"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors"
									/>
								</div>
								<div className="flex gap-3 mt-2">
									<button
										type="button"
										onClick={() => { setStep('email'); setError('') }}
										className="btn-outline px-5 py-3 text-sm flex-1"
									>
										Back
									</button>
									<button type="submit" disabled={loading} className="btn-signal px-7 py-3 text-sm flex-[2] disabled:opacity-50">
										{loading ? 'Creating account...' : 'Create Account'}
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
								<span className="text-secondary">inbox</span>
							</h1>
							<p className="text-sm text-secondary">
								We sent a confirmation link to
							</p>
						</div>

						<div className="bp-card p-8 text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
							<div className="text-ink font-medium mb-6">{email}</div>
							<p className="text-xs text-dim leading-relaxed mb-6">
								Click the link in the email to verify your account and access your client portal. The link expires in 24 hours.
							</p>
							<div className="h-px bg-border mb-6" />
							<p className="text-xs text-dim">
								Didn't receive it?{' '}
								<button
									type="button"
									disabled={loading}
									onClick={handleResendConfirmation}
									className="text-ink hover:text-signal transition-colors disabled:opacity-50"
								>
									{loading ? 'Sending...' : 'Resend link'}
								</button>
							</p>
						</div>
					</>
				)}

				{/* Below card */}
				{step !== 'confirmation' && (
					<p
						className={`relative z-0 text-center text-sm text-secondary mt-8 animate-fade-up ${roleDropdownOpen ? 'invisible' : ''}`}
						style={{ animationDelay: '0.3s' }}
					>
						Already have an account?{' '}
						<Link to="/portal/sign-in" className="text-ink hover:text-signal transition-colors">
							Sign in
						</Link>
					</p>
				)}
			</div>

			{/* Bottom link back to site */}
			<div className="absolute bottom-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
				<Link to="/" className="text-xs text-dim hover:text-secondary transition-colors">
					&larr; Back to bulwarkresearch.com
				</Link>
			</div>
		</div>
	)
}
