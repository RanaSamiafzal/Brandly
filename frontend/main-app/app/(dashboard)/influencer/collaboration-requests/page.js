"use client";
import { useState, useEffect } from "react";
import {
    ChevronDown,
    ClipboardList,
    MessageSquare,
    User,
    Clock,
    DollarSign,
    Calendar,
    ExternalLink,
    FileText,
    Check,
    X
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@repo/store";

export default function CollaborationRequests() {
    const { user } = useAuthStore();
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        setMounted(true);
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/influencer/requests');
            const data = await res.json();
            if (data.requests) {
                setRequests(data.requests);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
            // Note: Since we are in unified mode, we might need a general endpoint or handle specifically
            // For now, assuming this endpoint exists or will be implemented for actions
            const res = await fetch(`/api/influencer/requests/${id}/respond`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: action.toUpperCase() })
            });

            if (res.ok) {
                fetchRequests(); // Refresh list
            }
        } catch (error) {
            console.error(`Failed to ${action} request`, error);
        }
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pt-2">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">Collaboration Requests</h1>
                    <p className="text-gray-500 mt-2 font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                        <MessageSquare className="w-4 h-4 text-blue-600" /> New opportunities waiting for you
                    </p>
                </div>
            </div>

            {/* Requests List */}
            <div className="space-y-6">
                {isLoading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="bg-white border border-gray-100 rounded-[40px] p-8 h-48 animate-pulse" />
                    ))
                ) : requests.length > 0 ? (
                    requests.map((req, idx) => (
                        <div
                            key={req.id}
                            className={`bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-100/30 hover:border-blue-100 transition-all group animate-in slide-in-from-right-8 duration-500 ${expandedId === req.id ? 'ring-2 ring-blue-600 border-transparent shadow-2xl' : ''
                                }`}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Main Card Header */}
                            <div
                                className="p-8 flex flex-col md:flex-row items-center gap-8 cursor-pointer"
                                onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                            >
                                {/* Brand Logo */}
                                <div className="w-16 h-16 rounded-[24px] overflow-hidden shadow-lg flex-shrink-0 border-2 border-gray-50 group-hover:scale-105 transition-transform duration-500">
                                    <img src={req.brandLogo} alt={req.brandName} className="w-full h-full object-cover" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 text-center md:text-left space-y-2">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">{req.campaignTitle}</h3>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0 shadow-sm ${req.status === 'pending' ? 'bg-blue-600 text-white shadow-blue-200' :
                                            req.status === 'accepted' ? 'bg-green-50 text-green-600' :
                                                'bg-red-50 text-red-600'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Brand: <span className="text-gray-900">{req.brandName}</span></p>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex items-center gap-8 px-8 border-x border-gray-50 hidden lg:flex text-gray-400">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest mb-1">Budget</p>
                                        <p className="text-lg font-black text-gray-900 leading-none">{req.budget}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest mb-1">Received</p>
                                        <p className="text-lg font-black text-gray-900 leading-none">{req.receivedDate}</p>
                                    </div>
                                </div>

                                {/* Expand Icon */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${expandedId === req.id ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-50 text-gray-400'
                                    }`}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {expandedId === req.id && (
                                <div className="px-8 pb-8 pt-4 border-t border-gray-50 animate-in slide-in-from-top-4 duration-300">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6">
                                        <div className="space-y-8">
                                            {/* Description */}
                                            <div>
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <ClipboardList className="w-3 h-3" /> Campaign Description
                                                </h4>
                                                <p className="text-sm text-gray-600 leading-relaxed font-medium bg-gray-50 p-6 rounded-[32px] border border-gray-100/50 italic">
                                                    "{req.description}"
                                                </p>
                                            </div>

                                            {/* Note from Brand */}
                                            {req.note && (
                                                <div>
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                        <MessageSquare className="w-3 h-3" /> Message from Brand
                                                    </h4>
                                                    <p className="text-sm font-bold text-gray-900 bg-blue-50/50 p-6 rounded-[32px] border border-blue-100/50">
                                                        {req.note}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-8">
                                            {/* Resources */}
                                            <div>
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <FileText className="w-3 h-3" /> Campaign Resources
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {req.resources && req.resources.length > 0 ? (
                                                        req.resources.map((res, i) => (
                                                            <div key={i} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group/res">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${res.type === 'link' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                                                                        }`}>
                                                                        {res.type}
                                                                    </span>
                                                                </div>
                                                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{res.title}</p>
                                                                {res.type === 'link' ? (
                                                                    <a href={res.value} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 font-bold mt-1 flex items-center gap-1 hover:underline truncate">
                                                                        {res.value} <ExternalLink className="w-2.5 h-2.5" />
                                                                    </a>
                                                                ) : (
                                                                    <p className="text-[10px] text-gray-500 font-medium mt-1 leading-relaxed line-clamp-2">{res.value}</p>
                                                                )}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="col-span-2 text-center py-8 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
                                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No resources shared yet</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-wrap items-center gap-4 pt-6">
                                                <Link href={`/influencer/brands/${req.brandId}`} className="flex-1 min-w-[200px]">
                                                    <button className="w-full py-4 bg-white border border-gray-100 rounded-[24px] font-black text-[10px] text-gray-600 uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2">
                                                        <User className="w-4 h-4" /> View Brand Profile
                                                    </button>
                                                </Link>
                                                {req.status === 'pending' && (
                                                    <div className="flex gap-3 w-full">
                                                        <button
                                                            onClick={() => handleAction(req.id, 'ACCEPTED')}
                                                            className="flex-1 py-4 bg-gray-900 text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-gray-200"
                                                        >
                                                            Accept Offer
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(req.id, 'REJECTED')}
                                                            className="px-8 py-4 bg-white border border-gray-100 text-red-500 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:border-red-100 transition-all"
                                                        >
                                                            Decline
                                                        </button>
                                                    </div>
                                                )}
                                                {req.status === 'accepted' && (
                                                    <Link href={`/influencer/collaborations/${req.id}/tasks`} className="w-full">
                                                        <button className="w-full py-4 bg-blue-600 text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                                                            <ClipboardList className="w-4 h-4" /> Go to Collaboration Hub
                                                        </button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-32 bg-gray-50/50 rounded-[60px] border border-dashed border-gray-200">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-gray-50">
                            <Clock className="w-12 h-12 text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-400 uppercase tracking-widest">No collaboration requests</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
