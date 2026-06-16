"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Coverage",
    href: "/coverage",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold shadow-lg transition-transform duration-300 group-hover:scale-105">
                UF
              </div>

              <div className="hidden sm:block">
                <h1
                  className={`font-bold text-lg transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-900"
                      : "text-white"
                  }`}
                >
                  UltrafyFiber
                </h1>

                <p
                  className={`text-xs transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-500"
                      : "text-gray-200"
                  }`}
                >
                  Fast • Reliable • Unlimited
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors duration-300 hover:text-blue-600 ${
                    isScrolled
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Connected

                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`md:hidden rounded-xl p-2 transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Open Menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 md:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <aside
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold">
                UF
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  UltrafyFiber
                </h2>

                <p className="text-xs text-gray-500">
                  Fast • Reliable
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Navigation */}
          <div className="flex flex-col px-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-4 text-lg font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Get Connected

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 px-6 py-5">
            <p className="text-sm text-gray-500">
              Monday – Saturday
            </p>

            <p className="font-medium text-gray-900">
              8:00 AM – 5:00 PM
            </p>

            <p className="mt-2 text-sm text-blue-600 font-medium">
              24/7 Technical Support Available
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}