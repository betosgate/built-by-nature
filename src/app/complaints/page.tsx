import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function ComplaintsPolicyPage() {
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
            Complaints Policy
          </h1>
          <p className="text-gray-400">Last updated: March 7, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              1. Overview
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Built by Nature is committed to providing a safe, fair, and
              transparent platform for all users. We take every complaint seriously
              and are dedicated to resolving issues promptly and fairly. This policy
              outlines how you can file a complaint, what to expect during the
              process, and how we handle different types of concerns.
            </p>
          </div>

          {/* Types of Complaints */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              2. Types of Complaints
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Content Complaints
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Reports of inappropriate, offensive, or illegal content uploaded
                  to the platform. This includes content that violates our
                  Acceptable Use Policy, community guidelines, or applicable law.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Billing Complaints
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Issues related to payment processing, unexpected charges,
                  refund requests, or billing errors. Our payment processing is
                  handled by CCBill.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Contest Complaints
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Concerns about contest fairness, suspected rule violations, vote
                  manipulation, or eligibility disputes.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Account Complaints
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Issues related to account suspension, access restrictions,
                  verification problems, or account recovery.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Harassment &amp; Abuse Complaints
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Reports of bullying, harassment, threats, hate speech, or any
                  abusive behavior directed at contestants, fans, or other users on
                  the platform.
                </p>
              </div>
            </div>
          </div>

          {/* How to File a Complaint */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              3. How to File a Complaint
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                To file a complaint, send an email to{" "}
                <a
                  href="mailto:complaints@builtbynature.com"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  complaints@builtbynature.com
                </a>{" "}
                with the following information:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">Your name and username</strong>{" "}
                    on Built by Nature
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">
                      A clear description of your complaint
                    </strong>{" "}
                    including what happened, when it occurred, and who was involved
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">
                      Relevant screenshots or links
                    </strong>{" "}
                    that support your complaint
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">Your desired resolution</strong>{" "}
                    — what outcome you are seeking
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Response Times */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              4. Response Times
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>We are committed to handling complaints as quickly as possible:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-amber-500 mb-2">
                    24 Hours
                  </p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">
                    Acknowledgment
                  </p>
                  <p className="text-gray-300 text-sm">
                    All complaints are acknowledged within 24 hours of receipt.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-amber-500 mb-2">
                    7 Business Days
                  </p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">
                    Standard Resolution
                  </p>
                  <p className="text-gray-300 text-sm">
                    Standard complaints are investigated and resolved within 7
                    business days.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-amber-500 mb-2">
                  48 Hours
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">
                  Urgent Resolution
                </p>
                <p className="text-gray-300 text-sm">
                  Urgent complaints involving illegal content, safety threats, or
                  imminent harm are prioritized and resolved within 48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Billing Disputes */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              5. Billing Disputes
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                All payment processing on Built by Nature is handled by CCBill. If
                you have a billing dispute, unexpected charge, or need a refund, you
                have two options:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">
                      Contact CCBill directly
                    </strong>{" "}
                    at{" "}
                    <a
                      href="https://ccbill.com/support"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 hover:text-amber-400 underline"
                    >
                      ccbill.com/support
                    </a>{" "}
                    for immediate assistance with payment-related issues.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">Contact us</strong> at{" "}
                    <a
                      href="mailto:complaints@builtbynature.com"
                      className="text-amber-500 hover:text-amber-400 underline"
                    >
                      complaints@builtbynature.com
                    </a>{" "}
                    and we will liaise with CCBill on your behalf to resolve the
                    issue.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Escalation */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              6. Escalation
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you are not satisfied with the resolution of your complaint, you
              may request escalation to senior management. To escalate, reply to
              your complaint thread or send a new email to{" "}
              <a
                href="mailto:complaints@builtbynature.com"
                className="text-amber-500 hover:text-amber-400 underline"
              >
                complaints@builtbynature.com
              </a>{" "}
              with the subject line &quot;ESCALATION&quot; followed by your original
              complaint reference number. Escalated complaints will be reviewed by a
              senior member of our team and you will receive a response within 5
              business days.
            </p>
          </div>

          {/* Reporting Illegal Content */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              7. Reporting Illegal Content
            </h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <p className="text-gray-300 leading-relaxed">
                Built by Nature has a zero-tolerance policy for illegal content. If
                you encounter any content that you believe is illegal, it will be
                removed immediately upon verification and reported to the relevant
                authorities. Any suspected child sexual abuse material (CSAM) will
                be reported to the National Center for Missing &amp; Exploited
                Children (NCMEC) and the appropriate law enforcement agencies
                without exception. If you need to report illegal content, contact us
                immediately at{" "}
                <a
                  href="mailto:complaints@builtbynature.com"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  complaints@builtbynature.com
                </a>{" "}
                with &quot;URGENT: Illegal Content&quot; in the subject line.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              8. Contact
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For all complaints, please contact us at{" "}
              <a
                href="mailto:complaints@builtbynature.com"
                className="text-amber-500 hover:text-amber-400 underline"
              >
                complaints@builtbynature.com
              </a>
              . We are here to help and will work with you to resolve any concerns
              as quickly as possible.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
