import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { List, X, CaretDown } from "@phosphor-icons/react";

const navLinks = [
  {
    label: "Platform",
    children: [
      { href: "/features", label: "Capabilities" },
      { href: "/ai-studio", label: "AI Studio" },
      { href: "/saig-os", label: "SAIG-OS™ Governance" },
      { href: "/clarity", label: "C.L.A.R.I.T.Y. Framework™" },
      { href: "/services", label: "All Services" },
    ],
  },
  { href: "/pricing", label: "Pricing" },
  {
    label: "Resources",
    children: [
      { href: "/revenue-calculator", label: "Revenue Leak Calculator" },
      { href: "/roi-calculator", label: "ROI Calculator" },
      { href: "/ai-readiness", label: "AI Readiness Quiz" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isActive = (href: string) => location === href;
  const hasActiveChild = (children?: { href: string }[]) =>
    children?.some((c) => location === c.href);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A1628]/90 backdrop-blur-md border-b border-[#1E2D4A]">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#4AC4E0] rounded-sm flex items-center justify-center font-bold text-[#0A1628]">
            CV
          </div>
          <span className="font-bold text-xl text-white tracking-tight">ClientVerse</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.children) {
              const active = hasActiveChild(link.children);
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#4AC4E0] ${
                      active ? "text-[#4AC4E0]" : "text-gray-300"
                    }`}
                  >
                    {link.label}
                    <CaretDown
                      size={12}
                      weight="bold"
                      className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                      <div className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-xl shadow-xl py-2 min-w-[200px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`block px-4 py-2.5 text-sm transition-colors hover:bg-[#4AC4E0]/10 hover:text-[#4AC4E0] ${
                              isActive(child.href) ? "text-[#4AC4E0] bg-[#4AC4E0]/5" : "text-gray-300"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href!}
                className={`text-sm font-medium transition-colors hover:text-[#4AC4E0] ${
                  isActive(link.href!) ? "text-[#4AC4E0]" : "text-gray-300"
                }`}
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-semibold ml-2" data-testid="nav-cta">
            <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
              Book Your Revenue Audit
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
          {mobileOpen ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A1628] border-b border-[#1E2D4A] px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            if (link.children) {
              const expanded = mobileExpanded === link.label;
              return (
                <div key={link.label}>
                  <button
                    className="w-full flex items-center justify-between text-lg font-medium text-gray-300 py-3 px-2"
                    onClick={() => setMobileExpanded(expanded ? null : link.label)}
                  >
                    {link.label}
                    <CaretDown
                      size={14}
                      weight="bold"
                      className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expanded && (
                    <div className="pl-4 pb-2 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                          className={`block py-2 text-base transition-colors ${
                            isActive(child.href) ? "text-[#4AC4E0]" : "text-gray-400 hover:text-white"
                          }`}
                          data-testid={`nav-mobile-${child.label.toLowerCase()}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href!}
                className={`text-lg font-medium transition-colors block py-3 px-2 ${
                  isActive(link.href!) ? "text-[#4AC4E0]" : "text-gray-300"
                }`}
                onClick={() => setMobileOpen(false)}
                data-testid={`nav-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button asChild className="bg-[#4AC4E0] text-[#0A1628] w-full mt-3 font-bold" data-testid="nav-mobile-cta">
            <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
              Book Your Revenue Audit
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
