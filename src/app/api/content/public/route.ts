import { NextRequest, NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/content/public?page=1&limit=20&search=keyword&contest_id=uuid&sort=newest|popular
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const contestId = searchParams.get("contest_id") || "";
    const sort = searchParams.get("sort") || "newest";
    const offset = (page - 1) * limit;

    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let query = adminClient
      .from("content")
      .select(`
        id,
        file_type,
        storage_path,
        public_url,
        caption,
        is_private,
        created_at,
        user_id,
        contest_entry_id,
        profiles!inner (
          id,
          display_name,
          avatar_url
        )
      `)
      .eq("is_private", false)
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.ilike("caption", `%${search}%`);
    }

    if (contestId) {
      // Filter by contest - need to join through contest_entries
      query = query.not("contest_entry_id", "is", null);
    }

    if (sort === "newest") {
      query = query.order("created_at", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false }); // fallback
    }

    const { data: content, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get total count for pagination
    const { count } = await adminClient
      .from("content")
      .select("id", { count: "exact", head: true })
      .eq("is_private", false);

    return NextResponse.json({
      content: content || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Public content error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
