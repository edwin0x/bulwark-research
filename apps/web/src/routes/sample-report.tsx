import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { BlueprintSection } from '~/components/blueprint-section'
import { Cta } from '~/components/cta'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { ReportEmailGate } from '~/components/report-email-gate'
import { ReportSectionPanel } from '~/components/report-section-panel'
import { ReportTabBar } from '~/components/report-tab-bar'
import { reportMeta, reportSections } from '~/data/sample-report'
import { useScrollReveal } from '~/hooks/use-scroll-reveal'

export const Route = createFileRoute('/sample-report')({
	head: () => ({
		meta: [
			{ title: 'Sample Report — Bulwark Research' },
			{
				name: 'description',
				content:
					'A real Bulwark Research engagement. 32 pages of Big 4-quality due diligence delivered by our research desk.',
			},
			{ property: 'og:title', content: 'Sample Report — Bulwark Research' },
		],
	}),
	component: SampleReportPage,
})

function SampleReportPage() {
	const revealRef = useScrollReveal()
	const [activeTab, setActiveTab] = useState(reportSections[0].id)
	const activeSection = reportSections.find((s) => s.id === activeTab) ?? reportSections[0]

	return (
		<div ref={revealRef}>
			<Navbar activePage="sample-report" />

			{/* Hero */}
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-3xl mx-auto">
					<div className="text-center mb-12">
						<span className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase block mb-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
							// Sample Report
						</span>
						<h1
							className="section-title text-3xl sm:text-4xl md:text-5xl mb-4 animate-slide-in"
							style={{ animationDelay: '0.4s' }}
						>
							SEE WHAT WE DELIVER.
						</h1>
						<p
							className="text-secondary max-w-lg mx-auto animate-slide-in"
							style={{ animationDelay: '0.5s' }}
						>
							A real dossier produced by our research desk. Review each section below — then
							receive the complete PDF in your inbox.
						</p>
					</div>

					{/* Report header card */}
					<div
						className="bp-card p-6 md:p-8 animate-slide-in"
						style={{ animationDelay: '0.6s' }}
					>
						<div className="flex items-center justify-between mb-4">
							<div>
								<div className="font-mono text-[10px] text-dim tracking-[0.08em] uppercase mb-1">
									Bulwark Dossier · Confidential
								</div>
								<div className="font-display text-lg font-600 uppercase tracking-wider">{reportMeta.idea}</div>
							</div>
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 bg-signal animate-pulse-dot" />
								<span className="font-mono text-sm text-signal font-semibold">
									{reportMeta.viabilityScore}/100
								</span>
							</div>
						</div>

						<div className="h-px bg-border mb-4" />

						<div className="font-mono text-[9px] text-dim tracking-[0.08em] uppercase">
							Generated {reportMeta.date} · {reportMeta.pageCount} pages ·{' '}
							{reportMeta.sourceCount.toLocaleString()} sources · {reportMeta.agentCount}{' '}
							agents
						</div>
					</div>
				</div>
			</section>

			{/* Tabs + Content Panel */}
			<BlueprintSection number="01" title="SECTIONS">
				<div className="max-w-3xl">
					<div className="reveal">
						<ReportTabBar
							sections={reportSections}
							activeId={activeTab}
							onSelect={setActiveTab}
						/>
					</div>
					<div className="mt-6 reveal delay-1">
						<ReportSectionPanel section={activeSection} />
					</div>
				</div>
			</BlueprintSection>

			{/* Email Gate */}
			<ReportEmailGate />

			{/* Bottom CTA */}
			<Cta
				overline="// Your turn"
				title={
					<>
						READY TO COMMISSION
						<br />
						<span className="text-ghost">YOUR OWN RESEARCH?</span>
					</>
				}
				subtitle="Your first engagement is complimentary. Receive a Big 4-quality dossier within 24 hours — no commitment required."
				primaryLabel="Hire Us — It's Free"
				primaryHref="/#hero-input"
				secondaryLabel="View Engagements"
				secondaryHref="/pricing"
			/>
			<Footer />
		</div>
	)
}
