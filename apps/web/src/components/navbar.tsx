import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { BulwarkIcon } from './bulwark-icon'

interface NavbarProps {
	activePage?: 'home' | 'pricing' | 'sample-report' | 'about' | 'services'
}

export function Navbar({ activePage = 'home' }: NavbarProps) {
	const [menuOpen, setMenuOpen] = useState(false)
	const isHome = activePage === 'home'
	const hashPrefix = isHome ? '' : '/'

	const navLinks = [
		{ to: '/about', label: 'About', page: 'about' as const },
		{ to: '/services', label: 'Services', page: 'services' as const },
		{ to: '/pricing', label: 'Pricing', page: 'pricing' as const },
	]

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
			<div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-14">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2.5 group shrink-0">
					<BulwarkIcon className="w-7 h-7" />
					<span
						className="text-[18px] tracking-[0.04em] uppercase leading-none whitespace-nowrap"
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

				{/* Nav Links (desktop) */}
				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={`font-mono text-xs tracking-wider uppercase bp-link ${activePage === link.page ? 'active text-ink' : 'text-dim'}`}
						>
							{link.label}
						</Link>
					))}
					<a href={`${hashPrefix}#faq`} className="font-mono text-[11px] text-dim tracking-wider uppercase bp-link">
						FAQ
					</a>
				</div>

				{/* Right side */}
				<div className="flex items-center gap-4">
					<Link
						to="/portal/sign-in"
						className="hidden md:inline-block font-mono text-[11px] text-dim tracking-wider uppercase bp-link"
					>
						Client Portal
					</Link>
					<a href={`${hashPrefix}#hero-input`} className="hidden md:inline-flex btn-signal px-5 py-2 text-xs">
						Hire Us
					</a>

					{/* Hamburger (mobile) */}
					<button
						type="button"
						onClick={() => setMenuOpen(!menuOpen)}
						className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
						aria-label="Toggle menu"
					>
						<span
							className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
						/>
						<span
							className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
						/>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-80' : 'max-h-0'}`}
			>
				<div className="px-6 pb-6 pt-2 border-t border-border flex flex-col gap-4 text-sm">
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							onClick={() => setMenuOpen(false)}
							className={`${activePage === link.page ? 'text-ink' : 'text-secondary'} py-1`}
						>
							{link.label}
						</Link>
					))}
					<a
						href={`${hashPrefix}#faq`}
						onClick={() => setMenuOpen(false)}
						className="text-secondary py-1"
					>
						FAQ
					</a>
					<Link
						to="/portal/sign-in"
						onClick={() => setMenuOpen(false)}
						className="text-secondary py-1"
					>
						Client Portal
					</Link>
					<div className="pt-2">
						<a
							href={`${hashPrefix}#hero-input`}
							onClick={() => setMenuOpen(false)}
							className="btn-signal inline-flex px-5 py-2.5 text-xs"
						>
							Hire Us
						</a>
					</div>
				</div>
			</div>
		</nav>
	)
}
