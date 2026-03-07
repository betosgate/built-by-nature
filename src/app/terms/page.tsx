import Link from "next/link";
import { Flame, FileText } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function TermsPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-amber-500" />
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
              Legal
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Service
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Please read these Terms of Service carefully before using the Built by Nature
            platform. By accessing or using our services, you agree to be bound by these terms.
          </p>
          <p className="text-gray-500 mt-4 text-sm">
            Last Updated: March 7, 2026
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">1.</span>
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between
                  you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Built by Nature LLC (&quot;Built by Nature,&quot;
                  &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), governing your access to and use of the website located
                  at builtbynature.com and all associated services, features, content, and
                  applications (collectively, the &quot;Platform&quot;).
                </p>
                <p>
                  By creating an account, purchasing tokens, casting votes, entering a contest,
                  or otherwise accessing or using the Platform, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms, as well as our{" "}
                  <Link href="/privacy" className="text-amber-500 hover:text-amber-400 underline">
                    Privacy Policy
                  </Link>
                  , which is incorporated herein by reference.
                </p>
                <p>
                  If you do not agree to these Terms, you must not access or use the Platform.
                  Your continued use of the Platform following the posting of any changes to these
                  Terms constitutes acceptance of those changes.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">2.</span>
                Eligibility
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  You must be at least eighteen (18) years of age to access or use the Platform.
                  By using the Platform, you represent and warrant that you are at least 18 years
                  old and have the legal capacity to enter into these Terms.
                </p>
                <p>
                  All users may be required to complete age verification as part of the
                  registration process or at any subsequent time as determined by Built by Nature.
                  Contestants are required to verify their age and identity before participating
                  in any contest or receiving any payouts.
                </p>
                <p>
                  Built by Nature reserves the right to request additional proof of age or identity
                  at any time. Failure to provide satisfactory verification may result in suspension
                  or termination of your account.
                </p>
                <p>
                  The Platform is not available to users in jurisdictions where online contests,
                  token-based voting, or similar activities are prohibited by applicable law.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">3.</span>
                Account Registration
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  To access certain features of the Platform, including purchasing tokens, voting,
                  or entering contests, you must create an account. When registering, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    Provide accurate, current, and complete information during the registration
                    process and keep your account information updated at all times.
                  </li>
                  <li>
                    Create only one (1) account per person. Multiple accounts held by the same
                    individual are strictly prohibited and may result in the termination of all
                    associated accounts.
                  </li>
                  <li>
                    Maintain the confidentiality and security of your account credentials, including
                    your password. You are solely responsible for all activity that occurs under
                    your account.
                  </li>
                  <li>
                    Notify Built by Nature immediately of any unauthorized access to or use of your
                    account by contacting support@builtbynature.com.
                  </li>
                </ul>
                <p>
                  Built by Nature is not liable for any loss or damage arising from your failure
                  to comply with the above requirements. We reserve the right to suspend, disable,
                  or delete your account if we determine, in our sole discretion, that you have
                  violated these Terms.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">4.</span>
                Platform Description
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Built by Nature is an online contest platform that celebrates natural beauty.
                  The Platform enables contestants to enter beauty competitions, fans to support
                  contestants through a token-based voting system, and recruiters to earn revenue
                  by referring new contestants to the Platform.
                </p>
                <p>
                  Key features of the Platform include:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    <strong className="text-white">Contest Participation:</strong> Verified contestants
                    may enter natural beauty contests and compete for advancement through multiple
                    rounds based on fan votes.
                  </li>
                  <li>
                    <strong className="text-white">Token-Based Voting:</strong> Fans purchase tokens
                    and use them to cast votes for their preferred contestants. Each vote consumes
                    one token.
                  </li>
                  <li>
                    <strong className="text-white">Revenue Sharing:</strong> Contestants earn twenty
                    percent (20%) of the token revenue generated by votes they receive. Recruiters
                    earn ten percent (10%) of the token revenue generated by votes received by
                    contestants they have recruited to the Platform.
                  </li>
                </ul>
                <p>
                  Built by Nature reserves the right to modify, suspend, or discontinue any
                  aspect of the Platform at any time, with or without notice.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">5.</span>
                Token Purchases &amp; Payments
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  The Platform uses a virtual token system for voting. Tokens may be purchased
                  through the Platform at a base price of five U.S. dollars ($5.00) per token.
                  Discounted bundle pricing may be available from time to time at Built by
                  Nature&apos;s discretion.
                </p>
                <p>
                  <strong className="text-white">Payment Processing:</strong> All payment
                  transactions are processed by CCBill, a third-party payment processor. By
                  making a purchase, you agree to CCBill&apos;s terms of service and privacy policy
                  in addition to these Terms. Built by Nature does not directly store or process
                  your credit card or payment information.
                </p>
                <p>
                  <strong className="text-white">Digital Goods:</strong> Tokens are non-refundable
                  digital goods. Once purchased, tokens are added to your account balance and may
                  be used to vote in active contests. Tokens have no cash value and cannot be
                  exchanged for cash, transferred to other users, or redeemed outside of the
                  Platform.
                </p>
                <p>
                  <strong className="text-white">No Subscriptions:</strong> Token purchases are
                  one-time transactions. Built by Nature does not offer recurring or subscription-based
                  billing for token purchases unless explicitly stated at the point of sale.
                </p>
                <p>
                  You are responsible for all charges incurred under your account, including any
                  applicable taxes. All prices are listed in U.S. dollars unless otherwise specified.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">6.</span>
                Voting Rules
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Voting on the Platform is subject to the following rules:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    Each user may cast a maximum of twenty (20) votes per contestant per day.
                    This daily cap resets at midnight UTC.
                  </li>
                  <li>
                    Each token provides five (5) votes. Tokens are
                    permanently consumed upon casting votes and cannot be recovered, refunded,
                    or reversed.
                  </li>
                  <li>
                    Votes are final. There are no refunds, exchanges, or credits for tokens that
                    have been used to cast votes, regardless of the outcome of the contest or any
                    changes to contestant eligibility.
                  </li>
                  <li>
                    Built by Nature reserves the right to invalidate votes that are determined
                    to have been cast through fraudulent means, including but not limited to the
                    use of bots, scripts, multiple accounts, or any other form of vote manipulation.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">7.</span>
                Contest Rules
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  All contests hosted on the Platform are governed by the official contest rules
                  available on our{" "}
                  <Link href="/rules" className="text-amber-500 hover:text-amber-400 underline">
                    Rules page
                  </Link>
                  . By entering a contest, you agree to abide by those rules in their entirety.
                </p>
                <p>
                  Built by Nature administrators retain sole discretion over all contest operations,
                  including but not limited to: the number and structure of contest rounds, criteria
                  for advancement, contestant eligibility determinations, disqualification decisions,
                  and the timing and format of each contest phase.
                </p>
                <p>
                  All contestants are required to engage in fair play. Any attempt to manipulate
                  contest outcomes through prohibited means, including vote buying, collusion,
                  sock-puppet accounts, or harassment of other contestants, will result in
                  immediate disqualification and potential account termination.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">8.</span>
                Content Guidelines
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-white">Ownership:</strong> You retain full ownership of
                  all content you upload, submit, or display on the Platform (&quot;User Content&quot;).
                  By submitting User Content, you grant Built by Nature a non-exclusive, worldwide,
                  royalty-free, sublicensable, and transferable license to use, reproduce, modify,
                  display, distribute, and perform your User Content in connection with the
                  operation, promotion, and improvement of the Platform.
                </p>
                <p>
                  <strong className="text-white">Public Content:</strong> Certain content, such as
                  profile photos and public contest entries, will be visible to all Platform users
                  and the general public. You acknowledge and consent to the public display of
                  such content.
                </p>
                <p>
                  <strong className="text-white">Age-Restricted Content:</strong> Some content on
                  the Platform may be designated as age-restricted (18+). Access to such content
                  requires age verification. All content on the Platform must comply with
                  applicable laws and these Terms.
                </p>
                <p>
                  <strong className="text-white">Prohibited Content:</strong> The following content
                  is strictly prohibited on the Platform:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Explicit pornography or sexually explicit material depicting sexual acts.</li>
                  <li>Content depicting, promoting, or facilitating illegal activity.</li>
                  <li>Content involving minors in any capacity.</li>
                  <li>Content that promotes violence, hate speech, or discrimination.</li>
                  <li>Content that infringes upon the intellectual property rights of any third party.</li>
                  <li>Content that is fraudulent, deceptive, or misleading.</li>
                </ul>
                <p>
                  Built by Nature reserves the right to remove any content that violates these
                  guidelines without prior notice and to suspend or terminate the accounts of
                  users who repeatedly or egregiously violate these content standards.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">9.</span>
                Prohibited Conduct
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  You agree not to engage in any of the following prohibited activities while
                  using the Platform:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    Using bots, scripts, automated tools, or any non-human means to interact with
                    the Platform, including but not limited to voting, account creation, or
                    content submission.
                  </li>
                  <li>
                    Creating or maintaining multiple accounts (fake or otherwise) for the purpose
                    of manipulating votes, contests, or any other Platform feature.
                  </li>
                  <li>
                    Engaging in vote manipulation of any kind, including purchasing votes from
                    third parties, coordinating vote schemes, or exploiting Platform vulnerabilities.
                  </li>
                  <li>
                    Harassing, threatening, intimidating, or bullying other users, including
                    contestants, voters, recruiters, or Platform staff.
                  </li>
                  <li>
                    Impersonating any person or entity, or misrepresenting your affiliation with
                    any person or entity.
                  </li>
                  <li>
                    Scraping, crawling, or using any automated means to collect data from the
                    Platform without express written permission from Built by Nature.
                  </li>
                  <li>
                    Attempting to interfere with, compromise, or disrupt the Platform&apos;s
                    infrastructure, security, or proper functioning.
                  </li>
                  <li>
                    Circumventing or attempting to circumvent any access controls, rate limits,
                    or security measures implemented by the Platform.
                  </li>
                </ul>
                <p>
                  Violation of these prohibitions may result in immediate account suspension or
                  termination, forfeiture of tokens and earnings, and potential legal action.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">10.</span>
                Revenue Sharing &amp; Earnings
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Built by Nature offers a revenue sharing program for eligible contestants and
                  recruiters, subject to the following terms:
                </p>
                <p>
                  <strong className="text-white">Contestant Earnings:</strong> Contestants earn
                  twenty percent (20%) of the token revenue generated by votes they receive.
                  Earnings are calculated based on the purchase price of the tokens used to cast
                  votes for the contestant.
                </p>
                <p>
                  <strong className="text-white">Recruiter Earnings:</strong> Recruiters earn ten
                  percent (10%) of the token revenue generated by votes received by contestants
                  they have recruited to the Platform. Recruiter earnings are ongoing for the
                  lifetime of the recruited contestant&apos;s participation on the Platform.
                </p>
                <p>
                  <strong className="text-white">Payout Conditions:</strong> All payouts are subject
                  to the following conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    Earnings must meet the minimum payout threshold before a withdrawal can be
                    requested. The current minimum threshold is displayed on your account dashboard.
                  </li>
                  <li>
                    Identity verification must be completed before any payout is processed.
                  </li>
                  <li>
                    Built by Nature reserves the right to withhold payouts pending investigation
                    of any suspected Terms violations, fraudulent activity, or chargebacks.
                  </li>
                  <li>
                    Payouts are made in U.S. dollars via the payment method(s) available on the
                    Platform. You are responsible for any taxes or fees associated with your earnings.
                  </li>
                </ul>
                <p>
                  Revenue sharing percentages are subject to change with thirty (30) days&apos;
                  notice. Any changes will apply to future transactions only and will not affect
                  earnings already accrued.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">11.</span>
                Recruiter Program
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  The Built by Nature Recruiter Program allows approved users to earn revenue by
                  referring new contestants to the Platform. The program operates as follows:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    Recruiters receive a unique referral link or code that must be used by the
                    recruited contestant during registration in order for the referral to be tracked.
                  </li>
                  <li>
                    Recruiters earn ten percent (10%) of all token revenue generated by votes
                    received by their recruited contestants.
                  </li>
                  <li>
                    Referral earnings are ongoing and are not limited to a specific time period,
                    provided both the recruiter and the recruited contestant maintain accounts in
                    good standing.
                  </li>
                  <li>
                    Recruiters may not recruit themselves and may not use deceptive, misleading,
                    or coercive practices to recruit contestants.
                  </li>
                  <li>
                    Built by Nature reserves the right to modify, suspend, or terminate the
                    Recruiter Program at any time with notice to active participants.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 12 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">12.</span>
                Refund Policy
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-white">General Rule:</strong> Tokens purchased on the
                  Platform are non-refundable digital goods. All sales are final. By completing
                  a token purchase, you acknowledge and agree that you are purchasing a
                  non-refundable digital product.
                </p>
                <p>
                  <strong className="text-white">Used Tokens:</strong> Tokens that have been used
                  to cast votes are permanently consumed and are not eligible for refund under
                  any circumstances.
                </p>
                <p>
                  <strong className="text-white">Unused Tokens:</strong> In exceptional
                  circumstances, a refund for unused tokens may be considered within fourteen (14)
                  days of purchase, at the sole discretion of Built by Nature administration.
                  To request a refund for unused tokens, contact support@builtbynature.com with
                  your account information and purchase details.
                </p>
                <p>
                  <strong className="text-white">Chargebacks:</strong> If you initiate a chargeback
                  or payment dispute with your financial institution for a legitimate token
                  purchase, your account may be immediately suspended pending investigation.
                  Repeated or fraudulent chargebacks will result in permanent account termination
                  and forfeiture of any remaining token balance or accrued earnings.
                </p>
              </div>
            </div>

            {/* Section 13 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">13.</span>
                Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-white">Platform IP:</strong> The Platform, including its
                  design, logos, trademarks, service marks, graphics, software, code, and all
                  other proprietary materials (collectively, &quot;Platform IP&quot;), is the exclusive
                  property of Built by Nature LLC. You may not copy, reproduce, modify, distribute,
                  display, or create derivative works of any Platform IP without express written
                  permission.
                </p>
                <p>
                  <strong className="text-white">User Content:</strong> As stated in Section 8,
                  you retain ownership of your User Content. The license you grant to Built by
                  Nature is limited to the purposes described in these Terms and does not
                  constitute a transfer of ownership.
                </p>
                <p>
                  <strong className="text-white">Feedback:</strong> Any suggestions, ideas,
                  feedback, or recommendations you provide to Built by Nature regarding the
                  Platform (&quot;Feedback&quot;) may be used by Built by Nature without restriction or
                  compensation. You hereby assign to Built by Nature all rights in and to any
                  such Feedback.
                </p>
              </div>
            </div>

            {/* Section 14 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">14.</span>
                DMCA &amp; Copyright Claims
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Built by Nature respects the intellectual property rights of others and expects
                  users to do the same. If you believe that your copyrighted work has been copied
                  or used on the Platform in a manner that constitutes copyright infringement,
                  please refer to our{" "}
                  <Link href="/dmca" className="text-amber-500 hover:text-amber-400 underline">
                    DMCA Policy page
                  </Link>{" "}
                  for instructions on how to submit a copyright infringement notice.
                </p>
                <p>
                  Built by Nature will respond to valid DMCA notices in accordance with the
                  Digital Millennium Copyright Act and may remove or disable access to allegedly
                  infringing content. Repeat infringers may have their accounts terminated.
                </p>
              </div>
            </div>

            {/* Section 15 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">15.</span>
                Privacy
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Your use of the Platform is also governed by our{" "}
                  <Link href="/privacy" className="text-amber-500 hover:text-amber-400 underline">
                    Privacy Policy
                  </Link>
                  , which describes how we collect, use, store, and share your personal
                  information. By using the Platform, you consent to the collection and use of
                  your information as described in the Privacy Policy.
                </p>
                <p>
                  We encourage you to review the Privacy Policy carefully to understand our
                  practices regarding your personal data.
                </p>
              </div>
            </div>

            {/* Section 16 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">16.</span>
                Disclaimers
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="uppercase text-sm font-semibold text-gray-400">
                  PLEASE READ THIS SECTION CAREFULLY AS IT LIMITS OUR LIABILITY TO YOU.
                </p>
                <p>
                  THE PLATFORM AND ALL CONTENT, FEATURES, AND SERVICES PROVIDED THEREIN ARE
                  OFFERED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND,
                  EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE
                  OF PERFORMANCE.
                </p>
                <p>
                  Built by Nature does not warrant that: (a) the Platform will function
                  uninterrupted, securely, or error-free; (b) the results obtained from the use
                  of the Platform will be accurate or reliable; (c) any errors or defects will be
                  corrected; or (d) the Platform or the servers that make the Platform available
                  are free of viruses or other harmful components.
                </p>
                <p>
                  Built by Nature makes no guarantees regarding contest outcomes, contestant
                  rankings, earning amounts, or the continued availability of any Platform
                  features. Contest results are determined by user votes and administrative
                  decisions, and no specific outcome is promised or guaranteed to any participant.
                </p>
              </div>
            </div>

            {/* Section 17 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">17.</span>
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BUILT BY
                  NATURE LLC, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, OR
                  LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                  PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS
                  OF PROFITS, GOODWILL, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN
                  CONNECTION WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE
                  PLATFORM.
                </p>
                <p>
                  IN NO EVENT SHALL BUILT BY NATURE&apos;S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL
                  CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE PLATFORM
                  EXCEED THE GREATER OF: (A) THE AMOUNT YOU HAVE PAID TO BUILT BY NATURE IN THE
                  TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM;
                  OR (B) ONE HUNDRED U.S. DOLLARS ($100.00).
                </p>
                <p>
                  THE LIMITATIONS IN THIS SECTION APPLY REGARDLESS OF THE THEORY OF LIABILITY,
                  WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT
                  LIABILITY, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT BUILT BY NATURE HAS
                  BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
                </p>
              </div>
            </div>

            {/* Section 18 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">18.</span>
                Indemnification
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  You agree to indemnify, defend, and hold harmless Built by Nature LLC, its
                  officers, directors, employees, agents, affiliates, and licensors from and
                  against any and all claims, damages, obligations, losses, liabilities, costs,
                  and expenses (including reasonable attorneys&apos; fees) arising from or related to:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Your access to or use of the Platform.</li>
                  <li>Your violation of these Terms.</li>
                  <li>Your violation of any applicable law or regulation.</li>
                  <li>
                    Your User Content, including any claim that your User Content infringes or
                    misappropriates the intellectual property rights or other rights of any
                    third party.
                  </li>
                  <li>
                    Any dispute between you and any other user of the Platform.
                  </li>
                </ul>
                <p>
                  Built by Nature reserves the right, at your expense, to assume the exclusive
                  defense and control of any matter for which you are required to indemnify us,
                  and you agree to cooperate with our defense of such claims.
                </p>
              </div>
            </div>

            {/* Section 19 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">19.</span>
                Termination
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Built by Nature may suspend or terminate your account and access to the
                  Platform at any time, with or without cause and with or without notice, including
                  but not limited to the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Violation of these Terms or any applicable law or regulation.</li>
                  <li>Engaging in any prohibited conduct described in Section 9.</li>
                  <li>Suspected fraudulent, abusive, or illegal activity.</li>
                  <li>
                    Failure to complete required identity or age verification.
                  </li>
                  <li>
                    At the request of law enforcement or government agencies.
                  </li>
                  <li>
                    Extended periods of inactivity, as determined by Built by Nature.
                  </li>
                </ul>
                <p>
                  Upon termination, your right to use the Platform will immediately cease. Any
                  tokens remaining in your account at the time of termination for cause may be
                  forfeited. Accrued earnings that have not been paid out may be withheld pending
                  the resolution of any outstanding issues or investigations.
                </p>
                <p>
                  You may terminate your own account at any time by contacting
                  support@builtbynature.com. Sections of these Terms that by their nature should
                  survive termination shall survive, including but not limited to Sections 12,
                  13, 16, 17, 18, and 20.
                </p>
              </div>
            </div>

            {/* Section 20 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">20.</span>
                Governing Law &amp; Dispute Resolution
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  These Terms and any disputes arising out of or relating to these Terms or the
                  Platform shall be governed by and construed in accordance with the laws of the
                  State of Arizona, United States of America, without regard to its conflict of
                  law principles.
                </p>
                <p>
                  Any legal action or proceeding arising out of or relating to these Terms shall
                  be brought exclusively in the state or federal courts located in Maricopa
                  County, Arizona. You consent to the personal jurisdiction of such courts and
                  waive any objection to the laying of venue in such courts.
                </p>
                <p>
                  Before initiating any formal legal proceedings, you agree to first attempt to
                  resolve any dispute informally by contacting Built by Nature at
                  support@builtbynature.com. The parties shall use good faith efforts to resolve
                  any dispute within thirty (30) days of the initial notice.
                </p>
              </div>
            </div>

            {/* Section 21 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">21.</span>
                Changes to Terms
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Built by Nature reserves the right to modify, amend, or update these Terms at
                  any time. When we make material changes, we will notify users by posting the
                  updated Terms on the Platform with a revised &quot;Last Updated&quot; date and, where
                  appropriate, providing additional notice via email or an in-platform
                  notification.
                </p>
                <p>
                  Your continued use of the Platform following the effective date of any changes
                  constitutes your acceptance of the revised Terms. If you do not agree to the
                  updated Terms, you must discontinue use of the Platform and may request
                  account termination.
                </p>
                <p>
                  We encourage you to review these Terms periodically to stay informed of any
                  updates.
                </p>
              </div>
            </div>

            {/* Section 22 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-start gap-3">
                <span className="text-amber-500 font-mono">22.</span>
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  If you have any questions, concerns, or requests regarding these Terms of
                  Service, please contact us at:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-4">
                  <p className="font-semibold text-white mb-2">Built by Nature LLC</p>
                  <p>
                    Website:{" "}
                    <Link href="/" className="text-amber-500 hover:text-amber-400 underline">
                      builtbynature.com
                    </Link>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:support@builtbynature.com"
                      className="text-amber-500 hover:text-amber-400 underline"
                    >
                      support@builtbynature.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
