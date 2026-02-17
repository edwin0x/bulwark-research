/**
 * Interactive intelligence network artwork for the hero section.
 * Draggable research domain cards connected by live-updating organic curves.
 * Background animated with floating particles and subtle grid pulse.
 */
import { useCallback, useRef, useState } from 'react'

interface DomainCard {
	id: string
	category: string
	label: string
	content: string[]
	x: number    // % from left
	y: number    // % from top
	w: number    // px width
	large?: boolean
}

const initialDomains: DomainCard[] = [
	{
		id: 'market', category: 'RESEARCH', label: 'MARKET SIZING',
		content: ['$4.2B TAM', '$890M SAM', '$67M SOM'],
		x: 2, y: 52, w: 160, large: true,
	},
	{
		id: 'compete', category: 'INTELLIGENCE', label: 'COMPETITOR MAP',
		content: ['156 companies profiled', '23 direct competitors', '4 funding rounds tracked'],
		x: 22, y: 5, w: 200, large: true,
	},
	{
		id: 'risk', category: 'ANALYSIS', label: 'RISK MATRIX',
		content: ['Market: Low', 'Execution: Med', 'Regulatory: High'],
		x: 50, y: 32, w: 150,
	},
	{
		id: 'moat', category: 'STRATEGY', label: 'MOAT DEPTH',
		content: ['Defensibility idx: 7.4', 'Network effects: Strong', 'Switching cost: High'],
		x: 42, y: 62, w: 170,
	},
	{
		id: 'tech', category: 'AUDIT', label: 'TECH FEASIBILITY',
		content: ['Stack complexity: 6/10', 'Build estimate: 12 wks', 'Infra cost: $2.4K/mo'],
		x: 68, y: 8, w: 170,
	},
	{
		id: 'pricing', category: 'MODEL', label: 'PRICING INTEL',
		content: ['Willingness-to-pay: $29–49/mo', 'Elasticity: -1.2', 'Competitor avg: $35/mo'],
		x: 80, y: 45, w: 180, large: true,
	},
]

const edges: [string, string][] = [
	['market', 'compete'],
	['compete', 'risk'],
	['compete', 'tech'],
	['risk', 'moat'],
	['risk', 'pricing'],
	['tech', 'pricing'],
	['moat', 'pricing'],
]

/* Floating background particles */
const particles = Array.from({ length: 18 }, (_, i) => ({
	x: 5 + (i * 37) % 90,
	y: 5 + (i * 53) % 85,
	size: 2 + (i % 3),
	delay: i * 0.4,
	duration: 6 + (i % 4) * 2,
}))

export function SystemDiagram() {
	const canvasRef = useRef<HTMLDivElement>(null)
	const [domains, setDomains] = useState(initialDomains)
	const [dragging, setDragging] = useState<string | null>(null)
	const dragOffset = useRef({ x: 0, y: 0 })

	const handlePointerDown = useCallback((e: React.PointerEvent, id: string) => {
		e.preventDefault()
		const card = (e.target as HTMLElement).closest('.diagram-card') as HTMLElement
		if (!card || !canvasRef.current) return

		const canvas = canvasRef.current.getBoundingClientRect()
		const rect = card.getBoundingClientRect()

		dragOffset.current = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		}

		setDragging(id)
		card.setPointerCapture(e.pointerId)
	}, [])

	const handlePointerMove = useCallback((e: React.PointerEvent) => {
		if (!dragging || !canvasRef.current) return

		const canvas = canvasRef.current.getBoundingClientRect()
		const newX = ((e.clientX - canvas.left - dragOffset.current.x) / canvas.width) * 100
		const newY = ((e.clientY - canvas.top - dragOffset.current.y) / canvas.height) * 100

		setDomains(prev =>
			prev.map(d =>
				d.id === dragging
					? { ...d, x: Math.max(0, Math.min(85, newX)), y: Math.max(0, Math.min(80, newY)) }
					: d
			)
		)
	}, [dragging])

	const handlePointerUp = useCallback(() => {
		setDragging(null)
	}, [])

	return (
		<div
			ref={canvasRef}
			className="diagram-canvas"
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerLeave={handlePointerUp}
		>
			{/* Animated background particles */}
			<div className="diagram-particles" aria-hidden="true">
				{particles.map((p, i) => (
					<span
						key={i}
						className="diagram-particle"
						style={{
							left: `${p.x}%`,
							top: `${p.y}%`,
							width: p.size,
							height: p.size,
							animationDelay: `${p.delay}s`,
							animationDuration: `${p.duration}s`,
						}}
					/>
				))}
			</div>

			{/* Animated grid lines */}
			<div className="diagram-grid-pulse" aria-hidden="true" />

			{/* SVG connection layer */}
			<svg className="diagram-svg" viewBox="0 0 1000 420" preserveAspectRatio="none">
				{edges.map(([aId, bId]) => {
					const a = domains.find(d => d.id === aId)!
					const b = domains.find(d => d.id === bId)!
					const ax = a.x * 10 + (a.w / 2) * (1000 / 1000)
					const ay = a.y * 4.2 + 20
					const bx = b.x * 10 + (b.w / 2) * (1000 / 1000)
					const by = b.y * 4.2 + 20
					const mx = (ax + bx) / 2
					const my = Math.min(ay, by) - 30 + Math.abs(ay - by) * 0.3
					return (
						<g key={`${aId}-${bId}`}>
							<path
								d={`M ${ax} ${ay} Q ${mx} ${my}, ${bx} ${by}`}
								className="diagram-wire"
							/>
							<circle cx={ax} cy={ay} r={3.5} className="diagram-dot" />
							<circle cx={bx} cy={by} r={3.5} className="diagram-dot" />
						</g>
					)
				})}
			</svg>

			{/* Domain cards */}
			{domains.map((d, i) => (
				<div
					key={d.id}
					className={`diagram-card ${d.large ? 'diagram-card-lg' : ''} ${dragging === d.id ? 'diagram-card-dragging' : ''}`}
					style={{
						left: `${d.x}%`,
						top: `${d.y}%`,
						width: d.w,
						animationDelay: dragging === d.id ? '0s, 0s' : `${0.8 + i * 0.12}s, ${i * 0.8}s`,
						animationDuration: dragging === d.id ? '0s, 0s' : `0.5s, ${5 + i * 0.7}s`,
					}}
					onPointerDown={(e) => handlePointerDown(e, d.id)}
				>
					<div className="diagram-card-overline">
						<span className="diagram-card-cat">{d.category}</span>
						<span className="diagram-card-tool">{d.label}</span>
					</div>
					<div className="diagram-card-body">
						{d.content.map((line) => (
							<div key={line} className="diagram-card-line">{line}</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
