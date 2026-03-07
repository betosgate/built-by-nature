import { NextRequest, NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/profile/[slug] — fetch contestant profile by vanity URL slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Find profile by slug
    const { data: profile, error: profileError } = await adminClient
      .from("profiles")
      .select("id, display_name, avatar_url, bio, role, slug, total_earnings, created_at")
      .eq("slug", slug)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Fetch public content
    const { data: publicContent } = await adminClient
      .from("content")
      .select("id, type, public_url, caption, is_private, created_at, contest_entry_id")
      .eq("user_id", profile.id)
      .eq("is_private", false)
      .order("created_at", { ascending: false });

    // Count private content (don't return actual URLs)
    const { count: privateCount } = await adminClient
      .from("content")
      .select("id", { count: "exact", head: true })
      .eq("user_id", profile.id)
      .eq("is_private", true);

    // Fetch contest entries with contest info
    const { data: entries } = await adminClient
      .from("contest_entries")
      .select("id, status, vote_count, current_round, contests(id, name, status, current_round, total_rounds)")
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false });

    // Total votes across all entries
    const totalVotes = (entries || []).reduce((sum, e) => sum + (e.vote_count || 0), 0);

    return NextResponse.json({
      profile,
      publicContent: publicContent || [],
      privateContentCount: privateCount || 0,
      entries: entries || [],
      totalVotes,
    });
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
