# Competition Rebrand Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebrand Built by Nature as a competition-first platform centered on two seasonal contests (Summer & Winter), with photo-forward design, public browsing, and role-specific signup flows.

**Architecture:** Full rewrite of homepage, contests pages, and signup flow. New public browsing pages (/explore, /contestants). Updated seed data for 2 seasonal contests. Updated navbar. All using existing Next.js App Router + Supabase + Tailwind dark/amber theme.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, Shadcn/ui, Supabase, Next/Image with Unsplash CDN

---

### Task 1: Update Seed Data — Two Seasonal Contests

**Files:**
- Modify: `src/app/api/seed/route.ts` (full rewrite of contest data)

**Step 1: Rewrite seed route with two seasonal contests**

Replace the 5 old contests with exactly 2:

```typescript
const contests = [
  {
    name: "Built by Nature Summer 2026",
    description: "The premier natural beauty competition. Three rounds, 90 days, one winner. Bikini, tattoos, natural curves — real beauty takes the crown.",
    rules_text: "All entries must feature natural beauty. No cosmetic surgery or fillers. Tattoos and piercings welcome. Must be 18+. One entry per contestant.",
    status: "open" as const,
    current_round: 0,
    total_rounds: 3,
    entry_deadline: new Date("2026-03-31T23:59:59Z").toISOString(),
    prizes_description: "Grand Prize: All-expenses-paid Vegas trip + $5,000 cash. Runner-up: 7-day Italy vacation + $3,000. 3rd Place: $1,000 cash.",
    cover_image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop",
  },
  {
    name: "Built by Nature Winter 2026",
    description: "The winter edition of the biggest natural beauty competition. Same format, same stakes, new season. Show the world what you've got.",
    rules_text: "All entries must feature natural beauty. No cosmetic surgery or fillers. Tattoos and piercings welcome. Must be 18+. One entry per contestant.",
    status: "draft" as const,
    current_round: 0,
    total_rounds: 3,
    entry_deadline: new Date("2026-09-30T23:59:59Z").toISOString(),
    prizes_description: "Grand Prize: All-expenses-paid Vegas trip + $5,000 cash. Runner-up: 7-day Italy vacation + $3,000. 3rd Place: $1,000 cash.",
    cover_image_url: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=1200&h=600&fit=crop",
  },
];
```

Update round creation to use 3 rounds with proper advancement counts and 30-day durations:
- Round 1: "Open Round" — advancement_count: 30 (all → top 30)
- Round 2: "Top 30" — advancement_count: 3 (top 30 → top 3)
- Round 3: "The Finale" — advancement_count: 1 (top 3 → winner)

For Summer 2026 (status: open), set Round 1 start_date to April 1 and end_date to April 30. Round 2: May 1-30. Round 3: June 1-30.
For Winter 2026 (status: draft), set Round 1 start_date to October 1, end_date October 30. Round 2: Nov 1-30. Round 3: Dec 1-30.

**Step 2: Commit**
```bash
git add src/app/api/seed/route.ts
git commit -m "feat: update seed to two seasonal contests (Summer & Winter)"
```

---

### Task 2: Update Navbar — Competition-First Navigation

**Files:**
- Modify: `src/components/marketing/navbar.tsx`

**Step 1: Update nav links**

Replace the `navLinks` array:
```typescript
const navLinks = [
  { href: "/contests", label: "Competitions" },
  { href: "/explore", label: "Explore" },
  { href: "/contestants", label: "Contestants" },
  { href: "/recruit", label: "Recruit" },
];
```

**Step 2: Commit**
```bash
git add src/components/marketing/navbar.tsx
git commit -m "feat: update navbar to competition-first navigation"
```

---

### Task 3: Rewrite Homepage — Competition-Centric

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

This is the largest task. The homepage should have these sections in order:

**Section 1: Full-Bleed Hero**
- Full viewport height hero with contestant photo mosaic background (use existing `contestantImages` array)
- Gradient overlay from black
- Large heading: "Built by Nature" with "Summer 2026" in amber gradient
- Subheading about the competition format
- Competition phase badge (e.g., "Enrollment Open — Starts April 1")
- Countdown timer showing days until competition starts (calculate from April 1, 2026)
- Two CTAs: "Enter the Competition" (amber, links to /signup/contestant) and "Browse Contestants" (outline, links to /explore)
- Trust indicators: 18+ Verified, Real Prizes, Contestants Earn 20%

**Section 2: Competition Status Bar**
- Thin amber-accented bar showing: "Summer 2026 — Enrollment Open — 25 days until Round 1"
- If no active competition, show next upcoming one

**Section 3: Annual Timeline**
- Horizontal visual showing the year split into 4 phases:
  - Jan–Mar: Summer Enrollment (amber if current)
  - Apr–Jun: Summer Competition
  - Jul–Sep: Winter Enrollment
  - Oct–Dec: Winter Competition
- Current phase highlighted with amber glow
- Each phase shows its status (Enrollment, Round 1, Round 2, Finale, etc.)

**Section 4: The Format — 3-Round Elimination**
- Visual graphic showing: All Entrants → 30 days → Top 30 → 30 days → Top 3 → 30 days → Winner
- Use connected step cards with arrows
- Prize callout underneath: Vegas trip, Italy vacation, cash prizes

**Section 5: Contestant Photo Feed**
- Use existing contestant images in a masonry-style grid (3 cols on desktop, 2 on mobile)
- Each photo has hover overlay with "Vote Now" button
- Header: "See Who's Competing" with link to /explore
- Teaser text: "Sign up to unlock exclusive content" with lock icon

**Section 6: Three Paths**
- Three large cards side by side:
  - Compete: photo background, "Enter as a Contestant", "Earn 20% of every vote", CTA → /signup/contestant
  - Vote: photo background, "Support Your Favorites", "Your votes decide the winner", CTA → /signup/fan
  - Recruit: photo background, "Earn 10% Lifetime", "From every contestant you bring in", CTA → /signup/recruiter

**Section 7: Earnings Breakdown**
- Keep existing 3-card layout (Contestants 20%, Recruiters 10%, Fans) with images

**Section 8: Final CTA**
- Keep existing but update copy to be competition-focused
- "Enter the Built by Nature Summer 2026 Competition"

Remove: Marquee section, "Featured In" social proof (premature), steps section (replaced by timeline + format). Keep: Navbar, Footer.

**Step 2: Commit**
```bash
git add src/app/page.tsx
git commit -m "feat: rewrite homepage as competition-centric with timeline and format"
```

---

### Task 4: New Public Content API

**Files:**
- Create: `src/app/api/content/public/route.ts`

**Step 1: Create public content endpoint**

```typescript
// GET /api/content/public?page=1&limit=20&search=keyword&contest_id=uuid&sort=newest|popular
// Returns public content with contestant info, no auth required
```

Query the `content` table where `is_private = false`, join with `profiles` for contestant name/avatar, optionally join with `contest_entries` and `contests` for contest info. Support pagination, search (by caption ILIKE), filter by contest_id, and sort by created_at desc (newest) or by related vote_count (popular).

Use service role client to bypass RLS for public read.

**Step 2: Commit**
```bash
git add src/app/api/content/public/route.ts
git commit -m "feat: add public content API with search and pagination"
```

---

### Task 5: New /explore Page — Public Content Feed

**Files:**
- Create: `src/app/explore/page.tsx`

**Step 1: Build explore page**

Server-rendered page with client-side search/filter. Components:
- Search bar at top (text input with search icon)
- Filter tabs: All, Summer 2026, Winter 2026
- Sort dropdown: Newest, Most Popular
- Masonry grid of content cards (3 cols desktop, 2 mobile, 1 small mobile)
- Each card: photo with aspect-ratio, contestant name overlay at bottom, vote count badge
- Private content cards: blurred image with lock icon + "Sign up to see more"
- Load more button at bottom (pagination)
- Fetches from `/api/content/public`

Uses Navbar + Footer. No auth required.

**Step 2: Commit**
```bash
git add src/app/explore/page.tsx
git commit -m "feat: add /explore page for public content browsing"
```

---

### Task 6: New /contestants Page — Public Directory

**Files:**
- Create: `src/app/contestants/page.tsx`
- Create: `src/app/api/contestants/route.ts`

**Step 1: Create contestants API**

```typescript
// GET /api/contestants?page=1&limit=20&search=name&contest_id=uuid&sort=votes|newest
// Returns public contestant profiles with their contest entries and vote counts
```

Query `profiles` where role = 'contestant', join with `contest_entries` for vote counts, join with `content` for avatar/featured photo. Support search by display_name ILIKE, filter by contest_id, sort by total votes or newest.

**Step 2: Build contestants page**

Grid of contestant cards (4 cols desktop, 3 tablet, 2 mobile):
- Large photo card (aspect-3/4)
- Name, location/bio snippet
- Active competition badge
- Total vote count with heart icon
- Link to /contestant/[id]

Search bar, filter by competition, sort options. Uses Navbar + Footer.

**Step 3: Commit**
```bash
git add src/app/contestants/page.tsx src/app/api/contestants/route.ts
git commit -m "feat: add /contestants directory page with search"
```

---

### Task 7: Rewrite /contests Page — Two Seasonal Competitions

**Files:**
- Modify: `src/app/contests/page.tsx` (full rewrite)

**Step 1: Rewrite contests page**

Fetch real contests from `/api/contests` instead of using MOCK_DATA. Show two large competition cards:

For each contest:
- Full-width card with cover image, gradient overlay
- Competition name in large type
- Status badge (Enrollment Open / In Progress — Round X / Completed)
- Countdown to next milestone (enrollment deadline, round end, etc.)
- Round progress indicator (3 dots/bars showing Round 1, 2, 3)
- Stats: entrants count, total votes, days remaining
- Prize summary
- CTA: "Enter Now" / "Vote Now" / "View Results" depending on status
- If in_progress, show top 5 contestants as small avatar row

Show Summer first (or whichever is currently active/upcoming), Winter second.

Remove: "Coming Soon" hardcoded contests, MOCK_DATA imports, earnings callout (move to individual contest pages).

**Step 2: Commit**
```bash
git add src/app/contests/page.tsx
git commit -m "feat: rewrite contests page for two seasonal competitions"
```

---

### Task 8: Rewrite Signup — Role Selector + Dedicated Pages

**Files:**
- Modify: `src/app/(auth)/signup/page.tsx` (rewrite as role selector)
- Create: `src/app/(auth)/signup/contestant/page.tsx`
- Create: `src/app/(auth)/signup/fan/page.tsx`
- Create: `src/app/(auth)/signup/recruiter/page.tsx`

**Step 1: Rewrite /signup as role selector**

Full-page layout (not in the small auth card). Three large photo-backed cards:
- **Contestant**: Bikini photo background, "Compete & Earn", bullet points (Enter competitions, Earn 20% of votes, Win prizes), "Sign Up as Contestant" button → /signup/contestant
- **Fan/Voter**: Crowd/lifestyle photo, "Vote & Support", bullet points (Browse contestants, Vote with tokens, Unlock exclusive content), "Sign Up as Fan" button → /signup/fan
- **Recruiter**: Earnings-style photo, "Recruit & Earn", bullet points (Find talent, Earn 10% lifetime, Track your recruits), "Sign Up as Recruiter" button → /signup/recruiter

Uses Navbar, NOT the auth layout (override with its own layout or use a different route group).

**Step 2: Create /signup/contestant page**

Split layout: left side = large contestant photo (hidden on mobile), right side = compact form.
- Heading: "Enter the Competition"
- Subheading: "You'll earn 20% of every vote you receive"
- Form fields: Display Name, Email, Password, Confirm Password, Date of Birth, Referral Code (optional), Terms checkbox
- Submit button: "Create Contestant Account"
- Pre-fill role as "contestant" in signUp metadata
- Uses same auth logic as current signup but without role selector

**Step 3: Create /signup/fan and /signup/recruiter pages**

Same split layout pattern but with different:
- Photos, headings, subheadings, and value propositions
- Pre-filled roles ("fan" for voter, "recruiter" for recruiter)
- Fan: "Join & Vote" / "Browse content, vote for favorites, unlock exclusive photos"
- Recruiter: "Start Recruiting" / "Earn 10% lifetime from every contestant you bring in"

**Step 4: Commit**
```bash
git add src/app/\(auth\)/signup/
git commit -m "feat: split signup into role selector + dedicated pages"
```

---

### Task 9: Update Contest Detail Page

**Files:**
- Modify: `src/app/contests/[id]/page.tsx`

**Step 1: Update contest detail to fetch real data**

Fetch contest by ID from Supabase (via API or direct server-side query). Show:
- Hero with cover image and competition name
- Round progress bar (3 rounds, current highlighted)
- Current round info: days remaining, advancement threshold
- Leaderboard: contestant cards sorted by vote_count, with rank badges
- Voting interface (if logged in and contest is in_progress)
- Entry CTA (if logged in and contest is open/in_progress and not already entered)
- Prize details section
- Earnings explanation (20% for contestants)

Replace all MOCK_DATA references with real data.

**Step 2: Commit**
```bash
git add src/app/contests/\[id\]/page.tsx
git commit -m "feat: update contest detail page with real data and leaderboard"
```

---

### Task 10: Final Cleanup and Deploy

**Files:**
- Modify: `src/lib/mock-data.ts` — keep for now but remove contest-specific mocks
- Verify all imports are correct, no broken references

**Step 1: Clean up mock data references**

Search all files for `MOCK_CONTEST`, `MOCK_CONTESTANTS`, `mock-data` imports. Remove or replace with real data fetching. The mock-data file can stay for contestant image URLs used in static sections (homepage gallery).

**Step 2: Run build to verify no errors**
```bash
npm run build
```

**Step 3: Commit and push**
```bash
git add -A
git commit -m "feat: complete competition rebrand — cleanup and deploy"
git push origin master
```

**Step 4: Seed database**

After deploy, call `POST https://built-by-nature.vercel.app/api/seed` to populate the two seasonal contests (need to clear old contests first or update seed to handle replacement).

---

## Execution Order & Dependencies

Tasks 1-2 are independent. Task 3 (homepage) depends on Task 1 (seed data structure). Tasks 4-6 are independent of each other. Task 7 depends on Task 1. Task 8 is independent. Task 9 depends on Task 1. Task 10 depends on all others.

**Parallelizable groups:**
- Group A: Task 1 (seed) + Task 2 (navbar) + Task 8 (signup)
- Group B: Task 3 (homepage) + Task 4 (public API) + Task 5 (explore) + Task 6 (contestants) + Task 7 (contests page)
- Group C: Task 9 (contest detail) + Task 10 (cleanup)

**Recommended agent dispatch:**
- Agent 1: Tasks 1, 2, 7 (backend + contests page)
- Agent 2: Task 3 (homepage — largest single task)
- Agent 3: Tasks 4, 5, 6 (public browsing stack)
- Agent 4: Task 8 (signup flow)
- Agent 5: Task 9 (contest detail)
- Final: Task 10 in main thread after all agents complete
