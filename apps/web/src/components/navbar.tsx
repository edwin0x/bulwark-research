import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { BulwarkIcon } from './bulwark-icon'

interface NavbarProps {
	activePage?: 'home' | 'pricing' | 'sample-report' | 'about'
}

export function Navbar({ activePage = 'home' }: NavbarProps) {
	const [menuOpen, setMenuOpen] = useState(false)
	const isHome = activePage === 'home'
	const hashPrefix = isHome ? '' : '/'

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
			<div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2.5 group shrink-0">
					<BulwarkIcon className="w-7 h-7" />
					<span
						className="text-[18px] tracking-[0.06em] uppercase leading-none whitespace-nowrap"
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
						to="/pricing"
						className={`${activePage === 'pricing' ? 'text-paper' : 'hover:text-paper'} transition-colors duration-200`}
					>
						Pricing
					</Link>
					<a href={`${hashPrefix}#faq`} className="hover:text-paper transition-colors duration-200">
						FAQ
					</a>
				</div>

				{/* Right side */}
				<div className="flex items-center gap-4">
					<Link
						to="/portal/sign-in"
						className="hidden md:inline-block text-sm text-muted hover:text-paper transition-colors"
					>
						Client Portal
					</Link>
					<a href={`${hashPrefix}#hero-input`} className="hidden md:inline-flex btn-glow px-5 py-2 text-sm">
						Hire Us — Free
					</a>

					{/* Hamburger (mobile) */}
					<button
						type="button"
						onClick={() => setMenuOpen(!menuOpen)}
						className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
						aria-label="Toggle menu"
					>
						<span
							className={`block w-5 h-px bg-paper transition-all duration-300 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
						/>
						<span
							className={`block w-5 h-px bg-paper transition-all duration-300 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
						/>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-80' : 'max-h-0'}`}
			>
				<div className="px-6 pb-6 pt-2 border-t border-white/5 flex flex-col gap-4 text-sm">
					<Link
						to="/about"
						onClick={() => setMenuOpen(false)}
						className={`${activePage === 'about' ? 'text-paper' : 'text-muted hover:text-paper'} transition-colors py-1`}
					>
						About
					</Link>
					<Link
						to="/pricing"
						onClick={() => setMenuOpen(false)}
						className={`${activePage === 'pricing' ? 'text-paper' : 'text-muted hover:text-paper'} transition-colors py-1`}
					>
						Pricing
					</Link>
					<a
						href={`${hashPrefix}#faq`}
						onClick={() => setMenuOpen(false)}
						className="text-muted hover:text-paper transition-colors py-1"
					>
						FAQ
					</a>
					<Link
						to="/portal/sign-in"
						onClick={() => setMenuOpen(false)}
						className="text-muted hover:text-paper transition-colors py-1"
					>
						Client Portal
					</Link>
					<div className="pt-2">
						<a
							href={`${hashPrefix}#hero-input`}
							onClick={() => setMenuOpen(false)}
							className="btn-glow inline-flex px-5 py-2.5 text-sm"
						>
							Hire Us — Free
						</a>
					</div>
				</div>
			</div>
		</nav>
	)
}
