import { NextRequest, NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/contestants/[id] — fetch a single contestant's full profile
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch the profile
    const { data: profile, error: profileError } = await adminClient
      .from("profiles")
      .select(`
        id,
        display_name,
        avatar_url,
        bio,
        total_earnings,
        created_at
      `)
      .eq("id", id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Contestant not found" },
        { status: 404 }
      );
    }

    // Fetch contest entries with contest info
    const { data: contestEntries, error: entriesError } = await adminClient
      .from("contest_entries")
      .select(`
        id,
        status,
        vote_count,
        current_round,
        contest_id,
        created_at,
        contests (
          id,
          name,
          status,
          cover_image_url
        )
      `)
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (entriesError) {
      console.error("Entries fetch error:", entriesError);
    }

    // Fetch public content
    const { data: publicContent, error: contentError } = await adminClient
      .from("content")
      .select(`
        id,
        type,
        public_url,
        caption,
        is_private,
        is_18_plus,
        created_at
      `)
      .eq("user_id", id)
      .eq("is_private", false)
      .order("created_at", { ascending: false });

    if (contentError) {
      console.error("Content fetch error:", contentError);
    }

    // Get private content count (just the count, not the actual data)
    const { count: privateContentCount } = await adminClient
      .from("content")
      .select("id", { count: "exact", head: true })
      .eq("user_id", id)
      .eq("is_private", true);

    // Calculate total votes across all contest entries
    const totalVotes = (contestEntries || []).reduce(
      (sum, entry) => sum + (entry.vote_count || 0),
      0
    );

    return NextResponse.json({
      profile,
      contestEntries: contestEntries || [],
      publicContent: publicContent || [],
      privateContentCount: privateContentCount || 0,
      totalVotes,
    });
  } catch (error) {
    console.error("Contestant detail error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
