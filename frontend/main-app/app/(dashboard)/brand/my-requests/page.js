"use client";
import { useState, useEffect } from "react";
import { Search, Filter, MessageSquare, Check, X } from "lucide-react";

export default function MyRequests() {
    const [requests, setRequests] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/brand/requests');
            const data = await res.json();
            if (data.requests) {
                const formattedRequests = data.requests.map(req => ({
                    id: req.id,
                    name: req.sender.fullname,
                    status: req.status.toLowerCase(),
                    campaign: req.campaign.title,
                    platform: req.campaign.targetPlatform?.[0] || "Instagram",
                    followers: "Pending data",
                    engagement: "Pending data",
                    date: new Date(req.createdAt).toLocaleDateString(),
                    message: req.note || "No message provided.",
                    image: req.sender.profilePic || `https://i.pravatar.cc/150?u=${req.senderId}`
                }));
                setRequests(formattedRequests);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { name: "All", count: requests.length },
        { name: "Pending", count: requests.filter(r => r.status === 'pending').length },
        { name: "Accepted", count: requests.filter(r => r.status === 'accepted').length },
        { name: "Rejected", count: requests.filter(r => r.status === 'rejected').length }
    ];

    const filteredRequests = activeTab === "All"
        ? requests
        : requests.filter(req => req.status === activeTab.toLowerCase());

    if (!mounted) return null;

    if (isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto space-y-8 px-4 md:px-12 animate-pulse">
                <div className="h-10 bg-gray-200 rounded-lg w-1/4" />
                <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
                <div className="space-y-4 mt-12">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-gray-50 rounded-xl border border-gray-100" />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Collaboration Requests</h1>
                <p className="text-gray-500 mt-1 text-lg">Manage incoming collaboration requests and review your brand's potential partnerships.</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full border border-gray-200 rounded-lg bg-white p-2 flex items-center shadow-sm">
                    <Search className="w-5 h-5 text-gray-400 mx-2" />
                    <input
                        type="text"
                        placeholder="Search requests..."
                        className="w-full bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-400"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 bg-white transition-colors shadow-sm">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200">
                {tabs.map(tab => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab.name
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        {tab.name}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.name ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                {filteredRequests.map(req => (
                    <div key={req.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                            <img src={req.image} alt={req.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 space-y-3">
                            {/* Header inside card */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900 text-lg">{req.name}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${req.status === 'pending' ? 'bg-gray-100 text-gray-600' :
                                            req.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-900 text-sm mt-0.5">
                                        Campaign: <span className="font-semibold">{req.campaign}</span>
                                    </p>
                                </div>

                                {/* Actions (Desktop) */}
                                <div className="hidden md:flex items-center gap-3">
                                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors">
                                        View Profile
                                    </button>
                                    <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                                        <MessageSquare className="w-4 h-4" />
                                    </button>

                                    {req.status === 'pending' && (
                                        <div className="flex items-center gap-2 ml-2">
                                            <button className="flex items-center gap-1.5 px-3 py-2 hover:bg-green-50 text-green-700 rounded-lg text-sm font-medium transition-colors">
                                                <Check className="w-4 h-4" /> Accept
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-2 hover:bg-red-50 text-red-700 rounded-lg text-sm font-medium transition-colors">
                                                <X className="w-4 h-4" /> Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stats row */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 divide-x divide-gray-200">
                                <span>{req.platform}</span>
                                <span className="pl-4">{req.followers}</span>
                                <span className="pl-4">{req.engagement}</span>
                                <span className="pl-4">Requested: {req.date}</span>
                            </div>

                            {/* Message Bubble */}
                            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 border border-gray-100">
                                {req.message}
                            </div>
                        </div>
                    </div>
                ))}

                {filteredRequests.length === 0 && (
                    <div className="p-12 text-center text-gray-500 bg-white border border-gray-200 rounded-xl border-dashed">
                        No {activeTab.toLowerCase()} requests found.
                    </div>
                )}
            </div>
        </div>
    );
}
