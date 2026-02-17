export interface ReportMeta {
	idea: string
	date: string
	pageCount: number
	sourceCount: number
	agentCount: number
	viabilityScore: number
	viabilityLabel: 'Strong' | 'Moderate' | 'Weak'
}

export interface ReportHighlight {
	label: string
	value: string
}

export interface ReportSection {
	id: string
	agentName: string
	icon: string
	hex: string
	title: string
	previewParagraph: string
	blurredLineCount: number
	highlights?: ReportHighlight[]
}

export const reportMeta: ReportMeta = {
	idea: 'AI-Powered Pet Insurance',
	date: 'Feb 17, 2026',
	pageCount: 32,
	sourceCount: 1247,
	agentCount: 47,
	viabilityScore: 78,
	viabilityLabel: 'Strong',
}

export const reportSections: ReportSection[] = [
	{
		id: 'market-sizing',
		agentName: 'Market Sizing',
		icon: '◎',
		hex: '#e5484d',
		title: 'Market Sizing',
		highlights: [
			{ label: 'TAM', value: '$4.2B' },
			{ label: 'SAM', value: '$890M' },
			{ label: 'SOM', value: '$67M' },
		],
		previewParagraph:
			'The US pet insurance market reached $3.9B in 2025 and is projected to hit $4.2B by year-end 2026, growing at a 23.4% CAGR. Penetration remains at just 4.8% of pet-owning households — compared to 25%+ in the UK and Sweden — signaling significant runway. Bottom-up modeling across 14 distribution channels identifies an addressable segment of $890M among digitally native pet owners aged 25–44 who currently lack coverage. First-year serviceable obtainable market is estimated at $67M, achievable through direct-to-consumer acquisition and strategic partnerships with three major veterinary clinic networks.',
		blurredLineCount: 12,
	},
	{
		id: 'competitor-intel',
		agentName: 'Competitor Intel',
		icon: '◈',
		hex: '#ffb224',
		title: 'Competitor Intelligence',
		highlights: [
			{ label: 'Direct Competitors', value: '7' },
			{ label: 'Funding Raised', value: '$2.1B' },
			{ label: 'Avg. NPS', value: '34' },
		],
		previewParagraph:
			'Seven direct competitors were identified, led by Trupanion ($892M revenue, 1.6M enrolled pets), Lemonade Pet ($124M GWP, 37% YoY growth), and Healthy Paws (privately held, est. $340M GWP). Competitive moat analysis reveals a critical gap: no incumbent uses real-time claims adjudication powered by veterinary AI. Trupanion\'s proprietary Vet Direct Pay processes claims in <5 minutes but relies on rules-based logic, not predictive models. Customer sentiment analysis across 47,000 reviews surfaces consistent complaints about opaque pricing (mentioned in 31% of negative reviews) and slow reimbursement (28%). This creates a clear positioning opportunity.',
		blurredLineCount: 14,
	},
	{
		id: 'business-model',
		agentName: 'Business Model',
		icon: '◇',
		hex: '#46a758',
		title: 'Business Model Viability',
		highlights: [
			{ label: 'Loss Ratio Target', value: '68%' },
			{ label: 'LTV:CAC', value: '4.2x' },
			{ label: 'Break-even', value: 'Month 18' },
		],
		previewParagraph:
			'Unit economics modeling across three revenue scenarios indicates strong viability at a $42/month average premium — positioning between Lemonade\'s $35 entry point and Trupanion\'s $61 average. The AI-native claims model reduces loss adjustment expenses by an estimated 34% versus traditional insurers, targeting a 68% combined loss ratio (vs. industry average of 78%). Projected LTV:CAC ratio of 4.2x assumes $186 blended CAC through a mix of SEO content ($62 CAC), social proof loops ($124 CAC), and veterinary partnerships ($215 CAC). Sensitivity analysis shows the model remains profitable even with a 15% adverse deviation in claims frequency.',
		blurredLineCount: 11,
	},
	{
		id: 'technical-feasibility',
		agentName: 'Technical Feasibility',
		icon: '⬡',
		hex: '#00a2c7',
		title: 'Technical Feasibility',
		highlights: [
			{ label: 'Complexity Score', value: '7.2/10' },
			{ label: 'Build Timeline', value: '14 weeks' },
			{ label: 'Infra Cost (Mo.)', value: '$8.4K' },
		],
		previewParagraph:
			'Architecture analysis identifies two critical technical challenges: (1) real-time claims adjudication requiring sub-200ms inference on veterinary procedure codes, achievable with a fine-tuned classification model served via ONNX Runtime, and (2) integration with existing Practice Management Systems (PMS) — primarily Cornerstone and AVImark — which expose SOAP-based APIs requiring adapter middleware. Build-vs-buy analysis recommends building the AI claims engine in-house (core IP) while leveraging Stripe for payments, Sure API for policy administration, and Datadog for observability. Estimated 14-week build to MVP with a team of 3 engineers.',
		blurredLineCount: 13,
	},
	{
		id: 'risk-assessment',
		agentName: 'Risk Assessment',
		icon: '△',
		hex: '#e5484d',
		title: 'Risk Assessment',
		highlights: [
			{ label: 'Market Risk', value: 'Low' },
			{ label: 'Execution Risk', value: 'Medium' },
			{ label: 'Regulatory Risk', value: 'High' },
		],
		previewParagraph:
			'Multi-dimensional risk analysis identifies regulatory compliance as the highest-severity risk vector. Pet insurance is regulated at the state level in the US, with 23 states requiring specific pet insurance disclosures per NAIC Model Act #633. AI-based underwriting introduces additional scrutiny under emerging algorithmic fairness frameworks — Colorado\'s SB 21-169 mandates bias testing for insurance AI models by 2026. Mitigation strategy: partner with a licensed MGA (Managing General Agent) for the first 18 months to operate under their license while building direct licensing across priority states (CA, TX, FL, NY account for 52% of the addressable market).',
		blurredLineCount: 15,
	},
	{
		id: 'gtm-strategy',
		agentName: 'GTM Strategy',
		icon: '▷',
		hex: '#ffb224',
		title: 'Go-to-Market Strategy',
		highlights: [
			{ label: 'Launch Channels', value: '4' },
			{ label: 'Target CAC', value: '$186' },
			{ label: 'Mo. 12 Target', value: '8.2K policies' },
		],
		previewParagraph:
			'Recommended launch strategy centers on a "transparent AI" positioning — the first pet insurer that shows you exactly how your premium is calculated and why claims are approved or denied. Phase 1 (months 1–3) targets the "vet visit moment" through partnerships with Banfield Pet Hospital (1,000+ locations) and VCA Animal Hospitals, embedding instant quote generation into post-visit checkout flows. Analysis of 12 comparable D2C insurance launches shows vet-channel partnerships convert at 3.2x the rate of paid social. Phase 2 layers in SEO content targeting 847 high-intent keywords (e.g., "pet insurance worth it reddit") with estimated 124K monthly search volume.',
		blurredLineCount: 12,
	},
	{
		id: 'financial-projections',
		agentName: 'Financial Projections',
		icon: '▢',
		hex: '#46a758',
		title: 'Financial Projections',
		highlights: [
			{ label: 'Year 1 Revenue', value: '$3.8M' },
			{ label: 'Year 3 Revenue', value: '$31.2M' },
			{ label: 'Seed Round', value: '$4.5M' },
		],
		previewParagraph:
			'Three-year financial modeling projects $3.8M ARR by month 12, scaling to $31.2M by year 3 under the base case (65th percentile Monte Carlo outcome). The model assumes 8,200 active policies at month 12, growing to 58,400 by month 36, with a blended monthly churn rate declining from 3.2% to 1.8% as the book of business matures. Initial seed funding requirement of $4.5M provides 22 months of runway at projected burn, with Series A milestone triggers at 15K active policies and 72% gross retention. Downside scenario (25th percentile) still reaches cash-flow positive by month 28 with $2.1M additional bridge financing.',
		blurredLineCount: 14,
	},
	{
		id: 'executive-summary',
		agentName: 'Executive Summary',
		icon: '◉',
		hex: '#00a2c7',
		title: 'Executive Summary',
		previewParagraph:
			'Cross-agent synthesis yields a weighted viability score of 78/100 — a "Strong" recommendation with caveats. The opportunity is underpinned by a large, underpenetrated market ($4.2B TAM, 4.8% penetration) and a defensible technical moat in AI-native claims adjudication. Primary risk factors are regulatory complexity (state-by-state licensing) and the capital intensity of insurance businesses. The recommended path forward: raise a $4.5M seed round, partner with a licensed MGA to bypass initial regulatory hurdles, launch in California and Texas (combined 28% of SAM), and invest heavily in the AI claims engine as the core differentiator. Go/no-go recommendation: GO, conditional on securing MGA partnership within 90 days.',
		blurredLineCount: 10,
	},
]
