import { NextRequest, NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/leaderboard?period=all|weekly|daily&page=1&limit=20&search=name
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // For "all" period, use contest_entries vote_count directly
    // For time-based periods, aggregate from votes table
    if (period === "all") {
      let query = adminClient
        .from("contest_entries")
        .select(`
          id,
          vote_count,
          status,
          contest_id,
          user_id,
          profiles (
            id,
            display_name,
            avatar_url,
            bio
          ),
          contests (
            id,
            name,
            status
          )
        `)
        .eq("status", "active")
        .order("vote_count", { ascending: false })
        .range(offset, offset + limit - 1);

      if (search) {
        // We need to filter by profile name - do a subquery
        const { data: matchingProfiles } = await adminClient
          .from("profiles")
          .select("id")
          .ilike("display_name", `%${search}%`);

        if (matchingProfiles && matchingProfiles.length > 0) {
          query = query.in("user_id", matchingProfiles.map(p => p.id));
        } else {
          return NextResponse.json({
            leaderboard: [],
            pagination: { page, limit, total: 0, totalPages: 0 },
          });
        }
      }

      const { data: entries, error } = await query;

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Get total count
      let countQuery = adminClient
        .from("contest_entries")
        .select("id", { count: "exact", head: true })
        .eq("status", "active");

      if (search) {
        const { data: matchingProfiles } = await adminClient
          .from("profiles")
          .select("id")
          .ilike("display_name", `%${search}%`);
        if (matchingProfiles && matchingProfiles.length > 0) {
          countQuery = countQuery.in("user_id", matchingProfiles.map(p => p.id));
        }
      }

      const { count } = await countQuery;

      const leaderboard = (entries || []).map((entry, idx) => {
        const profile = Array.isArray(entry.profiles) ? entry.profiles[0] : entry.profiles;
        const contest = Array.isArray(entry.contests) ? entry.contests[0] : entry.contests;
        return {
          rank: offset + idx + 1,
          id: profile?.id || entry.user_id,
          entryId: entry.id,
          name: profile?.display_name || "Anonymous",
          avatar_url: profile?.avatar_url || null,
          bio: profile?.bio || null,
          votes: entry.vote_count || 0,
          contestName: contest?.name || "Unknown",
          contestId: entry.contest_id,
        };
      });

      return NextResponse.json({
        leaderboard,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      });
    }

    // For daily/weekly, we aggregate from the votes table
    const now = new Date();
    let since: Date;
    if (period === "daily") {
      since = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else {
      // weekly
      const dayOfWeek = now.getDay();
      since = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
    }

    // Get vote aggregation for the period
    const { data: voteAgg, error: voteError } = await adminClient
      .from("votes")
      .select("entry_id, votes_added")
      .gte("created_at", since.toISOString());

    if (voteError) {
      return NextResponse.json({ error: voteError.message }, { status: 500 });
    }

    // Aggregate votes per entry
    const entryVotes: Record<string, number> = {};
    for (const vote of voteAgg || []) {
      entryVotes[vote.entry_id] = (entryVotes[vote.entry_id] || 0) + (vote.votes_added || 0);
    }

    // Sort entries by period votes
    const sortedEntries = Object.entries(entryVotes)
      .sort(([, a], [, b]) => b - a);

    const totalEntries = sortedEntries.length;
    const paginatedEntries = sortedEntries.slice(offset, offset + limit);

    if (paginatedEntries.length === 0) {
      return NextResponse.json({
        leaderboard: [],
        pagination: { page, limit, total: totalEntries, totalPages: Math.ceil(totalEntries / limit) },
      });
    }

    // Fetch entry details
    const entryIds = paginatedEntries.map(([id]) => id);
    const { data: entries } = await adminClient
      .from("contest_entries")
      .select(`
        id,
        vote_count,
        user_id,
        contest_id,
        profiles (
          id,
          display_name,
          avatar_url,
          bio
        ),
        contests (
          id,
          name
        )
      `)
      .in("id", entryIds);

    const entryMap = new Map((entries || []).map(e => [e.id, e]));

    const leaderboard = paginatedEntries.map(([entryId, periodVotes], idx) => {
      const entry = entryMap.get(entryId);
      const profile = entry ? (Array.isArray(entry.profiles) ? entry.profiles[0] : entry.profiles) : null;
      const contest = entry ? (Array.isArray(entry.contests) ? entry.contests[0] : entry.contests) : null;
      return {
        rank: offset + idx + 1,
        id: profile?.id || entry?.user_id || "",
        entryId,
        name: profile?.display_name || "Anonymous",
        avatar_url: profile?.avatar_url || null,
        bio: profile?.bio || null,
        votes: periodVotes,
        totalVotes: entry?.vote_count || 0,
        contestName: contest?.name || "Unknown",
        contestId: entry?.contest_id || "",
      };
    });

    return NextResponse.json({
      leaderboard,
      pagination: {
        page,
        limit,
        total: totalEntries,
        totalPages: Math.ceil(totalEntries / limit),
      },
    });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
