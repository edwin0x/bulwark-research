import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
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

			{/* Hero — Report Header Card */}
			<section className="relative pt-40 pb-16 px-6 overflow-hidden">
				<div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vermillion/5 rounded-full blur-[160px] pointer-events-none" />

				<div className="relative z-10 max-w-3xl mx-auto">
					<div className="text-center mb-12">
						<div className="overline-divider max-w-xs mx-auto mb-4 animate-fade-in">
							Sample Report
						</div>
						<h1
							className="section-title text-3xl sm:text-4xl md:text-5xl mb-4 animate-fade-up"
							style={{ animationDelay: '0.1s' }}
						>
							See what we deliver.
						</h1>
						<p
							className="text-muted max-w-lg mx-auto animate-fade-up"
							style={{ animationDelay: '0.2s' }}
						>
							A real dossier produced by our research desk. Review each section below — then
							receive the complete PDF in your inbox.
						</p>
					</div>

					{/* Report header card */}
					<div
						className="report-glow rounded-2xl border border-ink-border bg-ink-light/80 p-6 md:p-8 animate-fade-up"
						style={{ animationDelay: '0.3s' }}
					>
						<div className="flex items-center justify-between mb-4">
							<div>
								<div className="font-mono text-[10px] text-dim tracking-widest uppercase mb-1">
									Bulwark Dossier · Confidential
								</div>
								<div className="font-serif text-xl font-semibold">{reportMeta.idea}</div>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-emerald animate-pulse-dot" />
								<span className="font-mono text-sm text-emerald font-semibold">
									{reportMeta.viabilityScore}/100
								</span>
							</div>
						</div>

						<div className="h-px bg-ink-border mb-4" />

						<div className="font-mono text-[9px] text-dim tracking-widest uppercase">
							Generated {reportMeta.date} · {reportMeta.pageCount} pages ·{' '}
							{reportMeta.sourceCount.toLocaleString()} sources · {reportMeta.agentCount}{' '}
							agents
						</div>
					</div>
				</div>
			</section>

			{/* Tabs + Content Panel */}
			<section className="relative py-12 px-6">
				<div className="max-w-3xl mx-auto">
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
			</section>

			{/* Email Gate */}
			<ReportEmailGate />

			{/* Bottom CTA */}
			<Cta
				overline="Your Turn"
				title={
					<>
						Ready to commission{' '}
						<span className="italic font-accent text-gradient-warm">your own research?</span>
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
