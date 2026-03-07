import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Heart,
  Shield,
  Users,
  Scale,
  DollarSign,
  ArrowRight,
  Sparkles,
  Target,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const values = [
  {
    icon: Sparkles,
    title: "Authenticity",
    description:
      "We celebrate real bodies, real beauty, and real confidence. No filters, no surgical enhancements — just the natural you. Tattoos, piercings, scars, and stretch marks are all part of what makes you unique.",
  },
  {
    icon: Heart,
    title: "Empowerment",
    description:
      "Every woman deserves to feel powerful in her own skin. Built by Nature gives contestants the platform, the audience, and the earning potential to turn their natural beauty into real opportunity.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We are building more than a contest — we are building a movement. A community of contestants, fans, and recruiters who believe that beauty standards should be redefined by real people, not by industry gatekeepers.",
  },
  {
    icon: Scale,
    title: "Fairness",
    description:
      "Every vote is transparent. Every contestant plays by the same rules. Daily vote caps, anti-cheat monitoring, and admin oversight ensure that success comes from genuine fan support — not manipulation.",
  },
];

const teamPillars = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To create the world's premier platform for natural beauty competitions — where real women compete on an even playing field, earn real money, and build real fanbases. We exist to prove that the most beautiful thing a woman can be is herself.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where beauty contests celebrate what nature gave you, not what a surgeon added. Where every woman, regardless of background, body type, or location, can step into the spotlight and be recognized for her authentic self.",
  },
  {
    icon: Shield,
    title: "Our Promise",
    description:
      "We will always prioritize the safety, dignity, and earning power of our contestants. The platform is designed so that contestants control their content, their comments, and their experience. Your body, your rules.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop"
          alt="Beautiful beach landscape"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="h-5 w-5 text-amber-500" />
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
              About Us
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
            Beauty Shouldn&apos;t Be{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Manufactured
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Built by Nature is the contest platform that celebrates what you were born with.
            We believe the most stunning beauty is the kind that cannot be bought, injected,
            or surgically enhanced. Real bodies. Real confidence. Real winners.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">The Problem We Saw</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Beauty contests have been around for decades, but somewhere along the way they
                stopped celebrating natural beauty. Cosmetic surgery, fillers, and enhancements
                became the unspoken requirement. Real women with real bodies were pushed aside.
              </p>
              <p>
                We built this platform because we believe that tattoos tell stories, that scars
                show strength, that stretch marks are a badge of honor, and that natural curves
                are something to be celebrated — not surgically modified.
              </p>
              <p className="text-white font-medium">
                Built by Nature is our answer: a level playing field where authenticity is the
                only requirement and fans decide who wins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contestant Photo Strip */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=500&fit=crop",
                label: "Natural Beauty",
              },
              {
                src: "https://images.unsplash.com/photo-1742567009397-c64925e0c3ba?w=400&h=500&fit=crop",
                label: "Authentic",
              },
              {
                src: "https://images.unsplash.com/photo-1561780186-a11781cdb056?w=400&h=500&fit=crop",
                label: "Real",
              },
              {
                src: "https://images.unsplash.com/photo-1754496763355-4a1081c1f58c?w=400&h=500&fit=crop",
                label: "Confident",
              },
            ].map((photo) => (
              <div
                key={photo.label}
                className="relative aspect-[3/4] rounded-xl overflow-hidden group"
              >
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-semibold text-lg tracking-wide">
                    {photo.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Promise */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                  <pillar.icon className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything we build is guided by four principles that put contestants and
              authenticity first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="flex gap-6 bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-500/30 transition-colors"
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center">
                    <value.icon className="h-7 w-7 text-amber-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everyone Earns</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We believe the people who make this platform great should share in its success.
              That is why we built revenue sharing into our DNA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contestants */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl font-bold text-amber-400">20%</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Contestant Earnings</h3>
                  <p className="text-gray-400 text-sm">Of all token revenue from your votes</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Every time a fan buys tokens to vote for you, you earn 20% of that revenue.
                The more fans you attract, the more you promote your profile, the more you earn —
                win or lose. Your earnings are not tied to winning the contest.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-500 shrink-0" />
                  Earn from every single vote you receive
                </li>
                <li className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-500 shrink-0" />
                  No minimum payout threshold
                </li>
                <li className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-500 shrink-0" />
                  Track earnings in real-time on your dashboard
                </li>
              </ul>
            </div>

            {/* Recruiters */}
            <div className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl font-bold text-amber-400">10%</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Recruiter Earnings</h3>
                  <p className="text-gray-400 text-sm">Of all token revenue from recruited contestants</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Know someone who belongs on this platform? Sign up as a recruiter, share your
                referral link, and earn 10% of all token revenue generated by every contestant
                you bring to Built by Nature. This is not a one-time bonus — you earn forever.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-500 shrink-0" />
                  Lifetime earnings from recruited contestants
                </li>
                <li className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-500 shrink-0" />
                  No cap on how many you can recruit
                </li>
                <li className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-500 shrink-0" />
                  Real-time tracking dashboard
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=600&fit=crop"
          alt="Ocean sunset"
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Flame className="h-12 w-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join the Movement
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Whether you want to compete, vote, or recruit — there is a place for you
            at Built by Nature.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=contestant">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-12">
                Start Competing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/recruit">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-12">
                Become a Recruiter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
