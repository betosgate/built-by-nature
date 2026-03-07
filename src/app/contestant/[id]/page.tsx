import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Trophy,
  Star,
  Share2,
  MessageCircle,
  Lock,
  Eye,
  Copy,
  ThumbsUp,
  DollarSign,
  Crown,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { MOCK_CONTESTANTS } from "@/lib/mock-data";

const comments = [
  {
    id: "c1",
    user: "VoteKing99",
    avatar: "https://images.unsplash.com/photo-1742567009397-c64925e0c3ba?w=80&h=80&fit=crop",
    text: "Absolutely stunning! Voted 20 tokens today. Keep slaying queen!",
    time: "2h ago",
    likes: 12,
  },
  {
    id: "c2",
    user: "BeachVibes",
    avatar: "https://images.unsplash.com/photo-1725282641844-282ac49abd58?w=80&h=80&fit=crop",
    text: "That golden hour shot is insane. Deserves first place for sure.",
    time: "5h ago",
    likes: 8,
  },
  {
    id: "c3",
    user: "FitnessFan23",
    avatar: "https://images.unsplash.com/photo-1697739348487-75f668fdb6fb?w=80&h=80&fit=crop",
    text: "So refreshing to see real, natural beauty. You've got my votes!",
    time: "1d ago",
    likes: 24,
  },
];

export default function ContestantProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In a real app we'd await params and fetch from DB
  const contestant = MOCK_CONTESTANTS[0]; // Default to first contestant for demo
  const privatePhotos = [
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1510017098667-27dfc7150acb?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1525881889266-d50eb6eda4ca?w=400&h=500&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero / Cover */}
      <div className="relative h-56 w-full sm:h-72">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=400&fit=crop"
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="-mt-20 mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="relative size-36 shrink-0 overflow-hidden rounded-full border-4 border-black sm:size-40">
            <Image
              src={contestant.avatar_url}
              alt={contestant.display_name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold sm:text-4xl">
              {contestant.display_name}
            </h1>
            <p className="mt-2 max-w-xl text-zinc-400">{contestant.bio}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                Rank #{contestant.rank}
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Competing in Season 1
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-amber-500 hover:border-amber-500">
              <Share2 className="size-4" />
            </Button>
            <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-amber-500 hover:border-amber-500">
              <Copy className="size-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Votes", value: contestant.vote_count.toLocaleString(), icon: Heart },
            { label: "Contests Entered", value: contestant.contests_entered, icon: Trophy },
            { label: "Current Rank", value: `#${contestant.rank}`, icon: Star },
            { label: "Earning 20%", value: `$${(contestant.vote_count * 5 * 0.2).toLocaleString()}`, icon: DollarSign },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-center">
              <stat.icon className="mx-auto mb-2 size-5 text-amber-500" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Earnings Info Banner */}
        <div className="mb-12 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
          <div className="flex items-start gap-4">
            <DollarSign className="size-8 text-green-400 shrink-0" />
            <div>
              <h3 className="text-base font-bold text-green-400 mb-1">Contestants Earn 20% of Token Revenue</h3>
              <p className="text-sm text-zinc-400">
                Each $5 token gives 5 votes. <strong className="text-white">{contestant.display_name}</strong> earns
                20% of every token spent voting for her — that&apos;s <strong className="text-green-400">$1 per token</strong>.
                Want to be a contestant?{" "}
                <Link href="/signup?role=contestant" className="text-amber-400 hover:underline">Sign up here</Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Prize Info */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Plane className="size-5 text-amber-500" />
              <h4 className="font-semibold text-amber-400">Top 3 — Vegas Trip</h4>
            </div>
            <p className="text-sm text-zinc-400">
              Top 3 finalists get flown to Vegas with +1 for 3 nights. Travel, hotel, meals paid.
              Professional photo &amp; video shoot for the final round.
            </p>
          </div>
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="size-5 text-yellow-400" />
              <h4 className="font-semibold text-yellow-400">Grand Prize — $10,000</h4>
            </div>
            <p className="text-sm text-zinc-400">
              Winner is crowned Built by Nature Queen and wins a one-week Italy vacation
              for two — flight and hotel paid.
            </p>
          </div>
        </div>

        {/* Public Gallery */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold">Public Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {contestant.photos.map((photo) => (
              <div key={photo.id} className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-zinc-800">
                <Image src={photo.url} alt={photo.caption} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                  {photo.caption}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 18+ Content Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold">Exclusive Content (18+)</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {privatePhotos.map((src, i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-xl border border-zinc-800">
                <Image src={src} alt="Private content" fill className="object-cover blur-xl scale-110" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                  <Lock className="mb-3 size-8 text-amber-500" />
                  <span className="text-sm font-semibold text-white">18+ Content</span>
                  <span className="mt-1 text-xs text-zinc-400">Verify Age to View</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/signup">
              <Button className="bg-amber-500 text-black hover:bg-amber-400">
                <Lock className="size-4" />
                Sign Up &amp; Verify Age to Unlock
              </Button>
            </Link>
          </div>
        </section>

        {/* Vote CTA */}
        <section className="mb-12">
          <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-8 text-center">
            <Heart className="mx-auto mb-4 size-12 text-amber-500" />
            <h2 className="mb-2 text-2xl font-bold">
              Vote for {contestant.display_name}
            </h2>
            <p className="mb-2 text-zinc-400">
              Support your favorite contestant with tokens. Each $5 token gives you 5 votes.
            </p>
            <p className="mb-6 text-sm text-green-400">
              {contestant.display_name} earns $1 from every token spent. Help her win!
            </p>
            <div className="mx-auto mb-6 flex max-w-sm items-center justify-center gap-2">
              {[1, 5, 10, 15, 20].map((amount) => (
                <button
                  key={amount}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-400"
                >
                  {amount}
                </button>
              ))}
            </div>
            <p className="text-xs text-zinc-600 mb-4">Max 20 tokens (100 votes) per day per contestant</p>
            <Link href="/signup">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 px-8 h-12 font-bold text-lg">
                <Heart className="size-5" />
                Vote Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Comments */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold">Comments ({comments.length})</h2>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="relative size-8 overflow-hidden rounded-full">
                    <Image src={comment.avatar} alt={comment.user} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white">{comment.user}</span>
                    <span className="ml-2 text-xs text-zinc-500">{comment.time}</span>
                  </div>
                </div>
                <p className="mb-2 text-sm text-zinc-300">{comment.text}</p>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <button className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                    <ThumbsUp className="size-3" />
                    {comment.likes}
                  </button>
                  <button className="hover:text-amber-500 transition-colors">Reply</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-zinc-800">
              <MessageCircle className="absolute inset-0 m-auto size-4 text-zinc-500" />
            </div>
            <div className="flex flex-1 items-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
              <span className="text-sm text-zinc-600">Log in to comment...</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
