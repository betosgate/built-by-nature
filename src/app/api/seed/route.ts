import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// POST /api/seed — seeds initial contests and rounds into the database
// Uses service role to bypass RLS. Idempotent: skips if contests already exist.
export async function POST() {
  try {
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if contests already exist
    const { data: existing } = await adminClient
      .from("contests")
      .select("id")
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({
        message: "Contests already seeded",
        count: existing.length,
      });
    }

    // Seed contests
    const contests = [
      {
        name: "Summer Glow 2026",
        description:
          "Celebrate the beauty of summer. Show off your natural glow, beach vibes, and golden hour looks. Tattoos, piercings, and confidence welcome.",
        rules_text:
          "All entries must feature natural beauty only. No cosmetic surgery or fillers. Tattoos and piercings are allowed. Max 3 photos per entry. Voting runs for 14 days per round.",
        status: "in_progress" as const,
        current_round: 1,
        total_rounds: 4,
        entry_deadline: new Date("2026-04-01T23:59:59Z").toISOString(),
        prizes_description:
          "Grand Prize: All-expenses-paid Vegas trip + $5,000 cash. Runner-up: 7-day Italy vacation + $3,000 cash.",
        cover_image_url:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop",
      },
      {
        name: "Natural Beauty Classic",
        description:
          "The flagship contest celebrating real, unfiltered beauty. All body types, all backgrounds, all welcome. Show the world the real you.",
        rules_text:
          "Contestants must be 18+. No cosmetic enhancements. Professional or amateur photos accepted. One entry per contestant.",
        status: "in_progress" as const,
        current_round: 1,
        total_rounds: 4,
        entry_deadline: new Date("2026-04-15T23:59:59Z").toISOString(),
        prizes_description:
          "Grand Prize: $10,000 + crowned Built by Nature Queen. Runner-up: $3,000 + Italy vacation.",
        cover_image_url:
          "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=1200&h=600&fit=crop",
      },
      {
        name: "Fitness Physique Open",
        description:
          "For the naturally fit. Show off the body you built through discipline, not surgery. Gym selfies, beach shots, athletic poses all welcome.",
        rules_text:
          "Must showcase natural physique. No performance-enhancing substance use. Tattoos and piercings allowed.",
        status: "in_progress" as const,
        current_round: 1,
        total_rounds: 3,
        entry_deadline: new Date("2026-03-30T23:59:59Z").toISOString(),
        prizes_description:
          "Grand Prize: $5,000 + fitness brand sponsorship deal. Runner-up: $2,000.",
        cover_image_url:
          "https://images.unsplash.com/photo-1727773563114-aedb6c33b7c7?w=1200&h=600&fit=crop",
      },
      {
        name: "Couple Goals",
        description:
          "Celebrate love and natural beauty together. Enter as a couple and show the world your authentic connection.",
        rules_text:
          "Both partners must be 18+. Both must meet natural beauty requirements. One entry per couple.",
        status: "open" as const,
        current_round: 0,
        total_rounds: 3,
        entry_deadline: new Date("2026-05-01T23:59:59Z").toISOString(),
        prizes_description:
          "Grand Prize: Couples vacation to Bali + $3,000. Runner-up: $1,500.",
        cover_image_url:
          "https://images.unsplash.com/photo-1719300570685-ac826a21f97c?w=1200&h=600&fit=crop",
      },
      {
        name: "Tattoo Showcase",
        description:
          "Your ink tells your story. This contest celebrates women who wear their art on their skin. Show off your tattoos and the beauty beneath.",
        rules_text:
          "Must have visible tattoos. All tattoo styles welcome. Natural beauty requirements still apply.",
        status: "open" as const,
        current_round: 0,
        total_rounds: 3,
        entry_deadline: new Date("2026-05-15T23:59:59Z").toISOString(),
        prizes_description:
          "Grand Prize: $3,000 + feature in partner tattoo magazine. Runner-up: $1,000.",
        cover_image_url:
          "https://images.unsplash.com/photo-1540408344195-eb6f21977632?w=1200&h=600&fit=crop",
      },
    ];

    const { data: insertedContests, error: contestError } = await adminClient
      .from("contests")
      .insert(contests)
      .select();

    if (contestError) {
      console.error("Contest seed error:", contestError);
      return NextResponse.json(
        { error: `Failed to seed contests: ${contestError.message}` },
        { status: 500 }
      );
    }

    // Create rounds for each contest
    const rounds = [];
    for (const contest of insertedContests) {
      for (let r = 1; r <= contest.total_rounds; r++) {
        const roundNames: Record<number, string> = {
          1: "Open Round",
          2: "Top 20",
          3: "Top 3 Finals",
          4: "Grand Finale",
        };
        rounds.push({
          contest_id: contest.id,
          round_number: r,
          name: roundNames[r] || `Round ${r}`,
          advancement_count: r === 1 ? 20 : r === 2 ? 3 : 1,
          status:
            r === 1 && contest.status === "in_progress"
              ? ("active" as const)
              : ("pending" as const),
          start_date:
            r === 1 && contest.status === "in_progress"
              ? new Date().toISOString()
              : null,
          end_date:
            r === 1 && contest.status === "in_progress"
              ? new Date(
                  Date.now() + 14 * 24 * 60 * 60 * 1000
                ).toISOString()
              : null,
        });
      }
    }

    const { error: roundsError } = await adminClient
      .from("contest_rounds")
      .insert(rounds);

    if (roundsError) {
      console.error("Rounds seed error:", roundsError);
      return NextResponse.json(
        { error: `Failed to seed rounds: ${roundsError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${insertedContests.length} contests with rounds`,
      contests: insertedContests.map((c) => ({ id: c.id, name: c.name })),
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
