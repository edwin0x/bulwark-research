import { Link, useNavigate } from '@tanstack/react-router'
import { BulwarkIcon } from './bulwark-icon'
import { getSupabase } from '~/lib/supabase'

export function PortalHeader() {
	const navigate = useNavigate()

	async function handleSignOut() {
		await getSupabase().auth.signOut()
		navigate({ to: '/' })
	}

	return (
		<div className="flex items-center justify-between mb-12 animate-fade-in">
			<Link to="/" className="flex items-center gap-2.5 group">
				<BulwarkIcon className="w-7 h-7" />
				<span
					className="text-[18px] tracking-[0.04em] uppercase leading-none"
					style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700 }}
				>
					Bulwark{' '}
					<span
						className="text-dim"
						style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400, letterSpacing: '0.08em' }}
					>
						Research
					</span>
				</span>
			</Link>
			<button
				type="button"
				onClick={handleSignOut}
				className="text-xs text-dim hover:text-signal font-mono uppercase tracking-wider transition-colors"
			>
				Sign out
			</button>
		</div>
	)
}
