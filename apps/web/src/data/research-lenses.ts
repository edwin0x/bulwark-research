export interface ResearchLens {
	value: string
	label: string
	description: string
}

export const RESEARCH_LENSES: ResearchLens[] = [
	{
		value: 'bootstrapper',
		label: 'Bootstrapper',
		description: 'Self-funded, profitable from day one',
	},
	{
		value: 'vc_scale',
		label: 'VC-Scale',
		description: 'Venture-backed, blitzscaling',
	},
	{
		value: 'lifestyle',
		label: 'Lifestyle Business',
		description: 'Sustainable $10k/month target',
	},
	{
		value: 'side_project',
		label: 'Side Project',
		description: 'Validate before quitting your day job',
	},
	{
		value: 'agency_productized',
		label: 'Agency / Productized Service',
		description: 'Service-to-product transition',
	},
	{
		value: 'open_source',
		label: 'Open Source + Monetization',
		description: 'Open core, sponsorware, dual licensing',
	},
]

export function getLensLabel(value: string): string {
	return RESEARCH_LENSES.find((l) => l.value === value)?.label ?? value
}
