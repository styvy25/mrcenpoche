export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string | null
          description: string
          icon: string | null
          id: string
          name: string
          points: number
        }
        Insert: {
          created_at?: string | null
          description: string
          icon?: string | null
          id?: string
          name: string
          points?: number
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string | null
          id?: string
          name?: string
          points?: number
        }
        Relationships: []
      }
      ai_context: {
        Row: {
          active: boolean | null
          auth_user_id: string | null
          context_data: Json
          context_type: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          auth_user_id?: string | null
          context_data: Json
          context_type: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          auth_user_id?: string | null
          context_data?: Json
          context_type?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_embeddings: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          embedding: string
          id: string
          metadata: Json | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          embedding: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          embedding?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      ai_feedback: {
        Row: {
          auth_user_id: string | null
          categories: string[] | null
          created_at: string | null
          feedback_text: string | null
          id: string
          rating: number | null
          response_id: string | null
        }
        Insert: {
          auth_user_id?: string | null
          categories?: string[] | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          rating?: number | null
          response_id?: string | null
        }
        Update: {
          auth_user_id?: string | null
          categories?: string[] | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          rating?: number | null
          response_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_feedback_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "ai_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_prompts: {
        Row: {
          category: string
          context_requirements: Json | null
          created_at: string | null
          id: string
          parameters: Json
          prompt_template: string
          updated_at: string | null
        }
        Insert: {
          category: string
          context_requirements?: Json | null
          created_at?: string | null
          id?: string
          parameters?: Json
          prompt_template: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          context_requirements?: Json | null
          created_at?: string | null
          id?: string
          parameters?: Json
          prompt_template?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_recommendations: {
        Row: {
          content: Json
          context_data: Json | null
          created_at: string | null
          id: string
          recommendation_type: string
          relevance_score: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: Json
          context_data?: Json | null
          created_at?: string | null
          id?: string
          recommendation_type: string
          relevance_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: Json
          context_data?: Json | null
          created_at?: string | null
          id?: string
          recommendation_type?: string
          relevance_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_responses: {
        Row: {
          auth_user_id: string | null
          context_used: Json | null
          created_at: string | null
          embedding: string | null
          id: string
          input_text: string
          parameters_used: Json | null
          prompt_id: string | null
          response_text: string
        }
        Insert: {
          auth_user_id?: string | null
          context_used?: Json | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          input_text: string
          parameters_used?: Json | null
          prompt_id?: string | null
          response_text: string
        }
        Update: {
          auth_user_id?: string | null
          context_used?: Json | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          input_text?: string
          parameters_used?: Json | null
          prompt_id?: string | null
          response_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_responses_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "ai_prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_training_data: {
        Row: {
          content: Json
          created_at: string | null
          data_type: string
          id: string
          source_reference: string | null
          updated_at: string | null
          validation_date: string | null
          validation_status: string
        }
        Insert: {
          content: Json
          created_at?: string | null
          data_type: string
          id?: string
          source_reference?: string | null
          updated_at?: string | null
          validation_date?: string | null
          validation_status: string
        }
        Update: {
          content?: Json
          created_at?: string | null
          data_type?: string
          id?: string
          source_reference?: string | null
          updated_at?: string | null
          validation_date?: string | null
          validation_status?: string
        }
        Relationships: []
      }
      api_integrations: {
        Row: {
          additional_data: Json | null
          api_key: string | null
          created_at: string | null
          id: string
          last_checked: string | null
          name: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          additional_data?: Json | null
          api_key?: string | null
          created_at?: string | null
          id?: string
          last_checked?: string | null
          name: string
          status: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          additional_data?: Json | null
          api_key?: string | null
          created_at?: string | null
          id?: string
          last_checked?: string | null
          name?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          key: string
          name: string
          service: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          key: string
          name: string
          service: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          key?: string
          name?: string
          service?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      api_keys_config: {
        Row: {
          created_at: string | null
          id: string
          perplexity_key: string | null
          stripe_key: string | null
          updated_at: string | null
          user_id: string
          youtube_key: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          perplexity_key?: string | null
          stripe_key?: string | null
          updated_at?: string | null
          user_id: string
          youtube_key?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          perplexity_key?: string | null
          stripe_key?: string | null
          updated_at?: string | null
          user_id?: string
          youtube_key?: string | null
        }
        Relationships: []
      }
      book_examples: {
        Row: {
          cover_image: string | null
          created_at: string
          description: string
          generation_source: string
          id: string
          language: string
          preview_content: Json | null
          title: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          description: string
          generation_source: string
          id?: string
          language?: string
          preview_content?: Json | null
          title: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          description?: string
          generation_source?: string
          id?: string
          language?: string
          preview_content?: Json | null
          title?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string | null
          embedding: string | null
          id: string
          message: string
          response: string
          session_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          message: string
          response: string
          session_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          message?: string
          response?: string
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_sessions: {
        Row: {
          context: Json
          created_at: string | null
          id: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context?: Json
          created_at?: string | null
          id?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context?: Json
          created_at?: string | null
          id?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cities: {
        Row: {
          area: number | null
          country_code: string
          created_at: string | null
          id: number
          name: string
          population: number | null
          updated_at: string | null
        }
        Insert: {
          area?: number | null
          country_code: string
          created_at?: string | null
          id?: never
          name: string
          population?: number | null
          updated_at?: string | null
        }
        Update: {
          area?: number | null
          country_code?: string
          created_at?: string | null
          id?: never
          name?: string
          population?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      conversation_contexts: {
        Row: {
          context_data: Json
          conversation_state: string
          created_at: string | null
          id: string
          last_question_id: string | null
          location_context: Json | null
          updated_at: string | null
          user_id: string | null
          user_preferences: Json | null
        }
        Insert: {
          context_data: Json
          conversation_state: string
          created_at?: string | null
          id?: string
          last_question_id?: string | null
          location_context?: Json | null
          updated_at?: string | null
          user_id?: string | null
          user_preferences?: Json | null
        }
        Update: {
          context_data?: Json
          conversation_state?: string
          created_at?: string | null
          id?: string
          last_question_id?: string | null
          location_context?: Json | null
          updated_at?: string | null
          user_id?: string | null
          user_preferences?: Json | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          created_at: string | null
          election_frequency: Json | null
          electoral_system: string
          id: string
          name: string
          registration_requirements: string[] | null
          special_requirements: string[] | null
          updated_at: string | null
          voting_age: number
          voting_methods: string[] | null
        }
        Insert: {
          code: string
          created_at?: string | null
          election_frequency?: Json | null
          electoral_system: string
          id?: string
          name: string
          registration_requirements?: string[] | null
          special_requirements?: string[] | null
          updated_at?: string | null
          voting_age: number
          voting_methods?: string[] | null
        }
        Update: {
          code?: string
          created_at?: string | null
          election_frequency?: Json | null
          electoral_system?: string
          id?: string
          name?: string
          registration_requirements?: string[] | null
          special_requirements?: string[] | null
          updated_at?: string | null
          voting_age?: number
          voting_methods?: string[] | null
        }
        Relationships: []
      }
      document_generation_history: {
        Row: {
          created_at: string | null
          document_id: string | null
          error_message: string | null
          generation_params: Json | null
          id: string
          success: boolean
          template_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          error_message?: string | null
          generation_params?: Json | null
          id?: string
          success: boolean
          template_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          error_message?: string | null
          generation_params?: Json | null
          id?: string
          success?: boolean
          template_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_generation_history_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "generated_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_templates: {
        Row: {
          ai_prompts: Json
          created_at: string | null
          description: string | null
          id: string
          name: string
          optional_fields: string[] | null
          required_fields: string[] | null
          template_structure: Json
          type: string
          updated_at: string | null
        }
        Insert: {
          ai_prompts: Json
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          optional_fields?: string[] | null
          required_fields?: string[] | null
          template_structure: Json
          type: string
          updated_at?: string | null
        }
        Update: {
          ai_prompts?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          optional_fields?: string[] | null
          required_fields?: string[] | null
          template_structure?: Json
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      electoral_codes: {
        Row: {
          applicable_regions: string[] | null
          code_text: string
          code_type: string
          country_code: string | null
          created_at: string | null
          id: string
          last_updated: string
          special_conditions: Json | null
          updated_at: string | null
          validity_period: unknown | null
        }
        Insert: {
          applicable_regions?: string[] | null
          code_text: string
          code_type: string
          country_code?: string | null
          created_at?: string | null
          id?: string
          last_updated: string
          special_conditions?: Json | null
          updated_at?: string | null
          validity_period?: unknown | null
        }
        Update: {
          applicable_regions?: string[] | null
          code_text?: string
          code_type?: string
          country_code?: string | null
          created_at?: string | null
          id?: string
          last_updated?: string
          special_conditions?: Json | null
          updated_at?: string | null
          validity_period?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "electoral_codes_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      electoral_districts: {
        Row: {
          accessibility_features: string[] | null
          country_code: string | null
          created_at: string | null
          district_code: string
          district_name: string
          geographic_data: Json | null
          id: string
          polling_stations: Json[] | null
          updated_at: string | null
          voter_capacity: number | null
        }
        Insert: {
          accessibility_features?: string[] | null
          country_code?: string | null
          created_at?: string | null
          district_code: string
          district_name: string
          geographic_data?: Json | null
          id?: string
          polling_stations?: Json[] | null
          updated_at?: string | null
          voter_capacity?: number | null
        }
        Update: {
          accessibility_features?: string[] | null
          country_code?: string | null
          created_at?: string | null
          district_code?: string
          district_name?: string
          geographic_data?: Json | null
          id?: string
          polling_stations?: Json[] | null
          updated_at?: string | null
          voter_capacity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "electoral_districts_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      electoral_faqs: {
        Row: {
          answer: string
          category: string
          context_tags: string[] | null
          country_code: string | null
          id: string
          last_updated: string | null
          question: string
          source_reference: string | null
        }
        Insert: {
          answer: string
          category: string
          context_tags?: string[] | null
          country_code?: string | null
          id?: string
          last_updated?: string | null
          question: string
          source_reference?: string | null
        }
        Update: {
          answer?: string
          category?: string
          context_tags?: string[] | null
          country_code?: string | null
          id?: string
          last_updated?: string | null
          question?: string
          source_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "electoral_faqs_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      electoral_info_subscriptions: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          location: Json
          notification_preferences: Json
          subscribed_events: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          location: Json
          notification_preferences: Json
          subscribed_events?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          location?: Json
          notification_preferences?: Json
          subscribed_events?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      electoral_knowledge: {
        Row: {
          content: Json
          country_code: string | null
          created_at: string | null
          id: string
          languages: string[] | null
          last_verified: string
          source_references: string[] | null
          topic: string
          updated_at: string | null
        }
        Insert: {
          content: Json
          country_code?: string | null
          created_at?: string | null
          id?: string
          languages?: string[] | null
          last_verified: string
          source_references?: string[] | null
          topic: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          country_code?: string | null
          created_at?: string | null
          id?: string
          languages?: string[] | null
          last_verified?: string
          source_references?: string[] | null
          topic?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "electoral_knowledge_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      electoral_questions: {
        Row: {
          category: string
          created_at: string | null
          id: string
          options: Json | null
          order_index: number
          question: string
          question_type: string
          required: boolean | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          options?: Json | null
          order_index: number
          question: string
          question_type: string
          required?: boolean | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          options?: Json | null
          order_index?: number
          question?: string
          question_type?: string
          required?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      electoral_recommendations: {
        Row: {
          created_at: string | null
          id: string
          pdf_url: string | null
          recommendations: Json
          user_response_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          pdf_url?: string | null
          recommendations: Json
          user_response_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pdf_url?: string | null
          recommendations?: Json
          user_response_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "electoral_recommendations_user_response_id_fkey"
            columns: ["user_response_id"]
            isOneToOne: false
            referencedRelation: "user_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      electoral_reminders: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          message: string
          reminder_date: string
          reminder_type: string
          sent_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          message: string
          reminder_date: string
          reminder_type: string
          sent_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          message?: string
          reminder_date?: string
          reminder_type?: string
          sent_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      electoral_statistics: {
        Row: {
          campaign_metrics: Json | null
          created_at: string | null
          election_date: string
          id: string
          leader_id: string | null
          regions_won: string[] | null
          total_votes: number | null
          vote_percentage: number | null
          voter_demographics: Json | null
          votes_obtained: number | null
        }
        Insert: {
          campaign_metrics?: Json | null
          created_at?: string | null
          election_date: string
          id?: string
          leader_id?: string | null
          regions_won?: string[] | null
          total_votes?: number | null
          vote_percentage?: number | null
          voter_demographics?: Json | null
          votes_obtained?: number | null
        }
        Update: {
          campaign_metrics?: Json | null
          created_at?: string | null
          election_date?: string
          id?: string
          leader_id?: string | null
          regions_won?: string[] | null
          total_votes?: number | null
          vote_percentage?: number | null
          voter_demographics?: Json | null
          votes_obtained?: number | null
        }
        Relationships: []
      }
      fraud_evidence_recordings: {
        Row: {
          alert_id: string
          audio_url: string | null
          created_at: string | null
          duration_seconds: number | null
          id: string
          user_id: string | null
          video_url: string | null
        }
        Insert: {
          alert_id: string
          audio_url?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          user_id?: string | null
          video_url?: string | null
        }
        Update: {
          alert_id?: string
          audio_url?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          user_id?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      generated_books: {
        Row: {
          book_content: Json | null
          created_at: string
          description: string | null
          generation_source: string
          id: string
          language: string
          source_data: Json | null
          title: string
          tone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          book_content?: Json | null
          created_at?: string
          description?: string | null
          generation_source: string
          id?: string
          language?: string
          source_data?: Json | null
          title: string
          tone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          book_content?: Json | null
          created_at?: string
          description?: string | null
          generation_source?: string
          id?: string
          language?: string
          source_data?: Json | null
          title?: string
          tone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      generated_documents: {
        Row: {
          content: Json
          created_at: string | null
          file_url: string | null
          id: string
          metadata: Json | null
          status: string
          template_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          status: string
          template_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          template_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_documents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      language_preferences: {
        Row: {
          created_at: string | null
          id: string
          primary_language: string
          region_specific_dialects: Json | null
          secondary_languages: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          primary_language: string
          region_specific_dialects?: Json | null
          secondary_languages?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          primary_language?: string
          region_specific_dialects?: Json | null
          secondary_languages?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      leader_achievements: {
        Row: {
          achievement_type: string
          created_at: string | null
          date_achieved: string | null
          description: string
          id: string
          impact_metrics: Json | null
          leader_id: string | null
          verification_sources: string[] | null
        }
        Insert: {
          achievement_type: string
          created_at?: string | null
          date_achieved?: string | null
          description: string
          id?: string
          impact_metrics?: Json | null
          leader_id?: string | null
          verification_sources?: string[] | null
        }
        Update: {
          achievement_type?: string
          created_at?: string | null
          date_achieved?: string | null
          description?: string
          id?: string
          impact_metrics?: Json | null
          leader_id?: string | null
          verification_sources?: string[] | null
        }
        Relationships: []
      }
      leader_ratings: {
        Row: {
          created_at: string | null
          id: string
          leader_id: string | null
          methodology: string | null
          performance_metrics: Json | null
          popularity_index: number | null
          rating_date: string
          sample_size: number | null
          trust_rating: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          leader_id?: string | null
          methodology?: string | null
          performance_metrics?: Json | null
          popularity_index?: number | null
          rating_date: string
          sample_size?: number | null
          trust_rating?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          leader_id?: string | null
          methodology?: string | null
          performance_metrics?: Json | null
          popularity_index?: number | null
          rating_date?: string
          sample_size?: number | null
          trust_rating?: number | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          media_type: string | null
          media_url: string | null
          user_avatar: string | null
          user_id: string | null
          user_name: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          media_type?: string | null
          media_url?: string | null
          user_avatar?: string | null
          user_id?: string | null
          user_name: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          media_type?: string | null
          media_url?: string | null
          user_avatar?: string | null
          user_id?: string | null
          user_name?: string
        }
        Relationships: []
      }
      mrc_content: {
        Row: {
          content_type: string
          created_at: string | null
          id: string
          indexed: boolean | null
          title: string
          url: string
        }
        Insert: {
          content_type: string
          created_at?: string | null
          id?: string
          indexed?: boolean | null
          title: string
          url: string
        }
        Update: {
          content_type?: string
          created_at?: string | null
          id?: string
          indexed?: boolean | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      openai_config: {
        Row: {
          api_key: string
          created_at: string | null
          id: string
          max_tokens: number
          model: string
          temperature: number
          updated_at: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          id?: string
          max_tokens?: number
          model?: string
          temperature?: number
          updated_at?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          id?: string
          max_tokens?: number
          model?: string
          temperature?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      opposition_leaders: {
        Row: {
          country_code: string | null
          created_at: string | null
          electoral_program: string[] | null
          full_name: string
          id: string
          key_positions: Json | null
          party_name: string
          position: string
          social_media: Json | null
          status: string
          un_recognition_date: string | null
          updated_at: string | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          electoral_program?: string[] | null
          full_name: string
          id?: string
          key_positions?: Json | null
          party_name: string
          position: string
          social_media?: Json | null
          status: string
          un_recognition_date?: string | null
          updated_at?: string | null
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          electoral_program?: string[] | null
          full_name?: string
          id?: string
          key_positions?: Json | null
          party_name?: string
          position?: string
          social_media?: Json | null
          status?: string
          un_recognition_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opposition_leaders_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      pdf_documents: {
        Row: {
          content: Json
          created_at: string | null
          document_type: string
          id: string
          pdf_url: string | null
          status: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          document_type: string
          id?: string
          pdf_url?: string | null
          status?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          document_type?: string
          id?: string
          pdf_url?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      pdf_generation_logs: {
        Row: {
          created_at: string | null
          error_details: string | null
          generated_sections: string[] | null
          generation_status: string
          id: string
          template_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_details?: string | null
          generated_sections?: string[] | null
          generation_status: string
          id?: string
          template_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_details?: string | null
          generated_sections?: string[] | null
          generation_status?: string
          id?: string
          template_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pdf_generation_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "pdf_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_sections: {
        Row: {
          content_template: Json
          created_at: string | null
          id: string
          layout_options: Json | null
          optional_data_fields: string[] | null
          required_data_fields: string[] | null
          section_name: string
          updated_at: string | null
        }
        Insert: {
          content_template: Json
          created_at?: string | null
          id?: string
          layout_options?: Json | null
          optional_data_fields?: string[] | null
          required_data_fields?: string[] | null
          section_name: string
          updated_at?: string | null
        }
        Update: {
          content_template?: Json
          created_at?: string | null
          id?: string
          layout_options?: Json | null
          optional_data_fields?: string[] | null
          required_data_fields?: string[] | null
          section_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pdf_templates: {
        Row: {
          created_at: string | null
          footer_template: Json
          header_template: Json
          id: string
          language: string
          section_layouts: Json
          styling_options: Json | null
          template_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          footer_template: Json
          header_template: Json
          id?: string
          language: string
          section_layouts: Json
          styling_options?: Json | null
          template_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          footer_template?: Json
          header_template?: Json
          id?: string
          language?: string
          section_layouts?: Json
          styling_options?: Json | null
          template_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      political_parties: {
        Row: {
          country_code: string | null
          created_at: string | null
          electoral_history: Json | null
          founding_date: string | null
          id: string
          ideology: string[] | null
          member_count: number | null
          name: string
          regional_presence: Json | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          electoral_history?: Json | null
          founding_date?: string | null
          id?: string
          ideology?: string[] | null
          member_count?: number | null
          name: string
          regional_presence?: Json | null
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          electoral_history?: Json | null
          founding_date?: string | null
          id?: string
          ideology?: string[] | null
          member_count?: number | null
          name?: string
          regional_presence?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "political_parties_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      polling_stations: {
        Row: {
          accessibility_features: string[] | null
          address: string
          capacity: number | null
          city: string
          contact_info: Json | null
          country_code: string | null
          created_at: string | null
          id: string
          location: Json
          name: string
          opening_hours: Json | null
          postal_code: string | null
          updated_at: string | null
        }
        Insert: {
          accessibility_features?: string[] | null
          address: string
          capacity?: number | null
          city: string
          contact_info?: Json | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          location: Json
          name: string
          opening_hours?: Json | null
          postal_code?: string | null
          updated_at?: string | null
        }
        Update: {
          accessibility_features?: string[] | null
          address?: string
          capacity?: number | null
          city?: string
          contact_info?: Json | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          location?: Json
          name?: string
          opening_hours?: Json | null
          postal_code?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "polling_stations_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email_notifications: boolean | null
          full_name: string | null
          id: string
          two_factor_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email_notifications?: boolean | null
          full_name?: string | null
          id: string
          two_factor_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email_notifications?: boolean | null
          full_name?: string | null
          id?: string
          two_factor_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          category_id: string | null
          completed_at: string | null
          completion_time: unknown | null
          correct_answers: number
          id: string
          score: number
          started_at: string
          total_questions: number
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          completed_at?: string | null
          completion_time?: unknown | null
          correct_answers?: number
          id?: string
          score?: number
          started_at?: string
          total_questions: number
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          completed_at?: string | null
          completion_time?: unknown | null
          correct_answers?: number
          id?: string
          score?: number
          started_at?: string
          total_questions?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "quiz_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_categories: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_level: string
          icon: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty_level: string
          icon?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      quiz_categories_audit: {
        Row: {
          audit_date: string | null
          auditor: string
          category_id: string | null
          changes_applied: boolean | null
          current_state: Json | null
          id: string
          previous_state: Json | null
          recommendations: string[] | null
        }
        Insert: {
          audit_date?: string | null
          auditor: string
          category_id?: string | null
          changes_applied?: boolean | null
          current_state?: Json | null
          id?: string
          previous_state?: Json | null
          recommendations?: string[] | null
        }
        Update: {
          audit_date?: string | null
          auditor?: string
          category_id?: string | null
          changes_applied?: boolean | null
          current_state?: Json | null
          id?: string
          previous_state?: Json | null
          recommendations?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_categories_audit_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "quiz_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_leaderboard: {
        Row: {
          average_score: number | null
          category_id: string | null
          created_at: string | null
          highest_streak: number | null
          id: string
          last_quiz_date: string | null
          quizzes_completed: number
          total_score: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          average_score?: number | null
          category_id?: string | null
          created_at?: string | null
          highest_streak?: number | null
          id?: string
          last_quiz_date?: string | null
          quizzes_completed?: number
          total_score?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          average_score?: number | null
          category_id?: string | null
          created_at?: string | null
          highest_streak?: number | null
          id?: string
          last_quiz_date?: string | null
          quizzes_completed?: number
          total_score?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_leaderboard_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "quiz_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          active: boolean | null
          category_id: string | null
          correct_answer: string
          country_code: string | null
          created_at: string | null
          difficulty_level: string
          explanation: string
          id: string
          options: Json
          points: number
          question_text: string
          source_reference: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category_id?: string | null
          correct_answer: string
          country_code?: string | null
          created_at?: string | null
          difficulty_level: string
          explanation: string
          id?: string
          options: Json
          points?: number
          question_text: string
          source_reference?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category_id?: string | null
          correct_answer?: string
          country_code?: string | null
          created_at?: string | null
          difficulty_level?: string
          explanation?: string
          id?: string
          options?: Json
          points?: number
          question_text?: string
          source_reference?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "quiz_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_questions_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      quiz_questions_audit: {
        Row: {
          accuracy_score: number | null
          audit_date: string | null
          auditor: string
          category_id: string | null
          changes_applied: boolean | null
          difficulty_assessment: string | null
          id: string
          improvement_suggestions: string[] | null
          question_id: string | null
          relevance_score: number | null
        }
        Insert: {
          accuracy_score?: number | null
          audit_date?: string | null
          auditor: string
          category_id?: string | null
          changes_applied?: boolean | null
          difficulty_assessment?: string | null
          id?: string
          improvement_suggestions?: string[] | null
          question_id?: string | null
          relevance_score?: number | null
        }
        Update: {
          accuracy_score?: number | null
          audit_date?: string | null
          auditor?: string
          category_id?: string | null
          changes_applied?: boolean | null
          difficulty_assessment?: string | null
          id?: string
          improvement_suggestions?: string[] | null
          question_id?: string | null
          relevance_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_audit_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "quiz_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_questions_audit_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_responses: {
        Row: {
          attempt_id: string | null
          created_at: string | null
          id: string
          is_correct: boolean
          question_id: string | null
          response_time: unknown | null
          user_answer: string
        }
        Insert: {
          attempt_id?: string | null
          created_at?: string | null
          id?: string
          is_correct: boolean
          question_id?: string | null
          response_time?: unknown | null
          user_answer: string
        }
        Update: {
          attempt_id?: string | null
          created_at?: string | null
          id?: string
          is_correct?: boolean
          question_id?: string | null
          response_time?: unknown | null
          user_answer?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_responses_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      route_ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          route_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          route_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          route_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "route_ratings_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      route_stops: {
        Row: {
          arrival_time: string | null
          created_at: string | null
          departure_time: string | null
          id: string
          location: Json
          route_id: string | null
          stop_order: number
        }
        Insert: {
          arrival_time?: string | null
          created_at?: string | null
          departure_time?: string | null
          id?: string
          location: Json
          route_id?: string | null
          stop_order: number
        }
        Update: {
          arrival_time?: string | null
          created_at?: string | null
          departure_time?: string | null
          id?: string
          location?: Json
          route_id?: string | null
          stop_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "route_stops_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      routes: {
        Row: {
          available_seats: number
          created_at: string | null
          departure_date: string
          departure_time: string
          driver_id: string | null
          from_location: Json
          id: string
          price: number | null
          route_preferences: Json | null
          status: string
          to_location: Json
          updated_at: string | null
          vehicle_info: Json | null
        }
        Insert: {
          available_seats: number
          created_at?: string | null
          departure_date: string
          departure_time: string
          driver_id?: string | null
          from_location: Json
          id?: string
          price?: number | null
          route_preferences?: Json | null
          status?: string
          to_location: Json
          updated_at?: string | null
          vehicle_info?: Json | null
        }
        Update: {
          available_seats?: number
          created_at?: string | null
          departure_date?: string
          departure_time?: string
          driver_id?: string | null
          from_location?: Json
          id?: string
          price?: number | null
          route_preferences?: Json | null
          status?: string
          to_location?: Json
          updated_at?: string | null
          vehicle_info?: Json | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          description: string | null
          features: Json
          id: string
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      ui_settings: {
        Row: {
          component_name: string
          created_at: string
          id: string
          is_visible: boolean
          style_options: Json
          updated_at: string
        }
        Insert: {
          component_name: string
          created_at?: string
          id?: string
          is_visible?: boolean
          style_options?: Json
          updated_at?: string
        }
        Update: {
          component_name?: string
          created_at?: string
          id?: string
          is_visible?: boolean
          style_options?: Json
          updated_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          completed: boolean
          completed_at: string | null
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interactions: {
        Row: {
          context_data: Json | null
          created_at: string | null
          feedback_score: number | null
          id: string
          interaction_type: string
          question: string | null
          response: string | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          context_data?: Json | null
          created_at?: string | null
          feedback_score?: number | null
          id?: string
          interaction_type: string
          question?: string | null
          response?: string | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          context_data?: Json | null
          created_at?: string | null
          feedback_score?: number | null
          id?: string
          interaction_type?: string
          question?: string | null
          response?: string | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          notification_settings: Json
          preferences: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_settings?: Json
          preferences?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_settings?: Json
          preferences?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_responses: {
        Row: {
          country_code: string | null
          created_at: string | null
          id: string
          responses: Json
          user_id: string | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          id?: string
          responses: Json
          user_id?: string | null
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          id?: string
          responses?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_responses_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          features: Json
          id: string
          is_active: boolean
          limits: Json
          plan_type: string
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          features: Json
          id?: string
          is_active?: boolean
          limits: Json
          plan_type?: string
          start_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          features?: Json
          id?: string
          is_active?: boolean
          limits?: Json
          plan_type?: string
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      voter_requirements: {
        Row: {
          country_code: string | null
          created_at: string | null
          district_id: string | null
          exceptions: Json | null
          id: string
          requirement_details: Json
          requirement_type: string
          updated_at: string | null
          verification_process: string[] | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          district_id?: string | null
          exceptions?: Json | null
          id?: string
          requirement_details: Json
          requirement_type: string
          updated_at?: string | null
          verification_process?: string[] | null
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          district_id?: string | null
          exceptions?: Json | null
          id?: string
          requirement_details?: Json
          requirement_type?: string
          updated_at?: string | null
          verification_process?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "voter_requirements_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "voter_requirements_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "electoral_districts"
            referencedColumns: ["id"]
          },
        ]
      }
      voting_trends: {
        Row: {
          country_code: string | null
          created_at: string | null
          demographic_data: Json | null
          id: string
          key_issues: string[] | null
          political_alignment: string | null
          response_analysis: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          demographic_data?: Json | null
          id?: string
          key_issues?: string[] | null
          political_alignment?: string | null
          response_analysis?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          demographic_data?: Json | null
          id?: string
          key_issues?: string[] | null
          political_alignment?: string | null
          response_analysis?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voting_trends_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      world_leaders: {
        Row: {
          approval_ratings: Json | null
          country_code: string | null
          created_at: string | null
          electoral_history: Json | null
          full_name: string
          id: string
          international_relations: Json | null
          key_policies: Json | null
          mandate_end: string | null
          mandate_start: string | null
          party_affiliation: string | null
          position: string
          updated_at: string | null
        }
        Insert: {
          approval_ratings?: Json | null
          country_code?: string | null
          created_at?: string | null
          electoral_history?: Json | null
          full_name: string
          id?: string
          international_relations?: Json | null
          key_policies?: Json | null
          mandate_end?: string | null
          mandate_start?: string | null
          party_affiliation?: string | null
          position: string
          updated_at?: string | null
        }
        Update: {
          approval_ratings?: Json | null
          country_code?: string | null
          created_at?: string | null
          electoral_history?: Json | null
          full_name?: string
          id?: string
          international_relations?: Json | null
          key_policies?: Json | null
          mandate_end?: string | null
          mandate_start?: string | null
          party_affiliation?: string | null
          position?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "world_leaders_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      analyze_ai_feedback: {
        Args: {
          p_start_date: string
          p_end_date: string
        }
        Returns: Json
      }
      analyze_leader_performance: {
        Args: {
          p_leader_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: Json
      }
      analyze_quiz_quality: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      analyze_voting_trends: {
        Args: {
          user_responses: Json
          country_code: string
        }
        Returns: Json
      }
      audit_quiz_category: {
        Args: {
          p_category_id: string
          p_auditor: string
        }
        Returns: string
      }
      audit_quiz_question: {
        Args: {
          p_question_id: string
          p_auditor: string
        }
        Returns: string
      }
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      bytea_to_text: {
        Args: {
          data: string
        }
        Returns: string
      }
      calculate_quiz_score: {
        Args: {
          p_attempt_id: string
        }
        Returns: number
      }
      can_generate_pdf: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      cleanup_old_chat_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_generated_articles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      compare_leaders: {
        Args: {
          p_country_code: string
          p_reference_date?: string
        }
        Returns: Json
      }
      create_route: {
        Args: {
          p_driver_id: string
          p_from_location: Json
          p_to_location: Json
          p_departure_date: string
          p_departure_time: string
          p_available_seats: number
          p_price: number
          p_stops?: Json[]
          p_preferences?: Json
        }
        Returns: string
      }
      find_matching_routes: {
        Args: {
          p_from_location: Json
          p_to_location: Json
          p_date: string
          p_time: string
          p_seats_needed?: number
          p_max_distance_km?: number
        }
        Returns: {
          route_id: string
          driver_id: string
          departure_date: string
          departure_time: string
          available_seats: number
          distance_km: number
          price: number
          driver_rating: number
        }[]
      }
      find_nearest_polling_stations: {
        Args: {
          p_latitude: number
          p_longitude: number
          p_radius_km?: number
          p_limit?: number
        }
        Returns: {
          id: string
          name: string
          address: string
          distance_km: number
          accessibility_features: string[]
          opening_hours: Json
        }[]
      }
      generate_chat_response: {
        Args: {
          p_message: string
          p_user_id: string
          p_context: Json
        }
        Returns: string
      }
      generate_document_content: {
        Args: {
          p_user_id: string
          p_template_id: string
          p_input_data: Json
        }
        Returns: Json
      }
      generate_electoral_recommendations:
        | {
            Args: {
              p_user_id: string
              p_context: Json
            }
            Returns: Json
          }
        | {
            Args: {
              p_user_id: string
              p_country_code: string
              p_responses: Json
            }
            Returns: Json
          }
      generate_electoral_reminders: {
        Args: {
          p_user_id: string
          p_country_code: string
        }
        Returns: undefined
      }
      generate_enhanced_pdf_content: {
        Args: {
          p_user_id: string
          p_template_name: string
          p_language?: string
        }
        Returns: Json
      }
      generate_news_articles: {
        Args: {
          p_country_code: string
          p_electoral_codes: Json
          p_leaders: Json
        }
        Returns: Json[]
      }
      generate_news_content: {
        Args: {
          p_country_code: string
          p_count?: number
        }
        Returns: Json[]
      }
      generate_pdf_document: {
        Args: {
          p_user_id: string
          p_document_type: string
          p_title: string
          p_content: Json
        }
        Returns: string
      }
      generate_section_content: {
        Args: {
          section: Json
          input_data: Json
          ai_prompts: Json
          user_context: Json
        }
        Returns: Json
      }
      get_contextual_response: {
        Args: {
          p_user_id: string
          p_category: string
          p_pattern: string
          p_language?: string
        }
        Returns: Json
      }
      get_openai_key: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_openai_response: {
        Args: {
          p_prompt: string
          p_context?: Json
          p_max_tokens?: number
          p_temperature?: number
        }
        Returns: string
      }
      get_random_quiz_questions: {
        Args: {
          p_category_id: string
          p_difficulty_level?: string
          p_count?: number
        }
        Returns: {
          active: boolean | null
          category_id: string | null
          correct_answer: string
          country_code: string | null
          created_at: string | null
          difficulty_level: string
          explanation: string
          id: string
          options: Json
          points: number
          question_text: string
          source_reference: string | null
          updated_at: string | null
        }[]
      }
      get_relevant_electoral_codes: {
        Args: {
          p_user_id: string
          p_country_code: string
        }
        Returns: Json
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      increment_pdf_generations: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      start_chat_session: {
        Args: {
          p_user_id: string
          p_initial_context?: Json
        }
        Returns: string
      }
      text_to_bytea: {
        Args: {
          data: string
        }
        Returns: string
      }
      update_chat_context: {
        Args: {
          p_session_id: string
          p_context_update: Json
        }
        Returns: undefined
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
