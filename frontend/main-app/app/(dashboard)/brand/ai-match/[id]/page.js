"use client";
import { useState, useEffect, use } from "react";
import { Sparkles, CheckCircle2, Star, Shield, Filter, Users, TrendingUp, Cpu, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@repo/store";

export default function AIMatchPage({ params }) {
    const { user } = useAuthStore();
    const resolvedParams = use(params);
    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isCampaignSelectorOpen, setIsCampaignSelectorOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const res = await fetch('/api/brand/campaigns');
            const data = await res.json();
            if (data.campaigns) {
                setCampaigns(data.campaigns);
                // If there's an ID in params, try to select that campaign
                const initialCampaign = resolvedParams.id !== "new"
                    ? data.campaigns.find(c => c.id === resolvedParams.id) || data.campaigns[0]
                    : data.campaigns[0];
                setSelectedCampaign(initialCampaign);
                if (initialCampaign) fetchMatches(initialCampaign.id);
            }
        } catch (error) {
            console.error("Failed to fetch campaigns", error);
        }
    };

    const fetchMatches = async (campaignId) => {
        if (!campaignId) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/brand/campaigns/${campaignId}/matches`);
            const data = await res.json();

            if (data.matches) {
                // Map the database matches to the frontend format
                const formattedMatches = data.matches.map(m => {
                    const profile = m.influencer;
                    const platforms = Array.isArray(profile.platforms)
                        ? profile.platforms
                        : (typeof profile.platforms === 'string' ? JSON.parse(profile.platforms) : []);

                    const primaryPlatform = platforms[0] || { platform: "Instagram", followers: "0" };

                    return {
                        id: m.influencerId,
                        name: profile.user.fullname,
                        score: Math.round(m.score),
                        niche: profile.category,
                        followers: primaryPlatform.followers, // Use actual followers
                        platform: primaryPlatform.platform,    // Use actual platform
                        image: profile.user.profilePic || null,
                        matchReason: m.breakdown?.reason || "High affinity with your target audience demographics."
                    };
                });
                setMatches(formattedMatches);
            }
        } catch (error) {
            console.error("Failed to fetch matches", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCampaignChange = (campaign) => {
        setSelectedCampaign(campaign);
        setIsCampaignSelectorOpen(false);
        fetchMatches(campaign.id);
    };

    if (!mounted) return null;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-in fade-in duration-700 px-4">
                <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-blue-50 flex items-center justify-center animate-pulse">
                        <Cpu className="w-12 h-12 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                    <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-8 h-8 text-blue-400 animate-bounce" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">AI is analyzing matches for {selectedCampaign?.title || "your campaign"}...</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Our engine is calculating match scores based on audience demographics, engagement rates, and content affinity.</p>
                </div>

                <div className="w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 animate-[loading_4s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
                </div>

                <div className="flex flex-col gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest mt-8">
                    <div className="flex items-center gap-2 justify-center opacity-70 animate-pulse">
                        <CheckCircle2 className="w-3 h-3 text-green-500" /> Scanning Influencer Database
                    </div>
                    <div className="flex items-center gap-2 justify-center opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}>
                        <CheckCircle2 className="w-3 h-3 text-green-500" /> Analyzing Sentiment Affinity
                    </div>
                    <div className="flex items-center gap-2 justify-center opacity-70 animate-pulse" style={{ animationDelay: '1s' }}>
                        <div className="w-3 h-3 rounded-full border border-gray-300 animate-spin border-t-blue-500" /> Calculating weighted scores
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 px-4 md:px-12">
            {/* Top Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                        <Sparkles className="w-4 h-4 fill-blue-600" /> AI Recommendations
                    </div>
                    <h1 className="text-3xl font-black text-gray-900">Matching Specialists</h1>
                </div>

                {/* Campaign Selector */}
                <div className="relative">
                    <button
                        onClick={() => setIsCampaignSelectorOpen(!isCampaignSelectorOpen)}
                        className="w-full lg:w-72 flex items-center justify-between gap-4 px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-blue-200 transition-all text-left"
                    >
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Active Campaign</p>
                            <p className="font-bold text-gray-900 truncate">{selectedCampaign?.title || "Select a campaign"}</p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCampaignSelectorOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isCampaignSelectorOpen && (
                        <div className="absolute top-full right-0 mt-3 w-full lg:w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-3 max-h-80 overflow-y-auto">
                                {campaigns.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => handleCampaignChange(c)}
                                        className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl transition-all text-left mb-1 last:mb-0 ${selectedCampaign?.id === c.id
                                            ? "bg-blue-50 text-blue-700 font-bold"
                                            : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <span className="truncate">{c.title}</span>
                                        {selectedCampaign?.id === c.id && <Check className="w-4 h-4" />}
                                    </button>
                                ))}
                                {campaigns.length === 0 && (
                                    <p className="p-4 text-sm text-gray-500 italic">No campaigns found</p>
                                )}
                            </div>
                            <div className="p-3 bg-gray-50 border-t border-gray-100">
                                <Link href="/brand/create-campaign" className="block w-full text-center py-2.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                    + Create New Campaign
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-100 flex items-center justify-between overflow-hidden relative group">
                    <div className="relative z-10">
                        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">High Affinity Score</p>
                        <p className="text-4xl font-black">98.4%</p>
                        <p className="text-blue-200/80 text-xs mt-2">Top matched influencers</p>
                    </div>
                    <TrendingUp className="w-16 h-16 text-white/10 absolute -right-2 -bottom-2 group-hover:scale-110 transition-transform" />
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Estimated Reach</p>
                        <p className="text-3xl font-black text-gray-900">1.2M+</p>
                        <p className="text-gray-400 text-xs mt-2">Combined potential</p>
                    </div>
                    <Users className="w-10 h-10 text-blue-50" />
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Compliance Rate</p>
                        <p className="text-3xl font-black text-gray-900">Highly Rated</p>
                        <p className="text-gray-400 text-xs mt-2">Verified creators only</p>
                    </div>
                    <Shield className="w-10 h-10 text-green-50" />
                </div>
            </div>

            {/* Match Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {matches.map((match, idx) => (
                    <div key={match.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:border-blue-200 transition-all group animate-in fade-in slide-in-from-bottom-8 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                        <div className="flex flex-col gap-8">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="relative shrink-0">
                                        <div className="relative w-24 h-24">
                                            <svg className="w-24 h-24 transform -rotate-90 absolute top-0 left-0 z-10">
                                                <circle cx="48" cy="48" r="46" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                                                <circle cx="48" cy="48" r="46" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={289} strokeDashoffset={289 - (289 * match.score) / 100} className="text-blue-600 transition-all duration-1000 ease-out" />
                                            </svg>
                                            <div className="absolute inset-1 rounded-full overflow-hidden bg-white border-2 border-white shadow-inner">
                                                {match.image ? (
                                                    <img src={match.image} alt={match.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full bg-blue-50 text-blue-600 flex items-center justify-center text-3xl font-black uppercase group-hover:scale-110 transition-transform duration-500">
                                                        {match.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-xl px-2 py-1 text-[10px] font-black z-20 shadow-lg shadow-blue-200">
                                                {match.score}% MATCH
                                            </div>
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl md:text-2xl font-black text-gray-900 truncate" title={match.name}>{match.name}</h3>
                                            <CheckCircle2 className="w-4 h-4 md:w-5 h-5 text-green-500 flex-shrink-0 fill-green-50" />
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500 font-bold mt-1">
                                            <span className="flex items-center gap-1.5 whitespace-nowrap"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span className="whitespace-nowrap">{match.followers} followers</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-6 right-6 lg:static bg-gray-100 px-2 md:px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap z-20">
                                    {match.platform}
                                </div>
                            </div>

                            <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100/80">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-blue-100/50 flex items-center justify-center shrink-0">
                                        <Sparkles className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed font-medium pt-1">"{match.matchReason}"</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full">
                                <Link href={`/brand/influencer/${match.id}`} className="flex-1">
                                    <button className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-bold py-4 rounded-2xl transition-all text-sm group-hover:border-blue-200 shadow-sm active:scale-[0.98]">
                                        View Profile
                                    </button>
                                </Link>
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-[0.98]">
                                    Send Invite
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
