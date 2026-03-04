"use client";
import { useState, useEffect } from "react";
import {
    Check,
    X,
    Clock,
    DollarSign,
    Calendar,
    ExternalLink,
    Filter,
    Search,
    Archive,
    History,
    MoreVertical,
    CheckCircle2,
    Trash2
} from "lucide-react";
import Link from "next/link";

export default function CollaborationRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            // Mock data with archive support
            setTimeout(() => {
                setRequests([
                    {
                        id: "r1",
                        brandName: "BeautyBox",
                        brandLogo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
                        campaignTitle: "Spring Makeup Line",
                        description: "Promote our new spring makeup collection with tutorial videos",
                        budget: "$500-$700",
                        receivedDate: "2/22/2024",
                        status: "new"
                    },
                    {
                        id: "r2",
                        brandName: "FitLife",
                        brandLogo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop",
                        campaignTitle: "Fitness App Promotion",
                        description: "Create content showcasing our fitness tracking app features",
                        budget: "$1,000-$1,500",
                        receivedDate: "2/21/2024",
                        status: "new"
                    },
                    {
                        id: "r3",
                        brandName: "EcoWear",
                        brandLogo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&h=200&fit=crop",
                        campaignTitle: "Sustainable Fashion",
                        description: "Showcase our eco-friendly clothing line",
                        budget: "$600-$900",
                        receivedDate: "2/20/2024",
                        status: "accepted"
                    },
                    {
                        id: "r4",
                        brandName: "GourmetBox",
                        brandLogo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
                        campaignTitle: "Foodie Review",
                        description: "Review our premium subscription boxes",
                        budget: "$300-$500",
                        receivedDate: "1/15/2024",
                        status: "archived"
                    }
                ]);
                setIsLoading(false);
            }, 800);
        } catch (error) {
            console.error("Failed to fetch requests", error);
            setIsLoading(false);
        }
    };

    const handleAction = (id, action) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: action } : req
        ));
    };

    const filteredRequests = requests.filter(req => {
        if (filter === "all") return req.status !== "archived";
        return req.status === filter;
    });

    const counts = {
        all: requests.filter(r => r.status !== "archived").length,
        new: requests.filter(r => r.status === "new").length,
        accepted: requests.filter(r => r.status === "accepted").length,
        rejected: requests.filter(r => r.status === "rejected").length,
        archived: requests.filter(r => r.status === "archived").length,
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pt-2">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">Incoming Requests</h1>
                    <p className="text-gray-500 mt-2 font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                        <History className="w-4 h-4 text-blue-600" /> Review and manage collaboration offers
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-gray-100">
                {[
                    { id: "all", label: "Inbox" },
                    { id: "new", label: "New", count: counts.new },
                    { id: "accepted", label: "Accepted", count: counts.accepted },
                    { id: "rejected", label: "Rejected", count: counts.rejected },
                    { id: "archived", label: "Archive", count: counts.archived, icon: Archive },
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${filter === tab.id
                                ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                                : "bg-white border border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {Icon && <Icon className="w-3.5 h-3.5" />}
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className={`px-2 py-0.5 rounded-lg border ${filter === tab.id ? "bg-white/10 border-white/20 text-white" : "bg-gray-50 border-gray-100 text-gray-400"
                                    }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Requests List */}
            <div className="space-y-6">
                {isLoading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="bg-white border border-gray-100 rounded-[40px] p-8 h-48 animate-pulse" />
                    ))
                ) : filteredRequests.length > 0 ? (
                    filteredRequests.map((req, idx) => (
                        <div
                            key={req.id}
                            className="bg-white border border-gray-100 rounded-[40px] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-2xl hover:shadow-blue-100/30 hover:border-blue-100 transition-all group animate-in slide-in-from-right-8 duration-500"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Brand Logo */}
                            <div className="w-24 h-24 rounded-[32px] overflow-hidden shadow-xl flex-shrink-0 border-4 border-gray-50 group-hover:scale-105 transition-transform duration-500">
                                <img src={req.brandLogo} alt={req.brandName} className="w-full h-full object-cover" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 text-center md:text-left space-y-3">
                                <div className="flex flex-col md:flex-row md:items-center gap-3">
                                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">{req.brandName}</h3>
                                    {req.status === "new" && (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0 shadow-lg shadow-blue-200">new</span>
                                    )}
                                    {req.status === "accepted" && (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">accepted</span>
                                    )}
                                    {req.status === "rejected" && (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">rejected</span>
                                    )}
                                    {req.status === "archived" && (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200 text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">archived</span>
                                    )}
                                </div>
                                <p className="text-sm font-black text-gray-500 uppercase tracking-widest">{req.campaignTitle}</p>
                                <p className="text-gray-400 font-medium text-sm line-clamp-2 max-w-2xl leading-relaxed">{req.description}</p>

                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-gray-300" />
                                        Budget: <span className="text-gray-900">{req.budget}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-300" />
                                        Received: <span className="text-gray-900">{req.receivedDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row md:flex-col gap-3 justify-center md:justify-end ml-auto">
                                {req.status === "new" ? (
                                    <>
                                        <button
                                            onClick={() => handleAction(req.id, "accepted")}
                                            className="px-8 py-3 bg-gray-900 text-white hover:bg-blue-600 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:shadow-blue-200 flex items-center gap-2"
                                        >
                                            <Check className="w-4 h-4" /> Accept
                                        </button>
                                        <button
                                            onClick={() => handleAction(req.id, "rejected")}
                                            className="px-8 py-3 bg-white border border-gray-100 text-red-500 hover:bg-red-50 hover:border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
                                        >
                                            <X className="w-4 h-4" /> Reject
                                        </button>
                                    </>
                                ) : req.status === "archived" ? (
                                    <button
                                        onClick={() => handleAction(req.id, "new")}
                                        className="px-8 py-3 bg-white border border-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
                                    >
                                        <History className="w-4 h-4" /> Restore
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAction(req.id, "archived")}
                                        className="px-8 py-3 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
                                    >
                                        <Archive className="w-4 h-4" /> Move to Archive
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-32 bg-gray-50/50 rounded-[60px] border border-dashed border-gray-200">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-gray-50">
                            <Clock className="w-12 h-12 text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-400 uppercase tracking-widest">No {filter !== "all" ? filter : ""} requests</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
