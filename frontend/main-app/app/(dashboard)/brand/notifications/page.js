"use client";
import { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle2, Info, AlertTriangle, Search, Trash2, BellOff, Bell as BellOn, X, ChevronRight, Settings, Check, ExternalLink, Clock, Tag, Megaphone } from "lucide-react";
import Link from "next/link";

const TYPE_META = {
    CAMPAIGN_CREATED: { color: "text-green-600", bg: "bg-green-50", icon: Megaphone, label: "Campaign" },
    CAMPAIGN_UPDATED: { color: "text-blue-600", bg: "bg-blue-50", icon: Info, label: "Campaign" },
    CAMPAIGN_DELETED: { color: "text-gray-500", bg: "bg-gray-100", icon: Info, label: "Campaign" },
    REQUEST_RECEIVED: { color: "text-purple-600", bg: "bg-purple-50", icon: CheckCircle2, label: "Request" },
    REQUEST_RESPONDED: { color: "text-indigo-600", bg: "bg-indigo-50", icon: CheckCircle2, label: "Request" },
    PROFILE_UPDATED: { color: "text-amber-600", bg: "bg-amber-50", icon: Check, label: "Account" },
    DELIVERABLE_DUE: { color: "text-red-500", bg: "bg-red-50", icon: AlertTriangle, label: "Deadline" },
    SYSTEM_INFO: { color: "text-gray-500", bg: "bg-gray-100", icon: Info, label: "System" },
};

function timeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Notification Settings stored in localStorage
const SETTINGS_KEY = 'brandly-notif-settings';
const DEFAULT_SETTINGS = {
    muted: false,
    campaigns: true,
    requests: true,
    system: true,
};

function loadSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
    } catch { return DEFAULT_SETTINGS; }
}
function saveSettings(s) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedNotif, setSelectedNotif] = useState(null); // For View Details panel
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);

    useEffect(() => {
        setMounted(true);
        setSettings(loadSettings());
        fetchNotifications();
    }, []);

    const fetchNotifications = async (f = "all", q = "") => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({ filter: f, limit: "100" });
            if (q) params.append("search", q);
            const res = await fetch(`/api/notifications?${params}`);
            const data = await res.json();
            if (data.notifications) setNotifications(data.notifications);
        } catch { /* silently fail */ }
        finally { setIsLoading(false); }
    };

    const handleFilterChange = (f) => {
        setFilter(f);
        fetchNotifications(f, search);
    };

    const handleSearch = (q) => {
        setSearch(q);
        fetchNotifications(filter, q);
    };

    const markAllRead = async () => {
        await fetch("/api/notifications/read-all", { method: "PATCH" });
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        if (selectedNotif) setSelectedNotif(prev => ({ ...prev, isRead: true }));
    };

    const markOneRead = async (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        if (selectedNotif?.id === id) setSelectedNotif(prev => ({ ...prev, isRead: true }));
        await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    };

    const deleteOne = async (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        if (selectedNotif?.id === id) setSelectedNotif(null);
        await fetch(`/api/notifications/${id}`, { method: "DELETE" });
    };

    const updateSettings = (patch) => {
        const next = { ...settings, ...patch };
        setSettings(next);
        saveSettings(next);
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    // Apply settings-based type filters
    const displayable = notifications.filter(n => {
        const type = n.type || "";
        if (!settings.campaigns && type.startsWith("CAMPAIGN")) return false;
        if (!settings.requests && type.startsWith("REQUEST")) return false;
        if (!settings.system && (type === "SYSTEM_INFO" || type === "PROFILE_UPDATED")) return false;
        return true;
    });

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-300">
            <div className="flex gap-6 mt-2">
                {/* ─── Main Column ─── */}
                <div className={`flex-1 min-w-0 space-y-6 transition-all ${selectedNotif ? "lg:pr-2" : ""}`}>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Notifications</h1>
                            <p className="text-gray-500 mt-1">
                                {settings.muted ? (
                                    <span className="inline-flex items-center gap-1.5 text-amber-600 font-semibold"><BellOff className="w-4 h-4" /> Notifications are muted</span>
                                ) : (
                                    <>Stay updated with your campaign activities. <span className="font-semibold text-blue-600">{unreadCount} unread</span></>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className={`p-2.5 rounded-xl border transition-colors ${showSettings ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                                title="Notification Settings"
                            >
                                <Settings className="w-4 h-4" />
                            </button>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllRead}
                                    className="flex items-center gap-2 px-4 py-2.5 border border-blue-200 rounded-xl text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                                >
                                    <CheckCircle2 className="w-4 h-4" /> Mark All Read
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Settings Panel */}
                    {showSettings && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm animate-in slide-in-from-top-2 duration-200 space-y-4">
                            <h2 className="font-bold text-gray-900 flex items-center gap-2"><Settings className="w-4 h-4 text-blue-500" /> Notification Settings</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { key: "muted", label: "Mute all notifications", desc: "Hide the red badge on the bell" },
                                    { key: "campaigns", label: "Campaign updates", desc: "Created, edited, archived" },
                                    { key: "requests", label: "Collaboration requests", desc: "New requests & responses" },
                                    { key: "system", label: "System & account", desc: "Profile changes, security" },
                                ].map(({ key, label, desc }) => (
                                    <label key={key} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{label}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                                        </div>
                                        <button
                                            onClick={() => updateSettings({ [key]: !settings[key] })}
                                            className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 relative ${settings[key] ? "bg-blue-600" : "bg-gray-200"}`}
                                        >
                                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[key] ? "translate-x-5" : "translate-x-0"}`} />
                                        </button>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search + Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search notifications…"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                            {search && (
                                <button onClick={() => handleSearch("")} className="absolute right-3 inset-y-0 my-auto text-gray-400 hover:text-gray-600">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                            {[
                                { value: "all", label: "All" },
                                { value: "unread", label: `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}` },
                                { value: "read", label: "Read" },
                            ].map(({ value, label }) => (
                                <button
                                    key={value}
                                    onClick={() => handleFilterChange(value)}
                                    className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${filter === value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
                        {isLoading ? (
                            <div className="p-4 space-y-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="flex gap-4 p-4 animate-pulse">
                                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0" />
                                        <div className="flex-1 space-y-2 py-1">
                                            <div className="h-3.5 bg-gray-200 rounded w-1/2" />
                                            <div className="h-3 bg-gray-100 rounded w-full" />
                                            <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : displayable.length > 0 ? (
                            displayable.map((notif, idx) => {
                                const meta = TYPE_META[notif.type] || TYPE_META.SYSTEM_INFO;
                                const Icon = meta.icon;
                                const isSelected = selectedNotif?.id === notif.id;
                                return (
                                    <div
                                        key={notif.id}
                                        className={`flex items-start gap-4 p-5 group transition-all cursor-pointer ${isSelected ? "bg-blue-50/40 border-l-4 border-l-blue-500" : !notif.isRead ? "bg-blue-50/20 hover:bg-gray-50" : "hover:bg-gray-50/50"}`}
                                        onClick={() => {
                                            setSelectedNotif(notif);
                                            if (!notif.isRead) markOneRead(notif.id);
                                        }}
                                        style={{ animationDelay: `${idx * 30}ms` }}
                                    >
                                        <div className={`w-12 h-12 rounded-xl ${meta.bg} ${meta.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <h3 className="text-sm font-bold text-gray-900 truncate">{notif.title}</h3>
                                                    {!notif.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 animate-pulse" />}
                                                </div>
                                                <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />{timeAgo(notif.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">{notif.description}</p>
                                            <div className="flex items-center gap-4 mt-3">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                                                    {meta.label}
                                                </span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedNotif(notif); }}
                                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    View Details <ChevronRight className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteOne(notif.id); }}
                                                    className="text-xs text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 ml-auto"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-24 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                    <Bell className="w-9 h-9 text-gray-200" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">All clear!</h3>
                                <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
                                    {search ? `No results for "${search}"` : `No ${filter !== "all" ? filter : ""} notifications yet.`}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ─── Details Panel ─── */}
                {selectedNotif && (() => {
                    const meta = TYPE_META[selectedNotif.type] || TYPE_META.SYSTEM_INFO;
                    const Icon = meta.icon;
                    return (
                        <div className="hidden lg:flex flex-col w-80 xl:w-96 flex-shrink-0 animate-in slide-in-from-right-4 duration-300">
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden sticky top-24">
                                {/* Panel Header */}
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                                    <h2 className="font-bold text-gray-900 text-sm">Notification Details</h2>
                                    <button onClick={() => setSelectedNotif(null)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Panel Content */}
                                <div className="p-5 space-y-5">
                                    {/* Icon + Type */}
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl ${meta.bg} ${meta.color} flex items-center justify-center shadow-sm`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                                                {meta.label}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />{timeAgo(selectedNotif.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Title</p>
                                        <h3 className="text-base font-bold text-gray-900">{selectedNotif.title}</h3>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Details</p>
                                        <p className="text-sm text-gray-700 leading-relaxed">{selectedNotif.description}</p>
                                    </div>

                                    {/* Read Status */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Status</p>
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${selectedNotif.isRead ? "bg-gray-100 text-gray-600" : "bg-blue-100 text-blue-700"}`}>
                                            {selectedNotif.isRead ? "Read" : "Unread"}
                                        </span>
                                    </div>

                                    {/* Full timestamp */}
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Received at</p>
                                        <p className="text-xs text-gray-600">{new Date(selectedNotif.createdAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
                                    </div>

                                    {/* Related link */}
                                    {selectedNotif.relatedId && (
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Related</p>
                                            {selectedNotif.type?.startsWith("CAMPAIGN") && (
                                                <Link href={`/brand/collaborations`}>
                                                    <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
                                                        <Megaphone className="w-4 h-4" />
                                                        View Campaigns
                                                        <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                                                    </button>
                                                </Link>
                                            )}
                                            {selectedNotif.type?.startsWith("REQUEST") && (
                                                <Link href="/brand/my-requests">
                                                    <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-700 rounded-xl text-sm font-bold hover:bg-purple-100 transition-colors">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        View Requests
                                                        <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Panel Footer */}
                                <div className="border-t border-gray-100 p-4 flex gap-2">
                                    {!selectedNotif.isRead && (
                                        <button
                                            onClick={() => markOneRead(selectedNotif.id)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
                                        >
                                            <Check className="w-3.5 h-3.5" /> Mark as Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteOne(selectedNotif.id)}
                                        className="flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
