import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iizseblxqfbpxdyrsomr.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpenNlYmx4cWZicHhkeXJzb21yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjg5NTgyMCwiZXhwIjoyMDg4NDcxODIwfQ.U6Lx0Y5IVTuAEf7gFqQAjqVs7w3R5ZWYFhsLdI2vOX4";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TEST_PASSWORD = "TestPass123!";

const seedUsers = [
  {
    email: "contestant@builtbynature.com",
    role: "contestant",
    display_name: "Savannah Rose",
    bio: "Florida girl with a love for the ocean and golden hour. Tattooed and proud.",
    avatar_url:
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=200&h=200&fit=crop&crop=face",
    tokens_balance: 0,
    total_earnings: 1284.5,
    age_verified: true,
    date_of_birth: "1998-06-15",
  },
  {
    email: "voter@builtbynature.com",
    role: "fan",
    display_name: "VoteKing99",
    bio: "Supporting natural beauty. Top voter on the platform.",
    avatar_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    tokens_balance: 42,
    total_earnings: 0,
    age_verified: true,
    date_of_birth: "1995-03-22",
  },
  {
    email: "recruiter@builtbynature.com",
    role: "recruiter",
    display_name: "Mike Davis",
    bio: "Talent scout bringing the best natural beauties to the platform.",
    avatar_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    tokens_balance: 0,
    total_earnings: 1842.3,
    age_verified: true,
    date_of_birth: "1990-11-08",
  },
  {
    email: "admin@builtbynature.com",
    role: "admin",
    display_name: "Admin",
    bio: "Platform administrator.",
    avatar_url: null,
    tokens_balance: 0,
    total_earnings: 0,
    age_verified: true,
    date_of_birth: "1988-01-01",
  },
];

async function seedAll() {
  console.log("Seeding test users...\n");

  for (const user of seedUsers) {
    const { email, role, display_name, bio, avatar_url, tokens_balance, total_earnings, age_verified, date_of_birth } = user;

    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existing = existingUsers?.users?.find((u) => u.email === email);

    let userId;

    if (existing) {
      console.log(`  User ${email} already exists (${existing.id}), updating profile...`);
      userId = existing.id;
    } else {
      // Create auth user (auto-confirmed, no email verification needed)
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email,
          password: TEST_PASSWORD,
          email_confirm: true,
          user_metadata: {
            display_name,
            role,
            date_of_birth,
          },
        });

      if (authError) {
        console.error(`  Failed to create ${email}:`, authError.message);
        continue;
      }

      userId = authData.user.id;
      console.log(`  Created auth user: ${email} (${userId})`);

      // Wait a moment for the trigger to create the profile
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Update the profile with seed data
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        role,
        display_name,
        bio,
        avatar_url,
        tokens_balance,
        total_earnings,
        age_verified,
        date_of_birth,
      })
      .eq("id", userId);

    if (profileError) {
      console.error(`  Failed to update profile for ${email}:`, profileError.message);
    } else {
      console.log(`  Updated profile: ${display_name} (${role})`);
    }
  }

  console.log("\n--- Test Accounts ---");
  console.log("Password for all accounts: " + TEST_PASSWORD);
  console.log("");
  console.log("  Contestant:  contestant@builtbynature.com");
  console.log("  Voter:       voter@builtbynature.com");
  console.log("  Recruiter:   recruiter@builtbynature.com");
  console.log("  Admin:       admin@builtbynature.com");
  console.log("\nDone!");
}

seedAll().catch(console.error);
