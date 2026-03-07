import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/contests/enter — enter a contest (creates contest_entry)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { contestId } = body;

    if (!contestId) {
      return NextResponse.json(
        { error: "contestId is required" },
        { status: 400 }
      );
    }

    // Check contest exists and is open or in_progress
    const { data: contest, error: contestError } = await supabase
      .from("contests")
      .select("id, name, status, entry_deadline")
      .eq("id", contestId)
      .single();

    if (contestError || !contest) {
      return NextResponse.json(
        { error: "Contest not found" },
        { status: 404 }
      );
    }

    if (contest.status !== "open" && contest.status !== "in_progress") {
      return NextResponse.json(
        { error: "This contest is not accepting entries" },
        { status: 400 }
      );
    }

    if (
      contest.entry_deadline &&
      new Date(contest.entry_deadline) < new Date()
    ) {
      return NextResponse.json(
        { error: "Entry deadline has passed" },
        { status: 400 }
      );
    }

    // Check if user already has an entry
    const { data: existingEntry } = await supabase
      .from("contest_entries")
      .select("id")
      .eq("user_id", user.id)
      .eq("contest_id", contestId)
      .single();

    if (existingEntry) {
      return NextResponse.json({
        success: true,
        entry: existingEntry,
        message: "Already entered this contest",
      });
    }

    // Create entry
    const { data: entry, error: entryError } = await supabase
      .from("contest_entries")
      .insert({
        user_id: user.id,
        contest_id: contestId,
        status: "active",
        current_round: 1,
      })
      .select()
      .single();

    if (entryError) {
      console.error("Entry creation error:", entryError);
      return NextResponse.json(
        { error: `Failed to enter contest: ${entryError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      entry,
      message: `Successfully entered ${contest.name}`,
    });
  } catch (error) {
    console.error("Contest enter error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
