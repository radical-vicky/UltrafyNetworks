import Link from "next/link";
import {
  Wrench,
  Headset,
  Users,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

interface Role {
  title: string;
  department: string;
  location: string;
  type: string;
  icon: typeof Wrench;
  desc: string;
}

const openRoles: Role[] = [
  {
    title: "Field Technician",
    department: "Network Operations",
    location: "Nyahururu",
    type: "Full-time",
    icon: Wrench,
    desc: "Install and maintain fibre connections for homes and businesses, troubleshoot on-site issues, and keep our network running reliably across Nyahururu.",
  },
  {
    title: "Customer Support Agent",
    department: "Customer Experience",
    location: "Nyahururu",
    type: "Full-time",
    icon: Headset,
    desc: "Be the first voice customers hear — handle billing questions, technical support calls, and walk-in inquiries with patience and clarity.",
  },
];

const perks = [
  { icon: Heart, title: "Health cover", desc: "Medical insurance for you and your immediate family." },
  { icon: TrendingUp, title: "Room to grow", desc: "We promote from within as the company expands into new areas." },
  { icon: GraduationCap, title: "On-the-job training", desc: "Hands-on training for technical roles, no prior fibre experience required." },
  { icon: Users, title: "A close-knit team", desc: "Small enough that your work is visible, big enough to make an impact." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ============ HEADER ============ */}
      <div className="relative bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-sm">CAREERS</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mt-3 max-w-2xl leading-tight">
            Help us keep Nyahururu connected
          </h1>
          <p className="text-blue-100 mt-4 max-w-xl leading-relaxed">
            We're a growing local team building the internet, power, and security infrastructure our community relies on. Come build it with us.
          </p>
        </div>
      </div>

      {/* ============ OPEN ROLES ============ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-600 font-semibold tracking-widest text-sm">OPEN ROLES</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mt-3 mb-10 max-w-xl">
            Current openings
          </h2>

          <div className="space-y-5">
            {openRoles.map((role, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-3xl border border-slate-100 p-7 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center shrink-0">
                  <role.icon className="w-7 h-7 text-yellow-400" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-950">{role.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2 mb-3 max-w-2xl">{role.desc}</p>
                  <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {role.type}
                    </span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="bg-blue-950 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-center shrink-0"
                >
                  Apply now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY JOIN US ============ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-red-600 font-semibold tracking-widest text-sm">WHY JOIN US</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mt-3 mb-10 max-w-xl">
            What it's like working here
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 p-7">
                <div className="w-12 h-12 rounded-2xl bg-blue-950 flex items-center justify-center mb-5">
                  <perk.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-blue-950 mb-2">{perk.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GENERAL APPLICATION ============ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center mx-auto mb-6">
            <Users className="w-7 h-7 text-yellow-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mb-4">
            Don't see a role that fits?
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-9 max-w-xl mx-auto">
            We're growing fast and always interested in meeting skilled people across technical, sales, and support roles. Send us your details and we'll reach out when something opens up.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 shadow-lg shadow-red-600/20"
          >
            Submit a general application
          </Link>
        </div>
      </section>
    </div>
  );
}