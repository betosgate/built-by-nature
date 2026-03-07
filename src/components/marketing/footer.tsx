import Link from "next/link";
import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flame className="h-6 w-6 text-amber-500" />
              <span className="text-lg font-bold text-white">Built by Nature</span>
            </Link>
            <p className="text-sm max-w-md">
              The premier natural beauty competition. No filters, no fakes — just you.
              All body types, tattoos, and piercings welcome. Real beauty, real prizes, real earnings.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contests" className="hover:text-white transition-colors">Contests</Link></li>
              <li><Link href="/rules" className="hover:text-white transition-colors">Contest Rules</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              <li><Link href="/recruit" className="hover:text-white transition-colors">Become a Recruiter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/acceptable-use" className="hover:text-white transition-colors">Acceptable Use</Link></li>
              <li><Link href="/dmca" className="hover:text-white transition-colors">DMCA Policy</Link></li>
              <li><Link href="/compliance" className="hover:text-white transition-colors">2257 Compliance</Link></li>
              <li><Link href="/complaints" className="hover:text-white transition-colors">Complaints</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="mailto:support@builtbynature.com" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Built by Nature. All rights reserved. Where real wins.</p>
        </div>
      </div>
    </footer>
  );
}
