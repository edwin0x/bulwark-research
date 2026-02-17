import type { ReactNode } from 'react'

interface DimensionAnnotationProps {
	children: ReactNode
	width?: string
	height?: string
	className?: string
}

/**
 * Wraps an element with dimension annotation labels that appear on hover.
 * Shows width (↔) below and height (↕) to the right, with signal-colored accent lines.
 * Hidden on touch devices via CSS media query.
 */
export function DimensionAnnotation({ children, width, height, className = '' }: DimensionAnnotationProps) {
	return (
		<div
			className={`dim-annotate ${className}`}
			data-dim-w={width ? `↔ ${width}` : undefined}
			data-dim-h={height ? `↕ ${height}` : undefined}
		>
			<div className="dim-annotate-line" aria-hidden="true" />
			{children}
		</div>
	)
}
