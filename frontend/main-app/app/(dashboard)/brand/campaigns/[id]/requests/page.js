"use client";
import { useState, useEffect } from "react";
import { 
    Users, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    ArrowLeft, 
    MessageCircle, 
    DollarSign, 
    ExternalLink, 
    FileText, 
    User,
    ShieldCheck,
    Star
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function CampaignRequestsPage() {
    const params = useParams();
    const router = useRouter();
    const [requests, setRequests] = useState([]);
    const [campaign, setCampaign] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        setMounted(true);
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/brand/campaigns/${params.id}/requests`);
            const data = await res.json();
            if (res.ok) {
                setRequests(data.requests || []);
                setCampaign(data.campaign);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResponse = async (requestId, status) => {
        setActionLoading(requestId);
        try {
            const res = await fetch(`/api/brand/requests/${requestId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                setRequests(prev => prev.map(req => 
                    req.id === requestId ? { ...req, status: status.toLowerCase() } : req
                ));
            } else {
                const data = await res.json();
                alert(data.error || "Failed to update request status");
            }
        } catch (error) {
            console.error("Action failed:", error);
        } finally {
            setActionLoading(null);
        }
    };

    if (!mounted) return null;

    if (isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12 py-12 animate-pulse space-y-8">
                <div className="h-8 bg-gray-100 rounded-xl w-48" />
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-40 bg-gray-50 border border-gray-100 rounded-3xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-24 animate-in fade-in duration-500">
            {/* Navigation & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <Link href="/brand/campaigns" className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-blue-600 transition-all group uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Campaigns
                    </Link>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none mt-2">
                        Applications <span className="text-blue-600">({requests.length})</span>
                    </h1>
                    {campaign && (
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                            {campaign.title}
                        </p>
                    )}
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm hidden md:flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-500" />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Total Applicants</p>
                            <p className="text-lg font-black text-gray-900 leading-none mt-1">{requests.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Requests List */}
            <div className="grid grid-cols-1 gap-6">
                {requests.length === 0 ? (
                    <div className="py-32 bg-white border border-dashed border-gray-200 rounded-[48px] text-center space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                            <Users className="w-10 h-10 text-gray-300" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 uppercase">No Applicants Yet</h3>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Your campaign is live and waiting for creators.</p>
                        </div>
                    </div>
                ) : (
                    requests.map((request) => (
                        <div 
                            key={request.id}
                            className={`bg-white border transition-all rounded-[40px] p-8 md:p-10 flex flex-col lg:flex-row gap-10 items-start shadow-sm hover:shadow-xl hover:shadow-gray-100 ${
                                request.status === 'accepted' ? 'border-green-100 bg-green-50/10' : 
                                request.status === 'rejected' ? 'border-red-50 opacity-75' : 'border-gray-50'
                            }`}
                        >
                            {/* Influencer Info */}
                            <div className="flex flex-col md:flex-row gap-6 md:items-center flex-1 w-full">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-gray-50 shadow-lg bg-white">
                                        <img 
                                            src={request.sender.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(request.sender.fullname)}&background=random&size=96`} 
                                            alt={request.sender.fullname} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {request.sender.influencerProfile?.isVerified && (
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">
                                                {request.sender.fullname}
                                            </h3>
                                            <span className="text-xs font-bold text-gray-400">@{request.sender.influencerProfile?.username || "creator"}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-current" /> {request.sender.influencerProfile?.averageRating?.toFixed(1) || "N/A"} Rating</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-blue-500" /> {request.sender.influencerProfile?.category || "Creator"}</span>
                                        </div>
                                    </div>

                                    {/* Proposal */}
                                    <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                            <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                                                "{request.note || "I'm interested in collaborating on this campaign!"}"
                                            </p>
                                        </div>
                                        {request.portfolioLink && (
                                            <a 
                                                href={request.portfolioLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 bg-blue-100/50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" /> View Portfolio
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Budget & Actions */}
                            <div className="w-full lg:w-72 space-y-6 pt-6 lg:pt-0 lg:pl-10 lg:border-l border-gray-100">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 leading-none">Proposed Budget</p>
                                    <p className="text-3xl font-black text-gray-900">${request.proposedBudget || campaign?.budgetMin}</p>
                                </div>

                                <div className="space-y-3">
                                    {request.status === 'pending' ? (
                                        <>
                                            <button 
                                                disabled={actionLoading === request.id}
                                                onClick={() => handleResponse(request.id, 'ACCEPTED')}
                                                className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-100 flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                                            >
                                                {actionLoading === request.id ? (
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : <CheckCircle2 className="w-4 h-4" />}
                                                ACCEPT PROPOSAL
                                            </button>
                                            <button 
                                                disabled={actionLoading === request.id}
                                                onClick={() => handleResponse(request.id, 'REJECTED')}
                                                className="w-full py-4 bg-white border border-gray-200 text-gray-400 font-black rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                                            >
                                                <XCircle className="w-4 h-4" /> REJECT
                                            </button>
                                        </>
                                    ) : (
                                        <div className={`py-4 rounded-2xl text-center font-black text-xs uppercase tracking-widest border ${
                                            request.status === 'accepted' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                                        }`}>
                                            {request.status === 'accepted' ? 'Collaboration Accepted' : 'Proposal Rejected'}
                                        </div>
                                    )}
                                    <button className="w-full py-4 bg-gray-50 text-gray-500 font-black rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest">
                                        <MessageCircle className="w-4 h-4" /> MESSAGE CREATOR
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
