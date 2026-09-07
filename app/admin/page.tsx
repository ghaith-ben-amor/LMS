"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RefreshCw, Search, Trash2, Users, Utensils, Shirt, Download, ArrowLeft, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

type Delegate = {
  id: number;
  full_name: string;
  email: string;
  organization?: string;
  position?: string;
  phone?: string;
  dietary_restrictions?: string;
  tshirt_size?: string;
  created_at: string;
};

export default function AdminPage() {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDelegates = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/registration", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load registrations");
      setDelegates(result.delegates || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load registrations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadDelegates();
  }, []);

  const filteredDelegates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return delegates;
    return delegates.filter((delegate) =>
      [delegate.full_name, delegate.email, delegate.organization, delegate.position].some((value) =>
        value?.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [delegates, query]);

  const removeDelegate = async (id: number) => {
    if (!window.confirm("Delete this registration permanently?")) return;
    const response = await fetch("/api/registration", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const result = await response.json();
      setError(result.error || "Could not delete registration");
      return;
    }
    setDelegates((current) => current.filter((delegate) => delegate.id !== id));
  };

  const exportCSV = () => {
    if (delegates.length === 0) return;
    const headers = ["ID", "Full Name", "Email", "Phone", "Organization", "Position", "Dietary", "T-Shirt Size", "Date"];
    const rows = delegates.map((d) => [
      d.id,
      `"${d.full_name}"`,
      `"${d.email}"`,
      `"${d.phone || ""}"`,
      `"${d.organization || ""}"`,
      `"${d.position || ""}"`,
      `"${d.dietary_restrictions || ""}"`,
      `"${d.tshirt_size || ""}"`,
      `"${new Date(d.created_at).toLocaleDateString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LMS2K26_Delegates_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dietaryCount = delegates.filter((delegate) => delegate.dietary_restrictions).length;
  const sizedCount = delegates.filter((delegate) => delegate.tshirt_size).length;

  return (
    <main className="min-h-screen bg-[#050507] text-ivory px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-amber-300 transition-colors mb-3">
              <ArrowLeft size={14} />
              <span>Back to Homepage</span>
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="gold">Control Room</Badge>
              <span className="text-xs font-mono text-ivory-dark">Database: delegates.db</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-extrabold mt-2">
              Delegate Registrations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => void loadDelegates()} leftIcon={<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />}>
              Refresh
            </Button>
            <Button variant="primary" size="sm" onClick={exportCSV} leftIcon={<Download size={14} />}>
              Export CSV
            </Button>
          </div>
        </header>

        {/* Dashboard Statistics */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="glass-card p-6 rounded-2xl border border-amber-500/20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-gold">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ivory-muted">Total Delegates</p>
              <strong className="font-serif text-3xl font-extrabold text-ivory">{delegates.length}</strong>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-amber-500/20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-300">
              <Utensils size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ivory-muted">Dietary Requirements</p>
              <strong className="font-serif text-3xl font-extrabold text-ivory">{dietaryCount}</strong>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-amber-500/20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-gold">
              <Shirt size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ivory-muted">T-Shirts Selected</p>
              <strong className="font-serif text-3xl font-extrabold text-ivory">{sizedCount}</strong>
            </div>
          </div>
        </section>

        {/* Main Table Panel */}
        <section className="glass-card rounded-3xl border border-amber-500/20 overflow-hidden shadow-2xl">
          <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-ivory font-bold">Registered Delegate Roster</h2>
              <p className="text-xs text-ivory-dark">{filteredDelegates.length} visible registration records</p>
            </div>

            {/* Search Input */}
            <label className="relative block w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory-dark" size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, organization..."
                className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface/80 pl-10 pr-4 py-2.5 text-xs text-ivory placeholder:text-ivory-dark outline-none transition focus:border-gold"
              />
            </label>
          </div>

          {error && (
            <div className="m-6 rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs font-semibold text-red-200">
              {error}
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[0.7rem] uppercase tracking-widest text-ivory-dark bg-obsidian-surface/40">
                  <th className="px-6 py-4">Delegate Details</th>
                  <th className="px-6 py-4">Organization</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">T-Shirt</th>
                  <th className="px-6 py-4">Registered Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-ivory-muted font-light">
                      Loading registrations...
                    </td>
                  </tr>
                ) : filteredDelegates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-ivory-muted font-light">
                      No delegate registrations found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredDelegates.map((delegate) => (
                    <tr key={delegate.id} className="transition hover:bg-white/[0.03]">
                      <td className="px-6 py-4">
                        <p className="font-bold text-ivory">{delegate.full_name}</p>
                        <p className="text-xs text-amber-400 font-semibold mt-0.5">{delegate.position || "Delegate"}</p>
                      </td>
                      <td className="px-6 py-4 text-ivory-muted font-light">
                        {delegate.organization || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-ivory">{delegate.email}</p>
                        <p className="text-xs text-ivory-dark mt-0.5">{delegate.phone || "No phone"}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-gold">
                        {delegate.tshirt_size ? (
                          <Badge variant="gold">{delegate.tshirt_size}</Badge>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-ivory-dark font-mono">
                        {new Date(delegate.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => void removeDelegate(delegate.id)}
                          aria-label={`Delete registration for ${delegate.full_name}`}
                          className="p-2 rounded-lg text-ivory-dark transition hover:bg-red-950/60 hover:text-red-300 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
