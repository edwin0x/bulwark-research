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
    name: 'Free',
    price: '0',
    period: 'forever',
    desc: '10 validations every month, on us',
    features: ['10 validations/month', 'Market size analysis', 'Top 5 competitors', 'Basic risk score', 'PDF export'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '299',
    period: 'one-time',
    desc: '10 deep research credits — use anytime',
    features: ['10 deep research credits', 'Full agent swarm analysis', 'Monte Carlo financials', 'GTM playbook', 'Investor-ready reports', 'Credits never expire'],
    cta: 'Buy Credits',
    featured: true,
  },
  {
    name: 'Lifetime',
    price: '599',
    period: 'one-time',
    desc: '10 deep researches/month — forever',
    features: ['10 deep researches/month', 'Everything in Pro', 'Lifetime access', 'Priority processing', 'White-label reports', 'Dedicated support'],
    cta: 'Go Lifetime',
    featured: false,
  },
]
