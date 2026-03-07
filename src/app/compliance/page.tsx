import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Shield, FileText, UserCheck, BookOpen, Scale, Eye, AlertTriangle } from "lucide-react";

export default function CompliancePage() {
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
              Legal Compliance
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            18 U.S.C. 2257{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Compliance Statement
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Record-Keeping Requirements Compliance Statement pursuant to 18 U.S.C.
            Section 2257 and 28 C.F.R. Part 75 for Built by Nature LLC.
          </p>
          <p className="text-gray-500 mt-4 text-sm">
            Last updated: March 7, 2026
          </p>
        </div>
      </section>

      {/* Statement */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Statement</h2>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8">
            <p className="text-gray-200 text-lg leading-relaxed font-medium">
              All persons who appear in any visual depictions of actual or simulated
              sexually explicit conduct appearing on, or otherwise contained in, this
              website were eighteen (18) years of age or older at the time of the creation
              of such depictions. All other visual depictions displayed on this website are
              exempt from the provision of 18 U.S.C. Section 2257 and 28 C.F.R. Part 75.
            </p>
          </div>
        </div>
      </section>

      {/* Record Keeping */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Record Keeping</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Built by Nature LLC is not the primary producer of any visual content
              displayed on this website. All content appearing on this platform is
              user-generated and uploaded by registered users who have verified their age
              as being eighteen (18) years of age or older during the account registration
              process.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              As a hosting platform for user-generated content, Built by Nature LLC
              maintains records of age verification for all registered users in accordance
              with applicable law. The individual content creators (the users who upload
              content) are responsible for maintaining the records required by 18 U.S.C.
              Section 2257 for any content they produce and upload to this platform.
            </p>
          </div>
        </div>
      </section>

      {/* Custodian of Records */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Custodian of Records</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              The records required by 18 U.S.C. Section 2257 and 28 C.F.R. Part 75 for
              content produced by users and appearing on this website are kept by the
              individual content creators (the users who upload the content). Built by
              Nature LLC maintains records of age verification for all registered users who
              create and upload content to this platform.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              For inquiries regarding record keeping and compliance, the Custodian of
              Records may be reached at the following:
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8">
            <div className="space-y-4 bg-black/30 rounded-xl p-6">
              <div>
                <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Custodian of Records</span>
                <p className="text-white text-lg mt-1">Built by Nature LLC</p>
              </div>
              <div>
                <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Address</span>
                <p className="text-white text-lg mt-1">Scottsdale, AZ, USA</p>
              </div>
              <div>
                <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Email</span>
                <p className="text-white text-lg mt-1">
                  <a href="mailto:compliance@builtbynature.com" className="hover:text-amber-400 transition-colors underline underline-offset-4">
                    compliance@builtbynature.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exemption */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Scale className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Exemption</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              To the extent that any visual depictions displayed on this website are not
              subject to the requirements of 18 U.S.C. Section 2257, Built by Nature LLC
              claims exemption from the record-keeping requirements of 18 U.S.C. Section
              2257 and 28 C.F.R. Part 75 pursuant to 28 C.F.R. Section 75.1(c)(4), as a
              website that does not produce any of the content that appears on the platform
              but rather hosts user-generated content uploaded by registered, age-verified
              users.
            </p>
          </div>
        </div>
      </section>

      {/* Age Verification */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Eye className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Age Verification</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Built by Nature LLC is committed to ensuring that all users of this platform
              are of legal age. The following measures are in place to verify the age of all
              users:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  All users are required to confirm that they are eighteen (18) years of age
                  or older during the account registration process.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Date of birth is collected from all users during registration and is
                  verified against the minimum age requirement.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Users who are unable to verify that they are eighteen (18) years of age or
                  older are prohibited from creating an account or uploading any content to
                  the platform.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Built by Nature LLC reserves the right to request additional proof of age at
                  any time, including but not limited to government-issued photo identification.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Content Moderation */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold">Content Moderation</h2>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Built by Nature LLC takes the protection of minors extremely seriously. The
              following content moderation policies are strictly enforced:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  All content uploaded to this platform is reviewed and moderated by our
                  content moderation team to ensure compliance with all applicable laws and
                  our Terms of Service.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Any content that is suspected of involving minors is immediately removed
                  from the platform without notice.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Any suspected violations involving minors are immediately reported to the
                  National Center for Missing and Exploited Children (NCMEC) and appropriate
                  law enforcement authorities.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Users who upload content in violation of these policies will have their
                  accounts permanently terminated and may be subject to criminal prosecution
                  under applicable law.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about this compliance statement or wish to report a
              concern, please contact us at{" "}
              <a href="mailto:compliance@builtbynature.com" className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4">
                compliance@builtbynature.com
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
