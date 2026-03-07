"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How does the competition work?",
    a: "Each season runs for 90 days across three rounds. Summer enrollment is April\u2013June with the competition running July\u2013September. Winter enrollment is July\u2013September with the competition running October\u2013December. Enrollment overlaps with the previous competition so there\u2019s always action. In Round 1, all contestants compete and the top 30 advance. In Round 2, the top 3 are selected. In the Finale, votes determine the winner.",
  },
  {
    q: "How do contestants earn money?",
    a: "Contestants earn 20% of every vote they receive. Each vote token costs $5 and gives 5 votes. So for every token spent on you, you earn $1. The more fans you have, the more you earn \u2014 even if you don't win the grand prize.",
  },
  {
    q: "What are the prizes?",
    a: "All three finalists win an all-expenses-paid trip to Las Vegas with VIP access and a professional photoshoot. The grand prize winner also receives a 7-day luxury Italy vacation for two plus $10,000 cash.",
  },
  {
    q: "Do I need professional photos to enter?",
    a: "No! We celebrate natural, authentic beauty. Phone photos work great. Tattoos, piercings, all body types \u2014 everyone is welcome. What matters is confidence and personality, not a modeling portfolio.",
  },
  {
    q: "How do I vote for a contestant?",
    a: "Sign up for a free fan account, purchase vote tokens ($5 each, 5 votes per token), then visit any contestant's profile and click \"Vote for Me Now.\" You can vote up to 20 tokens per contestant per day.",
  },
  {
    q: "What is the recruiter program?",
    a: "Recruiters earn 10% lifetime commission from every vote received by contestants they refer. Share your unique link, bring in new contestants, and earn passive income as they compete.",
  },
  {
    q: "Is there an age requirement?",
    a: "Yes, all participants (contestants, voters, and recruiters) must be 18 years or older. Age verification is required during signup.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-black">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <HelpCircle className="size-5 text-amber-500" />
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-500">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-colors ${
                  isOpen
                    ? "border-amber-500/30 bg-amber-500/5"
                    : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className={`font-medium ${isOpen ? "text-amber-400" : "text-white"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-zinc-500 transition-transform ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4">
                    <p className="text-sm leading-relaxed text-zinc-400">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
