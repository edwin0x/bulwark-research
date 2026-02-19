export type EngagementStatus = 'submitted' | 'researching' | 'analyzing' | 'complete'

export type ResearchLens =
	| 'bootstrapper'
	| 'vc_scale'
	| 'lifestyle'
	| 'side_project'
	| 'agency_productized'
	| 'open_source'

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string
					full_name: string
					role: string
					created_at: string
				}
				Insert: {
					id: string
					full_name: string
					role: string
					created_at?: string
				}
				Update: {
					id?: string
					full_name?: string
					role?: string
					created_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey'
						columns: ['id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
			engagements: {
				Row: {
					id: string
					user_id: string
					idea_description: string
					research_lens: ResearchLens
					target_market: string | null
					known_competitors: string | null
					specific_questions: string | null
					geography_focus: string | null
					status: EngagementStatus
					created_at: string
					updated_at: string
				}
				Insert: {
					id?: string
					user_id: string
					idea_description: string
					research_lens: ResearchLens
					target_market?: string | null
					known_competitors?: string | null
					specific_questions?: string | null
					geography_focus?: string | null
					status?: EngagementStatus
					created_at?: string
					updated_at?: string
				}
				Update: {
					id?: string
					user_id?: string
					idea_description?: string
					research_lens?: ResearchLens
					target_market?: string | null
					known_competitors?: string | null
					specific_questions?: string | null
					geography_focus?: string | null
					status?: EngagementStatus
					created_at?: string
					updated_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'engagements_user_id_fkey'
						columns: ['user_id']
						isOneToOne: false
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
		}
		Views: Record<string, never>
		Functions: Record<string, never>
		Enums: {
			engagement_status: EngagementStatus
			research_lens: ResearchLens
		}
	}
}
