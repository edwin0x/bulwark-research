import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getSupabase } from '~/lib/supabase'
import type { Session } from '@supabase/supabase-js'

export function useRequireAuth() {
	const navigate = useNavigate()
	const [session, setSession] = useState<Session | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const supabase = getSupabase()
		supabase.auth.getSession().then(({ data: { session: s } }) => {
			if (!s) {
				navigate({ to: '/portal/sign-in' })
				return
			}
			setSession(s)
			setLoading(false)
		})
	}, [navigate])

	return { session, loading }
}
