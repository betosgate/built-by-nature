import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

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
        message: "Contests already seeded. Delete existing contests first to re-seed.",
        count: existing.length,
      });
    }

    const contests = [
      {
        name: "Built by Nature Summer 2026",
        description: "The premier natural beauty competition. Three rounds, 90 days, one winner. Bikini, tattoos, natural curves — real beauty takes the crown.",
        rules_text: "All entries must feature natural beauty. No cosmetic surgery or fillers. Tattoos and piercings welcome. Must be 18+. One entry per contestant.",
        status: "open" as const,
        current_round: 0,
        total_rounds: 3,
        entry_deadline: new Date("2026-03-31T23:59:59Z").toISOString(),
        prizes_description: "Top 3: All-expenses-paid Vegas trip for the final round. Grand Prize Winner: 7-day Italy vacation for two + $10,000 cash.",
        cover_image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop",
      },
      {
        name: "Built by Nature Winter 2026",
        description: "The winter edition of the biggest natural beauty competition. Same format, same stakes, new season.",
        rules_text: "All entries must feature natural beauty. No cosmetic surgery or fillers. Tattoos and piercings welcome. Must be 18+. One entry per contestant.",
        status: "draft" as const,
        current_round: 0,
        total_rounds: 3,
        entry_deadline: new Date("2026-09-30T23:59:59Z").toISOString(),
        prizes_description: "Top 3: All-expenses-paid Vegas trip for the final round. Grand Prize Winner: 7-day Italy vacation for two + $10,000 cash.",
        cover_image_url: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=1200&h=600&fit=crop",
      },
    ];

    const { data: insertedContests, error: contestError } = await adminClient
      .from("contests")
      .insert(contests)
      .select();

    if (contestError) {
      return NextResponse.json({ error: contestError.message }, { status: 500 });
    }

    const rounds = [];
    for (const contest of insertedContests) {
      const isSummer = contest.name.includes("Summer");
      const roundConfigs = [
        { number: 1, name: "Open Round", advancement_count: 30, startMonth: isSummer ? 3 : 9, startDay: 1 },
        { number: 2, name: "Top 30", advancement_count: 3, startMonth: isSummer ? 4 : 10, startDay: 1 },
        { number: 3, name: "The Finale", advancement_count: 1, startMonth: isSummer ? 5 : 11, startDay: 1 },
      ];

      for (const rc of roundConfigs) {
        const year = 2026;
        const startDate = new Date(year, rc.startMonth, rc.startDay);
        const endDate = new Date(year, rc.startMonth, 30);

        rounds.push({
          contest_id: contest.id,
          round_number: rc.number,
          name: rc.name,
          advancement_count: rc.advancement_count,
          status: "pending" as const,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        });
      }
    }

    const { error: roundsError } = await adminClient.from("contest_rounds").insert(rounds);

    if (roundsError) {
      return NextResponse.json({ error: roundsError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${insertedContests.length} contests with rounds`,
      contests: insertedContests.map((c) => ({ id: c.id, name: c.name })),
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
