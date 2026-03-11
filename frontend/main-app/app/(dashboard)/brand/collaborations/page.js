"use client";
import { useState, useEffect } from "react";
import {
    MessageSquare,
    ClipboardList,
    Calendar,
    CheckCircle2,
    Search,
    Clock,
    ExternalLink,
    Users,
    DollarSign,
    ChevronRight,
    Circle
} from "lucide-react";
import { useAuthStore } from "@repo/store";
import Link from 'next/link';

export default function BrandCollaborations() {
    const { user } = useAuthStore();
    const [collaborations, setCollaborations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");

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
                setCollaborations(data.requests);
            }
        } catch (error) {
            console.error("Failed to fetch collaborations", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formattedCollabs = collaborations
        .filter(req => req.status === 'ACCEPTED')
        .map(req => {
            const tasks = req.tasks || [];
            const deliverablesTotal = tasks.length;
            const deliverablesCompleted = tasks.filter(t => t.status.toUpperCase() === 'COMPLETED').length;
            const progress = deliverablesTotal > 0 ? Math.round((deliverablesCompleted / deliverablesTotal) * 100) : 0;

            return {
                id: req.id,
                influencerName: req.sender.fullname,
                influencerPic: req.sender.profilePic || `https://i.pravatar.cc/150?u=${req.senderId}`,
                influencerId: req.sender.influencerProfile?.id || req.senderId,
                campaignTitle: req.campaign.title,
                campaignId: req.campaign.id,
                date: new Date(req.createdAt).toLocaleDateString(),
                status: "Active",
                platform: req.campaign.targetPlatform?.[0] || "Instagram",
                deliverablesTotal,
                deliverablesCompleted,
                progress,
                amount: req.proposedBudget || req.campaign.budgetMin,
                nextMilestone: tasks.find(t => t.status.toUpperCase() !== 'COMPLETED')?.title || "Pending Kickoff",
                deadline: tasks.find(t => t.status.toUpperCase() !== 'COMPLETED')?.dueDate ? new Date(tasks.find(t => t.status.toUpperCase() !== 'COMPLETED').dueDate).toLocaleDateString() : "TBD"
            };
        });

    const filteredCollaborations = formattedCollabs.filter(collab =>
        collab.influencerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collab.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-2">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight tracking-tight uppercase">Active Collaborations</h1>
                    <p className="text-gray-500 mt-1.5 flex items-center gap-2">
                        Manage your ongoing influencer partnerships and deliverables
                    </p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 inset-y-0 my-auto h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search partners..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* List View */}
            <div className="space-y-6">
                {isLoading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="bg-white border border-gray-100 rounded-[32px] p-8 h-64 animate-pulse" />
                    ))
                ) : filteredCollaborations.length > 0 ? (
                    filteredCollaborations.map((collab, idx) => (
                        <div
                            key={collab.id}
                            className="bg-white border border-gray-200 rounded-[32px] p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500 relative cursor-pointer"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <Link href={`/brand/collaborations/${collab.id}/management`} className="absolute inset-0 z-0" />

                            <div className="flex flex-col lg:flex-row gap-8 relative z-10 pointer-events-none">
                                {/* Left: Influencer & Campaign */}
                                <div className="flex-1 min-w-0 pointer-events-auto">
                                    <div className="flex items-start gap-5 mb-6">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                                            <img src={collab.influencerPic} alt={collab.influencerName} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors uppercase">{collab.influencerName}</h3>
                                                <span className="px-2.5 py-0.5 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-green-100 flex items-center gap-1.5">
                                                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /> {collab.status}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{collab.campaignTitle}</p>

                                            <div className="flex flex-wrap items-center gap-4 mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-300" />
                                                    Started: {collab.date}
                                                </div>
                                                <span className="w-1 h-1 rounded-full bg-gray-200" />
                                                <div className="flex items-center gap-1.5">
                                                    <DollarSign className="w-3.5 h-3.5 text-gray-300" />
                                                    Budget: <span className="text-gray-900">${collab.amount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Section */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Deliverables Progress</p>
                                                <p className="text-sm font-extrabold text-gray-900 uppercase">
                                                    {collab.deliverablesCompleted} of {collab.deliverablesTotal} tasks completed
                                                </p>
                                            </div>
                                            <p className="text-2xl font-black text-blue-600">{collab.progress}%</p>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 shadow-inner border border-gray-50">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                                style={{ width: `${collab.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Next Milestone & Actions */}
                                <div className="w-full lg:w-80 flex flex-col justify-between lg:border-l lg:border-gray-100 lg:pl-8 pointer-events-auto">
                                    <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 mb-6 group-hover:bg-blue-50/30 transition-colors">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Milestone</p>
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-[9px] font-bold uppercase tracking-widest">
                                                    {collab.platform}
                                                </span>
                                            </div>
                                            <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{collab.nextMilestone}</p>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                <Clock className="w-3.5 h-3.5 text-blue-500" />
                                                Due: <span className="text-blue-600">{collab.deadline}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3 relative z-20">
                                            <Link href={`/brand/collaborations/${collab.id}/chat`} className="w-full">
                                                <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                                                    <MessageSquare className="w-4 h-4" />
                                                    Chat
                                                </button>
                                            </Link>
                                            <Link href={`/brand/collaborations/${collab.id}/management`} className="w-full">
                                                <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md shadow-gray-100">
                                                    <ClipboardList className="w-4 h-4" />
                                                    Manage
                                                </button>
                                            </Link>
                                        </div>

                                        <Link href={`/brand/influencer/${collab.influencerId}`} className="block relative z-20">
                                            <button className="w-full py-2 text-gray-400 hover:text-gray-900 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group/btn transition-colors">
                                                View Profile <ExternalLink className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gray-200">
                        <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                            <Users className="w-12 h-12 text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">No active collaborations</h3>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto font-medium">Head over to your requests or search for influencers to start a new partnership.</p>
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
