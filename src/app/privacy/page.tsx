import Link from "next/link";
import { Shield } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "Privacy Policy | Built by Nature",
  description:
    "Privacy Policy for Built by Nature — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-amber-500" />
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
              Legal
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Your privacy matters to us. This policy explains how Built by Nature
            collects, uses, shares, and protects your personal information.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400">
            <span>
              <strong className="text-white">Effective Date:</strong> March 7,
              2026
            </span>
            <span>
              <strong className="text-white">Last Updated:</strong> March 7,
              2026
            </span>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 1. Introduction */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">1.</span>
              Introduction
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Built by Nature LLC (&quot;Built by Nature,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the
                Built by Nature platform, a natural beauty contest platform
                accessible at builtbynature.com (the &quot;Platform&quot;). This
                Privacy Policy describes how we collect, use, disclose, and
                safeguard your personal information when you visit our Platform,
                create an account, participate in contests, purchase voting
                tokens, or interact with our services in any way.
              </p>
              <p>
                By accessing or using the Platform, you acknowledge that you
                have read and understood this Privacy Policy. If you do not agree
                with our practices, please do not use the Platform.
              </p>
            </div>
          </div>

          {/* 2. Information We Collect */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">2.</span>
              Information We Collect
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  2.1 Personal Information You Provide
                </h3>
                <p className="mb-3">
                  When you create an account, enter a contest, or use our
                  services, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Date of birth (for age verification)</li>
                  <li>Display name / username</li>
                  <li>Profile information you choose to provide</li>
                  <li>
                    Government-issued identification (for age and identity
                    verification purposes)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  2.2 Payment Information
                </h3>
                <p>
                  All payment processing is handled by our third-party payment
                  processor,{" "}
                  <strong className="text-white">CCBill</strong>. When you
                  purchase voting tokens or receive payouts, CCBill collects and
                  processes your payment details (such as credit card numbers,
                  billing addresses, and related financial information) directly.{" "}
                  <strong className="text-white">
                    We do not store credit card numbers, CVVs, or full payment
                    card details on our servers.
                  </strong>{" "}
                  We only retain transaction identifiers, amounts, and
                  timestamps for record-keeping and earnings tracking purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  2.3 Usage Data
                </h3>
                <p className="mb-3">
                  We automatically collect certain information when you access
                  the Platform, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring URL and exit pages</li>
                  <li>Date and time of access</li>
                  <li>Click patterns and navigation behavior</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  2.4 Content Data
                </h3>
                <p>
                  If you are a contestant, we collect and store photos, videos,
                  and other media you upload to the Platform as part of your
                  contest entries and profile. This content may include metadata
                  such as EXIF data embedded in image files.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  2.5 Cookies and Similar Technologies
                </h3>
                <p>
                  We use cookies and similar tracking technologies to collect
                  information about your browsing activity. For detailed
                  information about the cookies we use and how to manage them,
                  please see our{" "}
                  <Link
                    href="/cookies"
                    className="text-amber-500 hover:text-amber-400 underline"
                  >
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* 3. How We Use Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">3.</span>
              How We Use Your Information
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                <li>
                  <strong className="text-gray-200">
                    Create and manage your account
                  </strong>{" "}
                  — authenticate your identity, maintain your profile, and
                  verify age eligibility
                </li>
                <li>
                  <strong className="text-gray-200">
                    Process payments and transactions
                  </strong>{" "}
                  — facilitate token purchases, track earnings, and process
                  contestant and recruiter payouts via CCBill
                </li>
                <li>
                  <strong className="text-gray-200">
                    Manage contests
                  </strong>{" "}
                  — administer contest entries, tabulate votes, determine
                  winners, and advance contestants through competition rounds
                </li>
                <li>
                  <strong className="text-gray-200">
                    Track earnings
                  </strong>{" "}
                  — calculate and report contestant and recruiter revenue shares
                </li>
                <li>
                  <strong className="text-gray-200">
                    Communicate with you
                  </strong>{" "}
                  — send account notifications, contest updates, promotional
                  emails (with your consent), and respond to support requests
                </li>
                <li>
                  <strong className="text-gray-200">
                    Prevent fraud and abuse
                  </strong>{" "}
                  — detect and prevent vote manipulation, bot activity, fake
                  accounts, and other forms of cheating or misuse
                </li>
                <li>
                  <strong className="text-gray-200">
                    Improve our services
                  </strong>{" "}
                  — analyze usage patterns, conduct analytics, and enhance
                  Platform functionality and user experience
                </li>
                <li>
                  <strong className="text-gray-200">
                    Comply with legal obligations
                  </strong>{" "}
                  — fulfill regulatory requirements, enforce our Terms of
                  Service, and respond to legal processes
                </li>
              </ul>
            </div>
          </div>

          {/* 4. How We Share Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">4.</span>
              How We Share Your Information
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                <strong className="text-white">
                  We never sell your personal data.
                </strong>{" "}
                We may share your information only in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-400 ml-4">
                <li>
                  <strong className="text-gray-200">
                    CCBill (Payment Processing)
                  </strong>{" "}
                  — We share necessary information with CCBill to process
                  payments, manage subscriptions, and handle payouts. CCBill
                  operates as an independent data controller for payment data.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Supabase (Data Storage)
                  </strong>{" "}
                  — Your account data and content are stored on Supabase
                  infrastructure, which provides our database and file storage
                  services with built-in security features including Row Level
                  Security (RLS) policies.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Vercel (Hosting)
                  </strong>{" "}
                  — Our Platform is hosted on Vercel, which processes requests
                  and may have access to IP addresses and usage data in the
                  course of serving our application.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Law Enforcement and Legal Requirements
                  </strong>{" "}
                  — We may disclose your information if required by law,
                  subpoena, court order, or other legal process, or if we
                  believe in good faith that disclosure is necessary to protect
                  our rights, your safety, or the safety of others.
                </li>
                <li>
                  <strong className="text-gray-200">Business Transfers</strong>{" "}
                  — In the event of a merger, acquisition, or sale of all or a
                  portion of our assets, your information may be transferred as
                  part of that transaction.
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Payment Processing */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">5.</span>
              Payment Processing
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                All financial transactions on the Platform — including token
                purchases, contestant payouts, and recruiter commissions — are
                processed by{" "}
                <strong className="text-white">CCBill</strong>, a PCI
                DSS-compliant third-party payment processor. When you make a
                purchase, you are providing your payment information directly to
                CCBill.
              </p>
              <p>
                CCBill&apos;s collection and use of your payment information is
                governed by their own privacy policy, available on their website.
                We encourage you to review CCBill&apos;s privacy policy to
                understand their data practices.
              </p>
              <p>
                On our end, we retain only:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                <li>Transaction IDs provided by CCBill</li>
                <li>Transaction amounts and timestamps</li>
                <li>
                  Token purchase and vote allocation records for contest
                  integrity
                </li>
                <li>
                  Earnings and payout records for contestant and recruiter
                  accounts
                </li>
              </ul>
            </div>
          </div>

          {/* 6. Cookies & Tracking */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">6.</span>
              Cookies &amp; Tracking Technologies
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>We use the following types of cookies:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                <li>
                  <strong className="text-gray-200">
                    Essential / Strictly Necessary Cookies
                  </strong>{" "}
                  — Required for authentication, session management, security,
                  and core Platform functionality. These cannot be disabled.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Analytics Cookies
                  </strong>{" "}
                  — Help us understand how visitors interact with the Platform
                  so we can improve the user experience. These are only set with
                  your consent where required by law.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Preference Cookies
                  </strong>{" "}
                  — Remember your settings such as display preferences and
                  language selections.
                </li>
              </ul>
              <p>
                For comprehensive information about the cookies we use and how
                to manage or opt out of non-essential cookies, please visit our{" "}
                <Link
                  href="/cookies"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* 7. Data Retention */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">7.</span>
              Data Retention
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required or permitted by law.
                Specifically:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                <li>
                  <strong className="text-gray-200">Account data</strong> is
                  retained for as long as your account is active.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Transaction and earnings records
                  </strong>{" "}
                  are retained for a minimum of seven (7) years for tax and
                  legal compliance purposes.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Uploaded content (photos, videos)
                  </strong>{" "}
                  is retained until you delete it or request its removal, or
                  until your account is closed.
                </li>
                <li>
                  <strong className="text-gray-200">Usage and log data</strong>{" "}
                  is typically retained for up to twenty-four (24) months.
                </li>
              </ul>
              <p>
                You may request deletion of your account and associated personal
                data at any time by contacting us at{" "}
                <a
                  href="mailto:support@builtbynature.com"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  support@builtbynature.com
                </a>
                . Upon receiving a verified deletion request, we will delete or
                anonymize your personal data within thirty (30) days, except for
                data we are legally required to retain.
              </p>
            </div>
          </div>

          {/* 8. Your Rights (GDPR) */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">8.</span>
              Your Rights Under GDPR (European Economic Area Users)
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                If you are located in the European Economic Area (EEA), the
                United Kingdom, or Switzerland, you have the following rights
                under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                <li>
                  <strong className="text-gray-200">Right of Access</strong> —
                  You have the right to request a copy of the personal data we
                  hold about you.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Right to Rectification
                  </strong>{" "}
                  — You have the right to request that we correct any inaccurate
                  or incomplete personal data.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Right to Erasure (&quot;Right to Be Forgotten&quot;)
                  </strong>{" "}
                  — You have the right to request the deletion of your personal
                  data, subject to certain legal exceptions.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Right to Data Portability
                  </strong>{" "}
                  — You have the right to receive your personal data in a
                  structured, commonly used, and machine-readable format.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Right to Restriction of Processing
                  </strong>{" "}
                  — You have the right to request that we restrict the
                  processing of your personal data under certain circumstances.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Right to Object
                  </strong>{" "}
                  — You have the right to object to the processing of your
                  personal data for direct marketing or where processing is
                  based on legitimate interests.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:support@builtbynature.com"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  support@builtbynature.com
                </a>
                . We will respond to your request within thirty (30) days. We
                may ask you to verify your identity before processing your
                request. If you are unsatisfied with our response, you have the
                right to lodge a complaint with your local data protection
                authority.
              </p>
              <p>
                The legal bases for our processing of your personal data
                include: performance of a contract (providing our services),
                your consent (where applicable), compliance with legal
                obligations, and our legitimate interests (such as fraud
                prevention and Platform improvement).
              </p>
            </div>
          </div>

          {/* 9. Your Rights (CCPA/CPRA) */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">9.</span>
              Your Rights Under CCPA/CPRA (California Residents)
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                If you are a California resident, the California Consumer
                Privacy Act (CCPA) as amended by the California Privacy Rights
                Act (CPRA) provides you with the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                <li>
                  <strong className="text-gray-200">Right to Know</strong> —
                  You have the right to request that we disclose the categories
                  and specific pieces of personal information we have collected
                  about you, the categories of sources, the business purpose for
                  collecting it, and the categories of third parties with whom
                  we share it.
                </li>
                <li>
                  <strong className="text-gray-200">Right to Delete</strong> —
                  You have the right to request the deletion of your personal
                  information, subject to certain exceptions.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Right to Opt-Out of Sale or Sharing
                  </strong>{" "}
                  — You have the right to opt out of the &quot;sale&quot; or
                  &quot;sharing&quot; of your personal information.{" "}
                  <strong className="text-white">
                    Built by Nature does not sell or share your personal
                    information
                  </strong>{" "}
                  as those terms are defined under the CCPA/CPRA.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Right to Correct
                  </strong>{" "}
                  — You have the right to request correction of inaccurate
                  personal information.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Right to Non-Discrimination
                  </strong>{" "}
                  — We will not discriminate against you for exercising any of
                  your CCPA/CPRA rights. We will not deny you goods or services,
                  charge different prices, provide a different level of service,
                  or suggest any such treatment.
                </li>
              </ul>
              <p>
                To exercise your rights, contact us at{" "}
                <a
                  href="mailto:support@builtbynature.com"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  support@builtbynature.com
                </a>
                . We will verify your identity before fulfilling your request
                and will respond within forty-five (45) days.
              </p>
            </div>
          </div>

          {/* 10. Children's Privacy */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">10.</span>
              Children&apos;s Privacy
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                The Platform is strictly intended for users who are{" "}
                <strong className="text-white">
                  eighteen (18) years of age or older
                </strong>
                . We do not knowingly collect personal information from anyone
                under the age of 18. Age verification is required during account
                registration.
              </p>
              <p>
                If we learn that we have collected personal information from a
                person under the age of 18, we will delete that information
                immediately. If you believe that a minor has provided us with
                personal information, please contact us at{" "}
                <a
                  href="mailto:support@builtbynature.com"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  support@builtbynature.com
                </a>{" "}
                so that we can take appropriate action.
              </p>
            </div>
          </div>

          {/* 11. International Transfers */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">11.</span>
              International Data Transfers
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Built by Nature LLC is based in the United States. Your personal
                data is stored and processed in the United States through our
                service providers, including Supabase and Vercel.
              </p>
              <p>
                If you are accessing the Platform from outside the United
                States, including from the European Economic Area, the United
                Kingdom, or other jurisdictions with data protection laws that
                may differ from U.S. law, please be aware that your data will be
                transferred to, stored, and processed in the United States.
              </p>
              <p>
                By using the Platform, you consent to the transfer of your
                information to the United States. Where required by applicable
                law, we rely on appropriate legal mechanisms for international
                data transfers, including Standard Contractual Clauses approved
                by the European Commission.
              </p>
            </div>
          </div>

          {/* 12. Security */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">12.</span>
              Security
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                We take the security of your personal information seriously and
                implement industry-standard technical and organizational
                measures to protect it, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                <li>
                  <strong className="text-gray-200">
                    Encryption in transit and at rest
                  </strong>{" "}
                  — All data transmitted to and from the Platform is encrypted
                  via TLS/SSL. Data stored in our databases is encrypted at
                  rest.
                </li>
                <li>
                  <strong className="text-gray-200">Secure hosting</strong> —
                  Our Platform is hosted on Vercel with enterprise-grade
                  security infrastructure.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Row Level Security (RLS) policies
                  </strong>{" "}
                  — Our Supabase database implements Row Level Security policies
                  to ensure users can only access data they are authorized to
                  view.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Access controls
                  </strong>{" "}
                  — We restrict access to personal information to authorized
                  personnel who need it to perform their duties.
                </li>
                <li>
                  <strong className="text-gray-200">
                    PCI DSS-compliant payment processing
                  </strong>{" "}
                  — Payment data is handled exclusively by CCBill, a PCI
                  DSS-compliant processor.
                </li>
              </ul>
              <p>
                While we strive to protect your personal information, no method
                of electronic transmission or storage is 100% secure. We cannot
                guarantee absolute security, but we are committed to promptly
                notifying affected users and relevant authorities in the event
                of a data breach as required by applicable law.
              </p>
            </div>
          </div>

          {/* 13. Third-Party Links */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">13.</span>
              Third-Party Links
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                The Platform may contain links to third-party websites,
                services, or applications that are not operated by Built by
                Nature. These include but are not limited to social media
                platforms, payment processors, and advertiser websites.
              </p>
              <p>
                We are not responsible for the privacy practices, content, or
                security of any third-party sites. We encourage you to review
                the privacy policies of any third-party services you access
                through links on our Platform. Clicking on a third-party link or
                enabling a third-party connection does not imply our endorsement
                of that third party.
              </p>
            </div>
          </div>

          {/* 14. Changes to This Policy */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">14.</span>
              Changes to This Policy
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technologies, legal requirements, or
                other factors. When we make material changes, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                <li>
                  Update the &quot;Last Updated&quot; date at the top of this
                  page
                </li>
                <li>
                  Notify you via email (if you have an account) or through a
                  prominent notice on the Platform
                </li>
                <li>
                  Where required by law, obtain your consent before applying
                  material changes
                </li>
              </ul>
              <p>
                We encourage you to review this Privacy Policy periodically to
                stay informed about how we protect your information. Your
                continued use of the Platform after any changes constitutes your
                acceptance of the updated Privacy Policy.
              </p>
            </div>
          </div>

          {/* 15. Contact Us */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-start gap-3">
              <span className="text-amber-500 font-mono">15.</span>
              Contact Us
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                If you have any questions about this Privacy Policy, wish to
                exercise your data protection rights, or have concerns about how
                your personal information is handled, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                <p>
                  <strong className="text-white">Built by Nature LLC</strong>
                </p>
                <p>
                  <strong className="text-gray-400">Email:</strong>{" "}
                  <a
                    href="mailto:support@builtbynature.com"
                    className="text-amber-500 hover:text-amber-400 underline"
                  >
                    support@builtbynature.com
                  </a>
                </p>
                <p>
                  <strong className="text-gray-400">
                    Data Protection Requests:
                  </strong>{" "}
                  <a
                    href="mailto:support@builtbynature.com"
                    className="text-amber-500 hover:text-amber-400 underline"
                  >
                    support@builtbynature.com
                  </a>
                </p>
              </div>
              <p>
                We will endeavor to respond to all legitimate inquiries within
                thirty (30) days. If you feel that your data protection rights
                have not been adequately addressed, you have the right to lodge
                a complaint with your local data protection supervisory
                authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
