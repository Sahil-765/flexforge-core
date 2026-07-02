import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Lock,
  LogOut,
  Users,
  Clock,
  CheckCircle,
  Archive,
  Trash2,
  ExternalLink,
  MessageSquare,
  Calendar,
  Search,
  ShieldAlert,
  Loader2,
  RefreshCw,
  ChevronRight,
  X,
  Mail,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal | Muscle Flex Fitness Club" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  message: string | null;
  preferred_plan: string | null;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  page_url: string;
  referrer: string | null;
  status: string;
  created_at: string;
};

type AdminUser = {
  email: string;
  created_at: string;
};

function AdminPage() {
  useReveal();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"leads" | "admins">("leads");

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Admin management state
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminConfirmPassword, setNewAdminConfirmPassword] = useState("");
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

  // 1. Check if session is already active
  const checkSession = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setIsAuthenticated(true);
        // Also fetch admins list asynchronously
        fetchAdminsList();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const fetchAdminsList = async () => {
    setIsLoadingAdmins(true);
    try {
      const res = await fetch("/api/admin/list-admins");
      if (res.ok) {
        const data = await res.json();
        setAdmins(data.admins || []);
      }
    } catch (err) {
      console.error("Failed to load admins list", err);
    } finally {
      setIsLoadingAdmins(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // Fetch admins list when switching tabs
  useEffect(() => {
    if (isAuthenticated && activeTab === "admins") {
      fetchAdminsList();
    }
  }, [activeTab, isAuthenticated]);

  // 2. Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success("Successfully logged in.");
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        checkSession();
      } else {
        toast.error(data.error || "Invalid email or password. Please try again.");
      }
    } catch {
      toast.error("Failed to connect to the server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 3. Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setLeads([]);
      setAdmins([]);
      toast.success("Logged out successfully.");
    } catch {
      toast.error("Failed to sign out cleanly.");
    }
  };

  // 4. Update status handler
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdatingId(id);
    try {
      const res = await fetch("/api/admin/leads/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead)),
        );
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        toast.success(`Status updated to ${newStatus}.`);
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Failed to update status.");
      }
    } catch {
      toast.error("Failed to communicate with server.");
    } finally {
      setIsUpdatingId(null);
    }
  };

  // 5. Delete lead handler
  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) {
      return;
    }

    setIsDeletingId(id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        if (selectedLead?.id === id) {
          setSelectedLead(null);
        }
        toast.success("Lead successfully deleted.");
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Failed to delete lead.");
      }
    } catch {
      toast.error("Network error. Unable to delete lead.");
    } finally {
      setIsDeletingId(null);
    }
  };

  // 6. Create admin user handler
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
      toast.error("Please enter email and password.");
      return;
    }

    if (newAdminPassword !== newAdminConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (newAdminPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsCreatingAdmin(true);
    try {
      const res = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newAdminEmail, password: newAdminPassword }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(`Admin account created for ${newAdminEmail}.`);
        setNewAdminEmail("");
        setNewAdminPassword("");
        setNewAdminConfirmPassword("");
        setIsAddAdminOpen(false);
        fetchAdminsList();
      } else {
        toast.error(data.error || "Failed to create admin.");
      }
    } catch {
      toast.error("Communication error creating admin account.");
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const contacted = leads.filter((l) => l.status === "contacted").length;
    const archived = leads.filter((l) => l.status === "archived").length;
    return { total, newCount, contacted, archived };
  }, [leads]);

  // Filtering & Search logic for leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.preferred_plan || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  // Loading Session State
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-silver" />
        <p className="font-display text-sm tracking-[0.2em] uppercase text-muted-foreground">
          Checking Credentials...
        </p>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[oklch(0.08_0_0)] flex items-center justify-center px-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[oklch(0.92_0.012_85/0.03)] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[oklch(0.78_0.004_80/0.03)] rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="font-display text-4xl tracking-[0.18em] uppercase text-foreground">
              MUSCLE FLEX
            </div>
            <div className="font-display text-xs tracking-[0.4em] text-silver mt-1">
              ADMINISTRATIVE PORTAL
            </div>
          </div>

          <div className="glass rounded-xl p-8 sm:p-10 border border-border shadow-2xl">
            <div className="flex items-center gap-3 text-silver mb-6">
              <Lock className="h-5 w-5" />
              <h2 className="font-display text-xl tracking-wider uppercase">Sign In</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin_email"
                  className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-2"
                >
                  Admin Email
                </label>
                <input
                  id="admin_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@muscleflex.club"
                  required
                  autoFocus
                  className="w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="admin_password"
                  className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-2"
                >
                  Password
                </label>
                <input
                  id="admin_password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn-primary w-full py-4 text-sm font-semibold tracking-[0.2em] mt-2"
              >
                {isLoggingIn ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                  </span>
                ) : (
                  "Access Dashboard"
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-6 text-xs text-muted-foreground">
            Protected area. Authorized personnel only.
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD MAIN PANEL
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card/65 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="leading-tight">
              <div className="font-display text-xl tracking-[0.18em] text-foreground">
                MUSCLE FLEX
              </div>
              <div className="font-display text-[10px] tracking-[0.4em] text-silver">
                LEADS CONTROL CENTER
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (activeTab === "leads") checkSession();
                else fetchAdminsList();
              }}
              disabled={isLoadingLeads || isLoadingAdmins}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md border border-border hover:bg-secondary/40 transition-colors"
              title="Refresh lists"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoadingLeads || isLoadingAdmins ? "animate-spin text-silver" : ""}`}
              />
            </button>
            <button
              onClick={handleLogout}
              className="btn-outline py-2! px-4! text-xs! inline-flex items-center gap-2 border border-border hover:border-red-400/40 hover:text-red-400 font-display tracking-widest"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Navigation Tabs */}
        <div className="border-b border-border/60 mb-8 flex gap-6">
          <button
            onClick={() => setActiveTab("leads")}
            className={`font-display text-sm tracking-[0.2em] uppercase pb-3 transition-colors relative ${
              activeTab === "leads"
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Leads Management
            {activeTab === "leads" && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-silver" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("admins")}
            className={`font-display text-sm tracking-[0.2em] uppercase pb-3 transition-colors relative ${
              activeTab === "admins"
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Administrators
            {activeTab === "admins" && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-silver" />
            )}
          </button>
        </div>

        {/* TAB 1: LEADS VIEW */}
        {activeTab === "leads" && (
          <>
            {/* Analytics Summary Widget */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Submissions",
                  value: stats.total,
                  icon: Users,
                  color: "text-blue-400",
                },
                { label: "New Leads", value: stats.newCount, icon: Clock, color: "text-amber-400" },
                {
                  label: "In Progress / Contacted",
                  value: stats.contacted,
                  icon: RefreshCw,
                  color: "text-indigo-400",
                },
                {
                  label: "Archived / Success",
                  value: stats.archived,
                  icon: Archive,
                  color: "text-emerald-400",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="glass rounded-xl p-5 border border-border flex items-center justify-between"
                >
                  <div>
                    <div className="font-display text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {card.label}
                    </div>
                    <div className="font-display text-3xl sm:text-4xl mt-1.5 text-foreground">
                      {card.value}
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-background/80 border border-border flex items-center justify-center">
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </div>
              ))}
            </section>

            {/* Filters and List Toolbar */}
            <section className="glass rounded-xl p-4 border border-border mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Live Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads by name, email, phone, or plan..."
                  className="w-full bg-background/50 border border-border rounded-md pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-silver transition-colors placeholder:text-muted-foreground/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-display tracking-widest"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Tab Filter */}
              <div className="flex flex-wrap items-center gap-1.5 bg-background/60 p-1 border border-border rounded-lg self-start md:self-auto font-display">
                {[
                  { id: "all", label: "All Leads" },
                  { id: "new", label: "New" },
                  { id: "contacted", label: "Contacted" },
                  { id: "archived", label: "Archived" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-md text-[10px] tracking-wider uppercase font-medium transition-all ${
                      statusFilter === tab.id
                        ? "bg-foreground text-background font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Leads Table Card */}
            <section className="glass rounded-xl border border-border overflow-hidden shadow-lg">
              {isLoadingLeads && leads.length === 0 ? (
                <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-silver" />
                  <p className="text-sm text-muted-foreground font-display tracking-widest uppercase">
                    Loading Enquiries...
                  </p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="py-24 text-center flex flex-col items-center justify-center gap-2">
                  <ShieldAlert className="h-10 w-10 text-muted-foreground/60 mb-2" />
                  <h3 className="font-display text-lg tracking-wider uppercase text-silver">
                    No Leads Found
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    {searchQuery || statusFilter !== "all"
                      ? "Try resetting your search query or choosing a different status filter."
                      : "No customer enquiries have been submitted yet."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/15">
                        <th className="px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground">
                          Received
                        </th>
                        <th className="px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground">
                          Contact info
                        </th>
                        <th className="px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground">
                          Plan Preferred
                        </th>
                        <th className="px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground">
                          Status
                        </th>
                        <th className="px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredLeads.map((lead) => {
                        const submissionDate = new Date(lead.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        );

                        return (
                          <tr
                            key={lead.id}
                            onClick={() => setSelectedLead(lead)}
                            className="hover:bg-secondary/15 transition-colors cursor-pointer group"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2 text-foreground font-medium">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{submissionDate}</span>
                              </div>
                              <span className="text-[10px] text-muted-foreground/60 tracking-wider uppercase block mt-1">
                                Source: {lead.source || "Website Form"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-semibold text-foreground">{lead.full_name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {lead.email}
                              </div>
                              <div className="text-xs text-muted-foreground/80 mt-0.5">
                                {lead.phone}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-display font-semibold uppercase tracking-wider ${
                                  lead.preferred_plan === "annual"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : lead.preferred_plan === "quarterly"
                                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                      : lead.preferred_plan === "monthly"
                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        : "bg-muted text-muted-foreground border border-border"
                                }`}
                              >
                                {lead.preferred_plan || "Unsure"}
                              </span>
                            </td>
                            <td
                              className="px-6 py-4 whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <select
                                value={lead.status}
                                disabled={isUpdatingId === lead.id}
                                onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                                className={`text-[10px] font-display rounded-md border px-2.5 py-1.5 font-medium uppercase tracking-wider focus:outline-none ${
                                  lead.status === "new"
                                    ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                    : lead.status === "contacted"
                                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                }`}
                              >
                                <option value="new" className="bg-card text-foreground">
                                  New
                                </option>
                                <option value="contacted" className="bg-card text-foreground">
                                  Contacted
                                </option>
                                <option value="archived" className="bg-card text-foreground">
                                  Archived
                                </option>
                              </select>
                            </td>
                            <td
                              className="px-6 py-4 whitespace-nowrap text-right"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/40 rounded-md border border-border transition-all"
                                  title="Inspect lead details"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  disabled={isDeletingId === lead.id}
                                  className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-md border border-border hover:border-red-500/20 transition-all"
                                  title="Delete lead permanently"
                                >
                                  {isDeletingId === lead.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-red-400" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {/* TAB 2: ADMINISTRATORS VIEW */}
        {activeTab === "admins" && (
          <section className="glass rounded-xl border border-border overflow-hidden shadow-lg animate-in fade-in duration-300">
            <div className="px-6 py-5 border-b border-border bg-secondary/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg tracking-wider uppercase text-foreground">
                  System Administrators
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  These accounts have security credentials to access the leads console.
                </p>
              </div>
              <button
                onClick={() => setIsAddAdminOpen(true)}
                className="btn-primary py-2! px-5! text-xs! font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto font-display tracking-widest"
              >
                Add New Admin
              </button>
            </div>

            {isLoadingAdmins && admins.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-silver" />
                <p className="text-sm text-muted-foreground font-display tracking-widest uppercase">
                  Loading Administrators...
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/10">
                      <th className="px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground">
                        Admin Email
                      </th>
                      <th className="px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground">
                        Account Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {admins.map((adminUser) => (
                      <tr key={adminUser.email} className="hover:bg-secondary/15 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-silver" />
                          <span>{adminUser.email}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                          {new Date(adminUser.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>

      {/* LEAD INSPECTION DETAIL MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/85 backdrop-blur-sm">
          <div className="glass w-full max-w-2xl rounded-xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="border-b border-border/80 px-6 py-5 flex items-center justify-between bg-secondary/15">
              <div>
                <h3 className="font-display text-lg tracking-wider uppercase text-foreground">
                  Enquiry Details
                </h3>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest mt-0.5">
                  ID: {selectedLead.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-muted-foreground hover:text-foreground border border-border/60 hover:bg-secondary/40 rounded-md transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Row 1: Key Info */}
              <div className="grid sm:grid-cols-2 gap-6 border-b border-border pb-6">
                <div>
                  <div className="text-xs text-muted-foreground tracking-wider uppercase font-medium">
                    Name
                  </div>
                  <div className="text-base font-semibold text-foreground mt-1">
                    {selectedLead.full_name}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground tracking-wider uppercase font-medium">
                    Preferred Plan
                  </div>
                  <div className="mt-1">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-display font-semibold uppercase tracking-wider ${
                        selectedLead.preferred_plan === "annual"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : selectedLead.preferred_plan === "quarterly"
                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                            : selectedLead.preferred_plan === "monthly"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {selectedLead.preferred_plan || "Unsure"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground tracking-wider uppercase font-medium">
                    Email
                  </div>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-sm text-foreground hover:text-silver hover:underline flex items-center gap-1.5 mt-1"
                  >
                    {selectedLead.email} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground tracking-wider uppercase font-medium">
                    Phone Number
                  </div>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="text-sm text-foreground hover:text-silver hover:underline flex items-center gap-1.5 mt-1"
                  >
                    {selectedLead.phone} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Message */}
              <div className="border-b border-border pb-6">
                <div className="text-xs text-muted-foreground tracking-wider uppercase font-medium flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" /> Message from User
                </div>
                <div className="mt-2 text-sm text-foreground bg-background/50 border border-border p-4 rounded-md leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message || "No message was left."}
                </div>
              </div>

              {/* Attribution and Campaigns */}
              <div className="space-y-4">
                <h4 className="font-display text-xs tracking-[0.2em] uppercase text-silver border-b border-border/40 pb-2">
                  Acquisition & Analytics
                </h4>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground font-medium uppercase tracking-wide">
                      Lead Source:
                    </span>{" "}
                    <span className="text-foreground">{selectedLead.source || "Website Form"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-medium uppercase tracking-wide">
                      Page Referrer:
                    </span>{" "}
                    <span
                      className="text-foreground truncate block max-w-full"
                      title={selectedLead.referrer || "Direct"}
                    >
                      {selectedLead.referrer || "Direct / None"}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground font-medium uppercase tracking-wide block mb-1">
                      Enquiry Page URL:
                    </span>
                    <a
                      href={selectedLead.page_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-silver hover:underline break-all inline-flex items-center gap-1"
                    >
                      {selectedLead.page_url} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* UTM campaign parameters */}
                <div className="grid grid-cols-3 gap-3 bg-secondary/10 p-3 rounded-lg border border-border/60 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                      UTM Source
                    </span>
                    <span className="text-foreground font-semibold mt-0.5 block">
                      {selectedLead.utm_source || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                      UTM Medium
                    </span>
                    <span className="text-foreground font-semibold mt-0.5 block">
                      {selectedLead.utm_medium || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                      UTM Campaign
                    </span>
                    <span className="text-foreground font-semibold mt-0.5 block">
                      {selectedLead.utm_campaign || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border/80 px-6 py-4 flex items-center justify-between bg-secondary/15">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">Update Status:</span>
                <select
                  value={selectedLead.status}
                  disabled={isUpdatingId === selectedLead.id}
                  onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value)}
                  className={`text-[10px] font-display rounded-md border px-2.5 py-1.5 font-medium uppercase tracking-wider focus:outline-none ${
                    selectedLead.status === "new"
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      : selectedLead.status === "contacted"
                        ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  }`}
                >
                  <option value="new" className="bg-card text-foreground">
                    New
                  </option>
                  <option value="contacted" className="bg-card text-foreground">
                    Contacted
                  </option>
                  <option value="archived" className="bg-card text-foreground">
                    Archived
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  disabled={isDeletingId === selectedLead.id}
                  className="btn-outline py-2! px-4! text-xs! border border-border hover:border-red-400/40 hover:text-red-400 inline-flex items-center gap-1.5 font-display tracking-widest"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete Lead
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="btn-primary py-2! px-4! text-xs! font-semibold font-display tracking-widest"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW ADMIN MODAL */}
      {isAddAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/85 backdrop-blur-sm">
          <div className="glass w-full max-w-md rounded-xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-border/80 px-6 py-5 flex items-center justify-between bg-secondary/15">
              <h3 className="font-display text-lg tracking-wider uppercase text-foreground">
                Add New Administrator
              </h3>
              <button
                onClick={() => setIsAddAdminOpen(false)}
                className="p-1.5 text-muted-foreground hover:text-foreground border border-border/60 hover:bg-secondary/40 rounded-md transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="p-6 space-y-4">
              <div>
                <label className="font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="name@muscleflex.club"
                  required
                  className="w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
                />
              </div>

              <div>
                <label className="font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-2">
                  Password (min 6 chars)
                </label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
                />
              </div>

              <div>
                <label className="font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={newAdminConfirmPassword}
                  onChange={(e) => setNewAdminConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setIsAddAdminOpen(false)}
                  className="btn-outline py-2! px-4! text-xs! font-display tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingAdmin}
                  className="btn-primary py-2! px-4! text-xs! font-semibold font-display tracking-widest"
                >
                  {isCreatingAdmin ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="h-3 w-3 animate-spin" /> Adding...
                    </span>
                  ) : (
                    "Add Admin Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
