export interface Plan {
	name: string
	price: string
	period: string
	desc: string
	features: string[]
	cta: string
	featured: boolean
}

export const plans: Plan[] = [
	{
		name: 'Recon',
		price: '0',
		period: 'no commitment',
		desc: 'One complimentary research dossier — on the house',
		features: [
			'1 full research engagement',
			'Market size analysis',
			'Top 5 competitor landscape',
			'Risk assessment score',
			'Downloadable PDF dossier',
		],
		cta: 'Hire Us — Free',
		featured: false,
	},
	{
		name: 'Deployment',
		price: '499',
		period: '/year',
		desc: '10 deep research engagements per month — annual retainer',
		features: [
			'10 deep research engagements/mo',
			'Full agent swarm analysis',
			'Monte Carlo financial modeling',
			'GTM strategy playbook',
			'Investor-grade deliverables',
			'Annual retainer agreement',
		],
		cta: 'Deploy the Swarm',
		featured: true,
	},
	{
		name: 'Command',
		price: '999',
		period: 'one-time',
		desc: '10 engagements/month — permanent command access',
		features: [
			'10 engagements per month',
			'All Deployment deliverables',
			'Lifetime command access',
			'Priority turnaround',
			'White-label deliverables',
			'Dedicated research desk',
		],
		cta: 'Take Command',
		featured: false,
	},
]
