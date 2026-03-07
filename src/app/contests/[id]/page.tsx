import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Users,
  Trophy,
  Heart,
  Shield,
  Calendar,
  Star,
  ArrowRight,
  DollarSign,
  Plane,
  Crown,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { MOCK_CONTESTANTS, MOCK_CONTEST } from "@/lib/mock-data";

export default function ContestDetailPage() {
  const contest = MOCK_CONTEST;
  const contestants = MOCK_CONTESTANTS;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-72 w-full sm:h-96">
        <Image
          src={contest.cover_image_url}
          alt={contest.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Badge className="mb-3 bg-amber-500/20 text-amber-400 border-amber-500/30">
            Pre-Registration Open — Contest Starts May 1st
          </Badge>
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {contest.name}
          </h1>
          <p className="max-w-2xl text-zinc-300">{contest.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-amber-500" />
              {contest.entrants_count} Entrants
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="size-4 text-amber-500" />
              {contestants.reduce((sum, c) => sum + c.vote_count, 0).toLocaleString()} Total Votes
            </span>
            <span className="flex items-center gap-1.5">
              <Trophy className="size-4 text-amber-500" />
              Grand Prize: $10,000
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Earnings Banner */}
        <div className="mb-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
          <div className="flex items-start gap-4">
            <DollarSign className="size-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-green-400 mb-1">Contestants Earn 20% of All Token Revenue</h3>
              <p className="text-zinc-400 text-sm">
                Every vote you receive puts money in your pocket. Fans spend $5 per token to vote — you earn 20% of every
                dollar spent on your votes. The more fans you attract, the more you earn, win or lose.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Pre-Registration Banner */}
            <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
              <div className="mb-1 text-sm font-medium text-amber-500">
                Pre-Registration Phase
              </div>
              <h2 className="mb-2 text-2xl font-bold">
                Sign Up Early &amp; Build Your Audience
              </h2>
              <p className="mb-3 text-zinc-400">
                The contest officially starts <strong className="text-white">May 1, 2026</strong>. But you can
                sign up <strong className="text-white">now</strong>, upload your photos and videos, build your profile,
                and share your page on social media to get your fans ready. When the contest goes live,
                your fans can start buying tokens and voting immediately.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
                  <div className="text-sm font-semibold text-green-400 mb-1">Available Now</div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>Sign up &amp; create your profile</li>
                    <li>Upload photos &amp; videos</li>
                    <li>Share your page on social media</li>
                    <li>Build your fan base early</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-zinc-800/50 border border-zinc-700 p-3">
                  <div className="text-sm font-semibold text-zinc-400 mb-1">Starts May 1st</div>
                  <ul className="text-xs text-zinc-500 space-y-1">
                    <li>Token purchases open</li>
                    <li>Voting begins</li>
                    <li>Contest rounds start</li>
                    <li>Earnings tracking begins</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500 mt-4">
                <Clock className="size-4 text-amber-500" />
                Entry deadline: April 15, 2026 — Contest starts: May 1, 2026
              </div>
            </div>

            {/* Contestants Grid */}
            <h2 className="mb-6 text-xl font-bold">
              Contestants ({contestants.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {contestants.map((contestant) => (
                <div
                  key={contestant.id}
                  className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-amber-500/50"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={contestant.photos[0].url}
                      alt={contestant.display_name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    {contestant.rank <= 3 && (
                      <div className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-black">
                        #{contestant.rank}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <Link href={`/contestant/${contestant.id}`}>
                        <h3 className="text-base font-bold text-white hover:text-amber-400 transition-colors">
                          {contestant.display_name}
                        </h3>
                      </Link>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{contestant.bio}</p>
                      <div className="flex items-center gap-1 text-sm text-zinc-300 mt-1">
                        <Heart className="size-3.5 text-amber-500" />
                        {contestant.vote_count.toLocaleString()} votes
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <Link href={`/contestant/${contestant.id}`}>
                      <Button className="w-full bg-amber-500 text-black hover:bg-amber-400">
                        <Heart className="size-4" />
                        Vote
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enter CTA */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
              <Star className="mx-auto mb-3 size-10 text-amber-500" />
              <h3 className="mb-2 text-lg font-bold">Want to Compete?</h3>
              <p className="mb-2 text-sm text-zinc-400">
                Join {contest.entrants_count} other contestants and compete for
                the grand prize.
              </p>
              <p className="mb-4 text-xs text-green-400">
                Earn 20% of all voting token revenue on your votes!
              </p>
              <Link href="/signup?role=contestant">
                <Button className="w-full bg-amber-500 text-black hover:bg-amber-400">
                  Enter This Contest
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            {/* Prizes - Top 3 */}
            <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                <Plane className="size-5 text-amber-500" />
                Top 3 Finalists — Vegas Experience
              </h3>
              <div className="space-y-3 text-sm text-zinc-300">
                <p>The <strong className="text-white">top 3 finalists</strong> will each receive:</p>
                <ul className="space-y-2 ml-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                    Flown to <strong className="text-amber-400">Las Vegas</strong> with one person of their choice
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                    <strong className="text-white">3 nights</strong> — travel, hotel, and full meals paid
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                    Professional <strong className="text-white">photo and video shoot</strong> in Vegas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                    Pro content goes into the <strong className="text-white">final round</strong> for the Grand Prize
                  </li>
                </ul>
              </div>
            </div>

            {/* Grand Prize */}
            <div className="rounded-xl border border-yellow-500/40 bg-gradient-to-b from-yellow-500/15 to-transparent p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                <Crown className="size-5 text-yellow-400" />
                Grand Prize — Built by Nature Queen
              </h3>
              <div className="space-y-3 text-sm text-zinc-300">
                <p>The <strong className="text-yellow-400">Grand Prize Winner</strong> receives:</p>
                <ul className="space-y-2 ml-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-yellow-400" />
                    <strong className="text-yellow-400 text-lg">$10,000 cash</strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-yellow-400" />
                    Crowned the <strong className="text-yellow-400">Built by Nature Queen</strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-yellow-400" />
                    <strong className="text-white">One-week vacation to Italy</strong> for two — flight and hotel paid
                  </li>
                </ul>
              </div>
            </div>

            {/* Rules */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                <Shield className="size-5 text-amber-500" />
                Contest Rules
              </h3>
              <ul className="space-y-2">
                {[
                  "Must be 18+ with age verification",
                  "Natural beauty only — no cosmetic surgery or fillers",
                  "Tattoos and piercings welcome",
                  "Voting: $5 per token (5 votes each), max 20 tokens/day/contestant",
                  "Contestants earn 20% of token revenue",
                  "Cheating = instant disqualification",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                    {rule}
                  </li>
                ))}
              </ul>
              <Link href="/rules" className="mt-4 block text-sm text-amber-500 hover:text-amber-400">
                Read full rules &rarr;
              </Link>
            </div>

            {/* Timeline */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                <Calendar className="size-5 text-amber-500" />
                Contest Rounds
              </h3>
              <div className="space-y-4">
                {contest.rounds.map((round, i) => (
                  <div key={i} className="relative flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`size-3 rounded-full ${
                          round.status === "active"
                            ? "bg-amber-500"
                            : round.status === "completed"
                            ? "bg-green-500"
                            : "bg-zinc-600"
                        }`}
                      />
                      {i < contest.rounds.length - 1 && (
                        <div className="h-full w-px bg-zinc-700" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-sm font-medium text-white">
                        Round {round.number}: {round.name}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {round.start_date} — {round.end_date}
                      </div>
                      <div className="text-xs text-zinc-600">
                        Top {round.advancement_count} advance
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter CTA */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
              <Camera className="mx-auto mb-3 size-8 text-amber-500" />
              <h3 className="mb-2 text-base font-bold">Know Someone Who Should Compete?</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Become a recruiter and earn <strong className="text-amber-400">10% of all token revenue</strong> from
                contestants you bring in.
              </p>
              <Link href="/recruit">
                <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                  Become a Recruiter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
