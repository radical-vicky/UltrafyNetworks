"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Phone, MessageCircle, Clock, MapPin, Headset } from "lucide-react";

const subjects = [
  "Fiber internet installations",
  "Technical support",
  "Billing inquiry",
  "Upgrade package",
  "Relocation",
  "Solar panel installation",
  "Electrical installation",
  "CCTV installation",
  "Electric fence installation",
  "Fire alarm system",
  "Burglar alarm system",
  "Other",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      toast.success(data.message || "Message sent!");
      setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ============ HEADER BAND ============ */}
      <div className="relative bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-sm">GET IN TOUCH</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mt-3 max-w-xl leading-tight">
            Talk to UltrafyFiber Networks
          </h1>
          <p className="text-blue-100 mt-4 max-w-lg leading-relaxed">
            Whether it's a new installation, a billing question, or something urgent — our team in Nyahururu is ready to help.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <span className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-blue-50">
              <Clock className="w-4 h-4 text-yellow-400" />
              Mon–Sat, 8am–5pm
            </span>
            <span className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-blue-50">
              <Headset className="w-4 h-4 text-yellow-400" />
              Technical support 24/7
            </span>
          </div>
        </div>
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 pb-20 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">

          {/* ---- LEFT: contact info cards ---- */}
          <div className="space-y-5">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-950 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="font-bold text-blue-950 text-lg mb-1">Call us</p>
              <p className="text-slate-500 text-sm mb-4">Speak directly with our support team</p>
              <a href="tel:+254700000000" className="text-blue-700 font-semibold hover:text-blue-900 transition-colors">
                +254 700 000 000
              </a>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <p className="font-bold text-blue-950 text-lg mb-1">WhatsApp</p>
              <p className="text-slate-500 text-sm mb-4">Fastest way to reach us for quick queries</p>
              <a href="https://wa.me/254700000000" className="text-emerald-700 font-semibold hover:text-emerald-900 transition-colors">
                Start a chat →
              </a>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
              <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <p className="font-bold text-blue-950 text-lg mb-1">Email us</p>
              <p className="text-slate-500 text-sm mb-4">For detailed inquiries and documentation</p>
              <a href="mailto:support@ultrafyfiber.com" className="text-red-700 font-semibold hover:text-red-900 transition-colors break-all">
                support@ultrafyfiber.com
              </a>
            </div>

            <div className="bg-blue-950 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:24px_24px]" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="font-bold text-lg mb-1">Visit our office</p>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Eastward Plaza, Nyahururu Town<br />Open Monday to Saturday
                </p>
              </div>
            </div>
          </div>

          {/* ---- RIGHT: form ---- */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
            <h2 className="text-2xl font-extrabold text-blue-950 mb-1">Send us a message</h2>
            <p className="text-slate-500 mb-7">We typically respond within an hour during business hours.</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full name"
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Phone number"
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email address"
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />

              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
              >
                <option value="">Select a subject</option>
                {subjects.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us how we can help you..."
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 shadow-lg shadow-red-600/20"
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}