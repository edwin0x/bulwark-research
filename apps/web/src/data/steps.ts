export interface Step {
	num: string
	title: string
	desc: string
	mono: string
}

export const steps: Step[] = [
	{
		num: '01',
		title: 'Brief us on the idea',
		desc: 'Tell us the idea in plain language — the problem, the customer, the vision. No pitch deck required. We decompose it into researchable dimensions.',
		mono: 'BRIEF',
	},
	{
		num: '02',
		title: 'An agent swarm runs internet-scale research',
		desc: 'Dozens of specialized agents fan out across the internet — crawling databases, analyzing competitors, modeling financials, stress-testing assumptions — all in parallel.',
		mono: 'SWARM',
	},
	{
		num: '03',
		title: 'Get your dossier in 24 hours',
		desc: "A synthesis engine cross-references every agent's findings, resolves conflicts, and scores confidence. Your dossier is delivered to your inbox — and archived in your client portal.",
		mono: 'DELIVER',
	},
	{
		num: '04',
		title: 'Measure and iterate',
		desc: 'Every finding includes confidence scores and source citations. Compare multiple ideas side-by-side, stress-test assumptions, and iterate with follow-up engagements.',
		mono: 'MEASURE',
	},
]
