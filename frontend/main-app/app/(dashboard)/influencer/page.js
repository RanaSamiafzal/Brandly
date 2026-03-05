"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@repo/store";
import {
    CheckCircle2,
    Clock,
    DollarSign,
    TrendingUp,
    ExternalLink,
    Star,
    Zap,
    History
} from "lucide-react";
import Link from "next/link";

export default function InfluencerDashboard() {
    const { user } = useAuthStore();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        setMounted(true);
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch("/api/influencer/dashboard-stats");
            if (response.ok) {
                const data = await response.json();
                setDashboardData(data);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    const userDisplayName = user?.fullname || "Influencer";

    const stats = [
        {
            label: "Active Campaigns",
            value: dashboardData?.stats?.activeCampaigns || "0",
            icon: Zap, color: "text-blue-500", bg: "bg-blue-50"
        },
        {
            label: "Total Earnings",
            value: dashboardData?.stats?.totalEarnings || "$0",
            icon: DollarSign, color: "text-green-500", bg: "bg-green-50"
        },
        {
            label: "Pending Requests",
            value: dashboardData?.stats?.pendingRequests || "0",
            icon: Clock, color: "text-orange-500", bg: "bg-orange-50"
        },
        {
            label: "Completed",
            value: dashboardData?.stats?.completed || "0",
            icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50"
        },
    ];

    // Placeholder for now as we need another endpoint or expansion of dashboard-stats for these
    const activeCampaigns = [];
    const pendingRequests = [];
    const recentEarnings = [];

    if (isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto space-y-8 animate-pulse">
                <div className="h-10 bg-gray-200 rounded-lg w-1/4" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-50 rounded-xl border" />)}
                </div>
                <div className="h-64 bg-gray-50 rounded-xl border" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-96 bg-gray-50 rounded-xl border" />
                    <div className="h-96 bg-gray-50 rounded-xl border" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Welcome back, <span className="text-blue-600">{userDisplayName}!</span> 👋
                </h1>
                <p className="text-gray-500 mt-1 text-lg">Here's what's happening with your collaborations today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Active Campaigns */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Active Campaigns</h2>
                    <Link href="/influencer/collaborations">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                            View All
                        </button>
                    </Link>
                </div>

                <div className="space-y-4">
                    {activeCampaigns.map((campaign) => (
                        <div key={campaign.id} className="border border-gray-100 rounded-xl p-5 hover:border-blue-100 transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-gray-900 text-lg">{campaign.title}</h3>
                                        <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> {campaign.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{campaign.brand} • {campaign.category}</p>
                                    <div className="flex items-center gap-6 mt-2">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <Clock className="w-3.5 h-3.5" />
                                            Due: {campaign.dueDate}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <DollarSign className="w-3.5 h-3.5" />
                                            {campaign.amount}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Link href={`/influencer/collaborations/${campaign.id}/tasks`}>
                                        <button className="flex items-center gap-2 text-sm font-bold text-blue-600 border border-blue-100 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
                                            <ExternalLink className="w-4 h-4" /> View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Progress</span>
                                    <span className="text-xs font-bold text-gray-900">{campaign.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${campaign.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pending Requests */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Pending Requests</h2>
                        <Link href="/influencer/pending-requests">
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                                View All
                            </button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {pendingRequests.map((req) => (
                            <div key={req.id} className="border border-gray-100 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-gray-900">{req.title}</h3>
                                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Pending
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{req.brand}</p>
                                <p className="text-xs text-gray-400 mb-2">{req.category}</p>
                                <p className="text-sm font-bold text-green-600 mb-4">{req.amount}</p>

                                <div className="grid grid-cols-2 gap-3">
                                    <button className="bg-blue-600 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-all">
                                        Accept
                                    </button>
                                    <button className="bg-white text-blue-600 border border-blue-200 text-sm font-bold py-2.5 rounded-lg hover:bg-blue-50 transition-all">
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Earnings */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 font-mono border-b pb-4">Recent Earnings</h2>
                    <div className="space-y-6">
                        {recentEarnings.map((earning) => (
                            <div key={earning.id} className="flex items-center justify-between group">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{earning.title}</h4>
                                    <p className="text-xs text-gray-400">{earning.brand} • {earning.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">{earning.amount}</p>
                                </div>
                            </div>
                        ))}

                        <div className="pt-6 border-t border-dashed border-gray-200 flex items-center justify-between">
                            <p className="font-bold text-gray-900">Total This Month</p>
                            <p className="text-xl font-bold text-green-600">$7,900</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Performance Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 text-center">
                        <p className="text-4xl font-extrabold text-blue-600 mb-2">4.8</p>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Average Rating</p>
                    </div>
                    <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 text-center">
                        <p className="text-4xl font-extrabold text-green-600 mb-2">96%</p>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Completion Rate</p>
                    </div>
                    <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 text-center">
                        <p className="text-4xl font-extrabold text-orange-600 mb-2">3.2 days</p>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Avg Response Time</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
