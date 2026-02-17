export interface Step {
	num: string
	title: string
	desc: string
	mono: string
}

export const steps: Step[] = [
	{
		num: '01',
		title: 'Describe what you want to build',
		desc: 'Tell us the idea in plain language — the problem, the customer, the vision. No pitch deck required. Our system decomposes it into researchable dimensions.',
		mono: 'INPUT',
	},
	{
		num: '02',
		title: 'An agent swarm runs internet-scale research',
		desc: 'Dozens of specialized agents fan out across the internet — crawling databases, analyzing competitors, modeling financials, stress-testing assumptions — all in parallel.',
		mono: 'SWARM',
	},
	{
		num: '03',
		title: 'Get your report in 30 minutes',
		desc: "A synthesis engine cross-references every agent's findings, resolves conflicts, and scores confidence. Your report is delivered straight to your inbox — and available to download from the website anytime.",
		mono: 'DELIVER',
	},
]
