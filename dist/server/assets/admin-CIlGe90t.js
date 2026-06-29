import { t as useReveal } from "./use-reveal-BE9TtH02.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Archive, Calendar, ChevronRight, Clock, ExternalLink, Loader2, Lock, LogOut, MessageSquare, RefreshCw, Search, ShieldAlert, Trash2, UserCheck, Users, X } from "lucide-react";
//#region src/routes/admin.tsx?tsr-split=component
function AdminPage() {
	useReveal();
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [activeTab, setActiveTab] = useState("leads");
	const [leads, setLeads] = useState([]);
	const [isLoadingLeads, setIsLoadingLeads] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [selectedLead, setSelectedLead] = useState(null);
	const [isUpdatingId, setIsUpdatingId] = useState(null);
	const [isDeletingId, setIsDeletingId] = useState(null);
	const [admins, setAdmins] = useState([]);
	const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
	const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
	const [newAdminEmail, setNewAdminEmail] = useState("");
	const [newAdminPassword, setNewAdminPassword] = useState("");
	const [newAdminConfirmPassword, setNewAdminConfirmPassword] = useState("");
	const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
	const checkSession = async () => {
		setIsLoadingLeads(true);
		try {
			const res = await fetch("/api/admin/leads");
			if (res.ok) {
				setLeads((await res.json()).leads || []);
				setIsAuthenticated(true);
				fetchAdminsList();
			} else setIsAuthenticated(false);
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
			if (res.ok) setAdmins((await res.json()).admins || []);
		} catch (err) {
			console.error("Failed to load admins list", err);
		} finally {
			setIsLoadingAdmins(false);
		}
	};
	useEffect(() => {
		checkSession();
	}, []);
	useEffect(() => {
		if (isAuthenticated && activeTab === "admins") fetchAdminsList();
	}, [activeTab, isAuthenticated]);
	const handleLogin = async (e) => {
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
				body: JSON.stringify({
					email,
					password
				})
			});
			const data = await res.json().catch(() => ({}));
			if (res.ok) {
				toast.success("Successfully logged in.");
				setEmail("");
				setPassword("");
				setIsAuthenticated(true);
				checkSession();
			} else toast.error(data.error || "Invalid email or password. Please try again.");
		} catch {
			toast.error("Failed to connect to the server.");
		} finally {
			setIsLoggingIn(false);
		}
	};
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
	const handleUpdateStatus = async (id, newStatus) => {
		setIsUpdatingId(id);
		try {
			const res = await fetch("/api/admin/leads/status", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id,
					status: newStatus
				})
			});
			if (res.ok) {
				setLeads((prev) => prev.map((lead) => lead.id === id ? {
					...lead,
					status: newStatus
				} : lead));
				if (selectedLead?.id === id) setSelectedLead((prev) => prev ? {
					...prev,
					status: newStatus
				} : null);
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
	const handleDeleteLead = async (id) => {
		if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
		setIsDeletingId(id);
		try {
			const res = await fetch("/api/admin/leads", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id })
			});
			if (res.ok) {
				setLeads((prev) => prev.filter((lead) => lead.id !== id));
				if (selectedLead?.id === id) setSelectedLead(null);
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
	const handleCreateAdmin = async (e) => {
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
				body: JSON.stringify({
					email: newAdminEmail,
					password: newAdminPassword
				})
			});
			const data = await res.json().catch(() => ({}));
			if (res.ok) {
				toast.success(`Admin account created for ${newAdminEmail}.`);
				setNewAdminEmail("");
				setNewAdminPassword("");
				setNewAdminConfirmPassword("");
				setIsAddAdminOpen(false);
				fetchAdminsList();
			} else toast.error(data.error || "Failed to create admin.");
		} catch {
			toast.error("Communication error creating admin account.");
		} finally {
			setIsCreatingAdmin(false);
		}
	};
	const stats = useMemo(() => {
		return {
			total: leads.length,
			newCount: leads.filter((l) => l.status === "new").length,
			contacted: leads.filter((l) => l.status === "contacted").length,
			archived: leads.filter((l) => l.status === "archived").length
		};
	}, [leads]);
	const filteredLeads = useMemo(() => {
		return leads.filter((lead) => {
			const matchesSearch = lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || lead.email.toLowerCase().includes(searchQuery.toLowerCase()) || lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) || (lead.preferred_plan || "").toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [
		leads,
		searchQuery,
		statusFilter
	]);
	if (isAuthenticated === null) return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center text-foreground gap-4",
		children: [/* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-silver" }), /* @__PURE__ */ jsx("p", {
			className: "font-display text-sm tracking-[0.2em] uppercase text-muted-foreground",
			children: "Checking Credentials..."
		})]
	});
	if (!isAuthenticated) return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-[oklch(0.08_0_0)] flex items-center justify-center px-4 relative overflow-hidden font-sans",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-[oklch(0.92_0.012_85/0.03)] rounded-full blur-3xl" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-[oklch(0.78_0.004_80/0.03)] rounded-full blur-3xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-md relative z-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "text-center mb-8",
						children: [/* @__PURE__ */ jsx("div", {
							className: "font-display text-4xl tracking-[0.18em] uppercase text-foreground",
							children: "MUSCLE FLEX"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-display text-xs tracking-[0.4em] text-silver mt-1",
							children: "ADMINISTRATIVE PORTAL"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "glass rounded-xl p-8 sm:p-10 border border-border shadow-2xl",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 text-silver mb-6",
							children: [/* @__PURE__ */ jsx(Lock, { className: "h-5 w-5" }), /* @__PURE__ */ jsx("h2", {
								className: "font-display text-xl tracking-wider uppercase",
								children: "Sign In"
							})]
						}), /* @__PURE__ */ jsxs("form", {
							onSubmit: handleLogin,
							className: "space-y-5",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "admin_email",
									className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-2",
									children: "Admin Email"
								}), /* @__PURE__ */ jsx("input", {
									id: "admin_email",
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "name@muscleflex.club",
									required: true,
									autoFocus: true,
									className: "w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "admin_password",
									className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-2",
									children: "Password"
								}), /* @__PURE__ */ jsx("input", {
									id: "admin_password",
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "••••••••••••",
									required: true,
									className: "w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
								})] }),
								/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: isLoggingIn,
									className: "btn-primary w-full py-4 text-sm font-semibold tracking-[0.2em] mt-2",
									children: isLoggingIn ? /* @__PURE__ */ jsxs("span", {
										className: "flex items-center justify-center gap-2",
										children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), " Verifying..."]
									}) : "Access Dashboard"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-center mt-6 text-xs text-muted-foreground",
						children: "Protected area. Authorized personnel only."
					})
				]
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col font-sans",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "border-b border-border bg-card/65 backdrop-blur-md sticky top-0 z-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-3",
						children: /* @__PURE__ */ jsxs("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ jsx("div", {
								className: "font-display text-xl tracking-[0.18em] text-foreground",
								children: "MUSCLE FLEX"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-display text-[10px] tracking-[0.4em] text-silver",
								children: "LEADS CONTROL CENTER"
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => {
								if (activeTab === "leads") checkSession();
								else fetchAdminsList();
							},
							disabled: isLoadingLeads || isLoadingAdmins,
							className: "p-2 text-muted-foreground hover:text-foreground rounded-md border border-border hover:bg-secondary/40 transition-colors",
							title: "Refresh lists",
							children: /* @__PURE__ */ jsx(RefreshCw, { className: `h-4 w-4 ${isLoadingLeads || isLoadingAdmins ? "animate-spin text-silver" : ""}` })
						}), /* @__PURE__ */ jsxs("button", {
							onClick: handleLogout,
							className: "btn-outline py-2! px-4! text-xs! inline-flex items-center gap-2 border border-border hover:border-red-400/40 hover:text-red-400 font-display tracking-widest",
							children: [/* @__PURE__ */ jsx(LogOut, { className: "h-3.5 w-3.5" }), " Logout"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "border-b border-border/60 mb-8 flex gap-6",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setActiveTab("leads"),
							className: `font-display text-sm tracking-[0.2em] uppercase pb-3 transition-colors relative ${activeTab === "leads" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`,
							children: ["Leads Management", activeTab === "leads" && /* @__PURE__ */ jsx("span", { className: "absolute left-0 bottom-0 w-full h-0.5 bg-silver" })]
						}), /* @__PURE__ */ jsxs("button", {
							onClick: () => setActiveTab("admins"),
							className: `font-display text-sm tracking-[0.2em] uppercase pb-3 transition-colors relative ${activeTab === "admins" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`,
							children: ["Administrators", activeTab === "admins" && /* @__PURE__ */ jsx("span", { className: "absolute left-0 bottom-0 w-full h-0.5 bg-silver" })]
						})]
					}),
					activeTab === "leads" && /* @__PURE__ */ jsxs(Fragment, { children: [
						/* @__PURE__ */ jsx("section", {
							className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
							children: [
								{
									label: "Total Submissions",
									value: stats.total,
									icon: Users,
									color: "text-blue-400"
								},
								{
									label: "New Leads",
									value: stats.newCount,
									icon: Clock,
									color: "text-amber-400"
								},
								{
									label: "In Progress / Contacted",
									value: stats.contacted,
									icon: RefreshCw,
									color: "text-indigo-400"
								},
								{
									label: "Archived / Success",
									value: stats.archived,
									icon: Archive,
									color: "text-emerald-400"
								}
							].map((card, idx) => /* @__PURE__ */ jsxs("div", {
								className: "glass rounded-xl p-5 border border-border flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "font-display text-[10px] tracking-[0.2em] uppercase text-muted-foreground",
									children: card.label
								}), /* @__PURE__ */ jsx("div", {
									className: "font-display text-3xl sm:text-4xl mt-1.5 text-foreground",
									children: card.value
								})] }), /* @__PURE__ */ jsx("div", {
									className: "h-10 w-10 rounded-lg bg-background/80 border border-border flex items-center justify-center",
									children: /* @__PURE__ */ jsx(card.icon, { className: `h-5 w-5 ${card.color}` })
								})]
							}, idx))
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "glass rounded-xl p-4 border border-border mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative flex-1 max-w-md",
								children: [
									/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" }),
									/* @__PURE__ */ jsx("input", {
										type: "text",
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										placeholder: "Search leads by name, email, phone, or plan...",
										className: "w-full bg-background/50 border border-border rounded-md pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-silver transition-colors placeholder:text-muted-foreground/40"
									}),
									searchQuery && /* @__PURE__ */ jsx("button", {
										onClick: () => setSearchQuery(""),
										className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-display tracking-widest",
										children: "Clear"
									})
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap items-center gap-1.5 bg-background/60 p-1 border border-border rounded-lg self-start md:self-auto font-display",
								children: [
									{
										id: "all",
										label: "All Leads"
									},
									{
										id: "new",
										label: "New"
									},
									{
										id: "contacted",
										label: "Contacted"
									},
									{
										id: "archived",
										label: "Archived"
									}
								].map((tab) => /* @__PURE__ */ jsx("button", {
									onClick: () => setStatusFilter(tab.id),
									className: `px-3 py-1.5 rounded-md text-[10px] tracking-wider uppercase font-medium transition-all ${statusFilter === tab.id ? "bg-foreground text-background font-semibold" : "text-muted-foreground hover:text-foreground"}`,
									children: tab.label
								}, tab.id))
							})]
						}),
						/* @__PURE__ */ jsx("section", {
							className: "glass rounded-xl border border-border overflow-hidden shadow-lg",
							children: isLoadingLeads && leads.length === 0 ? /* @__PURE__ */ jsxs("div", {
								className: "py-24 text-center flex flex-col items-center justify-center gap-3",
								children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-silver" }), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground font-display tracking-widest uppercase",
									children: "Loading Enquiries..."
								})]
							}) : filteredLeads.length === 0 ? /* @__PURE__ */ jsxs("div", {
								className: "py-24 text-center flex flex-col items-center justify-center gap-2",
								children: [
									/* @__PURE__ */ jsx(ShieldAlert, { className: "h-10 w-10 text-muted-foreground/60 mb-2" }),
									/* @__PURE__ */ jsx("h3", {
										className: "font-display text-lg tracking-wider uppercase text-silver",
										children: "No Leads Found"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground max-w-xs",
										children: searchQuery || statusFilter !== "all" ? "Try resetting your search query or choosing a different status filter." : "No customer enquiries have been submitted yet."
									})
								]
							}) : /* @__PURE__ */ jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full text-left border-collapse text-sm",
									children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
										className: "border-b border-border bg-secondary/15",
										children: [
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground",
												children: "Received"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground",
												children: "Contact info"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground",
												children: "Plan Preferred"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground",
												children: "Status"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground text-right",
												children: "Actions"
											})
										]
									}) }), /* @__PURE__ */ jsx("tbody", {
										className: "divide-y divide-border/60",
										children: filteredLeads.map((lead) => {
											const submissionDate = new Date(lead.created_at).toLocaleDateString("en-IN", {
												day: "numeric",
												month: "short",
												hour: "2-digit",
												minute: "2-digit"
											});
											return /* @__PURE__ */ jsxs("tr", {
												onClick: () => setSelectedLead(lead),
												className: "hover:bg-secondary/15 transition-colors cursor-pointer group",
												children: [
													/* @__PURE__ */ jsxs("td", {
														className: "px-6 py-4 whitespace-nowrap",
														children: [/* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-2 text-foreground font-medium",
															children: [/* @__PURE__ */ jsx(Calendar, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ jsx("span", { children: submissionDate })]
														}), /* @__PURE__ */ jsxs("span", {
															className: "text-[10px] text-muted-foreground/60 tracking-wider uppercase block mt-1",
															children: ["Source: ", lead.source || "Website Form"]
														})]
													}),
													/* @__PURE__ */ jsxs("td", {
														className: "px-6 py-4",
														children: [
															/* @__PURE__ */ jsx("div", {
																className: "font-semibold text-foreground",
																children: lead.full_name
															}),
															/* @__PURE__ */ jsx("div", {
																className: "text-xs text-muted-foreground mt-0.5",
																children: lead.email
															}),
															/* @__PURE__ */ jsx("div", {
																className: "text-xs text-muted-foreground/80 mt-0.5",
																children: lead.phone
															})
														]
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-6 py-4 whitespace-nowrap",
														children: /* @__PURE__ */ jsx("span", {
															className: `px-2.5 py-1 rounded-full text-[10px] font-display font-semibold uppercase tracking-wider ${lead.preferred_plan === "annual" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : lead.preferred_plan === "quarterly" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : lead.preferred_plan === "monthly" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-muted text-muted-foreground border border-border"}`,
															children: lead.preferred_plan || "Unsure"
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-6 py-4 whitespace-nowrap",
														onClick: (e) => e.stopPropagation(),
														children: /* @__PURE__ */ jsxs("select", {
															value: lead.status,
															disabled: isUpdatingId === lead.id,
															onChange: (e) => handleUpdateStatus(lead.id, e.target.value),
															className: `text-[10px] font-display rounded-md border px-2.5 py-1.5 font-medium uppercase tracking-wider focus:outline-none ${lead.status === "new" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : lead.status === "contacted" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"}`,
															children: [
																/* @__PURE__ */ jsx("option", {
																	value: "new",
																	className: "bg-card text-foreground",
																	children: "New"
																}),
																/* @__PURE__ */ jsx("option", {
																	value: "contacted",
																	className: "bg-card text-foreground",
																	children: "Contacted"
																}),
																/* @__PURE__ */ jsx("option", {
																	value: "archived",
																	className: "bg-card text-foreground",
																	children: "Archived"
																})
															]
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-6 py-4 whitespace-nowrap text-right",
														onClick: (e) => e.stopPropagation(),
														children: /* @__PURE__ */ jsxs("div", {
															className: "flex items-center justify-end gap-2",
															children: [/* @__PURE__ */ jsx("button", {
																onClick: () => setSelectedLead(lead),
																className: "p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/40 rounded-md border border-border transition-all",
																title: "Inspect lead details",
																children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
															}), /* @__PURE__ */ jsx("button", {
																onClick: () => handleDeleteLead(lead.id),
																disabled: isDeletingId === lead.id,
																className: "p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-md border border-border hover:border-red-500/20 transition-all",
																title: "Delete lead permanently",
																children: isDeletingId === lead.id ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-red-400" }) : /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
															})]
														})
													})
												]
											}, lead.id);
										})
									})]
								})
							})
						})
					] }),
					activeTab === "admins" && /* @__PURE__ */ jsxs("section", {
						className: "glass rounded-xl border border-border overflow-hidden shadow-lg animate-in fade-in duration-300",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "px-6 py-5 border-b border-border bg-secondary/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-lg tracking-wider uppercase text-foreground",
								children: "System Administrators"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "These accounts have security credentials to access the leads console."
							})] }), /* @__PURE__ */ jsx("button", {
								onClick: () => setIsAddAdminOpen(true),
								className: "btn-primary py-2! px-5! text-xs! font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto font-display tracking-widest",
								children: "Add New Admin"
							})]
						}), isLoadingAdmins && admins.length === 0 ? /* @__PURE__ */ jsxs("div", {
							className: "py-20 text-center flex flex-col items-center justify-center gap-3",
							children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-silver" }), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground font-display tracking-widest uppercase",
								children: "Loading Administrators..."
							})]
						}) : /* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "w-full text-left border-collapse text-sm",
								children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
									className: "border-b border-border bg-secondary/10",
									children: [/* @__PURE__ */ jsx("th", {
										className: "px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground",
										children: "Admin Email"
									}), /* @__PURE__ */ jsx("th", {
										className: "px-6 py-4 font-display text-xs tracking-[0.25em] uppercase text-muted-foreground",
										children: "Account Created"
									})]
								}) }), /* @__PURE__ */ jsx("tbody", {
									className: "divide-y divide-border/60",
									children: admins.map((adminUser) => /* @__PURE__ */ jsxs("tr", {
										className: "hover:bg-secondary/15 transition-colors",
										children: [/* @__PURE__ */ jsxs("td", {
											className: "px-6 py-4 whitespace-nowrap font-medium text-foreground flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(UserCheck, { className: "h-4 w-4 text-silver" }), /* @__PURE__ */ jsx("span", { children: adminUser.email })]
										}), /* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 whitespace-nowrap text-muted-foreground",
											children: new Date(adminUser.created_at).toLocaleDateString("en-IN", {
												day: "numeric",
												month: "long",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit"
											})
										})]
									}, adminUser.email))
								})]
							})
						})]
					})
				]
			}),
			selectedLead && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/85 backdrop-blur-sm",
				children: /* @__PURE__ */ jsxs("div", {
					className: "glass w-full max-w-2xl rounded-xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "border-b border-border/80 px-6 py-5 flex items-center justify-between bg-secondary/15",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-lg tracking-wider uppercase text-foreground",
								children: "Enquiry Details"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-[10px] text-muted-foreground/60 uppercase tracking-widest mt-0.5",
								children: ["ID: ", selectedLead.id]
							})] }), /* @__PURE__ */ jsx("button", {
								onClick: () => setSelectedLead(null),
								className: "p-1.5 text-muted-foreground hover:text-foreground border border-border/60 hover:bg-secondary/40 rounded-md transition-colors",
								children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "p-6 space-y-6 max-h-[80vh] overflow-y-auto",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid sm:grid-cols-2 gap-6 border-b border-border pb-6",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground tracking-wider uppercase font-medium",
											children: "Name"
										}), /* @__PURE__ */ jsx("div", {
											className: "text-base font-semibold text-foreground mt-1",
											children: selectedLead.full_name
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground tracking-wider uppercase font-medium",
											children: "Preferred Plan"
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-1",
											children: /* @__PURE__ */ jsx("span", {
												className: `px-2.5 py-1 rounded-full text-[10px] font-display font-semibold uppercase tracking-wider ${selectedLead.preferred_plan === "annual" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : selectedLead.preferred_plan === "quarterly" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : selectedLead.preferred_plan === "monthly" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-muted text-muted-foreground border border-border"}`,
												children: selectedLead.preferred_plan || "Unsure"
											})
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground tracking-wider uppercase font-medium",
											children: "Email"
										}), /* @__PURE__ */ jsxs("a", {
											href: `mailto:${selectedLead.email}`,
											className: "text-sm text-foreground hover:text-silver hover:underline flex items-center gap-1.5 mt-1",
											children: [
												selectedLead.email,
												" ",
												/* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
											]
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground tracking-wider uppercase font-medium",
											children: "Phone Number"
										}), /* @__PURE__ */ jsxs("a", {
											href: `tel:${selectedLead.phone}`,
											className: "text-sm text-foreground hover:text-silver hover:underline flex items-center gap-1.5 mt-1",
											children: [
												selectedLead.phone,
												" ",
												/* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
											]
										})] })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "border-b border-border pb-6",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "text-xs text-muted-foreground tracking-wider uppercase font-medium flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(MessageSquare, { className: "h-3.5 w-3.5" }), " Message from User"]
									}), /* @__PURE__ */ jsx("div", {
										className: "mt-2 text-sm text-foreground bg-background/50 border border-border p-4 rounded-md leading-relaxed whitespace-pre-wrap",
										children: selectedLead.message || "No message was left."
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsx("h4", {
											className: "font-display text-xs tracking-[0.2em] uppercase text-silver border-b border-border/40 pb-2",
											children: "Acquisition & Analytics"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid sm:grid-cols-2 gap-4 text-xs",
											children: [
												/* @__PURE__ */ jsxs("div", { children: [
													/* @__PURE__ */ jsx("span", {
														className: "text-muted-foreground font-medium uppercase tracking-wide",
														children: "Lead Source:"
													}),
													" ",
													/* @__PURE__ */ jsx("span", {
														className: "text-foreground",
														children: selectedLead.source || "Website Form"
													})
												] }),
												/* @__PURE__ */ jsxs("div", { children: [
													/* @__PURE__ */ jsx("span", {
														className: "text-muted-foreground font-medium uppercase tracking-wide",
														children: "Page Referrer:"
													}),
													" ",
													/* @__PURE__ */ jsx("span", {
														className: "text-foreground truncate block max-w-full",
														title: selectedLead.referrer || "Direct",
														children: selectedLead.referrer || "Direct / None"
													})
												] }),
												/* @__PURE__ */ jsxs("div", {
													className: "sm:col-span-2",
													children: [/* @__PURE__ */ jsx("span", {
														className: "text-muted-foreground font-medium uppercase tracking-wide block mb-1",
														children: "Enquiry Page URL:"
													}), /* @__PURE__ */ jsxs("a", {
														href: selectedLead.page_url,
														target: "_blank",
														rel: "noopener noreferrer",
														className: "text-silver hover:underline break-all inline-flex items-center gap-1",
														children: [
															selectedLead.page_url,
															" ",
															/* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
														]
													})]
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-3 gap-3 bg-secondary/10 p-3 rounded-lg border border-border/60 text-xs",
											children: [
												/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
													className: "text-muted-foreground block text-[10px] uppercase tracking-wider",
													children: "UTM Source"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-foreground font-semibold mt-0.5 block",
													children: selectedLead.utm_source || "—"
												})] }),
												/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
													className: "text-muted-foreground block text-[10px] uppercase tracking-wider",
													children: "UTM Medium"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-foreground font-semibold mt-0.5 block",
													children: selectedLead.utm_medium || "—"
												})] }),
												/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
													className: "text-muted-foreground block text-[10px] uppercase tracking-wider",
													children: "UTM Campaign"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-foreground font-semibold mt-0.5 block",
													children: selectedLead.utm_campaign || "—"
												})] })
											]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "border-t border-border/80 px-6 py-4 flex items-center justify-between bg-secondary/15",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground font-medium",
									children: "Update Status:"
								}), /* @__PURE__ */ jsxs("select", {
									value: selectedLead.status,
									disabled: isUpdatingId === selectedLead.id,
									onChange: (e) => handleUpdateStatus(selectedLead.id, e.target.value),
									className: `text-[10px] font-display rounded-md border px-2.5 py-1.5 font-medium uppercase tracking-wider focus:outline-none ${selectedLead.status === "new" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : selectedLead.status === "contacted" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"}`,
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "new",
											className: "bg-card text-foreground",
											children: "New"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "contacted",
											className: "bg-card text-foreground",
											children: "Contacted"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "archived",
											className: "bg-card text-foreground",
											children: "Archived"
										})
									]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsxs("button", {
									onClick: () => handleDeleteLead(selectedLead.id),
									disabled: isDeletingId === selectedLead.id,
									className: "btn-outline py-2! px-4! text-xs! border border-border hover:border-red-400/40 hover:text-red-400 inline-flex items-center gap-1.5 font-display tracking-widest",
									children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }), " Delete Lead"]
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => setSelectedLead(null),
									className: "btn-primary py-2! px-4! text-xs! font-semibold font-display tracking-widest",
									children: "Close"
								})]
							})]
						})
					]
				})
			}),
			isAddAdminOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/85 backdrop-blur-sm",
				children: /* @__PURE__ */ jsxs("div", {
					className: "glass w-full max-w-md rounded-xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "border-b border-border/80 px-6 py-5 flex items-center justify-between bg-secondary/15",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-display text-lg tracking-wider uppercase text-foreground",
							children: "Add New Administrator"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setIsAddAdminOpen(false),
							className: "p-1.5 text-muted-foreground hover:text-foreground border border-border/60 hover:bg-secondary/40 rounded-md transition-colors",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleCreateAdmin,
						className: "p-6 space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-2",
								children: "Admin Email"
							}), /* @__PURE__ */ jsx("input", {
								type: "email",
								value: newAdminEmail,
								onChange: (e) => setNewAdminEmail(e.target.value),
								placeholder: "name@muscleflex.club",
								required: true,
								className: "w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-2",
								children: "Password (min 6 chars)"
							}), /* @__PURE__ */ jsx("input", {
								type: "password",
								value: newAdminPassword,
								onChange: (e) => setNewAdminPassword(e.target.value),
								placeholder: "••••••••",
								required: true,
								className: "w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-2",
								children: "Confirm Password"
							}), /* @__PURE__ */ jsx("input", {
								type: "password",
								value: newAdminConfirmPassword,
								onChange: (e) => setNewAdminConfirmPassword(e.target.value),
								placeholder: "••••••••",
								required: true,
								className: "w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-silver transition-colors"
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "pt-4 flex items-center justify-end gap-3 border-t border-border/60",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setIsAddAdminOpen(false),
									className: "btn-outline py-2! px-4! text-xs! font-display tracking-widest",
									children: "Cancel"
								}), /* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: isCreatingAdmin,
									className: "btn-primary py-2! px-4! text-xs! font-semibold font-display tracking-widest",
									children: isCreatingAdmin ? /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(Loader2, { className: "h-3 w-3 animate-spin" }), " Adding..."]
									}) : "Add Admin Account"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { AdminPage as component };
