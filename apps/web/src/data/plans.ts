export interface Plan {
	name: string
	price: string
	period: string
	desc: string
	features: string[]
	cta: string
	featured: boolean
	/** Show strikethrough price with "Free" label */
	freeForNow?: boolean
	/** Original price shown as strikethrough (limited time discount) */
	originalPrice?: string
	/** Badge text like "5 slots left" */
	badge?: string
	/** Show "Launch only" label under price */
	launchOnly?: boolean
	/** Link for the CTA button (internal route) */
	ctaLink?: string
}

export const plans: Plan[] = [
	{
		name: 'Recon',
		price: '99',
		period: 'one-time',
		desc: 'One full research dossier — free while we launch',
		features: [
			'1 full research engagement',
			'Market size analysis',
			'Top 5 competitor landscape',
			'Risk assessment score',
			'Downloadable PDF dossier',
		],
		cta: 'Hire Us — Free',
		ctaLink: '/portal/onboarding',
		featured: false,
		freeForNow: true,
	},
	{
		name: 'Deployment',
		price: '499',
		originalPrice: '999',
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
			'Dedicated research desk',
		],
		cta: 'Take Command',
		featured: false,
		badge: 'Few slots left',
		launchOnly: true,
	},
]
