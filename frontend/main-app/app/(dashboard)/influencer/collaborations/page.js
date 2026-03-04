"use client";
import { useState, useEffect } from "react";
import {
    MessageSquare,
    FileText,
    Calendar,
    DollarSign,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronRight,
    Star,
    Upload,
    MoreHorizontal,
    ExternalLink,
    Wallet
} from "lucide-react";
import Link from "next/link";

export default function MyCollaborationsPage() {
    const [collaborations, setCollaborations] = useState([]);
    const [filter, setFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchCollaborations();
    }, []);

    const fetchCollaborations = async () => {
        setIsLoading(true);
        try {
            // Mock data for a "complete" feel
            setTimeout(() => {
                setCollaborations([
                    {
                        id: "c1",
                        brandName: "FashionHub",
                        brandLogo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&h=200&fit=crop",
                        campaignTitle: "Summer Collection Launch",
                        status: "ongoing",
                        startDate: "2/1/2024",
                        endDate: "3/31/2024",
                        amount: 800,
                        paymentStatus: "escrowed",
                        deliverablesTotal: 6,
                        deliverablesCompleted: 4,
                        nextMilestone: "Instagram Reel",
                        deadline: "In 2 days",
                        priority: "high"
                    },
                    {
                        id: "c2",
                        brandName: "TechGear Pro",
                        brandLogo: "https://images.unsplash.com/photo-1468436139062-f60a7444f84e?w=200&h=200&fit=crop",
                        campaignTitle: "Product Review Series",
                        status: "ongoing",
                        startDate: "2/15/2024",
                        endDate: "4/15/2024",
                        amount: 1200,
                        paymentStatus: "pending",
                        deliverablesTotal: 3,
                        deliverablesCompleted: 1,
                        nextMilestone: "Unboxing Video",
                        deadline: "In 5 days",
                        priority: "medium"
                    },
                    {
                        id: "c3",
                        brandName: "WellnessLife",
                        brandLogo: "https://images.unsplash.com/photo-1545208393-596371BA9a3e?w=200&h=200&fit=crop",
                        campaignTitle: "Wellness Challenge",
                        status: "completed",
                        startDate: "1/1/2024",
                        endDate: "2/15/2024",
                        amount: 600,
                        paymentStatus: "paid",
                        deliverablesTotal: 10,
                        deliverablesCompleted: 10,
                        rating: 4.8,
                        earningStatus: "Received"
                    },
                    {
                        id: "c4",
                        brandName: "GourmetBox",
                        brandLogo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
                        campaignTitle: "Meal Kit Review",
                        status: "pending",
                        startDate: "3/10/2024",
                        endDate: "4/20/2024",
                        amount: 450,
                        paymentStatus: "not_started",
                        deliverablesTotal: 2,
                        deliverablesCompleted: 0,
                        nextMilestone: "Contract Signing",
                        deadline: "Await brand",
                    }
                ]);
                setIsLoading(false);
            }, 800);
        } catch (error) {
            console.error("Failed to fetch collaborations", error);
            setIsLoading(false);
        }
    };

    const filteredCollaborations = collaborations.filter(col => {
        if (filter === "all") return true;
        return col.status === filter;
    });

    const getStatusStyles = (status) => {
        switch (status) {
            case "ongoing": return "bg-blue-50 text-blue-600 border-blue-100";
            case "completed": return "bg-green-50 text-green-600 border-green-100";
            case "pending": return "bg-amber-50 text-amber-600 border-amber-100";
            default: return "bg-gray-50 text-gray-600 border-gray-100";
        }
    };

    const getPaymentStatus = (status) => {
        switch (status) {
            case "escrowed": return { label: "Funds in Escrow", icon: Wallet, color: "text-blue-600" };
            case "paid": return { label: "Payment Received", icon: CheckCircle2, color: "text-green-600" };
            case "pending": return { label: "Payment Pending", icon: Clock, color: "text-amber-600" };
            case "not_started": return { label: "Contract Pending", icon: AlertCircle, color: "text-gray-400" };
            default: return { label: "Unknown", icon: AlertCircle, color: "text-gray-400" };
        }
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-2">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Collaborations</h1>
                    <p className="text-gray-500 mt-1.5 flex items-center gap-2">
                        Track your active and past collaborations with brands
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2.5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Total Earnings</p>
                            <p className="text-lg font-bold text-gray-900 leading-none">$2,600.00</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
                {[
                    { id: "all", label: "All" },
                    { id: "ongoing", label: "Ongoing" },
                    { id: "completed", label: "Completed" },
                    { id: "pending", label: "Pending" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id)}
                        className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-sm border ${filter === tab.id
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-gray-100 text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-6">
                {isLoading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="bg-white border border-gray-100 rounded-[32px] p-8 h-64 animate-pulse" />
                    ))
                ) : filteredCollaborations.length > 0 ? (
                    filteredCollaborations.map((col, idx) => {
                        const progress = Math.round((col.deliverablesCompleted / col.deliverablesTotal) * 100);
                        const payInfo = getPaymentStatus(col.paymentStatus);
                        const PayIcon = payInfo.icon;

                        return (
                            <div
                                key={col.id}
                                className="bg-white border border-gray-200 rounded-[32px] p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Left: Brand & Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-5 mb-6">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                                                <img src={col.brandLogo} alt={col.brandName} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{col.campaignTitle}</h3>
                                                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(col.status)}`}>
                                                        {col.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-bold text-gray-500">{col.brandName}</p>

                                                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-gray-300" />
                                                        {col.startDate} - {col.endDate}
                                                    </div>
                                                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                                                    <div className="flex items-center gap-1.5">
                                                        <DollarSign className="w-3.5 h-3.5 text-gray-300" />
                                                        Payment: <span className="text-gray-900">${col.amount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Section */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Deliverables Progress</p>
                                                    <p className="text-sm font-extrabold text-gray-900">
                                                        {col.deliverablesCompleted} of {col.deliverablesTotal} tasks completed
                                                    </p>
                                                </div>
                                                <p className="text-2xl font-black text-blue-600">{progress}%</p>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 shadow-inner border border-gray-50">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Milestones & Actions */}
                                    <div className="w-full lg:w-80 flex flex-col justify-between lg:border-l lg:border-gray-100 lg:pl-8">
                                        <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 mb-6">
                                            {col.status === "completed" ? (
                                                <div className="space-y-4 text-center">
                                                    <div className="inline-flex p-3 bg-green-100 rounded-2xl">
                                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-extrabold text-gray-900">Campaign Finished</p>
                                                        <div className="flex items-center justify-center gap-1 mt-1">
                                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                            <span className="text-sm font-black text-gray-900">{col.rating}</span>
                                                            <span className="text-xs text-gray-400 font-bold">Brand Rating</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Next Up</p>
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${col.priority === "high" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                                                            {col.priority || "Normal"}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-black text-gray-900">{col.nextMilestone}</p>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                                                        Deadline: <span className="text-blue-600">{col.deadline}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-xl mb-4">
                                                <PayIcon className={`w-4 h-4 ${payInfo.color}`} />
                                                <span className={`text-[11px] font-black uppercase tracking-wider ${payInfo.color}`}>{payInfo.label}</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <Link href={`/influencer/collaborations/${col.id}/chat`} className="w-full">
                                                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                                                        <MessageSquare className="w-4 h-4" />
                                                        Chat
                                                    </button>
                                                </Link>
                                                <Link href={`/influencer/collaborations/${col.id}/tasks`} className="w-full">
                                                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                                                        <FileText className="w-4 h-4" />
                                                        Tasks
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gray-200">
                        <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                            <Clock className="w-12 h-12 text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900">No collaborations yet</h3>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto font-medium">
                            Apply to some brand campaigns to start tracking your collaborations here.
                        </p>
                        <Link href="/influencer/search-brands">
                            <button className="mt-8 px-8 py-3.5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                                Browse Brands
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
