import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#0A1628] pt-24 pb-12 border-t border-[#1E2D4A] mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#4AC4E0] rounded-sm flex items-center justify-center font-bold text-[#0A1628]">
                CV
              </div>
              <span className="font-bold text-xl text-white tracking-tight">ClientVerse</span>
            </Link>
            <p className="text-gray-400 font-medium mb-4 leading-relaxed">
              Systems. Automation. AI. Operations. One partner. Veteran-owned.
            </p>
            <p className="text-gray-500 text-sm">
              A veteran-owned small business serving service businesses, nonprofits, healthcare organizations, and federal contractors.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">All Services</Link></li>
              <li><Link href="/ai-studio" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">AI Studio</Link></li>
              <li><Link href="/saig-os" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">SAIG-OS™ Governance</Link></li>
              <li><Link href="/clarity" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">C.L.A.R.I.T.Y. Framework™</Link></li>
              <li><Link href="/features" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">Capabilities</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/revenue-calculator" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">Revenue Leak Calculator</Link></li>
              <li><Link href="/roi-calculator" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">ROI Calculator</Link></li>
              <li><Link href="/ai-readiness" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">AI Readiness Quiz</Link></li>
              <li><Link href="/case-studies" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">Case Studies</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">Blog & Insights</Link></li>
              <li><Link href="/videos" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">Videos <span className="text-gray-600 text-xs">(Coming Soon)</span></Link></li>
              <li><Link href="/podcasts" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">Podcast <span className="text-gray-600 text-xs">(Coming Soon)</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">About Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">Contact</Link></li>
              <li><a href="mailto:support@clientverse.io" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">support@clientverse.io</a></li>
              <li><a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#4AC4E0] transition-colors text-sm">Book Your Revenue Audit</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1E2D4A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ClientVerse. All rights reserved. Veteran-owned small business.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
