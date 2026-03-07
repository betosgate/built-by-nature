import { NextRequest, NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/contestants?page=1&limit=20&search=name
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let query = adminClient
      .from("profiles")
      .select(`
        id,
        display_name,
        avatar_url,
        bio,
        total_earnings,
        created_at,
        contest_entries (
          id,
          status,
          vote_count,
          contest_id,
          contests (
            id,
            name,
            status
          )
        )
      `)
      .eq("role", "contestant")
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("display_name", `%${search}%`);
    }

    const { data: contestants, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate total votes for each contestant
    const enriched = (contestants || []).map((c) => {
      const totalVotes = (c.contest_entries || []).reduce(
        (sum: number, e: any) => sum + (e.vote_count || 0),
        0
      );
      const activeContest = (c.contest_entries || []).find(
        (e: any) => e.status === "active"
      );
      return {
        ...c,
        totalVotes,
        activeContest: activeContest?.contests || null,
      };
    });

    const { count } = await adminClient
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "contestant");

    return NextResponse.json({
      contestants: enriched,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Contestants error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
