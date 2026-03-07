import Link from "next/link";
import {
  Flame,
  ShieldCheck,
  Users,
  Vote,
  Trophy,
  Camera,
  MessageSquare,
  Gift,
  Gavel,
  DollarSign,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock,
  Ban,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const eligibilityAllowed = [
  "Tattoos of any size or placement",
  "Piercings (facial, body, ear, etc.)",
  "Scars and birthmarks",
  "Stretch marks",
  "Natural body shapes of all kinds",
];

const eligibilityNotAllowed = [
  "Breast implants or augmentation",
  "Butt lifts or BBLs (Brazilian Butt Lifts)",
  "Lip fillers or lip injections",
  "Facial fillers (cheek, jaw, etc.)",
  "Any surgical cosmetic augmentation",
];

const rounds = [
  {
    stage: "Round 1",
    title: "All Entrants",
    description: "Every verified contestant competes. Fans vote to determine the top performers.",
  },
  {
    stage: "Round 2",
    title: "Top 20",
    description: "The top 20 vote-getters advance. Competition intensifies as the field narrows.",
  },
  {
    stage: "Round 3",
    title: "Top 3",
    description: "Three finalists battle for the crown. Every vote counts more than ever.",
  },
  {
    stage: "Winner",
    title: "1 Champion",
    description: "The contestant with the most votes takes the title and the grand prize.",
  },
];

export default function RulesPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-amber-500" />
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
              Official Rules
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Contest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Rules & Guidelines
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Built by Nature celebrates authenticity. These rules ensure a fair, safe, and
            empowering experience for every contestant and fan. Please read them carefully
            before entering any contest.
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Eligibility</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-6 w-6 text-amber-500" />
              <h3 className="text-xl font-semibold">Age & Location</h3>
            </div>
            <p className="text-gray-300 text-lg">
              All contestants must be <strong className="text-white">18 years of age or older</strong>.
              Contests are <strong className="text-white">open worldwide</strong> to participants of
              all nationalities and backgrounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Allowed */}
            <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
                Natural Beauty — Allowed
              </h3>
              <ul className="space-y-4">
                {eligibilityAllowed.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Allowed */}
            <div className="bg-white/5 border border-red-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-500" />
                Not Allowed — Cosmetic Surgery
              </h3>
              <ul className="space-y-4">
                {eligibilityNotAllowed.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Voting System */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Vote className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Voting System</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl font-bold text-amber-400 mb-3">$5</div>
              <h3 className="text-lg font-semibold mb-2">Per Token</h3>
              <p className="text-gray-400">
                Fans purchase voting tokens at $5 each. Each token equals one vote
                for the contestant of your choice.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl font-bold text-amber-400 mb-3">20</div>
              <h3 className="text-lg font-semibold mb-2">Max Votes / Day</h3>
              <p className="text-gray-400">
                Each fan can cast a maximum of 20 votes per contestant per day.
                This keeps the competition fair and prevents vote flooding.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl font-bold text-amber-400 mb-3">
                <Clock className="h-10 w-10 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Daily Reset</h3>
              <p className="text-gray-400">
                Vote limits reset every 24 hours. Come back each day to support
                your favorite contestants throughout each round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Rounds */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Trophy className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Competition Rounds</h2>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/50 via-amber-500 to-amber-500/50" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {rounds.map((round, i) => (
                <div key={round.stage} className="relative text-center">
                  <div className="relative z-10 w-24 h-24 bg-gray-950 border-2 border-amber-500/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-amber-400">
                      {i === 3 ? (
                        <Trophy className="h-8 w-8 text-amber-400" />
                      ) : (
                        round.stage.split(" ")[1]
                      )}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{round.title}</h3>
                  <p className="text-gray-400 text-sm">{round.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-gray-300">
              <strong className="text-amber-400">Note:</strong> Round timelines, durations, and
              advancement criteria are set by contest administrators and may vary between contests.
              Check each contest page for specific schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Content Guidelines */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Camera className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Content Guidelines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold">
                  Public
                </span>
                <span className="text-gray-400 text-sm">PG-13 Content</span>
              </div>
              <p className="text-gray-300 mb-4">
                Public content is visible to all visitors. This includes tasteful photos,
                portraits, lifestyle shots, and fashion content appropriate for general audiences.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  Portraits and lifestyle photos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  Fashion and casual wear
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  Athletic and fitness content
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-semibold">
                  18+
                </span>
                <span className="text-gray-400 text-sm">Age-Gated Content</span>
              </div>
              <p className="text-gray-300 mb-4">
                18+ content is behind an age verification gate and only visible to verified
                adult users. Bikini and lingerie content is permitted.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-500 shrink-0" />
                  Bikini and swimwear photos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-500 shrink-0" />
                  Lingerie and intimate apparel
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                  No explicit pornography of any kind
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comments & Community */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Comments & Community</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              Contestants have <strong className="text-white">full control over their comment sections</strong>.
              You can delete inappropriate comments, restrict who can comment on your content, and
              manage your community as you see fit. Our admin team also provides oversight to ensure
              a respectful, safe environment for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Prizes & Earnings */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Gift className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Prizes & Earnings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Contest Prizes</h3>
              <p className="text-gray-300 mb-4">
                Prizes vary by contest and may include:
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-amber-500 shrink-0" />
                  Cash prizes
                </li>
                <li className="flex items-center gap-3">
                  <Gift className="h-5 w-5 text-amber-500 shrink-0" />
                  Gift cards and merchandise
                </li>
                <li className="flex items-center gap-3">
                  <Flame className="h-5 w-5 text-amber-500 shrink-0" />
                  Brand sponsorship deals
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Token Revenue Sharing</h3>
              <p className="text-gray-300 mb-6">
                Beyond contest prizes, participants earn from every vote they receive:
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-black/30 rounded-xl p-4">
                  <span className="text-gray-300">Contestants earn</span>
                  <span className="text-2xl font-bold text-amber-400">20%</span>
                </div>
                <div className="flex items-center justify-between bg-black/30 rounded-xl p-4">
                  <span className="text-gray-300">Recruiters earn</span>
                  <span className="text-2xl font-bold text-amber-400">10%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Revenue is calculated from all token purchases used to vote on your profile
                or contestants you recruited.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Play & IP */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Ban className="h-6 w-6 text-amber-500" />
                </div>
                <h2 className="text-3xl font-bold">Fair Play</h2>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  <strong className="text-red-400">Cheating of any kind results in immediate
                  disqualification.</strong> This includes but is not limited to: bot voting,
                  fake accounts, vote manipulation, impersonation, and any attempt to game the
                  system. Our moderation team actively monitors all activity.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Gavel className="h-6 w-6 text-amber-500" />
                </div>
                <h2 className="text-3xl font-bold">Content Ownership</h2>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  <strong className="text-white">Contestants retain full ownership</strong> of all
                  photos and videos they upload. By entering a contest, you grant Built by Nature a
                  non-exclusive license to display your content on the platform for the purposes of
                  the competition and promotion. You may request removal at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Flame className="h-12 w-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Compete?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Now that you know the rules, it&apos;s time to show the world your natural beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=contestant">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-12">
                Enter a Contest
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contests">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-12">
                Browse Contests
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
