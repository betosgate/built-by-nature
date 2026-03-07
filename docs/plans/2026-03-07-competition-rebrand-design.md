# Built by Nature — Competition Rebrand Design

## Overview

Rebrand the entire site around two seasonal competitions: Summer and Winter. The site IS the competition. Everything revolves around showcasing contestants and the elimination format.

## Contest Format

| | Summer | Winter |
|---|---|---|
| Early Enrollment | January 1 | July 1 |
| Enrollment Closes | March 31 | September 30 |
| Round 1 | April 1–30 → Top 30 | October 1–30 → Top 30 |
| Round 2 | May 1–30 → Top 3 | November 1–30 → Top 3 |
| Round 3 | June 1–30 → Winner | December 1–30 → Winner |

Admin can add more competitions via admin panel.

## Visual Direction

- Keep dark (zinc/black) + amber accent palette
- Photo-forward: bikini, tattoos, beach lifestyle imagery dominates
- Large imagery, edge-to-edge where possible
- Bold confident headings, minimal body text
- Private 18+ content (modest nudes) behind age verification + login

## Homepage (Full Rewrite)

1. Full-bleed hero — contestant photo mosaic + competition name + countdown + phase CTA
2. Competition status bar — active competition, current round, days remaining
3. Annual timeline — Summer/Winter visual strip with current phase highlighted
4. The format — 3-round elimination graphic with prize callout
5. Contestant spotlight/leaderboard — large photo cards, vote counts, ranked during competition
6. Public photo feed — masonry grid, searchable, no login required. Teaser for private content
7. Three paths — Compete/Vote/Recruit with photo-backed cards

## Public Browsing (No Login Required)

- `/explore` — masonry grid of public content, search + filters
- `/contestants` — contestant directory with photo cards
- `/contestant/[id]` — full public profile, private content shown as blurred thumbnails with lock
- `/contests/[id]` — competition page with leaderboard and round status
- New API: `GET /api/content/public` — paginated public content with search

## Signup Flows (Minimal Scroll)

- `/signup` — role selector with 3 large photo-backed cards
- `/signup/contestant` — photo left, form right, single screen
- `/signup/fan` — same layout
- `/signup/recruiter` — same layout

## Private/18+ Content

- Blurred thumbnails visible publicly as teaser
- Unlocked after login + age verification
- Flame/lock icon indicator
- Separate section on contestant profiles

## Database Changes

- Remove 5 old seed contests
- Seed: "Built by Nature Summer 2026" and "Built by Nature Winter 2026"
- 3 rounds each, advancement counts: 30, 3, 1
- No schema changes needed

## Navigation Update

- Contests (dropdown: Summer, Winter)
- Explore
- How It Works
- Recruit
- Sign Up / Login

## Pages to Create/Modify

| Page | Action |
|---|---|
| `/` | Full rewrite |
| `/explore` | New |
| `/contestants` | New |
| `/contests` | Rewrite |
| `/contests/[id]` | Rewrite |
| `/signup` | Rewrite |
| `/signup/contestant` | New |
| `/signup/fan` | New |
| `/signup/recruiter` | New |
| Navbar | Update |
| `/api/content/public` | New |
| `/api/seed` | Update |

## Unchanged

- Dashboard pages, token/vote system, earnings model, admin panel, auth middleware, upload flow, color scheme
