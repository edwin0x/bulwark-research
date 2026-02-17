import { Link } from '@tanstack/react-router'

interface NavbarProps {
	activePage?: 'home' | 'pricing' | 'sample-report' | 'about'
}

export function Navbar({ activePage = 'home' }: NavbarProps) {
	const isHome = activePage === 'home'
	const hashPrefix = isHome ? '' : '/'

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
			<div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2.5 group">
					{/* Shield + battlements mark */}
					<svg
						className="w-7 h-7"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M6 8V6H9V4h2v2h3V3.5L16 1.5l2 2V6h3V4h2v2h3v2c0 9-4 16-10 21C10 24 6 17 6 8zm3 1.5c0 7.5 3 13 7 16.5 4-3.5 7-9 7-16.5z"
							fill="currentColor"
						/>
						<path d="M16 9.5h7c0 7.5-3 13-7 16.5z" fill="var(--color-vermillion)" />
					</svg>
					{/* Name */}
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

				{/* Nav Links (desktop) */}
				<div className="hidden md:flex items-center gap-8 text-sm text-muted">
					<Link
						to="/about"
						className={`${activePage === 'about' ? 'text-paper' : 'hover:text-paper'} transition-colors duration-200`}
					>
						About
					</Link>
					<Link
						to="/sample-report"
						className={`${activePage === 'sample-report' ? 'text-paper' : 'hover:text-paper'} transition-colors duration-200`}
					>
						Sample Report
					</Link>
					<Link
						to="/pricing"
						className={`${activePage === 'pricing' ? 'text-paper' : 'hover:text-paper'} transition-colors duration-200`}
					>
						Pricing
					</Link>
					<a href={`${hashPrefix}#faq`} className="hover:text-paper transition-colors duration-200">
						FAQ
					</a>
				</div>

				{/* CTA */}
				<div className="flex items-center gap-4">
					<Link
						to="/pricing"
						className="hidden sm:inline-block text-sm text-muted hover:text-paper transition-colors"
					>
						Sign in
					</Link>
					<a href={`${hashPrefix}#hero-input`} className="btn-glow px-5 py-2 text-sm">
						Hire Us — Free
					</a>
				</div>
			</div>
		</nav>
	)
}
