import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="text-gray-400">Last updated: March 7, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* What Are Cookies */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              1. What Are Cookies
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Cookies are small text files that are placed on your device when you
                visit a website. They are widely used to make websites work more
                efficiently, provide a better user experience, and supply information
                to the owners of the site.
              </p>
              <p>
                In addition to cookies, we may use similar technologies such as local
                storage, session storage, and pixel tags (collectively referred to as
                &quot;cookies&quot; in this policy) to collect and store information
                about your use of Built by Nature.
              </p>
            </div>
          </div>

          {/* Cookies We Use */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              2. Cookies We Use
            </h2>
            <div className="space-y-6">
              {/* Essential */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Essential / Strictly Necessary Cookies
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  These cookies are required for the platform to function and cannot
                  be switched off. They include Supabase authentication session
                  cookies that keep you logged in, CSRF protection tokens that guard
                  against cross-site request forgery attacks, and session identifiers
                  that maintain your connection to our servers. Without these cookies,
                  services you have requested cannot be provided.
                </p>
              </div>

              {/* Functional */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Functional Cookies
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Functional cookies allow us to remember choices you make on the
                  platform, such as your preferred language, theme settings, and
                  notification preferences. These cookies enhance your experience but
                  are not strictly necessary for the site to operate.
                </p>
              </div>

              {/* Analytics */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Analytics Cookies
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We may use analytics cookies to collect anonymous usage statistics
                  about how visitors interact with Built by Nature. This data helps
                  us understand which pages are most popular, how users navigate the
                  site, and where we can improve the experience. Analytics data is
                  aggregated and does not personally identify you.
                </p>
              </div>

              {/* Third-Party */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Third-Party Cookies
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our payment processing partner, CCBill, may set cookies on your
                  device when you make a purchase or interact with the payment flow.
                  These cookies are necessary for processing transactions securely,
                  preventing fraud, and maintaining your payment session. CCBill has
                  its own cookie and privacy policies, which we encourage you to
                  review.
                </p>
              </div>
            </div>
          </div>

          {/* Cookie List Table */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              3. Cookie List
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The following table lists the main cookies used by Built by Nature:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-3 pr-4 text-sm font-semibold text-amber-500 uppercase tracking-wider">
                      Cookie Name
                    </th>
                    <th className="py-3 pr-4 text-sm font-semibold text-amber-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="py-3 pr-4 text-sm font-semibold text-amber-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="py-3 text-sm font-semibold text-amber-500 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/10">
                    <td className="py-4 pr-4 font-mono text-sm">
                      sb-access-token
                    </td>
                    <td className="py-4 pr-4">
                      Supabase authentication — identifies your active session
                    </td>
                    <td className="py-4 pr-4">Session</td>
                    <td className="py-4">Essential</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 pr-4 font-mono text-sm">
                      sb-refresh-token
                    </td>
                    <td className="py-4 pr-4">
                      Supabase authentication — refreshes your session when it
                      expires
                    </td>
                    <td className="py-4 pr-4">7 days</td>
                    <td className="py-4">Essential</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 pr-4 font-mono text-sm">csrf-token</td>
                    <td className="py-4 pr-4">
                      Protects against cross-site request forgery attacks
                    </td>
                    <td className="py-4 pr-4">Session</td>
                    <td className="py-4">Essential</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 pr-4 font-mono text-sm">
                      user-preferences
                    </td>
                    <td className="py-4 pr-4">
                      Stores your language and display preferences
                    </td>
                    <td className="py-4 pr-4">1 year</td>
                    <td className="py-4">Functional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Manage Cookies */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              4. How to Manage Cookies
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Most web browsers allow you to control cookies through their
                settings. You can set your browser to refuse cookies, delete existing
                cookies, or alert you when a cookie is being set. Please note that
                disabling essential cookies may prevent you from using certain
                features of Built by Nature, including logging in to your account.
              </p>
              <p>
                You can manage cookies in the following browsers by visiting their
                respective support pages:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">Google Chrome:</strong>{" "}
                    Settings &gt; Privacy and Security &gt; Cookies and other site
                    data
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">Mozilla Firefox:</strong>{" "}
                    Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">Safari:</strong> Preferences
                    &gt; Privacy &gt; Manage Website Data
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>
                    <strong className="text-white">Microsoft Edge:</strong>{" "}
                    Settings &gt; Cookies and site permissions &gt; Manage and delete
                    cookies and site data
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Changes to Cookie Policy */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              5. Changes to This Cookie Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes
              in technology, legislation, or our data practices. When we make
              material changes, we will update the &quot;Last updated&quot; date at
              the top of this page and, where appropriate, notify you via email or a
              prominent notice on the platform.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-amber-500">
              6. Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about our use of cookies or this Cookie
              Policy, please contact us at{" "}
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
