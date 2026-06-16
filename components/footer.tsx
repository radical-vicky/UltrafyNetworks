import Link from "next/link";
import {
  Wifi,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-blue-100 to-blue-950 pt-16">

      {/* ============ START YOUR JOURNEY STRIP ============ */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-blue-950 rounded-3xl px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:32px_32px]" />
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white">
              Start your internet journey today
            </h3>
            <p className="text-blue-200 mt-2">We're here whenever you need us.</p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <a
              href="https://wa.me/254722118425"
              className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-yellow-400" />
              24/7 Chat Support
            </a>
            <a
              href="tel:0722118425"
              className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-yellow-400" />
              0722 118 425
            </a>
            <a
              href="mailto:info@wiredinternet.co.ke"
              className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4 text-yellow-400" />
              Write to us
            </a>
          </div>
        </div>
      </div>

      {/* ============ LINK COLUMNS ============ */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Wifi className="w-6 h-6 text-red-600" />
              <span className="text-blue-950 font-extrabold text-xl">WIRED INTERNET</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Fast, reliable fibre internet, solar, and security installations for homes and businesses across Nyahururu.
            </p>
          </div>

          <div>
            <p className="text-blue-950 font-bold mb-4 text-sm uppercase tracking-wide">Internet</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services" className="text-slate-600 hover:text-red-600 transition-colors">Home plans</Link></li>
              <li><Link href="/services" className="text-slate-600 hover:text-red-600 transition-colors">Business plans</Link></li>
              <li><Link href="/coverage" className="text-slate-600 hover:text-red-600 transition-colors">Coverage area</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-blue-950 font-bold mb-4 text-sm uppercase tracking-wide">Company</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-slate-600 hover:text-red-600 transition-colors">About us</Link></li>
              <li><Link href="/careers" className="text-slate-600 hover:text-red-600 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-red-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-blue-950 font-bold mb-4 text-sm uppercase tracking-wide">Help</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/faq" className="text-slate-600 hover:text-red-600 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-red-600 transition-colors">Get support</Link></li>
            </ul>
          </div>
        </div>

        {/* social */}
        <div className="flex items-center gap-3 mt-10">
          <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-red-600 flex items-center justify-center transition-colors">
            <FaFacebookF className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-red-600 flex items-center justify-center transition-colors">
            <FaInstagram className="h-5 w-5" />
          </a>
          <a href="#" aria-label="X / Twitter" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-red-600 flex items-center justify-center transition-colors">
            <FaXTwitter className="h-5 w-5" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-red-600 flex items-center justify-center transition-colors">
            <FaLinkedinIn className="h-5 w-5" />
          </a>
          <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-red-600 flex items-center justify-center transition-colors">
            <FaYoutube className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* ============ BOTTOM BAR ============ */}
      <div className="border-t border-blue-900/40">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-blue-100">© {new Date().getFullYear()} Wired Internet. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-blue-100 hover:text-yellow-400 transition-colors">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-blue-100 hover:text-yellow-400 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}