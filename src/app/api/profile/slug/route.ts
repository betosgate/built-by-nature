import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

const RESERVED_SLUGS = new Set([
  "admin", "account", "dashboard", "contests", "contestants", "explore",
  "login", "signup", "forgot-password", "api", "about", "recruit",
  "rules", "terms", "privacy", "cookies", "dmca", "compliance",
  "complaints", "acceptable-use", "present", "contestant", "settings",
  "upload", "messages", "earnings", "tokens", "profile", "search",
]);

// POST /api/profile/slug — set or update the user's vanity URL slug
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await request.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Normalize: lowercase, trim
    const normalized = slug.toLowerCase().trim().replace(/\s+/g, "-");

    // Validate format: 3-30 chars, alphanumeric + hyphens
    if (!/^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/.test(normalized)) {
      return NextResponse.json({
        error: "URL must be 3-30 characters, lowercase letters, numbers, and hyphens only. Cannot start or end with a hyphen.",
      }, { status: 400 });
    }

    // Check reserved slugs
    if (RESERVED_SLUGS.has(normalized)) {
      return NextResponse.json({ error: "This URL is reserved. Please choose another." }, { status: 400 });
    }

    // Check availability using service role (to bypass RLS)
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: existing } = await adminClient
      .from("profiles")
      .select("id")
      .eq("slug", normalized)
      .neq("id", user.id)
      .single();

    if (existing) {
      return NextResponse.json({ error: "This URL is already taken." }, { status: 409 });
    }

    // Update profile slug
    const { error: updateError } = await adminClient
      .from("profiles")
      .update({ slug: normalized })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ slug: normalized, url: `/${normalized}` });
  } catch (error) {
    console.error("Slug update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
