import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getSupabase } from '~/lib/supabase'

export const Route = createFileRoute('/portal/callback')({
	component: CallbackPage,
})

function CallbackPage() {
	const navigate = useNavigate()
	const [error, setError] = useState('')

	useEffect(() => {
		const hashParams = new URLSearchParams(window.location.hash.substring(1))
		const errorDescription = hashParams.get('error_description')
		if (errorDescription) {
			setError(errorDescription)
			return
		}

		const supabase = getSupabase()
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN' && session) {
				subscription.unsubscribe()
				navigate({ to: '/portal' })
			}
		})

		// Check if token exchange already completed before listener was set up
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) {
				subscription.unsubscribe()
				navigate({ to: '/portal' })
			}
		})

		return () => subscription.unsubscribe()
	}, [navigate])

	if (error) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center px-6">
				<div className="w-full max-w-sm text-center">
					<div className="mb-6 p-4 border border-signal/30 bg-signal-bg text-signal text-sm font-mono">
						{error}
					</div>
					<Link to="/portal/onboarding" className="text-sm text-ink hover:text-signal transition-colors">
						Try signing up again
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<p className="text-sm text-dim font-mono animate-pulse">Verifying your account...</p>
		</div>
	)
}
