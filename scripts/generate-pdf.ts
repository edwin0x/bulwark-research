import { chromium } from "playwright";
import { join } from "node:path";

/* ── Brand Tokens ─────────────────────────────── */
const C = {
  ink: "#09090b", inkLight: "#141416", inkMid: "#1c1c1f", inkBorder: "#2a2a2e",
  paper: "#fafaf9", ivory: "#e8e8e3", muted: "#a1a09a", dim: "#6f6d66",
  vermillion: "#e5484d", amber: "#ffb224", emerald: "#46a758", cyan: "#00a2c7",
};

/* ── CSS ──────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital@1&display=swap');
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Manrope', sans-serif; background: ${C.ink}; color: ${C.paper}; -webkit-print-color-adjust: exact; print-color-adjust: exact; font-size: 11px; line-height: 1.7; }
.page { width: 210mm; min-height: 297mm; padding: 18mm 20mm; position: relative; break-after: page; overflow: hidden; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16mm; padding-bottom: 3mm; border-bottom: 1px solid ${C.inkBorder}; }
.page-header .conf { font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: 0.15em; text-transform: uppercase; color: ${C.dim}; }
.page-header .pnum { font-family: 'JetBrains Mono', monospace; font-size: 7px; color: ${C.dim}; }
.page-footer { position: absolute; bottom: 10mm; left: 20mm; right: 20mm; display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 6.5px; color: ${C.dim}; letter-spacing: 0.1em; text-transform: uppercase; border-top: 1px solid ${C.inkBorder}; padding-top: 2mm; }
h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; }
.serif { font-family: 'Space Grotesk', sans-serif; }
.mono { font-family: 'JetBrains Mono', monospace; }
.accent { font-family: 'Playfair Display', serif; font-style: italic; background: linear-gradient(135deg, ${C.vermillion}, ${C.amber}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 14px 0; }
.metric-card { background: ${C.inkLight}; border: 1px solid ${C.inkBorder}; border-radius: 10px; padding: 14px 16px; }
.metric-card .val { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; }
.metric-card .lbl { font-family: 'JetBrains Mono', monospace; font-size: 7px; text-transform: uppercase; letter-spacing: 0.15em; color: ${C.dim}; margin-top: 2px; }
.data-table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 10px; }
.data-table th { font-family: 'JetBrains Mono', monospace; font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.12em; color: ${C.dim}; text-align: left; padding: 8px 10px; border-bottom: 1px solid ${C.inkBorder}; }
.data-table td { padding: 8px 10px; border-bottom: 1px solid ${C.inkBorder}22; color: ${C.ivory}; }
.data-table tr:nth-child(even) td { background: ${C.inkLight}; }
.callout { background: ${C.inkLight}; border-left: 3px solid ${C.vermillion}; border-radius: 0 10px 10px 0; padding: 14px 18px; margin: 16px 0; }
.callout .tag { font-family: 'JetBrains Mono', monospace; font-size: 7px; text-transform: uppercase; letter-spacing: 0.15em; color: ${C.vermillion}; margin-bottom: 4px; }
.bar-chart { margin: 14px 0; }
.bar-row { display: flex; align-items: center; margin-bottom: 6px; }
.bar-label { font-family: 'JetBrains Mono', monospace; font-size: 8px; color: ${C.muted}; width: 90px; flex-shrink: 0; }
.bar-track { flex: 1; height: 8px; background: ${C.inkBorder}33; border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; }
.bar-val { font-family: 'JetBrains Mono', monospace; font-size: 8px; color: ${C.ivory}; width: 50px; text-align: right; flex-shrink: 0; }
.section-icon { font-size: 28px; margin-bottom: 8px; }
.section-title { font-size: 28px; font-weight: 700; line-height: 1.15; margin-bottom: 6px; }
.section-sub { color: ${C.muted}; font-size: 12px; line-height: 1.6; margin-bottom: 14px; }
p { margin-bottom: 10px; color: ${C.ivory}; }
h4 { font-size: 13px; font-weight: 600; margin: 16px 0 8px; }
.divider { height: 1px; background: linear-gradient(90deg, transparent, ${C.inkBorder}, transparent); margin: 12px 0; }
.risk-badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-family: 'JetBrains Mono', monospace; font-size: 8px; font-weight: 500; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.cover-center { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 260mm; text-align: center; }
.score-ring { width: 100px; height: 100px; border-radius: 50%; border: 4px solid ${C.emerald}; display: flex; align-items: center; justify-content: center; margin: 20px auto; }
.score-ring .num { font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 700; }
.score-ring .of { font-size: 14px; color: ${C.muted}; }
`;

/* ── Types ────────────────────────────────────── */
interface Section {
  name: string; icon: string; hex: string; pageCount: number;
  metrics: [string, string][];
  intro: string;
  content: string; // full HTML for content pages
}

/* ── Helpers ──────────────────────────────────── */
const ph = (n: number) => `<div class="page-header"><span class="conf">Bulwark Report · Confidential</span><span class="pnum">Page ${n} of 32</span></div>`;
const pf = () => `<div class="page-footer"><span>AI-Powered Pet Insurance · Feb 2026</span><span>© 2026 Bulwark Research</span></div>`;
const metricCards = (m: [string, string][]) => `<div class="metric-grid">${m.map(([l, v]) => `<div class="metric-card"><div class="val">${v}</div><div class="lbl">${l}</div></div>`).join("")}</div>`;
const table = (headers: string[], rows: string[][]) => `<table class="data-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const callout = (tag: string, text: string) => `<div class="callout"><div class="tag">${tag}</div><div style="color:${C.ivory}">${text}</div></div>`;
const barChart = (bars: [string, number, string][]) => `<div class="bar-chart">${bars.map(([l, pct, c]) => `<div class="bar-row"><span class="bar-label">${l}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${c}"></div></div><span class="bar-val">${pct}%</span></div>`).join("")}</div>`;

/* ── Page 1: Cover ────────────────────────────── */
const coverPage = `<div class="page" style="padding:0">
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:297mm;text-align:center;padding:20mm">
    <div class="mono" style="font-size:8px;letter-spacing:0.2em;color:${C.dim};text-transform:uppercase;margin-bottom:30px">Bulwark Research · Intelligence Brief</div>
    <div style="width:60px;height:60px;margin-bottom:24px">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 8V6H9V4h2v2h3V3.5L16 1.5l2 2V6h3V4h2v2h3v2c0 9-4 16-10 21C10 24 6 17 6 8zm3 1.5c0 7.5 3 13 7 16.5 4-3.5 7-9 7-16.5z" fill="${C.paper}"/><path d="M16 9.5h7c0 7.5-3 13-7 16.5z" fill="${C.vermillion}"/></svg>
    </div>
    <h1 class="serif" style="font-size:42px;font-weight:700;line-height:1.1;margin-bottom:8px">AI-Powered Pet Insurance</h1>
    <div class="accent" style="font-size:20px;margin-bottom:40px">Startup Idea Validation Report</div>
    <div class="score-ring"><div><span class="num">78</span><span class="of">/100</span></div></div>
    <div class="mono" style="font-size:9px;color:${C.emerald};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:50px">Strong Viability</div>
    <div style="display:flex;gap:30px;margin-bottom:50px">
      ${[["32","Pages"],["1,247","Sources"],["47","Agents"],["8","Dimensions"]].map(([v,l]) => `<div><div class="serif" style="font-size:20px;font-weight:700">${v}</div><div class="mono" style="font-size:7px;color:${C.dim};text-transform:uppercase;letter-spacing:0.15em">${l}</div></div>`).join("")}
    </div>
    <div class="mono" style="font-size:7px;color:${C.dim};letter-spacing:0.12em;text-transform:uppercase">Generated February 17, 2026 · Confidential</div>
  </div>
</div>`;

/* ── Page 2: Table of Contents ────────────────── */
const tocEntries = [
  ["Executive Summary", "3", C.paper],
  ["Market Sizing", "5", C.vermillion],
  ["Competitor Intelligence", "9", C.amber],
  ["Business Model Viability", "13", C.emerald],
  ["Technical Feasibility", "17", C.cyan],
  ["Risk Assessment", "21", C.vermillion],
  ["Go-to-Market Strategy", "24", C.amber],
  ["Financial Projections", "28", C.emerald],
  ["Methodology & Sources", "32", C.paper],
];
const tocPage = `<div class="page">${ph(2)}
  <h2 class="serif" style="font-size:24px;font-weight:700;margin-bottom:6px">Contents</h2>
  <div class="divider" style="margin-bottom:20px"></div>
  ${tocEntries.map(([name, pg, color]) => `<div style="display:flex;align-items:baseline;padding:10px 0;border-bottom:1px solid ${C.inkBorder}22"><span style="color:${color};font-size:13px;font-weight:600;flex:1">${name}</span><span class="mono" style="font-size:9px;color:${C.dim}">${pg}</span></div>`).join("")}
  <div style="margin-top:30px">
    ${callout("About This Report", "This intelligence brief was generated by Bulwark Research's autonomous agent swarm — 47 specialized AI agents working in parallel across 8 research dimensions. Each finding is cross-referenced against multiple data sources and assigned a confidence score. The weighted synthesis produces the overall viability score of 78/100.")}
  </div>
  ${pf()}
</div>`;

/* ── Pages 3-4: Executive Summary ─────────────── */
const execPages = `<div class="page">${ph(3)}
  <div class="section-icon" style="color:${C.cyan}">◉</div>
  <h2 class="section-title">Executive Summary</h2>
  <div class="section-sub">Cross-agent synthesis with weighted confidence scoring</div>
  <div class="divider"></div>
  ${callout("Go / No-Go Recommendation", '<strong style="color:' + C.emerald + ';font-size:14px">GO</strong> — Conditional on securing MGA partnership within 90 days and closing $4.5M seed round.')}
  <p>Cross-agent synthesis yields a weighted viability score of 78/100 — a "Strong" recommendation with caveats. The opportunity is underpinned by a large, underpenetrated market ($4.2B TAM, 4.8% penetration) and a defensible technical moat in AI-native claims adjudication.</p>
  <p>Primary risk factors are regulatory complexity (state-by-state licensing across 50 jurisdictions) and the capital intensity inherent to insurance businesses. However, the MGA partnership pathway significantly de-risks the regulatory timeline.</p>
  <h4>Viability Score Breakdown</h4>
  ${barChart([["Market Opp.", 85, C.emerald],["Competitive Pos.", 72, C.amber],["Business Model", 81, C.emerald],["Tech Feasibility", 74, C.cyan],["Risk Profile", 68, C.amber],["GTM Readiness", 79, C.emerald],["Financial Viability", 82, C.emerald]])}
  <h4>Critical Path</h4>
  <p>The recommended path forward: (1) secure MGA partnership for regulatory coverage, (2) raise $4.5M seed targeting 22 months runway, (3) launch in California and Texas — combined 28% of SAM, (4) invest in the AI claims engine as primary competitive moat.</p>
  ${pf()}
</div>
<div class="page">${ph(4)}
  <h4>Key Findings by Dimension</h4>
  ${table(["Dimension", "Score", "Key Finding"], [
    ["Market Sizing", "85/100", "US pet insurance at 4.8% penetration vs 25%+ in mature markets — massive runway"],
    ["Competitor Intel", "72/100", "No incumbent uses real-time AI claims adjudication — clear gap exists"],
    ["Business Model", "81/100", "Unit economics strong at $42/mo premium; LTV:CAC of 4.2x; break-even month 18"],
    ["Tech Feasibility", "74/100", "Core AI engine buildable in 14 weeks; PMS integrations add complexity"],
    ["Risk Assessment", "68/100", "Regulatory risk highest — 23 states require specific pet insurance disclosures"],
    ["GTM Strategy", "79/100", "Vet partnerships convert 3.2x vs paid social; 847 high-intent SEO keywords identified"],
    ["Financial Proj.", "82/100", "$3.8M ARR year 1, $31.2M year 3; cash-flow positive month 28 in downside case"],
  ])}
  <h4>Confidence Assessment</h4>
  <p>Overall confidence in this analysis: <strong>High (87%)</strong>. Market data sourced from NAPHIA, IBISWorld, and SEC filings. Competitor data from Crunchbase, G2 reviews (47K+), and job posting analysis. Financial models stress-tested across 10,000 Monte Carlo simulations with ±20% variance on key inputs.</p>
  ${callout("Next Steps", "1. Validate MGA partnership feasibility (target: 30 days) — contact Sure, Boost, and Openly<br>2. Commission actuarial review of AI claims model ($15-25K, 6 weeks)<br>3. Build founder MVP of claims adjudication engine (proof of concept, 4 weeks)<br>4. Begin seed fundraising with this report as diligence foundation")}
  ${pf()}
</div>`;

/* ── Section Content Data ─────────────────────── */
/* ── Pages 5-8: Market Sizing ─────────────────── */
const marketPages = `<div class="page">${ph(5)}
  <div class="section-icon" style="color:${C.vermillion}">◎</div>
  <h2 class="section-title">Market Sizing</h2>
  <div class="section-sub">TAM, SAM, SOM with bottom-up and top-down modeling across 200+ industry databases</div>
  <div class="divider"></div>
  ${metricCards([["Total Addressable Market","$4.2B"],["Serviceable Addressable","$890M"],["Serviceable Obtainable","$67M"]])}
  <p>The US pet insurance market reached $3.9B in 2025 and is projected to hit $4.2B by year-end 2026, growing at a 23.4% CAGR. Penetration remains at just 4.8% of pet-owning households — compared to 25%+ in the UK and Sweden — signaling significant headroom for new entrants.</p>
  <p>Bottom-up modeling across 14 distribution channels identifies an addressable segment of $890M among digitally native pet owners aged 25–44 who currently lack coverage. This demographic over-indexes on pet spending (2.3x average) and digital-first purchasing behavior.</p>
  ${callout("Key Insight", "The US pet insurance penetration gap versus mature markets (4.8% vs 25%+) represents one of the largest untapped insurance opportunities globally. Each 1% penetration increase equals ~$875M in new premium volume.")}
  ${pf()}
</div>
<div class="page">${ph(6)}
  <h4>Market Growth Trajectory</h4>
  ${table(["Year","Market Size","Growth","Penetration"], [
    ["2022","$2.2B","—","2.8%"],["2023","$2.8B","+27.3%","3.4%"],["2024","$3.4B","+21.4%","4.1%"],
    ["2025","$3.9B","+14.7%","4.8%"],["2026E","$4.2B","+7.7%","5.4%"],["2027E","$5.1B","+21.4%","6.3%"],
    ["2028E","$6.3B","+23.5%","7.8%"],
  ])}
  <p>Growth decelerated slightly in 2025 as the post-COVID "pet boom" normalized, but structural drivers remain strong: rising veterinary costs (+8.2% annually), younger pet owners treating pets as family members, and increasing awareness through employer pet benefit programs.</p>
  <h4>Segment Breakdown by Pet Type</h4>
  ${barChart([["Dogs",68,C.vermillion],["Cats",28,C.amber],["Exotic/Other",4,C.cyan]])}
  <p>Dogs represent 68% of the insured pet population. However, cat insurance is growing at 31% YoY — nearly double the dog segment's 19% — driven by indoor cat owners who are more likely to seek preventive care coverage.</p>
  ${pf()}
</div>
<div class="page">${ph(7)}
  <h4>Geographic Distribution of Demand</h4>
  ${table(["State","% of SAM","Pet Households","Avg Premium","Competition Intensity"], [
    ["California","16%","6.1M","$48/mo","High"],["Texas","12%","4.8M","$39/mo","Medium"],
    ["Florida","9%","3.2M","$44/mo","Medium"],["New York","7%","2.4M","$52/mo","High"],
    ["Pennsylvania","5%","2.1M","$38/mo","Low"],["Illinois","5%","1.9M","$41/mo","Medium"],
    ["Ohio","4%","1.7M","$36/mo","Low"],["Georgia","4%","1.6M","$37/mo","Low"],
  ])}
  <p>California and Texas together account for 28% of the serviceable addressable market. These two states are recommended as launch markets due to their combined scale, moderate-to-high average premiums, and regulatory feasibility for MGA-backed entrants.</p>
  <h4>Customer Segmentation</h4>
  <div class="two-col">
    <div class="metric-card"><div class="val" style="font-size:16px;color:${C.vermillion}">Segment A</div><div style="color:${C.ivory};font-size:10px;margin-top:4px"><strong>Millennial Pet Parents</strong><br>Ages 28-38, urban, HHI $85K+<br>42% of SAM · Highest conversion</div></div>
    <div class="metric-card"><div class="val" style="font-size:16px;color:${C.amber}">Segment B</div><div style="color:${C.ivory};font-size:10px;margin-top:4px"><strong>Gen-Z First-Timers</strong><br>Ages 22-27, adopt-don't-shop<br>23% of SAM · Fastest growing</div></div>
  </div>
  ${pf()}
</div>
<div class="page">${ph(8)}
  <h4>Bottom-Up SOM Build</h4>
  ${table(["Channel","Year 1 Policies","CAC","Revenue Contribution"], [
    ["Vet Partnerships","3,200","$215","$1.61M"],["SEO/Content","2,400","$62","$1.21M"],
    ["Paid Social","1,800","$124","$0.91M"],["Referral Program","800","$45","$0.40M"],
  ])}
  <p>First-year serviceable obtainable market is estimated at $67M based on capturing 0.97% of the digitally-addressable pet insurance market through four primary channels. The vet partnership channel, while highest CAC, delivers the strongest conversion rates (3.2x vs paid social) and lowest churn (1.4% monthly vs 3.1% average).</p>
  ${callout("Methodology Note","TAM derived from NAPHIA 2025 Annual Report, IBISWorld Industry Report 52413, and Packaged Facts Pet Market Outlook. SAM filtered by demographic overlays from US Census ACS 2024 and Simmons National Consumer Survey. SOM modeled using channel-specific conversion benchmarks from 12 comparable D2C insurance launches (2021-2025).")}
  ${pf()}
</div>`;

/* ── Pages 9-12: Competitor Intelligence ──────── */
const competitorPages = `<div class="page">${ph(9)}
  <div class="section-icon" style="color:${C.amber}">◈</div>
  <h2 class="section-title">Competitor Intelligence</h2>
  <div class="section-sub">Internet-scale crawling of competitors — funding, hiring, product launches, positioning maps</div>
  <div class="divider"></div>
  ${metricCards([["Direct Competitors","7"],["Total Funding Raised","$2.1B"],["Avg. Customer NPS","34"]])}
  <p>Seven direct competitors were identified in the AI-adjacent pet insurance space, ranging from publicly-traded incumbents (Trupanion, $3.2B market cap) to venture-backed insurgents (Lemonade Pet, Pumpkin). No competitor currently offers real-time AI claims adjudication — the proposed core differentiator.</p>
  <p>The competitive landscape is consolidating: three acquisitions occurred in 2024-2025 (Petplan → Fetch, ASPCA Pet → PTZ, Embrace partial acquisition by Nationwide). This consolidation creates positioning opportunity for a digitally-native challenger.</p>
  ${pf()}
</div>
<div class="page">${ph(10)}
  <h4>Competitive Landscape Matrix</h4>
  ${table(["Company","Revenue","Enrolled Pets","Funding","Founded","Key Differentiator"], [
    ["Trupanion","$892M","1.6M","IPO ($3.2B)","2000","Vet Direct Pay (<5 min claims)"],
    ["Lemonade Pet","$124M GWP","420K","$481M","2015","AI-first UX, instant quotes"],
    ["Healthy Paws","~$340M GWP","500K+","Private","2009","No caps on payouts"],
    ["Pumpkin","~$85M GWP","180K","$40M","2020","Preventive care bundling"],
    ["Fetch (fka Petplan)","~$200M GWP","300K","Acquired","2003","Oldest US brand, broad coverage"],
    ["Spot","~$45M GWP","90K","$22M","2019","Multi-pet discounts"],
    ["Pawp","~$15M","60K","$13M","2019","Telehealth + emergency fund"],
  ])}
  <h4>Funding & Valuation Trends</h4>
  <p>Total sector funding reached $2.1B through 2025, with Lemonade accounting for the lion's share. Private market valuations have compressed from 15x revenue (2021 peak) to 4-6x, creating a more rational fundraising environment for new entrants. The average seed round in pet insurtech is $4.2M (2024-2025 median).</p>
  ${pf()}
</div>
<div class="page">${ph(11)}
  <h4>Customer Sentiment Analysis</h4>
  <p>Analysis of 47,000 customer reviews across Trustpilot, Google, BBB, and app stores reveals consistent pain points across all incumbents:</p>
  ${barChart([["Opaque Pricing",31,C.vermillion],["Slow Reimbursement",28,C.amber],["Exclusions Unclear",22,C.amber],["Premium Increases",19,C.vermillion],["Poor Customer Svc",14,C.cyan]])}
  <p style="font-size:10px;color:${C.dim}">% of negative reviews mentioning each theme (n=12,400 negative reviews analyzed)</p>
  <h4>Moat Assessment</h4>
  ${table(["Company","Data Moat","Network Effect","Switching Cost","Brand","Overall Moat"], [
    ["Trupanion","Strong","Strong","High","Medium","<span style='color:${C.emerald}'>Strong</span>"],
    ["Lemonade Pet","Medium","Weak","Low","Strong","<span style='color:${C.amber}'>Medium</span>"],
    ["Healthy Paws","Weak","Weak","Medium","Strong","<span style='color:${C.amber}'>Medium</span>"],
    ["Pumpkin","Weak","None","Low","Weak","<span style='color:${C.vermillion}'>Weak</span>"],
  ])}
  <p>Trupanion's Vet Direct Pay network (covering 8,000+ hospitals) creates the strongest moat — but it's a distribution moat, not a technology moat. An AI-native entrant can build a superior claims experience without replicating the entire vet network by focusing on reimbursement speed and transparency.</p>
  ${pf()}
</div>
<div class="page">${ph(12)}
  <h4>Hiring Signal Analysis</h4>
  <p>Job posting analysis across LinkedIn, Greenhouse, and Lever reveals strategic priorities. Trupanion posted 12 ML/AI roles in Q4 2025 — a 3x increase — suggesting awareness of the AI claims opportunity.</p>
  ${table(["Company","Open Roles","AI/ML Roles","Engineering %","Growth Signal"], [
    ["Trupanion","89","12","31%","Accelerating AI investment"],
    ["Lemonade","134","28","42%","Platform expansion, not pet-specific"],
    ["Pumpkin","22","2","27%","Moderate, focused on ops"],
    ["Spot","11","0","18%","Stagnant — potential acquisition target"],
  ])}
  ${callout("Competitive Positioning Opportunity", "Position as the 'transparent AI' pet insurer: the first that shows you exactly how your premium is calculated, why claims are approved or denied, and uses AI to pay claims in under 60 seconds — not 5 minutes (Trupanion) or 3 days (industry average). This attacks the #1 and #2 customer complaints simultaneously.")}
  ${pf()}
</div>`;

/* ── Pages 13-16: Business Model ──────────────── */
const businessPages = `<div class="page">${ph(13)}
  <div class="section-icon" style="color:${C.emerald}">◇</div>
  <h2 class="section-title">Business Model Viability</h2>
  <div class="section-sub">Revenue model stress-testing, unit economics simulation, pricing elasticity analysis</div>
  <div class="divider"></div>
  ${metricCards([["Target Loss Ratio","68%"],["LTV:CAC Ratio","4.2x"],["Break-even","Month 18"]])}
  <p>Unit economics modeling across three revenue scenarios indicates strong viability at a $42/month average premium — positioning between Lemonade's $35 entry point and Trupanion's $61 average. The AI-native claims model reduces loss adjustment expenses by an estimated 34% versus traditional insurers.</p>
  <p>The business model is structured as a full-stack insurance carrier (long-term) operating initially through an MGA partnership. This allows rapid market entry while building the actuarial track record required for direct licensing.</p>
  ${callout("Model Strength", "The AI claims engine is both the product differentiator AND the margin driver. Every 1% improvement in claims accuracy translates to ~$340K in annual savings at scale (50K policies). This creates a flywheel: better AI → lower loss ratio → competitive pricing → more customers → more training data → better AI.")}
  ${pf()}
</div>
<div class="page">${ph(14)}
  <h4>Unit Economics at Scale</h4>
  ${table(["Metric","Current Benchmark","Year 1 Target","Year 3 Target","Industry Avg"], [
    ["Avg Monthly Premium","—","$42","$48","$53"],
    ["Loss Ratio","—","72%","68%","78%"],
    ["Loss Adjustment Expense","—","8%","5%","12%"],
    ["Customer Acquisition Cost","—","$186","$142","$250+"],
    ["Monthly Churn","—","3.2%","1.8%","2.4%"],
    ["LTV (36-month)","—","$782","$1,124","$680"],
    ["LTV:CAC","—","4.2x","7.9x","2.7x"],
    ["Gross Margin","—","20%","27%","10%"],
  ])}
  <h4>Revenue Model Structure</h4>
  <p>Primary revenue: insurance premiums (net of reinsurance cession). Secondary revenue streams include: wellness plan add-ons (est. 35% attach rate, +$12/mo), data licensing to veterinary networks (year 2+), and embedded insurance API for pet retailers.</p>
  <h4>Pricing Sensitivity Analysis</h4>
  ${barChart([["$32/mo",62,C.amber],["$37/mo",74,C.emerald],["$42/mo (target)",81,C.emerald],["$48/mo",68,C.amber],["$55/mo",43,C.vermillion]])}
  <p style="font-size:10px;color:${C.dim}">Conversion likelihood score (0-100) based on conjoint analysis across 2,400 survey respondents</p>
  ${pf()}
</div>
<div class="page">${ph(15)}
  <h4>Sensitivity Analysis — Key Variables</h4>
  ${table(["Variable","Base Case","Bear Case (-20%)","Bull Case (+20%)","Impact on Break-even"], [
    ["Monthly Premium","$42","$34","$50","-4 / +3 months"],
    ["Loss Ratio","68%","82%","54%","+8 / -5 months"],
    ["CAC","$186","$223","$149","+3 / -2 months"],
    ["Monthly Churn","2.4%","2.9%","1.9%","+5 / -3 months"],
    ["Claim Frequency","0.8x/yr","1.0x/yr","0.6x/yr","+6 / -4 months"],
  ])}
  <p>The model is most sensitive to loss ratio and claim frequency — both directly improved by the AI claims engine. This reinforces the strategic importance of the AI moat: it's not just a product feature, it's the primary driver of financial viability.</p>
  <h4>Reinsurance Structure</h4>
  <p>Recommended quota share treaty: cede 40% of premium and losses to a rated reinsurer in year 1, declining to 20% by year 3 as the book of business matures and own capital base grows. Target reinsurer partners: Swiss Re, Munich Re (both have active pet insurance programs), or Hannover Re.</p>
  ${callout("Risk Mitigation", "The MGA structure limits capital requirements to ~$500K regulatory deposit vs $5-15M for direct carrier licensing. Combined with the quota share reinsurance, maximum loss exposure in year 1 is capped at $2.8M — well within the proposed $4.5M seed round.")}
  ${pf()}
</div>
<div class="page">${ph(16)}
  <h4>Comparison: AI-Native vs Traditional Cost Structure</h4>
  <div class="two-col">
    <div>
      <h4 style="color:${C.cyan}">AI-Native Model (Proposed)</h4>
      ${table(["Cost Category","% of Premium"], [
        ["Claims Paid","58%"],["Loss Adjustment","5%"],["Technology","8%"],
        ["Customer Acquisition","12%"],["Operations","6%"],["G&A","4%"],
        ["<strong>Margin</strong>","<strong>7%</strong>"],
      ])}
    </div>
    <div>
      <h4 style="color:${C.muted}">Traditional Insurer</h4>
      ${table(["Cost Category","% of Premium"], [
        ["Claims Paid","62%"],["Loss Adjustment","12%"],["Technology","3%"],
        ["Customer Acquisition","15%"],["Operations","9%"],["G&A","5%"],
        ["<strong>Margin</strong>","<strong>-6%</strong>"],
      ])}
    </div>
  </div>
  <p>The AI-native model achieves a 13-percentage-point margin advantage, primarily through loss adjustment expense reduction (5% vs 12%) and operational efficiency (6% vs 9%). The trade-off is higher technology spend (8% vs 3%), which creates the defensible moat.</p>
  ${callout("Bottom Line", "The business model is viable and differentiated. The AI claims engine creates both the customer-facing value proposition (transparency, speed) and the financial advantage (lower loss adjustment costs). Break-even at month 18 under base case assumptions.")}
  ${pf()}
</div>`;

/* ── Pages 17-20: Technical Feasibility ───────── */
const techPages = `<div class="page">${ph(17)}
  <div class="section-icon" style="color:${C.cyan}">⬡</div>
  <h2 class="section-title">Technical Feasibility</h2>
  <div class="section-sub">Architecture complexity scoring, build-vs-buy analysis, infrastructure cost modeling</div>
  <div class="divider"></div>
  ${metricCards([["Complexity Score","7.2 / 10"],["Build Timeline","14 Weeks"],["Monthly Infra Cost","$8.4K"]])}
  <p>Architecture analysis identifies two critical technical challenges: (1) real-time claims adjudication requiring sub-200ms inference on veterinary procedure codes, and (2) integration with existing Practice Management Systems (PMS) — primarily Cornerstone and AVImark — which expose SOAP-based APIs requiring adapter middleware.</p>
  <p>The proposed architecture follows a modern event-driven microservices pattern with three core services: Policy Engine, Claims Adjudicator (AI), and Customer Portal. All services containerized on AWS ECS with Aurora PostgreSQL for transactional data and S3 for document storage.</p>
  ${pf()}
</div>
<div class="page">${ph(18)}
  <h4>Build vs. Buy Analysis</h4>
  ${table(["Component","Decision","Rationale","Vendor / Approach","Est. Cost"], [
    ["AI Claims Engine","Build","Core IP, primary differentiator","Custom (PyTorch + ONNX)","$180K"],
    ["Policy Admin","Buy","Commodity, complex to build","Sure API","$4K/mo"],
    ["Payments","Buy","Regulated, no advantage to building","Stripe","2.9% + $0.30"],
    ["Customer Portal","Build","Brand experience, data control","Next.js + Vercel","$800/mo"],
    ["Observability","Buy","Mature tooling available","Datadog","$1.2K/mo"],
    ["PMS Integration","Build","Niche, no off-shelf solution","Custom adapters","$60K"],
    ["Fraud Detection","Hybrid","Leverage existing + custom rules","Stripe Radar + custom","$2K/mo"],
  ])}
  <h4>AI Claims Engine Architecture</h4>
  <p>The claims adjudicator processes incoming claims through a four-stage pipeline: (1) document extraction and OCR of veterinary invoices, (2) procedure code classification using a fine-tuned model on AVMA procedure codes, (3) policy coverage matching against the customer's plan, and (4) fraud probability scoring. Target end-to-end latency: under 200ms for 95th percentile.</p>
  ${callout("Technical Moat", "The AI claims model improves with scale. Each processed claim adds to the training corpus, improving accuracy on edge cases. After 50K claims (~month 8), the model should achieve >94% auto-adjudication rate vs Trupanion's estimated 78%.")}
  ${pf()}
</div>
<div class="page">${ph(19)}
  <h4>Infrastructure Cost Model</h4>
  ${table(["Service","Monthly Cost","Scaling Trigger","Year 3 Projection"], [
    ["AWS ECS (compute)","$2,400","Per 10K active policies","$8,200"],
    ["Aurora PostgreSQL","$1,800","Storage + read replicas","$4,600"],
    ["S3 + CloudFront","$400","Document volume","$1,800"],
    ["Datadog","$1,200","Host count","$3,400"],
    ["Sure API","$4,000","Policy volume","$12,000"],
    ["Stripe","Variable","Transaction volume","~$45K"],
    ["ML Inference (ONNX)","$600","Claims volume","$2,800"],
    ["<strong>Total (fixed)</strong>","<strong>$8,400</strong>","","<strong>$32,800</strong>"],
  ])}
  <h4>Development Timeline</h4>
  ${barChart([["Wk 1-3: Core API",21,C.cyan],["Wk 2-5: AI Engine",29,C.vermillion],["Wk 4-8: Portal UI",36,C.emerald],["Wk 6-10: PMS Integ.",36,C.amber],["Wk 8-12: Testing",36,C.cyan],["Wk 12-14: Launch",14,C.vermillion]])}
  <p>Critical path runs through the AI claims engine (weeks 2-5) and PMS integrations (weeks 6-10). The portal UI and policy engine can be developed in parallel. Estimated team: 2 senior backend engineers + 1 ML engineer. Frontend can be contracted.</p>
  ${pf()}
</div>
<div class="page">${ph(20)}
  <h4>Technology Risk Assessment</h4>
  ${table(["Risk","Severity","Probability","Mitigation"], [
    ["AI accuracy below threshold","High","Medium","Staged rollout with human review fallback; target >90% accuracy before full automation"],
    ["PMS integration delays","Medium","High","Begin Cornerstone integration first (60% market share); defer AVImark to v2"],
    ["Regulatory data requirements","Medium","Medium","SOC 2 Type II certification by month 6; HIPAA-adjacent controls for vet records"],
    ["Vendor lock-in (Sure API)","Low","Low","Abstract policy admin behind internal API; migration path documented"],
    ["Scaling bottleneck","Low","Low","ONNX Runtime enables horizontal scaling; load tested to 100 req/s"],
  ])}
  ${callout("Feasibility Verdict", "Technical complexity score of 7.2/10 — challenging but achievable with a focused team. The AI claims engine is the hardest component but also the most valuable. Recommend hiring an ML engineer with healthcare/insurance domain experience as employee #1. The 14-week timeline assumes a 3-person engineering team working full-time.")}
  ${pf()}
</div>`;

/* ── Pages 21-23: Risk Assessment ─────────────── */
const riskPages = `<div class="page">${ph(21)}
  <div class="section-icon" style="color:${C.vermillion}">△</div>
  <h2 class="section-title">Risk Assessment</h2>
  <div class="section-sub">Multi-dimensional risk matrix — market, execution, regulatory, financial, competitive</div>
  <div class="divider"></div>
  ${metricCards([["Market Risk","Low"],["Execution Risk","Medium"],["Regulatory Risk","High"]])}
  <h4>Risk Matrix Overview</h4>
  ${table(["Risk Category","Severity","Probability","Risk Score","Trend"], [
    ["Market demand shortfall","Medium","Low","3/10","↓ Improving"],
    ["Competitive response","Medium","Medium","5/10","→ Stable"],
    ["Regulatory compliance","High","High","8/10","↑ Increasing"],
    ["Technology execution","Medium","Medium","5/10","→ Stable"],
    ["Capital requirements","High","Medium","6/10","→ Stable"],
    ["Key person risk","Medium","Medium","5/10","→ Stable"],
    ["Fraud / adverse selection","High","Low","4/10","→ Stable"],
    ["Reputational (AI bias)","High","Low","4/10","↑ Increasing"],
  ])}
  <p>Regulatory compliance is the highest-severity risk. Pet insurance is regulated at the state level in the US, with 23 states requiring specific pet insurance disclosures under NAIC Model Act #633. Colorado's SB 21-169 mandates bias testing for insurance AI models, with enforcement beginning 2026.</p>
  ${pf()}
</div>
<div class="page">${ph(22)}
  <h4>Regulatory Risk Deep Dive</h4>
  ${table(["Regulation","Jurisdiction","Impact","Status","Mitigation"], [
    ["NAIC Model Act #633","23 states","Disclosure requirements","Active","Standardized disclosure templates"],
    ["CO SB 21-169","Colorado","AI bias testing mandate","Effective 2026","Third-party algorithmic audit"],
    ["CA AB 2013","California","AI transparency in insurance","Proposed","Proactive compliance program"],
    ["NY DFS Circular 2025-1","New York","Insurtech licensing guidance","Active","Legal counsel engaged"],
    ["NAIC Big Data Working Group","Federal guidance","AI/ML governance framework","In development","Participate in comment period"],
  ])}
  <p>Mitigation strategy: Partner with a licensed MGA (Managing General Agent) for the first 18 months to operate under their license while building direct licensing across priority states. Target MGA partners: Sure ($300M GWP platform), Boost Insurance, or Openly.</p>
  <h4>Competitive Response Risk</h4>
  <p>Trupanion's increased AI hiring (12 ML roles in Q4 2025) signals they're pursuing similar capabilities. However, their legacy codebase and existing vet network create transition costs estimated at 18-24 months. Lemonade has AI expertise but pet insurance is <10% of their business — unlikely to receive focused investment. Window of opportunity: 12-18 months.</p>
  ${callout("Key Risk", "If the MGA partnership cannot be secured within 90 days, the regulatory path extends by 12+ months and capital requirements increase by $3-5M. This is the single biggest risk to the venture. Recommend parallel conversations with 3+ MGA partners immediately.")}
  ${pf()}
</div>
<div class="page">${ph(23)}
  <h4>Financial Risk Scenarios</h4>
  ${table(["Scenario","Probability","Outcome","Cash Impact","Mitigation"], [
    ["Base case","50%","Break-even month 18","Within seed round","—"],
    ["Moderate adverse","25%","Break-even month 24","+$1.5M bridge needed","Pre-negotiate bridge terms"],
    ["Severe adverse","15%","Break-even month 30","+$4M needed (Series A)","Trigger Series A early"],
    ["Catastrophic","10%","Unable to reach scale","Total seed loss","MGA pivot or acqui-hire exit"],
  ])}
  <h4>Risk Mitigation Summary</h4>
  <div class="two-col">
    <div class="metric-card">
      <div class="val" style="font-size:14px;color:${C.emerald}">Mitigatable Risks</div>
      <div style="color:${C.ivory};font-size:10px;margin-top:4px">
        • MGA partnership for regulatory<br>• Reinsurance for capital<br>• Staged rollout for AI accuracy<br>• SOC 2 for data compliance
      </div>
    </div>
    <div class="metric-card">
      <div class="val" style="font-size:14px;color:${C.vermillion}">Residual Risks</div>
      <div style="color:${C.ivory};font-size:10px;margin-top:4px">
        • Competitive response timing<br>• Regulatory environment shift<br>• Macro impact on VC funding<br>• Black swan loss events
      </div>
    </div>
  </div>
  ${callout("Risk Verdict", "Overall risk profile: Medium (score 5.0/10). The highest-severity risks (regulatory, capital) have clear mitigation paths. The venture is GO-worthy provided the MGA partnership is secured as the first milestone. Without it, risk score increases to 7.5/10 — above our recommended threshold.")}
  ${pf()}
</div>`;

/* ── Pages 24-27: GTM Strategy ────────────────── */
const gtmPages = `<div class="page">${ph(24)}
  <div class="section-icon" style="color:${C.amber}">▷</div>
  <h2 class="section-title">Go-to-Market Strategy</h2>
  <div class="section-sub">Channel analysis, CAC modeling, launch sequence planning, growth lever identification</div>
  <div class="divider"></div>
  ${metricCards([["Launch Channels","4"],["Blended CAC","$186"],["Month 12 Target","8,200 policies"]])}
  <p>Recommended launch strategy centers on a "transparent AI" positioning — the first pet insurer that shows you exactly how your premium is calculated and why claims are approved or denied. This directly attacks the top two customer complaints identified in competitor sentiment analysis.</p>
  <p>Phase 1 (months 1-3) targets the "vet visit moment" through partnerships with Banfield Pet Hospital (1,000+ locations) and VCA Animal Hospitals, embedding instant quote generation into post-visit checkout flows.</p>
  ${callout("Positioning Statement", '"The only pet insurance that shows you exactly why." — This positions against every incumbent\'s opacity and leverages the AI engine as a customer-facing feature, not just a backend optimization.')}
  ${pf()}
</div>
<div class="page">${ph(25)}
  <h4>Channel Strategy & CAC Modeling</h4>
  ${table(["Channel","CAC","Conv. Rate","LTV:CAC","Year 1 Mix","Year 3 Mix"], [
    ["Vet Partnerships","$215","8.2%","3.6x","39%","28%"],
    ["SEO / Content","$62","2.1%","12.6x","29%","38%"],
    ["Paid Social","$124","3.4%","6.3x","22%","18%"],
    ["Referral Program","$45","12.4%","17.4x","10%","16%"],
  ])}
  <p>The channel mix evolves over time: vet partnerships dominate launch (high cost but immediate trust), while SEO and referrals scale organically. By year 3, organic channels (SEO + referral) should account for 54% of new policies, driving blended CAC down from $186 to $142.</p>
  <h4>SEO Content Strategy</h4>
  <p>Analysis identified 847 high-intent keywords with combined monthly search volume of 124K. The top 20 keywords include "is pet insurance worth it" (18K/mo), "best pet insurance for dogs" (14K/mo), and "pet insurance cost" (12K/mo). Content strategy: publish 3 authoritative guides per week targeting long-tail clusters, with embedded quote widgets for conversion.</p>
  ${barChart([["is pet insurance worth it",100,C.amber],["best pet insurance dogs",78,C.emerald],["pet insurance cost",67,C.cyan],["pet insurance reviews",52,C.amber],["pet insurance comparison",48,C.emerald]])}
  <p style="font-size:10px;color:${C.dim}">Relative monthly search volume for top keywords</p>
  ${pf()}
</div>
<div class="page">${ph(26)}
  <h4>Launch Phases</h4>
  ${table(["Phase","Timeline","Focus","Key Milestones","Budget"], [
    ["Phase 1: Foundation","Months 1-3","Vet partnerships + brand launch","2 vet network deals signed, 500 policies","$280K"],
    ["Phase 2: Scale","Months 4-6","Add paid social + SEO","2,400 policies, first cohort retention data","$420K"],
    ["Phase 3: Optimize","Months 7-9","Referral program + content scaling","5,100 policies, CAC trending below $170","$350K"],
    ["Phase 4: Expand","Months 10-12","Geographic expansion + partnerships","8,200 policies, Series A preparation","$510K"],
  ])}
  <h4>Partnership Strategy</h4>
  <p>Veterinary clinic partnerships are the highest-conviction channel. Analysis of 12 comparable D2C insurance launches shows vet-channel partnerships convert at 3.2x the rate of paid social, with 2.2x better retention. Target partners:</p>
  <div class="two-col">
    <div class="metric-card">
      <div class="val" style="font-size:14px;color:${C.amber}">Tier 1 — National</div>
      <div style="color:${C.ivory};font-size:10px;margin-top:4px">
        • Banfield (1,000+ locations)<br>• VCA (900+ hospitals)<br>• BluePearl (100+ emergency)<br>Revenue share: 15% of first-year premium
      </div>
    </div>
    <div class="metric-card">
      <div class="val" style="font-size:14px;color:${C.cyan}">Tier 2 — Regional</div>
      <div style="color:${C.ivory};font-size:10px;margin-top:4px">
        • Independent clinic networks<br>• Vet school hospitals (30 locations)<br>• Pet retail (Petco, PetSmart)<br>Revenue share: 10% of first-year premium
      </div>
    </div>
  </div>
  ${pf()}
</div>
<div class="page">${ph(27)}
  <h4>Growth Levers (Post-Launch)</h4>
  ${table(["Lever","Impact","Effort","Timeline","Expected Lift"], [
    ["Multi-pet discount","High","Low","Month 4","22% increase in policies/household"],
    ["Employer pet benefits","High","Medium","Month 6","New B2B channel, est. 15% of mix by Y2"],
    ["Wellness plan upsell","Medium","Low","Month 3","35% attach rate, +$12/mo ARPU"],
    ["Annual pay discount","Medium","Low","Month 2","18% opt-in, improves cash flow"],
    ["Referral program 2.0","High","Medium","Month 7","Double-sided rewards, target 20% of new"],
  ])}
  <h4>Competitive Response Playbook</h4>
  <p>If Trupanion or Lemonade launches an AI transparency feature (estimated 12-18 month window), the response strategy pivots from "first mover" to "best in class" positioning — emphasizing claims speed benchmarks, accuracy rates, and customer NPS. Maintain defensibility through: (1) proprietary claims data advantage, (2) deeper vet network integrations, and (3) community-driven transparency (publish accuracy metrics publicly).</p>
  ${callout("GTM Verdict", "The go-to-market strategy is viable and well-sequenced. The vet partnership channel provides high-trust distribution that money can't easily buy. SEO creates a compounding organic channel. The phased approach limits upfront capital risk while building proof points for Series A. Target: 8,200 active policies by month 12.")}
  ${pf()}
</div>`;

/* ── Pages 28-31: Financial Projections ───────── */
const financialPages = `<div class="page">${ph(28)}
  <div class="section-icon" style="color:${C.emerald}">▢</div>
  <h2 class="section-title">Financial Projections</h2>
  <div class="section-sub">3-year P&L modeling, runway scenarios, funding requirement analysis, sensitivity tables</div>
  <div class="divider"></div>
  ${metricCards([["Year 1 ARR","$3.8M"],["Year 3 ARR","$31.2M"],["Seed Round","$4.5M"]])}
  <p>Three-year financial modeling projects $3.8M ARR by month 12, scaling to $31.2M by year 3 under the base case (65th percentile Monte Carlo outcome). The model assumes 8,200 active policies at month 12, growing to 58,400 by month 36.</p>
  <p>Initial seed funding requirement of $4.5M provides 22 months of runway at projected burn, with Series A milestone triggers at 15K active policies and 72% gross retention. Downside scenario (25th percentile) still reaches cash-flow positive by month 28.</p>
  ${pf()}
</div>
<div class="page">${ph(29)}
  <h4>3-Year P&L Summary</h4>
  ${table(["","Year 1","Year 2","Year 3"], [
    ["<strong>Gross Written Premium</strong>","<strong>$4.1M</strong>","<strong>$14.8M</strong>","<strong>$34.6M</strong>"],
    ["Net Earned Premium","$2.5M","$10.4M","$27.7M"],
    ["Claims Incurred","($1.7M)","($6.8M)","($17.2M)"],
    ["Loss Adjustment Expense","($200K)","($520K)","($1.1M)"],
    ["<strong>Gross Margin</strong>","<strong>$540K (22%)</strong>","<strong>$3.1M (30%)</strong>","<strong>$9.4M (34%)</strong>"],
    ["Customer Acquisition","($1.5M)","($3.2M)","($5.8M)"],
    ["Technology & Infrastructure","($840K)","($1.4M)","($2.2M)"],
    ["Operations & Support","($620K)","($1.1M)","($1.8M)"],
    ["G&A","($480K)","($680K)","($920K)"],
    ["<strong>Net Income (Loss)</strong>","<strong>($2.9M)</strong>","<strong>($3.3M)</strong>","<strong>($1.3M)</strong>"],
    ["<strong>Cumulative Cash</strong>","<strong>($2.9M)</strong>","<strong>($6.2M)</strong>","<strong>($7.5M)</strong>"],
  ])}
  <p>The business reaches gross margin positive in month 8 and operating break-even in month 18 (base case). Cumulative cash requirement peaks at $7.5M by year 3 end — requiring the seed round ($4.5M) plus a Series A of $8-12M around month 15-18.</p>
  ${pf()}
</div>
<div class="page">${ph(30)}
  <h4>Monte Carlo Simulation Results (10,000 runs)</h4>
  ${barChart([["5th percentile",12,C.vermillion],["25th percentile",38,C.amber],["50th percentile (median)",58,C.emerald],["75th percentile",78,C.emerald],["95th percentile",95,C.cyan]])}
  <p style="font-size:10px;color:${C.dim}">Year 3 ARR as % of base case ($31.2M) across Monte Carlo scenarios. Variables: premium, churn, claims frequency, CAC, growth rate (each ±20% normal distribution).</p>
  ${table(["Percentile","Year 3 ARR","Active Policies","Cash Flow Positive","Series A Need"], [
    ["5th (worst)","$3.7M","8,800","Never (pivot)","N/A — wind down"],
    ["25th (bear)","$11.9M","22,100","Month 28","$6M"],
    ["50th (base)","$19.4M","38,200","Month 22","$10M"],
    ["75th (bull)","$31.2M","58,400","Month 18","$12M (growth)"],
    ["95th (best)","$48.8M","91,200","Month 14","$15M (expansion)"],
  ])}
  <h4>Funding Roadmap</h4>
  ${table(["Round","Timing","Amount","Key Milestones","Valuation Range"], [
    ["Seed","Now","$4.5M","MVP, MGA deal, first 1K policies","$15-20M pre"],
    ["Series A","Month 15-18","$8-12M","15K policies, 72% retention, unit economics proven","$50-80M pre"],
    ["Series B","Month 30-36","$20-30M","50K+ policies, direct carrier license, multi-state","$150-250M pre"],
  ])}
  ${pf()}
</div>
<div class="page">${ph(31)}
  <h4>Key Financial Metrics by Quarter</h4>
  ${table(["Quarter","MRR","Active Policies","Churn","CAC","LTV:CAC","Burn Rate"], [
    ["Q1 Y1","$21K","500","4.2%","$220","2.8x","$165K/mo"],
    ["Q2 Y1","$84K","2,000","3.6%","$195","3.4x","$180K/mo"],
    ["Q3 Y1","$189K","4,500","3.0%","$178","3.9x","$155K/mo"],
    ["Q4 Y1","$319K","8,200","2.8%","$162","4.2x","$120K/mo"],
    ["Q1 Y2","$470K","12,400","2.5%","$155","4.8x","$95K/mo"],
    ["Q2 Y2","$680K","17,800","2.3%","$148","5.3x","$60K/mo"],
    ["Q3 Y2","$920K","24,000","2.1%","$144","5.9x","$15K/mo"],
    ["Q4 Y2","$1.23M","32,200","1.9%","$140","6.4x","CF+"],
  ])}
  <h4>Use of Seed Funds ($4.5M)</h4>
  ${barChart([["Engineering (3 FTE)",36,C.cyan],["Marketing & CAC",28,C.amber],["Operations & Legal",18,C.emerald],["Infrastructure",10,C.vermillion],["Reserve",8,C.dim]])}
  ${callout("Financial Verdict", "The financial model is robust across Monte Carlo scenarios. Even the 25th percentile case reaches cash-flow positive by month 28 with a $6M bridge. The key financial risk is the time to Series A — if growth underperforms, the 22-month runway from seed provides limited margin. Recommendation: begin Series A conversations at month 12 regardless of pace, to ensure optionality.")}
  ${pf()}
</div>`;

/* ── Page 32: Methodology ─────────────────────── */
const methodologyPage = `<div class="page">${ph(32)}
  <div class="section-icon" style="color:${C.paper}">⊙</div>
  <h2 class="section-title">Methodology & Sources</h2>
  <div class="section-sub">How this report was generated</div>
  <div class="divider"></div>
  <h4>Agent Swarm Architecture</h4>
  <p>This report was generated by 47 specialized AI agents working in parallel across 8 research dimensions. Each agent independently researches its domain, then a synthesis engine cross-references findings to resolve conflicts and produce the unified intelligence brief. Total research time: 27 minutes.</p>
  <h4>Data Sources (1,247 total)</h4>
  ${table(["Category","Sources","Examples"], [
    ["Industry Reports","84","NAPHIA Annual Report, IBISWorld, Packaged Facts, Grand View Research"],
    ["SEC Filings","23","Trupanion 10-K, Lemonade S-1/10-Q, Nationwide proxy statements"],
    ["Patent Databases","41","USPTO pet insurance + AI claims patents (2020-2026)"],
    ["Job Postings","312","LinkedIn, Greenhouse, Lever — competitor hiring analysis"],
    ["Customer Reviews","470","Trustpilot, Google Reviews, BBB, App Store, Play Store"],
    ["News & Media","186","TechCrunch, Insurance Journal, Pet Business, VIN News"],
    ["Academic Papers","38","Veterinary economics, AI in insurance, pet ownership demographics"],
    ["Government Data","93","US Census, BLS, state insurance department filings, NAIC data"],
  ])}
  <h4>Confidence Scoring</h4>
  <p>Each finding is assigned a confidence score (0-100%) based on: source authority (40% weight), cross-reference agreement (30% weight), data recency (20% weight), and sample size (10% weight). Findings below 60% confidence are flagged and excluded from the viability score calculation. Average confidence across this report: 87%.</p>
  <div class="divider" style="margin-top:20px"></div>
  <div style="text-align:center;margin-top:16px">
    <div class="mono" style="font-size:7px;color:${C.dim};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px">Disclaimer</div>
    <p style="font-size:9px;color:${C.dim};max-width:80%;margin:0 auto">This report is generated by AI agents and is intended for informational purposes only. It does not constitute investment, legal, or business advice. While Bulwark Research strives for accuracy, all projections are estimates based on available data and should be independently verified before making business decisions. Past market performance does not guarantee future results.</p>
  </div>
  ${pf()}
</div>`;

/* ── Assemble Full HTML ───────────────────────── */
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=210mm">
  <title>Bulwark Research — AI-Powered Pet Insurance</title>
  <style>${css}</style>
</head>
<body>
${coverPage}
${tocPage}
${execPages}
${marketPages}
${competitorPages}
${businessPages}
${techPages}
${riskPages}
${gtmPages}
${financialPages}
${methodologyPage}
</body>
</html>`;

/* ── Generate PDF ─────────────────────────────── */
async function main() {
  const outPath = join(import.meta.dir, "..", "data", "sample-report.pdf");
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  console.log("Rendering HTML...");
  await page.setContent(html, { waitUntil: "networkidle" });
  // Wait for fonts to load
  await page.waitForTimeout(2000);
  console.log("Generating PDF...");
  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  await browser.close();
  console.log(`PDF generated: ${outPath}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
