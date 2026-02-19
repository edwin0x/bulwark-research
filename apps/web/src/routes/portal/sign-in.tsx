import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { BulwarkIcon } from '~/components/bulwark-icon'
import { getSupabase } from '~/lib/supabase'

export const Route = createFileRoute('/portal/sign-in')({
	head: () => ({
		meta: [
			{ title: 'Sign In — Bulwark Research' },
			{
				name: 'description',
				content: 'Sign in to your Bulwark Research client portal to access your research dossiers.',
			},
			{ property: 'og:title', content: 'Sign In — Bulwark Research' },
		],
	}),
	component: SignInPage,
})

function SignInPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [resetSent, setResetSent] = useState(false)
	const navigate = useNavigate()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setLoading(true)
		setError('')

		const { error: signInError } = await getSupabase().auth.signInWithPassword({
			email,
			password,
		})

		if (signInError) {
			setError(signInError.message)
			setLoading(false)
			return
		}

		navigate({ to: '/portal' })
	}

	async function handleForgotPassword(e: React.MouseEvent) {
		e.preventDefault()
		if (!email) {
			setError('Enter your email above, then click forgot password.')
			return
		}

		setLoading(true)
		setError('')

		const { error: resetError } = await getSupabase().auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/portal/sign-in`,
		})

		if (resetError) {
			setError(resetError.message)
		} else {
			setResetSent(true)
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

				{/* Heading */}
				<div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
					<h1 className="section-title text-3xl sm:text-4xl mb-2">
						Sign in to your{' '}
						<span className="text-secondary">portal</span>
					</h1>
					<p className="text-sm text-secondary">
						Access your research dossiers and engagement history.
					</p>
				</div>

				{/* Error message */}
				{error && (
					<div className="mb-4 p-3 border border-signal/30 bg-signal-bg text-signal text-xs font-mono text-center">
						{error}
					</div>
				)}

				{/* Reset sent message */}
				{resetSent && (
					<div className="mb-4 p-3 border border-emerald/30 bg-emerald/5 text-emerald text-xs font-mono text-center">
						Password reset link sent to {email}
					</div>
				)}

				{/* Sign In Card */}
				<div
					className="bp-card p-8 animate-fade-up"
					style={{ animationDelay: '0.2s' }}
				>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div>
							<label htmlFor="email" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
								Email
							</label>
							<input
								id="email"
								type="email"
								required
								placeholder="you@company.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors"
							/>
						</div>
						<div>
							<label htmlFor="password" className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-2">
								Password
							</label>
							<input
								id="password"
								type="password"
								required
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm placeholder:text-dim focus:outline-none focus:border-signal/50 transition-colors"
							/>
						</div>
						<div className="flex justify-end">
							<button
								type="button"
								onClick={handleForgotPassword}
								className="text-xs text-dim hover:text-secondary transition-colors"
							>
								Forgot password?
							</button>
						</div>
						<button type="submit" disabled={loading} className="btn-signal w-full px-7 py-3 text-sm disabled:opacity-50">
							{loading ? 'Signing in...' : 'Sign In'}
						</button>
					</form>
				</div>

				{/* Below card */}
				<p
					className="text-center text-sm text-secondary mt-8 animate-fade-up"
					style={{ animationDelay: '0.3s' }}
				>
					Don't have an account?{' '}
					<Link to="/portal/onboarding" className="text-ink hover:text-signal transition-colors">
						Get started
					</Link>
				</p>
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
