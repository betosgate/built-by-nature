import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Shield, FileText, Mail, AlertTriangle, UserX, Scale, CheckCircle } from "lucide-react";

export default function DMCAPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-amber-500" />
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
              Legal
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            DMCA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Takedown Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Built by Nature respects the intellectual property rights of others and
            expects its users to do the same. This policy outlines how to report
            copyright infringement in accordance with the Digital Millennium Copyright
            Act (DMCA).
          </p>
          <p className="text-gray-500 mt-4 text-sm">
            Last updated: March 7, 2026
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Overview</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              Built by Nature LLC (&quot;Built by Nature,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) respects the intellectual property rights of others and is
              committed to complying with the Digital Millennium Copyright Act (DMCA) and
              other applicable intellectual property laws. We will respond to legitimate
              notices of alleged copyright infringement that comply with the DMCA and any
              other applicable laws. If we receive proper notification of claimed copyright
              infringement, we will respond expeditiously by removing or disabling access to
              the material that is claimed to be infringing or to be the subject of infringing
              activity.
            </p>
          </div>
        </div>
      </section>

      {/* Filing a DMCA Takedown Notice */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Filing a DMCA Takedown Notice</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              If you believe that your copyrighted work has been copied and is accessible
              on the Built by Nature platform in a way that constitutes copyright
              infringement, you may submit a written notification to our designated DMCA
              Agent. Your notice must include the following information:
            </p>
            <ol className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm">
                  1
                </span>
                <div>
                  <h4 className="text-white font-semibold mb-1">Physical or Electronic Signature</h4>
                  <p className="text-gray-400">
                    A physical or electronic signature of the copyright owner or a person
                    authorized to act on behalf of the copyright owner.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm">
                  2
                </span>
                <div>
                  <h4 className="text-white font-semibold mb-1">Identification of Copyrighted Work</h4>
                  <p className="text-gray-400">
                    Identification of the copyrighted work claimed to have been infringed, or
                    if multiple copyrighted works are covered by a single notification, a
                    representative list of such works.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm">
                  3
                </span>
                <div>
                  <h4 className="text-white font-semibold mb-1">Identification of Infringing Material</h4>
                  <p className="text-gray-400">
                    Identification of the material that is claimed to be infringing or to be
                    the subject of infringing activity and that is to be removed or access to
                    which is to be disabled, and information reasonably sufficient to permit
                    Built by Nature to locate the material (e.g., the URL of the page
                    containing the material).
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm">
                  4
                </span>
                <div>
                  <h4 className="text-white font-semibold mb-1">Contact Information</h4>
                  <p className="text-gray-400">
                    Information reasonably sufficient to permit Built by Nature to contact the
                    complaining party, such as an address, telephone number, and, if available,
                    an email address.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm">
                  5
                </span>
                <div>
                  <h4 className="text-white font-semibold mb-1">Good Faith Statement</h4>
                  <p className="text-gray-400">
                    A statement that the complaining party has a good faith belief that use of
                    the material in the manner complained of is not authorized by the copyright
                    owner, its agent, or the law.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm">
                  6
                </span>
                <div>
                  <h4 className="text-white font-semibold mb-1">Accuracy Statement Under Penalty of Perjury</h4>
                  <p className="text-gray-400">
                    A statement that the information in the notification is accurate, and under
                    penalty of perjury, that the complaining party is authorized to act on behalf
                    of the owner of an exclusive right that is allegedly infringed.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Counter-Notification */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Scale className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Counter-Notification</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              If you believe that content you posted on Built by Nature was removed or
              access to it was disabled by mistake or misidentification, you may file a
              counter-notification with our DMCA Agent. Your counter-notification must
              include the following:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Your physical or electronic signature.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Identification of the material that has been removed or to which access has
                  been disabled, and the location at which the material appeared before it was
                  removed or access was disabled.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  A statement under penalty of perjury that you have a good faith belief that
                  the material was removed or disabled as a result of mistake or
                  misidentification of the material.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Your name, address, and telephone number, and a statement that you consent
                  to the jurisdiction of the Federal District Court for the judicial district
                  in which your address is located (or if you are outside the United States,
                  any judicial district in which Built by Nature may be found), and that you
                  will accept service of process from the person who provided the original
                  DMCA notification or an agent of such person.
                </span>
              </li>
            </ul>
            <p className="text-gray-400 mt-6 leading-relaxed">
              Upon receipt of a valid counter-notification, Built by Nature will promptly
              forward a copy to the original complaining party. If the original complaining
              party does not file a court action against the content provider within ten (10)
              to fourteen (14) business days, Built by Nature will restore the removed
              material or cease disabling access to it.
            </p>
          </div>
        </div>
      </section>

      {/* Repeat Infringer Policy */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <UserX className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Repeat Infringer Policy</h2>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              In accordance with the DMCA and other applicable law, Built by Nature has
              adopted a policy of terminating, in appropriate circumstances and at Built by
              Nature&apos;s sole discretion, the accounts of users who are deemed to be repeat
              infringers. Built by Nature may also, at its sole discretion, limit access to
              the platform and/or terminate the accounts of any users who infringe any
              intellectual property rights of others, whether or not there is any repeat
              infringement. If you believe that an account holder or subscriber is a repeat
              infringer, please contact our DMCA Agent and provide information sufficient for
              us to verify this claim.
            </p>
          </div>
        </div>
      </section>

      {/* Designated Agent */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Mail className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Designated DMCA Agent</h2>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              All DMCA takedown notices and counter-notifications should be sent to our
              designated agent at the following contact information:
            </p>
            <div className="space-y-4 bg-black/30 rounded-xl p-6">
              <div>
                <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Name</span>
                <p className="text-white text-lg mt-1">DMCA Agent, Built by Nature LLC</p>
              </div>
              <div>
                <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Email</span>
                <p className="text-white text-lg mt-1">
                  <a href="mailto:dmca@builtbynature.com" className="hover:text-amber-400 transition-colors underline underline-offset-4">
                    dmca@builtbynature.com
                  </a>
                </p>
              </div>
              <div>
                <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Address</span>
                <p className="text-white text-lg mt-1">Built by Nature LLC, Scottsdale, AZ, USA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Good Faith */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Good Faith</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Built by Nature acts in good faith to remove or disable access to material
              that is claimed to be infringing upon the copyright of a third party. Please
              note that submitting a DMCA takedown notice or counter-notification carries
              legal consequences. Before submitting a claim, please ensure that you have a
              good faith belief that the material in question infringes your copyright.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Please be aware that under Section 512(f) of the DMCA, any person who
              knowingly materially misrepresents that material is infringing, or that
              material was removed or disabled by mistake or misidentification, may be
              subject to liability for damages, including costs and attorneys&apos; fees.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
