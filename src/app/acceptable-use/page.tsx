import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function AcceptableUsePolicyPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Acceptable Use Policy
          </h1>
          <p className="text-gray-400">Last updated: March 7, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Purpose */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              1. Purpose
            </h2>
            <p className="text-gray-300 leading-relaxed">
              This Acceptable Use Policy sets the standards for how all users
              interact with Built by Nature. By using the platform, you agree to
              comply with these guidelines. Our goal is to maintain a safe,
              respectful, and fair environment for contestants, fans, recruiters,
              and all community members.
            </p>
          </div>

          {/* Acceptable Use */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              2. Acceptable Use
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You are welcome and encouraged to use Built by Nature for the
              following purposes:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-lg leading-6">&#10003;</span>
                  <span>
                    Upload your own original content that you have full rights to
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-lg leading-6">&#10003;</span>
                  <span>
                    Vote for contestants using legitimately purchased tokens
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-lg leading-6">&#10003;</span>
                  <span>
                    Engage respectfully in comments and messages with other users
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-lg leading-6">&#10003;</span>
                  <span>
                    Share your profile links on social media to grow your audience
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-lg leading-6">&#10003;</span>
                  <span>
                    Recruit contestants through the official referral program
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              3. Prohibited Activities
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The following activities are strictly prohibited on Built by Nature.
              Violations may result in immediate action, including account
              suspension or permanent removal from the platform.
            </p>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Content Violations
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Uploading content you do not own or do not have the rights to
                      use, including copyrighted images or videos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Uploading explicit pornography or any content that is illegal
                      under applicable law
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Uploading any content involving minors — this is an absolute
                      zero-tolerance policy
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Account &amp; Voting Abuse
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Creating fake accounts, bot accounts, or multiple accounts to
                      manipulate votes or circumvent platform rules
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Vote manipulation of any kind, including coordinated voting
                      schemes or purchasing votes through unauthorized channels
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Sharing, selling, or transferring account access to another
                      person
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Circumventing age verification or identity verification
                      processes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Behavioral Violations
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Harassment, bullying, hate speech, threats, or any abusive
                      behavior directed at other users
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Impersonating another person, contestant, or Built by Nature
                      staff member
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Technical Violations
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Scraping, crawling, or using automated tools for data
                      collection without explicit written permission
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Attempting to hack, exploit vulnerabilities, or breach the
                      security of the platform or its users
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Financial Violations
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-lg leading-6">&#10007;</span>
                    <span>
                      Using the platform for money laundering, fraud, or any other
                      financial crime
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enforcement */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              4. Enforcement
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Violations of this Acceptable Use Policy may result in one or more
                of the following actions, depending on the severity and nature of
                the violation:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-lg font-semibold text-amber-500 mb-2">
                    Content Removal
                  </p>
                  <p className="text-gray-400 text-sm">
                    Offending content will be removed from the platform immediately.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-lg font-semibold text-amber-500 mb-2">
                    Account Suspension
                  </p>
                  <p className="text-gray-400 text-sm">
                    Temporary suspension of your account while the violation is
                    investigated.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-lg font-semibold text-amber-500 mb-2">
                    Permanent Ban
                  </p>
                  <p className="text-gray-400 text-sm">
                    Severe or repeated violations will result in permanent removal
                    from the platform.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-lg font-semibold text-amber-500 mb-2">
                    Law Enforcement
                  </p>
                  <p className="text-gray-400 text-sm">
                    Illegal activity will be reported to the relevant authorities
                    without hesitation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reporting Violations */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              5. Reporting Violations
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you witness or become aware of any violation of this Acceptable
              Use Policy, please report it immediately by emailing{" "}
              <a
                href="mailto:abuse@builtbynature.com"
                className="text-amber-500 hover:text-amber-400 underline"
              >
                abuse@builtbynature.com
              </a>
              . Include as much detail as possible, including screenshots, links,
              and a description of the violation. All reports are treated
              confidentially and will be investigated promptly.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              6. Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Acceptable Use Policy, please
              contact us at{" "}
              <a
                href="mailto:support@builtbynature.com"
                className="text-amber-500 hover:text-amber-400 underline"
              >
                support@builtbynature.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
