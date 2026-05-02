import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#0A1628] pt-24 pb-12 border-t border-[#1E2D4A] mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#4AC4E0] rounded-sm flex items-center justify-center font-bold text-[#0A1628]">
                CV
              </div>
              <span className="font-bold text-xl text-white tracking-tight">ClientVerse</span>
            </Link>
            <p className="text-gray-400 font-medium">
              Systems. Automation. AI. Operations. One partner.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/services" className="text-gray-400 hover:text-[#4AC4E0] transition-colors">Services</Link></li>
              <li><Link href="/features" className="text-gray-400 hover:text-[#4AC4E0] transition-colors">Capabilities</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-[#4AC4E0] transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-gray-400 hover:text-[#4AC4E0] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#4AC4E0] transition-colors">Contact</Link></li>
              <li><a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#4AC4E0] transition-colors">Book a Call</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="mailto:support@clientverse.io" className="text-gray-400 hover:text-[#4AC4E0] transition-colors">support@clientverse.io</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#1E2D4A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ClientVerse. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
