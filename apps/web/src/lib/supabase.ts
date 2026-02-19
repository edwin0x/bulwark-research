import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

let client: SupabaseClient<Database> | null = null

export function getSupabase(): SupabaseClient<Database> {
	if (client) return client

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables')
	}

	client = createClient<Database>(supabaseUrl, supabaseAnonKey)
	return client
}
