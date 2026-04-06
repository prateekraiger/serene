"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#shop", label: "Explore Our Shop" },
    { href: "#features", label: "Why Choose Serene" },
    { href: "#lifestyle", label: "Moments of Calm" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <nav 
        className={`max-w-5xl mx-auto mt-6 px-4 pointer-events-auto transition-all duration-500 ${
          mobileMenuOpen ? "" : "rounded-full"
        } ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5" 
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-2">
          {/* Logo */}
          <Link
            href="#"
            className={`flex items-center gap-2 font-display text-2xl tracking-tight transition-colors duration-500 ${
              isScrolled ? "text-[#1A1A1A]" : "text-white"
            }`}
          >
            <div className="relative w-8 h-8 rounded-full bg-current flex items-center justify-center">
              <span className={`text-[18px] font-display font-light ${isScrolled ? "text-white" : "text-black"}`}>S</span>
            </div>
            Serene
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs transition-colors duration-500 ${
                  isScrolled 
                    ? "text-[#1A1A1A] hover:text-[#737373]" 
                    : "text-white hover:text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-full transition-colors duration-500 ${
              isScrolled 
                ? "hover:bg-[#F5F5F5] text-[#1A1A1A]" 
                : "hover:bg-white/10 text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-8 border-t border-[#E5E5E5]/50 bg-white">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-display text-3xl text-[#1A1A1A] hover:text-[#737373] transition-colors px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
