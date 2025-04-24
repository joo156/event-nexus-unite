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
      events: {
        Row: {
          attendees: number | null
          availablespots: number | null
          created_at: string | null
          date: string
          description: string
          featured: boolean | null
          id: number
          image: string
          ispaid: boolean
          learningpoints: string[] | null
          location: string
          price: number | null
          tags: string[]
          time: string
          title: string
          visible: boolean
        }
        Insert: {
          attendees?: number | null
          availablespots?: number | null
          created_at?: string | null
          date: string
          description: string
          featured?: boolean | null
          id?: number
          image: string
          ispaid?: boolean
          learningpoints?: string[] | null
          location: string
          price?: number | null
          tags?: string[]
          time: string
          title: string
          visible?: boolean
        }
        Update: {
          attendees?: number | null
          availablespots?: number | null
          created_at?: string | null
          date?: string
          description?: string
          featured?: boolean | null
          id?: number
          image?: string
          ispaid?: boolean
          learningpoints?: string[] | null
          location?: string
          price?: number | null
          tags?: string[]
          time?: string
          title?: string
          visible?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string | null
          id: string
          name: string | null
          role: string | null
        }
        Insert: {
          avatar?: string | null
          id: string
          name?: string | null
          role?: string | null
        }
        Update: {
          avatar?: string | null
          id?: string
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string | null
          event_id: number
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: number
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: number
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          description: string
          event_id: number | null
          id: string
          speaker_image: string | null
          speaker_name: string | null
          time: string
          title: string
        }
        Insert: {
          description: string
          event_id?: number | null
          id?: string
          speaker_image?: string | null
          speaker_name?: string | null
          time: string
          title: string
        }
        Update: {
          description?: string
          event_id?: number | null
          id?: string
          speaker_image?: string | null
          speaker_name?: string | null
          time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      speaker_proposals: {
        Row: {
          bio: string
          created_at: string | null
          email: string
          id: string
          is_read: boolean | null
          name: string
          social_links: Json | null
        }
        Insert: {
          bio: string
          created_at?: string | null
          email: string
          id?: string
          is_read?: boolean | null
          name: string
          social_links?: Json | null
        }
        Update: {
          bio?: string
          created_at?: string | null
          email?: string
          id?: string
          is_read?: boolean | null
          name?: string
          social_links?: Json | null
        }
        Relationships: []
      }
      speakers: {
        Row: {
          bio: string
          event_id: number | null
          id: string
          image: string
          name: string
          title: string
        }
        Insert: {
          bio: string
          event_id?: number | null
          id?: string
          image: string
          name: string
          title: string
        }
        Update: {
          bio?: string
          event_id?: number | null
          id?: string
          image?: string
          name?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "speakers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_packages: {
        Row: {
          benefits: string[]
          event_id: number | null
          id: string
          name: string
          price: number
        }
        Insert: {
          benefits?: string[]
          event_id?: number | null
          id?: string
          name: string
          price: number
        }
        Update: {
          benefits?: string[]
          event_id?: number | null
          id?: string
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "ticket_packages_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
