import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { BulwarkIcon } from '~/components/bulwark-icon'

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

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
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

				{/* Heading */}
				<div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
					<h1 className="section-title text-3xl sm:text-4xl mb-2">
						Sign in to your{' '}
						<span className="italic font-accent text-gradient-warm">portal</span>
					</h1>
					<p className="text-sm text-muted">
						Access your research dossiers and engagement history.
					</p>
				</div>

				{/* Sign In Card */}
				<div
					className="card-glass p-8 rounded-2xl animate-fade-up"
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
								className="w-full px-4 py-3 rounded-full bg-ink-light border border-ink-border text-paper text-sm placeholder:text-dim focus:outline-none focus:border-vermillion/50 transition-colors"
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
								className="w-full px-4 py-3 rounded-full bg-ink-light border border-ink-border text-paper text-sm placeholder:text-dim focus:outline-none focus:border-vermillion/50 transition-colors"
							/>
						</div>
						<div className="flex justify-end">
							<a href="#" className="text-xs text-dim hover:text-muted transition-colors">
								Forgot password?
							</a>
						</div>
						<button type="submit" className="btn-glow w-full px-7 py-3 text-sm">
							Sign In
						</button>
					</form>
				</div>

				{/* Below card */}
				<p
					className="text-center text-sm text-muted mt-8 animate-fade-up"
					style={{ animationDelay: '0.3s' }}
				>
					Don't have an account?{' '}
					<Link to="/portal/onboarding" className="text-paper hover:text-vermillion transition-colors">
						Get started
					</Link>
				</p>
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
