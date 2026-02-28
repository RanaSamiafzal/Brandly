"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@repo/store";
import { FileText, CheckCircle2, Clock, Users } from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
    const { user } = useAuthStore();
    const [stats, setStats] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const [statsRes, recRes, actRes] = await Promise.all([
                fetch('/api/brand/dashboard-stats'),
                fetch('/api/brand/ai-recommendations'),
                fetch('/api/brand/recent-activity')
            ]);

            const statsData = await statsRes.json();
            const recData = await recRes.json();
            const actData = await actRes.json();

            if (statsData.stats) {
                setStats([
                    { label: "Total Requests", value: statsData.stats.totalRequests, icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Active Campaigns", value: statsData.stats.activeCampaigns, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
                    { label: "Pending Approvals", value: statsData.stats.pendingApprovals, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50" },
                    { label: "Influencers Found", value: statsData.stats.influencersFound, icon: Users, color: "text-gray-500", bg: "bg-gray-100" }
                ]);
            }

            if (recData.recommendations) {
                setRecommended(recData.recommendations.map(r => ({
                    id: r.influencer.id,
                    name: r.influencer.user.fullname,
                    category: r.influencer.category,
                    platform: "Instagram", // Placeholder
                    followers: "124k", // Placeholder
                    image: r.influencer.user.profilePic || `https://i.pravatar.cc/150?u=${r.influencer.id}`
                })));
            }

            if (actData.activities) {
                setActivities(actData.activities.map(a => ({
                    type: a.type.toLowerCase(),
                    user: a.title,
                    action: a.description,
                    time: new Date(a.createdAt).toLocaleDateString(),
                    color: a.type === 'SUCCESS' ? "bg-green-500" : a.type === 'MATCH' ? "bg-blue-500" : "bg-yellow-500"
                })));
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    if (isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto space-y-8 px-4 md:px-12 animate-pulse">
                <div className="h-10 bg-gray-200 rounded-lg w-1/4" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-50 rounded-xl border" />)}
                </div>
                <div className="h-64 bg-gray-50 rounded-xl border mt-8" />
                <div className="h-48 bg-gray-50 rounded-xl border mt-8" />
            </div>
        );
    }

    const userDisplayName = user?.fullname || "Brand Owner";

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Welcome back, <span className="text-blue-600">{userDisplayName}</span>!
                </h1>
                <p className="text-gray-500 mt-1 text-lg">Here's a summary of your brand's performance and collaboration activity.</p>
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

            {/* Recommended Influencers */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Recommended Influencers</h2>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommended.map((inf, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-6 text-center hover:border-blue-100 hover:shadow-md transition-all">
                            <div className="relative w-20 h-20 mx-auto mb-4">
                                <img src={inf.image} alt={inf.name} className="rounded-full object-cover w-full h-full border-2 border-white shadow-sm" />
                            </div>

                            <div className="flex items-center justify-center gap-1.5 mb-1">
                                <h3 className="font-bold text-gray-900">{inf.name}</h3>
                                <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-50" />
                            </div>

                            <div className="text-sm text-gray-500 space-y-1 mb-6">
                                <p>📸 {inf.platform}</p>
                                <p>{inf.followers} followers</p>
                                <p>{inf.category}</p>
                            </div>

                            <Link href={`/brand/influencer/123`}>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">
                                    View Profile
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-6">
                    {activities.map((act, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="mt-1.5">
                                <div className={`w-2.5 h-2.5 rounded-full ${act.color}`}></div>
                            </div>
                            <div>
                                <p className="text-gray-900 text-sm">
                                    <span className="font-medium">{act.user}</span> {act.action}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
