"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Search, Inbox, RefreshCw } from "lucide-react";

interface ContactRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactRequest | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact-requests");
      const data = await res.json();

      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error("Failed to load contacts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredContacts = contacts.filter((c) =>
    `${c.fullName} ${c.email} ${c.phone} ${c.subject} ${c.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: any = {
      new: "bg-blue-100 text-blue-700",
      in_progress: "bg-yellow-100 text-yellow-700",
      resolved: "bg-green-100 text-green-700",
    };

    const label = status === "in_progress" ? "In Progress" : 
                  status === "resolved" ? "Resolved" : "New";

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-950 px-6 py-8">

        

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-xs">ADMIN PANEL</p>
          <h1 className="text-3xl font-extrabold text-white mt-1">Ultrafy Fiber Networks - Contacts</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-4 pb-16">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, or subject..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-slate-400">Loading contact requests...</div>
          ) : filteredContacts.length === 0 ? (
            <div className="py-20 text-center">
              <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No contact requests yet.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase">Name</th>
                  <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase">Contact Info</th>
                  <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase">Subject</th>
                  <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{c.fullName}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div>{c.email}</div>
                      <div className="text-xs text-slate-400">{c.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        {c.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(c.status)}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{formatDate(c.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setSelected(null)}>
          <div
            className="bg-white w-full max-w-md h-full overflow-y-auto p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-black mb-6">
              ✕ Close
            </button>

            <h2 className="text-2xl font-bold text-blue-950">{selected.fullName}</h2>
            <p className="text-slate-400 text-sm">{formatDate(selected.createdAt)}</p>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
                <Mail className="w-5 h-5 text-slate-400" />
                <a href={`mailto:${selected.email}`} className="text-blue-700 font-medium">{selected.email}</a>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
                <Phone className="w-5 h-5 text-slate-400" />
                <a href={`tel:${selected.phone}`} className="text-blue-700 font-medium">{selected.phone}</a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Subject</p>
                <p className="font-medium">{selected.subject}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Message</p>
                <p className="bg-slate-50 p-5 rounded-2xl leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Status</p>
                {getStatusBadge(selected.status)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}