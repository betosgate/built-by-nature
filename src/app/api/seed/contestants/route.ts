import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

const CONTESTANTS = [
  {
    name: "Valentina Reyes",
    slug: "valentina-reyes",
    bio: "Miami born, sun-kissed soul. Tattoo collector, beach lover, natural beauty advocate. Here to show the world that real is always better.",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop", caption: "Golden hour vibes" },
      { url: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=1200&fit=crop", caption: "Beach days are the best days" },
      { url: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&h=1200&fit=crop", caption: "Natural beauty, no filter needed" },
      { url: "https://images.unsplash.com/photo-1469460340997-2f854421e72f?w=800&h=1200&fit=crop", caption: "Summer state of mind" },
    ],
  },
  {
    name: "Aria Chen",
    slug: "aria-chen",
    bio: "California dreamer with ink and ambition. Fitness enthusiast, sunset chaser, and proud competitor. Vote if you believe in natural beauty!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop", caption: "Just me, no edits" },
      { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop", caption: "Confidence is the best outfit" },
      { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1200&fit=crop", caption: "Catching rays" },
    ],
  },
  {
    name: "Jasmine Brooks",
    slug: "jasmine-brooks",
    bio: "Atlanta queen with curves and confidence. Model, dancer, and all-natural beauty. Let's show them what real looks like.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1200&fit=crop", caption: "Melanin magic" },
      { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop", caption: "Born this way" },
      { url: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=1200&fit=crop", caption: "Sunkissed glow" },
      { url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1200&fit=crop", caption: "Vibes on point" },
      { url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&h=1200&fit=crop", caption: "That summer energy" },
    ],
  },
  {
    name: "Sofia Martinez",
    slug: "sofia-martinez",
    bio: "Puerto Rico to the world. Tattooed and proud, living life loud. Natural beauty is my superpower.",
    avatar: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=800&h=1200&fit=crop", caption: "Island girl energy" },
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop", caption: "Own your curves" },
      { url: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=800&h=1200&fit=crop", caption: "Sunset sessions" },
    ],
  },
  {
    name: "Natasha Ivanova",
    slug: "natasha-ivanova",
    bio: "Eastern European roots, American dreams. Fitness model, nature lover. Here to prove beauty needs no enhancements.",
    avatar: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=800&h=1200&fit=crop", caption: "Morning light magic" },
      { url: "https://images.unsplash.com/photo-1502767089025-6572583495f9?w=800&h=1200&fit=crop", caption: "Keeping it real" },
      { url: "https://images.unsplash.com/photo-1506956191951-7a88da4435e5?w=800&h=1200&fit=crop", caption: "Au naturel" },
      { url: "https://images.unsplash.com/photo-1464863979621-258859e62245?w=800&h=1200&fit=crop", caption: "Summer ready" },
    ],
  },
  {
    name: "Destiny Williams",
    slug: "destiny-williams",
    bio: "Houston's finest. Tattoo artist by day, beauty queen by night. 100% natural, 100% confident.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1523264653568-d3d4032bb3bc?w=800&h=1200&fit=crop", caption: "Ink and confidence" },
      { url: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=800&h=1200&fit=crop", caption: "Natural glow up" },
      { url: "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=800&h=1200&fit=crop", caption: "Body positivity" },
    ],
  },
  {
    name: "Luna Petrov",
    slug: "luna-petrov",
    bio: "NYC model with European flair. Bikini competitor, yoga instructor. Built by nature, refined by discipline.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop", caption: "City girl vibes" },
      { url: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=800&h=1200&fit=crop", caption: "Rooftop sunset" },
      { url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=1200&fit=crop", caption: "Natural elegance" },
      { url: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=800&h=1200&fit=crop", caption: "Golden goddess" },
    ],
  },
  {
    name: "Mia Johnson",
    slug: "mia-johnson",
    bio: "Small town girl, big dreams. Surfer, free spirit, all natural. Let my photos speak for themselves.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1200&fit=crop", caption: "Ocean child" },
      { url: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&h=1200&fit=crop", caption: "Salt water therapy" },
      { url: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&h=1200&fit=crop", caption: "Wave rider" },
    ],
  },
  {
    name: "Isabella Torres",
    slug: "isabella-torres",
    bio: "Brazilian beauty with a love for life. Dancer, model, adventurer. Every curve tells a story.",
    avatar: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=800&h=1200&fit=crop", caption: "Carnival spirit" },
      { url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&h=1200&fit=crop", caption: "Dance is life" },
      { url: "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=800&h=1200&fit=crop", caption: "Tropical queen" },
      { url: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&h=1200&fit=crop", caption: "Beach babe energy" },
    ],
  },
  {
    name: "Kayla Anderson",
    slug: "kayla-anderson",
    bio: "Vegas local turned competitor. Fitness model, tattoo enthusiast. Here to win that Italy trip and crown!",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1200&fit=crop", caption: "Desert flower" },
      { url: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=800&h=1200&fit=crop", caption: "Vegas nights" },
      { url: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=800&h=1200&fit=crop", caption: "Gym results, no surgery" },
    ],
  },
  {
    name: "Zara Okafor",
    slug: "zara-okafor",
    bio: "Nigerian-American beauty. Curves, confidence, and charisma. My ancestors built me right.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=1200&fit=crop", caption: "Heritage and beauty" },
      { url: "https://images.unsplash.com/photo-1523264653568-d3d4032bb3bc?w=800&h=1200&fit=crop", caption: "Crown energy" },
      { url: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&h=1200&fit=crop", caption: "Goddess mode" },
      { url: "https://images.unsplash.com/photo-1505503693641-1926193e8d57?w=800&h=1200&fit=crop", caption: "Radiant" },
    ],
  },
  {
    name: "Chloe Davis",
    slug: "chloe-davis",
    bio: "Tennessee sweetheart gone wild. Country girl with tattoos and a dream. Natural from head to toe.",
    avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1464863979621-258859e62245?w=800&h=1200&fit=crop", caption: "Country roads" },
      { url: "https://images.unsplash.com/photo-1519742866993-66d3cfef4bcd?w=800&h=1200&fit=crop", caption: "Wild and free" },
      { url: "https://images.unsplash.com/photo-1468218457742-ee484fe2fe4c?w=800&h=1200&fit=crop", caption: "Southern charm" },
    ],
  },
  {
    name: "Amara Diallo",
    slug: "amara-diallo",
    bio: "French-Senegalese model living in LA. All about natural beauty, healthy living, and chasing dreams.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop", caption: "Parisian elegance" },
      { url: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?w=800&h=1200&fit=crop", caption: "LA sunshine" },
      { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1200&fit=crop", caption: "Effortless beauty" },
      { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop", caption: "Runway to real life" },
    ],
  },
  {
    name: "Riley Thompson",
    slug: "riley-thompson",
    bio: "Colorado native, mountain lover, bikini competitor. Built by altitude and attitude.",
    avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=1200&fit=crop", caption: "Mountain high" },
      { url: "https://images.unsplash.com/photo-1485893226355-9a1c32a0c81e?w=800&h=1200&fit=crop", caption: "Adventure awaits" },
      { url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&h=1200&fit=crop", caption: "Wild spirit" },
    ],
  },
  {
    name: "Jade Kim",
    slug: "jade-kim",
    bio: "Korean-American beauty from Seattle. Tattoo lover, coffee addict, natural beauty champion.",
    avatar: "https://images.unsplash.com/photo-1506956191951-7a88da4435e5?w=400&h=400&fit=crop&crop=face",
    photos: [
      { url: "https://images.unsplash.com/photo-1506956191951-7a88da4435e5?w=800&h=1200&fit=crop", caption: "Pacific Northwest beauty" },
      { url: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&h=1200&fit=crop", caption: "Coffee and curves" },
      { url: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=1200&fit=crop", caption: "Rainy day glow" },
      { url: "https://images.unsplash.com/photo-1469460340997-2f854421e72f?w=800&h=1200&fit=crop", caption: "Natural radiance" },
    ],
  },
];

export async function POST() {
  try {
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Find the Summer 2026 contest
    const { data: contests } = await adminClient
      .from("contests")
      .select("id, name")
      .ilike("name", "%Summer%")
      .limit(1);

    if (!contests || contests.length === 0) {
      return NextResponse.json({ error: "Summer contest not found. Run /api/seed first." }, { status: 400 });
    }

    const summerContest = contests[0];
    const results: Array<{ name: string; id: string; slug: string; photos: number }> = [];
    const errors: string[] = [];

    for (const contestant of CONTESTANTS) {
      try {
        // Create auth user
        const email = `${contestant.slug}@demo.builtbynature.com`;
        const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
          email,
          password: "DemoPass123!",
          email_confirm: true,
          user_metadata: { role: "contestant", display_name: contestant.name },
        });

        if (authError) {
          // User may already exist
          if (authError.message.includes("already been registered")) {
            errors.push(`${contestant.name}: already exists, skipping`);
            continue;
          }
          errors.push(`${contestant.name}: auth error - ${authError.message}`);
          continue;
        }

        const userId = authData.user.id;

        // Update profile (trigger should have created it)
        const { error: profileError } = await adminClient
          .from("profiles")
          .update({
            display_name: contestant.name,
            bio: contestant.bio,
            avatar_url: contestant.avatar,
            role: "contestant" as const,
            slug: contestant.slug,
            age_verified: true,
          })
          .eq("id", userId);

        if (profileError) {
          errors.push(`${contestant.name}: profile update error - ${profileError.message}`);
        }

        // Create contest entry with random vote count
        const voteCount = Math.floor(Math.random() * 500) + 10;
        const { data: entry, error: entryError } = await adminClient
          .from("contest_entries")
          .insert({
            user_id: userId,
            contest_id: summerContest.id,
            status: "active" as const,
            current_round: 1,
            vote_count: voteCount,
          })
          .select("id")
          .single();

        if (entryError) {
          errors.push(`${contestant.name}: entry error - ${entryError.message}`);
        }

        // Create public content (photos)
        const publicContent = contestant.photos.map((photo, i) => ({
          user_id: userId,
          contest_entry_id: entry?.id || null,
          type: "photo" as const,
          storage_path: `public/${userId}/photo-${i + 1}.jpg`,
          public_url: photo.url,
          is_private: false,
          is_18_plus: false,
          caption: photo.caption,
        }));

        const { error: contentError } = await adminClient
          .from("content")
          .insert(publicContent);

        // Add 1-2 "private" content placeholders for some contestants
        if (Math.random() > 0.4) {
          const privateCount = Math.floor(Math.random() * 2) + 1;
          const privateContent = Array.from({ length: privateCount }, (_, p) => ({
            user_id: userId,
            contest_entry_id: entry?.id || null,
            type: "photo" as const,
            storage_path: `private/${userId}/exclusive-${p + 1}.jpg`,
            is_private: true,
            is_18_plus: true,
            caption: "Exclusive content",
          }));

          await adminClient.from("content").insert(privateContent);
        }

        if (contentError) {
          errors.push(`${contestant.name}: content error - ${contentError.message}`);
        }

        results.push({
          name: contestant.name,
          id: userId,
          slug: contestant.slug,
          photos: contestant.photos.length,
        });
      } catch (err) {
        errors.push(`${contestant.name}: unexpected error - ${err}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${results.length} contestants into ${summerContest.name}`,
      contestants: results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Seed contestants error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
