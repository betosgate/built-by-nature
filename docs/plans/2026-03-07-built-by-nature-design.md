# Built by Nature - Full Platform Design

## Overview
Online contest platform where women showcase natural beauty. Fans buy tokens to vote, message, and comment. Contests run in rounds with admin control.

## Tech Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Auth**: Supabase Auth (email + social)
- **Database**: Supabase Postgres
- **Storage**: Supabase Storage (public + private buckets)
- **Payments**: Stripe Checkout + Webhooks
- **Hosting**: Vercel
- **Repo**: GitHub

## Architecture

### Route Structure
```
/ (marketing site)
/rules
/about
/login
/signup
/contests (browse contests)
/contests/[id] (contest detail + entries)
/contestant/[id] (profile page)
/dashboard (contestant dashboard)
/dashboard/upload
/dashboard/messages
/dashboard/stats
/account (settings, tokens, purchase history)
/admin (backoffice)
/admin/contests
/admin/users
/admin/emails
```

### Database Schema

**users**
- id (uuid, PK)
- email, password_hash
- role (fan | contestant | admin)
- display_name, bio, avatar_url
- age_verified (boolean)
- date_of_birth
- tokens_balance (integer, default 0)
- created_at, updated_at

**contests**
- id (uuid, PK)
- name, description, rules_text
- status (draft | open | in_progress | completed)
- current_round (integer)
- total_rounds (integer)
- entry_deadline (timestamp)
- prizes_description
- created_at

**contest_rounds**
- id (uuid, PK)
- contest_id (FK)
- round_number (integer)
- name (e.g., "Top 20", "Top 3", "Final")
- advancement_count (how many advance)
- start_date, end_date
- status (pending | active | completed)

**contest_entries**
- id (uuid, PK)
- user_id (FK)
- contest_id (FK)
- status (pending | active | eliminated | winner)
- current_round (integer)
- vote_count (integer, default 0)

**content**
- id (uuid, PK)
- user_id (FK)
- contest_entry_id (FK, nullable)
- type (photo | video)
- storage_path, public_url
- is_private (boolean)
- is_18_plus (boolean)
- caption
- created_at

**votes**
- id (uuid, PK)
- voter_id (FK -> users)
- entry_id (FK -> contest_entries)
- contest_id (FK)
- round_number (integer)
- created_at
- UNIQUE(voter_id, entry_id, DATE(created_at)) -- max 20/day enforced in app

**token_purchases**
- id (uuid, PK)
- user_id (FK)
- amount (integer)
- price_paid (decimal)
- stripe_session_id
- status (pending | completed | failed)
- created_at

**messages**
- id (uuid, PK)
- sender_id (FK)
- recipient_id (FK)
- content (text)
- read (boolean)
- created_at

**comments**
- id (uuid, PK)
- user_id (FK)
- content_id (FK)
- text
- approved (boolean, default false)
- visible (boolean, default true)
- created_at

### Supabase Storage Buckets
- `public-content` — Public photos/videos (no auth required)
- `private-content` — 18+ content (requires auth + age verification)
- `avatars` — Profile pictures

### Row-Level Security
- Users can only read their own messages
- Contestants can manage their own content/comments
- Admins have full access
- Public content readable by all
- Private content requires authenticated + age_verified user
- Votes: users can only create (not update/delete)

### Stripe Integration
- Stripe Checkout for token purchases
- Webhook endpoint at `/api/webhooks/stripe`
- On successful payment: increment user's tokens_balance
- Token bundles: 1 ($5), 5 ($20), 10 ($35), 25 ($75)

### Key Features by Section

**Marketing Site**: Hero with CTA, feature highlights, contest preview cards, rules page, responsive/mobile-first

**Contestant Flow**: Sign up -> verify age -> create profile -> upload content -> enter contest -> share links -> track votes

**Fan Flow**: Browse -> sign up -> verify age (for 18+) -> buy tokens -> vote (max 20/day/contestant) -> message -> comment

**Admin Backoffice**: CRUD contests/rounds, manage users, send emails (individual or blast), moderate content, advance rounds, declare winners

### Images
- Marketing site uses high-quality stock/placeholder images (Unsplash)
- Gradient overlays and modern typography for premium feel
