import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch earnings records
    const { data: earnings } = await supabase
      .from("earnings")
      .select("id, source_type, amount, created_at, contest_id, contests(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    // Fetch profile for total
    const { data: profile } = await supabase
      .from("profiles")
      .select("total_earnings, tokens_balance")
      .eq("id", user.id)
      .single();

    // Aggregate by source type
    const voteEarnings = (earnings || [])
      .filter((e) => e.source_type === "vote_share")
      .reduce((sum, e) => sum + Number(e.amount), 0);
    const recruitEarnings = (earnings || [])
      .filter((e) => e.source_type === "recruitment_bonus")
      .reduce((sum, e) => sum + Number(e.amount), 0);

    return NextResponse.json({
      totalEarnings: profile?.total_earnings || 0,
      voteEarnings,
      recruitEarnings,
      recentEarnings: earnings || [],
    });
  } catch (error) {
    console.error("Earnings API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
