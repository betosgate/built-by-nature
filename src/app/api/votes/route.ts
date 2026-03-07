import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { entryId, contestId, roundNumber = 1, tokensSpent = 1 } = body;

    if (!entryId || !contestId) {
      return NextResponse.json({ error: "entryId and contestId are required" }, { status: 400 });
    }

    // Call the process_vote database function which handles everything atomically:
    // - Validates contest/entry state
    // - Checks daily vote limit (20/day/contestant)
    // - Deducts token from voter
    // - Creates vote record
    // - Creates earnings (20% contestant, 10% recruiter)
    // - Updates vote_count on entry
    const { data, error } = await supabase.rpc("process_vote", {
      p_voter_id: user.id,
      p_entry_id: entryId,
      p_contest_id: contestId,
      p_round_number: roundNumber,
      p_tokens_spent: tokensSpent,
    });

    if (error) {
      // The process_vote function raises exceptions for business rule violations
      const message = error.message || "Failed to process vote";

      if (message.includes("Insufficient token balance")) {
        return NextResponse.json({ error: message, needsTokens: true }, { status: 400 });
      }
      if (message.includes("Daily vote limit")) {
        return NextResponse.json({ error: message }, { status: 429 });
      }

      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      voteId: data,
      message: "Vote recorded successfully",
    });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
