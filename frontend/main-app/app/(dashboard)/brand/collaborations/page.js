"use client";
import { useState, useEffect } from "react";
import { Users, Search, MessageSquare, ClipboardList, User, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@repo/store";
import Link from 'next/link';

export default function BrandCollaborations() {
    const { user } = useAuthStore();
    const [collaborations, setCollaborations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setMounted(true);
        fetchCollaborations();
    }, []);

    const fetchCollaborations = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/brand/requests');
            const data = await res.json();
            if (data.requests) {
                // Filter for ACCEPTED only
                const accepted = data.requests
                    .filter(req => req.status === 'ACCEPTED')
                    .map(req => ({
                        id: req.id,
                        influencerName: req.sender.fullname,
                        influencerPic: req.sender.profilePic || `https://i.pravatar.cc/150?u=${req.senderId}`,
                        influencerId: req.senderId,
                        campaignTitle: req.campaign.title,
                        campaignId: req.campaign.id,
                        date: new Date(req.createdAt).toLocaleDateString(),
                        status: "Active",
                        platform: req.campaign.targetPlatform?.[0] || "Instagram",
                    }));
                setCollaborations(accepted);
            }
        } catch (error) {
            console.error("Failed to fetch collaborations", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredCollaborations = collaborations.filter(collab =>
        collab.influencerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collab.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!mounted) return null;

    if (isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto space-y-8 px-4 md:px-12 animate-pulse">
                <div className="h-10 bg-gray-200 rounded-lg w-1/4" />
                <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-gray-50 rounded-[32px] border border-gray-100" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Active Collaborations</h1>
                    <p className="text-gray-500 mt-1 text-lg">Manage your ongoing influencer partnerships and deliverables.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 inset-y-0 my-auto h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search partners..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Collaborations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCollaborations.map(collab => (
                    <div key={collab.id} className="group bg-white border border-gray-100 rounded-[40px] p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-8">
                            <div className="w-20 h-20 rounded-[24px] overflow-hidden border-4 border-gray-50 shadow-lg shadow-gray-100">
                                <img src={collab.influencerPic} alt={collab.influencerName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {collab.status}
                                </span>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{collab.platform}</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase leading-tight line-clamp-1">{collab.influencerName}</h3>
                                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1 line-clamp-1">{collab.campaignTitle}</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Start: {collab.date}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Link href={`/brand/collaborations/${collab.id}/chat`} className="flex-1">
                                <button className="w-full py-4 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-transparent hover:border-blue-100 shadow-sm">
                                    <MessageSquare className="w-4 h-4" /> Message
                                </button>
                            </Link>
                            <Link href={`/brand/collaborations/${collab.id}/management`} className="flex-1">
                                <button className="w-full py-4 bg-gray-900 hover:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-100 hover:shadow-blue-100">
                                    <ClipboardList className="w-4 h-4" /> Manage
                                </button>
                            </Link>
                        </div>

                        <Link href={`/brand/influencer/${collab.influencerId}`} className="block mt-6">
                            <button className="w-full py-3 text-gray-400 hover:text-gray-900 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group/btn transition-colors">
                                View Influencer Profile <ExternalLink className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
                            </button>
                        </Link>
                    </div>
                ))}

                {filteredCollaborations.length === 0 && (
                    <div className="col-span-full py-24 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100 shadow-inner">
                            <Users className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">No active collaborations</h3>
                        <p className="text-gray-500 mt-3 max-w-sm mx-auto font-medium">Head over to your requests or search for influencers to start a new partnership.</p>
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <Link href="/brand/my-requests">
                                <button className="px-8 py-4 bg-white border border-gray-200 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm">Review Requests</button>
                            </Link>
                            <Link href="/brand/search-influencers">
                                <button className="px-8 py-4 bg-blue-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-2">
                                    Find Partners <CheckCircle2 className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
