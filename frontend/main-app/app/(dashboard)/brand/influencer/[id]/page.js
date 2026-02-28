"use client";
import { useState, useEffect, use } from "react";
import {
    Star,
    CheckCircle2,
    MessageSquare,
    Instagram,
    Youtube,
    Twitter,
    MapPin,
    Globe,
    Users,
    TrendingUp,
    Award,
    ArrowLeft,
    Shield
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@repo/store";

export default function InfluencerProfilePage({ params }) {
    const { user } = useAuthStore();
    const resolvedParams = use(params);
    const [mounted, setMounted] = useState(false);
    const influencerId = resolvedParams.id;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mock influencer data
    const influencer = {
        name: "Jessica Lifestyle",
        username: "@jess_style",
        verified: true,
        category: "Fashion & Lifestyle",
        location: "New York, USA",
        followers: "124,500",
        engagementRate: "4.8%",
        avgLikes: "6.2k",
        avgComments: "450",
        rating: 4.9,
        reviews: 28,
        image: "https://i.pravatar.cc/150?u=jessica",
        platforms: [
            { name: "Instagram", icon: Instagram, handle: "@jess_style", followers: "124k" },
            { name: "YouTube", icon: Youtube, handle: "JessLifestyle", followers: "45k" },
            { name: "Twitter/X", icon: Twitter, handle: "@jess_tweets", followers: "12k" }
        ],
        about: "Hi! I'm Jessica, a fashion and lifestyle content creator based in NYC. I love sharing my daily outfits, travel adventures, and home decor tips with my amazing community. I've worked with top brands like Zara, H&M, and Sephora to create authentic and engaging content.",
        recentPosts: [
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1529139572177-393f9ad922bd?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1485230895905-ec17bd368582?w=300&h=300&fit=crop"
        ]
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12 pb-12">
            {/* Navigation */}
            <div className="flex items-center gap-4">
                <Link href="/brand/search-influencers" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <div className="text-sm font-medium text-gray-400">
                    <Link href="/brand" className="hover:text-blue-600">Dashboard</Link>
                    <span className="mx-2">/</span>
                    <Link href="/brand/search-influencers" className="hover:text-blue-600">Influencers</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{influencer.name}</span>
                </div>
            </div>

            {/* Profile Header Card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex flex-col md:flex-row md:items-end justify-between -mt-16 gap-6">
                        <div className="flex flex-col md:flex-row md:items-end gap-6">
                            <div className="relative">
                                <img
                                    src={influencer.image}
                                    alt={influencer.name}
                                    className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
                                />
                                {influencer.verified && (
                                    <div className="absolute -bottom-2 -right-2 bg-white rounded-xl p-1 shadow-md">
                                        <CheckCircle2 className="w-6 h-6 text-blue-500 fill-blue-50" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-black text-gray-900">{influencer.name}</h1>
                                <div className="flex items-center gap-4 text-gray-500 font-medium">
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {influencer.location}</span>
                                    <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {influencer.username}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">
                                Send Invite
                            </button>
                            <button className="px-4 py-3 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all">
                                <MessageSquare className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Platforms */}
                <div className="space-y-8">
                    {/* Key Stats */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-gray-900">Key Statistics</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Followers</p>
                                <p className="text-2xl font-black text-gray-900">{influencer.followers}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Engagement</p>
                                <p className="text-2xl font-black text-blue-600">{influencer.engagementRate}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Avg. Likes</p>
                                <p className="text-2xl font-black text-gray-900">{influencer.avgLikes}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Rating</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-2xl font-black text-gray-900">{influencer.rating}</p>
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-gray-900">Platforms</h3>
                        <div className="space-y-4">
                            {influencer.platforms.map((p) => {
                                const Icon = p.icon;
                                return (
                                    <div key={p.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{p.name}</p>
                                                <p className="text-xs text-gray-500">{p.handle}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-gray-900">{p.followers}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reach</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: About, Posts, Reviews */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">About Influencer</h3>
                            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold border border-green-100">
                                <Shield className="w-4 h-4" /> Highly Trusted
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {influencer.about}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Fashion", "NYC", "Luxury", "Travel", "Home Decor", "Lifestyle"].map(tag => (
                                <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold border border-gray-200">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Recent Content */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Recent Content</h3>
                            <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {influencer.recentPosts.map((post, i) => (
                                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:scale-[1.02] transition-transform cursor-pointer">
                                    <img src={post} alt={`Post ${i}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Engagement Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl shadow-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-bold flex items-center gap-2 tracking-tight">
                                    <TrendingUp className="w-5 h-5 text-blue-400" /> Audience Growth
                                </h4>
                                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-lg font-bold">Stable</span>
                            </div>
                            <p className="text-3xl font-black mb-1">+12.4%</p>
                            <p className="text-gray-400 text-sm">Monthly increase in followers</p>
                        </div>
                        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-amber-500" /> Top Performing
                                </h4>
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Video Content</span>
                            </div>
                            <p className="text-3xl font-black text-gray-900">98.2k</p>
                            <p className="text-gray-500 text-sm italic">Average reel reach</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
