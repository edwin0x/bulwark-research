import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { EngagementListItem } from '~/components/engagement-list-item'
import { PortalHeader } from '~/components/portal-header'
import { useRequireAuth } from '~/hooks/use-require-auth'
import { getSupabase } from '~/lib/supabase'
import type { Database } from '~/lib/database.types'

export const Route = createFileRoute('/portal/')({
	head: () => ({
		meta: [
			{ title: 'Client Portal — Bulwark Research' },
			{
				name: 'description',
				content: 'Your Bulwark Research client portal — access dossiers, track engagements, and manage your account.',
			},
			{ property: 'og:title', content: 'Client Portal — Bulwark Research' },
		],
	}),
	component: PortalHomePage,
})

type Profile = Database['public']['Tables']['profiles']['Row']
type EngagementRow = Database['public']['Tables']['engagements']['Row']

function PortalHomePage() {
	const { session, loading: authLoading } = useRequireAuth()
	const [profile, setProfile] = useState<Pick<Profile, 'full_name' | 'role'> | null>(null)
	const [loading, setLoading] = useState(true)
	const [engagements, setEngagements] = useState<EngagementRow[]>([])

	useEffect(() => {
		if (!session) return

		const supabase = getSupabase()

		async function loadData() {
			const { data: profileData } = await supabase
				.from('profiles')
				.select('full_name, role')
				.eq('id', session!.user.id)
				.single()

			if (profileData) setProfile(profileData)

			const { data: rows } = await supabase
				.from('engagements')
				.select('id, idea_description, research_lens, status, created_at, user_id, target_market, known_competitors, specific_questions, geography_focus, updated_at')
				.eq('user_id', session!.user.id)
				.order('created_at', { ascending: false })
				.limit(10)

			if (rows) setEngagements(rows)
			setLoading(false)
		}

		loadData()
	}, [session])

	if (authLoading || loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-sm text-dim font-mono animate-pulse">Loading portal...</p>
			</div>
		)
	}

	return (
		<div className="relative min-h-screen flex flex-col px-6 py-12 overflow-hidden">
			<div className="relative z-10 w-full max-w-2xl mx-auto">
				<PortalHeader />

				{/* Welcome */}
				<div className="mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
					<h1 className="section-title text-3xl sm:text-4xl mb-2">
						Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
					</h1>
					<p className="text-sm text-secondary">
						{session?.user.email} &middot; {profile?.role}
					</p>
				</div>

				{/* Quick actions grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-0 mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
					<div className="bp-card p-6 flex flex-col gap-3">
						<span className="font-mono text-[10px] text-dim uppercase tracking-wider">01</span>
						<h3 className="font-display text-base font-700 uppercase tracking-wider">New Research</h3>
						<p className="text-xs text-dim leading-relaxed">
							Submit a startup idea for deep research analysis by our agent swarm.
						</p>
						<Link to="/portal/engagements/new" className="btn-signal px-5 py-2.5 text-xs mt-auto self-start">
							Start Engagement
						</Link>
					</div>
					<div className="bp-card p-6 flex flex-col gap-3">
						<span className="font-mono text-[10px] text-dim uppercase tracking-wider">02</span>
						<h3 className="font-display text-base font-700 uppercase tracking-wider">My Dossiers</h3>
						<p className="text-xs text-dim leading-relaxed">
							View and download your completed research dossiers.
						</p>
						<button type="button" className="btn-outline px-5 py-2.5 text-xs mt-auto self-start">
							View Dossiers
						</button>
					</div>
				</div>

				{/* Status */}
				<div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
					<div className="flex items-center justify-between mb-4">
						<h3 className="font-mono text-[10px] text-dim uppercase tracking-wider">Recent Engagements</h3>
					</div>
					{engagements.length === 0 ? (
						<div className="bp-card p-6 text-center py-8">
							<p className="text-sm text-dim">No engagements yet.</p>
							<p className="text-xs text-dim mt-1">Start your first research engagement above.</p>
						</div>
					) : (
						<div className="flex flex-col gap-2">
							{engagements.map((eng) => (
								<EngagementListItem
									key={eng.id}
									id={eng.id}
									ideaDescription={eng.idea_description}
									researchLens={eng.research_lens}
									status={eng.status}
									createdAt={eng.created_at}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
