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
    Shield,
    X
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@repo/store";

export default function InfluencerProfilePage({ params }) {
    const { user } = useAuthStore();
    const resolvedParams = use(params);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [influencer, setInfluencer] = useState(null);
    const influencerId = resolvedParams.id;

    const [isInviting, setIsInviting] = useState(false);
    const [invitationSent, setInvitationSent] = useState(false);

    // Modal State
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [isFetchingCampaigns, setIsFetchingCampaigns] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const [inviteNote, setInviteNote] = useState("");
    const [inviteError, setInviteError] = useState("");

    useEffect(() => {
        setMounted(true);
        fetchInfluencer();
    }, []);

    const fetchInfluencer = async () => {
        try {
            const res = await fetch(`/api/brand/influencers/${influencerId}`);
            const data = await res.json();

            if (data.influencer) {
                const profile = data.influencer;
                const platforms = Array.isArray(profile.platforms)
                    ? profile.platforms
                    : (typeof profile.platforms === 'string' ? JSON.parse(profile.platforms) : []);

                setInfluencer({
                    id: profile.id,
                    name: profile.user.fullname,
                    username: `@${profile.username}`,
                    verified: true,
                    category: profile.category,
                    location: profile.location || "Not specified",
                    followers: platforms[0]?.followers || "0",
                    engagementRate: "4.8%",
                    avgLikes: "6.2k",
                    avgComments: "450",
                    rating: profile.averageRating || 4.5,
                    reviews: 12,
                    image: profile.user.profilePic || `https://i.pravatar.cc/150?u=${profile.id}`,
                    coverPic: profile.user.coverPic || null,
                    platforms: platforms.map((p, i) => ({
                        id: p.id || i,
                        name: p.type || p.platform || "Platform",
                        icon: (p.type || p.platform)?.toLowerCase() === "instagram" ? Instagram : ((p.type || p.platform)?.toLowerCase() === "youtube" ? Youtube : Twitter),
                        handle: p.handle,
                        followers: p.followers
                    })),
                    about: profile.about || "No description provided.",
                    recentPosts: [
                        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=300&fit=crop",
                        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop",
                        "https://images.unsplash.com/photo-1529139572177-393f9ad922bd?w=300&h=300&fit=crop",
                        "https://images.unsplash.com/photo-1485230895905-ec17bd368582?w=300&h=300&fit=crop"
                    ],
                    tags: profile.category ? profile.category.split(',').map(c => c.trim()).filter(c => c) : []
                });
            }
        } catch (error) {
            console.error("Failed to fetch influencer", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCampaigns = async () => {
        setIsFetchingCampaigns(true);
        try {
            const res = await fetch('/api/brand/campaigns');
            const data = await res.json();
            if (data.campaigns) {
                // Filter only active campaigns
                const active = data.campaigns.filter(c => c.status === 'ACTIVE');
                setCampaigns(active);
                if (active.length > 0) {
                    setSelectedCampaign(active[0].id);
                }
            }
        } catch (error) {
            console.error("Failed to load campaigns", error);
        } finally {
            setIsFetchingCampaigns(false);
        }
    };

    const handleOpenModal = () => {
        setShowInviteModal(true);
        fetchCampaigns();
    };

    const handleSendInvite = async () => {
        if (!selectedCampaign) {
            setInviteError("Please select a campaign");
            return;
        }

        setIsInviting(true);
        setInviteError("");
        try {
            const res = await fetch('/api/brand/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaignId: selectedCampaign,
                    influencerId: influencer.id,
                    note: inviteNote
                })
            });

            const data = await res.json();

            if (res.ok) {
                setInvitationSent(true);
                setShowInviteModal(false);
            } else {
                setInviteError(data.error || "Failed to send invite");
            }
        } catch (error) {
            console.error("Invite error", error);
            setInviteError("An error occurred while sending the invite.");
        } finally {
            setIsInviting(false);
        }
    };

    if (!mounted || isLoading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!influencer) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900">Influencer not found</h2>
            <Link href="/brand/search-influencers" className="text-blue-600 font-bold mt-4 inline-block hover:underline">
                Back to Search
            </Link>
        </div>
    );

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12 pb-12">

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900">Invite {influencer.name}</h3>
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto space-y-6">
                            {inviteError && (
                                <div className="p-3 mb-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">
                                    {inviteError}
                                </div>
                            )}

                            {/* Campaign Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">Select Campaign</label>
                                {isFetchingCampaigns ? (
                                    <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                                ) : campaigns.length === 0 ? (
                                    <div className="p-4 border border-dashed border-gray-300 rounded-xl text-sm text-gray-500 text-center">
                                        You don't have any active campaigns to invite this influencer to.
                                        <Link href="/brand/campaigns" className="text-blue-600 font-bold block mt-1 hover:underline">Create a Campaign</Link>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <select
                                            value={selectedCampaign}
                                            onChange={(e) => setSelectedCampaign(e.target.value)}
                                            className="w-full appearance-none border border-gray-200 bg-white p-3.5 pr-10 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-gray-900 shadow-sm"
                                        >
                                            {campaigns.map(c => (
                                                <option key={c.id} value={c.id}>{c.title}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Note / Message */}
                            <div className="space-y-2">
                                <label className="flex text-sm font-bold text-gray-700 justify-between">
                                    <span>Personal Note</span>
                                    <span className="text-gray-400 font-normal">Optional</span>
                                </label>
                                <textarea
                                    value={inviteNote}
                                    onChange={(e) => setInviteNote(e.target.value)}
                                    placeholder="Hi there! We think you'd be a perfect fit for our upcoming campaign. We'd love to collaborate!"
                                    className="w-full border border-gray-200 bg-white p-3.5 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm min-h-[120px] resize-none shadow-sm"
                                ></textarea>
                                <p className="text-xs text-gray-500">This note will be attached to the collaboration request.</p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendInvite}
                                disabled={isInviting || campaigns.length === 0}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
                            >
                                {isInviting ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                                ) : (
                                    "Send Invitation"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                <div className="h-48 relative">
                    {influencer.coverPic ? (
                        <img src={influencer.coverPic} className="w-full h-full object-cover" alt="Cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                    )}
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
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
                            <button
                                onClick={handleOpenModal}
                                disabled={isInviting || invitationSent}
                                className={`flex-1 md:flex-none px-8 py-3 font-bold rounded-2xl transition-all active:scale-95 flex items-center gap-2
                                    ${invitationSent
                                        ? "bg-green-100 text-green-700 border border-green-200"
                                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100"
                                    } disabled:opacity-70`}
                            >
                                {invitationSent ? (
                                    <><CheckCircle2 className="w-5 h-5" /> Sent Details</>
                                ) : (
                                    "Send Invite"
                                )}
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
                                const Icon = p.icon || Globe;
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
                            {influencer.tags?.length > 0 ? influencer.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold border border-gray-200">
                                    #{tag}
                                </span>
                            )) : (
                                <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold border border-gray-200">
                                    #General
                                </span>
                            )}
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
