"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Search,
  Trash2,
  Users,
  Utensils,
  Shirt,
  Download,
  ArrowLeft,
  Calendar,
  Plus,
  Clock,
  MapPin,
  User,
  Edit2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { DaySchedule, ScheduleItem } from "@/data/program";

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
  const [activeTab, setActiveTab] = useState<"delegates" | "agenda">("delegates");

  // Delegates State
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [query, setQuery] = useState("");
  const [isLoadingDelegates, setIsLoadingDelegates] = useState(true);
  const [delegateError, setDelegateError] = useState("");

  // Agenda State
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [isLoadingAgenda, setIsLoadingAgenda] = useState(false);
  const [agendaError, setAgendaError] = useState("");
  const [agendaSuccessMsg, setAgendaSuccessMsg] = useState("");

  // Add/Edit Event Modal State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    day_number: 1,
    time: "09:00",
    activity: "",
    description: "",
    location: "Grand Ballroom",
    duration: "1 hour",
    speaker: "",
  });

  // Load Delegates
  const loadDelegates = async () => {
    setIsLoadingDelegates(true);
    setDelegateError("");
    try {
      const response = await fetch("/api/registration", { cache: "no-store" });
      let result: any = {};
      try {
        result = await response.json();
      } catch {
        result = { error: "Could not parse server response" };
      }
      if (!response.ok) throw new Error(result.error || "Could not load registrations");
      setDelegates(result.delegates || []);
    } catch (loadError) {
      setDelegateError(loadError instanceof Error ? loadError.message : "Could not load registrations");
    } finally {
      setIsLoadingDelegates(false);
    }
  };

  // Load Agenda
  const loadAgenda = async () => {
    setIsLoadingAgenda(true);
    setAgendaError("");
    try {
      const response = await fetch("/api/program", { cache: "no-store" });
      let result: any = {};
      try {
        result = await response.json();
      } catch {
        result = { error: "Could not parse server response" };
      }
      if (!response.ok) throw new Error(result.error || "Could not load program agenda");
      if (result.schedule && Array.isArray(result.schedule)) {
        setSchedule(result.schedule);
      }
    } catch (err) {
      setAgendaError(err instanceof Error ? err.message : "Could not load program agenda");
    } finally {
      setIsLoadingAgenda(false);
    }
  };

  useEffect(() => {
    void loadDelegates();
    void loadAgenda();
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

    let result: any = {};
    try {
      result = await response.json();
    } catch {
      result = { error: "Could not delete registration" };
    }

    if (!response.ok) {
      setDelegateError(result.error || "Could not delete registration");
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

  // Open Event Modal for Adding
  const handleOpenAddEvent = (dayNum: number) => {
    setEditingEventId(null);
    setEventForm({
      day_number: dayNum,
      time: "09:00",
      activity: "",
      description: "",
      location: "Grand Ballroom",
      duration: "1 hour",
      speaker: "",
    });
    setIsEventModalOpen(true);
  };

  // Open Event Modal for Editing
  const handleOpenEditEvent = (evt: ScheduleItem, dayNum: number) => {
    setEditingEventId(evt.id);
    setEventForm({
      day_number: dayNum,
      time: evt.time,
      activity: evt.activity,
      description: evt.description || "",
      location: evt.location,
      duration: evt.duration || "",
      speaker: evt.speaker || "",
    });
    setIsEventModalOpen(true);
  };

  // Save Event
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAgendaError("");
    setAgendaSuccessMsg("");

    try {
      const response = await fetch("/api/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingEventId || undefined,
          ...eventForm,
        }),
      });

      const res = await response.json();
      if (!response.ok) throw new Error(res.error || "Failed to save agenda event");

      if (res.schedule) {
        setSchedule(res.schedule);
      }
      setAgendaSuccessMsg(editingEventId ? "Agenda session updated live!" : "New agenda session created live!");
      setIsEventModalOpen(false);
    } catch (err) {
      setAgendaError(err instanceof Error ? err.message : "Failed to save event");
    }
  };

  // Delete Event
  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Remove this session from the official agenda?")) return;
    setAgendaError("");
    try {
      const response = await fetch("/api/program", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const res = await response.json();
      if (!response.ok) throw new Error(res.error || "Could not delete event");

      if (res.schedule) {
        setSchedule(res.schedule);
      }
      setAgendaSuccessMsg("Agenda session removed.");
    } catch (err) {
      setAgendaError(err instanceof Error ? err.message : "Failed to delete event");
    }
  };

  // Reset Program Schedule
  const handleResetAgenda = async () => {
    if (!window.confirm("Reset all agenda sessions to the default template schedule?")) return;
    setAgendaError("");
    try {
      const response = await fetch("/api/program", { method: "PUT" });
      const res = await response.json();
      if (!response.ok) throw new Error(res.error || "Could not reset agenda");

      if (res.schedule) {
        setSchedule(res.schedule);
      }
      setAgendaSuccessMsg("Agenda schedule has been reset to default template.");
    } catch (err) {
      setAgendaError(err instanceof Error ? err.message : "Failed to reset agenda");
    }
  };

  const currentDayAgenda = schedule[selectedDayNumber - 1] || { day: `DAY 0${selectedDayNumber}`, events: [] };
  const dietaryCount = delegates.filter((d) => d.dietary_restrictions).length;
  const sizedCount = delegates.filter((d) => d.tshirt_size).length;

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
            <div className="flex items-center gap-3">
              <Badge variant="gold">Control Room</Badge>
              <span className="text-xs font-mono text-ivory-dark">LMS 2K26 Executive Dashboard</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-extrabold mt-2">
              Management Portal
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-obsidian-surface border border-amber-500/20">
            <button
              onClick={() => setActiveTab("delegates")}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "delegates"
                  ? "bg-gold text-obsidian shadow-md shadow-gold/20"
                  : "text-ivory-muted hover:text-ivory"
              }`}
            >
              Delegates Roster ({delegates.length})
            </button>

            <button
              onClick={() => setActiveTab("agenda")}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "agenda"
                  ? "bg-gold text-obsidian shadow-md shadow-gold/20"
                  : "text-ivory-muted hover:text-ivory"
              }`}
            >
              Agenda Manager
            </button>
          </div>
        </header>

        {/* TAB 1: DELEGATES ROSTER */}
        {activeTab === "delegates" && (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-ivory">Registered Delegates</h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void loadDelegates()}
                  leftIcon={<RefreshCw size={14} className={isLoadingDelegates ? "animate-spin" : ""} />}
                >
                  Refresh
                </Button>
                <Button variant="primary" size="sm" onClick={exportCSV} leftIcon={<Download size={14} />}>
                  Export CSV
                </Button>
              </div>
            </div>

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
                  <p className="text-xs font-bold uppercase tracking-wider text-ivory-muted">Dietary Notes</p>
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
                  <h3 className="font-serif text-xl text-ivory font-bold">Delegate Roster</h3>
                  <p className="text-xs text-ivory-dark">{filteredDelegates.length} visible registration records</p>
                </div>

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

              {delegateError && (
                <div className="m-6 rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs font-semibold text-red-200">
                  {delegateError}
                </div>
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
                    {isLoadingDelegates ? (
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
        )}

        {/* TAB 2: AGENDA MANAGER */}
        {activeTab === "agenda" && (
          <div className="space-y-8">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ivory">Conference Agenda Manager</h2>
                <p className="text-xs text-ivory-muted">Manage live sessions, times, speakers, and activities for "THE JOURNEY".</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetAgenda}
                  leftIcon={<RotateCcw size={14} />}
                >
                  Reset to Default
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenAddEvent(selectedDayNumber)}
                  leftIcon={<Plus size={14} />}
                >
                  Add Session
                </Button>
              </div>
            </div>

            {/* Notifications */}
            {agendaSuccessMsg && (
              <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs font-semibold text-amber-200 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gold" />
                <span>{agendaSuccessMsg}</span>
              </div>
            )}
            {agendaError && (
              <div className="rounded-2xl border border-red-500/40 bg-red-950/40 p-4 text-xs font-semibold text-red-200">
                {agendaError}
              </div>
            )}

            {/* Day Selector Pills */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              {[1, 2, 3].map((dayNum) => {
                const isSelected = selectedDayNumber === dayNum;
                const count = schedule[dayNum - 1]?.events.length || 0;
                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDayNumber(dayNum)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gold text-obsidian shadow-lg shadow-gold/20"
                        : "bg-obsidian-surface border border-amber-500/20 text-ivory-muted hover:text-ivory"
                    }`}
                  >
                    <span>DAY 0{dayNum}</span>
                    <span className="ml-2 opacity-80">({count} sessions)</span>
                  </button>
                );
              })}
            </div>

            {/* Session Items List */}
            <section className="space-y-4">
              {isLoadingAgenda ? (
                <p className="text-center text-ivory-muted py-12">Loading agenda schedule...</p>
              ) : currentDayAgenda.events.length === 0 ? (
                <div className="glass-card rounded-3xl p-12 text-center space-y-4">
                  <Calendar className="w-12 h-12 text-amber-500/40 mx-auto" />
                  <p className="text-ivory-muted font-light">No sessions scheduled for DAY 0{selectedDayNumber}.</p>
                  <Button variant="primary" size="sm" onClick={() => handleOpenAddEvent(selectedDayNumber)}>
                    Add First Session
                  </Button>
                </div>
              ) : (
                currentDayAgenda.events.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6 flex-grow">
                      <div className="flex-shrink-0 w-24">
                        <span className="font-serif text-2xl font-extrabold text-gradient-gold block">
                          {item.time}
                        </span>
                        {item.duration && (
                          <span className="text-[0.7rem] text-ivory-dark inline-flex items-center gap-1">
                            <Clock size={10} className="text-amber-400" />
                            {item.duration}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif text-xl font-bold text-ivory">{item.activity}</h4>
                        <p className="text-xs text-ivory-muted font-light">{item.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold pt-1">
                          <span className="inline-flex items-center gap-1 text-amber-400">
                            <MapPin size={12} />
                            {item.location}
                          </span>
                          {item.speaker && (
                            <span className="inline-flex items-center gap-1 text-rose-300">
                              <User size={12} />
                              {item.speaker}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenEditEvent(item, selectedDayNumber)}
                        leftIcon={<Edit2 size={12} />}
                      >
                        Edit
                      </Button>
                      <button
                        onClick={() => handleDeleteEvent(item.id)}
                        className="p-2.5 rounded-xl border border-red-500/30 bg-red-950/30 text-red-300 hover:bg-red-900 transition-colors cursor-pointer"
                        aria-label="Delete session"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>
        )}

        {/* Add/Edit Event Modal */}
        <Modal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          title={editingEventId ? "Edit Agenda Session" : "Create Agenda Session"}
          maxWidth="lg"
        >
          <form onSubmit={handleSaveEvent} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1">
                  Day Number
                </label>
                <select
                  value={eventForm.day_number}
                  onChange={(e) => setEventForm({ ...eventForm, day_number: Number(e.target.value) })}
                  className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface px-4 py-2.5 text-xs text-ivory outline-none focus:border-gold"
                >
                  <option value={1}>DAY 01 (March 15)</option>
                  <option value={2}>DAY 02 (March 16)</option>
                  <option value={3}>DAY 03 (March 17)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1">
                  Start Time *
                </label>
                <input
                  required
                  value={eventForm.time}
                  onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                  placeholder="09:00"
                  className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface px-4 py-2.5 text-xs text-ivory outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1">
                Activity Title *
              </label>
              <input
                required
                value={eventForm.activity}
                onChange={(e) => setEventForm({ ...eventForm, activity: e.target.value })}
                placeholder="e.g. Transformational Leadership Workshop"
                className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface px-4 py-2.5 text-xs text-ivory outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1">
                Session Description
              </label>
              <textarea
                rows={3}
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Details about what delegates will experience..."
                className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface px-4 py-2.5 text-xs text-ivory outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1">
                  Location / Room *
                </label>
                <input
                  required
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Grand Ballroom"
                  className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface px-4 py-2.5 text-xs text-ivory outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1">
                  Duration
                </label>
                <input
                  value={eventForm.duration}
                  onChange={(e) => setEventForm({ ...eventForm, duration: e.target.value })}
                  placeholder="e.g. 1.5 hours"
                  className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface px-4 py-2.5 text-xs text-ivory outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ivory-muted mb-1">
                Speaker / Facilitator
              </label>
              <input
                value={eventForm.speaker}
                onChange={(e) => setEventForm({ ...eventForm, speaker: e.target.value })}
                placeholder="Dr. Sarah M. Johnson"
                className="w-full rounded-xl border border-amber-500/20 bg-obsidian-surface px-4 py-2.5 text-xs text-ivory outline-none focus:border-gold"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="ghost" size="sm" type="button" onClick={() => setIsEventModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {editingEventId ? "Save Changes" : "Create Session"}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </main>
  );
}
