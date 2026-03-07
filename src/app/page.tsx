import Link from "next/link";
import Image from "next/image";
import { Flame, Trophy, Users, DollarSign, Camera, Vote, Shield, Share2, Star, ArrowRight, Crown, MapPin, Plane, Heart, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const contestantImages = [
  {
    src: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&h=800&fit=crop",
    alt: "Bikini beauty at the beach",
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop",
    alt: "Swimwear model posing on the sand",
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop",
    alt: "Confident woman in bikini",
  },
  {
    src: "https://images.unsplash.com/photo-1510017098667-27dfc7150acb?w=600&h=800&fit=crop",
    alt: "Beach bikini natural beauty",
  },
  {
    src: "https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?w=600&h=800&fit=crop",
    alt: "Swimwear beach goddess",
  },
  {
    src: "https://images.unsplash.com/photo-1525881889266-d50eb6eda4ca?w=600&h=800&fit=crop",
    alt: "Bikini beauty golden hour",
  },
];

const marqueeContestants = [
  { src: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&h=800&fit=crop", name: "Sophia M.", votes: "12.4k" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop", name: "Ava R.", votes: "11.8k" },
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop", name: "Isabella K.", votes: "10.2k" },
  { src: "https://images.unsplash.com/photo-1510017098667-27dfc7150acb?w=600&h=800&fit=crop", name: "Mia L.", votes: "9.7k" },
  { src: "https://images.unsplash.com/photo-1525881889266-d50eb6eda4ca?w=600&h=800&fit=crop", name: "Luna W.", votes: "9.1k" },
  { src: "https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?w=600&h=800&fit=crop", name: "Aria J.", votes: "8.6k" },
  { src: "https://images.unsplash.com/photo-1725282641844-282ac49abd58?w=600&h=800&fit=crop", name: "Elena T.", votes: "8.2k" },
  { src: "https://images.unsplash.com/photo-1742567009397-c64925e0c3ba?w=600&h=800&fit=crop", name: "Chloe B.", votes: "7.9k" },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop", name: "Zara F.", votes: "7.5k" },
  { src: "https://images.unsplash.com/photo-1727896908913-dfb3d1bd2e8d?w=600&h=800&fit=crop", name: "Nova D.", votes: "7.1k" },
];

const topContestants = [
  {
    rank: 1,
    name: "Sophia Martinez",
    location: "Miami, FL",
    src: "https://images.unsplash.com/photo-1742567009397-c64925e0c3ba?w=600&h=800&fit=crop",
    votes: "12,847",
    badge: "Crown Favorite",
  },
  {
    rank: 2,
    name: "Ava Reynolds",
    location: "Los Angeles, CA",
    src: "https://images.unsplash.com/photo-1617097288997-861d70c2cd2d?w=600&h=800&fit=crop",
    votes: "11,203",
    badge: "Fan Favorite",
  },
  {
    rank: 3,
    name: "Isabella Kim",
    location: "New York, NY",
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop",
    votes: "10,891",
    badge: "Rising Star",
  },
];

const features = [
  {
    icon: Camera,
    title: "Showcase Your Beauty",
    description: "Upload photos and videos that celebrate your natural body. Tattoos, piercings, and real confidence welcome.",
  },
  {
    icon: Vote,
    title: "Fan Voting",
    description: "Fans buy tokens to vote for their favorites. Share your profile link to rally your supporters.",
  },
  {
    icon: Trophy,
    title: "Win Prizes",
    description: "Compete through rounds — from all entrants to top 20, top 3, and the final winner. Real prizes for real beauty.",
  },
  {
    icon: DollarSign,
    title: "Earn Money",
    description: "Contestants earn 20% of all token revenue from votes. The more votes you get, the more you earn.",
  },
  {
    icon: Share2,
    title: "Social Sharing",
    description: "Every photo and profile has a shareable link. Post on Instagram, TikTok, and X to drive votes.",
  },
  {
    icon: Shield,
    title: "Safe & Moderated",
    description: "You control your comments. Age-verified community. Admin oversight keeps everything fair and respectful.",
  },
];

const steps = [
  { number: "01", title: "Sign Up", description: "Create your free account and verify your age (18+)." },
  { number: "02", title: "Create Your Profile", description: "Upload your best photos and videos. Show the world the real you." },
  { number: "03", title: "Enter a Contest", description: "Join an active contest and share your entry link on social media." },
  { number: "04", title: "Get Votes & Win", description: "Fans vote with tokens. Advance through rounds and take the crown." },
];

const mosaicImages = [
  { src: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&h=800&fit=crop", alt: "Bikini beach beauty" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop", alt: "Swimwear model" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop", alt: "Tropical beach" },
  { src: "https://images.unsplash.com/photo-1510017098667-27dfc7150acb?w=600&h=800&fit=crop", alt: "Bikini confident woman" },
  { src: "https://images.unsplash.com/photo-1525881889266-d50eb6eda4ca?w=600&h=800&fit=crop", alt: "Beach bikini beauty" },
  { src: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=1920&h=600&fit=crop", alt: "Beach sunset" },
];

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* ===== HERO SECTION - Split Layout ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-black" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Flame className="h-5 w-5 text-amber-500" />
                <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
                  No filters. No fakes. Just you.
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                Celebrate{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  Natural
                </span>{" "}
                Beauty
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                The contest platform where real women compete, fans vote, and
                authenticity wins. Tattoos, piercings, and natural curves — this is
                where real beauty shines.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-14 shadow-lg shadow-amber-500/25">
                    Enter a Contest
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contests">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14">
                    Browse Contestants
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 mt-12 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-500" />
                  <span>18+ Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span>Real Prizes</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-500" />
                  <span>Contestants Earn 20%</span>
                </div>
              </div>

              {/* Social proof mini-stats */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {contestantImages.slice(0, 4).map((img, i) => (
                    <div key={i} className="relative w-10 h-10 rounded-full border-2 border-black overflow-hidden">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="40px" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">2,400+ contestants competing</p>
                  <p className="text-gray-500 text-xs">Join the fastest growing beauty platform</p>
                </div>
              </div>
            </div>

            {/* Right - Stacked contestant photos */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Tall left image */}
                <div className="relative aspect-[3/5] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&h=800&fit=crop"
                    alt="Featured contestant"
                    fill
                    className="object-cover"
                    priority
                    sizes="300px"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <Badge className="bg-amber-500 text-black border-none mb-2">
                      <Crown className="h-3 w-3 mr-1" /> #1 Trending
                    </Badge>
                    <p className="text-sm font-semibold">Sophia M.</p>
                    <p className="text-xs text-gray-300">12.4k votes</p>
                  </div>
                </div>
                {/* Right column - two stacked images */}
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/10">
                    <Image
                      src="https://images.unsplash.com/photo-1742567009397-c64925e0c3ba?w=600&h=800&fit=crop"
                      alt="Contestant portrait"
                      fill
                      className="object-cover"
                      priority
                      sizes="300px"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-sm font-semibold">Ava R.</p>
                      <p className="text-xs text-gray-300">11.8k votes</p>
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/10">
                    <Image
                      src="https://images.unsplash.com/photo-1561780186-a11781cdb056?w=600&h=800&fit=crop"
                      alt="Contestant portrait"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-sm font-semibold">Elena T.</p>
                      <p className="text-xs text-gray-300">8.2k votes</p>
                    </div>
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

      {/* ===== TRENDING CONTESTANTS MARQUEE ===== */}
      <section className="py-8 bg-zinc-900/50 border-y border-white/5 overflow-hidden">
        <div className="flex items-center gap-3 mb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <TrendingUp className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-bold text-white">Trending Now</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
        </div>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
          {/* Scrolling strip */}
          <div
            className="flex gap-6 w-max"
            style={{
              animation: "marquee 40s linear infinite",
            }}
          >
            {[...marqueeContestants, ...marqueeContestants].map((c, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-amber-500/40 transition-colors cursor-pointer group flex-shrink-0">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/50">
                  <Image src={c.src} alt={c.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.votes} votes</p>
                </div>
                <Heart className="h-4 w-4 text-gray-600 group-hover:text-amber-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
        {/* Keyframes via inline style tag - works in server components */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ===== TOP CONTESTANTS SECTION ===== */}
      <section className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        {/* Background image with heavy overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=600&fit=crop"
            alt="Beach background"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
              <Crown className="h-3 w-3 mr-1" /> Season 1 Leaderboard
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Top Contestants
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These women are leading the competition. Cast your vote and help your favorite take the crown.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {topContestants.map((contestant) => (
              <div
                key={contestant.rank}
                className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${
                  contestant.rank === 1
                    ? "border-amber-500/50 shadow-xl shadow-amber-500/10 md:-mt-4 md:mb-4"
                    : "border-white/10 hover:border-amber-500/30"
                }`}
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={contestant.src}
                    alt={contestant.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Rank badge */}
                  <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    contestant.rank === 1
                      ? "bg-amber-500 text-black"
                      : contestant.rank === 2
                      ? "bg-gray-300 text-black"
                      : "bg-amber-700 text-white"
                  }`}>
                    {contestant.rank}
                  </div>

                  {/* Badge tag */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`text-xs ${
                      contestant.rank === 1
                        ? "bg-amber-500 text-black border-none"
                        : "bg-white/10 text-white border-white/20"
                    }`}>
                      {contestant.badge}
                    </Badge>
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                    <MapPin className="h-3 w-3" />
                    {contestant.location}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{contestant.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-4 w-4 text-amber-500" />
                    <span className="text-amber-400 font-semibold text-sm">{contestant.votes} votes</span>
                  </div>
                  <Link href="/contests">
                    <Button className="w-full bg-amber-500 text-black hover:bg-amber-400 font-bold h-10 shadow-lg shadow-amber-500/20">
                      <Vote className="mr-2 h-4 w-4" />
                      Vote Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contests">
              <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 px-8 h-12">
                View All Contestants
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONTESTANT GALLERY ===== */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real Women. Real Beauty.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our contestants embrace who they are — tattoos, piercings, scars, stretch marks, and all.
              This is a celebration of authenticity.
            </p>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="w-full bg-amber-500/90 text-black hover:bg-amber-400 font-semibold">
                    <Vote className="mr-2 h-4 w-4" />
                    Vote Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        {/* Decorative side image */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden xl:block">
          <Image
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop"
            alt="Decorative"
            fill
            className="object-cover opacity-10"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A platform built for contestants and fans alike. Compete, vote, earn, and connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMAGE MOSAIC / COLLAGE ===== */}
      <section className="py-2 bg-black">
        <div className="max-w-[100vw] overflow-hidden">
          <div className="grid grid-cols-6 grid-rows-2 gap-1 h-[400px]">
            {/* Large left image spanning 2 cols, 2 rows */}
            <div className="relative col-span-2 row-span-2 overflow-hidden">
              <Image
                src={mosaicImages[0].src}
                alt={mosaicImages[0].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            {/* Top middle */}
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src={mosaicImages[1].src}
                alt={mosaicImages[1].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="17vw"
              />
            </div>
            {/* Top wide beach image */}
            <div className="relative col-span-2 row-span-1 overflow-hidden">
              <Image
                src={mosaicImages[2].src}
                alt={mosaicImages[2].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white text-2xl font-bold tracking-wider">BUILT BY NATURE</p>
              </div>
            </div>
            {/* Top right */}
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src={mosaicImages[3].src}
                alt={mosaicImages[3].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="17vw"
              />
            </div>
            {/* Bottom row remaining 4 cells */}
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src={mosaicImages[4].src}
                alt={mosaicImages[4].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="17vw"
              />
            </div>
            <div className="relative col-span-2 row-span-1 overflow-hidden">
              <Image
                src={mosaicImages[5].src}
                alt={mosaicImages[5].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20" />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <div className="text-center p-4">
                <Flame className="h-8 w-8 text-black mx-auto mb-2" />
                <p className="text-black font-bold text-sm">JOIN THE MOVEMENT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STEPS ===== */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get Started in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="text-center relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-px bg-gradient-to-r from-amber-500/50 to-amber-500/10" />
                )}
                <div className="text-5xl font-bold text-amber-500/30 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRIZE SHOWCASE ===== */}
      <section className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
              <Trophy className="h-3 w-3 mr-1" /> Grand Prizes
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Win Once-in-a-Lifetime{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Experiences
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Our winners don&apos;t just get a title. They get unforgettable trips and experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vegas Prize */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-300">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&h=500&fit=crop"
                  alt="Las Vegas strip at night"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-500 text-black border-none font-bold">
                    <Crown className="h-3 w-3 mr-1" /> 1st Place
                  </Badge>
                </div>
              </div>
              <div className="p-6 bg-zinc-900/80">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Plane className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Grand Prize</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Las Vegas VIP Experience</h3>
                <p className="text-gray-400 text-sm mb-4">
                  All-expenses-paid trip to Vegas including luxury hotel suite, VIP club access,
                  professional photoshoot, and $5,000 spending cash.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">5-Star Hotel</Badge>
                  <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">VIP Clubs</Badge>
                  <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">$5,000 Cash</Badge>
                  <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">Pro Photoshoot</Badge>
                </div>
              </div>
            </div>

            {/* Italy Prize */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-300">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=500&fit=crop"
                  alt="Venice Italy canals"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gray-300 text-black border-none font-bold">
                    <Award className="h-3 w-3 mr-1" /> 2nd Place
                  </Badge>
                </div>
              </div>
              <div className="p-6 bg-zinc-900/80">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Plane className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Runner-Up Prize</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Italian Dream Vacation</h3>
                <p className="text-gray-400 text-sm mb-4">
                  7-day luxury Italian vacation covering Rome, Florence, and Venice.
                  Includes boutique hotels, private tours, and $3,000 spending money.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">7 Days</Badge>
                  <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">3 Cities</Badge>
                  <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">$3,000 Cash</Badge>
                  <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">Private Tours</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF / FEATURED IN ===== */}
      <section className="py-12 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
            <span className="text-2xl font-bold tracking-tight">VOGUE</span>
            <span className="text-2xl font-bold tracking-tight">MAXIM</span>
            <span className="text-2xl font-bold tracking-tight">COSMOPOLITAN</span>
            <span className="text-2xl font-bold tracking-tight">ELLE</span>
            <span className="text-2xl font-bold tracking-tight">GQ</span>
            <span className="text-2xl font-bold tracking-tight">GLAMOUR</span>
          </div>
        </div>
      </section>

      {/* ===== RECRUITER CTA ===== */}
      <section className="py-20 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
            {/* Background decorative image */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1541433621554-05421e3a3e5a?w=600&h=800&fit=crop"
                alt="Decorative"
                fill
                className="object-cover opacity-20"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent" />
            </div>

            <div className="flex-1 relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Become a Recruiter & Earn
              </h2>
              <p className="text-gray-300 mb-6">
                Know beautiful women who should be competing? Sign up as a recruiter,
                share your referral link, and earn <strong className="text-amber-400">10% of all token revenue</strong> from
                every contestant you bring to the platform. Track your earnings in real-time.
              </p>
              <Link href="/recruit">
                <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-12 shadow-lg shadow-amber-500/25">
                  Start Recruiting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex-shrink-0 relative z-10">
              <div className="w-48 h-48 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
                <DollarSign className="h-20 w-20 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EARNINGS BREAKDOWN ===== */}
      <section className="py-24 bg-black relative overflow-hidden">
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

      {/* ===== FINAL CTA ===== */}
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
            Ready to Show the World?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join the movement celebrating natural beauty. Sign up today and start competing
            for incredible prizes and a loyal fanbase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=contestant">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-10 h-14 shadow-lg shadow-amber-500/25">
                I Want to Compete
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signup?role=fan">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-10 h-14">
                I Want to Vote
              </Button>
            </Link>
          </div>

          {/* Bottom trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-500/60" />
              <span>Age Verified Community</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-500/60" />
              <span>2,400+ Active Contestants</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-500/60" />
              <span>$180k+ Earned by Contestants</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
