import { Link } from '@tanstack/react-router'
import { BulwarkIcon } from './bulwark-icon'

export function Footer() {
	return (
		<footer className="border-t border-ink-border py-16 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
					{/* Brand */}
					<div className="col-span-2 md:col-span-1">
						<div className="flex items-center gap-2.5">
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
						</div>
						<p className="mt-3 text-sm text-dim leading-relaxed max-w-xs">
							AI-powered research & intelligence services for founders making high-stakes decisions.
						</p>
					</div>

					{/* Services */}
					<div>
						<h4 className="font-mono text-[10px] uppercase tracking-widest text-dim mb-4">
							Services
						</h4>
						<ul className="space-y-2.5 text-sm text-muted">
							<li>
								<Link to="/sample-report" className="hover:text-paper transition-colors">
									Sample Dossier
								</Link>
							</li>
							<li>
								<Link to="/pricing" className="hover:text-paper transition-colors">
									Engagements & Pricing
								</Link>
							</li>
							<li>
								<a href="/#hero-input" className="hover:text-paper transition-colors">
									Commission Research
								</a>
							</li>
						</ul>
					</div>

					{/* Firm */}
					<div>
						<h4 className="font-mono text-[10px] uppercase tracking-widest text-dim mb-4">
							Firm
						</h4>
						<ul className="space-y-2.5 text-sm text-muted">
							<li>
								<Link to="/about" className="hover:text-paper transition-colors">
									About
								</Link>
							</li>
							<li>
								<Link to="/contact" className="hover:text-paper transition-colors">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h4 className="font-mono text-[10px] uppercase tracking-widest text-dim mb-4">Legal</h4>
						<ul className="space-y-2.5 text-sm text-muted">
							<li>
								<Link to="/privacy" className="hover:text-paper transition-colors">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link to="/terms" className="hover:text-paper transition-colors">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link to="/confidentiality" className="hover:text-paper transition-colors">
									Confidentiality
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="h-px bg-ink-border mb-8" />

				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<span className="text-xs text-dim">
						&copy; 2026 Bulwark Research. All rights reserved.
					</span>
					<div className="flex items-center gap-6">
						<a href="#" className="text-dim hover:text-paper transition-colors">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
							</svg>
						</a>
						<a href="#" className="text-dim hover:text-paper transition-colors">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
							</svg>
						</a>
						<a href="#" className="text-dim hover:text-paper transition-colors">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
