import { PostHogProvider as PHProvider, usePostHog } from '@posthog/react'
import { useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'

/**
 * Tracks SPA route changes as PostHog $pageview events.
 * PostHog's automatic pageview only fires on full page loads —
 * TanStack Router navigations are client-side and need manual capture.
 */
function PostHogPageviewTracker() {
	const posthog = usePostHog()
	const pathname = useRouterState({ select: (s) => s.location.pathname })
	const searchStr = useRouterState({ select: (s) => s.location.searchStr })

	useEffect(() => {
		if (posthog) {
			posthog.capture('$pageview', {
				$current_url: window.location.href,
			})
		}
	}, [pathname, searchStr, posthog])

	return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	const key = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
	const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

	// Don't render the provider if env vars are missing (e.g. during SSR or misconfigured builds)
	if (!key || typeof window === 'undefined') {
		return <>{children}</>
	}

	return (
		<PHProvider
			apiKey={key}
			options={{
				api_host: host,
				defaults: '2026-01-30',
				person_profiles: 'always',
				capture_pageview: false, // We handle this manually via PostHogPageviewTracker
				capture_pageleave: true,
				capture_exceptions: true,
			}}
		>
			<PostHogPageviewTracker />
			{children}
		</PHProvider>
	)
}
