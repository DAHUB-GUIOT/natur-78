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
      attendees: {
        Row: {
          expectations: string | null
          id: string
          interest_community_tourism: boolean | null
          interest_cultural_tourism: boolean | null
          interest_ecotourism: boolean | null
          interest_slow_travel: boolean | null
          interest_workshops: boolean | null
          occupation: string | null
        }
        Insert: {
          expectations?: string | null
          id: string
          interest_community_tourism?: boolean | null
          interest_cultural_tourism?: boolean | null
          interest_ecotourism?: boolean | null
          interest_slow_travel?: boolean | null
          interest_workshops?: boolean | null
          occupation?: string | null
        }
        Update: {
          expectations?: string | null
          id?: string
          interest_community_tourism?: boolean | null
          interest_cultural_tourism?: boolean | null
          interest_ecotourism?: boolean | null
          interest_slow_travel?: boolean | null
          interest_workshops?: boolean | null
          occupation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendees_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      connections: {
        Row: {
          created_at: string
          id: string
          requested_id: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          requested_id: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          requested_id?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_requested_id_fkey"
            columns: ["requested_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ecosystem_entities: {
        Row: {
          certifications: string | null
          id: string
          org_type: string | null
          services_offered: string | null
          wants_seal: boolean | null
          years_operating: string | null
        }
        Insert: {
          certifications?: string | null
          id: string
          org_type?: string | null
          services_offered?: string | null
          wants_seal?: boolean | null
          years_operating?: string | null
        }
        Update: {
          certifications?: string | null
          id?: string
          org_type?: string | null
          services_offered?: string | null
          wants_seal?: boolean | null
          years_operating?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecosystem_entities_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          file_url: string | null
          id: string
          message_type: string | null
          read_by: Json | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          file_url?: string | null
          id?: string
          message_type?: string | null
          read_by?: Json | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          file_url?: string | null
          id?: string
          message_type?: string | null
          read_by?: Json | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          is_avatar: boolean | null
          is_banner: boolean | null
          profile_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_avatar?: boolean | null
          is_banner?: boolean | null
          profile_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_avatar?: boolean | null
          is_banner?: boolean | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_images_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          attendee_id: string | null
          cover_image_url: string | null
          created_at: string | null
          ecosystem_entity_id: string | null
          email: string
          expertise: string | null
          id: string
          interests_tags: string | null
          location: string
          name: string
          phone: string | null
          profile_bio: string | null
          profile_image_url: string | null
          referral: string
          sponsor_id: string | null
          startup_id: string | null
          subcategory: string | null
          updated_at: string | null
          user_category: string
          user_id: string | null
          website: string | null
        }
        Insert: {
          attendee_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          ecosystem_entity_id?: string | null
          email: string
          expertise?: string | null
          id: string
          interests_tags?: string | null
          location: string
          name: string
          phone?: string | null
          profile_bio?: string | null
          profile_image_url?: string | null
          referral: string
          sponsor_id?: string | null
          startup_id?: string | null
          subcategory?: string | null
          updated_at?: string | null
          user_category: string
          user_id?: string | null
          website?: string | null
        }
        Update: {
          attendee_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          ecosystem_entity_id?: string | null
          email?: string
          expertise?: string | null
          id?: string
          interests_tags?: string | null
          location?: string
          name?: string
          phone?: string | null
          profile_bio?: string | null
          profile_image_url?: string | null
          referral?: string
          sponsor_id?: string | null
          startup_id?: string | null
          subcategory?: string | null
          updated_at?: string | null
          user_category?: string
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_attendee_id_fkey"
            columns: ["attendee_id"]
            isOneToOne: false
            referencedRelation: "attendees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_ecosystem_entity_id_fkey"
            columns: ["ecosystem_entity_id"]
            isOneToOne: false
            referencedRelation: "ecosystem_entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          brand_exposure: boolean | null
          budget: string | null
          company_size: string | null
          id: string
          install_stand: boolean | null
          product_support: boolean | null
          proposal: string | null
          sponsor_activities: boolean | null
        }
        Insert: {
          brand_exposure?: boolean | null
          budget?: string | null
          company_size?: string | null
          id: string
          install_stand?: boolean | null
          product_support?: boolean | null
          proposal?: string | null
          sponsor_activities?: boolean | null
        }
        Update: {
          brand_exposure?: boolean | null
          budget?: string | null
          company_size?: string | null
          id?: string
          install_stand?: boolean | null
          product_support?: boolean | null
          proposal?: string | null
          sponsor_activities?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      startups: {
        Row: {
          founding_year: string | null
          id: string
          needs_funding: boolean | null
          needs_incubation: boolean | null
          needs_marketplace: boolean | null
          needs_networking: boolean | null
          needs_visibility: boolean | null
          problem_solved: string | null
          startup_name: string
          startup_stage: string | null
        }
        Insert: {
          founding_year?: string | null
          id: string
          needs_funding?: boolean | null
          needs_incubation?: boolean | null
          needs_marketplace?: boolean | null
          needs_networking?: boolean | null
          needs_visibility?: boolean | null
          problem_solved?: string | null
          startup_name: string
          startup_stage?: string | null
        }
        Update: {
          founding_year?: string | null
          id?: string
          needs_funding?: boolean | null
          needs_incubation?: boolean | null
          needs_marketplace?: boolean | null
          needs_networking?: boolean | null
          needs_visibility?: boolean | null
          problem_solved?: string | null
          startup_name?: string
          startup_stage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "startups_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      temp_registrations: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          generated_password: string
          id: string
          registration_data: Json
        }
        Insert: {
          created_at?: string
          email: string
          expires_at?: string
          generated_password: string
          id?: string
          registration_data: Json
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          generated_password?: string
          id?: string
          registration_data?: Json
        }
        Relationships: []
      }
      user_connections: {
        Row: {
          created_at: string
          id: string
          requested_id: string
          requester_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          requested_id: string
          requester_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          requested_id?: string
          requester_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_temp_registrations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_secure_password: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
