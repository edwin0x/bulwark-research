import { useEffect, useState } from 'react'

/**
 * Displays coordinate markers along the viewport edges that update with scroll position.
 * X-axis markers appear along the bottom, Y-axis markers along the left side.
 * Hidden on touch/mobile devices via CSS media query on .coord-marker class.
 *
 * Only renders after hydration (client-side) to avoid SSR window access.
 */
export function CoordinateMarkers() {
	const [mounted, setMounted] = useState(false)
	const [scrollY, setScrollY] = useState(0)
	const [viewportHeight, setViewportHeight] = useState(0)

	useEffect(() => {
		setMounted(true)
		setViewportHeight(window.innerHeight)

		function handleScroll() {
			setScrollY(Math.round(window.scrollY))
		}

		function handleResize() {
			setViewportHeight(window.innerHeight)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		window.addEventListener('resize', handleResize, { passive: true })
		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	if (!mounted) return null

	// Generate Y-axis markers based on scroll position
	const yStart = Math.floor(scrollY / 200) * 200
	const yMarkers = Array.from({ length: 6 }, (_, i) => yStart + i * 200)

	return (
		<>
			{/* X-axis markers (bottom edge) */}
			{[200, 400, 600, 800, 1000, 1200].map((x) => (
				<div
					key={`x-${x}`}
					className="coord-marker x-axis"
					style={{ left: `${x}px` }}
				>
					x:{x}
				</div>
			))}

			{/* Y-axis markers (left edge, scroll-aware) */}
			{yMarkers.map((y) => {
				const screenY = y - scrollY
				if (screenY < 0 || screenY > viewportHeight) return null
				return (
					<div
						key={`y-${y}`}
						className="coord-marker y-axis"
						style={{ top: `${screenY}px` }}
					>
						y:{y}
					</div>
				)
			})}
		</>
	)
}
