import type { ReactNode } from 'react'

interface CropMarksProps {
	children: ReactNode
	className?: string
}

/**
 * Adds 8px L-shaped crop marks at all four corners of the wrapped element.
 * Uses CSS pseudo-elements for outer corners (::before/::after on .crop-marks)
 * and an inner span for the remaining two corners.
 */
export function CropMarks({ children, className = '' }: CropMarksProps) {
	return (
		<div className={`crop-marks ${className}`}>
			<span className="crop-marks-inner" aria-hidden="true" />
			{children}
		</div>
	)
}
