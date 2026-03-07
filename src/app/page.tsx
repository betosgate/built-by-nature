import Link from "next/link";
import Image from "next/image";
import { Flame, Trophy, Users, DollarSign, Camera, Vote, Shield, ArrowRight, Crown, Heart, Star, Plane, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { TrendingContestants } from "@/components/marketing/trending-contestants";
import { CountdownTimer } from "@/components/marketing/countdown-timer";
import { StatsBar } from "@/components/marketing/stats-bar";
import { Testimonials } from "@/components/marketing/testimonials";
import { FAQSection } from "@/components/marketing/faq-section";

const contestantImages = [
  { src: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&h=800&fit=crop", alt: "Bikini beauty at the beach" },
  { src: "https://images.unsplash.com/photo-1727773563114-aedb6c33b7c7?w=600&h=800&fit=crop", alt: "Swimwear model posing on the sand" },
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop", alt: "Confident woman in bikini" },
  { src: "https://images.unsplash.com/photo-1600980979121-9dea33866719?w=600&h=800&fit=crop", alt: "Beach bikini natural beauty" },
  { src: "https://images.unsplash.com/photo-1719300570685-ac826a21f97c?w=600&h=800&fit=crop", alt: "Swimwear beach goddess" },
  { src: "https://images.unsplash.com/photo-1608460457909-d2c153f97f90?w=600&h=800&fit=crop", alt: "Bikini beauty golden hour" },
];

export default function HomePage() {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed

  const calendarPhases = [
    {
      months: "Jan \u2013 Mar",
      name: "Summer Enrollment",
      description: "Sign up, build your profile, and prepare for the summer competition.",
      active: currentMonth >= 0 && currentMonth <= 2,
    },
    {
      months: "Apr \u2013 Jun",
      name: "Summer Competition",
      description: "Three rounds of competition. 90 days. One winner crowned.",
      active: currentMonth >= 3 && currentMonth <= 5,
    },
    {
      months: "Jul \u2013 Sep",
      name: "Winter Enrollment",
      description: "Registration opens for the winter season. Get your spot early.",
      active: currentMonth >= 6 && currentMonth <= 8,
    },
    {
      months: "Oct \u2013 Dec",
      name: "Winter Competition",
      description: "The winter season heats up. New contestants, new prizes, same format.",
      active: currentMonth >= 9 && currentMonth <= 11,
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      {/* ===== SECTION 1: FULL-BLEED HERO ===== */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text content */}
            <div>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-6 text-sm px-4 py-1.5">
                <Flame className="h-3.5 w-3.5 mr-1.5" />
                Enrollment Open &mdash; Competition Starts April 1
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Built by Nature
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  Summer 2026
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-6 max-w-lg leading-relaxed">
                The premier natural beauty competition. Three rounds. 90 days. One winner.
              </p>

              <div className="mb-8">
                <p className="text-sm text-zinc-500 mb-3 uppercase tracking-wider font-medium">Competition starts in</p>
                <CountdownTimer targetDate="2026-04-01T00:00:00" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/signup/contestant">
                  <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-14 shadow-lg shadow-amber-500/25 w-full sm:w-auto">
                    Enter the Competition
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14 w-full sm:w-auto">
                    Browse Contestants
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500/70" />
                  <span>18+ Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500/70" />
                  <span>Real Prizes</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-500/70" />
                  <span>Contestants Earn 20%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500/70" />
                  <span>Tattoos &amp; Piercings Welcome</span>
                </div>
              </div>
            </div>

            {/* Right - Contestant photos grid (3 photos) */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Tall left image */}
                <div className="relative aspect-[3/5] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/10">
                  <Image
                    src={contestantImages[0].src}
                    alt={contestantImages[0].alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="300px"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <Badge className="bg-amber-500 text-black border-none mb-2">
                      <Crown className="h-3 w-3 mr-1" /> Featured
                    </Badge>
                  </div>
                </div>
                {/* Right column - two stacked images */}
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/10">
                    <Image
                      src={contestantImages[1].src}
                      alt={contestantImages[1].alt}
                      fill
                      className="object-cover"
                      priority
                      sizes="300px"
                    />
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/10">
                    <Image
                      src={contestantImages[2].src}
                      alt={contestantImages[2].alt}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRENDING CONTESTANTS ===== */}
      <TrendingContestants />

      {/* ===== STATS BAR ===== */}
      <StatsBar />

      {/* ===== SECTION 2: COMPETITION STATUS BAR ===== */}
      <section className="bg-zinc-900 border-t-2 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-3 text-center">
            <Flame className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm sm:text-base font-medium text-gray-200">
              <span className="text-white font-bold">Built by Nature Summer 2026</span>
              <span className="mx-2 text-amber-500">&mdash;</span>
              <span className="text-amber-400">Enrollment Open</span>
              <span className="mx-2 text-amber-500">&mdash;</span>
              Competition starts April 1, 2026
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: ANNUAL TIMELINE / COMPETITION CALENDAR ===== */}
      <section className="py-24 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              The Competition Calendar
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Two seasons per year. Each season features an enrollment period followed by a 90-day competition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {calendarPhases.map((phase) => (
              <div
                key={phase.name}
                className={`rounded-2xl p-6 border transition-all duration-300 ${
                  phase.active
                    ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                }`}
              >
                <div className="text-sm font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  {phase.months}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${phase.active ? "text-amber-400" : "text-white"}`}>
                  {phase.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {phase.description}
                </p>
                {phase.active && (
                  <Badge className="bg-amber-500 text-black border-none mt-4 text-xs font-bold">
                    Current Phase
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: THE FORMAT — 3-ROUND ELIMINATION ===== */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
              <Trophy className="h-3 w-3 mr-1" /> 3-Round Elimination
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              How the Competition Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A 90-day elimination format that narrows the field from hundreds to one champion.
            </p>
          </div>

          {/* Three round cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 max-w-5xl mx-auto mb-16 items-stretch">
            {/* Round 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-r-none p-8 text-center hover:bg-white/10 transition-colors relative">
              <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Round 1</h3>
              <p className="text-amber-400 font-semibold text-sm mb-3">30 Days</p>
              <p className="text-gray-400 text-sm">
                All entrants compete. Top 30 advance.
              </p>
              {/* Arrow connector (desktop) */}
              <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-amber-500 rounded-full items-center justify-center text-black font-bold text-lg">
                &rarr;
              </div>
            </div>

            {/* Round 2 */}
            <div className="bg-white/5 border border-white/10 md:border-l-0 md:border-r-0 rounded-2xl md:rounded-none p-8 text-center hover:bg-white/10 transition-colors relative">
              <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Round 2</h3>
              <p className="text-amber-400 font-semibold text-sm mb-3">30 Days</p>
              <p className="text-gray-400 text-sm">
                Top 30 compete. Top 3 advance.
              </p>
              {/* Arrow connector (desktop) */}
              <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-amber-500 rounded-full items-center justify-center text-black font-bold text-lg">
                &rarr;
              </div>
            </div>

            {/* The Finale */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl md:rounded-l-none p-8 text-center hover:border-amber-500/50 transition-colors">
              <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">The Finale</h3>
              <p className="text-amber-400 font-semibold text-sm mb-3">30 Days</p>
              <p className="text-gray-400 text-sm">
                Top 3 compete. One winner crowned.
              </p>
            </div>
          </div>

          {/* Prize callout cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Top 3 — Vegas Trip */}
            <div className="group relative rounded-2xl overflow-hidden border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&h=500&fit=crop"
                  alt="Las Vegas strip at night"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-500 text-black border-none font-bold">
                    <Trophy className="h-3 w-3 mr-1" /> Top 3
                  </Badge>
                </div>
              </div>
              <div className="p-5 bg-zinc-900/80">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Plane className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">All Three Finalists</span>
                </div>
                <h3 className="text-lg font-bold mb-1">Las Vegas VIP Experience</h3>
                <p className="text-gray-400 text-xs">
                  All-expenses-paid Vegas trip for the final round. Luxury suite, VIP access, and professional photoshoot.
                </p>
              </div>
            </div>

            {/* Winner — Italy + $10k */}
            <div className="group relative rounded-2xl overflow-hidden border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=500&fit=crop"
                  alt="Venice Italy canals"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-500 text-black border-none font-bold">
                    <Crown className="h-3 w-3 mr-1" /> Grand Prize Winner
                  </Badge>
                </div>
              </div>
              <div className="p-5 bg-zinc-900/80">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Plane className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Winner Takes All</span>
                </div>
                <h3 className="text-lg font-bold mb-1">Italy Vacation + $10,000 Cash</h3>
                <p className="text-gray-400 text-xs">
                  7-day luxury Italian vacation for two — Rome, Florence, Venice — plus $10,000 cash prize.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CONTESTANT PHOTO FEED ===== */}
      <section className="py-24 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              See Who&apos;s Competing
            </h2>
            <Link href="/explore" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-semibold">
              Explore All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {contestantImages.map((img, i) => (
              <div
                key={i}
                className="relative group aspect-[3/4] rounded-xl overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="w-full bg-amber-500/90 text-black hover:bg-amber-400 font-semibold">
                    <Vote className="mr-2 h-4 w-4" />
                    Vote
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Teaser text */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <Camera className="h-4 w-4" />
              <span>Sign up to unlock exclusive private content</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: THREE PATHS ===== */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Three Ways to Participate
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you want to compete, vote, or recruit &mdash; there&apos;s a place for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Compete */}
            <div className="rounded-2xl p-8 border border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-transparent hover:border-amber-500/70 transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                <Trophy className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Enter as a Contestant</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                Earn 20% of every vote. Top 3 win a Vegas trip. The winner gets Italy + $10,000 cash. Build your fanbase and showcase your natural beauty.
              </p>
              <Link href="/signup/contestant">
                <Button className="w-full bg-amber-500 text-black hover:bg-amber-400 font-bold h-12 shadow-lg shadow-amber-500/20">
                  Start Competing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Vote */}
            <div className="rounded-2xl p-8 border border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Support Your Favorites</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                Your votes decide who wins. Browse contestants, discover new talent, and help your favorite take the crown.
              </p>
              <Link href="/signup/fan">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 font-bold h-12">
                  Sign Up to Vote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Recruit */}
            <div className="rounded-2xl p-8 border border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Recruit &amp; Earn</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                Earn 10% lifetime from every contestant you bring to the platform. Share your link and build passive income.
              </p>
              <Link href="/signup/recruiter">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 font-bold h-12">
                  Become a Recruiter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: EARNINGS BREAKDOWN ===== */}
      <section className="py-24 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
        {/* Subtle background photo */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop"
            alt="Beach background"
            fill
            className="object-cover opacity-5"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everyone Earns
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every token purchase supports the community. Here&apos;s how the revenue flows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contestants card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-colors group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop"
                  alt="Contestant earning"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-5xl font-bold text-amber-400">20%</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-lg font-semibold mb-2">Contestants</div>
                <p className="text-gray-400 text-sm">
                  Earn from every vote you receive. More fans = more income.
                </p>
              </div>
            </div>

            {/* Recruiters card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-colors group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1697739348487-75f668fdb6fb?w=600&h=800&fit=crop"
                  alt="Recruiter earning"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-5xl font-bold text-amber-400">10%</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-lg font-semibold mb-2">Recruiters</div>
                <p className="text-gray-400 text-sm">
                  Earn from every vote your recruited contestants receive.
                </p>
              </div>
            </div>

            {/* Fans card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-colors group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1727896908913-dfb3d1bd2e8d?w=600&h=800&fit=crop"
                  alt="Fan voting"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <Star className="h-12 w-12 text-amber-400" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-lg font-semibold mb-2">Fans</div>
                <p className="text-gray-400 text-sm">
                  Support the women you admire. Your votes decide who wins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <Testimonials />

      {/* ===== FAQ ===== */}
      <FAQSection />

      {/* ===== SECTION 8: FINAL CTA ===== */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background collage effect */}
        <div className="absolute inset-0 grid grid-cols-4 gap-1 opacity-10">
          {contestantImages.concat(contestantImages.slice(0, 2)).map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-8 shadow-xl shadow-amber-500/30">
            <Flame className="h-10 w-10 text-black" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Enter the Built by Nature
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Summer 2026
            </span>{" "}
            Competition
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Enrollment is open now. The competition begins April 1. Don&apos;t miss your chance to compete for incredible prizes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup/contestant">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-10 h-14 shadow-lg shadow-amber-500/25">
                I Want to Compete
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signup/fan">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-10 h-14">
                I Want to Vote
              </Button>
            </Link>
          </div>

          {/* Bottom trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-500/60" />
              <span>18+ Verified Community</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500/60" />
              <span>Real Prizes, Real Trips</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-500/60" />
              <span>Contestants Earn 20%</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-amber-500/60" />
              <span>All Body Types Welcome</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
