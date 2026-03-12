"use client";
import { useState, useEffect } from "react";
import {
    Globe,
    MapPin,
    Users,
    Star,
    ShieldCheck,
    Search,
    ArrowLeft,
    Megaphone,
    DollarSign,
    Box,
    ExternalLink,
    Send,
    MessageSquare,
    Youtube,
    Twitter,
    Calendar,
    Instagram
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BrandProfilePage() {
    const params = useParams();
    const [brand, setBrand] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            fetchBrandDetails();
        }
    }, [params.id]);

    const fetchBrandDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/influencer/brands/${params.id}`);
            const data = await res.json();
            if (res.ok && data.profile) {
                const p = data.profile;
                setBrand({
                    id: p.id,
                    name: p.brandName || p.user?.fullname || "Unknown Brand",
                    email: p.user?.email || null,
                    logo: p.logo || p.user?.profilePic || null,
                    banner: p.user?.coverPic || null,
                    description: p.description || null,
                    industry: p.industry || null,
                    location: p.address || null,
                    website: p.website || null,
                    joinedDate: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                    isVerified: true, // Assuming default true for now, can be a field later
                    stats: {
                        activeCampaigns: p.campaigns?.length || 0,
                        totalCollaborations: null, // No real data yet
                        avgRating: null // No real data yet
                    },
                    socialPlatforms: [], // No real data yet
                    activeCampaigns: p.campaigns?.map(c => ({
                        id: c.id,
                        title: c.title,
                        budget: `$${c.budgetMin.toLocaleString()} - $${c.budgetMax.toLocaleString()}`,
                        deadline: new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    })) || []
                });
            } else {
                setError(data.error || "Failed to load brand profile");
            }
        } catch (error) {
            console.error("Failed to fetch brand details", error);
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;
    if (isLoading) return <div className="p-12 text-center animate-pulse text-gray-400">Loading brand profile...</div>;
    if (error) return <div className="p-12 text-center text-red-500 font-bold">{error}</div>;
    if (!brand) return <div className="p-12 text-center text-gray-400">Brand not found</div>;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Back Button */}
            <Link href="/influencer/search-brands" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 mb-8 transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 shadow-sm transition-all">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Search
            </Link>

            {/* Banner & Logo Area */}
            <div className="relative mb-48 md:mb-32">
                {brand.banner ? (
                <div className="w-full h-48 md:h-80 rounded-[40px] overflow-hidden border border-gray-100 shadow-inner px-1 pt-1 bg-gray-50">
                    <img src={brand.banner} alt="Banner" className="w-full h-full object-cover rounded-[39px]" />
                </div>
                ) : (
                <div className="w-full h-48 md:h-80 rounded-[40px] border border-gray-100 shadow-inner bg-gray-50"></div>
                )}
                <div className="absolute -bottom-40 md:-bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 flex flex-col items-center md:items-end md:flex-row gap-4 md:gap-6 w-[90%] md:w-auto text-center md:text-left">
                    <div className="relative shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-[40px] md:rounded-[48px] overflow-hidden border-[6px] border-white shadow-2xl shadow-blue-100/50 bg-white">
                        {brand.logo ? (
                            <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center text-6xl font-black uppercase">
                                {brand.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="mb-0 md:mb-4 w-full">
                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{brand.name}</h1>
                            {brand.isVerified && (
                                <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1.5 border border-blue-100">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline-block">Verified Brand</span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-sm font-bold text-gray-500">
                            {brand.email && (
                            <span className="flex items-center gap-1.5">
                                <MessageSquare className="w-4 h-4 shrink-0 text-gray-300" /> <span className="truncate max-w-[150px] sm:max-w-none">{brand.email}</span>
                            </span>
                            )}
                            {brand.location && (
                            <span className="hidden sm:flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 shrink-0 text-gray-300" /> <span className="truncate max-w-[120px] sm:max-w-none">{brand.location}</span>
                            </span>
                            )}
                            {brand.website && (
                            <span className="hidden md:flex items-center gap-1.5">
                                <Globe className="w-4 h-4 shrink-0 text-gray-300" /> <span className="truncate max-w-[150px] sm:max-w-none">{brand.website}</span>
                            </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: About & Socials */}
                <div className="lg:col-span-2 space-y-8">
                    {brand.description && (
                    <section className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm">
                        <h2 className="text-2xl font-black text-gray-900 mb-6 font-display">About the Brand</h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            {brand.description}
                        </p>
                    </section>
                    )}

                    {brand.socialPlatforms.length > 0 && (
                    <section className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm">
                        <h2 className="text-2xl font-black text-gray-900 mb-8">Social Reach</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {brand.socialPlatforms.map((social) => (
                                <div key={social.name} className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-blue-100 transition-all group">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-blue-600">{social.name}</p>
                                    <p className="text-2xl font-black text-gray-900">{social.followers}</p>
                                    <p className="text-xs font-bold text-gray-500 mt-1">{social.handle}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    )}

                    <section>
                        <div className="flex items-center justify-between mb-8 px-2">
                            <h2 className="text-2xl font-black text-gray-900">Active Campaigns</h2>
                            <Link href="/influencer/campaigns" className="text-sm font-bold text-blue-600 hover:underline">View All Campaigns</Link>
                        </div>
                        <div className="space-y-4">
                            {brand.activeCampaigns.length > 0 ? brand.activeCampaigns.map((camp) => (
                                <div key={camp.id} className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center justify-between hover:border-blue-100 hover:shadow-md transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                                            <Megaphone className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{camp.title}</h3>
                                            <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">
                                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {camp.budget}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-200" />
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Ends {camp.deadline}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href={`/influencer/campaigns/${camp.id}`}>
                                        <button className="px-6 py-3 bg-white border border-gray-100 text-gray-900 font-bold rounded-2xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95 shadow-sm text-sm">
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            )) : (
                                <div className="text-center py-12 bg-white border border-dashed border-gray-200 rounded-[40px] text-gray-400 font-bold">
                                    No active campaigns found
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Key Stats & Quick Actions */}
                <div className="space-y-8">
                    {(brand.stats.avgRating || brand.stats.totalCollaborations) && (
                    <div className="bg-blue-600 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-200">
                        <h3 className="text-xl font-bold mb-8">Performance Score</h3>
                        <div className="space-y-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2">Success Rate</p>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl font-black">98.5%</span>
                                    <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-lg">High</span>
                                </div>
                                <div className="h-1.5 bg-blue-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-[98.5%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-500/50">
                                {brand.stats.avgRating && (
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Rating</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-white text-white" />
                                        <span className="text-xl font-black">{brand.stats.avgRating}</span>
                                    </div>
                                </div>
                                )}
                                {brand.stats.totalCollaborations && (
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Collabs</p>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4 text-white" />
                                        <span className="text-xl font-black">{brand.stats.totalCollaborations}</span>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    )}

                    <div className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-sm">
                        <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-center gap-3 py-4 bg-blue-50 text-blue-700 font-black rounded-3xl hover:bg-blue-100 transition-all active:scale-[0.98] text-sm uppercase tracking-widest">
                                <Send className="w-4 h-4" /> Apply for Listing
                            </button>
                            <button className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-gray-100 text-gray-700 font-black rounded-3xl hover:bg-gray-50 transition-all active:scale-[0.98] text-sm uppercase tracking-widest">
                                <MessageSquare className="w-4 h-4" /> Message Brand
                            </button>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Joined Brandy</p>
                            <p className="text-sm font-black text-gray-900">{brand.joinedDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
