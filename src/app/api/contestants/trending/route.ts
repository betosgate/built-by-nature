import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/contestants/trending — contestants with most votes in last hour
export async function GET() {
  try {
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get votes from the last hour, grouped by entry_id
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: recentVotes } = await adminClient
      .from("votes")
      .select("entry_id, tokens_spent")
      .gte("created_at", oneHourAgo);

    let trendingEntryIds: string[] = [];

    if (recentVotes && recentVotes.length > 0) {
      // Aggregate votes by entry_id
      const voteMap = new Map<string, number>();
      for (const v of recentVotes) {
        voteMap.set(v.entry_id, (voteMap.get(v.entry_id) || 0) + (v.tokens_spent * 5));
      }
      // Sort by vote count descending
      trendingEntryIds = [...voteMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([id]) => id);
    }

    let contestants;

    if (trendingEntryIds.length > 0) {
      // Fetch the trending contestants
      const { data } = await adminClient
        .from("contest_entries")
        .select(`
          id,
          vote_count,
          user_id,
          profiles (
            id,
            display_name,
            avatar_url
          )
        `)
        .in("id", trendingEntryIds);

      contestants = (data || []).map(entry => {
        const p = Array.isArray(entry.profiles) ? entry.profiles[0] : entry.profiles;
        return {
          id: p?.id || entry.user_id,
          name: p?.display_name || "Contestant",
          avatar_url: p?.avatar_url,
          votes: entry.vote_count || 0,
          trending: true,
        };
      });
    } else {
      // No recent votes — return random contestants from active entries
      const { data } = await adminClient
        .from("contest_entries")
        .select(`
          id,
          vote_count,
          user_id,
          profiles (
            id,
            display_name,
            avatar_url
          )
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(10);

      contestants = (data || []).map(entry => {
        const p = Array.isArray(entry.profiles) ? entry.profiles[0] : entry.profiles;
        return {
          id: p?.id || entry.user_id,
          name: p?.display_name || "Contestant",
          avatar_url: p?.avatar_url,
          votes: entry.vote_count || 0,
          trending: false,
        };
      });
    }

    return NextResponse.json({ contestants, source: trendingEntryIds.length > 0 ? "hourly_votes" : "random" });
  } catch (error) {
    console.error("Trending error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
