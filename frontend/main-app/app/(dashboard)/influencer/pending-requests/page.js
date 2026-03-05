"use client";
import { useState, useEffect } from "react";
import {
    Clock,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Search,
    Filter,
    Megaphone,
    ArrowUpRight,
    Send,
    ExternalLink,
    AlertCircle,
    Calendar,
    DollarSign
} from "lucide-react";
import Link from "next/link";

export default function PendingRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("Pending");

    useEffect(() => {
        setMounted(true);
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/influencer/requests");
            if (response.ok) {
                const data = await response.json();
                // Map backend data to frontend structure if necessary
                const formattedRequests = data.requests.map(req => ({
                    id: req.id,
                    campaignTitle: req.campaign.title,
                    brand: req.campaign.brand.brandName || "Unknown Brand",
                    logo: req.campaign.brand.logo || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop",
                    sentDate: new Date(req.createdAt).toLocaleDateString(),
                    status: req.status === "PENDING" ? "Pending" :
                        req.status === "ACCEPTED" ? "Accepted" :
                            req.status === "REJECTED" ? "Rejected" : req.status,
                    budget: req.proposedBudget ? `$${req.proposedBudget}` : `$${req.campaign.budgetMin} - $${req.campaign.budgetMax}`,
                    category: req.campaign.targetCategory?.[0] || "General"
                }));
                setRequests(formattedRequests);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResponse = async (requestId, status) => {
        try {
            const response = await fetch(`/api/influencer/requests/${requestId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                fetchRequests(); // Refresh list
            }
        } catch (error) {
            console.error("Error responding to request:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-blue-50 text-blue-600 border-blue-100";
            case "Under Review": return "bg-orange-50 text-orange-600 border-orange-100";
            case "Accepted": return "bg-green-50 text-green-600 border-green-100";
            case "Rejected": return "bg-red-50 text-red-600 border-red-100";
            default: return "bg-gray-50 text-gray-600 border-gray-100";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending": return Clock;
            case "Under Review": return AlertCircle;
            case "Accepted": return CheckCircle2;
            case "Rejected": return XCircle;
            default: return Clock;
        }
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pt-2">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">Sent Applications</h1>
                    <p className="text-gray-500 mt-2 font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                        <Send className="w-4 h-4 text-blue-600" /> Track requests you've sent to brands
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-4 mb-10 pb-2 border-b border-gray-100">
                {["All", "Pending", "Under Review", "Accepted", "Rejected"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all relative ${activeTab === tab
                            ? "bg-gray-900 text-white shadow-xl shadow-gray-200 -translate-y-1"
                            : "bg-white text-gray-500 border border-transparent hover:border-gray-100 hover:bg-gray-50"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                        )}
                    </button>
                ))}
            </div>

            {/* Application List */}
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-gray-50 rounded-[32px] animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {requests
                        .filter(r => activeTab === "All" || r.status === activeTab)
                        .map((req, idx) => {
                            const StatusIcon = getStatusIcon(req.status);
                            return (
                                <div
                                    key={req.id}
                                    className="bg-white border border-gray-100 rounded-[32px] p-6 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-xl hover:border-blue-100 transition-all group animate-in slide-in-from-right-8 duration-500"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-50 bg-gray-50 flex-shrink-0">
                                        <img src={req.logo} alt={req.brand} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{req.campaignTitle}</h3>
                                            <div className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${getStatusColor(req.status)} flex items-center gap-1.5`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {req.status}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                                            {req.brand} <span className="w-1 h-1 rounded-full bg-gray-200" /> {req.category}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-8 md:px-8 border-l border-gray-50">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sent On</p>
                                            <p className="text-sm font-black text-gray-900">{req.sentDate}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Budget</p>
                                            <p className="text-sm font-black text-gray-900">{req.budget}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link href={`/influencer/campaigns/${req.id}`}>
                                            <button className="p-4 bg-gray-50 text-gray-500 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100">
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                        </Link>
                                        {req.status === "Pending" && (
                                            <button className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-100 hover:border-red-500">
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    }
                    {requests.filter(r => activeTab === "All" || r.status === activeTab).length === 0 && (
                        <div className="text-center py-24 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
                            <Send className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-lg font-black text-gray-400 uppercase tracking-widest">No {activeTab.toLowerCase()} requests</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
