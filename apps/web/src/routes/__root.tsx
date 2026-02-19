import { Link, HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { CoordinateMarkers } from '~/components/coordinate-markers'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { PostHogProvider } from '~/components/posthog-provider'
import appCss from '~/styles/global.css?url'

export const Route = createRootRoute({
	notFoundComponent: NotFoundPage,
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'theme-color', content: '#fdfdfd' },
			{
				name: 'description',
				content:
					'Everyone can build. Few know what to build. Retain an AI-native consulting firm for Big 4-quality due diligence — market research, competitor analysis, and financial projections delivered in 24 hours. First engagement complimentary.',
			},
			{ property: 'og:type', content: 'website' },
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
			{ rel: 'icon', href: '/favicon.ico' },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: 'anonymous',
			},
			/* Instrument Sans (headlines + logo) + IBM Plex Mono (labels + logo secondary) from Google Fonts */
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&display=swap',
			},
			/* Satoshi (body) from Fontshare */
			{
				rel: 'stylesheet',
				href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap',
			},
		],
	}),
	component: RootComponent,
})

function NotFoundPage() {
	return (
		<>
			<Navbar />

			<section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
				{/* Ghost number */}
				<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] font-bold text-ghost/30 pointer-events-none select-none leading-none">
					404
				</span>

				<div className="relative z-10 max-w-xl mx-auto text-center">
					{/* Overline */}
					<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-6">
						// Route not found
					</span>

					{/* Headline */}
					<h1 className="section-title text-3xl sm:text-4xl md:text-5xl mb-4">
						DEAD END.
						<br />
						<span className="text-secondary">NO INTEL HERE.</span>
					</h1>

					{/* Subtext */}
					<p className="text-secondary max-w-md mx-auto mb-10">
						The page you're looking for doesn't exist or has been moved.
						Our agents are good — but even they can't find this one.
					</p>

					{/* Terminal-style status */}
					<div className="bp-card-filled p-4 max-w-sm mx-auto mb-10 text-left">
						<div className="font-mono text-[11px] space-y-1.5">
							<div className="text-dim">
								<span className="text-signal">✗</span> GET {typeof window !== 'undefined' ? window.location.pathname : '/unknown'} — <span className="text-signal">404</span>
							</div>
							<div className="text-dim opacity-60">
								<span className="text-secondary">→</span> Route not matched in application manifest
							</div>
							<div className="text-dim opacity-40">
								<span className="text-dim">⋯</span> Redirecting to known coordinates...
							</div>
						</div>
					</div>

					{/* CTAs */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
						<Link to="/" className="btn-signal px-8 py-3 text-sm">
							Return to Base →
						</Link>
						<Link to="/services" className="btn-outline px-8 py-3 text-sm">
							View Services
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</>
	)
}

function RootComponent() {
	return (
		<html lang="en" className="antialiased">
			<head>
				<HeadContent />
			</head>
			<body className="bg-white text-ink">
				{/* Persistent dot-grid background */}
				<div className="dot-grid" aria-hidden="true" />

				{/* Registration marks at viewport corners */}
				<div className="registration-marks" aria-hidden="true">
					<div className="reg-mark top-left">
						<div className="reg-mark-circle" />
					</div>
					<div className="reg-mark top-right">
						<div className="reg-mark-circle" />
					</div>
					<div className="reg-mark bottom-left">
						<div className="reg-mark-circle" />
					</div>
					<div className="reg-mark bottom-right">
						<div className="reg-mark-circle" />
					</div>
				</div>

				{/* Coordinate markers (hidden on touch devices via CSS) */}
				<CoordinateMarkers />

				{/* Page content */}
				<PostHogProvider>
					<div className="relative z-10">
						<Outlet />
					</div>
				</PostHogProvider>

				<Scripts />
			</body>
		</html>
	)
}
