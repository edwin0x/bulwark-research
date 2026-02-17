export interface Agent {
  name: string
  desc: string
  icon: string
  hex: string
}

export const agents: Agent[] = [
  { name: 'Market Sizing', desc: 'TAM, SAM, SOM with bottom-up and top-down modeling across 200+ industry databases', icon: '◎', hex: '#e5484d' },
  { name: 'Competitor Intel', desc: 'Internet-scale crawling of competitors — funding, hiring, product launches, positioning maps, moat analysis', icon: '◈', hex: '#ffb224' },
  { name: 'Business Model', desc: 'Revenue model stress-testing, unit economics simulation, pricing elasticity analysis', icon: '◇', hex: '#46a758' },
  { name: 'Technical Feasibility', desc: 'Architecture complexity scoring, build-vs-buy analysis, infrastructure cost modeling', icon: '⬡', hex: '#00a2c7' },
  { name: 'Risk Assessment', desc: 'Multi-dimensional risk matrix — market, execution, regulatory, financial, competitive', icon: '△', hex: '#e5484d' },
  { name: 'GTM Strategy', desc: 'Channel analysis, CAC modeling, launch sequence planning, growth lever identification', icon: '▷', hex: '#ffb224' },
  { name: 'Financial Projections', desc: '3-year P&L modeling, runway scenarios, funding requirement analysis, sensitivity tables', icon: '▢', hex: '#46a758' },
  { name: 'Executive Summary', desc: 'Cross-agent synthesis with weighted confidence scoring and go/no-go recommendation', icon: '◉', hex: '#00a2c7' },
]

export interface SwarmAgent {
  name: string
  hex: string
  pct: number
}

export const swarmAgents: SwarmAgent[] = [
  { name: 'Market Sizing', hex: '#e5484d', pct: 92 },
  { name: 'Competitor Intel', hex: '#ffb224', pct: 87 },
  { name: 'Business Model', hex: '#46a758', pct: 78 },
  { name: 'Technical Feasibility', hex: '#00a2c7', pct: 71 },
  { name: 'Risk Assessment', hex: '#e5484d', pct: 65 },
  { name: 'GTM Strategy', hex: '#ffb224', pct: 58 },
  { name: 'Financial Projections', hex: '#46a758', pct: 44 },
  { name: 'Synthesis Engine', hex: '#00a2c7', pct: 31 },
]
