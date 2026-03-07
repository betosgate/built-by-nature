import { NextRequest, NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/contestants/[id] — fetch a single contestant's full profile + rank
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
      .select("id, display_name, avatar_url, bio, total_earnings, created_at")
      .eq("id", id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Contestant not found" }, { status: 404 });
    }

    // Fetch contest entries with contest info
    const { data: contestEntries } = await adminClient
      .from("contest_entries")
      .select("id, status, vote_count, current_round, contest_id, created_at, contests(id, name, status, cover_image_url, total_rounds)")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    // Fetch public content
    const { data: publicContent } = await adminClient
      .from("content")
      .select("id, type, public_url, caption, is_private, is_18_plus, created_at")
      .eq("user_id", id)
      .eq("is_private", false)
      .order("created_at", { ascending: false });

    // Get private content count
    const { count: privateContentCount } = await adminClient
      .from("content")
      .select("id", { count: "exact", head: true })
      .eq("user_id", id)
      .eq("is_private", true);

    const totalVotes = (contestEntries || []).reduce((sum, e) => sum + (e.vote_count || 0), 0);

    // Calculate rank: how many contestants in the same contest have more votes?
    let rank: number | null = null;
    let totalContestants: number | null = null;
    const activeEntry = (contestEntries || []).find((e) => e.status === "active");

    if (activeEntry) {
      const { data: allEntries } = await adminClient
        .from("contest_entries")
        .select("vote_count")
        .eq("contest_id", activeEntry.contest_id)
        .eq("status", "active")
        .order("vote_count", { ascending: false });

      if (allEntries) {
        totalContestants = allEntries.length;
        rank = allEntries.findIndex((e) => e.vote_count <= activeEntry.vote_count) + 1;
      }
    }

    return NextResponse.json({
      profile,
      contestEntries: contestEntries || [],
      publicContent: publicContent || [],
      privateContentCount: privateContentCount || 0,
      totalVotes,
      rank,
      totalContestants,
    });
  } catch (error) {
    console.error("Contestant detail error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
