import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Trophy, ArrowRight, DollarSign, Crown, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { MOCK_CONTEST, MOCK_CONTESTANTS } from "@/lib/mock-data";

export default function ContestsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Active <span className="text-amber-500">Contests</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Browse live competitions, vote for your favorites, or enter as a
            contestant. Earn 20% of all token revenue on your votes.
          </p>
        </div>

        {/* Earnings Callout */}
        <div className="mb-10 rounded-2xl border border-green-500/20 bg-green-500/5 p-6 text-center">
          <DollarSign className="mx-auto mb-2 size-8 text-green-400" />
          <h3 className="text-lg font-bold text-green-400 mb-1">Contestants Earn Real Money</h3>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Every vote generates revenue. <strong className="text-white">Contestants earn 20%</strong> of all token dollars
            spent on their votes. The more fans you attract, the more you earn — win or lose.
            <Link href="/recruit" className="text-amber-400 ml-1 hover:underline">Recruiters earn 10%</Link>.
          </p>
        </div>

        {/* Featured Contest */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Crown className="size-5 text-amber-500" />
            Featured Contest
          </h2>
          <div className="group overflow-hidden rounded-2xl border border-amber-500/30 bg-zinc-900/50 transition-all hover:shadow-lg hover:shadow-amber-500/5">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <Image
                src={MOCK_CONTEST.cover_image_url}
                alt={MOCK_CONTEST.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <Badge className="absolute right-4 top-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
                Pre-Registration Open — Starts May 1st
              </Badge>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{MOCK_CONTEST.name}</h3>
                <p className="text-zinc-300 max-w-2xl mb-4">{MOCK_CONTEST.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="size-4 text-amber-500" />
                    {MOCK_CONTESTANTS.length} Entrants
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Trophy className="size-4 text-amber-500" />
                    Round {MOCK_CONTEST.current_round} of {MOCK_CONTEST.total_rounds}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4 text-amber-500" />
                    Entry deadline: April 15, 2026
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Prize Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Plane className="size-5 text-amber-500" />
                    <h4 className="font-semibold text-amber-400">Top 3 — Vegas Trip</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    3 nights in Vegas with +1. Travel, hotel, meals paid.
                    Professional photo &amp; video shoot for the final round.
                  </p>
                </div>
                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="size-5 text-yellow-400" />
                    <h4 className="font-semibold text-yellow-400">Grand Prize — $10,000</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Crowned Built by Nature Queen. One-week Italy vacation
                    for two — flight and hotel paid.
                  </p>
                </div>
              </div>

              {/* Top Contestants Preview */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-3">
                  {MOCK_CONTESTANTS.slice(0, 5).map((c) => (
                    <div key={c.id} className="relative size-10 rounded-full border-2 border-black overflow-hidden">
                      <Image src={c.avatar_url} alt={c.display_name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-zinc-400">
                  {MOCK_CONTESTANTS.length} contestants competing
                </span>
              </div>

              <Link href={`/contests/${MOCK_CONTEST.id}`}>
                <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold px-8 h-12">
                  View Contest & Vote
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div>
          <h2 className="text-xl font-bold mb-4">Coming Soon</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Ink & Beauty",
                description: "Tattoo showcase meets beauty contest. Show off your body art in its full glory.",
                image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=400&fit=crop",
                status: "Coming Soon",
              },
              {
                name: "Fitness Natural",
                description: "For fitness enthusiasts and athletes. Showcase your natural physique and training results.",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
                status: "Coming Soon",
              },
              {
                name: "Beach Goddess",
                description: "Sun, sand, and natural beauty. The ultimate beach photo contest.",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
                status: "Coming Soon",
              },
            ].map((contest) => (
              <div
                key={contest.name}
                className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 opacity-75"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={contest.image}
                    alt={contest.name}
                    fill
                    className="object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute right-3 top-3 bg-zinc-500/20 text-zinc-400 border-zinc-500/30">
                    {contest.status}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold">{contest.name}</h3>
                  <p className="mb-4 text-sm text-zinc-500">{contest.description}</p>
                  <Button variant="outline" className="w-full border-zinc-700 text-zinc-400" disabled>
                    Coming Soon
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
