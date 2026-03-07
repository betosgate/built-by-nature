export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "fan" | "contestant" | "admin" | "recruiter";
export type ContestStatus = "draft" | "open" | "in_progress" | "completed";
export type RoundStatus = "pending" | "active" | "completed";
export type EntryStatus = "pending" | "active" | "eliminated" | "winner";
export type ContentType = "photo" | "video";
export type PurchaseStatus = "pending" | "completed" | "failed";
export type PayoutStatus = "pending" | "processing" | "completed" | "failed";
export type EarningsSourceType = "vote_share" | "recruitment_bonus";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: UserRole;
          display_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          age_verified: boolean;
          date_of_birth: string | null;
          tokens_balance: number;
          recruited_by: string | null;
          referral_code: string;
          slug: string | null;
          total_earnings: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: UserRole;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          age_verified?: boolean;
          date_of_birth?: string | null;
          tokens_balance?: number;
          recruited_by?: string | null;
          referral_code: string;
          slug?: string | null;
          total_earnings?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: UserRole;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          age_verified?: boolean;
          date_of_birth?: string | null;
          tokens_balance?: number;
          recruited_by?: string | null;
          referral_code?: string;
          slug?: string | null;
          total_earnings?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_recruited_by_fkey";
            columns: ["recruited_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      contests: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          rules_text: string | null;
          status: ContestStatus;
          current_round: number;
          total_rounds: number;
          entry_deadline: string | null;
          prizes_description: string | null;
          cover_image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          rules_text?: string | null;
          status?: ContestStatus;
          current_round?: number;
          total_rounds?: number;
          entry_deadline?: string | null;
          prizes_description?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          rules_text?: string | null;
          status?: ContestStatus;
          current_round?: number;
          total_rounds?: number;
          entry_deadline?: string | null;
          prizes_description?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };

      contest_rounds: {
        Row: {
          id: string;
          contest_id: string;
          round_number: number;
          name: string | null;
          advancement_count: number;
          start_date: string | null;
          end_date: string | null;
          status: RoundStatus;
        };
        Insert: {
          id?: string;
          contest_id: string;
          round_number: number;
          name?: string | null;
          advancement_count?: number;
          start_date?: string | null;
          end_date?: string | null;
          status?: RoundStatus;
        };
        Update: {
          id?: string;
          contest_id?: string;
          round_number?: number;
          name?: string | null;
          advancement_count?: number;
          start_date?: string | null;
          end_date?: string | null;
          status?: RoundStatus;
        };
        Relationships: [
          {
            foreignKeyName: "contest_rounds_contest_id_fkey";
            columns: ["contest_id"];
            isOneToOne: false;
            referencedRelation: "contests";
            referencedColumns: ["id"];
          },
        ];
      };

      contest_entries: {
        Row: {
          id: string;
          user_id: string;
          contest_id: string;
          status: EntryStatus;
          current_round: number;
          vote_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          contest_id: string;
          status?: EntryStatus;
          current_round?: number;
          vote_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          contest_id?: string;
          status?: EntryStatus;
          current_round?: number;
          vote_count?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "contest_entries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "contest_entries_contest_id_fkey";
            columns: ["contest_id"];
            isOneToOne: false;
            referencedRelation: "contests";
            referencedColumns: ["id"];
          },
        ];
      };

      content: {
        Row: {
          id: string;
          user_id: string;
          contest_entry_id: string | null;
          type: ContentType;
          storage_path: string;
          public_url: string | null;
          is_private: boolean;
          is_18_plus: boolean;
          caption: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          contest_entry_id?: string | null;
          type: ContentType;
          storage_path: string;
          public_url?: string | null;
          is_private?: boolean;
          is_18_plus?: boolean;
          caption?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          contest_entry_id?: string | null;
          type?: ContentType;
          storage_path?: string;
          public_url?: string | null;
          is_private?: boolean;
          is_18_plus?: boolean;
          caption?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "content_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "content_contest_entry_id_fkey";
            columns: ["contest_entry_id"];
            isOneToOne: false;
            referencedRelation: "contest_entries";
            referencedColumns: ["id"];
          },
        ];
      };

      votes: {
        Row: {
          id: string;
          voter_id: string;
          entry_id: string;
          contest_id: string;
          round_number: number;
          tokens_spent: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          voter_id: string;
          entry_id: string;
          contest_id: string;
          round_number: number;
          tokens_spent?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          voter_id?: string;
          entry_id?: string;
          contest_id?: string;
          round_number?: number;
          tokens_spent?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "votes_voter_id_fkey";
            columns: ["voter_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_entry_id_fkey";
            columns: ["entry_id"];
            isOneToOne: false;
            referencedRelation: "contest_entries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_contest_id_fkey";
            columns: ["contest_id"];
            isOneToOne: false;
            referencedRelation: "contests";
            referencedColumns: ["id"];
          },
        ];
      };

      token_purchases: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          price_paid: number;
          stripe_session_id: string | null;
          status: PurchaseStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          price_paid: number;
          stripe_session_id?: string | null;
          status?: PurchaseStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          price_paid?: number;
          stripe_session_id?: string | null;
          status?: PurchaseStatus;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "token_purchases_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string;
          content: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          recipient_id: string;
          content: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          recipient_id?: string;
          content?: string;
          read?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_recipient_id_fkey";
            columns: ["recipient_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      comments: {
        Row: {
          id: string;
          user_id: string;
          content_id: string;
          text: string;
          approved: boolean;
          visible: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_id: string;
          text: string;
          approved?: boolean;
          visible?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content_id?: string;
          text?: string;
          approved?: boolean;
          visible?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_content_id_fkey";
            columns: ["content_id"];
            isOneToOne: false;
            referencedRelation: "content";
            referencedColumns: ["id"];
          },
        ];
      };

      earnings: {
        Row: {
          id: string;
          user_id: string;
          source_type: EarningsSourceType;
          source_vote_id: string | null;
          amount: number;
          contest_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          source_type: EarningsSourceType;
          source_vote_id?: string | null;
          amount: number;
          contest_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          source_type?: EarningsSourceType;
          source_vote_id?: string | null;
          amount?: number;
          contest_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "earnings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "earnings_source_vote_id_fkey";
            columns: ["source_vote_id"];
            isOneToOne: false;
            referencedRelation: "votes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "earnings_contest_id_fkey";
            columns: ["contest_id"];
            isOneToOne: false;
            referencedRelation: "contests";
            referencedColumns: ["id"];
          },
        ];
      };

      payouts: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          status: PayoutStatus;
          payout_method: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          status?: PayoutStatus;
          payout_method?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          status?: PayoutStatus;
          payout_method?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payouts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      process_vote: {
        Args: {
          p_voter_id: string;
          p_entry_id: string;
          p_contest_id: string;
          p_round_number: number;
          p_tokens_spent: number;
        };
        Returns: string;
      };
    };

    Enums: {
      user_role: UserRole;
      contest_status: ContestStatus;
      round_status: RoundStatus;
      entry_status: EntryStatus;
      content_type: ContentType;
      purchase_status: PurchaseStatus;
      payout_status: PayoutStatus;
      earnings_source_type: EarningsSourceType;
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Utility types for easier usage
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
