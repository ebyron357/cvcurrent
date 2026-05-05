import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="18" x2="15" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M17 5 L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 5 L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Capabilities" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A1628]/90 backdrop-blur-md border-b border-[#1E2D4A]">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4AC4E0] rounded-sm flex items-center justify-center font-bold text-[#0A1628]">
            CV
          </div>
          <span className="font-bold text-xl text-white tracking-tight">ClientVerse</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#4AC4E0] ${
                  location === link.href ? "text-[#4AC4E0]" : "text-gray-300"
                }`}
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-semibold" data-testid="nav-cta">
            <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
              Book a Systems Review
            </a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="nav-mobile-toggle"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A1628] border-b border-[#1E2D4A] px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium transition-colors block py-2 ${
                location === link.href ? "text-[#4AC4E0]" : "text-gray-300"
              }`}
              onClick={() => setMobileOpen(false)}
              data-testid={`nav-mobile-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="bg-[#4AC4E0] text-[#0A1628] w-full mt-4" data-testid="nav-mobile-cta">
            <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
              Book a Systems Review
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
