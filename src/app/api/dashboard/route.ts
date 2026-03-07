import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/dashboard — returns dashboard data for the logged-in user
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // Fetch user's contest entries with contest info
    const { data: entries } = await supabase
      .from("contest_entries")
      .select(
        `
        id,
        status,
        current_round,
        vote_count,
        created_at,
        contests (
          id,
          name,
          status,
          current_round,
          total_rounds,
          entry_deadline
        )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    // Fetch user's content count
    const { count: contentCount } = await supabase
      .from("content")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);

    // Fetch recent votes on user's entries
    const entryIds = entries?.map((e) => e.id) || [];
    let recentVotes: Array<{
      id: string;
      tokens_spent: number;
      created_at: string;
      voter_id: string;
    }> = [];
    if (entryIds.length > 0) {
      const { data: votes } = await supabase
        .from("votes")
        .select("id, tokens_spent, created_at, voter_id")
        .in("entry_id", entryIds)
        .order("created_at", { ascending: false })
        .limit(10);
      recentVotes = votes || [];
    }

    // Total votes across all entries
    const totalVotes =
      entries?.reduce((sum, e) => sum + (e.vote_count || 0), 0) || 0;

    return NextResponse.json({
      profile: {
        displayName: profile?.display_name || user.email?.split("@")[0],
        role: profile?.role || "fan",
        tokensBalance: profile?.tokens_balance || 0,
        totalEarnings: profile?.total_earnings || 0,
        avatarUrl: profile?.avatar_url,
        referralCode: profile?.referral_code,
      },
      stats: {
        totalVotes,
        activeContests: entries?.filter(
          (e) => e.status === "active"
        ).length || 0,
        totalEarnings: profile?.total_earnings || 0,
        tokensBalance: profile?.tokens_balance || 0,
        contentCount: contentCount || 0,
      },
      entries: entries || [],
      recentVotes,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
