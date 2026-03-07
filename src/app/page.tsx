import Link from "next/link";
import Image from "next/image";
import { Flame, Trophy, Users, DollarSign, Camera, Vote, Shield, Share2, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const contestantImages = [
  {
    src: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&h=800&fit=crop",
    alt: "Natural beauty contestant at beach",
  },
  {
    src: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?w=600&h=800&fit=crop",
    alt: "Woman with tattoos posing confidently",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
    alt: "Natural beauty portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop",
    alt: "Confident woman natural look",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop",
    alt: "Beach beauty natural",
  },
  {
    src: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&h=800&fit=crop",
    alt: "Woman embracing natural beauty",
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

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1920&h=1080&fit=crop"
            alt="Natural beauty hero"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="h-5 w-5 text-amber-500" />
              <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
                No filters. No fakes. Just you.
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Celebrate{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Natural
              </span>{" "}
              Beauty
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              The contest platform where real women compete, fans vote, and
              authenticity wins. Tattoos, piercings, and natural curves — this is
              where real beauty shines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-12">
                  Enter a Contest
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contests">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-12">
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
          </div>
        </div>
      </section>

      {/* Contestant Gallery */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
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

      {/* Features */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
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

      {/* Steps */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get Started in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
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

      {/* Recruiter CTA */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">
                Become a Recruiter & Earn
              </h2>
              <p className="text-gray-300 mb-6">
                Know beautiful women who should be competing? Sign up as a recruiter,
                share your referral link, and earn <strong className="text-amber-400">10% of all token revenue</strong> from
                every contestant you bring to the platform. Track your earnings in real-time.
              </p>
              <Link href="/recruit">
                <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-12">
                  Start Recruiting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-amber-500/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-20 w-20 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Breakdown */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everyone Earns
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every token purchase supports the community. Here&apos;s how the revenue flows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">20%</div>
              <div className="text-lg font-semibold mb-2">Contestants</div>
              <p className="text-gray-400 text-sm">
                Earn from every vote you receive. More fans = more income.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">10%</div>
              <div className="text-lg font-semibold mb-2">Recruiters</div>
              <p className="text-gray-400 text-sm">
                Earn from every vote your recruited contestants receive.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">
                <Star className="h-10 w-10 text-amber-400 mx-auto" />
              </div>
              <div className="text-lg font-semibold mb-2">Fans</div>
              <p className="text-gray-400 text-sm">
                Support the women you admire. Your votes decide who wins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Flame className="h-12 w-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Show the World?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the movement celebrating natural beauty. Sign up today and start competing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=contestant">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-12">
                I Want to Compete
              </Button>
            </Link>
            <Link href="/signup?role=fan">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-12">
                I Want to Vote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
