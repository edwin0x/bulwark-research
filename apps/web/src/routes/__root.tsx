import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { CoordinateMarkers } from '~/components/coordinate-markers'
import appCss from '~/styles/global.css?url'

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'theme-color', content: '#fdfdfd' },
			{
				name: 'description',
				content:
					'Everyone can build. Few know what to build. Retain an AI-native consulting firm for Big 4-quality due diligence — market research, competitor analysis, and financial projections delivered within 24 hours. First engagement complimentary.',
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
				<div className="relative z-10">
					<Outlet />
				</div>

				<Scripts />
			</body>
		</html>
	)
}
