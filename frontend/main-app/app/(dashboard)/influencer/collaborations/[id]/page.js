"use client";
import { useState, useEffect } from "react";
import {
    CheckCircle2,
    Circle,
    Clock,
    ArrowLeft,
    Calendar,
    ClipboardList,
    MessageSquare,
    ExternalLink,
    ShieldCheck,
    MapPin,
    Box,
    FileText,
    Globe,
    Instagram,
    Youtube,
    Twitter
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function InfluencerCollaborationHub() {
    const params = useParams();
    const [collabInfo, setCollabInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState({ total: 0, completed: 0 });

    useEffect(() => {
        setMounted(true);
        fetchCollabDetails();
        fetchTasks();
    }, []);

    const fetchCollabDetails = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/influencer/requests/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setCollabInfo(data.request);
            }
        } catch (error) {
            console.error("Failed to fetch collab details", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await fetch(`/api/influencer/collaborations/${params.id}/tasks`);
            if (res.ok) {
                const data = await res.json();
                const total = data.tasks.length;
                const completed = data.tasks.filter(t => t.status === "COMPLETED" || t.status === "completed").length;
                setStats({ total, completed });
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    if (!mounted) return null;
    if (isLoading) return <div className="p-20 text-center text-gray-400 animate-pulse font-black uppercase tracking-widest">Loading collaboration hub...</div>;
    if (!collabInfo) return <div className="p-20 text-center text-gray-400 font-black uppercase tracking-widest">Collaboration not found.</div>;

    const brand = collabInfo.campaign.brand;
    const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pt-2">
                <div className="space-y-4">
                    <Link href="/influencer/collaborations" className="inline-flex items-center gap-3 text-sm font-black text-gray-400 hover:text-blue-600 transition-all group uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" /> Back to collaborations
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-100">
                            <Box className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Collaboration Hub</h1>
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">
                                Partner: {brand.brandName} • {collabInfo.campaign.title}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={`/influencer/collaborations/${params.id}/chat`}>
                        <button className="px-8 py-4 bg-white border border-gray-100 rounded-3xl font-black text-xs text-gray-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Open Chat
                        </button>
                    </Link>
                    <Link href={`/influencer/collaborations/${params.id}/tasks`}>
                        <button className="px-8 py-4 bg-gray-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 flex items-center gap-2">
                            <ClipboardList className="w-4 h-4" /> View Tasks
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Stats Card */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm flex flex-col justify-center">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Deliverables Progress</span>
                            <span className="text-3xl font-black text-gray-900">{progress}%</span>
                        </div>
                        <div className="h-5 bg-gray-50 rounded-full overflow-hidden p-1.5 shadow-inner">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex gap-8 text-xs font-black text-gray-500 uppercase tracking-widest">
                            <span className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> {stats.completed} Completed</span>
                            <span className="flex items-center gap-2.5"><Circle className="w-4 h-4 text-gray-200" /> {stats.total - stats.completed} Pending</span>
                        </div>
                    </div>
                </div>

                {/* Brand Info Card */}
                <div className="bg-blue-600 rounded-[40px] p-8 text-white shadow-xl shadow-blue-100 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Brand Details</span>
                            <ShieldCheck className="w-5 h-5 opacity-80" />
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl border-2 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center">
                                {brand.logo ? (
                                    <img src={brand.logo} className="w-full h-full object-cover" alt={brand.brandName} />
                                ) : (
                                    <span className="text-xl font-black uppercase">{(brand.brandName || "B").charAt(0)}</span>
                                )}
                            </div>
                            <div>
                                <h3 className="font-black text-lg uppercase leading-tight">{brand.brandName}</h3>
                                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3" /> {brand.location || "Online"}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3 pt-2">
                             <div className="flex items-center justify-between text-[10px] uppercase font-bold">
                                <span className="opacity-70">Joined</span>
                                <span>{brand?.user?.createdAt ? new Date(brand.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Recently"}</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] uppercase font-bold">
                                <span className="opacity-70">Verification</span>
                                <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                                    <ShieldCheck className="w-3 h-3" /> {brand?.user?.isVerified ? "VERIFIED" : "PENDING"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Link
                        href={`/influencer/brands/${brand.id}`}
                        className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2 mt-6"
                    >
                        View Full Profile <ExternalLink className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Deliverables Board Link */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                            <FileText className="w-6 h-6 text-blue-600" /> Active Tasks
                        </h2>
                        <Link href={`/influencer/collaborations/${params.id}/tasks`} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Manage All</Link>
                    </div>
                    
                    <div className="space-y-4">
                        {stats.total === 0 ? (
                            <div className="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                <ClipboardList className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No tasks added yet by the brand</p>
                            </div>
                        ) : (
                            <div className="p-6 bg-blue-50/30 rounded-3xl border border-blue-100/50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                        <ClipboardList className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-900 uppercase">{stats.completed} / {stats.total} Tasks Completed</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deliverables board is live</p>
                                    </div>
                                </div>
                                <Link href={`/influencer/collaborations/${params.id}/tasks`}>
                                    <button className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                        Open Board
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Campaign Resources Sidebar */}
                <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm h-fit">
                    <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                             Campaign Resources
                        </h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {(!collabInfo.campaign.resources || collabInfo.campaign.resources.length === 0) ? (
                            <div className="text-center py-8">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No resources added</p>
                                <p className="text-[10px] text-gray-500 mt-1 px-4 text-center">Important links and notes from the brand will appear here.</p>
                            </div>
                        ) : (
                            collabInfo.campaign.resources.map((res) => (
                                <div key={res.id} className="group p-4 bg-gray-50 rounded-2xl border border-gray-100 relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${res.type === 'link' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                            {res.type}
                                        </span>
                                    </div>
                                    <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{res.title}</p>
                                    {res.type === 'link' ? (
                                        <a href={res.value} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 font-bold mt-1 flex items-center gap-1 hover:underline truncate">
                                            {res.value} <ExternalLink className="w-2.5 h-2.5" />
                                        </a>
                                    ) : (
                                        <p className="text-[10px] text-gray-500 font-medium mt-1 leading-relaxed">{res.value}</p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
