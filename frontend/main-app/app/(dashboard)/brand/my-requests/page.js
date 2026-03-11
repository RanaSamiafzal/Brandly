"use client";
import { useState, useEffect } from "react";
import { Search, Filter, MessageSquare, Check, X, Phone, Video, User, Calendar, Clock } from "lucide-react";
import { useAuthStore } from "@repo/store";
import Link from 'next/link';

export default function MyRequests() {
    const { user } = useAuthStore();
    const [requests, setRequests] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setMounted(true);
        fetchRequests();
    }, []);

    useEffect(() => {
        if (!user?.id) return;

        import("socket.io-client").then(({ io }) => {
            const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");
            setSocket(newSocket);

            newSocket.emit('join_user', user.id);

            newSocket.on('receive_request', (request) => {
                const formatted = {
                    id: request.id,
                    name: request.sender?.fullname || "New Influencer",
                    status: request.status.toLowerCase(),
                    campaign: request.campaign?.title || "Campaign",
                    platform: request.campaign?.targetPlatform?.[0] || "Instagram",
                    followers: "Pending data",
                    engagement: "Pending data",
                    date: new Date(request.createdAt).toLocaleDateString(),
                    message: request.note || "No message provided.",
                    image: request.sender?.profilePic || `https://i.pravatar.cc/150?u=${request.senderId}`,
                    senderId: request.senderId
                };
                setRequests(prev => [formatted, ...prev]);
            });

            return () => newSocket.close();
        });
    }, [user?.id]);

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
                    image: req.sender.profilePic || `https://i.pravatar.cc/150?u=${req.senderId}`,
                    senderId: req.senderId
                }));
                setRequests(formattedRequests);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResponse = async (requestId, status, influencerId) => {
        try {
            const res = await fetch(`/api/brand/requests/${requestId}/respond`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                setRequests(prev => prev.map(req =>
                    req.id === requestId ? { ...req, status: status.toLowerCase() } : req
                ));

                if (socket) {
                    socket.emit('respond_request', {
                        influencerId,
                        requestId,
                        status
                    });
                }
            }
        } catch (error) {
            console.error("Failed to respond to request", error);
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

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pt-2">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">Collaboration Requests</h1>
                    <p className="text-gray-500 mt-2 font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                        <MessageSquare className="w-4 h-4 text-blue-600" /> Manage incoming offers from influencers
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-gray-100">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${activeTab === tab.name
                            ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                            : "bg-white border border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        {tab.name}
                        <span className={`px-2 py-0.5 rounded-lg border ${activeTab === tab.name ? "bg-white/10 border-white/20 text-white" : "bg-gray-50 border-gray-100 text-gray-400"
                            }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
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
                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-[32px] overflow-hidden shadow-xl flex-shrink-0 border-4 border-gray-50 group-hover:scale-105 transition-transform duration-500">
                                <img src={req.image} alt={req.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 text-center md:text-left space-y-3">
                                <div className="flex flex-col md:flex-row md:items-center gap-3">
                                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">{req.name}</h3>
                                    {req.status === "pending" && (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0 shadow-lg shadow-blue-200">pending</span>
                                    )}
                                    {req.status === "accepted" && (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">accepted</span>
                                    )}
                                    {req.status === "rejected" && (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">rejected</span>
                                    )}
                                </div>
                                <p className="text-sm font-black text-gray-500 uppercase tracking-widest">Campaign: <span className="text-gray-900">{req.campaign}</span></p>
                                <div className="bg-gray-50 rounded-2xl p-4 text-xs font-medium text-gray-600 border border-gray-100/50 italic group-hover:bg-white transition-colors">
                                    "{req.message}"
                                </div>

                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Video className="w-4 h-4 text-gray-300" />
                                        Platform: <span className="text-gray-900">{req.platform}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-300" />
                                        Date: <span className="text-gray-900">{req.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row md:flex-col gap-3 justify-center md:justify-end ml-auto">
                                <div className="flex gap-2 mb-2">
                                    <Link href={`/brand/influencer/${req.senderId}`}>
                                        <button className="p-3 bg-white border border-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 rounded-2xl transition-all shadow-sm">
                                            <User className="w-4 h-4" />
                                        </button>
                                    </Link>
                                    <Link href={`/brand/collaborations/${req.id}/chat`}>
                                        <button className="p-3 bg-white border border-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 rounded-2xl transition-all shadow-sm">
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>

                                {req.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleResponse(req.id, 'ACCEPTED', req.senderId)}
                                            className="px-8 py-3 bg-gray-900 text-white hover:bg-green-600 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:shadow-green-200 flex items-center gap-2"
                                        >
                                            <Check className="w-4 h-4" /> Accept
                                        </button>
                                        <button
                                            onClick={() => handleResponse(req.id, 'REJECTED', req.senderId)}
                                            className="px-8 py-3 bg-white border border-gray-100 text-red-500 hover:bg-red-50 hover:border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
                                        >
                                            <X className="w-4 h-4" /> Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-32 bg-gray-50/50 rounded-[60px] border border-dashed border-gray-200">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-gray-50">
                            <Clock className="w-12 h-12 text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-400 uppercase tracking-widest">No {activeTab !== "All" ? activeTab : ""} requests</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
