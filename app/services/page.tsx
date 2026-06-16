import Link from "next/link";
import {
  Wifi,
  Sun,
  Zap,
  Video,
  ShieldAlert,
  Flame,
  Lock,
  Truck,
  ArrowUpCircle,
  Phone,
  CheckCircle2,
} from "lucide-react";

const internetPackages = [
  { speed: "15", price: "1,500", accent: "from-orange-500 to-orange-400" },
  { speed: "20", price: "2,000", accent: "from-emerald-500 to-emerald-400" },
  { speed: "30", price: "2,500", accent: "from-violet-500 to-violet-400" },
  { speed: "40", price: "3,000", accent: "from-sky-500 to-sky-400" },
];

const otherServices = [
  {
    icon: Sun,
    title: "Solar panel installation",
    desc: "Design and installation of solar systems sized to your home or business power needs, with battery backup options.",
    color: "bg-amber-500",
  },
  {
    icon: Zap,
    title: "Electrical installation",
    desc: "Full house and commercial wiring, fault diagnosis, and certified electrical work done to code.",
    color: "bg-yellow-500",
  },
  {
    icon: Video,
    title: "CCTV installation",
    desc: "Indoor and outdoor camera systems with remote viewing on your phone, sized for homes, shops, or compounds.",
    color: "bg-slate-700",
  },
  {
    icon: ShieldAlert,
    title: "Electric fence installation",
    desc: "Perimeter security fencing with shock deterrent and alarm integration for homes and commercial premises.",
    color: "bg-red-600",
  },
  {
    icon: Flame,
    title: "Fire alarm systems",
    desc: "Smoke and heat detection systems with audible alerts, installed and tested to meet safety requirements.",
    color: "bg-orange-600",
  },
  {
    icon: Lock,
    title: "Burglar alarm systems",
    desc: "Motion-sensor and entry alarms with optional monitoring, giving you alerts the moment something's wrong.",
    color: "bg-blue-700",
  },
];

const addOns = [
  { icon: Truck, title: "Relocation", desc: "Moving house? We'll transfer and reinstall your existing internet connection at the new address." },
  { icon: ArrowUpCircle, title: "Package upgrades", desc: "Outgrown your current speed? Switch to a faster plan anytime before your next billing cycle." },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ============ HEADER ============ */}
      <div className="relative bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-sm">OUR SERVICES</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mt-3 max-w-2xl leading-tight">
            More than internet — everything that keeps your home and business running
          </h1>
          <p className="text-blue-100 mt-4 max-w-xl leading-relaxed">
            From fibre installation to solar, security, and fire safety — our technicians handle it all under one roof in Nyahururu.
          </p>
        </div>
      </div>

      {/* ============ INTERNET PACKAGES ============ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-red-600 font-semibold tracking-widest text-sm">FIBRE INTERNET</p>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mb-10 max-w-xl">
            Pick a speed that fits your household
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internetPackages.map((pkg, i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-7 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`text-5xl font-extrabold bg-gradient-to-br ${pkg.accent} bg-clip-text text-transparent`}>
                  {pkg.speed}
                </div>
                <div className="text-sm text-slate-500 -mt-1 mb-4">Mbps</div>
                <div className="text-2xl font-bold text-blue-950">KSh {pkg.price}</div>
                <div className="text-xs text-slate-400 mb-5">per month</div>
                <ul className="text-sm text-slate-600 text-left space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    Unlimited data
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    Free installation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    24/7 technical support
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block w-full bg-blue-950 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Choose plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OTHER SERVICES ============ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-red-600 font-semibold tracking-widest text-sm">INSTALLATIONS &amp; SECURITY</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mt-3 mb-10 max-w-xl">
            Solar, electrical, and security work done right
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-100 p-7 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center mb-5`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-950 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.desc}</p>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-blue-700 hover:text-red-600 transition-colors inline-flex items-center gap-1"
                >
                  Get a quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ADD-ONS ============ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-red-600 font-semibold tracking-widest text-sm">ALREADY A CUSTOMER?</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mt-3 mb-10 max-w-xl">
            Manage your existing connection
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {addOns.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-5 bg-slate-50 rounded-3xl border border-slate-100 p-7"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-950 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-950 mb-1.5">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-5">
            Not sure which service you need?
          </h2>
          <p className="text-red-50 text-lg max-w-xl mx-auto mb-9 leading-relaxed">
            Tell us what you're trying to solve — internet, power, or security — and we'll recommend the right fit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0722118425"
              className="bg-white text-red-700 font-bold px-9 py-4 rounded-full text-lg hover:bg-yellow-400 hover:text-blue-950 transition-all duration-300 flex items-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call 0722 118 425
            </a>
            <Link
              href="/contact"
              className="border-2 border-white/80 hover:border-white font-semibold px-9 py-4 rounded-full text-lg hover:bg-white/10 transition-all duration-300"
            >
              Send us a message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}