"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  RefreshCw, Search, Trash2, Users, Utensils, Shirt, Download,
  ArrowLeft, Calendar, Plus, Pencil, Check, X, GripVertical,
  ChevronDown, ChevronUp, Clock, MapPin, User as UserIcon, ChevronLeft, ChevronRight,
  Lock, LogOut, Eye, EyeOff, ShieldCheck, Building, UtensilsCrossed, TrendingUp,
} from "lucide-react";


import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// ─── Types ─────────────────────────────────────────────────────────────────

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

type AgendaItem = {
  id: number;
  day_label: string;
  day_date: string;
  time: string;
  activity: string;
  description: string;
  location: string;
  duration?: string;
  speaker?: string;
  sort_order: number;
  created_at: string;
};

type AgendaForm = Omit<AgendaItem, "id" | "sort_order" | "created_at">;

const EMPTY_FORM: AgendaForm = {
  day_label: "DAY 01",
  day_date: "",
  time: "09:00",
  activity: "",
  description: "",
  location: "",
  duration: "",
  speaker: "",
};

type Tab = "delegates" | "agenda";

// ─── Picker helpers ──────────────────────────────────────────────────────────

/** Scroll-wheel style single-column selector */
function ScrollPicker<T extends string>({
  options, value, onChange, renderLabel,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  renderLabel?: (v: T) => string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const ITEM_H = 44;

  useEffect(() => {
    const idx = options.indexOf(value);
    if (listRef.current) {
      listRef.current.scrollTop = idx * ITEM_H;
    }
  }, [value, options]);

  const handleScroll = () => {
    if (!listRef.current) return;
    const idx = Math.round(listRef.current.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(options.length - 1, idx));
    if (options[clamped] !== value) onChange(options[clamped]);
  };

  return (
    <div className="relative flex flex-col items-center" style={{ height: ITEM_H * 3 + 8 }}>
      {/* Highlight strip */}
      <div
        className="pointer-events-none absolute left-0 right-0 rounded-xl border border-amber-400/40 bg-amber-500/10 z-10"
        style={{ top: ITEM_H + 4, height: ITEM_H }}
      />
      {/* Fade tops */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#0e0c12] to-transparent z-20" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0e0c12] to-transparent z-20" />
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="w-full overflow-y-scroll scrollbar-none snap-y snap-mandatory"
        style={{ height: ITEM_H * 3 + 8 }}
      >
        {/* top spacer */}
        <div style={{ height: ITEM_H + 4 }} />
        {options.map((opt) => (
          <div
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex items-center justify-center cursor-pointer snap-center select-none transition-all duration-150 font-bold text-sm ${
              opt === value ? "text-amber-400 scale-105" : "text-ivory-muted/50"
            }`}
            style={{ height: ITEM_H }}
          >
            {renderLabel ? renderLabel(opt) : opt}
          </div>
        ))}
        {/* bottom spacer */}
        <div style={{ height: ITEM_H + 4 }} />
      </div>
    </div>
  );
}

/** Dark-styled calendar date picker */
function CalendarPicker({
  value, onChange,
}: {
  value: string; // ISO "YYYY-MM-DD" from caller (caller stores readable, but passes ISO for selection)
  onChange: (isoDate: string) => void;
}) {
  const today = new Date();

  // Parse value — support both "YYYY-MM-DD" and human-readable fallback
  function parseIsoFromValue(v: string): { y: number; m: number; d: number } | null {
    if (!v) return null;
    // Try ISO
    const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
    if (iso) return { y: +iso[1], m: +iso[2] - 1, d: +iso[3] };
    // Try human-readable via Date constructor
    const parsed = new Date(v);
    if (!isNaN(parsed.getTime())) return { y: parsed.getFullYear(), m: parsed.getMonth(), d: parsed.getDate() };
    return null;
  }

  const parsed = parseIsoFromValue(value);
  const [viewYear, setViewYear] = useState(parsed?.y ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed?.m ?? today.getMonth());
  const [selYear, setSelYear] = useState(parsed?.y ?? 0);
  const [selMonth, setSelMonth] = useState(parsed?.m ?? -1);
  const [selDay, setSelDay] = useState(parsed?.d ?? 0);

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDay = (d: number) => {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    setSelYear(viewYear); setSelMonth(viewMonth); setSelDay(d);
    onChange(`${viewYear}-${mm}-${dd}`);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);


  return (
    <div className="rounded-2xl border border-amber-500/20 bg-[#0c0a10] p-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} aria-label="Previous month" className="p-1.5 rounded-lg hover:bg-white/5 text-ivory-muted hover:text-ivory transition cursor-pointer">
          <ChevronLeft size={16} />
        </button>
        <span className="font-bold text-sm text-ivory tracking-wide">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} aria-label="Next month" className="p-1.5 rounded-lg hover:bg-white/5 text-ivory-muted hover:text-ivory transition cursor-pointer">
          <ChevronRight size={16} />
        </button>
      </div>
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[0.65rem] font-bold uppercase tracking-wider text-ivory-dark py-1">{d}</div>
        ))}
      </div>
      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const isSelected = day === selDay && viewMonth === selMonth && viewYear === selYear;
          const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
          return (
            <button
              key={day}
              onClick={() => selectDay(day)}
              className={`mx-auto flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold transition cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-br from-amber-500 to-rose-700 text-obsidian shadow-lg shadow-amber-500/30 font-extrabold"
                  : isToday
                  ? "border border-amber-400/50 text-amber-300"
                  : "text-ivory-muted hover:bg-white/5 hover:text-ivory"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Dual-column scroll time picker (hours + minutes) */
function TimePicker({
  value, onChange,
}: {
  value: string; // "HH:MM"
  onChange: (v: string) => void;
}) {
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

  const [hh, mm] = value ? value.split(":") : ["09", "00"];

  const setHour = (h: string) => onChange(`${h}:${mm || "00"}`);
  const setMin = (m: string) => onChange(`${hh || "09"}:${m}`);

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-[#0c0a10] px-4 py-3">
      <p className="text-[0.65rem] font-bold uppercase tracking-widest text-ivory-dark text-center mb-3">
        Select Time
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <p className="text-[0.6rem] uppercase tracking-wider text-ivory-dark text-center mb-1">Hour</p>
          <ScrollPicker options={hours as unknown as string[]} value={hh} onChange={setHour} />
        </div>
        <div className="text-2xl font-extrabold text-amber-400 pb-1 select-none">:</div>
        <div className="flex-1">
          <p className="text-[0.6rem] uppercase tracking-wider text-ivory-dark text-center mb-1">Min</p>
          <ScrollPicker options={minutes as unknown as string[]} value={mm} onChange={setMin} />
        </div>
      </div>
      <p className="text-center text-amber-400 font-extrabold font-mono text-lg mt-3 tracking-widest">{hh}:{mm || "00"}</p>
    </div>
  );
}

/** Duration preset scroll picker */
const DURATION_OPTIONS = [
  "30 min", "45 min", "1 hour", "1.5 hours", "2 hours",
  "2.5 hours", "3 hours", "3.5 hours", "4 hours", "All Day",
];

function DurationPicker({
  value, onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const effective = DURATION_OPTIONS.includes(value) ? value : (value || DURATION_OPTIONS[2]);
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-[#0c0a10] px-4 py-3">
      <p className="text-[0.65rem] font-bold uppercase tracking-widest text-ivory-dark text-center mb-3">
        Duration
      </p>
      <ScrollPicker
        options={DURATION_OPTIONS}
        value={effective}
        onChange={(v) => onChange(v)}
      />
      <p className="text-center text-amber-400 font-bold text-sm mt-2">{effective}</p>
    </div>
  );
}

/** Day label scroll picker — DAY 01 … DAY 07 + custom */
const DAY_LABEL_OPTIONS = [
  "DAY 01", "DAY 02", "DAY 03", "DAY 04", "DAY 05", "DAY 06", "DAY 07",
];

function DayLabelPicker({
  value, onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [custom, setCustom] = useState(!DAY_LABEL_OPTIONS.includes(value));
  const effective = DAY_LABEL_OPTIONS.includes(value) ? value : DAY_LABEL_OPTIONS[0];

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-[#0c0a10] px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-widest text-ivory-dark">Day Label</p>
        <button
          type="button"
          onClick={() => { setCustom(c => !c); if (!custom) onChange(effective); }}
          className="text-[0.6rem] font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition cursor-pointer"
        >
          {custom ? "← Presets" : "Custom"}
        </button>
      </div>
      {custom ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. NIGHT 01"
          className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface/80 px-3 py-2 text-sm text-ivory placeholder:text-ivory-dark outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
        />
      ) : (
        <ScrollPicker
          options={DAY_LABEL_OPTIONS}
          value={effective}
          onChange={(v) => onChange(v)}
        />
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

// ─── Admin Login Form Component ─────────────────────────────────────────────

function AdminLoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid email or password");
      } else {
        onLoginSuccess();
      }
    } catch (err) {
      setError("Unable to connect to authentication server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-ivory flex items-center justify-center p-4">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-3xl border border-white/10 bg-[#0c0a12]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-blue-600/20 border border-amber-400/30 text-amber-400 mb-4 shadow-lg shadow-amber-500/10">
              <Lock size={28} />
            </div>
            <h1 className="font-serif text-3xl font-extrabold text-ivory tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs font-mono tracking-widest text-ivory-dark uppercase mt-2">
              LMS 2K26 Control Center
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300 flex items-center gap-3">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ivory-dark mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full rounded-xl border border-white/10 bg-obsidian-surface/90 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dark/50 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ivory-dark mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-obsidian-surface/90 px-4 py-3 pr-11 text-sm text-ivory placeholder:text-ivory-dark/50 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-dark hover:text-ivory transition cursor-pointer"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-xs font-extrabold uppercase tracking-widest text-obsidian shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <RefreshCw className="animate-spin" size={16} />
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Authenticate & Access</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-ivory-muted hover:text-gold transition"
            >
              <ArrowLeft size={12} /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("delegates");

  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => setAuthenticated(!!data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {
      // ignore
    }
    setAuthenticated(false);
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#050507] text-ivory flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="animate-spin text-amber-400" size={28} />
          <p className="text-xs font-mono tracking-widest text-ivory-dark uppercase">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLoginForm onLoginSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <main className="min-h-screen bg-[#050507] text-ivory px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header */}
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-amber-300 transition-colors mb-3"
            >
              <ArrowLeft size={14} />
              <span>Back to Homepage</span>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="gold">Control Room</Badge>
              <span className="text-xs font-mono text-ivory-dark">LMS 2K26 Admin</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-extrabold">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 transition cursor-pointer"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex gap-2 border-b border-white/10">
          {(["delegates", "agenda"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer -mb-px ${
                activeTab === tab
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-ivory-muted hover:text-ivory"
              }`}
            >
              {tab === "delegates" ? <Users size={15} /> : <Calendar size={15} />}
              {tab === "delegates" ? "Delegate Registrations" : "Agenda Manager"}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        {activeTab === "delegates" ? <DelegatesTab /> : <AgendaTab />}
      </div>
    </main>
  );
}


// ─── Delegates Tab ──────────────────────────────────────────────────────────

function DelegatesTab() {
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

  useEffect(() => { void loadDelegates(); }, []);

  const filteredDelegates = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return delegates;
    return delegates.filter((d) =>
      [d.full_name, d.email, d.organization, d.position].some((v) => v?.toLowerCase().includes(q))
    );
  }, [delegates, query]);

  const removeDelegate = async (id: number) => {
    if (!window.confirm("Delete this registration permanently?")) return;
    const res = await fetch("/api/registration", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const r = await res.json();
      setError(r.error || "Could not delete registration");
      return;
    }
    setDelegates((cur) => cur.filter((d) => d.id !== id));
  };

  const exportCSV = () => {
    if (!delegates.length) return;
    const headers = ["ID", "Full Name", "Email", "Phone", "Organization", "Position", "Dietary", "T-Shirt", "Date"];
    const rows = delegates.map((d) => [
      d.id, `"${d.full_name}"`, `"${d.email}"`, `"${d.phone || ""}"`,
      `"${d.organization || ""}"`, `"${d.position || ""}"`,
      `"${d.dietary_restrictions || ""}"`, `"${d.tshirt_size || ""}"`,
      `"${new Date(d.created_at).toLocaleDateString()}"`,
    ]);
    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `LMS2K26_Delegates_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalCount = delegates.length;

  const uniqueOrgs = useMemo(() => {
    const orgs = new Set(delegates.map((d) => d.organization?.trim().toLowerCase()).filter(Boolean));
    return orgs.size;
  }, [delegates]);

  const tshirtStats = useMemo(() => {
    const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
    const counts: Record<string, number> = {};
    sizes.forEach((s) => (counts[s] = 0));
    delegates.forEach((d) => {
      if (d.tshirt_size && counts[d.tshirt_size] !== undefined) {
        counts[d.tshirt_size]++;
      }
    });
    return counts;
  }, [delegates]);

  const dietaryCount = useMemo(() => {
    return delegates.filter((d) => d.dietary_restrictions && d.dietary_restrictions.trim().length > 0).length;
  }, [delegates]);

  const latestRegistrant = useMemo(() => {
    if (!delegates.length) return null;
    return delegates[0];
  }, [delegates]);

  return (
    <div className="space-y-8">
      {/* ─── Statistics Analytics Dashboard ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1: Total Delegates */}
        <div className="rounded-2xl border border-amber-500/20 bg-[#0e0c14]/90 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/40 transition shadow-lg">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-ivory-muted">Total Registrations</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-400">
              <Users size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-ivory">{totalCount}</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
              <TrendingUp size={12} /> Active
            </span>
          </div>
          <p className="text-[0.7rem] text-ivory-dark mt-2">Registered delegates for LMS 2K26</p>
        </div>

        {/* Stat Card 2: Organizations */}
        <div className="rounded-2xl border border-amber-500/20 bg-[#0e0c14]/90 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/40 transition shadow-lg">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-ivory-muted">Organizations</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400">
              <Building size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-ivory">{uniqueOrgs}</span>
            <span className="text-xs text-ivory-dark">Represented</span>
          </div>
          <p className="text-[0.7rem] text-ivory-dark mt-2">Unique entities & universities</p>
        </div>

        {/* Stat Card 3: Dietary Needs */}
        <div className="rounded-2xl border border-amber-500/20 bg-[#0e0c14]/90 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-rose-500/40 transition shadow-lg">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/20 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-ivory-muted">Dietary Requirements</span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-400/20 text-rose-400">
              <UtensilsCrossed size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-ivory">{dietaryCount}</span>
            <span className="text-xs text-rose-400 font-semibold">Special Notes</span>
          </div>
          <p className="text-[0.7rem] text-ivory-dark mt-2">Delegates needing custom meals</p>
        </div>

        {/* Stat Card 4: Latest Activity */}
        <div className="rounded-2xl border border-amber-500/20 bg-[#0e0c14]/90 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/40 transition shadow-lg">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-ivory-muted">Latest Registrant</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-400">
              <Clock size={18} />
            </div>
          </div>
          {latestRegistrant ? (
            <div>
              <p className="font-bold text-sm text-ivory truncate">{latestRegistrant.full_name}</p>
              <p className="text-[0.75rem] text-purple-300 truncate mt-0.5">{latestRegistrant.organization || latestRegistrant.email}</p>
            </div>
          ) : (
            <p className="text-xs text-ivory-dark italic">No registrations yet</p>
          )}
          <p className="text-[0.7rem] text-ivory-dark mt-2">Real-time registration feed</p>
        </div>
      </section>

      {/* ─── T-Shirt Size Distribution Bar Chart ─── */}
      <section className="rounded-2xl border border-amber-500/20 bg-[#0e0c14]/90 p-5 sm:p-6 backdrop-blur-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shirt size={18} className="text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-ivory">T-Shirt Size Distribution</h3>
          </div>
          <span className="text-xs text-ivory-dark font-mono">{totalCount} Total Registrations</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
          {Object.entries(tshirtStats).map(([size, count]) => {
            const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
            return (
              <div key={size} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                <div className="flex items-center justify-between text-xs font-bold text-ivory mb-1.5">
                  <span className="text-amber-400 font-mono">{size}</span>
                  <span className="font-mono text-ivory-muted">{count}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[0.65rem] text-ivory-dark mt-1.5 block font-mono">{pct}%</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Table */}
      <section className="glass-card rounded-3xl border border-amber-500/20 overflow-hidden shadow-2xl">

        <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-ivory font-bold">Registered Delegate Roster</h2>
            <p className="text-xs text-ivory-dark">{filteredDelegates.length} visible registration records</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="relative block w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory-dark" size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, org..."
                className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface/80 pl-10 pr-4 py-2.5 text-xs text-ivory placeholder:text-ivory-dark outline-none transition focus:border-gold"
              />
            </label>
            <Button variant="outline" size="sm" onClick={() => void loadDelegates()} leftIcon={<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />}>
              Refresh
            </Button>
            <Button variant="primary" size="sm" onClick={exportCSV} leftIcon={<Download size={14} />}>
              Export CSV
            </Button>
          </div>
        </div>

        {error && (
          <div className="m-6 rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs font-semibold text-red-200">{error}</div>
        )}

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
                <tr><td colSpan={6} className="px-6 py-12 text-center text-ivory-muted font-light">Loading registrations...</td></tr>
              ) : filteredDelegates.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-ivory-muted font-light">No registrations found.</td></tr>
              ) : (
                filteredDelegates.map((d) => (
                  <tr key={d.id} className="transition hover:bg-white/[0.03]">
                    <td className="px-6 py-4">
                      <p className="font-bold text-ivory">{d.full_name}</p>
                      <p className="text-xs text-amber-400 font-semibold mt-0.5">{d.position || "Delegate"}</p>
                    </td>
                    <td className="px-6 py-4 text-ivory-muted font-light">{d.organization || "—"}</td>
                    <td className="px-6 py-4">
                      <p className="text-ivory">{d.email}</p>
                      <p className="text-xs text-ivory-dark mt-0.5">{d.phone || "No phone"}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-gold">
                      {d.tshirt_size ? <Badge variant="gold">{d.tshirt_size}</Badge> : "—"}
                    </td>
                    <td className="px-6 py-4 text-xs text-ivory-dark font-mono">
                      {new Date(d.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => void removeDelegate(d.id)}
                        aria-label={`Delete registration for ${d.full_name}`}
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
  );
}

// ─── Agenda Tab ─────────────────────────────────────────────────────────────

function AgendaTab() {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AgendaItem | null>(null);
  const [form, setForm] = useState<AgendaForm>({ ...EMPTY_FORM });
  const [isSaving, setIsSaving] = useState(false);

  // Collapse state per day
  const [collapsedDays, setCollapsedDays] = useState<Set<string>>(new Set());

  const showMessage = (msg: string, isError = false) => {
    if (isError) setError(msg);
    else setSuccess(msg);
    setTimeout(() => { setError(""); setSuccess(""); }, 4000);
  };

  const loadAgenda = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/program", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load agenda");
      setItems(data.items || []);
    } catch (e) {
      showMessage(e instanceof Error ? e.message : "Could not load agenda", true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void loadAgenda(); }, [loadAgenda]);

  // Group items by day
  const grouped = useMemo(() => {
    const map = new Map<string, AgendaItem[]>();
    for (const item of items) {
      if (!map.has(item.day_label)) map.set(item.day_label, []);
      map.get(item.day_label)!.push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  const openCreate = () => {
    setEditingItem(null);
    setForm({ ...EMPTY_FORM });
    setModalOpen(true);
  };

  const openEdit = (item: AgendaItem) => {
    setEditingItem(item);
    setForm({
      day_label: item.day_label,
      day_date: item.day_date,
      time: item.time,
      activity: item.activity,
      description: item.description,
      location: item.location,
      duration: item.duration || "",
      speaker: item.speaker || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditingItem(null); };

  const handleSave = async () => {
    if (!form.day_label || !form.time || !form.activity) {
      showMessage("Day, time, and activity title are required.", true);
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        duration: form.duration || undefined,
        speaker: form.speaker || undefined,
        ...(editingItem ? { id: editingItem.id } : {}),
      };
      const res = await fetch("/api/program", {
        method: editingItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      showMessage(editingItem ? "Agenda item updated!" : "Agenda item added!");
      closeModal();
      await loadAgenda();
    } catch (e) {
      showMessage(e instanceof Error ? e.message : "Save failed", true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, activity: string) => {
    if (!window.confirm(`Delete "${activity}" permanently?`)) return;
    try {
      const res = await fetch("/api/program", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      showMessage("Item deleted.");
      setItems((cur) => cur.filter((i) => i.id !== id));
    } catch (e) {
      showMessage(e instanceof Error ? e.message : "Delete failed", true);
    }
  };

  const moveItem = async (item: AgendaItem, direction: "up" | "down") => {
    const dayItems = items
      .filter((i) => i.day_label === item.day_label)
      .sort((a, b) => a.sort_order - b.sort_order);
    const idx = dayItems.findIndex((i) => i.id === item.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= dayItems.length) return;

    const orderedIds = dayItems.map((i) => i.id);
    orderedIds.splice(idx, 1);
    orderedIds.splice(swapIdx, 0, item.id);

    // Optimistic update
    setItems((cur) => {
      const updated = [...cur];
      orderedIds.forEach((id, order) => {
        const found = updated.find((i) => i.id === id);
        if (found) found.sort_order = order;
      });
      return [...updated].sort((a, b) => a.sort_order - b.sort_order);
    });

    await fetch("/api/program", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reorder: orderedIds }),
    });
  };

  const toggleDay = (day: string) => {
    setCollapsedDays((prev) => {
      const next = new Set(prev);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-serif text-3xl text-ivory font-bold">Agenda Manager</h2>
          <p className="text-xs text-ivory-muted mt-1">
            Add, edit, reorder or delete sessions for &quot;THE JOURNEY&quot; section on the public site.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => void loadAgenda()} leftIcon={<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />}>
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus size={14} />}>
            Add Session
          </Button>
        </div>
      </div>

      {/* Feedback banners */}
      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs font-semibold text-red-200 flex items-center gap-2">
          <X size={14} /> {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <Check size={14} /> {success}
        </div>
      )}

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
        </div>
      ) : grouped.length === 0 ? (
        <div className="glass-card rounded-3xl border border-dashed border-amber-500/30 p-16 text-center">
          <Calendar className="mx-auto mb-4 text-ivory-muted opacity-40" size={48} />
          <p className="text-ivory-muted font-light">No agenda items yet.</p>
          <p className="text-xs text-ivory-dark mt-1">Click &quot;Add Session&quot; to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(([dayLabel, dayItems]) => {
            const sorted = [...dayItems].sort((a, b) => a.sort_order - b.sort_order);
            const collapsed = collapsedDays.has(dayLabel);
            const firstItem = dayItems[0];
            return (
              <div key={dayLabel} className="glass-card rounded-3xl border border-amber-500/20 overflow-hidden shadow-xl">
                {/* Day Header */}
                <div
                  className="flex items-center justify-between px-6 py-5 border-b border-white/10 cursor-pointer select-none hover:bg-white/[0.02] transition"
                  onClick={() => toggleDay(dayLabel)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <Calendar size={18} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-extrabold text-ivory">{dayLabel}</h3>
                      <p className="text-xs text-ivory-dark">{firstItem?.day_date}</p>
                    </div>
                    <Badge variant="gold">{sorted.length} sessions</Badge>
                  </div>
                  <button className="text-ivory-muted hover:text-ivory transition p-1 cursor-pointer">
                    {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                  </button>
                </div>

                {/* Sessions */}
                {!collapsed && (
                  <div className="divide-y divide-white/[0.06]">
                    {sorted.map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex flex-col md:flex-row md:items-center gap-4 px-6 py-5 hover:bg-white/[0.02] transition group"
                      >
                        {/* Reorder controls */}
                        <div className="flex md:flex-col gap-1 flex-shrink-0">
                          <button
                            onClick={() => void moveItem(item, "up")}
                            disabled={idx === 0}
                            aria-label="Move up"
                            className="p-1.5 rounded text-ivory-muted hover:text-ivory disabled:opacity-20 disabled:cursor-not-allowed transition cursor-pointer"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <GripVertical size={16} className="text-ivory-dark opacity-30 mx-auto" />
                          <button
                            onClick={() => void moveItem(item, "down")}
                            disabled={idx === sorted.length - 1}
                            aria-label="Move down"
                            className="p-1.5 rounded text-ivory-muted hover:text-ivory disabled:opacity-20 disabled:cursor-not-allowed transition cursor-pointer"
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>

                        {/* Time */}
                        <div className="flex-shrink-0 w-20">
                          <span className="font-serif text-2xl font-extrabold text-gradient-gold">{item.time}</span>
                          {item.duration && (
                            <p className="text-[0.65rem] text-ivory-dark flex items-center gap-1 mt-0.5">
                              <Clock size={10} className="text-amber-400" />{item.duration}
                            </p>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-ivory text-sm sm:text-base truncate">{item.activity}</h4>
                          <p className="text-xs text-ivory-muted font-light line-clamp-1 mt-0.5">{item.description}</p>
                          <div className="flex flex-wrap gap-3 mt-1.5 text-[0.7rem] font-semibold">
                            {item.location && (
                              <span className="flex items-center gap-1 text-amber-400/80">
                                <MapPin size={11} /> {item.location}
                              </span>
                            )}
                            {item.speaker && (
                              <span className="flex items-center gap-1 text-rose-300">
                                <UserIcon size={11} /> {item.speaker}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEdit(item)}
                            aria-label={`Edit ${item.activity}`}
                            className="p-2 rounded-lg text-ivory-dark hover:bg-amber-500/10 hover:text-amber-400 transition cursor-pointer"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => void handleDelete(item.id, item.activity)}
                            aria-label={`Delete ${item.activity}`}
                            className="p-2 rounded-lg text-ivory-dark hover:bg-red-950/60 hover:text-red-300 transition cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Modal ─────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={editingItem ? "Edit agenda session" : "Add agenda session"}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />

          {/* Panel */}
          <div className="relative w-full max-w-2xl bg-[#0e0c12] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
              <div>
                <h3 className="font-serif text-2xl font-extrabold text-ivory">
                  {editingItem ? "Edit Session" : "New Session"}
                </h3>
                <p className="text-xs text-ivory-muted mt-0.5">
                  {editingItem ? `Editing: ${editingItem.activity}` : "Add a new agenda item to the public schedule"}
                </p>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="p-2 rounded-xl text-ivory-dark hover:text-ivory hover:bg-white/5 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <div className="px-8 py-6 space-y-6 max-h-[78vh] overflow-y-auto">

              {/* Row 1 — Day label + Calendar */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1.5">
                    Day Label *
                  </label>
                  <DayLabelPicker
                    value={form.day_label}
                    onChange={(v) => setForm((f) => ({ ...f, day_label: v }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1.5">
                    Day Date
                    <span className="ml-2 font-normal normal-case tracking-normal text-ivory-dark">
                      {form.day_date
                        ? new Date(form.day_date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
                        : "(choose below)"}
                    </span>
                  </label>
                  <CalendarPicker
                    value={form.day_date}
                    onChange={(v) => {
                      // Also auto-format to "Month DD, YYYY" for display on site
                      const d = new Date(v + "T00:00:00");
                      const readable = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
                      setForm((f) => ({ ...f, day_date: readable }));
                    }}
                  />
                </div>
              </div>

              {/* Row 2 — Time + Duration pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1.5">Time *</label>
                  <TimePicker
                    value={form.time}
                    onChange={(v) => setForm((f) => ({ ...f, time: v }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1.5">Duration</label>
                  <DurationPicker
                    value={form.duration || ""}
                    onChange={(v) => setForm((f) => ({ ...f, duration: v }))}
                  />
                </div>
              </div>

              {/* Activity Title */}
              <Field label="Activity Title *">
                <input
                  value={form.activity}
                  onChange={(e) => setForm((f) => ({ ...f, activity: e.target.value }))}
                  placeholder="Opening Ceremony"
                  className={INPUT}
                />
              </Field>

              {/* Description */}
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of this session..."
                  rows={3}
                  className={INPUT + " resize-none"}
                />
              </Field>

              {/* Location + Speaker */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Location">
                  <input
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    placeholder="Grand Ballroom"
                    className={INPUT}
                  />
                </Field>
                <Field label="Speaker (optional)">
                  <input
                    value={form.speaker}
                    onChange={(e) => setForm((f) => ({ ...f, speaker: e.target.value }))}
                    placeholder="Speaker name"
                    className={INPUT}
                  />
                </Field>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-white/10 bg-obsidian-surface/30">
              <Button variant="outline" size="sm" onClick={closeModal}>Cancel</Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => void handleSave()}
                leftIcon={isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
              >
                {isSaving ? "Saving…" : editingItem ? "Save Changes" : "Add Session"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Small helpers ──────────────────────────────────────────────────────────

const INPUT =
  "w-full rounded-xl border border-amber-500/20 bg-obsidian-surface/80 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory-dark outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/30";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted">
        {label}
        {hint && <span className="ml-2 text-ivory-dark font-normal normal-case tracking-normal">({hint})</span>}
      </label>
      {children}
    </div>
  );
}
