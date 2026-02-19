import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { EngagementStatusTracker } from '~/components/engagement-status-tracker'
import { PortalHeader } from '~/components/portal-header'
import { getLensLabel } from '~/data/research-lenses'
import { useRequireAuth } from '~/hooks/use-require-auth'
import { getSupabase } from '~/lib/supabase'
import type { Database } from '~/lib/database.types'

export const Route = createFileRoute('/portal/engagements/$id')({
	head: () => ({
		meta: [
			{ title: 'Engagement — Bulwark Research' },
			{ property: 'og:title', content: 'Engagement — Bulwark Research' },
		],
	}),
	component: EngagementDetailPage,
})

type Engagement = Database['public']['Tables']['engagements']['Row']

function EngagementDetailPage() {
	const { id } = Route.useParams()
	const { session, loading: authLoading } = useRequireAuth()
	const [engagement, setEngagement] = useState<Engagement | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!session) return

		const supabase = getSupabase()

		async function load() {
			const { data } = await supabase
				.from('engagements')
				.select('*')
				.eq('id', id)
				.eq('user_id', session!.user.id)
				.single()

			if (data) setEngagement(data as Engagement)
			setLoading(false)
		}
		load()
	}, [id, session])

	if (authLoading || loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-sm text-dim font-mono animate-pulse">Loading engagement...</p>
			</div>
		)
	}

	if (!engagement) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center px-6 gap-4">
				<p className="text-sm text-dim">Engagement not found.</p>
				<Link to="/portal" className="text-xs text-ink hover:text-signal transition-colors">
					&larr; Back to portal
				</Link>
			</div>
		)
	}

	return (
		<div className="relative min-h-screen flex flex-col px-6 py-12 overflow-hidden">
			<div className="relative z-10 w-full max-w-2xl mx-auto">
				<PortalHeader />

				{/* Back link */}
				<div className="mb-6 animate-fade-in">
					<Link to="/portal" className="text-xs text-dim hover:text-secondary font-mono uppercase tracking-wider transition-colors">
						&larr; Back to portal
					</Link>
				</div>

				{/* Status tracker */}
				<div className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
					<EngagementStatusTracker status={engagement.status} />
				</div>

				{/* Engagement details */}
				<div className="bp-card p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
					<div className="flex items-center justify-between mb-6">
						<span className="inline-block font-mono text-[10px] uppercase tracking-wider border border-signal/30 text-signal px-2 py-0.5">
							{getLensLabel(engagement.research_lens)}
						</span>
						<span className="font-mono text-[9px] text-dim">
							{new Date(engagement.created_at).toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}
						</span>
					</div>

					<div className="flex flex-col gap-5">
						<div>
							<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
								Idea Description
							</span>
							<p className="text-sm text-ink whitespace-pre-wrap leading-relaxed">
								{engagement.idea_description}
							</p>
						</div>

						{engagement.target_market && (
							<div>
								<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
									Target Market
								</span>
								<p className="text-sm text-ink">{engagement.target_market}</p>
							</div>
						)}

						{engagement.known_competitors && (
							<div>
								<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
									Known Competitors
								</span>
								<p className="text-sm text-ink">{engagement.known_competitors}</p>
							</div>
						)}

						{engagement.specific_questions && (
							<div>
								<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
									Specific Questions
								</span>
								<p className="text-sm text-ink whitespace-pre-wrap">{engagement.specific_questions}</p>
							</div>
						)}

						{engagement.geography_focus && (
							<div>
								<span className="block font-mono text-[10px] text-dim uppercase tracking-wider mb-1">
									Geography Focus
								</span>
								<p className="text-sm text-ink">{engagement.geography_focus}</p>
							</div>
						)}
					</div>
				</div>

				{/* Dossier placeholder */}
				<div className="bp-card p-6 mt-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
					<h3 className="font-mono text-[10px] text-dim uppercase tracking-wider mb-4">
						Research Dossier
					</h3>
					<div className="text-center py-8">
						<p className="text-sm text-dim">Your research dossier will appear here when ready.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
