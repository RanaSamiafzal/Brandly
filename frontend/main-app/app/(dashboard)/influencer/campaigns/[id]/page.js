"use client";
import { useState, useEffect } from "react";
import {
    Calendar,
    MapPin,
    DollarSign,
    Link as LinkIcon,
    ShieldCheck,
    Megaphone,
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
    Star,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ApplyModal from "../../../../../components/influencer/ApplyModal";

export default function CampaignDetailPage() {
    const params = useParams();
    const [campaign, setCampaign] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [acceptedRequestId, setAcceptedRequestId] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    useEffect(() => {
        setMounted(true);
        fetchCampaignDetails();
    }, []);

    const fetchCampaignDetails = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/influencer/campaigns/${params.id}`);
            const data = await res.json();
            if (res.ok) {
                setCampaign(data.campaign);
                setHasApplied(data.hasApplied);
                setAcceptedRequestId(data.acceptedRequestId);
            }
        } catch (err) {
            console.error("Failed to fetch campaign details", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;
    if (isLoading) return <div className="p-20 text-center text-gray-400 animate-pulse font-black uppercase tracking-widest">Loading campaign details...</div>;
    if (!campaign) return <div className="p-20 text-center text-gray-400 font-black uppercase tracking-widest">Campaign not found.</div>;

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
                                <img src={campaign.brand.logo} alt={campaign.brand.brandName} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                                        {campaign.targetCategory?.[0] || "General"}
                                    </span>
                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" /> Hiring Now
                                    </span>
                                </div>
                                <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase leading-none">{campaign.title}</h1>
                                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><LinkIcon className="w-4 h-4" /> {campaign.brand.brandName}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {campaign.brand.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-50">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Budget Range</p>
                                <p className="text-2xl font-black text-gray-900">${campaign.budgetMin} - ${campaign.budgetMax}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Timeline</p>
                                <p className="text-2xl font-black text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{campaign.campaignTimeline || "TBD"}</p>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Target Platforms</p>
                                <p className="text-2xl font-black text-gray-900">{campaign.targetPlatform?.join(", ") || "General"}</p>
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
                            <div className="text-sm font-bold text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {campaign.deliverables}
                            </div>
                        </div>
                        <div className="space-y-6 bg-blue-50/30 rounded-[40px] p-8 border border-blue-100/50">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                                <Users className="w-5 h-5 text-blue-600" /> Target Audience
                            </h3>
                            <div className="text-sm font-bold text-gray-600 leading-relaxed">
                                {campaign.targetAudience}
                            </div>
                            {campaign.additionalRequirements && (
                                <div className="mt-6 pt-6 border-t border-blue-100/50">
                                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Additional Rules</h4>
                                    <p className="text-xs font-bold text-gray-500 italic leading-relaxed">{campaign.additionalRequirements}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Apply & Brand Info */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Application Status / Action */}
                    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
                        {acceptedRequestId ? (
                            <div className="space-y-6">
                                <div className="p-4 bg-green-50 rounded-2xl flex items-center gap-3 border border-green-100">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</p>
                                        <p className="text-xs font-black text-green-600 uppercase">Collaboration Active</p>
                                    </div>
                                </div>
                                <Link 
                                    href={`/influencer/collaborations/${acceptedRequestId}`}
                                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-2"
                                >
                                    <Box className="w-4 h-4" /> Go to Collab Hub
                                </Link>
                            </div>
                        ) : hasApplied ? (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Application Sent</h3>
                                <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-widest">
                                    The brand will review your profile and reach out if it's a match.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Interested?</h3>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed tracking-wider">
                                        Join this campaign and start working with {campaign.brand?.brandName}.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedBrand({ id: campaign.brandId, name: campaign.brand?.brandName || "Brand" })}
                                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
                                >
                                    Apply Now <Send className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* About Brand Quick View */}
                    <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">About Brand</h3>
                            <Link href={`/influencer/brands/${campaign.brandId}`} className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-all">VIEW FULL PROFILE</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                                <img src={campaign.brand?.user?.profilePic} alt={campaign.brand?.brandName} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-none">{campaign.brand?.brandName}</h4>
                                <div className="flex items-center gap-1.5 mt-1 text-sm font-bold text-gray-400">
                                    <MapPin className="w-3.5 h-3.5" /> {campaign.brand?.location}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Joined</span>
                                <span className="text-xs font-black text-gray-900 uppercase">{campaign.brand?.user?.createdAt ? new Date(campaign.brand.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Recently"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verification Status</span>
                                <span className="flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                                    <ShieldCheck className="w-3 h-3" /> {campaign.brand?.user?.isVerified ? "VERIFIED" : "PENDING"}
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

            {/* Application Modal */}
            {selectedBrand && (
                <ApplyModal
                    brandId={selectedBrand.id}
                    brandName={selectedBrand.name}
                    initialCampaignId={campaign.id}
                    onClose={() => setSelectedBrand(null)}
                    onSuccess={() => {
                        setSelectedBrand(null);
                        setHasApplied(true);
                        fetchCampaignDetails();
                    }}
                />
            )}
        </div>
    );
}
