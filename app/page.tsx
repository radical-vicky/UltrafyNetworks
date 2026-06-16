import Image from 'next/image';
import { Phone, Wifi, Zap, ShieldCheck, Headset, MapPin, Star, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* ============ HERO ============ */}
      <section
        className="relative min-h-[100dvh] flex items-center bg-cover bg-center bg-no-repeat text-white overflow-hidden"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/85 to-red-700/90" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:40px_40px]" />

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-sm font-medium tracking-wide">Now live in Nyahururu</span>
              </div>

              <div>
                <p className="text-blue-200 text-lg tracking-widest font-medium">FAST · RELIABLE · EFFICIENT</p>
                <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.05] mt-4">
                  Wired In.<br />
                  <span className="text-yellow-400">Tuko Eastward</span>
                </h1>
              </div>

              <p className="text-xl text-blue-50 max-w-md leading-relaxed">
                Fibre internet built for Nyahururu homes and businesses. No buffering, no excuses — just fast, dependable connection your whole family can count on.
              </p>

              {/* Packages */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[
                  { speed: "15", price: "1,500", accent: "from-orange-500 to-orange-400" },
                  { speed: "20", price: "2,000", accent: "from-emerald-500 to-emerald-400" },
                  { speed: "30", price: "2,500", accent: "from-violet-500 to-violet-400" },
                  { speed: "40", price: "3,000", accent: "from-sky-500 to-sky-400" },
                ].map((pkg, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl p-5 text-center hover:scale-105 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className={`text-4xl font-extrabold bg-gradient-to-br ${pkg.accent} bg-clip-text text-transparent`}>
                      {pkg.speed}
                    </div>
                    <div className="text-sm text-white/70 -mt-1">Mbps</div>
                    <div className="mt-3 text-2xl font-bold">KSh {pkg.price}</div>
                    <div className="text-xs text-white/60">per month</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#contact"
                  className="bg-yellow-400 text-blue-950 font-bold px-10 py-4 rounded-full text-lg hover:bg-white transition-all duration-300 shadow-lg shadow-yellow-400/20"
                >
                  Get Connected Now
                </a>
                <a
                  href="tel:0722118425"
                  className="border-2 border-white/80 hover:border-white font-semibold px-8 py-4 rounded-full text-lg flex items-center gap-3 hover:bg-white/10 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  0722 118 425
                </a>
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-blue-950/80 backdrop-blur-sm py-6 text-center z-20 border-t border-white/10">
          <p className="text-4xl md:text-5xl font-extrabold tracking-widest">0722 118 425</p>
          <p className="text-blue-200 mt-1">Call or WhatsApp us anytime for instant support</p>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-red-600 font-semibold tracking-widest text-sm">WHY WIRED INTERNET</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-blue-950 mt-3">
              Internet that actually works when you need it
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Real fibre speeds", desc: "What we advertise is what you get — no shared bandwidth tricks, no peak-hour slowdowns." },
              { icon: ShieldCheck, title: "99.5% uptime", desc: "Our network is monitored around the clock so outages get caught before you notice them." },
              { icon: Headset, title: "Local support", desc: "Talk to a real technician based in Nyahururu, not a call centre script in another county." },
              { icon: MapPin, title: "Same-day install", desc: "Order before noon and most homes in our coverage zone are online by evening." },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-red-600 font-semibold tracking-widest text-sm">GETTING STARTED</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-blue-950 mt-3">
              Three steps to getting wired
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-0.5 bg-blue-200" />

            {[
              { step: "1", title: "Check coverage", desc: "Tell us your location and we'll confirm if your home or business is within our fibre zone." },
              { step: "2", title: "Pick a package", desc: "Choose the speed that fits your household, from 15 Mbps starter plans to 40 Mbps for heavy streaming and gaming." },
              { step: "3", title: "We install for free", desc: "Our technician sets up your router and runs the line — most installs take under two hours." },
            ].map((item, i) => (
              <div key={i} className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-full bg-blue-950 text-yellow-400 font-extrabold text-lg flex items-center justify-center mb-5 relative z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COVERAGE ============ */}
      <section className="py-24 px-6 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:32px_32px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-yellow-400 font-semibold tracking-widest text-sm">COVERAGE AREA</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold mt-3 mb-6">
                Already lighting up Eastward Nyahururu
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
                We're expanding fast across estates and neighbouring centres. If you don't see your area listed yet, reach out — we add new zones every month based on demand.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Nyahururu Town", "Eastward Estate", "Ngarua Road", "Kinamba", "Sipili", "Ol Kalou"].map((area, i) => (
                  <span key={i} className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-80 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
              <p className="text-blue-300 text-sm">Coverage map</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-red-600 font-semibold tracking-widest text-sm">WHAT OUR CUSTOMERS SAY</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-blue-950 mt-3">
              Trusted by homes across Nyahururu
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Joyce Wambui", area: "Eastward Estate", quote: "Switched from mobile data and never looked back. My kids' online classes run without a single freeze now." },
              { name: "Daniel Kariuki", area: "Nyahururu Town", quote: "Installation took less than two hours and support actually picks up the phone when I call." },
              { name: "Mercy Njeri", area: "Kinamba", quote: "The 30 Mbps plan handles three of us streaming at once with no lag. Best decision for our home this year." },
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6">"{t.quote}"</p>
                <p className="font-bold text-blue-950">{t.name}</p>
                <p className="text-sm text-slate-500">{t.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-red-600 font-semibold tracking-widest text-sm">QUESTIONS</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-blue-950 mt-3">
              Common questions, answered
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is installation really free?", a: "Yes. Once you're within our coverage zone, our technician installs your router and runs the fibre line at no extra cost." },
              { q: "Can I upgrade my package later?", a: "Anytime. Call or WhatsApp us and we'll switch your plan before your next billing cycle." },
              { q: "What happens if I have an outage?", a: "Our network is monitored continuously. Report it through the support line and a technician is dispatched the same day for on-site issues." },
              { q: "Do you offer business packages?", a: "Yes, we work with shops, offices, and cyber cafes in Nyahururu on custom plans — contact us for pricing." },
            ].map((item, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-100 px-6 py-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-blue-950 list-none">
                  {item.q}
                  <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform duration-200" />
                </summary>
                <p className="text-slate-600 mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Ready to get wired?
          </h2>
          <p className="text-red-50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Tell us where you are and we'll let you know if you're in our coverage zone — most homes hear back within the hour.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0722118425"
              className="bg-white text-red-700 font-bold px-10 py-4 rounded-full text-lg hover:bg-yellow-400 hover:text-blue-950 transition-all duration-300 flex items-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call 0722 118 425
            </a>
            <a
              href="https://wa.me/254722118425"
              className="border-2 border-white/80 hover:border-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-all duration-300"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}