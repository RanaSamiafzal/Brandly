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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchBrandDetails();
    }, []);

    const fetchBrandDetails = async () => {
        setIsLoading(true);
        // Mock data for the brand profile
        setTimeout(() => {
            setBrand({
                id: params.id,
                name: "FashionHub",
                logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
                banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
                description: "FashionHub is a leading global fashion retailer specializing in modern, sustainable, and accessible clothing for everyone. We believe in the power of authentic storytelling through creators who live and breathe style.",
                industry: "Fashion & Lifestyle",
                location: "New York, NY",
                website: "fashionhub.com",
                joinedDate: "October 2023",
                isVerified: true,
                stats: {
                    activeCampaigns: 5,
                    totalCollaborations: 124,
                    avgRating: 4.9
                },
                socialPlatforms: [
                    { name: "Instagram", followers: "1.2M", handle: "@fashionhub" },
                    { name: "YouTube", followers: "450K", handle: "FashionHubTV" },
                    { name: "TikTok", followers: "800K", handle: "@fashionhub_official" }
                ],
                activeCampaigns: [
                    { id: "c1", title: "Summer Style 2024", budget: "$800 - $1,200", deadline: "Mar 30, 2024" },
                    { id: "c2", title: "Eco-Friendly Fabrics", budget: "$1,500 - $2,000", deadline: "Apr 15, 2024" }
                ]
            });
            setIsLoading(false);
        }, 600);
    };

    if (!mounted) return null;
    if (isLoading) return <div className="p-12 text-center animate-pulse text-gray-400">Loading brand profile...</div>;

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
            <div className="relative mb-32">
                <div className="w-full h-64 md:h-80 rounded-[40px] overflow-hidden border border-gray-100 shadow-inner px-1 pt-1 bg-gray-50">
                    <img src={brand.banner} alt="Banner" className="w-full h-full object-cover rounded-[39px]" />
                </div>
                <div className="absolute -bottom-20 left-12 flex flex-col md:flex-row md:items-end gap-6">
                    <div className="w-40 h-40 rounded-[48px] overflow-hidden border-[6px] border-white shadow-2xl shadow-blue-100/50 bg-white">
                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight">{brand.name}</h1>
                            {brand.isVerified && (
                                <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1.5 border border-blue-100">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Verified Brand</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm font-bold text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-gray-300" /> {brand.location}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                            <span className="flex items-center gap-1.5">
                                <Globe className="w-4 h-4 text-gray-300" /> {brand.website}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: About & Socials */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm">
                        <h2 className="text-2xl font-black text-gray-900 mb-6">About the Brand</h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            {brand.description}
                        </p>
                    </section>

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

                    <section>
                        <div className="flex items-center justify-between mb-8 px-2">
                            <h2 className="text-2xl font-black text-gray-900">Active Campaigns</h2>
                            <Link href="/influencer/campaigns" className="text-sm font-bold text-blue-600 hover:underline">View All Campaigns</Link>
                        </div>
                        <div className="space-y-4">
                            {brand.activeCampaigns.map((camp) => (
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
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Key Stats & Quick Actions */}
                <div className="space-y-8">
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
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Rating</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-white text-white" />
                                        <span className="text-xl font-black">{brand.stats.avgRating}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Collabs</p>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4 text-white" />
                                        <span className="text-xl font-black">{brand.stats.totalCollaborations}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
