"use client";
import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    Megaphone,
    DollarSign,
    MapPin,
    Calendar,
    ChevronRight,
    ArrowUpRight,
    Sparkles,
    CheckCircle2,
    Clock
} from "lucide-react";
import Link from "next/link";

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        setIsLoading(true);
        // Mock data for campaigns
        setTimeout(() => {
            setCampaigns([
                {
                    id: "c1",
                    title: "Summer Style 2024",
                    brand: "FashionHub",
                    logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop",
                    description: "Looking for 5 influencers to showcase our new summer collection. High-quality reels and stories required.",
                    budget: "$800 - $1,200",
                    location: "Remote / USA",
                    deadline: "Mar 30, 2024",
                    category: "Fashion",
                    status: "Active"
                },
                {
                    id: "c2",
                    title: "Eco-Friendly Fabrics",
                    brand: "FashionHub",
                    logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop",
                    description: "Join our sustainability movement by promoting our recycled fabric line. Educational content preferred.",
                    budget: "$1,500 - $2,000",
                    location: "Global",
                    deadline: "Apr 15, 2024",
                    category: "Sustainability",
                    status: "Active"
                },
                {
                    id: "c3",
                    title: "Pro Gaming Setup Review",
                    brand: "TechGear Pro",
                    logo: "https://images.unsplash.com/photo-1468436139062-f60a7444f84e?w=100&h=100&fit=crop",
                    description: "Full review of our latest mechanical keyboard and ultra-wide monitor group. Video content only.",
                    budget: "$2,000 - $3,500",
                    location: "Remote",
                    deadline: "Apr 10, 2024",
                    category: "Gaming",
                    status: "Active"
                },
                {
                    id: "c4",
                    title: "Morning Routine Wellness",
                    brand: "WellnessLife",
                    logo: "https://images.unsplash.com/photo-1545208393-596371BA9a3e?w=100&h=100&fit=crop",
                    description: "Share your morning wellness routine featuring our organic supplements and vitamins.",
                    budget: "$400 - $700",
                    location: "Remote",
                    deadline: "Mar 25, 2024",
                    category: "Wellness",
                    status: "Closing Soon"
                }
            ]);
            setIsLoading(false);
        }, 600);
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pt-2">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Campaigns</h1>
                    <p className="text-gray-500 mt-2 font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                        <Sparkles className="w-4 h-4 text-blue-600" /> Discover opportunities that match your niche
                    </p>
                </div>
            </div>

            {/* Filters bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                    <Search className="absolute left-5 inset-y-0 my-auto w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by campaign title or brand..."
                        className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[24px] shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="px-8 py-4 bg-white border border-gray-100 rounded-[24px] font-black text-xs uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-all shadow-sm">
                        Category
                    </button>
                    <button className="px-8 py-4 bg-white border border-gray-100 rounded-[24px] font-black text-xs uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-all shadow-sm">
                        Budget Range
                    </button>
                </div>
            </div>

            {/* Campaign Cards List */}
            {isLoading ? (
                <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 bg-gray-50 rounded-[40px] animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {campaigns.map((camp, idx) => (
                        <div
                            key={camp.id}
                            className="bg-white border border-gray-100 rounded-[40px] p-8 flex flex-col md:flex-row gap-8 items-center hover:shadow-2xl hover:shadow-blue-100/50 hover:border-blue-200 transition-all group animate-in slide-in-from-bottom-8 duration-700"
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-gray-50 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                                <img src={camp.logo} alt={camp.brand} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                                        {camp.category}
                                    </span>
                                    {camp.status === "Closing Soon" && (
                                        <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {camp.status}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{camp.title}</h3>
                                    <p className="text-gray-400 font-bold text-sm mt-0.5">by {camp.brand}</p>
                                </div>
                                <p className="text-gray-500 text-sm font-medium line-clamp-2 max-w-2xl leading-relaxed">
                                    {camp.description}
                                </p>
                            </div>

                            <div className="flex flex-col md:items-end gap-6 flex-shrink-0">
                                <div className="flex flex-col md:items-end gap-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Est. Compensation</p>
                                    <p className="text-2xl font-black text-gray-900">{camp.budget}</p>
                                </div>
                                <Link href={`/influencer/campaigns/${camp.id}`}>
                                    <button className="px-10 py-4 bg-gray-900 text-white font-black text-xs uppercase tracking-widest rounded-[20px] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 hover:shadow-blue-200 active:scale-95 flex items-center gap-2 group-hover:translate-x-1">
                                        View Details <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
