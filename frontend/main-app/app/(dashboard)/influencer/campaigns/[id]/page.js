"use client";
import { useState, useEffect } from "react";
import {
    Calendar,
    MapPin,
    DollarSign,
    Link as LinkIcon,
    ShieldCheck,
    Megaphone,
    ChevronLeft,
    ArrowLeft,
    Box,
    CheckCircle2,
    Users,
    Clock,
    Send,
    MessageSquare,
    Globe,
    Instagram,
    Youtube,
    Twitter,
    Star
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CampaignDetailPage() {
    const params = useParams();
    const [campaign, setCampaign] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [applicationSent, setApplicationSent] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchCampaignDetails();
    }, []);

    const fetchCampaignDetails = async () => {
        setIsLoading(true);
        // Mock data for campaign details
        setTimeout(() => {
            setCampaign({
                id: params.id,
                title: "Summer Style 2024",
                brand: {
                    id: "b1",
                    name: "FashionHub",
                    logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&h=200&fit=crop",
                    isVerified: true,
                    location: "New York, USA"
                },
                description: "We are looking for creative lifestyle influencers to showcase our new 'Eternal Summer' collection. The campaign focuses on effortless elegance, sustainable fabrics, and vibrant colors. We want you to tell a story of how our attire fits into your daily summer adventures.",
                requirements: [
                    "1 High-quality Instagram Reel (30-60s)",
                    "3 Instagram Stories with Link stickers",
                    "A brief blog post or detailed caption about sustainability",
                    "Content must be delivered in 4K or 1080p, 60fps"
                ],
                perks: [
                    "Full Summer Collection kit ($500 value)",
                    "Exclusive invitation to NY Fashion Week",
                    "Potential for long-term brand ambassadorship",
                    "20% affiliate commission for your followers"
                ],
                budget: "$800 - $1,200",
                duration: "30 Days",
                deadline: "Mar 30, 2024",
                category: "Fashion & Lifestyle",
                targetAudience: "Gen Z & Millennials interested in sustainable fashion",
                platform: "Instagram & TikTok"
            });
            setIsLoading(false);
        }, 600);
    };

    const handleApply = () => {
        setApplicationSent(true);
        // In a real app, this would be an API call
    };

    if (!mounted) return null;
    if (isLoading) return <div className="p-20 text-center text-gray-400 animate-pulse font-black uppercase tracking-widest">Loading campaign details...</div>;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-24 animate-in fade-in duration-500">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-12 pt-2">
                <Link href="/influencer/campaigns" className="inline-flex items-center gap-3 text-sm font-black text-gray-500 hover:text-blue-600 transition-all group">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 shadow-sm transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    BACK TO EXPLORE
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:block">Campaign ID: {campaign.id}</span>
                    <button className="p-3 rounded-2xl bg-white border border-gray-100 hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-all">
                        <ShieldCheck className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Header Card */}
                    <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-32 -mt-32 blur-3xl -z-10" />
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-gray-50 shadow-xl bg-white">
                                <img src={campaign.brand.logo} alt={campaign.brand.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                                        {campaign.category}
                                    </span>
                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" /> Hiring Now
                                    </span>
                                </div>
                                <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase leading-none">{campaign.title}</h1>
                                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><LinkIcon className="w-4 h-4" /> {campaign.brand.name}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {campaign.brand.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-50">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Budget</p>
                                <p className="text-2xl font-black text-gray-900">{campaign.budget}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Deadline</p>
                                <p className="text-2xl font-black text-gray-900">{campaign.deadline}</p>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Platforms</p>
                                <p className="text-2xl font-black text-gray-900">{campaign.platform}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-6 px-4">
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                            <Megaphone className="w-6 h-6 text-blue-600" /> Campaign Brief
                        </h2>
                        <p className="text-gray-500 font-medium leading-relaxed text-lg">
                            {campaign.description}
                        </p>
                    </div>

                    {/* Requirements & Perks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                        <div className="space-y-6 bg-gray-50/50 rounded-[40px] p-8 border border-gray-100">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                                <Box className="w-5 h-5 text-blue-600" /> Deliverables
                            </h3>
                            <ul className="space-y-4">
                                {campaign.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600 leading-tight">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6 bg-blue-50/30 rounded-[40px] p-8 border border-blue-100/50">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-blue-600" /> Creator Perks
                            </h3>
                            <ul className="space-y-4">
                                {campaign.perks.map((perk, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600 leading-tight">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-green-600">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                        </div>
                                        {perk}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Apply & Brand Info */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Apply Card */}
                    <div className="bg-gray-900 rounded-[48px] p-10 text-white shadow-2xl shadow-gray-300 space-y-8">
                        {applicationSent ? (
                            <div className="text-center space-y-6 py-4">
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-bounce">
                                    <CheckCircle2 className="w-10 h-10 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black uppercase tracking-tight">Application Sent!</h3>
                                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">FashionHub will review your profile and get back to you soon.</p>
                                </div>
                                <button
                                    onClick={() => setApplicationSent(false)}
                                    className="text-xs font-black text-blue-400 hover:text-white uppercase tracking-widest transition-colors"
                                >
                                    Cancel Application
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black uppercase tracking-tight">Ready to Work?</h3>
                                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Submit your application and start collaborating.</p>
                                </div>
                                <button
                                    onClick={handleApply}
                                    className="w-full py-5 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                                >
                                    <Send className="w-5 h-5" /> APPLY FOR CAMPAIGN
                                </button>
                                <button className="w-full py-5 bg-white/10 hover:bg-white/20 text-white font-black rounded-3xl transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest">
                                    <MessageSquare className="w-5 h-5" /> MESSAGE BRAND
                                </button>
                                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                    <span>Average Response Time</span>
                                    <span className="text-white">Under 24h</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* About Brand Quick View */}
                    <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">About Brand</h3>
                            <Link href={`/influencer/brands/${campaign.brand.id}`} className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-all">VIEW FULL PROFILE</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                                <img src={campaign.brand.logo} alt={campaign.brand.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-none">{campaign.brand.name}</h4>
                                <div className="flex items-center gap-1.5 mt-1 text-sm font-bold text-gray-400">
                                    <MapPin className="w-3.5 h-3.5" /> {campaign.brand.location}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Joined</span>
                                <span className="text-xs font-black text-gray-900 uppercase">Oct 2023</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verification Status</span>
                                <span className="flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                                </span>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-gray-50 space-y-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Socials</p>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer">
                                    <Instagram className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer">
                                    <Youtube className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer">
                                    <Twitter className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer">
                                    <Globe className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
