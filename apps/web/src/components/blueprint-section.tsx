import { useEffect, useRef, type ReactNode } from 'react'

interface BlueprintSectionProps {
	number: string
	title: string
	children: ReactNode
	className?: string
	dark?: boolean
	id?: string
}

export function BlueprintSection({ number, title, children, className = '', dark = false, id }: BlueprintSectionProps) {
	const numRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const el = numRef.current
		if (!el) return

		function handleScroll() {
			if (!el) return
			const rect = el.getBoundingClientRect()
			// Only apply parallax when section is in view
			if (rect.top < window.innerHeight && rect.bottom > 0) {
				// 0.9x scroll speed creates subtle lag (10% slower than content)
				const offset = window.scrollY * 0.1
				el.style.transform = `translateY(${offset * 0.05}px)`
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<section
			id={id}
			className={`bp-section ${dark ? 'section-dark' : ''} ${className}`}
		>
			<div className="mx-auto max-w-6xl px-6">
				<div className="bp-section-header reveal">
					<span ref={numRef} className="bp-section-num" style={{ willChange: 'transform' }}>
						{number}
					</span>
					<h2 className="bp-section-title">{title}</h2>
					<div className="bp-section-rule" />
				</div>
				{children}
			</div>
		</section>
	)
}
