"use client";
import { useState, useEffect } from "react";
import { Search, CheckCircle2, Youtube, Instagram, Twitter, ChevronDown, Check, Sparkles, Users, Filter, X, AlertTriangle } from "lucide-react";
import Link from "next/link";

import { io } from "socket.io-client";

const PLATFORM_ICONS = {
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
    tiktok: Users,
};

export default function SearchInfluencers() {
    const [influencers, setInfluencers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isCampaignSelectorOpen, setIsCampaignSelectorOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Filters
    const [filters, setFilters] = useState({
        category: "All Categories",
        platform: "All Platforms",
    });

    const [invitingId, setInvitingId] = useState(null);
    const [toast, setToast] = useState(null);

    // Socket for presence
    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");

        socket.on('user_status_change', (data) => {
            setOnlineUsers(prev => {
                const next = new Set(prev);
                if (data.status === 'online') next.add(data.userId);
                else next.delete(data.userId);
                return next;
            });
        });

        // Request initial online users (optional, or just wait for events)
        // For simplicity, we'll just track changes and check each one on render if needed
        // But a batch check would be better. Let's just track changes for now.

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        setMounted(true);
        fetchCampaigns();
        fetchInfluencers({});
    }, []);

    const fetchCampaigns = async () => {
        try {
            const res = await fetch("/api/brand/campaigns");
            const data = await res.json();
            if (data.campaigns) setCampaigns(data.campaigns);
        } catch (error) {
            console.error("Failed to fetch campaigns", error);
        }
    };

    const fetchInfluencers = async (activeFilters) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (activeFilters.category && activeFilters.category !== "All Categories") {
                params.append("category", activeFilters.category);
            }
            if (activeFilters.query) {
                params.append("query", activeFilters.query);
            }

            const res = await fetch(`/api/brand/influencers?${params.toString()}`);
            const data = await res.json();
            if (data.influencers) {
                setInfluencers(data.influencers.map((inf) => {
                    // Try to pick the first platform from the JSON array
                    const platforms = Array.isArray(inf.platforms)
                        ? inf.platforms
                        : (typeof inf.platforms === 'string' ? JSON.parse(inf.platforms) : []);

                    const firstPlatform = platforms[0]?.platform?.toLowerCase() || "instagram";
                    const PlatformIcon = PLATFORM_ICONS[firstPlatform] || Instagram;
                    return {
                        id: inf.id,
                        userId: inf.userId,
                        name: inf.user?.fullname || inf.username,
                        username: inf.username,
                        category: inf.category,
                        location: inf.location,
                        platform: firstPlatform,
                        PlatformIcon,
                        image: inf.user?.profilePic || null,
                        nameInitial: (inf.user?.fullname || inf.username || "U").charAt(0),
                        isAvailable: inf.isAvailable,
                        rating: inf.averageRating,
                    };
                }));
            }
        } catch (error) {
            console.error("Failed to fetch influencers", error);
            setInfluencers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCampaignChange = (campaign) => {
        setSelectedCampaign(campaign);
        setIsCampaignSelectorOpen(false);

        // Auto-filter based on campaign requirements
        const newFilters = { ...filters };
        if (campaign.targetCategory?.length > 0) {
            newFilters.category = campaign.targetCategory[0];
        }
        setFilters(newFilters);
        fetchInfluencers({ ...newFilters, query: searchQuery });
    };

    const handleSearch = () => {
        fetchInfluencers({ ...filters, query: searchQuery });
    };

    const handleClearCampaign = () => {
        setSelectedCampaign(null);
        const cleared = { category: "All Categories", platform: "All Platforms" };
        setFilters(cleared);
        setSearchQuery("");
        fetchInfluencers({});
    };

    const handleInvite = async (influencerId) => {
        if (!selectedCampaign) return;
        setInvitingId(influencerId);
        try {
            const res = await fetch("/api/brand/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    campaignId: selectedCampaign.id,
                    influencerId,
                    note: `Hi! We'd love to collaborate with you on our "${selectedCampaign.title}" campaign.`
                })
            });
            const data = await res.json();
            if (res.ok) {
                setToast({ type: "success", message: "Invitation sent successfully!" });
            } else {
                setToast({ type: "error", message: data.error || "Failed to send invitation" });
            }
        } catch (error) {
            setToast({ type: "error", message: "An unexpected error occurred" });
        } finally {
            setInvitingId(null);
            setTimeout(() => setToast(null), 3000);
        }
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12 pb-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Find Influencers</h1>
                    <p className="text-gray-500 mt-1">
                        {selectedCampaign
                            ? `Searching for influencers matching "${selectedCampaign.title}"`
                            : "Search and connect with top influencers to boost your campaigns."}
                    </p>
                </div>

                {/* Campaign Selector */}
                <div className="relative">
                    <button
                        onClick={() => setIsCampaignSelectorOpen(!isCampaignSelectorOpen)}
                        className={`w-full lg:w-72 flex items-center justify-between gap-4 px-5 py-3.5 border rounded-2xl shadow-sm text-left transition-all ${selectedCampaign
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-gray-200 hover:border-blue-300"
                            }`}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <Sparkles className={`w-4 h-4 flex-shrink-0 ${selectedCampaign ? "text-blue-100" : "text-blue-500"}`} />
                            <div className="min-w-0">
                                <p className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-0.5 ${selectedCampaign ? "text-blue-100" : "text-gray-400"}`}>
                                    Campaign
                                </p>
                                <p className={`font-bold truncate text-sm ${selectedCampaign ? "text-white" : "text-gray-800"}`}>
                                    {selectedCampaign?.title || "Select a campaign"}
                                </p>
                            </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isCampaignSelectorOpen ? "rotate-180" : ""} ${selectedCampaign ? "text-blue-100" : "text-gray-400"}`} />
                    </button>

                    {isCampaignSelectorOpen && (
                        <div className="absolute top-full right-0 mt-2 w-full lg:w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-2 max-h-64 overflow-y-auto">
                                {selectedCampaign && (
                                    <button
                                        onClick={handleClearCampaign}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl text-left mb-1 text-red-500 hover:bg-red-50 text-sm font-medium transition-colors"
                                    >
                                        Clear selection
                                    </button>
                                )}
                                {campaigns.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => handleCampaignChange(c)}
                                        className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-xl transition-all text-left mb-1 last:mb-0 ${selectedCampaign?.id === c.id
                                            ? "bg-blue-50 text-blue-700 font-bold"
                                            : "text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm truncate">{c.title}</p>
                                            {c.targetCategory?.length > 0 && (
                                                <p className="text-xs text-gray-400 capitalize mt-0.5">{c.targetCategory.join(", ")}</p>
                                            )}
                                        </div>
                                        {selectedCampaign?.id === c.id && <Check className="w-4 h-4 flex-shrink-0" />}
                                    </button>
                                ))}
                                {campaigns.length === 0 && (
                                    <p className="p-4 text-sm text-gray-500 italic text-center">No campaigns found</p>
                                )}
                            </div>
                            <div className="p-3 bg-gray-50 border-t border-gray-100">
                                <Link
                                    href="/brand/create-campaign"
                                    className="block w-full text-center py-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    + Create New Campaign
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Active Campaign Banner */}
            {selectedCampaign && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex flex-wrap items-center gap-4 animate-in fade-in duration-300">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-blue-900">Filters auto-applied for: <span className="text-blue-600">{selectedCampaign.title}</span></p>
                        {selectedCampaign.targetCategory?.length > 0 && (
                            <p className="text-xs text-blue-500 mt-0.5 capitalize">Categories: {selectedCampaign.targetCategory.join(", ")} · Platforms: {selectedCampaign.targetPlatform?.join(", ") || "All"}</p>
                        )}
                    </div>
                    <Link href={`/brand/ai-match/${selectedCampaign.id}`}>
                        <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
                            View AI Matches →
                        </button>
                    </Link>
                </div>
            )}

            {/* Toast Feedback */}
            {toast && (
                <div className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300 ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    }`}>
                    {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    <p className="font-bold text-sm">{toast.message}</p>
                    <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Search + Filter Bar */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-end gap-4">
                {/* Search input */}
                <div className="relative flex-1 w-full">
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Search</label>
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 px-3 py-2.5 gap-2">
                        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by name or username..."
                            className="w-full bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Category</label>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 px-3 py-2.5 text-sm text-gray-800"
                    >
                        <option>All Categories</option>
                        <option>Fashion</option>
                        <option>Technology</option>
                        <option>Health</option>
                        <option>Fitness</option>
                        <option>Lifestyle</option>
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Beauty</option>
                        <option>Gaming</option>
                    </select>
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Platform</label>
                    <select
                        name="platform"
                        value={filters.platform}
                        onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 px-3 py-2.5 text-sm text-gray-800"
                    >
                        <option>All Platforms</option>
                        <option>Instagram</option>
                        <option>YouTube</option>
                        <option>TikTok</option>
                        <option>Twitter / X</option>
                    </select>
                </div>

                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors w-full md:w-auto h-[44px]"
                >
                    <Filter className="w-4 h-4" />
                    Apply
                </button>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-700">
                    {isLoading ? "Searching..." : `${influencers.length} Influencer${influencers.length !== 1 ? "s" : ""} Found`}
                </h2>
                {selectedCampaign && (
                    <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                        Filtered by: {selectedCampaign.title}
                    </span>
                )}
            </div>

            {/* Loading Skeleton */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse">
                            <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4" />
                            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2" />
                            <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mb-6" />
                            <div className="h-9 bg-gray-100 rounded-xl w-full" />
                        </div>
                    ))}
                </div>
            )}

            {/* Results Grid */}
            {!isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {influencers.map((inf, idx) => {
                        const PlatformIcon = inf.PlatformIcon || Instagram;
                        return (
                            <div
                                key={inf.id}
                                className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                {/* Avatar */}
                                <div className="relative w-20 h-20 mb-4">
                                    {inf.image ? (
                                        <img
                                            src={inf.image}
                                            alt={inf.name}
                                            className="w-full h-full rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-black uppercase border-2 border-white shadow-md">{inf.nameInitial}</div>
                                    )}
                                    {onlineUsers.has(inf.userId) ? (
                                        <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-sm" title="Active Now" />
                                    ) : inf.isAvailable && (
                                        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" title="Available" />
                                    )}
                                </div>

                                {/* Name + Verified */}
                                <div className="flex flex-col items-center gap-1 mb-1">
                                    <div className="flex items-center gap-1.5 ">
                                        <h3 className="font-bold text-gray-900 text-base">{inf.name}</h3>
                                        <div className="flex items-center gap-1 bg-green-50 text-green-600 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Verified
                                        </div>
                                    </div>
                                    {onlineUsers.has(inf.userId) && (
                                        <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1 animate-pulse">
                                            <span className="w-1 h-1 bg-green-600 rounded-full"></span>
                                            Active Now
                                        </p>
                                    )}
                                </div>

                                {/* Username */}
                                {inf.username && (
                                    <p className="text-xs text-gray-400 mb-3">@{inf.username}</p>
                                )}

                                {/* Meta info */}
                                <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <PlatformIcon className="w-3.5 h-3.5 text-gray-400" />
                                        <span className="capitalize">{inf.platform}</span>
                                    </div>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span className="capitalize text-gray-500">{inf.category || "General"}</span>
                                </div>

                                {/* Campaign link or View Profile */}
                                <div className="w-full flex flex-col gap-2 mt-auto">
                                    <Link href={`/brand/influencer/${inf.id}`} className="w-full">
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-all text-sm group-hover:shadow-md">
                                            View Profile
                                        </button>
                                    </Link>
                                    {selectedCampaign && (
                                        <button
                                            onClick={() => handleInvite(inf.id)}
                                            disabled={invitingId === inf.id}
                                            className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                                        >
                                            {invitingId === inf.id ? (
                                                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                                            ) : null}
                                            Invite to "{selectedCampaign.title.substring(0, 20)}{selectedCampaign.title.length > 20 ? "…" : ""}"
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {influencers.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            <Users className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                            <p className="text-lg font-bold text-gray-700">No influencers found</p>
                            <p className="text-sm mt-1">Try adjusting your filters or selecting a different campaign.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
